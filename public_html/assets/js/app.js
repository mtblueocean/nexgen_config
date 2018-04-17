
var Qms = null; //'summernote',
(function() {
    Qms = angular.module('qms', [
        'ui.router', 'ngResource', 'angularFileUpload', 'ui.bootstrap',
        "ngTouch", "angucomplete-alt", "ui.bootstrap","ngDialog",'textAngular', 'localytics.directives','ngMap','google.places'
    ]);
})();

Qms.controller('ServiceQualifyCtrl',function($scope,$state,FlashMessage,NgMap,GeoCoder,FrontierQualification,ngDialog){
    $scope.vm = this;
    $scope.advancedShown = false;
    $scope.xmlResponse = "";
    $scope.autoCompleteOptions = {
        componentRestrictions : {country: 'au'},
        types : 'geocode'
    }

    NgMap.getMap().then(function(evtMap) {
        console.log(evtMap);
        $scope.vm.map = evtMap;
        var ll = evtMap.markers[0].position;
        GeoCoder.geocode({'latLng': ll}).then(function(result){
            //console.log(result);
            $scope.deleteMarkers();
            $scope.vm.positions.push({lat:ll.lat(),lng:ll.lng()});
            $scope.locationReference = result[0];
        });
    });

    // $scope.getCurrentLocation();

    // console.log($scope.currentLocation);

    // $scope.vm.positions = [
    //     {lat: $scope.currentLocation.lat,lng: $scope.currentLocation.lng}
    // ];

    // console.log($scope.vm.positions);

    $scope.getCurrentLocation = function(){
        var position;
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                function(position){
                    position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                }
            );
        } else {
            position = {lat:-33.867926,lng:151.205392};
        }
        if (angular.isUndefined(position)){
            position = {lat:-33.867926,lng:151.205392};   
        }
        console.log(position);
        return position;
    }

    $scope.vm.positions = [{
                            lat: $scope.getCurrentLocation().lat,
                            lng: $scope.getCurrentLocation().lng
                        }];

    $scope.loadAddress = function(){
        var address = $('#locationReference').val();
        GeoCoder.geocode({'address': address}).then(function(result){
            $scope.locationReference = result[0];
            $('#locationReference').val($scope.locationReference.formatted_address);
        });
    }

    $scope.deleteMarkers = function(){
        $scope.vm.positions = [];
    }

    $scope.placeChanged = function(){
        $scope.vm.place = this.getPlace();
        var location = $scope.vm.place.geometry.location();
        $scope.deleteMarkers();
        $scope.vm.positions.push({lat : location.lat(),lng: location.lng()});
    }

    $scope.addMarker = function(event){
        //nsole.log(event);
        var ll = event.latLng;
        GeoCoder.geocode({'latLng': ll}).then(function(result){
            //console.log(result);
            $scope.deleteMarkers();
            $scope.vm.positions.push({lat:ll.lat(),lng:ll.lng()});
            $scope.locationReference = result[0];
            $('#locationReference').val($scope.locationReference.formatted_address);
        });
    }

    $scope.showMarkers = function(){
        for(var key in $scope.vm.markers){
            vm.map.markers[key].setMap($scope.vm.map);
        }
    }

    $scope.searchAddress = function(){
        // $scope.clearMarkers();
        var location = $scope.locationReference.geometry.location;
        $scope.deleteMarkers();
        //console.log(location);
        $scope.vm.positions.push({lat : location.lat(),lng: location.lng()});
    }

    $scope.toggleAdvanced = function(){
        $scope.advancedShown = !$scope.advancedShown;
    }

    $scope.qualifyAddress = function(){
        //$scope.xmlResponse = FrontierQualification.service_request($scope.locationReference.formatted_address);
        $scope.template = "templates/catalog/frontier/sq_response.html";
        ngDialog.open({
             template: '$scope.template',
             plan: true,
             controller : 'ServiceQualifyCtrl',
             width: 500,
             height: 500,
             scope: $scope,
             className: 'ngdialog-theme-default',
             showClose: true,
             closeByEscape: true,
             closeByDocument: true
             // preCloseCallback : function(value) {
             //     var signData = $('img.imported').attr('src');
             //     if ((!signData) && (!$rootScope.isDraftMode)) {
             //         if (alert("You have not signed yet. Please sign to start filling out data. You can also select Draft Mode to be able to start.")) {
             //             return true;
             //         }
             //         return false;
             //         $timeout(angular.noop());
             //     }
             // }
         });
    }
});

Qms.controller('DefaultCtrl', function($scope, Scopes, $rootScope, $http, FlashMessage,$locale) {
    $scope.flashMessage = FlashMessage;
    $scope.currentYear = new Date().getFullYear();
    $scope.currentMonth = new Date().getMonth() + 1;
    $scope.months = $locale.DATETIME_FORMATS.MONTH;
    $rootScope.version = _version;
    //alert($scope.currentYear + '-' + $scope.months);
    $http.get("profile").success(function(response) {
        $scope.profile = response;
        $rootScope.sign = response.sign;
        Scopes.store('DefaultCtrl', $scope);
    });
})

Qms.controller('ScheduleGoodsListCtrl',function($scope,$filter,$http,$state,ScheduleGoods,FileUploader,FlashMessage){
    $scope.scheduleGoods = ScheduleGoods.query();
    alert($scope.scheduleGoods);
});

Qms.controller('ProductListCtrl', function($scope, $filter, $http, $state, Product, FileUploader, FlashMessage) {
    $scope.products = Product.query();

    $scope.edit = function(row_id) {
        $state.go('edit_product', {
            id: row_id
        });
    }

    $scope.delete = function(row_id) {
        Product.delete({
            product_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.products = Product.query();

        });
    }
});

Qms.controller('ProductCtrl', function($scope, $http, $state, $location, $stateParams, Product, Category, FlashMessage, FileUploader) {

    var uploader = $scope.uploader = new FileUploader({
        url: 'product/upload',
        formData: [{
            name: null
        }]
    });

    var dataPath;

    $scope.hiders = [{
        id: 1,
        title: "No"
    }, {
        id: 2,
        title: "Yes"
    }]

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        dataPath = response.FilePath
    };

    if ($stateParams.id)
        $scope.product = Product.get({
            product_id: $stateParams.id
        });
    else
        $scope.product = {};

    $scope.categories = Category.query();
    $scope.products = Product.query();


    $scope.save = function() {

        if (!$("#products_form").parsley('validate'))
            return;

        if (angular.isDefined($scope.product.id)) {
            $scope.product.image = dataPath;
            Product.update({
                product_id: $scope.product.id
            }, $scope.product, function(data) {
                FlashMessage.setMessage(data);

                if (data.success)
                    $location.path("/products");
            })
        } else {
            Product.save($scope.product, function(data) {
                FlashMessage.setMessage(data);

                if (data.success)
                    $location.path("/products");

            })

        }
    }

});



Qms.controller('CategoryListCtrl', function($scope, $http, $state, $location, $stateParams, Category, FlashMessage) {
    $scope.categories = Category.query();
    $scope.edit = function(row_id) {
        $state.go('edit_category', {
            id: row_id
        });
    }

    $scope.delete = function(row_id) {
        Category.delete({
            category_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.categories = Category.query();
        });
    }

});


Qms.controller('CategoryCtrl', function($scope, $http, $state, $location, $stateParams, Category, FinanceType, Typet, FlashMessage) {
    $scope.categories = Category.query();

    if ($stateParams.id)
        $scope.category = Category.get({
            category_id: $stateParams.id
        });
    else
        $scope.category = {};

    $scope.financetypes = FinanceType.query();
    $scope.typets = Typet.query();

    $scope.save = function() {
        if (!$("#cat_form").parsley('validate')) return false;

        if (angular.isDefined($scope.category.id)) {
            Category.update({
                category_id: $scope.category.id
            }, $scope.category, function(data) {
                FlashMessage.setMessage(data);

                if (data.success)
                    $location.path("/categories");
            });

        } else {


            Category.save($scope.category, function(data) {
                FlashMessage.setMessage(data);
                if (data.success)
                    $location.path("/categories");
            });
        }
    }

});

Qms.controller('UserListCtrl', function($scope, $http, $state, $location, $stateParams, User, FlashMessage) {

    $scope.users = User.query();

    $scope.edit = function(row_id) {
        $state.go('edit_user', {
            id: row_id
        });
    }

    $scope.delete = function(row_id) {
        User.delete({
            user_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.users = User.query();

        });
    }
});


Qms.controller('UserCtrl', function($scope, $http, $state, $location, $stateParams, User, FlashMessage, Scopes, $rootScope) {
    $scope.users = User.query();
    $scope.noSign = true;

    if ($stateParams.id) {
        $scope.user = User.get({
            user_id: $stateParams.id
        }, function(data) {
          if (data.sign && data.sign_exists) {
              $scope.noSign = false;
          }
        });
    }
    else {
        $scope.user = {};
    }

    $scope.profile = [];
    $scope.readonly = true;
    $http.get("profile").success(function(response) {
            $scope.profile = response;
            if (response.type == 'admin') {
                $scope.readonly = false;
            }
        if ($state.current.url == "/user/settings") {
            $state.go('edit_user', {
            id: $scope.profile.id
        });

    }
        });
    $scope.$watch('profile');
    $scope.$watch('readonly');
    $scope.$watch('user');


    $('#userSign').jSignature({color:"#000000",lineWidth:1,
                                   width :350, height :70,
                                   cssclass : "signature-canvas",
                                  "decor-color": 'transparent'
                                 });

    $scope.clearSg = function() {
        $scope.noSign = true;
        $("#userSign").jSignature("reset");
    }


    $scope.save = function() {
        var pInstance = $("#user_form").parsley();

        if ( !pInstance.validate(true) ) {
            return false;
        }

        //get the signature

        if ($("#userSign").jSignature('getData', 'native').length != 0) {
            var signData = $("#userSign").jSignature('getData');
            $scope.user.signData = signData;
        } else {
            $scope.user.signData = "";
        }

        $scope.user.financeonly = $('input[name=financeonly]').prop('checked');

        if (angular.isDefined($scope.user.id)) {
            User.update({
                user_id: $scope.user.id
            }, $scope.user, function(data) {

                FlashMessage.setMessage(data);
                if (data.success && !$scope.readonly) {
                    $location.path("/users");
                    $http.get("profile").success(function(response) {
                        $rootScope.sign = response.sign;
                    });
                } else {
                   $(window).scrollTop(0);
                }
            });

        } else {

            User.save($scope.user, function(data) {
                FlashMessage.setMessage(data);
                if (data.success) {
                    $location.path("/users");
                    $http.get("profile").success(function(response) {
                        $rootScope.sign = response.sign;
                    });
                }
            })
        }
    }
});




Qms.controller('CompanyListCtrl', function($scope, $http, $state, $location, $stateParams, Company, FlashMessage) {

    $scope.companies = Company.query();


    $scope.edit = function(row_id) {
        $state.go('edit_company', {
            id: row_id
        });
    }

    $scope.delete = function(row_id) {
        Company.delete({
            company_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.companies = Company.query();

        });
    }

});


Qms.controller('CompanyCtrl', function($scope, $http, $state, $location, $stateParams, Company, FlashMessage) {
    $scope.companies = Company.query();

    if ($stateParams.id)
        $scope.company = Company.get({
            company_id: $stateParams.id
        });
    else
        $scope.company = {};


    $scope.save = function() {
        if (!$("#company_form").parsley('validate')) return;

        if (angular.isDefined($scope.company.id)) {

            Company.update({
                company_id: $scope.company.id
            }, $scope.company, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/companies");
            })

        } else {
            Company.save($scope.company, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/companies");
            })

        }
    }

});


Qms.controller('SalesRepListCtrl', function($scope, $http, $state, $location, $stateParams, Salesrep, FlashMessage) {
    $scope.salesreps = Salesrep.query();


    $scope.edit = function(row_id) {
        $state.go('edit_salesrep', {
            id: row_id
        });
    }

    $scope.delete = function(row_id) {
        Salesrep.delete({
            salesrep_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.salesreps = Salesrep.query();


        });
    }

});


Qms.controller('SalesRepCtrl', function($scope, $http, $state, $location, $stateParams, Salesrep, FlashMessage) {

    $scope.salesreps = Salesrep.query();

    if ($stateParams.id)
        $scope.salesrep = Salesrep.get({
            salesrep_id: $stateParams.id
        });
    else
        $scope.salesrep = {};


    $scope.save = function() {

        if (!$("#salesrep_form").parsley('validate')) return;

        if (angular.isDefined($scope.salesrep.id)) {

            Salesrep.update({
                salesrep_id: $scope.salesrep.id
            }, $scope.salesrep, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/salesreps");
            })

        } else {
            Salesrep.save($scope.salesrep, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/salesreps");
            })

        }


    }
});




Qms.controller('TelemarketerListCtrl', function($scope, $http, $state, $location, $stateParams, Telemarketer, FlashMessage) {

    $scope.telemarketers = Telemarketer.query();

    $scope.edit = function(row_id) {
        $state.go('edit_telemarketer', {
            id: row_id
        });
    }

    $scope.delete = function(row_id) {
        Telemarketer.delete({
            telemarketer_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.telemarketers = Telemarketer.query();

        });
    }
});


Qms.controller('TelemarketerCtrl', function($scope, $http, $state, $location, $stateParams, Telemarketer, FlashMessage) {
    $scope.telemarketers = Telemarketer.query();

    if ($stateParams.id)
        $scope.telemarketer = Telemarketer.get({
            telemarketer_id: $stateParams.id
        });
    else
        $scope.telemarketer = {};


    $scope.save = function() {

        if (!$("#telemarketer_form").parsley('validate')) return;

        if (angular.isDefined($scope.telemarketer.id)) {

            Telemarketer.update({
                telemarketer_id: $scope.telemarketer.id
            }, $scope.telemarketer, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/telemarketers");
            })

        } else {
            Telemarketer.save($scope.telemarketer, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/s");
            })

        }


    }
});


Qms.controller('WinBackListCtrl', function($scope, $http, $state, $location, $stateParams, Winback, FlashMessage) {

    $scope.winbacks = Winback.query();

    $scope.edit = function(row_id) {
        $state.go('edit_winback', {
            id: row_id
        });
    }

    $scope.delete = function(row_id) {
        Winback.delete({
            winback_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.winbacks = Winback.query();

        });
    }
});


Qms.controller('WinBackCtrl', function($scope, $http, $state, $location, $stateParams, Winback, FlashMessage) {
    $scope.winbacks = Winback.query();

    if ($stateParams.id)
        $scope.winback = Winback.get({
            winback_id: $stateParams.id
        });
    else
        $scope.winback = {};


    $scope.save = function() {

        if (!$("#winback_form").parsley('validate')) return;

        if (angular.isDefined($scope.winback.id)) {

            Winback.update({
                winback_id: $scope.winback.id
            }, $scope.winback, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/winbacks");
            })

        } else {
            Winback.save($scope.winback, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/winbacks");
            })

        }


    }

});



Qms.controller('LeadSourceListCtrl', function($scope, $http, $state, $location, $stateParams, Leadsource, FlashMessage) {
    $scope.leadsources = Leadsource.query();

    $scope.edit = function(row_id) {
        $state.go('edit_leadsource', {
            id: row_id
        });
    }

    $scope.delete = function(row_id) {
        Leadsource.delete({
            leadsource_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true) {
                $scope.leadsources = Leadsource.query();

            }
        });
    }
});


Qms.controller('LeadSourceCtrl', function($scope, $http, $state, $location, $stateParams, Leadsource, FlashMessage) {
    $scope.leadsources = Leadsource.query();

    if ($stateParams.id)
        $scope.leadsource = Leadsource.get({
            leadsource_id: $stateParams.id
        });
    else
        $scope.leadsource = {};


    $scope.save = function() {

        if (!$("#leadsource_form").parsley('validate')) return;

        if (angular.isDefined($scope.leadsource.id)) {

            Leadsource.update({
                leadsource_id: $scope.leadsource.id
            }, $scope.leadsource, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/leadsources");
            })

        } else {
            Leadsource.save($scope.leadsource, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/leadsources");
            })

        }

    }

});




Qms.controller('ConfigCtrl', function($scope, $http, $state, $location, $stateParams, Config, FlashMessage) {
    $scope.config = Config.get();



    $scope.save = function() {

        if (!$("#config_form").parsley('validate')) return;

        //console.log($scope.config);
        Config.save($scope.config, function(data) {
            FlashMessage.setMessage(data);

            if (data.success) $location.path("/config");
        })


    }

});



Qms.controller('FinanceRatesCtrl', function($scope, $http, $state, $location, $stateParams, SellPrice, RentalPrice, FlashMessage) {
    $scope.sellprice = SellPrice.get();
    $scope.rentalprice = RentalPrice.get();


    $scope.saveSellPrice = function() {

        SellPrice.save($scope.sellprice, function(data) {
            FlashMessage.setMessage(data);

            if (data.success) $location.path("/finance_rates");
        })

    }

    $scope.saveRentalPrice = function() {

        RentalPrice.save($scope.rentalprice, function(data) {
            FlashMessage.setMessage(data);

            if (data.success) $location.path("/finance_rates");
        })

    }

});




Qms.controller('FlexiRentCtrl', function($scope, $http, $state, $location, $stateParams, FlexiRent, FlashMessage) {
    $scope.fr = FlexiRent.query(function(fr) {

    });


    $scope.remRow = function(i, type) {
        $scope.fr["fr_" + type].splice(i, 1);
    }

    $scope.addRow = function(type) {
        //console.log(type);
        $scope.fr["fr_" + type].push({});
    }


    $scope.saveFREGST = function() {

        FlexiRent.save($scope.fr, function(data) {
            FlashMessage.setMessage(data);

            if (data.success) $location.path("/flexi_rent");
        })

    }

    $scope.saveRentalPrice = function() {

        RentalPrice.save($scope.rentalprice, function(data) {
            FlashMessage.setMessage(data);

            if (data.success) $location.path("/flexi_rent");
        })

    }

});

Qms.controller('ProductViewCtrl', function($scope, Products, $stateParams){
    var items = [];
        $scope.products = Products.query({id :$stateParams.id}, function() {
           var itemObj = $scope.products.items;
           $.each(itemObj, function(){
               var obj = $(this)[0];

               var item = [obj.name,obj.category,obj.description,obj.qty,obj.rrp_tax,obj.sell_price,obj.tax];

               items.push(item);

           });



        });

       function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] == null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';

        };
        var header ='Name,Category,Description,Quantity,Tax,RRP Tax,Sell Price\n';
        var csvFile = header;
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
    $("#downloadCsv").on("click", function() {
           exportToCsv("proposal-"+$stateParams.id+".csv",items);
    });

});


Qms.controller('ProposalListCtrl', function($scope, Scopes, $filter, $http, $state, Proposal, FlashMessage, $window, $timeout) {

    //console.log("fe:" + Scopes.get('DefaultCtrl').profile);
    $timeout(getProductsList, 1500);
    function getProductsList() {
        var pro = Scopes.get('DefaultCtrl').profile;
        if(pro.type=="admin"){
            $scope.proposals = Proposal.query();
        } else {
            $scope.proposals = Proposal.query({
                userid: pro.id
            });
        }

    }

    $scope.terms = [{
        id: 1,
        code: 'fr_egst',
        title: "FlexiRent"
    }, {
        id: 2,
        code: 'fr_promo_egst_6',
        title: "Flexieofy 6-Month Promo"
    }, {
        id: 3,
        code: 'fr_promo_egst_3',
        title: "FlexiLease"
    }, {
        id: 4,
        code: 'fr_fl_egst',
        title: "FlexiRent 3-Month Promo"

    }, {
        id: 5,
        code: 'fr_ict',
        title: "THORN Equipment Finance"
    }, {
        id: 6,
        code: 'fr_tef',
        title: "ICT -Special"
    }]

    $scope.months = [{
        id: 'm1',
        title: 24
    }, {
        id: 'm2',
        title: 36
    }, {
        id: 'm3',
        title: 48
    }, {
        id: 'm4',
        title: 60
    }];

    $scope.purchaseopts = [{
        id: '1',
        title: 'Finance plan'
    }, {
        id: '2',
        title: 'Outright'
    }];

    $scope.getTerm = function(id) {
        angular.forEach($scope.terms, function(val, key) {
            if (id == val.id) {
                return val.title;
            }
        })
    }

    $scope.getMonth = function(id) {
        angular.forEach($scope.terms, function(val, key) {
            if (id == val.id) {
                return val.title;
            }

        })
    }

    $scope.edit = function(row_id) {
        $state.go('edit_proposal', {
            id: row_id
        });
        }
    $scope.view_products = function(row_id) {
            $state.go('view_products',{
                id: row_id
            });
        }
    $scope.delete = function(row_id) {
        Proposal.delete({
            id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.proposals = Proposal.query();

        });
    }

    $scope.export = function(row_id) {

        /*$http.get('http://new.jimmydata.com/gf.php').success(function (data) {
            alert(row_id)
        });*/
        /*Proposal.delete({
            proposal_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.proposals = Proposal.query();
        });*/

        $window.open('http://103.15.156.8/~configapp/report'+row_id+'#/products');
    }

    $scope.email = function(row_id) {

        $http.get('http://new.jimmydata.com/gf.php?id='+row_id).success(function (data) {
            alert(row_id)
        });
    }
});


Qms.controller('ProposalCtrl', function($scope, $filter, $http, $state, $location, $stateParams, Salesrep, Leadsource, Telemarketer, Winback, Company, Product, Category, FlashMessage, FlexiRent,ProductRules,AssociatedProduct, Proposal) {


    $scope.parseInt = parseInt;
    $scope.parseFloat = parseFloat;

    $scope.salesreps = Salesrep.query();
    $scope.leadsources = Leadsource.query();
    $scope.telemarketers = Telemarketer.query();
    $scope.winbacks = Winback.query();
    $scope.companies = Company.query();
    $scope.products = Product.query();
    $scope.flexi_rent = FlexiRent.query();
    $scope.categories = Category.query();


    //edit
    if ($stateParams.id) {
        $scope.proposal = Proposal.get({
            id: $stateParams.id
        });

        //$scope.proposal.products = $scope.proposal.items;


    } else {
        $scope.proposal = {
            sites: [{name:"Site"}], products: [], company: []
        };

        $scope.level_weekly = "";
        $scope.proposal.hardware_discount = "";
        $scope.proposal.residual = "";
        $scope.proposal.call_discount = 0;
        $scope.grant_total = 0;
        $scope.grant_totalwf = 0;
        $scope.proposal.month = "m4";

        $scope.proposal.csit1 = 0;
        $scope.proposal.csit2 = 0;
        $scope.proposal.csit3 = 0;
        $scope.proposal.csit4 = 0;
        $scope.proposal.csit5 = 0;
        $scope.proposal.csit6 = 0;
        $scope.proposal.csit7 = 0;
        $scope.proposal.csit8 = 0;

        $scope.proposal.prop1 = 0;
        $scope.proposal.prop2 = 0;
        $scope.proposal.prop3 = 0;
        $scope.proposal.prop4 = 0;
        $scope.proposal.prop5 = 0;
        $scope.proposal.prop6 = 0;
        $scope.proposal.prop7 = 0;
        $scope.proposal.prop8 = 0;

        $scope.proposal.mdis1 = 0;
        $scope.proposal.mdis2 = 0;
        $scope.proposal.mdis3 = 0;
        $scope.proposal.mdis4 = 0;
        $scope.proposal.mdis5 = 0;
    }
    $scope.proposal.purchaseopt = 1;
    //edit

    $scope.terms = [{
        id: 1,
        code: 'fr_egst',
        title: "FlexiRent"
    }, {
        id: 2,
        code: 'fr_promo_egst_6',
        title: "Flexieofy 6-Month Promo"
    }, {
        id: 3,
        code: 'fr_promo_egst_3',
        title: "FlexiRent 3-Month Promo"
    }, {
        id: 4,
        code: 'fr_fl_egst',
        title: "FlexiLease"
    }, {
        id: 5,
        code: 'fr_ict',
        title: "THORN Equipment Finance"
    }, {
        id: 6,
        code: 'fr_tef',
        title: "ICT -Special"
    }]

    $scope.months = [{
        id: 'm1',
        title: 24
    }, {
        id: 'm2',
        title: 36
    }, {
        id: 'm3',
        title: 48
    }, {
        id: 'm4',
        title: 60
    }];

    $scope.proposal.residual = 0.6;

    $scope.purchaseopts = [{
        id: '1',
        title: 'Finance plan'
    }];

    /*
    , {
        id: '2',
        title: 'Outright'
    }
    */

    $scope.buttoms = [{
        id: 'b',
        title: 'Buttom'
    }];

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $scope.updateGlobRent(0);
    });

    $scope.cleanPro = function(index) {
        var filobj = $filter('filter')($scope.proposal.products, { scs: index });

        angular.forEach(filobj, function(val, key) {
            $scope.proposal.products.splice($scope.proposal.products.indexOf(val),1);
        })
    }

    $scope.remRow = function(index) {
        $scope.proposal.products.splice($scope.proposal.products.indexOf(index), 1);
    }

    $scope.addRowCat = function(indexS, indexF) {
        $scope.proposal.products.push({
            scs: indexS + "-" + indexF
        });
    }

    $scope.addRowCatRadio = function(indexS, indexF, indexciD, index1, index2, index3) {
        $scope.cleanPro(indexS + "-" + indexF);


        var cd = $filter('filter')($scope.categories, {parent:indexciD});
        var pd = $filter('filter')($scope.products, {cat_id:cd[0].id});


        //angular.element('#upload').trigger('click');
        var item = $scope.proposal.products.push({
            scs: indexS + "-" + indexF,
            cat: pd[0].cat_id,
            id: pd[0].id,
            qty: 1,
            tax: 25,
            rrp_tax: 1000,
            sell_price: 100,
            imaged: '',
            desc: '',
            show: '',
            pos: index1 + "-" + index2 + "-" + index3
        });

        //max(array_keys($array))
        var msd = $scope.proposal.products.length - 1;

        //console.log("AddRadio---index1"+index1+"index2"+index2+"index3"+index3+"item="+$scope.proposal.products[msd]);
        $scope.updateProductRow(pd[0].id, index1, index2, index3, $scope.proposal.products[msd]);
    }

    $scope.addSite = function(type) {

        $scope.proposal.sites.push({name:"Site"});

    }

    $scope.checkButtom = function(val, val2) {

        if (typeof val != 'undefined') {
            return true;
        } else {
            return false;
        }
    }

    $scope.updateCatRow = function(cat, index1, index2, index3) {
        var curr_prod = null;

        angular.forEach($scope.products, function(val, key) {
            if (cat == val.cat_id) {
                curr_prod = val;
                asa = val.description;
                $scope.proposal.sites[index1][index1].catf[index2].pro[index3] = {
                    cat: val.cat_id,
                    post: index3
                };
            }
        })
    }

    $scope.updateProductRow = function(id, index1, index2, index3, item) {
        var curr_prod = null;
        var posti = ($scope.proposal.products.length-1);
        var pst = $scope.proposal.products.indexOf(item);

        //console.log("updateProductRow---index1"+index1+"index2"+index2+"index3"+index3+"item="+item);

                //


        angular.forEach($scope.products, function(val, key) {
            if (id == val.id) {
                curr_prod = val;
                asa = val.description; //strlen(val.description) > 50 ? substr(val.description,0,50).'...' : val.description;
                $scope.proposal.products[pst] = {
                    scs: index1 + "-" + index2,
                    cat: val.cat_id,
                    id: val.id,
                    qty: 1,
                    tax: val.tax,
                    rrp_tax: val.tax,
                    sell_price: val.price,
                    imaged: val.image,
                    desc: asa,
                    show: val.hider,
                    pos: index1 + "-" + index2 + "-" + index3
                };
            }
        })

        $scope.updateRent(pst);

        if (curr_prod.linked_product) {
            for (var i = 0; i < curr_prod.linked_product.length; i++) {
                angular.forEach($scope.products, function(val, key) {
                    if (curr_prod.linked_product[i] == val.id) {
                        posti = posti+1;
                        $scope.proposal.products.push({
                            scs: index1 + "-" + index2,
                            cat: val.cat_id,
                            id: val.id,
                            qty: 1,
                            tax: val.tax,
                            rrp_tax: val.tax,
                            sell_price: val.price,
                            imaged: val.image,
                            desc: asa,
                            show: val.hider,
                            pos: index1 + "-" + index2 + "-" + posti
                        });
                        $scope.updateRent(posti);
                    }
                })
            }
        }

    }

    $scope.updateRent = function(index) {
        if (angular.isDefined($scope.proposal.term))
            var rent = $scope.flexi_rent[$scope.terms[$scope.proposal.term - 1].code];
            var curr_month = null;

        if (angular.isDefined($scope.proposal.month)) {
            angular.forEach($scope.months, function(val, key) {
                if (val.id == $scope.proposal.month) {
                    curr_month = val;
                }
            });
        }



        var totalPrice = $scope.proposal.products[index].sell_price;

        if (rent) {
            for (var i = 0; i < rent.length; i++) {
                if (totalPrice >= parseInt(rent[i].from) && totalPrice < parseInt(rent[i].to)) {
                    var r = totalPrice / 1000;
                    var r1 = totalPrice / curr_month.title;

                    $scope.proposal.products[index].monthly_rent = (rent[i][curr_month.id] * r + r1).toFixed(2);
                    $scope.proposal.products[index].weekly_rent = ($scope.proposal.products[index].monthly_rent / 30 * 7).toFixed(2);

                }

            }
        }

        $scope.updateGlobRent();
    }

    $scope.updateGlobRent = function(index) {
        var gtotal = 0;
        var gtotalpm = 0;

        if (angular.isDefined($scope.proposal.month)) {
            angular.forEach($scope.months, function(val, key) {
                if (val.id == $scope.proposal.month) {
                    curr_month = val;
                }
            });
        }

        if($scope.proposal.purchaseopt == '1'){
            angular.forEach($scope.proposal.products, function(val, key) {
                gtotal = (gtotal + parseInt(val.monthly_rent));
            })
            if( $scope.proposal.hardware_discount!=""){
                if( $scope.proposal.term == "3"){
                    res = ( ( (parseInt(curr_month.title) * parseInt(gtotal)) - parseInt($scope.proposal.hardware_discount) ) * 0.6 ) / 100;
                    gtotalpm = (parseInt(curr_month.title) * parseInt(gtotal)) - parseInt($scope.proposal.hardware_discount) - parseInt(res);
                }else{
                    gtotalpm = (parseInt(curr_month.title) * parseInt(gtotal)) - parseInt($scope.proposal.hardware_discount);
                }
                gtotal =  parseInt(gtotalpm) / parseInt(curr_month.title)
            }else{
                if( $scope.proposal.term == "3"){
                    res = ( ( (parseInt(curr_month.title) * parseInt(gtotal)) ) * 0.6 ) / 100;
                    gtotalpm = (parseInt(curr_month.title) * parseInt(gtotal)) - parseInt(res);
                }else{
                    gtotalpm = (parseInt(curr_month.title) * parseInt(gtotal));
                }
                gtotal =  parseInt(gtotalpm) / parseInt(curr_month.title);
            }

            $scope.level_weekly = " Monthly ";
            $scope.grant_total = gtotal;
            $scope.grant_totalwf = gtotal * parseInt(curr_month.title);
        }else{
            angular.forEach($scope.proposal.products, function(val, key) {
                gtotal = (gtotal + parseInt(val.sell_price));
            })

            if( $scope.proposal.hardware_discount!=""){
                gtotalpm = parseInt(gtotal) - parseInt($scope.proposal.hardware_discount);
                gtotal =  parseInt(gtotalpm);
            }

            $scope.level_weekly = "";
            $scope.grant_total = gtotal;
            $scope.grant_totalwf = 0;
        }
    }

    $scope.updateQty = function(id, item) {

        var index = $scope.proposal.products.indexOf(item);

        $scope.proposal.products[index].rrp_tax = $scope.proposal.products[index].qty * $scope.proposal.products[index].tax;

        angular.forEach($scope.products, function(val, key) {
            if (id == val.id) {
                $scope.proposal.products[index].sell_price = $scope.proposal.products[index].qty * val.price;
            }
        })

        $scope.updateRent(index);
    }

    $scope.updateRows = function() {

        if ($scope.proposal.products) {
          $scope.proposal.limitArr = [];

            var limitArr =[];
            var length = $scope.proposal.products.length;
            for (var i =0; i< length ; i ++) {
                if ($scope.proposal.products[i].associated == true) {
                    $scope.proposal.products[i].splice(i,1);
                }
            }
            for (var i = 0; i < length; i++) {
                var item = $scope.proposal.products[i];
               $scope.getAssPrdt(item);

                $scope.updateRent(i);
            }


        }

    }
    $scope.getAssPrdt = function(item) {
         ProductRules.query({id:item.id}, function(productRules) {

                    angular.forEach(productRules, function(val, key) {
                        var quantity = parseInt(item.qty);
                        AssociatedProduct.query({product_id:val.product}, function(associatedProduct) {
                            if (associatedProduct != null) {
                                if(val.rule == "a") {
                                   var found = false;
                                    for (var j = 0; j< $scope.proposal.products.length; j++) {

                                        if (parseInt($scope.proposal.products[j].id) == parseInt(associatedProduct.id)) {

                                            found = true; // the associated product already exist.
                                            $scope.proposal.products[j].qty += quantity;
                                            $scope.updateRent(j);
                                            break;
                                        }
                                    }
                                    if (found === false) {
                                        $scope.proposal.products.push({
                                            scs: "",
                                            cat: associatedProduct.cat_id,
                                            id: associatedProduct.id,
                                            qty: quantity,
                                            tax: associatedProduct.tax,
                                            rrp_tax: associatedProduct.tax,
                                            sell_price: associatedProduct.price,
                                            imaged: associatedProduct.image,
                                            desc: associatedProduct.description,
                                            show: associatedProduct.hider,
                                            pos: "",
                                            associated : true
                                        });
                                      $scope.updateRent($scope.proposal.products.length-1);
                                    }

                                } else if (val.rule == "b") {
                                   var found = false;
                                   var limit = parseInt(val.limit);
                                   var newQty;
                                   for (var j = 0; j< $scope.proposal.products.length; j++) {
                                        if (parseInt($scope.proposal.products[j].id) == parseInt(associatedProduct.id)) {

                                            found = true; // the associated product already exist.

                                            for (var i = 0; i< $scope.proposal.limitArr.length; i++) {
                                                if ($scope.proposal.limitArr[i].id == parseInt(associatedProduct.id)) {
                                                    $scope.proposal.limitArr[i].count += quantity;

                                                    if ( $scope.proposal.limitArr[i].count > limit ) {
                                                      newQty = parseInt($scope.proposal.limitArr[i].count/limit)+1;

                                                    } else {
                                                       newQty = 1;

                                                    }
                                                    break;
                                                }

                                            }
                                            $scope.proposal.products[j].qty = newQty;
                                            $scope.updateRent(i);
                                            break;
                                        }

                                   }
                                   if (found == false) {


                                       if(quantity > limit) {
                                          newQty = parseInt(quantity / limit)+1;
                                       } else {
                                         newQty = 1;
                                       }
                                           $scope.proposal.products.push({
                                            scs: "",
                                            cat: associatedProduct.cat_id,
                                            id: associatedProduct.id,
                                            qty: newQty,
                                            tax: associatedProduct.tax,
                                            rrp_tax: associatedProduct.tax,
                                            sell_price: associatedProduct.price,
                                            imaged: associatedProduct.image,
                                            desc: associatedProduct.description,
                                            show: associatedProduct.hider,
                                            pos: "",
                                            associated : true
                                        });
                                            $scope.proposal.limitArr.push({
                                               count : quantity,
                                               id : associatedProduct.id
                                            });
                                          $scope.updateRent($scope.proposal.products.length-1);


                                   }


                                } else if (val.rule == "c") {
                                    var found = false;
                                    for (var j = 0; j< $scope.proposal.products.length; j++) {
                                      if (parseInt($scope.proposal.products[j].id) == parseInt(associatedProduct.id)) {
                                          console.log("match found");
                                          var newQty = parseInt($scope.proposal.products[j].qty) - quantity;
                                          console.log(newQty);
                                          if(newQty > 0) {
                                              $scope.proposal.products[j].qty = newQty;
                                          } else {
                                              $scope.proposal.products.splice(j,1);
                                          }
                                          $scope.updateGlobRent();
                                          break;
                                      }
                                    }


                                } else if (val.rule == "d") {
                                    var start = parseInt(val.start_range);
                                    var end = parseInt(val.end_range);
                                    if(quantity >= start && quantity <= end) {
                                        var limit = val.limit;
                                        var found = false;
                                        for (var j = 0; j< $scope.proposal.products.length; j++) {

                                            if (parseInt($scope.proposal.products[j].id) == parseInt(associatedProduct.id)) {

                                                found = true; // the associated product already exist.
                                                $scope.proposal.products[j].qty = parseInt($scope.proposal.products[j].qty) + quantity;
                                                $scope.updateRent(j);
                                                break;
                                            }
                                        }
                                        if (found === false) {
                                            $scope.proposal.products.push({
                                                scs: "",
                                                cat: associatedProduct.cat_id,
                                                id: associatedProduct.id,
                                                qty: limit,
                                                tax: associatedProduct.tax,
                                                rrp_tax: associatedProduct.tax,
                                                sell_price: associatedProduct.price,
                                                imaged: associatedProduct.image,
                                                desc: associatedProduct.description,
                                                show: associatedProduct.hider,
                                                pos: "",
                                                associated : true
                                            });
                                            $scope.updateRent($scope.proposal.products.length-1);
                                        }
                                    }

                                }
                        }
                    });
                });
            });

    }

    $scope.save = function() {

        /*if (!$("#products_form").parsley('validate'))
            return;
        alert("fe");*/
        if (angular.isDefined($scope.proposal.id)) {
            Proposal.update({
                proposal_id: $scope.proposal.id
            }, $scope.proposal, function(data) {
                FlashMessage.setMessage(data);
                if (data.success)
                    $location.path("/proposals");
            })
        } else {
            //$scope.proposal.items = $scope.proposal.products;

            Proposal.save($scope.proposal, function(data) {
                FlashMessage.setMessage(data);

                if (data.success)
                    $location.path("/proposals");

            })

        }
    }

});

Qms.controller("FormDataCtrl", function($scope, $rootScope, $interval, $window, $anchorScroll, $location, $timeout, $http, Scopes, Form, FlashMessage, ngDialog) {

    $scope.scheduleCount = 0;
    $scope.locationCount = 0;
    $scope.addTelCount = 0;
    $scope.addMobPortCount = 0;
    $scope.htmlData = {};
    $scope.discountArr = {};
    $scope.companyLocations = [];
    $rootScope.draftMode = false;
    $scope.locationAvailableTemps = [
        'voice_cap',
        'voice_std',
        'voice_comp',
        'voice_solution_untimed',
        'voice_essentials_cap',
        'voice_solution_standard',
        'data_adsl',
        'ip_midband',
        'ip_midbandunli',
        'nbnUnlimited',
        'nbn',
        'mobile_mega',
        'mobile_ut',
        'mobile_wireless',
        '1300',
        '1300_discounted',
        'fibre',
        'ethernet',
        'telstraUntimed',
        'telstraWireless',
        'printer',
        'schedule_of_goods'
    ];

    $scope.items = {
        'voice_cap'               : [0],
        'voice_std'               : [0],
        'voice_comp'              : [0],
        'voice_solution_untimed'  : [0],
        'voice_essentials_cap'    : [0],
        'voice_solution_standard' : [0],
        'data_adsl'               : [0],
        'ip_midband'              : [0],
        'ip_midbandunli'          : [0],
        'nbn'                     : [0],
        'nbnUnlimited'            : [0],
        'mobile_mega'             : [0],
        'mobile_ut'               : [0],
        'mobile_wireless'         : [0],
        '1300'                    : [0],
        '1300_discounted'         : [0],
        'fibre'                   : [0],
        'ethernet'                : [0],
        'telstraUntimed'          : [0],
        'telstraWireless'         : [0],
        'printer'                 : [0],
        'schedule_of_goods'       : [0]
    };

    $scope.ethernet_plans = [
        {'description' : 'Up to 10Mbps/10Mbps* Unlimited','price':499},
        {'description' : 'Up to 20Mbps/20Mbps* Unlimited','price':599},
    ];

    $scope.nbnUnlimited_plans = [
        {'description' : 'NBN 25/5 Unlimited','price':159},
        {'description' : 'NBN 50/20 Unlimited','price':179},
        {'description' : 'NBN 100/40 Unlimited','price':189}
    ];

    $scope.mobile_mega_plans = [
        {'description' : 'Cap 39','inclusions' : '$250 inc. calls 500MB','price':39},
        {'description' : 'Cap 49','inclusions' : '$2500 inc. calls 2GB','price':49},
        {'description' : 'Cap 59','inclusions' : '$2500 inc. calls 3GB','price':59},
    ];
    $scope.data_bolt_on_plans = [
        {'description' : 'Data Bolt-on 1GB','memory': '1GB','price':9.89,'itemIndex':0},
        {'description' : 'Data Bolt-on 5GB','memory': '5GB','price':31.99,'itemIndex':1}
    ];
    
    $scope.mobile_rate_plans = [
        {'plan' : 'Select a Mobile Plan','inclusions':''},
        {'group':'Telstra 4G','plan':'Telstra 4G Lite','inclusions':'$1000 Calls 1GB Data','price':49,'itemIndex':0},
        {'group':'Telstra 4G','plan':'Telstra 4G Business Executive','inclusions':'Unlimited Calls 3GB Data','price':69,'itemIndex':1},
        {'group':'Telstra 4G','plan':'Telstra 4G Business Professional','inclusions':'Unlimited Calls 7GB Data','price':79,'itemIndex':2},
        {'group':'Telstra 4G','plan':'Telstra 4G Business Maximum','inclusions':'Unlimited Calls 10GB Data','price':89,'itemIndex':3},
        {'group':'Mobile Mega','plan':'Mobile Mega Cap 39','inclusions':'$250 inc. calls 500Mb','price':39,'itemIndex':0},
        {'group':'Mobile Mega','plan':'Mobile Mega Cap 49','inclusions':'$2500 inc. calls 2GB','price':49,'itemIndex':1},
        {'group':'Mobile Mega','plan':'Mobile Mega Cap 59','inclusions':'$2500 inc. calls 3GB','price':59,'itemIndex':2},
        {'group':'Mobile 4G Untimed','plan':'Moblie 4G Untimed 49','inclusions':'Includes 700MB','price':49,'itemIndex':0},
        {'group':'Mobile 4G Untimed','plan':'Moblie 4G Untimed 59','inclusions':'Includes 2GB','price':59,'itemIndex':1},
        {'group':'Mobile 4G Untimed','plan':'Moblie 4G Untimed 79','inclusions':'Includes 4GB and 300 INTERNATIONAL MINS','price':79,'itemIndex':2},
        {'group':'Mobile 4G Untimed','plan':'Moblie 4G Untimed 89','inclusions':'Includes 6GB and 300 INTERNATIONAL MINS','price':89,'itemIndex':3}
    ];

    $scope.configMobPort = [
        {'confAccHolder':'','confMobNo':'','confProvider':'','confAccNo':'','confPatPlan':$scope.mobile_rate_plans[0],'boltOn':{}}
    ];

    $scope.adsl_plans = [
        {'description' : 'ADSL 2 + LITE','details' : '(Unlimited Lite (no static IP))','price':79},
        {'description' : 'ADSL 2 + Unlimited','details' : 'Business Grade (ON NET)','price':109},
        {'description' : 'ADSL 2 + 100GB','details' : 'Business Grade (OFF NET)','price':109},
        {'description' : 'ADSL 2 + 200GB','details' : 'Business Grade (OFF NET)','price':129},
        {'description' : 'ADSL 2 + 300GB','details' : 'Business Grade (OFF NET)','price':139},
        {'description' : 'ADSL 2 + 500GB','details' : 'Business Grade (OFF NET)','price':149},
        {'description' : 'ADSL 2 + 1TB','details' : 'Business Grade (OFF NET)','price':169},
    ];

    $scope.telstraUntimed_plans = [
        {'description' : 'Lite','inclusions' : 'INCLUDES $1000 National Calls,INCLUDES 1GB,UNLIMITED NATIONAL SMS,$0.69 PER MMS','price':49},
        {'description' : 'Business Executive','inclusions' : 'UNLIMITED NATIONAL CALLS,INCLUDES 3GB,UNLIMITED NATIONAL SMS,UNLIMITED NATIONAL MMS,100 INTERNATIONAL MINS*','price':69},
        {'description' : 'Business Professional','inclusions' : 'UNLIMITED NATIONAL CALLS,INCLUDES 7GB,UNLIMITED NATIONAL SMS,UNLIMITED NATIONAL MMS,300 INTERNATIONAL MINS*','price':79},
        {'description' : 'Business Maximum','inclusions' : 'UNLIMITED NATIONAL CALLS,INCLUDES 10GB,UNLIMITED NATIONAL SMS,UNLIMITED NATIONAL MMS,300 INTERNATIONAL MINS*','price':89},
    ];


    $scope.telstraWireless_plans = [
        {'description' : 'Broadband Wireless','price':43},
        {'description' : 'Broadband Wireless','price':64},
        {'description' : 'Broadband Wireless','price':93}
    ];

    $scope.ip_midbandunli_plans = [
        {'description' : '10Mbps/10Mbps*','price':549},
        {'description' : '20Mbps/20Mbps*','price':699},
        {'description' : '40Mbps/40Mbps*','price':999}
    ];

    $scope.ip_midband_plans = [
        {'description' : '6Mbps/6Mbps*','price':319},
        {'description' : '8Mbps/8Mbps*','price':349},
        {'description' : '18Mbps/18Mbps*','price':399},
        {'description' : '20Mbps/20Mbps*','price':449},
        {'description' : '30Mbps/30Mbps*','price':799},
        {'description' : '40Mbps/40Mbps*','price':849}
    ];

    $scope.professional_install = [
        {'description' : 'ASDL 2+ 20/1Mbps','price':399},
        {'description' : 'ASDL 2+ 20/3 to 40Mbps Midband','price':599},
    ];

    $scope.download_plans = [
        {'description' : '50 GB','price':19},
        {'description' : '100 GB','price':35},
        {'description' : '200 GB','price':69},
        {'description' : '300 GB','price':99},
        {'description' : '500 GB','price':149},
        {'description' : '1000 GB','price':289}
    ];

    $scope.mobile_4G_Untimed_Calls = [
        {'description' : '4G Untimed 49','inclusions' : 'Includes 700MB','price':49},
        {'description' : '4G Untimed 59','inclusions' : 'Includes 2GB','price':59},
        {'description' : '4G Untimed 79','inclusions' : 'Includes 4GB,300 INTERNATIONAL MINS*','price':79},
        {'description' : '4G Untimed 89','inclusions' : 'Includes 6GB,300 INTERNATIONAL MINS*','price':89}
    ];

    $scope.wireless_cap_plans = [
        {'description' : 'Wireless 15 - 500MB','price':15},
        {'description' : 'Wireless 19 - 1GB','price':19},
        {'description' : 'Wireless 29 - 2GB','price':29},
        {'description' : 'Wireless 39 - 3GB','price':39},  
        {'description' : 'Wireless 44 - 4GB','price':44},
        {'description' : 'Wireless 49 - 6GB','price':49},
        {'description' : 'Wireless 59 - 8GB','price':59},
        {'description' : 'Wireless 119 - 12GB','price':119}
    ];

    $scope.fibre_unli_plans = [
        {'description' : '10Mbps / 10Mbps Unlimited','price':599},
        {'description' : '20Mbps / 20Mbps Unlimited','price':699},
        {'description' : '100Mbps / 100Mbps Unlimited','price':1199},
        {'description' : '400Mbps / 400Mbps Unlimited','price':758},
        {'description' : '500Mbps / 500Mbps Unlimited','price':1599},
        {'description' : '1000Mbps / 1000Mbps Unlimited','price':1929}
    ]

    $http.get("profile").success(function(response) {
        $scope.profile = response;
    });
    
    $scope.dollarSign = function(val){
        var strCurrency = '';
        if (angular.isDefined(val))
            strCurrency = '$' + val;
        //alert(strCurrency);
        return strCurrency;
    }

    $scope.isEmptyArray = function(arr) {
        return angular.equals([], arr);
    }

    $scope.reset = function() {
        $scope.formData = {};
    };
    $scope.reset();

    // Define initial vairables.
    $scope.formData.comLocation = {};
    $scope.formData.comLocation = {
        'voice_cap'               : [],
        'voice_std'               : [],
        'voice_comp'              : [],
        'voice_solution_untimed'  : [],
        'voice_essentials_cap'    : [],
        'voice_solution_standard' : [],
        'data_adsl'               : [],
        'ip_midband'              : [],
        'ip_midbandunli'          : [],
        'nbn'                     : [],
        'nbnUnlimited'            : [],
        'mobile_mega'             : [],
        'mobile_ut'               : [],
        'mobile_wireless'         : [],
        '1300'                    : [],
        '1300_discounted'         : [],
        'fibre'                   : [],
        'ethernet'                : [],
        'telstraUntimed'          : [],
        'telstraWireless'         : [],
        'printer'                 : [],
        'schedule_of_goods'       : []
    };

    $scope.formData.comSuburb = {};
    $scope.formData.comSuburb = {
        'voice_cap'               : [],
        'voice_std'               : [],
        'voice_comp'              : [],
        'voice_solution_untimed'  : [],
        'voice_essentials_cap'    : [],
        'voice_solution_standard' : [],
        'data_adsl'               : [],
        'ip_midband'              : [],
        'ip_midbandunli'          : [],
        'nbn'                     : [],
        'nbnUnlimited'            : [],
        'mobile_mega'             : [],
        'mobile_ut'               : [],
        'mobile_wireless'         : [],
        '1300'                    : [],
        '1300_discounted'         : [],
        'fibre'                   : [],
        'ethernet'                : [],
        'telstraUntimed'          : [],
        'telstraWireless'         : [],
        'printer'                 : [],
        'schedule_of_goods'       : []
    };

    $scope.formData.comZipCode = {};
    $scope.formData.comZipCode = {
        'voice_cap'               : [],
        'voice_std'               : [],
        'voice_comp'              : [],
        'voice_solution_untimed'  : [],
        'voice_essentials_cap'    : [],
        'voice_solution_standard' : [],
        'data_adsl'               : [],
        'ip_midband'              : [],
        'ip_midbandunli'          : [],
        'nbn'                     : [],
        'nbnUnlimited'            : [],
        'mobile_mega'             : [],
        'mobile_ut'               : [],
        'mobile_wireless'         : [],
        '1300'                    : [],
        '1300_discounted'         : [],
        'fibre'                   : [],
        'ethernet'                : [],
        'telstraUntimed'          : [],
        'telstraWireless'         : [],
        'printer'                 : [],
        'schedule_of_goods'       : []       
    };

    $scope.formData.voiceFaxToEmail = {};
    $scope.formData.voiceFaxQty = {};
    $scope.formData.voiceMobility = {};
    $scope.formData.voiceMobQty = {};

    $scope.formData.voiceStdFaxToEmail = {};
    $scope.formData.voiceStdFaxQty = {};
    $scope.formData.voiceStdMobility = {};
    $scope.formData.voiceStdMobQty = {};

    $scope.formData.voiceCompAnalouge = {};
    $scope.formData.voiceCompBri = {};
    $scope.formData.voiceCompFaxToEmail = {};
    $scope.formData.voiceCompFaxQty = {};
    $scope.formData.voiceCompMobility = {};
    $scope.formData.voiceCompMobQty = {};
    $scope.formData.voiceCompDID = {};
    $scope.formData.voiceCompAnalougeDis = {};
    $scope.formData.voiceCompBriDis = {};
    $scope.formData.voiceCompPriDis = {};
    $scope.formData.voiceCompPri = {};

    $scope.formData.voiceUntimedFaxToEmail = {};
    $scope.formData.voiceUntimedFaxQty = {};
    $scope.formData.voiceUntimedMobility = {};
    $scope.formData.voiceUntimedMobQty = {};

    $scope.formData.voiceSolutionFaxToEmail = {};
    $scope.formData.voiceSolutionFaxQty = {};
    $scope.formData.voiceSolutionMobility = {};
    $scope.formData.voiceSolutionMobQty = {};

    $scope.formData.ipMidbandDownload = {
        0:$scope.download_plans[0]
    };
    
    $scope.formData.adsl2Plans = {
        0:$scope.adsl_plans[0]
    }

    $scope.formData.telstraUntimedPlans = {
        0:$scope.telstraUntimed_plans[0]
    }

    $scope.formData.telstraWirelessPlans = {
        0:$scope.telstraWireless_plans[0]
    }

    $scope.formData.ethernetPlans = {
        0:$scope.ethernet_plans[0]
    }

    $scope.formData.UnlimitedPlans = {
        0:$scope.nbnUnlimited_plans[0]
    }

    $scope.formData.ipMidbandPlans = {
        0:$scope.ip_midband_plans[0]
    };

    $scope.formData.ipMidbandUnliPlans = {
        0:$scope.ip_midbandunli_plans[0]
    };

    $scope.formData.ipMidbandUnliProf = {
        0:$scope.professional_install[0]
    };

    $scope.formData.ipMidbandDownloadVoice = {
        0:$scope.download_plans[0]
    };

    $scope.formData.ipMidbandPlansVoice = {
        0:$scope.ip_midband_plans[0]
    };

    $scope.formData.mobileUtPlans = {
        0:$scope.mobile_4G_Untimed_Calls[0]
    };

    $scope.formData.fibreUtPlans = {
        0:$scope.fibre_unli_plans[0]
    };

    $scope.formData.mobileWirelessPlans = {
        0:$scope.wireless_cap_plans[0]
    };

    $scope.formData.voiceCompAnalougeDSL = {
        0:0
    };

    $scope.formData.voiceCompAnalougeNBNMonthly = {
        0:0
    };

    $scope.formData.voiceCompAnalougeNBNUnli = {
        0:0
    };

    $scope.formData.voiceCompAnalouge = {
        0:0
    };

    $scope.formData.voiceCompBri = {
        0:0
    };

    $scope.formData.qt1300new = {};
    $scope.formData.qt800new = {};
    $scope.formData.qt13new = {};


    // $scope.draftMode = function (val){
    //     $rootScope.isDraftMode = val;
    //     $scope.closeThisDialog();
    // }

    $scope.formData.aCardExpiry = '';

    $scope.updateCardExpiry = function (year,month){
        var monthNum=month + "";
        while (monthNum.length < 2)
            monthNum = "0" + monthNum;
        $scope.formData.aCardExpiry = monthNum + '/' + year;
        //alert($scope.formData.aCardExpiry);
    }

    // $scope.preSignDocument = function() {
    //     $scope.template = "templates/forms/pre_sign.html";
    //     ngDialog.open({
    //         template: $scope.template,
    //         plan: true,
    //         controller : 'FormDataCtrl',
    //         width: 500,
    //         height: 500,
    //         scope: $scope,
    //         className: 'ngdialog-theme-default presign',
    //         showClose: true,
    //         closeByEscape: true,
    //         closeByDocument: true,
    //         preCloseCallback : function(value) {
    //             var signData = $('img.imported').attr('src');
    //             if ((!signData) && (!$rootScope.isDraftMode)) {
    //                 if (alert("You have not signed yet. Please sign to start filling out data. You can also select Draft Mode to be able to start.")) {
    //                     return true;
    //                 }
    //                 return false;
    //                 $timeout(angular.noop());
    //             }
    //         }
    //     });
    // }

    $scope.sendAsDraft = function(){
        var userProfile =  Scopes.get('DefaultCtrl').profile;
        var formHtmlData = new Array();
        var fileNameArr = new Array();
        //$interval.cancel(saveDraft);

        if (!angular.isDefined($scope.htmlData) || angular.equals({},$scope.htmlData)) {
          FlashMessage.setMessage({success:false, message:"No Forms Selected"});
          return;
        }
        $("#loading").show();
        angular.forEach($scope.htmlData, function(value,key) {
            var nametail = new Date().getTime();
            var rand = Math.floor((Math.random()*1000)+10);
            var fileName = key+rand+nametail+"-draft.pdf";
            fileNameArr.push(fileName);
            $("#downloadPdfBn").prop('disabled',true);
            formHtmlData.push({html:value, fileName : fileName});

        });

        var pdf = Form.update({htmlData :formHtmlData,
            userDetails : { name : $scope.formData.dName,
                                            email :$scope.formData.cEmail},
            account: {name: userProfile.name, email: userProfile.email}},
            function(data) {
            if($rootScope.editId) {
               var editId = $rootScope.editId;
               $rootScope.editId = null;
            }
            Form.save({ data : $scope.formData,
                        user : userProfile.id,
                        editId : editId,
                        fileName : fileNameArr,
                        type:"draft"}, function(data) {
                            if (data.success) {
                                //$scope.formData = {};
                                $("#loading").hide();
                                FlashMessage.setMessage({
                                    success:true,
                                    message:"The draft forms will be sent to your email shortly."
                                });
                            }
                        });
             });
    }

    $scope.saveDraftForm = function(templateName,formData) {
        $scope.template = "templates/forms/" + templateName + ".html?t=" + _version;
        //setting the values changed by Script.
        formData.dateVal = $("#dateVal").val();
        formData.pBirth  = $("#pBirth").val();
        formData.pIAddress = $("#pIAddress").val();
        formData.pIState = $("#pIState").val();
        formData.pIPostcode =  $("#pIPostcode").val();
        formData.aPeriod = 'monthly';
        formData.pISuburb =  $("#pISuburb").val();
        $rootScope.draftMode = true;
        $scope.userSign = "";

        // Check if exists empty location fields.
        var comLocationObj = $('input.' + templateName);
        var emptyLocationCnt = 0;
        angular.forEach(comLocationObj, function(item, index) {
            var location = $(item).val();
            if (!location) {
                emptyLocationCnt ++;                
            }
        });

        if (emptyLocationCnt) {
            return;
        }

        $(".reAssign").each(function() {
            var id = $(this).prop("id");
            formData[id] = $(this).val();
        });

        formData["type"] = {};

        $("input[name=formTypes]:checked").each(function() {
            var id = $(this).prop("id");
            formData["type"][id] = $(this).prop("checked");
        });

        if (formData.type.configApp) {
            var telNo = new Array();
            $(".telNo").each(function() {
                  var item = $(this).find("input");
                  var idCount = item.data('count');
                  var telRange = $('#telItemRange' + '-' + idCount).val()!=''?' to '+$('#telItemRange' + '-' + idCount).val():'';
                  var obj = {
                                  tel : item[0].value + telRange 
                            };
                  telNo.push(obj);
            });
            $scope.formData.configAppTelNo = telNo;
            // var mobPort = new Array();
            // $(".mob-port-box").each(function() {
            //     var confAccHolder = $(this).find(".confAccHolder");
            //     var confMobNo = $(this).find(".confMobNo");
            //     var confProvider = $(this).find(".confProvider");
            //     var confAccNo = $(this).find(".confAccNo");
            //     var confPatPlan = $(this).find(".confPatPlan");
            //     var confDob = $(this).find(".confDob");
            //     var confDLicence = $(this).find(".confDLicence");

            //     var obj = {
            //                     confAccHolder : confAccHolder[0].value,
            //                     confMobNo : confMobNo[0].value,
            //                     confProvider : confProvider[0].value,
            //                     confAccNo : confAccNo[0].value,
            //                     confPatPlan : confPatPlan[0].value,
            //                     confDob : confDob[0].value,
            //                     confDLicence : confDLicence[0].value,
            //               };
            //     mobPort.push(obj);
            // });
            $scope.formData.configMobPort = $scope.configMobPort;
        }

        if(formData.type.rental || formData.type.leasing ||formData.singleOrder) {
            formData["rental"] = {};
            var rental = parseInt(formData.aPayment.replace(/[^\d.]/g,''));
            formData["aGST"] = isNaN(rental) ? '0.00' : (rental*10/100).toFixed(2);
            formData["aTotal"] = isNaN(rental) ? '0.00' : (rental + rental*10/100).toFixed(2);
        }

        // var schedule = new Array();
        // var scheduleOptions = new Array();
        // angular.forEach($scope.formData.schItems, function(data) {
        //     if (angular.isDefined(formData.schOption)) {
        //         var obj = {
        //                     qty : formData.schQty[data.count],
        //                     desc :formData.schOption[data.count].item != '_' ? formData.schOption[data.count].item : ''
        //                 };
        //         scheduleOptions.push(obj);
        //     }
        // });

        // $(".schedule-goods").each(function() {
        //     var item = $(this).find("input");
        //     var obj = { qty : item[0].value,
        //                 desc :item[1].value,
        //                 //itemNo : item[2].value,
        //                 //serNo : item[3].value
        //             };
        //     schedule.push(obj);
        // });

        // $scope.formData.scheduleOptions = scheduleOptions;
        // $scope.formData.schedule = schedule;

        if($scope.editId) {
            $rootScope.editId = $scope.editId;
        }

        $rootScope.formData = formData;

        ngDialog.open({
            template: $scope.template,
            plan: true,
            controller : 'FormCtrl',
            width: 900,
            height: 600,
            scope: $scope,
            className: 'ngdialog-theme-default',
            preCloseCallback : function(value) {
                if (confirm("This will create a draft form. Continue?")) {
                    $scope.htmlData[templateName] = $(".ngdialog-content").html();
                    $scope[templateName] = true;
                    $timeout(angular.noop());
                    $('#isSigned').val('T');
                    $('#sendDraft').show();
                }
            }
        });

        $rootScope.$on('ngDialog.opened', function (e, $dialog) {
            var newHash = 'anchor';
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash('anchor');
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn not changed
                $location.hash('anchor');
                $anchorScroll();
            }
        });
    }
    
    $scope.sendDraftForms = function($id) {

        var forms = Form.downloadForms({id:id}, function(data) {
           if (data.success) {
               angular.forEach(data.files, function(name, index){
                    var filename = name.substr(0, name.indexOf('.')) + '.pdf'; 
                    window.open("assets/files/"+filename,'_blank');
               });
           }
        });
    }

    // setTimeout(function() {
    //    if (!$('.ngdialog.presign').length) {
    //         $scope.preSignDocument();
    //     }
    // }, 1000);

    $scope.changeColTransparent = function(val) {
        //console.log(val);
        if ((val.item == '_') || (val.plan=='_')) {
            $('.col-sel-desc .chosen-container').addClass('transparent');
        } else {
            $('.col-sel-desc .chosen-container').removeClass('transparent');
        }

        $scope.telstraPlans = [];
        $scope.mobileMegaPlans = [];
        $scope.mobile4GUntimedPlans = [];
        //console.log($scope.configMobPort);
        if (angular.isDefined(val.plan)){
            angular.forEach($scope.configMobPort,function(item,index){
                //console.log(item);
                if (item.confPatPlan.group=="Telstra 4G"){
                    if (angular.isUndefined($scope.telstraPlans[item.confPatPlan.itemIndex]))
                        $scope.telstraPlans[item.confPatPlan.itemIndex]=1;
                    else
                        $scope.telstraPlans[item.confPatPlan.itemIndex]++;
                } else if(item.confPatPlan.group=="Mobile Mega"){
                    if (angular.isUndefined($scope.mobileMegaPlans[item.confPatPlan.itemIndex]))
                        $scope.mobileMegaPlans[item.confPatPlan.itemIndex]=1;
                    else
                        $scope.mobileMegaPlans[val.itemIndex]++;
                    item.boltOn = {};
                } else if(item.confPatPlan.group=="Mobile 4G Untimed"){
                    if (angular.isUndefined($scope.mobile4GUntimedPlans[item.confPatPlan.itemIndex]))
                        $scope.mobile4GUntimedPlans[item.confPatPlan.itemIndex]=1;
                    else
                        $scope.mobile4GUntimedPlans[item.confPatPlan.itemIndex]++;
                    item.boltOn = {};
                }
            });
            // console.log($scope.telstraPlans);
            // console.log($scope.mobileMegaPlans);
            // console.log($scope.mobile4GUntimedPlans);
            $scope.processBoltOnCount();
            //console.log($scope.mobileMegaPlans);
        }        
    }

    $scope.processBoltOnCount = function(){
        $scope.boltOnPlans = [];
        angular.forEach($scope.configMobPort,function(item,index){
            //console.log(item.boltOn.itemIndex);
            if (angular.isDefined(item.boltOn.itemIndex)){
                if (angular.isUndefined($scope.boltOnPlans[item.boltOn.itemIndex])){
                    $scope.boltOnPlans[item.boltOn.itemIndex]=1;    
                } else {
                    $scope.boltOnPlans[item.boltOn.itemIndex]++;
                }
            }
        });
    }

    if ($rootScope.viewFormData != null) {
        if (angular.isDefined($rootScope.viewFormData)) {
            $scope.editId = $rootScope.viewFormData.id;
        }
    }

    Form.getScheduleGoods(function(data) {
        $scope.scheduleGoodsList = data.goods;
        //console.log(data.goods);
        $scope.scheduleGoodsList.unshift({
            item: "_"
        });
    });


    function onChangeTemp(e)
    {
        //console.log(e);
    }

    $scope.handleTermChange = function (formData) {
        formData.promotedText = '';
        if ( formData.aTerm == '48promoted') {
              formData.aTermNew = 48;
              formData.PromotedText = "(First 3 Payments $0, followed by 45 payments of rental amount)"
        }
        if  (formData.aTerm =='60promoted') {
            formData.aTermNew = 60;
            formData.PromotedText = "(First 3 Payments $0, followed by 57 payments of rental amount)"
        }
        if  (formData.aTerm =='60') {
            formData.aTermNew = 60;
        }
        if (formData.aTerm =='48') {
            formData.aTermNew = 48;
        }
        if (formData.aTerm =='36') {
            formData.aTermNew = 36;
        }
        if  (formData.aTerm =='24') {
            formData.aTermNew = 24;
        }
        if (formData.aTerm =='Outright') {
            formData.aTermNew = "Outright";
        }
        return formData
    }

    $(".validUrl").on("keyup", function() {
        var val = this.value.replace(/^(http\:\/\/)/,'');
        this.value = "http://"+val;
    });

    $(".onlyAlpha").on("keyup", function() {
       var val = this.value.replace(/\d/g,'');
       this.value = val;
    });
     $(".onlyNumber").on("keyup", function() {
       var val = this.value.replace(/\D/g,'');
       this.value = val;
    });

    $(".dollarSign").on("keyup", function() {
        var val = this.value.replace(/\D/g,'');
        var parts = val.toString().split(".");
        parts =  parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
        this.value = "$ "+parts;

        if (parts == "" || parts == "0") {
            this.value = "$ 0";
        } else {
            if (parts.indexOf("0") == 0) {
                parts = parts.replace("0","");
            }
            this.value = "$ "+parts;
        }
    });

    $("#dName").on("focusout", function() {
        $("#cContact").val($(this).val());
        $("#pName").val($(this).val());
    });

    $('#dSName').on("focusout", function() {
        $("#g2Name").val($(this).val());
    });

    $http.get("profile").success(function(response) {
        $scope.formData.wName = response.name;
        $scope.formData.userSign = response.sign;
    });

    $scope.transformTelFields  = function() {
        $('.tel').on("keyup", function()
        {
                var val = this.value.replace(/[^0-9]/ig, '');
                if (val.length >10) {
                    val = val.substr(0,10);
                }
                var newVal = '';
                if (val.length >2) {
                  newVal +='('+val.substr(0,2)+') ';
                  val = val.substr(2);
                }
                while (val.length > 4)   {
                  newVal += val.substr(0, 4) +'-';
                  val = val.substr(4);
                }
                newVal += val;
                this.value = newVal;
        });
        $('.telRange').on("keyup",function(){
            var val = this.value.replace(/[^0-9]/ig, '');
            if (val.length>4) {
                val = val.substr(0,4);
            }
            this.value = val;            
        });
    }

    $scope.addTel = function() {
        $timeout(function(){
            //var content = $(".addTelBtn").siblings(".telNo");
            var content = '';
            content = '<div class="row telNo form-row">\n';
            if ($scope.addTelCount==0){
                content += '<div class="row-element-label">\n\
                                <label class="control-label"></label>\n\
                            </div>\n\
                            <div class="row-element-field">\n\
                                <div class="col-md-6">\n\
                                From\n\
                                </div>\n\
                                <div class="col-md-6">\n\
                                To\n\
                            </div>\n\
                        </div>';
            }
            content +='     <div class="row-element-label">\n\
                                 <label class="control-label">Tel No</label>\n\
                                  \n\<i id="adTel-'+$scope.addTelCount+'" class="fa fa-times"></i>\n\
                             </div>\n\
                             <div class="row-element-field">\n\
                                <div class="col-md-6">\n\
                                    <input class="telItem tel form-control" data-count="' + $scope.addTelCount + '" id="telItemConfigApp-'+$scope.addTelCount+'" type="text" autofocus>\n\
                                </div>\n\
                                <div class="col-md-6">\n\
                                    <input class="telItem telRange form-control" data-count="' + $scope.addTelCount + '" id="telItemRange-'+$scope.addTelCount+'" type="text" autofocus>\n\
                                </div>\n\
                             </div>\n\
                          </div>';
            $(".addTelBtn").before(content);
            $("#telItemConfigApp-"+$scope.addTelCount).focus();
            $("#adTel-"+$scope.addTelCount).click(function() {
                  $(this).parent().parent().remove();
                  $scope.addTelCount--;
              });
            $scope.transformTelFields();
            $scope.addTelCount++;
        });

    }

    $scope.addPortingAuth = function() {
        // $timeout(function(){
        $newMobPort = {
            'confAccHolder':$scope.configMobPort[$scope.addMobPortCount].confAccHolder,
            'confMobNo':'',
            'confProvider':$scope.configMobPort[$scope.addMobPortCount].confProvider,
            'confAccNo':$scope.configMobPort[$scope.addMobPortCount].confAccNo,
            'confPatPlan':$scope.mobile_rate_plans[0],
            'boltOn' : {}
        };
        $scope.addMobPortCount++;
        $scope.configMobPort.push($newMobPort);
        //     //var content = $(".addTelBtn").siblings(".telNo");
        //     var content =$(".mob-port-box").html();
        //     var wrapped = "<div class='form-row mob-port-box' id='mob-port"+$scope.addMobPortCount+"'>"+content+"</div>";
        //     $(".portingAuthBtn").before(wrapped);
        //     $('.date').datetimepicker({
        //         format : "DD/MM/YYYY",
        //         defaultDate : today
        //     });
        //     $scope.transformTelFields();
        // });
    }

    $scope.saveAsDraft = function(formData) {
        if (!$scope.editId) {
            $scope.editId = "";
        }
        var user = Scopes.get('DefaultCtrl').profile;
        $(".reAssign").each(function() {
            var id = $(this).prop("id");
            formData[id] = $(this).val();

            if (id == "aPayout" && !$(this).val())
                formData[id] = "$ 0";
        });

        // var schedule = new Array();
        // var scheduleOptions = new Array();
        // // angular.forEach($scope.formData.schItems, function(data) {
        // //     if(angular.isDefined(formData.schOption)) {
        // //         /* If description added, we should set the quantity to 1 or entered value.*/
        // //         var qty;
        // //         if (angular.isUndefined(formData.schQty)) {
        // //             qty = '1';
        // //         } else {
        // //             qty = formData.schQty[data.count] == "null" ? '1' : formData.schQty[data.count];
        // //         }

        // //         if (angular.isUndefined(formData.schOption[data.count])) {
        // //             qty = '0';
        // //         } else {
        // //             var obj = {
        // //                     qty : qty,
        // //                     desc :formData.schOption[data.count].item != '_' ? formData.schOption[data.count].item : ''
        // //                 };
        // //             scheduleOptions.push(obj);
        // //         }
        // //     }
        // // });
        // // $(".schedule-goods").each(function() {
        // //       var item = $(this).find("input");
        // //             var obj = {
        // //                     qty : item[0].value,
        // //                     desc :item[1].value,
        // //                 };
        // //             schedule.push(obj);
        // //  });

        // // $scope.formData.schedule = schedule;
        // // $scope.formData.scheduleOptions = scheduleOptions;
        console.log(formData);
        Form.save({data:formData, user : user.id, fileName : '',
                    editId : $scope.editId, type:"draft"}, function(data) {
                        $scope.editId = data.editId;
        });
    }

    $scope.prepDiscounts = function(payment) {
      payment = payment.replace(/^\D+|\,+/g, '');
       $scope.EqPayment = payment;
      }

    $scope.updateComLocations = function (){
        $scope.formData.comLocation = {
            'voice_cap'               : [$scope.formData.pIAddress],
            'voice_std'               : [$scope.formData.pIAddress],
            'voice_comp'              : [$scope.formData.pIAddress],
            'voice_solution_untimed'  : [$scope.formData.pIAddress],
            'voice_essentials_cap'    : [$scope.formData.pIAddress],
            'voice_solution_standard' : [$scope.formData.pIAddress],
            'data_adsl'               : [$scope.formData.pIAddress],
            'ip_midband'              : [$scope.formData.pIAddress],
            'ip_midbandunli'          : [$scope.formData.pIAddress],
            'nbn'                     : [$scope.formData.pIAddress],
            'nbnUnlimited'            : [$scope.formData.pIAddress],
            'mobile_mega'             : [$scope.formData.pIAddress],
            'mobile_ut'               : [$scope.formData.pIAddress],
            'mobile_wireless'         : [$scope.formData.pIAddress],
            '1300'                    : [$scope.formData.pIAddress],
            '1300_discounted'         : [$scope.formData.pIAddress],
            'fibre'                   : [$scope.formData.pIAddress],
            'ethernet'                : [$scope.formData.pIAddress],
            'telstraUntimed'          : [$scope.formData.pIAddress],
            'telstraWireless'         : [$scope.formData.pIAddress],
            'printer'                 : [$scope.formData.pIAddress],
            'schedule_of_goods'       : [$scope.formData.pIAddress]
        };
    }

    $scope.updateComSuburbs = function (){
        $scope.formData.comSuburb = {
            'voice_cap'               : [$scope.formData.pISuburb],
            'voice_std'               : [$scope.formData.pISuburb],
            'voice_comp'              : [$scope.formData.pISuburb],
            'voice_solution_untimed'  : [$scope.formData.pISuburb],
            'voice_essentials_cap'    : [$scope.formData.pISuburb],
            'voice_solution_standard' : [$scope.formData.pISuburb],
            'data_adsl'               : [$scope.formData.pISuburb],
            'ip_midband'              : [$scope.formData.pISuburb],
            'ip_midbandunli'          : [$scope.formData.pISuburb],
            'nbn'                     : [$scope.formData.pISuburb],
            'nbnUnlimited'            : [$scope.formData.pISuburb],
            'mobile_mega'             : [$scope.formData.pISuburb],
            'mobile_ut'               : [$scope.formData.pISuburb],
            'mobile_wireless'         : [$scope.formData.pISuburb],
            '1300'                    : [$scope.formData.pISuburb],
            '1300_discounted'         : [$scope.formData.pISuburb],
            'fibre'                   : [$scope.formData.pISuburb],
            'ethernet'                : [$scope.formData.pISuburb],
            'telstraUntimed'          : [$scope.formData.pISuburb],
            'telstraWireless'         : [$scope.formData.pISuburb],
            'printer'                 : [$scope.formData.pISuburb],
            'schedule_of_goods'       : [$scope.formData.pISuburb]
        };
    }

    $scope.updateComPostCode = function (){
        $scope.formData.comZipCode = {
            'voice_cap'               : [$scope.formData.pIPostcode],
            'voice_std'               : [$scope.formData.pIPostcode],
            'voice_comp'              : [$scope.formData.pIPostcode],
            'voice_solution_untimed'  : [$scope.formData.pIPostcode],
            'voice_essentials_cap'    : [$scope.formData.pIPostcode],
            'voice_solution_standard' : [$scope.formData.pIPostcode],
            'data_adsl'               : [$scope.formData.pIPostcode],
            'ip_midband'              : [$scope.formData.pIPostcode],
            'ip_midbandunli'          : [$scope.formData.pIPostcode],
            'nbn'                     : [$scope.formData.pIPostcode],
            'nbnUnlimited'            : [$scope.formData.pIPostcode],
            'mobile_mega'             : [$scope.formData.pIPostcode],
            'mobile_ut'               : [$scope.formData.pIPostcode],
            'mobile_wireless'         : [$scope.formData.pIPostcode],
            '1300'                    : [$scope.formData.pIPostcode],
            '1300_discounted'         : [$scope.formData.pIPostcode],
            'fibre'                   : [$scope.formData.pIPostcode],
            'ethernet'                : [$scope.formData.pIPostcode],
            'telstraUntimed'          : [$scope.formData.pIPostcode],
            'telstraWireless'         : [$scope.formData.pIPostcode],
            'printer'                 : [$scope.formData.pIPostcode],
            'schedule_of_goods'       : [$scope.formData.pIPostcode]
        };
    }

    $scope.showPlan = function(plan){
        //console.log(plan);
    }

    $scope.calculateDiscount = function(currentVal,plan, planOptionId, completeOptions,optionId) {
        var payment = 0;
        var capTotalVal =0;
        //console.log(planOptionId);
        if (planOptionId != '') {
            var planStr = $("#"+planOptionId+" option:selected").text();
            var planVal =parseInt(planStr.match(/\$(\d+)/)[1]);
        }
        currentVal = parseInt(currentVal);
        //alert(currentVal);
        if(angular.isDefined($scope.EqPayment)) {
            payment = parseInt($scope.EqPayment);
        }
        //alert(completeOptions);
        var c_options = angular.isDefined(completeOptions)?completeOptions:0;
        //alert(c_options);
        $(".main-disc").each(function() {
            capTotalVal += parseInt($(this).val());
        });
        if (plan == 'voice-cap' || plan == 'data-plan' || plan == 'mobile-plan' ) {
            if (currentVal > planVal) {
                alert("Discount cannot exceed monthly payment");
                //$('#' + optionId).val('');
            } else {
                if(capTotalVal  == currentVal) {
                    if (currentVal> planVal/2) {
                        var disc = planVal/2;
                        alert("Maximum Discount should not go over $"+disc);
                        //$('#' + optionId).val('');
                    }
                } else {
                    var remaining = payment-(capTotalVal-currentVal);
                    if (remaining<0) {
                        remaining = 0;
                    }

                    var disc = remaining + planVal*30/100;
                    if (currentVal > disc) {
                        alert("Maximum Discount should not go over $"+disc);
                        //$('#' + optionId).val('');
                    }
                }
            }
        } else if (plan == 'standard-plan') {
            if (currentVal>100) {
                alert("Maximum Discount should not go over $100");
               // $('#' + optionId).val('');
            }
        }  else if (plan == 'complete-bri') {
            if (currentVal>50*c_options) {
                alert("Maximum Discount should not go over $"+50*c_options);
                //$('#' + optionId).val('');
            }
        } else if (plan == 'complete-pri') {
            if (currentVal>100*c_options) {
                alert("Maximum Discount should not go over $"+100*c_options);
               // $('#' + optionId).val('');
            }
        } else if (plan == 'complete-analog') {
            if (currentVal>(10*c_options)) {
                alert("Maximum Discount should not go over $" + 10*c_options);
                //$('#' + optionId).val('');
            }
        } else if (plan == 'complete-call' || plan == '1300-plan' || plan == 'standard-call') {
            if (currentVal> payment) {
                alert("Maximum Discount should not go over monthly payment");
                //$('#' + optionId).val('');
            }
        } else if (plan == 'unlimited-plan') {
            if (currentVal> planVal) {
                alert("Maximum Discount should not go over monthly payment");
                //$('#' + optionId).val('');
            } else {
                if (currentVal> planVal/2) {
                    var disc = planVal/2;
                    alert("Maximum Discount should not go over $"+disc);
                   // $('#' + optionId).val('');
                }
            }
        }
    }

    $scope.showOptions = function(form) {
        $(".optionBox").hide();
        $("#"+form+"Option").show();
        $(".form-label label").css('color','black');
        $("#"+form+"Label label").css('color','green');
        console.log(form);
        if (form=='copierAgreement'){
            $scope.processCopierAgreement();
        }
        // Initialize location count and locations object.
        $scope.locationCount = 0;
    }

    $scope.processCopierAgreement = function(){
        //alert('Process Copier Agreement');
        var printers = [];
        //console.log($scope.items['schedule_of_goods']);
        angular.forEach($scope.items['schedule_of_goods'],function(item,index){
            printers[index] = [];
            //console.log($scope.formData.schItems[index]);
           angular.forEach($scope.formData.schItems[index],function(schItem){
            //console.log(schItem);
                if (!angular.isUndefined($scope.formData.schOption)){
                    if (!angular.isUndefined($scope.formData.schOption[index])){
                        if (!angular.isUndefined($scope.formData.schOption[index][schItem.count])){
                            if (($scope.formData.schOption[index][schItem.count].group.toUpperCase().indexOf('KYOCERA')!==-1) || ($scope.formData.schOption[index][schItem.count].group.toUpperCase().indexOf('FUJI')!==-1) || ($scope.formData.schOption[index][schItem.count].group.toUpperCase().indexOf('OKI')!==-1)){
                                var cpiBwAmt = $scope.formData.schQty[index][schItem.count] * $scope.formData.schOption[index][schItem.count].cpiBw;
                                if (cpiBwAmt==0){
                                    cpiBwAmt = 1.0;
                                }
                                var cpiColourAmt = $scope.formData.schQty[index][schItem.count] * $scope.formData.schOption[index][schItem.count].cpiColour;
                                if (cpiColourAmt==0){
                                    cpiColourAmt = 10.0;
                                }
                                var printer = {
                                    "model" : $scope.formData.schOption[index][schItem.count].model,
                                    "group" : $scope.formData.schOption[index][schItem.count].group,
                                    "item"  : $scope.formData.schOption[index][schItem.count].item,
                                    "qty"  : $scope.formData.schQty[index][schItem.count],
                                    "cpiBwAmt"  : cpiBwAmt.toFixed(1),
                                    "cpiColourAmt"  : cpiColourAmt.toFixed(1)
                                }
                                printers[index].push(printer);
                            }
                        }
                    }
                }
             });
        });
        angular.forEach(printers, function(printer,index){
            if (printer.length==0){
                printers.splice(index,1);
            }
        });
        //console.log(printers);
        if (printers.length!=0){
            $scope.formData.printers = printers;
        }
        else{
            alert('No printer is selected in the schedule of goods.');
        }            
    }

    // $scope.ipPlan = {
    //     10 : {rate : 499, desc : "Up to 10/10 Mbps**"},
    //     T20 : {rate : 599, desc : "Up to 20/20 Mbps**"},
    //     400 : {rate : 758, desc : "Up to 400/400Mbps**"},
    //     4 : {rate : 419, desc : "4Mbps/4Mbps"},
    //     8 : {rate : 429, desc : "8Mbps/8Mbps*"},
    //     18 : {rate : 489, desc : "18Mbps/18Mbps*"},
    //     20 : {rate : 599, desc : "20Mbps/20Mbps*"},
    //     30 : {rate : 998, desc : "30Mbps/30Mbps*"}
    // }

    // $scope.ipDownload = {
    //     50 :{plan : "50GB", rate: 69},
    //     100 :{plan : "100GB", rate : 79},
    //     200 : {plan : "200GB" , rate :139},
    //     300 : {plan : "300GB", rate : 209},
    //     500 : {plan : "500GB",rate : 339},
    //     1000 : {plan : "1000GB", rate : 639}
    // }

    $scope.nbnPlan = {
        255 : {rate : 49, desc : "NBN 25Mbps/5Mbps*"},
        2510 : {rate : 59, desc : "NBN 25Mbps/10Mbps*"},
        5020 : {rate : 69, desc : "Up to 50/20Mbps**"},
        10040 : {rate : 79, desc : "NBN 100Mbps/40Mbps*"}
    }
    $scope.nbnDownload = {
        100 :{plan : "100GB", rate : 19},
        200 : {plan : "200GB" , rate :25},
        500 : {plan : "500GB",rate : 29},
        1000 : {plan : "1000GB", rate : 49}
    }

    $scope.setValues = function() {
        $scope.formData.cName = "Some Long Name Comp.";
        $scope.formData.cAbn = 12323231321;
        $scope.formData.cTrading = "Long trade name";
        $scope.formData.cAddress = "221B Baker Street";        
        $scope.formData.cPostCode = 2000;

        $scope.formData.pIAddress = "221B Baker Street";
        $scope.formData.pISuburb = "London";
        $scope.formData.pIState = "ACT";
        $scope.formData.pIPostcode = "1234";

        $scope.formData.comLocation = {};
        $scope.formData.comLocation = {
            'voice_cap'               : [$scope.formData.pIAddress],
            'voice_std'               : [$scope.formData.pIAddress],
            'voice_comp'              : [$scope.formData.pIAddress],
            'voice_solution_untimed'  : [$scope.formData.pIAddress],
            'voice_essentials_cap'    : [$scope.formData.pIAddress],
            'voice_solution_standard' : [$scope.formData.pIAddress],
            'data_adsl'               : [$scope.formData.pIAddress],
            'ip_midband'              : [$scope.formData.pIAddress],
            'ip_midbandunli'          : [$scope.formData.pIAddress],
            'nbn'                     : [$scope.formData.pIAddress],
            'nbnUnlimited'            : [$scope.formData.pIAddress],
            'mobile_mega'             : [$scope.formData.pIAddress],
            'mobile_ut'               : [$scope.formData.pIAddress],
            'mobile_wireless'         : [$scope.formData.pIAddress],
            '1300'                    : [$scope.formData.pIAddress],
            '1300_discounted'         : [$scope.formData.pIAddress],
            'fibre'                   : [$scope.formData.pIAddress],
            'ethernet'                : [$scope.formData.pIAddress],
            'telstraUntimed'          : [$scope.formData.pIAddress],
            'telstraWireless'         : [$scope.formData.pIAddress],
            'printer'                 : [$scope.formData.pIAddress],
            'schedule_of_goods'       : [$scope.formData.pIAddress]
        };

        $scope.formData.cSuburb = "London";
        $scope.formData.comSuburb = {};
        $scope.formData.comSuburb = {
            'voice_cap'               : [$scope.formData.pISuburb],
            'voice_std'               : [$scope.formData.pISuburb],
            'voice_comp'              : [$scope.formData.pISuburb],
            'voice_solution_untimed'  : [$scope.formData.pISuburb],
            'voice_essentials_cap'    : [$scope.formData.pISuburb],
            'voice_solution_standard' : [$scope.formData.pISuburb],
            'data_adsl'               : [$scope.formData.pISuburb],
            'ip_midband'              : [$scope.formData.pISuburb],
            'ip_midbandunli'          : [$scope.formData.pISuburb],
            'nbn'                     : [$scope.formData.pISuburb],
            'nbnUnlimited'            : [$scope.formData.pISuburb],
            'mobile_mega'             : [$scope.formData.pISuburb],
            'mobile_ut'               : [$scope.formData.pISuburb],
            'mobile_wireless'         : [$scope.formData.pISuburb],
            '1300'                    : [$scope.formData.pISuburb],
            '1300_discounted'         : [$scope.formData.pISuburb],
            'fibre'                   : [$scope.formData.pISuburb],
            'ethernet'                : [$scope.formData.pISuburb],
            'telstraUntimed'          : [$scope.formData.pISuburb],
            'telstraWireless'         : [$scope.formData.pISuburb],
            'printer'                 : [$scope.formData.pISuburb],
            'schedule_of_goods'       : [$scope.formData.pISuburb]
        };

        $scope.formData.comZipCode = {};
        $scope.formData.comZipCode = {
            'voice_cap'               : [$scope.formData.pIPostcode],
            'voice_std'               : [$scope.formData.pIPostcode],
            'voice_comp'              : [$scope.formData.pIPostcode],
            'voice_solution_untimed'  : [$scope.formData.pIPostcode],
            'voice_essentials_cap'    : [$scope.formData.pIPostcode],
            'voice_solution_standard' : [$scope.formData.pIPostcode],
            'data_adsl'               : [$scope.formData.pIPostcode],
            'ip_midband'              : [$scope.formData.pIPostcode],
            'ip_midbandunli'          : [$scope.formData.pIPostcode],
            'nbn'                     : [$scope.formData.pIPostcode],
            'nbnUnlimited'            : [$scope.formData.pIPostcode],
            'mobile_mega'             : [$scope.formData.pIPostcode],
            'mobile_ut'               : [$scope.formData.pIPostcode],
            'mobile_wireless'         : [$scope.formData.pIPostcode],
            '1300'                    : [$scope.formData.pIPostcode],
            '1300_discounted'         : [$scope.formData.pIPostcode],
            'fibre'                   : [$scope.formData.pIPostcode],
            'ethernet'                : [$scope.formData.pIPostcode],
            'telstraUntimed'          : [$scope.formData.pIPostcode],
            'telstraWireless'         : [$scope.formData.pIPostcode],
            'printer'                 : [$scope.formData.pIPostcode],
            'schedule_of_goods'       : [$scope.formData.pIPostcode]
        };

        $scope.formData.cEmail = "info@somelongcompany.com.au";
        $scope.formData.dName = "Arthur Conan Doyle";
        $scope.formData.dSName = "Sherlock Holmes";
        $scope.formData.cContact = "Arthur Conan Doyle";
        $scope.formData.cTel = "(02) 4342-1232";
        $scope.formData.cFax = "(02) 4342-1232";
        $scope.formData.cMobile = "4532-533-267";
        $scope.formData.cWebsite = "http://somelongcompany.com.au";
        $scope.formData.aAccountant = "James Moriarty";
        $scope.formData.aIndustry = "PROFESSIONAL OFFICE";
        $scope.formData.aTradeRef = "A Study in Scarlet";
        $scope.formData.aCPerson = "Dr. Watson";
        $scope.formData.aTel = "(02) 2340-5444";
        $scope.formData.pName = "Sherlock Holmes";
        $scope.formData.pAddress = "220B Baker Street";
        $scope.formData.pSuburb = "London";
        $scope.formData.pPostcode = 2000;
        $scope.formData.pPhone = "(02) 4342-1232";
        $scope.formData.pLicense = "2332323243A";
        $scope.formData.pValue = "$ 600,000";
        $scope.formData.pMortgage = "$ 400,000";
        $scope.formData.pOwned = true;
        $scope.formData.tTel = "(02) 4342-1232";
        $scope.formData.aContact = "Mrs. Hudson";
        $scope.formData.tContact = "Mr. Hudson";
        $scope.formData.aNemp = "1000";
        $scope.formData.aInsurer = "Insurance Company";
        $scope.formData.aPolicy = "A/127/2016";
        $scope.formData.g2Name = "John Watson";
        $scope.formData.g2Address = "220B Baker Street";
        $scope.formData.g2Suburb = "London";
        $scope.formData.g2Postcode = 2000;
        $scope.formData.g2Phone = "(02) 4342-1232";
        $scope.formData.g2License = "2332323243A";
        $scope.formData.g2Value = "$ 600,000";
        $scope.formData.g2Mortgage = "$ 400,000";
        $scope.formData.g2Owned = true;
        $scope.formData.aYear = "1";
        $scope.formData.cState = "ACT";

        //console.log($('#formData'));
    }

    $('.mob').on("keyup", function()
    {
        var val = this.value.replace(/[^0-9]/ig, '');
        var newVal = '';
        /*if (val.length >10) {
            val = val.substr(0,10);
        }*/
        if (val.length >4) {
            newVal +=val.substr(0,4)+'-';
            val = val.substr(4);
        }
        while (val.length > 3)   {
            newVal += val.substr(0, 3) +'-';
            val = val.substr(3);

        }
        newVal += val;
        this.value = newVal;
    });

    $('.ccNo').on("keyup", function()
    {
        var val = this.value.replace(/[^0-9]/ig, '');
        var newVal = '';
        while (val.length > 4) {
            newVal += val.substr(0, 4) +'-';
            val = val.substr(4);
        }
        newVal += val;
        this.value = newVal;
    });

    $scope.transformTelFields();

    var dateObj = new Date();
    var dd = dateObj.getDate();
    var mm = dateObj.getMonth()+1;
    var yy = dateObj.getFullYear();
    var today = mm+"/"+dd+"/"+yy;
    var minYY = yy - 18; //(Applicant have to be atleast 18);
    var birthMinDate = mm+"/"+dd+"/"+minYY;

    $('.expiryDate').datetimepicker({
       format : "DD/MM/YYYY",
       minDate : today
    });

    $('.date').datetimepicker({
        format : "DD/MM/YYYY",
        defaultDate : today
    });
    $('.pBirthDate').datetimepicker({
        format : "DD/MM/YYYY",
        maxDate : birthMinDate


    });

    $scope.$watch("formData.type.rental", function(val) {
        if (angular.isDefined(val)) {
            if (val == true) {
                $scope.formData.type.leasing = false;
                $scope.formData.type.outright = false;
                $scope.formData.type.chattle = false;
            }
          //  $scope.showSchedule();
        }
    });

    $scope.$watch("formData.type.leasing", function(val) {
        if (angular.isDefined(val)) {
           if (val == true) {
                $scope.formData.type.rental = false;
                $scope.formData.type.outright = false;
                $scope.formData.type.chattle = false;
            }
           // $scope.showSchedule();
        }
    });

    $scope.$watch("formData.type.outright", function(val) {
        if (angular.isDefined(val)) {
            if (val == true) {
                $scope.formData.type.rental = false;
                $scope.formData.type.leasing = false;
                $scope.formData.type.chattle = false;
            }

        }
    });


    $scope.$watch("formData.type.chattle", function(val) {
        if (angular.isDefined(val)) {
            if (val == true) {
                $scope.formData.type.rental = false;
                $scope.formData.type.leasing = false;
                $scope.formData.type.outright = false;
            }
        }
    });

    $scope.sign = function(id) {
       $("#testDi").dialog("open");
       $('#iAccept').attr('data-id', id);
       if (!$('#'+id).find('canvas').length) {
            $('#signatureBox').html("<span>Sign here!</span>&nbsp;&nbsp;<i class='fa fa-refresh'onclick=clearSg('signatureBox')></i>");
            $('#signatureBox').jSignature({
                color:"#000000",lineWidth:1,
                    width :490, height :98,
                    cssclass : "signature-canvas",
                   "decor-color": 'transparent'
                });
            clicked = true;
        }
    }

    $scope.presign = function(id) {
       $("#testDi").dialog("open");
       $('#iAccept').attr('data-id', id);
       if (!$('#'+id).find('canvas').length) {
            $('#signatureBox').html("<span>Sign here!</span>&nbsp;&nbsp;<i class='fa fa-refresh'onclick=clearSg('signatureBox')></i>");
            $('#signatureBox').jSignature({
                color:"#000000",
                lineWidth:1,
                width :490, 
                height :98,
                cssclass : "signature-canvas",
                "decor-color": 'transparent'
            });
        }
    }

    $scope.downloadPdf = function() {
        var userProfile =  Scopes.get('DefaultCtrl').profile;
        var formHtmlData = new Array();
        var fileNameArr = new Array();
        //$interval.cancel(saveDraft);

        $scope.formData.signedTimestamps = $window.signedTimeStamps;

        if (!angular.isDefined($scope.htmlData) || angular.equals({},$scope.htmlData)) {
          FlashMessage.setMessage({success:false, message:"No Forms Selected"});
          return;
        }
        $("#loading").show();

        angular.forEach($scope.htmlData, function(value, key) {
            var nametail = new Date().getTime();
            var rand = Math.floor((Math.random()*1000)+10);
            var fileName = key + rand + nametail + ".pdf";
            fileNameArr.push(fileName);
            $("#downloadPdfBn").prop('disabled',true);

            // In case of forms with location fields.
            if ($scope.locationAvailableTemps.indexOf(key) !== -1 && $scope.items[key].length > 1) {
                angular.forEach(value, function(data, index) {
                    rand = Math.floor((Math.random() * 1000) + 10);
                    fileName = key + rand + nametail + ".pdf";
                    formHtmlData.push({html: data, fileName : fileName});
                });
            } else {
                formHtmlData.push({html: value, fileName : fileName});
            }
        });

        var pdf = Form.update({htmlData :formHtmlData,
            userDetails : { name : $scope.formData.dName,
                                            email :$scope.formData.cEmail},
            account: {name: userProfile.name, email: userProfile.email}},
            function(data) {
            if($rootScope.editId) {
               var editId = $rootScope.editId;
               $rootScope.editId = null;
            }
            Form.save({ data : $scope.formData,
                        user : userProfile.id,
                        editId : editId,
                        fileName : fileNameArr,
                        type:"Completed"}, function(data) {
                if (data.success) {
                    $scope.formData = {};
                    $("#loading").hide();
                    FlashMessage.setMessage({
                    success:true,
                    message:"The forms will be sent to your email shortly."});
                    $window.location.reload();
                }
            });
        });
    }

    $scope.formGroups = {
        telecomService      : [
                                {file:'billing_app',id : 'configApp'},
                                {file:'monitoring_solution',id : 'monitoring_solution'} 
                              ],
        financeApplication  : [
                                {file:'rental',id : 'rental'},
                                {file: 'leasing', id : 'leasing'},
                                {file: 'chattle', id : 'chattle'}
                              ],
        orderSpec           : [
                                {file: 'single_order_spec', id : 'singleOrder'},
                                {file: 'copierAgreement', id: 'copierAgreement'}
                              ],
        voice               : [
                                {file: 'voice_cap', id : 'voiceCap'},
                                {file: 'voice_comp', id : 'completeOffice'},
                                {file: 'voice_essentials_cap', id : 'voiceEssential'},
                                {file: 'voice_solution_standard', id : 'voiceSolution'},
                                {file: 'voice_solution_untimed', id : 'voiceUt'},
                                {file: 'voice_std', id : 'focusStandard'}
                              ],
        data                : [
                                {file: 'data_adsl', id : 'adsl2'},
                                {file: 'ip_midband', id : 'ipMidband'},
                                {file: 'ip_midbandunli', id : 'ipMidbandUnli'},
                                {file: 'nbn', id : 'nbnMonthly'},
                                {file: 'ethernet', id: 'ethernet'},
                                {file: 'fibre', id : 'fibre'}
                              ],
        mobile              : [
                                {file: 'mobile_mega', id : 'mobileCap'},
                                {file: 'mobile_ut', id : 'mobileUt'},
                                {file: 'mobile_wireless', id : 'mobileWireless'},
                                {file: 'telstraUntimed', id: 'telstraUntimed'},
                                {file: 'telstraWireless', id: 'telstraWireless'}
                              ],
        r1300               : [
                                {file: '1300', id : 'rate131300'},
                                {file: '1300_discounted', id : 'rateDis131300'}
                              ]
    }

    $rootScope.$on('ngDialog.opened', function (e, $dialog) {
        $window.scrollTo(0, angular.element(".ngdialog-content").offsetTop);
    });


    $scope.signDocument = function(templateName, formData) {
        $scope.template = "templates/forms/"+templateName+".html?t=" + _version;
        //setting the values changed by Script.
        formData.dateVal = $("#dateVal").val();
        formData.pBirth  = $("#pBirth").val();
        formData.pIAddress = $("#pIAddress").val();
        formData.pIState = $("#pIState").val();
        formData.pIPostcode =  $("#pIPostcode").val();
        formData.aPeriod = 'monthly';
        formData.pISuburb =  $("#pISuburb").val();
        $rootScope.draftMode = false;

        // Check if exists empty location fields.
        var comLocationObj = $('input.' + templateName);
        var emptyLocationCnt = 0;
        angular.forEach(comLocationObj, function(item, index) {
            var location = $(item).val();
            if (!location) {
                emptyLocationCnt ++;                
            }
        });

        if (emptyLocationCnt) {
            alert("Please ensure that all locations are filled-up properly.")
            return;
        }

        $(".reAssign").each(function() {
            var id = $(this).prop("id");
            formData[id] = $(this).val();
        });

        formData["type"] = {};

        $("input[name=formTypes]:checked").each(function() {
            var id = $(this).prop("id");
            formData["type"][id] = $(this).prop("checked");
        });

        if (formData.type.configApp) {
            var telNo = new Array();
            $(".telNo").each(function() {
                  var item = $(this).find("input");
                  var idCount = item.data('count');
                  var telRange = $('#telItemRange' + '-' + idCount).val()!=''?' to '+$('#telItemRange' + '-' + idCount).val():'';
                  var obj = {
                                  tel : item[0].value + telRange 
                            };
                  telNo.push(obj);
            });
            $scope.formData.configAppTelNo = telNo;
            // var mobPort = new Array();
            // $(".mob-port-box").each(function() {
            //     var confAccHolder = $(this).find(".confAccHolder");
            //     var confMobNo = $(this).find(".confMobNo");
            //     var confProvider = $(this).find(".confProvider");
            //     var confAccNo = $(this).find(".confAccNo");
            //     var confPatPlan = $(this).find(".confPatPlan");
            //     var confDob = $(this).find(".confDob");
            //     var confDLicence = $(this).find(".confDLicence");

            //     var obj = {
            //                     confAccHolder : confAccHolder[0].value,
            //                     confMobNo : confMobNo[0].value,
            //                     confProvider : confProvider[0].value,
            //                     confAccNo : confAccNo[0].value,
            //                     confPatPlan : confPatPlan[0].value,
            //                     confDob : confDob[0].value,
            //                     confDLicence : confDLicence[0].value,
            //               };
            //     mobPort.push(obj);
            // });
            $scope.formData.configMobPort = $scope.configMobPort;
            if ((!$scope.formData.configCarrier) || (!$scope.formData.configAccno)) {
                alert("Please  assign a Carrier or Account Number to the Billing Form.");
                return;
            }
        }

        if (formData.type.monitoring_solution){
            if (($scope.formData.advancedBussinessProject) && (!$scope.formData.panelType)){
                alert("Please complete the details for Panel Type.");
                return;
            }
        }

        if(formData.type.rental || formData.type.leasing ||formData.singleOrder) {
            formData["rental"] = {};
            var rental = parseInt(formData.aPayment.replace(/[^\d.]/g,''));
            formData["aGST"] = isNaN(rental) ? '0.00' : (rental*10/100).toFixed(2);
            formData["aTotal"] = isNaN(rental) ? '0.00' : (rental + rental*10/100).toFixed(2);
        }

        var schedule = new Array();
        var scheduleOptions = new Array();
        angular.forEach($scope.formData.schItems, function(data) {
            if (angular.isDefined($scope.formData.schOption)){
                if (angular.isDefined($scope.formData.schOption[data.count])) {
                    var obj = {
                                qty : $scope.formData.schQty[data.count],
                                desc :$scope.formData.schOption[data.count].item != '_' ? $scope.formData.schOption[data.count].item : ''
                            };
                    scheduleOptions.push(obj);
                }
            }
        });

        $(".schedule-goods").each(function() {
            var item = $(this).find("input");
            var obj = { qty : item[0].value,
                        desc :item[1].value,
                        //itemNo : item[2].value,
                        //serNo : item[3].value
                    };
            schedule.push(obj);
        });

        $scope.formData.scheduleOptions = scheduleOptions;
        $scope.formData.schedule = schedule;

        if($scope.editId) {
            $rootScope.editId = $scope.editId;
        }

        $rootScope.formData = formData;

        ngDialog.open({
            template: $scope.template,
            plan: true,
            controller : 'FormCtrl',
            width: 900,
            height: 600,
            scope: $scope,
            className: 'ngdialog-theme-default',
            preCloseCallback : function(value) {
                var allSigned = true;

                $(".signatureImg").each(function() {
                    if ($(this).children("img").length == 0) {
                        allSigned = false;
                        return;
                    }
                });
                if (!allSigned) {
                    $('#isSigned').val('F');
                    if (confirm("You have not signed all the fields.Do you want to exit")) {
                        return true;
                    }
                    return false;
                    $timeout(angular.noop());
                } else {
                    $('#isSigned').val('T');
                    var button = $('#formData').find('a[href="#finish"]');
                    button.show();

                    // In case of forms with location fields.
                    if ($scope.locationAvailableTemps.indexOf(templateName) !== -1 && $scope.items[templateName].length > 1) {
                        $scope.htmlData[templateName] = [];
                        angular.forEach($scope.items[templateName], function(item, index) {
                            var clone = $('.ngdialog-content').clone();
                            clone.find('[class*="preview"]').each(function(divIndex,data){
                                //console.log(divIndex,data,index);  
                                if (index!=divIndex)  {
                                    clone.find('.preview-' + divIndex).remove();
                                    console.log(clone.html());
                                }                        
                            });
                            //clone.find('.preview-' + index).remove();
                            var tableHtml = clone.html();
                            $scope.htmlData[templateName].push(tableHtml);
                        });
                    } else {
                        $scope.htmlData[templateName] = $(".ngdialog-content").html();
                    }

                    $scope[templateName] = true;
                    $timeout(angular.noop());
                }
            }
        });

        $rootScope.$on('ngDialog.opened', function (e, $dialog) {
            var newHash = 'anchor';
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash('anchor');
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn not changed
                $location.hash('anchor');
                $anchorScroll();
            }
        });
    }
    $scope.isDraftMode = function (){
        //alert($rootScope.draftMode);
        return $rootScope.draftMode;
    }
    $scope.isSigned = function(form, formName) {
        //alert(form,formName);
        if ($scope[form] && formName) {
            return true;
        } else {
            if (formName == false) {
                if ( angular.isDefined($scope.htmlData[form])) {
                    delete $scope.htmlData[form];
                }
                    $scope[form] = false;
                }

            return false;
        }
    }

    $scope.checkGroupSigned = function(forms, group) {
        var flag = false;
        if (angular.isDefined($scope.formGroups[group]) && angular.isDefined(forms)) {
            angular.forEach($scope.formGroups[group], function(item) {
                if (angular.isDefined(forms[item.id]) && forms[item.id] == true) {
                    if (forms[item.id] == true && !$scope[item.file]) {
                        flag = false;
                        return;
                    } else if (forms[item.id] == true && $scope[item.file]) {
                        flag = true;
                    }
                }
            });
        }
        return flag;
    }

    $scope.formData.schAddItems = [];
    $scope.formData.schAddItems[0] = [{count:1}];
    $scope.schAddItemCount = [];
    $scope.schAddItemCount[0] = 1;
    //console.log($scope.formData.schItems);

    $scope.addRentalGoods =  function(index) {
        $scope.schAddItemCount[index]++;
        $scope.formData.schAddItems[index].push({count:$scope.schAddItemCount[index]++});
        // $scope.scheduleCount++;


        //   var wrapped = '<div class="row">\n\
        //                     <div class="col-md-2 col-sm-2">\n\
        //                         <button class="btn btn-primary" id="schedule-'+$scope.scheduleCount+'">\n\
        //                            <i class="fa fa-times"></i>\n\
        //                         </button>\n\
        //                     </div>\n\
        //                     <div class="col-md-10 schedule-goods">\n\
        //                         <div class="col-md-3 col-sm-3">\n\
        //                             <div class="form-group">\n\
        //                                 <div class="col-xs-4">\n\
        //                                     <label class="control-label">Quantity</label>\n\
        //                                 </div>\n\
        //                                 <div class ="col-xs-8">\n\
        //                                     <input type="number" id="qty-item-'+$scope.scheduleCount+'" class="qunatity form-control">\n\
        //                                 </div>\n\
        //                             </div>\n\
        //                         </div>\n\
        //                         <div class="col-md-9 col-sm-9">\n\
        //                             <div class="form-group">\n\
        //                                 <div class="col-xs-3 text-right">\n\
        //                                         <label class="control-label">Description</label>\n\
        //                                 </div>\n\
        //                                 <div class ="col-xs-9">\n\
        //                                     <input type="text" class ="desc form-control">\n\
        //                                 </div>\n\
        //                             </div>\n\
        //                         </div>\n\
        //                     </div>\n\
        //                 </div>';
        // $(".rentalGoods").append(wrapped);
        // $("#schedule-"+$scope.scheduleCount).click(function() {
        //     $(this).parent().parent().remove();
        // });
        // $("#qty-item-"+$scope.scheduleCount).focus();
    };

    $scope.removeRentalGood = function(count,index) {
        var spliceIndex = $scope.formData.schAddItems[index].indexOf({count:count});
        $scope.formData.schAddItems[index].splice(spliceIndex,1);
    };

    $scope.removePortingAuth = function(index) {
        $scope.configMobPort.splice(index,1);
    }

    $scope.formData.schItems = [];
    $scope.formData.schItems[0] = [{count:1}];
    $scope.schItemCount = [];
    $scope.schItemCount[0] = 1;
    //console.log($scope.formData.schItems);
    

    $scope.$watch("formData.schOption", function(){

    });

    $scope.addRentalGoodsOption =  function(index) {
        $scope.schItemCount[index]++;
        $scope.formData.schItems[index].push({count:$scope.schItemCount[index]++});
    };

    $scope.removeRentalGoodsOption = function(count,index) {
        var spliceIndex = $scope.formData.schItems[index].indexOf({count:count});
        $scope.formData.schItems[index].splice(spliceIndex,1);
    };

    // Add location function
    $scope.addCompanyLocation = function(form_type) {
        $scope.locationCount++;
        if (form_type=='voice_essentials_cap'){
            $scope.formData.ipMidbandPlansVoice[$scope.locationCount] = $scope.ip_midband_plans[0];
            $scope.formData.ipMidbandDownloadVoice[$scope.locationCount] = $scope.download_plans[0];
        } 
        if (form_type=='ip_midband'){
            $scope.formData.ipMidbandPlans[$scope.locationCount] = $scope.ip_midband_plans[0];
            $scope.formData.ipMidbandDownload[$scope.locationCount] = $scope.download_plans[0];
        }
        if (form_type=='ip_midbandunli'){
            $scope.formData.ipMidbandUnliPlans[$scope.locationCount] = $scope.ip_midbandunli_plans[0];
            $scope.formData.ipMidbandUnliProf[$scope.locationCount] = $scope.professional_install[0];
        }
        if (form_type=='fibre'){
            $scope.formData.fibreUtPlans[$scope.locationCount] = $scope.fibre_unli_plans[0];
        }
        if (form_type=='adsl2'){
            $scope.formData.adsl2Plans[$scope.locationCount] = $scope.adsl_plans[0];
        }
        if (form_type=='ethernet'){
            $scope.formData.ethernetPlans[$scope.locationCount] = $scope.ethernet_plans[0];
        }
        if (form_type=='nbnUnlimited'){
            $scope.formData.UnlimitedPlans[$scope.locationCount] = $scope.nbnUnlimited_plans[0];
        }
        if (form_type=='telstraUntimed'){
            $scope.formData.telstraUntimedPlans[$scope.locationCount] = $scope.telstraUntimed_plans[0];
        }
        if (form_type=='telstraWireless'){
            $scope.formData.telstraWirelessPlans[$scope.locationCount] = $scope.telstraWireless_plans[0];
        }
        if (form_type=='schedule_of_goods'){
            $scope.formData.schItems[$scope.locationCount] = [{count:1}];
            $scope.schItemCount[$scope.locationCount] = 1;
            $scope.formData.schAddItems[$scope.locationCount] = [{count:1}];
            $scope.schAddItemCount[$scope.locationCount] = 1;
            //console.log($scope.formData.schItems);
        }
        $scope.items[form_type].push($scope.locationCount);
    };

    $scope.removeOptionsBlock = function(form_type, index) {
        var comLocationObj = $scope.formData.comLocation[form_type];
        comLocationObj.splice(index, 1);
        $scope.items[form_type].splice(index, 1);
        if (form_type[form_type]=='schedule_of_goods'){
            $scope.formData.schItems.splice(index,1);
        }
    };

    $scope.formData.wPosition = "Sales";
    if ($rootScope.viewFormData)    {
        $scope.formData = $rootScope.viewFormData.data;
        $scope.editId = $rootScope.viewFormData.id;
         if (angular.isDefined($scope.formData.schedule)) {
            angular.forEach($scope.formData.schedule, function(item, count) {
                if (count == 0) {
                  $(".qunatity").val(item.qty);
                  $(".desc").val(item.desc);
                } else {
                  var wrapped = '<div class="row">\n\
                                            <div class="col-md-2 col-sm-2">\n\
                                                <button class="btn btn-primary" id="schedule-'+count+'">\n\
                                                   <i class="fa fa-times"></i> \n\
                                                </button></div>\n\
                                            <div class="col-md-10 schedule-goods">\n\
                                                <div class="col-md-3 col-sm-3">\n\
                                                    <div class="form-group">\n\
                                                        <div class="col-xs-4">\n\
                                                            <label class="control-label">Quantity</label>\n\
                                                        </div>\n\
                                                        <div class ="col-xs-8">\n\
                                                            <input type="number" value='+item.qty+' class="qunatity form-control">\n\
                                                        </div>\n\
                                                    </div>\n\
                                                </div>\n\
                                                <div class="col-md-9 col-sm-9">\n\
                                                    <div class="form-group">\n\
                                                        <div class="col-xs-3 text-right">\n\
                                                                <label class="control-label">Description</label>\n\
                                                        </div>\n\
                                                        <div class ="col-xs-9">\n\
                                                            <input type="text"  value='+item.desc+' class ="desc form-control">\n\
                                                        </div>\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\
                                </div>';
                    $(".rentalGoods").append(wrapped);
                    $("#schedule-"+count).click(function() {
                        $(this).parent().parent().remove();
                    });
                    $scope.scheduleCount = count;
                }
            });
        }
        if (angular.isDefined($scope.formData.cState)) {
            $scope.formData.cState = $scope.formData.cState;
        }
        if (angular.isDefined($scope.formData.type)) {
            if ($scope.formData.type.configApp) {
                if (angular.isDefined($scope.formData.configAppTelNo)) {
                    angular.forEach($scope.formData.configAppTelNo, function(item,count) {
                      $scope.addTel();
                      $timeout(function() {
                          $("#telItemConfigApp-"+count).val(item.tel);
                      });
                    });
                }

                if (angular.isDefined($scope.formData.configMobPort)) {
                    $timeout(function() {
                        $scope.configMobPort = $scope.formData.configMobPort;
                    });
                }
                if ($scope.formData.config) {
                   if ($scope.formData.config.pstn) {
                       $scope.formData.config.pstn = true;
                   }
                   if ($scope.formData.config.lineHunt) {
                       $scope.formData.config.lineHunt = true;
                   }
                   if ($scope.formData.config.ISDN) {
                       $scope.formData.config.ISDN = true;
                   }
                   if ($scope.formData.config.indial) {
                       $scope.formData.config.indial = true;
                   }
                   if ($scope.formData.config.port ) {
                       $scope.formData.config.port = true;
                   }
                }
            }


        }

        $rootScope.viewFormData = null;
    }

    $("input[name=formTypes]").on("click", function() {
       if ($(this).prop("checked") === true) {
          var className = $(this).prop("class");
          var id = $(this).prop("id");
          if (className) {
              $("."+className).each(function() {
                 $(this).prop("checked",false);
              });
              $("#"+id).prop("checked", true);
          }
       }
    });

    $("#sameAddress").on("click", function() {
        var checked = $("#sameAddress").is(":checked");
        if (checked) {
            $("#pIAddress").val( $("#cAddress").val());
            $("#pIState").val( $("#cState").val());
            $("#pIPostcode").val( $("#cPostCode").val());
            $("#pISuburb").val( $("#cSuburb").val());
        } else {
            $("#pIAddress").val("");
            $("#pIState").val("");
            $("#pIPostcode").val("");
            $("#pISuburb").val("");
        }
        $scope.formData.pIAddress = $('#pIAddress').val();
        $scope.formData.pIState = $('#pIState').val();
        $scope.formData.pIPostcode = $('#pIPostcode').val();
        $scope.formData.pISuburb = $('#pISuburb').val();
        $scope.updateComLocations();
        $scope.updateComSuburbs();
        $scope.updateComPostCode();
    });

    $scope.load = function() {
        $scope.downloadPdf();
    }

    /*var saveDraft =  $interval(function() {
       $scope.saveAsDraft($scope.formData);
    },300000);*/
});
Qms.controller("FormFieldCtrl", function($scope, $state, $rootScope) {
    $scope.formData = $rootScope.formData;

        $scope.load = function(formData) {
            $("#fields").validate();
            if ( $("#fields").valid() == true) {
                $rootScope.formData = formData;
             //  $state.go('rate_card');
            }
        }

});

Qms.controller("FormCtrl", function($scope, $filter, $state, $rootScope, Form, Scopes, $locale) {
    var user = Scopes.get('DefaultCtrl').profile; 
    if ($scope.isDraftMode()){
        $scope.userSign = false;
    } else {
        $scope.userSign = $rootScope.sign;
    }

    $scope.roundVal = function(val) {
        return val.toFixed(2);
    }

    /**
     * Retunrs true if form is signed otherwise false.
     * @param formName String name of the form as per the parent td element.
     */
    // $scope.isSigned = function(formName) {
    //     var isFound = false;
    //     if(!angular.isDefined($scope.formData.signedTimestamps)) {
    //         return false;
    //     }
    //     if( Object.prototype.toString.call( $scope.formData.signedTimestamps ) === '[object Array]' ) {
    //         $scope.formData.signedTimestamps.forEach(function(e) {
    //             if(e.form_name==formName) {
    //                 isFound = true;
    //                 return isFound;
    //             }
    //         });
    //     } else {
    //         if($scope.formData.signedTimestamps.form_name==formName) {
    //             isFound = true;
    //             return isFound;
    //         }
    //     }
    //     return isFound;
    // }

    /**
     * Returns the timestamp of the signature if exists.
     */
    $scope.getSignedTime = function(formName,userSign) {
        //console.log('getSigned');
        var time = '';
        if(!angular.isDefined($scope.formData.signedTimestamps)) {
            return 'Sign Here';
        }
        if( Object.prototype.toString.call( $scope.formData.signedTimestamps ) === '[object Array]' ) {
            $scope.formData.signedTimestamps.forEach(function(e) {
                if(e.form_name==formName) {
                    time = e.timestamp;
                }
            });
        } else {
            if($scope.formData.signedTimestamps.form_name==formName) {
                time = $scope.formData.signedTimestamps.timestamp;
            }
        }
        var currentDate = Date.parse(time);
        //console.log('curDate');
        //console.log(currentDate);
        var formatted = $filter('date')(time, 'HH:mm:ss dd-MM-yyyy');
        return formatted;
    }

    $scope.getCurrentDate = function(){
        var currentDate = new Date();   
        return (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours() + ":" + (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes() + ":" + (currentDate.getSeconds() < 10 ? "0" : "") + currentDate.getSeconds()+" "+currentDate.getDate()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getFullYear();
    }
    
    $scope.checkRange = function(val,lower_limit,upper_limit){
        //alert(val + '-' + lower_limit + '-' + upper_limit);
        if (upper_limit==0){
            if (val>=lower_limit){
                return true;
            } else {
                return false;
            }
        } else {
            if (val >= lower_limit && val <= upper_limit){
                return true;
            } else {
                return false;
            }
        }
    }

    $scope.financedAmount = function(rental_per_month, term) {
        var rental_per_month  = Number(rental_per_month.replace(/^\D+|\,+/g, ''));
        var term  = Number(term.replace(/^\D+|\,+/g, ''));
        
        var terms = [];
        terms[24] = [55.143,49.51,49.12,48.52,47.97];
        terms[36] = [39.336,35.15,34.69,34.2,33.7];
        terms[48] = [31.702,27.97,27.53,27.18,26.90];
        terms[60] = [26.477,23.75,23.25,22.95,22.72];

        var subrate = 0;
        var rates = [];
        var found = 0;

        $.each (terms[term],function(index,value){
            subrate = (rental_per_month/value)*1000; 
            rates.push(subrate);
        });

        //console.log(rates);

        var financeAmt = 0;
        if ($scope.checkRange(rates[0],1,9999.99)){
            financeAmt = rates[0];
        }

        if ($scope.checkRange(rates[1],10000,19999.99)){
            financeAmt = rates[1];
        }

        if ($scope.checkRange(rates[2],20000,34999.99)){
            financeAmt = rates[2];
        }

        if ($scope.checkRange(rates[3],35000,49999.99)){
            financeAmt = rates[3];
        }

        if ($scope.checkRange(rates[4],50000,0)){
            financeAmt = rates[4];
        } 

        //console.log(financeAmt);
        // if (rental_amt >=2000 && rental_amt <= 9999.99) {
        //     bracket = 1;
        // } else if (rental_amt >=10000 && rental_amt <= 19999.99) {
        //     bracket = 2;
        // } else if (rental_amt >=20000 && rental_amt <= 34999.99) {
        //     bracket = 3;
        // } else if (rental_amt >= 35000 && rental_amt <= 49999.99) {
        //     bracket = 4;
        // } else if (rental_amt >=50000 && rental_amt <= 199999) {
        //     bracket = 5;
        // }


        // if (bracket == 1) {
        //     if (term == 24) {
        //         constVal = 55.14;
        //     } else if (term == 36) {
        //          constVal = 39.34;
        //     } else if (term == 48) {
        //          constVal = 31.70;
        //     } else if (term == 60) {
        //          constVal = 26.48;
        //     }

        // } else if (bracket == 2) {
        //     if (term == 24) {
        //         constVal = 49.51;
        //     } else if (term == 36) {
        //          constVal = 35.15;
        //     } else if (term == 48) {
        //          constVal = 27.97;
        //     } else if (term == 60) {
        //          constVal = 23.75;
        //     }

        // } else if(bracket == 3) {
        //     if (term == 24) {
        //         constVal = 49.12;
        //     } else if (term == 36) {
        //          constVal = 34.69;
        //     } else if (term == 48) {
        //          constVal = 27.53;
        //     } else if (term == 60) {
        //          constVal = 23.25;
        //     }

        // } else if(bracket == 4)  {
        //     if (term == 24) {
        //         constVal = 48.52;
        //     } else if (term == 36) {
        //          constVal = 34.20;
        //     } else if (term == 48) {
        //          constVal = 27.97;
        //     } else if (term == 60) {
        //          constVal = 22.95;
        //     }

        // } else if (bracket == 5) {
        //     if (term == 24) {
        //         constVal = 47.97;
        //     } else if (term == 36) {
        //          constVal = 33.70;
        //     } else if (term == 48) {
        //          constVal = 26.90;
        //     } else if (term == 60) {
        //          constVal = 22.72;
        //     }
        // }

        //financeAmt = $scope.roundVal(rental_per_month * 1000/constVal).toLocaleString();
        //alert(financeAmt);
        return $scope.roundVal(financeAmt).toLocaleString();
    }


    $scope.leasedAmount = function(lease_per_month, term) {
        var lease_per_month  = Number(lease_per_month.replace(/^\D+|\,+/g, ''));
        var term  = Number(term.replace(/^\D+|\,+/g, ''));

        var terms = [];
        terms[24] = [55.627,49.95,49.56,49.02,49.02];
        terms[36] = [40.469,35.62,35.15,34.66,34.66];
        terms[48] = [32.956,28.46,28.02,27.65,27.65];
        terms[60] = [28.292,24.2,23.75,23.45,23.45];

        var subrate = 0;
        var rates = [];
        var found = 0;

        $.each (terms[term],function(index,value){
            subrate = (lease_per_month/value)*1000; 
            rates.push(subrate);
        });

        console.log(rates);

        var leaseAmt = 0;
        if ($scope.checkRange(rates[0],1,9999.99)){
            leaseAmt = rates[0];
        }

        if ($scope.checkRange(rates[1],10000,19999.99)){
            leaseAmt = rates[1];
        }

        if ($scope.checkRange(rates[2],20000,34999.99)){
            leaseAmt = rates[2];
        }

        if ($scope.checkRange(rates[3],35000,49999.99)){
            leaseAmt = rates[3];
        }

        if ($scope.checkRange(rates[4],50000,0)){
            leaseAmt = rates[4];
        } 

        console.log(leaseAmt);
        // if (rental_amt >=2000 && rental_amt <= 9999.99) {
        //     bracket = 1;
        // } else if (rental_amt >=10000 && rental_amt <= 19999.99) {
        //     bracket = 2;
        // } else if (rental_amt >=20000 && rental_amt <= 34999.99) {
        //     bracket = 3;
        // } else if (rental_amt >= 35000 && rental_amt <= 49999.99) {
        //     bracket = 4;
        // } else if (rental_amt >=50000 && rental_amt <= 199999) {
        //     bracket = 5;
        // }


        // if (bracket == 1) {
        //     if (term == 24) {
        //         constVal = 55.14;
        //     } else if (term == 36) {
        //          constVal = 39.34;
        //     } else if (term == 48) {
        //          constVal = 31.70;
        //     } else if (term == 60) {
        //          constVal = 26.48;
        //     }

        // } else if (bracket == 2) {
        //     if (term == 24) {
        //         constVal = 49.51;
        //     } else if (term == 36) {
        //          constVal = 35.15;
        //     } else if (term == 48) {
        //          constVal = 27.97;
        //     } else if (term == 60) {
        //          constVal = 23.75;
        //     }

        // } else if(bracket == 3) {
        //     if (term == 24) {
        //         constVal = 49.12;
        //     } else if (term == 36) {
        //          constVal = 34.69;
        //     } else if (term == 48) {
        //          constVal = 27.53;
        //     } else if (term == 60) {
        //          constVal = 23.25;
        //     }

        // } else if(bracket == 4)  {
        //     if (term == 24) {
        //         constVal = 48.52;
        //     } else if (term == 36) {
        //          constVal = 34.20;
        //     } else if (term == 48) {
        //          constVal = 27.97;
        //     } else if (term == 60) {
        //          constVal = 22.95;
        //     }

        // } else if (bracket == 5) {
        //     if (term == 24) {
        //         constVal = 47.97;
        //     } else if (term == 36) {
        //          constVal = 33.70;
        //     } else if (term == 48) {
        //          constVal = 26.90;
        //     } else if (term == 60) {
        //          constVal = 22.72;
        //     }
        // }

        //financeAmt = $scope.roundVal(rental_per_month * 1000/constVal).toLocaleString();
        //alert(financeAmt);
        return $scope.roundVal(leaseAmt).toLocaleString();
    }

    $scope.rentofferedAmount = function(rentoffer_per_month, term) {
        var rentoffer_per_month  = Number(rentoffer_per_month.replace(/^\D+|\,+/g, ''));
        var term  = Number(term.replace(/^\D+|\,+/g, ''));
        var rentoffer_amt = rentoffer_per_month * term;

        var constVal = 0;
        var bracket = 0;

        if (rentoffer_amt >=2000 && rentoffer_amt <= 4999.99) {
            bracket = 1;
        } else if (rentoffer_amt >=5000 && rentoffer_amt <= 9999.99) {
            bracket = 2;
        } else if (rentoffer_amt >=10000 && rentoffer_amt <= 19999.99) {
            bracket = 3;
        } else if (rentoffer_amt >=20000 && rentoffer_amt <= 99999.99) {
            bracket = 4;
        // } else if (rentoffer_amt >=50000 && rentoffer_amt <= 99999) {
        //     bracket = 5;
        }

        if (bracket == 1) {
            if (term == 48) {
                constVal = 31.68;
            } else if (term == 60) {
                 constVal = 26.20;
            }

        } else if (bracket == 2) {
            if (term == 48) {
                constVal = 31.05;
            } else if (term == 60) {
                 constVal = 25.35;
            }

        } else if(bracket == 3) {
            if (term == 48) {
                constVal = 30.45;
            } else if (term == 60) {
                 constVal = 25.09;
            }

        } else if(bracket == 4)  {
            if (term == 48) {
                constVal = 30.31;
            } else if (term == 60) {
                 constVal = 24.82;
            }
        }

       console.log(constVal);
       rentofferAmt = $scope.roundVal(rentoffer_per_month * 1000/constVal).toLocaleString();
       return rentofferAmt;
    }


    if (!angular.isDefined($scope.formData.aTermNew) ) {
        $scope.formData.aTermNew = 60;
    }

    if(angular.isDefined($scope.formData.type.voiceUt) && $scope.formData.type.voiceUt) {
        var suToE = 9.95;
        var suMob = 7.95;
        var rateStdUt = {
          3 : 199,
          4 : 259,
          5 : 319,
          6 : 379,
          7 : 439,
          8 : 499,
          9 : 559,
          10 : 619,
          11 : 679,
          12 : 739,
          13 : 799,
          14 : 859,
          15 : 919,
          16 : 979,
          17 : 1039,
          18 : 1099,
          19 : 1159,
          20 : 1219,
          21 : 1279,
          22 : 1339,
          23 : 1399,
          24 : 1459,
          25 : 1519,
          26 : 1579,
          27 : 1639,
          28 : 1699,
          29 : 1759,
          30 : 1819,
        };

        var sUDID = {
            10 : 14.95,
            50 : 24.95,
            100: 34.95
        }

        var monthlyTotalRate = [];
        angular.forEach($scope.items['voice_solution_untimed'], function(item, index) {
            if (!$scope.formData.voiceUntimedFaxToEmail[index] || angular.isUndefined($scope.formData.voiceUntimedFaxQty[index])) {
                $scope.formData.voiceUntimedFaxQty[index] = 0;
            }
            
            if (!$scope.formData.voiceUntimedMobility[index] || angular.isUndefined($scope.formData.voiceUntimedMobQty[index])) {
                $scope.formData.voiceUntimedMobQty[index] = 0;
            }

            var total = suToE * $scope.formData.voiceUntimedFaxQty[index] + suMob * $scope.formData.voiceUntimedMobQty[index] + sUDID[$scope.formData.voiceUntimedDID[index]] + rateStdUt[$scope.formData.voiceUntimedChannel[index]];
            
            monthlyTotalRate.push(total);
        });

        $scope.voiceUt = {
            template : "templates/forms/voice_solution_untimed.html?t=" + _version,
            rate : rateStdUt,
            sfToE : suToE,
            sMob : suMob,
            sDID : sUDID,
            totalRate : monthlyTotalRate
        };
    }

    if($scope.formData.type.voiceSolution) {

        var ssToE = 9.95;
        var ssMob = 7.95;
        var rateStdSolution = {
            3 : 149,
            4 : 159,
            5 : 169,
            6 : 179,
            7 : 189,
            8 : 199,
            9 : 209,
            10 : 219,
            11 : 229,
            12 : 239,
            13 : 249,
            14 : 259,
            15 : 269,
            16 : 279,
            17 : 289,
            18 : 299,
            19 : 309,
            20 : 319,
            21 : 329,
            22 : 339,
            23 : 349,
            24 : 359,
            25 : 369,
            26 : 370,
            27 : 389,
            28 : 399,
            29 : 409,
            30 : 419,
        };

        var sSolutionDID = {
            10 : 14.95,
            50 : 24.95,
            100: 34.95
        };
        
        var monthlyTotalRate = [];
        angular.forEach($scope.items['voice_solution_standard'], function(item, index) {
            if (!$scope.formData.voiceSolutionFaxToEmail[index] || angular.isUndefined($scope.formData.voiceSolutionFaxQty[index])) {
                $scope.formData.voiceSolutionFaxQty[index] = 0;
            }
            
            if (!$scope.formData.voiceSolutionMobility[index] || angular.isUndefined($scope.formData.voiceSolutionMobQty[index])) {
                $scope.formData.voiceSolutionMobQty[index] = 0;
            }

            var total = ssToE * $scope.formData.voiceSolutionFaxQty[index] + ssMob * $scope.formData.voiceSolutionMobQty[index] + sSolutionDID[$scope.formData.voiceSolutionDID[index]] + rateStdSolution[$scope.formData.voiceSolutionChannel[index]];
            
            monthlyTotalRate.push(total);
        });

        $scope.voiceSolution = {
            template : "templates/forms/voice_solution_standard.html?t=" + _version,
            rate : rateStdSolution,
            sfToE : ssToE,
            sMob : ssMob,
            sDID : sSolutionDID,
            totalRate : monthlyTotalRate
        };
    }

    if($scope.formData.type.voiceCap) {
        var fToE = 9.95;
        var mob = 7.95;
        var rate = {
            3 : 50,
            5 : 150,
            6 : 170,
            8 : 210,
            10: 300,
            12: 350,
            14: 400,
            16: 450,
            18: 500,
            20: 600,
            25: 800
        };
        var cap = {
            3 : 99,
            5 : 99,
            6 : 99,
            8 : 99,
            10: 99,
            12: 99,
            14: 79,
            16: 79,
            18: 79,
            20: 79,
            25: 79

        };
        var dID = {
            10 : 9.99,
            20 : 15.99,
            50 : 19.99,
            100: 25.99
        }
        
        var monthlyTotalRate = [];

        angular.forEach($scope.items['voice_cap'], function(item, index) {
            if (!$scope.formData.voiceFaxToEmail[index] || angular.isUndefined($scope.formData.voiceFaxQty[index])) {
                $scope.formData.voiceFaxQty[index] = 0;
            }
            
            if (!$scope.formData.voiceMobility[index] || angular.isUndefined($scope.formData.voiceMobQty[index])) {
                $scope.formData.voiceMobQty[index] = 0;
            }

            var total = (cap[$scope.formData.voiceStd[index]] * $scope.formData.voiceStd[index]) +
                        fToE * $scope.formData.voiceFaxQty[index] + mob * $scope.formData.voiceMobQty[index]+
                        dID[$scope.formData.dID[index]];
            
            monthlyTotalRate.push(total);
        });

        $scope.voiceCap = {
            template : "templates/forms/voice_cap.html?t=" + _version,
            rate : rate,
            fToE : fToE,
            mob : mob,
            dID : dID,
            cap : cap,
            total: monthlyTotalRate
        };
    }

    if ($scope.formData.type.copierAgreement){
        $scope.copierAgreement = {
            template : "templates/forms/copierAgreement.html?t=" + _version
        }
    }

    if ($scope.formData.type.singleOrder) {
          $scope.formData.aTermNew = $scope.formData.aTermNew.toString();
          //console.log($scope.formData.aTermNew);
          if ($scope.formData.aTermNew!='Outright'){
            var financeAmount = $scope.financedAmount($scope.formData.aPayment, $scope.formData.aTermNew);
            //alert(financeAmount);
            var leaseAmount = $scope.leasedAmount($scope.formData.aPayment, $scope.formData.aTermNew);
          }
          var rentofferAmount = $scope.rentofferedAmount($scope.formData.aPayment, $scope.formData.aTermNew);

        // $scope.singleOrder = {
        //     template : "templates/forms/single_order_spec.html",
        //     financeAmount : !isNaN(financeAmount) ? financeAmount : 0,
        //     leaseAmount : !isNaN(leaseAmount) ? leaseAmount : 0,
        //     rentofferAmount : !isNaN(rentofferAmount) ? rentofferAmount : 0
        // }

        $scope.singleOrder = {
            template : "templates/forms/single_order_spec.html?t=" + _version,
            financeAmount : financeAmount,
            leaseAmount : leaseAmount,
            rentofferAmount : rentofferAmount
        }

    }

    if($scope.formData.type.focusStandard) {
        var sfToE = 9.95;
        var sMob = 7.95;
        var rateStd = {
            5 : 199,
            6 : 219,
            10: 249,
            20: 299,
            30: 349
        };
        var sDID = {
            10 : 9.99,
            20 : 15.99,
            50 : 19.99,
            100: 25.99
        }

        var monthlyTotalRate = [];
        angular.forEach($scope.items['voice_std'], function(item, index) {
            if (!$scope.formData.voiceStdFaxToEmail[index] || angular.isUndefined($scope.formData.voiceStdFaxQty[index])) {
                $scope.formData.voiceStdFaxQty[index] = 0;
            }

            if (!$scope.formData.voiceStdMobility[index] || angular.isUndefined($scope.formData.voiceStdMobQty[index])) {
                $scope.formData.voiceStdMobQty[index] = 0;
            }

            var total = sfToE * $scope.formData.voiceStdFaxQty[index] + sMob * $scope.formData.voiceStdMobQty[index] + rateStd[$scope.formData.voiceStdChannel[index]] + sDID[$scope.formData.voiceStdDID[index]];

            monthlyTotalRate.push(total);
        });

        $scope.voiceStd = {
            template : "templates/forms/voice_std.html?t=" + _version,
            rate : rateStd,
            sfToE : sfToE,
            sMob : sMob,
            sDID : sDID,
            totalRate : monthlyTotalRate
        };
    }

    if ($scope.formData.type.voiceEssential) {
        var rateEssential = {
            4 : 196,
            6 : 294,
            8 : 392,
            10 : 490,
            12 : 588
        };

        var eDID = {
            10 : 9.99,
            20 : 15.99,
            50 : 19.99,
            100 : 25.99
        };

        var monthlyTotalRate = [];
        var totalDiscount = []
        //ip Midband Plans
        var ipMidbandMonthlyRate = [];
        var ipMidbandPlans = [];
        var ipMidbandDownloads = [];
        console.log($scope.formData.ipMidbandPlans);
        console.log($scope.formData.ipMidbandDownload);
        angular.forEach($scope.items['voice_essentials_cap'], function(item, index) {
            var total = rateEssential[$scope.formData.voiceEssentialChannel[index]] + eDID[$scope.formData.voiceEssentialDID[index]];
            monthlyTotalRate.push(total);
            var totalIpFee = $scope.formData.ipMidbandPlansVoice[index].price+$scope.formData.ipMidbandDownloadVoice[index].price;
            var discount = parseFloat($scope.formData.ipMidbandDis[index]) + parseFloat($scope.formData.bECapDiscount[index]);
            ipMidbandPlans.push($scope.formData.ipMidbandPlansVoice[index]);
            ipMidbandDownloads.push($scope.formData.ipMidbandDownloadVoice[index]);
            ipMidbandMonthlyRate.push(totalIpFee);
            totalDiscount.push(discount);
        });

        $scope.voiceEssential = {
            template: "templates/forms/voice_essentials_cap.html?t=" + _version,
            rate : rateEssential,
            eDID : eDID,
            totalRate : monthlyTotalRate,
            plan : ipMidbandPlans,
            download : ipMidbandDownloads,
            ipTotalRate : ipMidbandMonthlyRate,
            totalDiscount : totalDiscount
        }
    }

    if($scope.formData.type.completeOffice) {
        var cfToE = 9.95;
        var cMob = 7.95;

        var priRates = {
            0 : 0,
            10: 299.85,
            20:499.85,
            30:699.85
        };

        var cDID = {
            0  : 0,
            10 : 9.99,
            20 : 15.99,
            50 : 19.99,
            100: 49.95
        };

        var monthlyTotalRate = [];
        var monthlyAnalogue = [];
        var monthlyBri = [];
        var monthlyPri = [];
        angular.forEach($scope.items['voice_comp'], function(item, index) {
            var total = 0;

            if (!$scope.formData.voiceCompFaxToEmail[index] || angular.isUndefined($scope.formData.voiceCompFaxQty[index])) {
                $scope.formData.voiceCompFaxQty[index] = 0;
            }
            
            if (!$scope.formData.voiceCompMobility[index] || angular.isUndefined($scope.formData.voiceCompMobQty[index])) {
                $scope.formData.voiceCompMobQty[index] = 0;
            }
            monthlyAnalogue.push(39.95 * $scope.formData.voiceCompAnalouge[index]);
            monthlyBri.push(99.85 * $scope.formData.voiceCompBri[index]);
            monthlyPri.push(priRates[$scope.formData.voiceCompPri[index]]);
            total = (39.95 * $scope.formData.voiceCompAnalouge[index]) + (99.85 * $scope.formData.voiceCompBri[index]) + priRates[$scope.formData.voiceCompPri[index]] + (cfToE * $scope.formData.voiceCompFaxQty[index]) + (cMob * $scope.formData.voiceCompMobQty[index]);

            if ($scope.formData.voiceCompDID[index]) {
                total += cDID[$scope.formData.voiceCompDID[index]];
            }

            // Calcuate the total plan fee based on discount amount.
            if (angular.isDefined($scope.formData.voiceCompAnalougeDis[index])) {
                total -= $scope.formData.voiceCompAnalougeDis[index];
            }

            if (angular.isDefined($scope.formData.voiceCompBriDis[index])) {
                total -= $scope.formData.voiceCompBriDis[index];
            }

            if (angular.isDefined($scope.formData.voiceCompPriDis[index])) {
                total -= $scope.formData.voiceCompPriDis[index];
            }

            monthlyTotalRate.push(total);
        });

        $scope.voiceComp = {
            template : "templates/forms/voice_comp.html?t=" + _version,
            cfToE : cfToE,
            cMob : cMob,
            cDID : cDID,
            total: monthlyTotalRate,
            analogueFee : monthlyAnalogue,
            briFee : monthlyBri,
            priFee : monthlyPri
        };
    }

    if ($scope.formData.type.adsl2) {
        var monthlyTotalRate = [];
        var analoguePrice = [];
        var discount = [];
        angular.forEach($scope.items['data_adsl'], function(item, index) {
            var total = $scope.formData.adsl2Plans[index].price;
            var analogueAmt = $scope.formData.voiceCompAnalougeDSL[index]*39.95;
            var planDis = $scope.formData.voiceCompAnalougeDisDSL[index] + $scope.formData.adsl2Dis[index];
            var totalRate = (total+analogueAmt);
            monthlyTotalRate.push(totalRate);
            analoguePrice.push(analogueAmt);
            discount.push(planDis);
        });

        $scope.dataAdsl = {
            template : "templates/forms/data_adsl.html?t=" + _version,
            totalFee : monthlyTotalRate,
            analoguePrice : analoguePrice,
            discount : discount,
            rate : rate
        };
    }

    if ($scope.formData.type.telstraUntimed) {
        var monthlyTotalRate = 0;
        console.log($scope.formData.telstraUntimedDis);
        var discount = isNaN($scope.formData.telstraUntimedDis) || $scope.formData.telstraUntimedDis == null?0:parseFloat($scope.formData.telstraUntimedDis);
        var ratePerMob = 0;
        var dataBoltOnRate = 0;
        angular.forEach($scope.telstraPlans,function(item,index){
            ratePerMob = $scope.telstraUntimed_plans[index].price * item;
            monthlyTotalRate += ratePerMob;
        });

        angular.forEach($scope.boltOnPlans,function(item,index){
            dataBoltOnRate = $scope.data_bolt_on_plans[index].price * item;
            monthlyTotalRate += dataBoltOnRate;
        });

        $scope.telstraUntimed = {
            template : "templates/forms/telstraUntimed.html?t=" + _version,
            totalFee : monthlyTotalRate,
            discount : discount
        };
    }

    if ($scope.formData.type.telstraWireless){
        var monthlyTotalRate = [];
        var discount = [];
        angular.forEach($scope.items['telstraWireless'],function(item,index){
            var total = $scope.formData.telstraWirelessPlans[index].price;
            var planDis = $scope.formData.telstraWirelessDis[index];
            monthlyTotalRate.push(total);
            discount.push(planDis);
        });

        $scope.telstraWireless = {
            template : "template/forms/telstraWireless.html?t=" + _version,
            totalFee : monthlyTotalRate,
            discount : discount
        };
    }

    if ($scope.formData.type.ethernet){
        var monthlyTotalRate = [];
        var discount = [];
        angular.forEach($scope.items['ethernet'],function(item,index){
            monthlyTotalRate.push($scope.formData.ethernetPlans[index].price);
            discount.push($scope.formData.ethernetDis[index]);
        });

        $scope.ethernet = {
            template : "templates/forms/ethernet.html?t=" + _version,
            totalFee : monthlyTotalRate,
            discount : discount
        }
    }

    if ($scope.formData.type.ipMidband) {
        var monthlyTotalRate = [];
        var discount = [];
        angular.forEach($scope.items['ip_midband'], function(item, index) {
            var totalIpFee = $scope.formData.ipMidbandPlans[index].price+$scope.formData.ipMidbandDownload[index].price;
            monthlyTotalRate.push(totalIpFee);
            discount.push($scope.formData.ipMidbandDis[index]);
        });

        $scope.ipMidband = {
            template : "templates/forms/ip_midband.html?t=" + _version,
            totalFee : monthlyTotalRate,
            discount : discount
        }
    }

    if ($scope.formData.type.fibre){
        var monthlyTotalRate = [];
        var discount = [];

        angular.forEach($scope.items['fibre'],function(item,index){
            monthlyTotalRate.push($scope.formData.fibreUtPlans[index].price);
            discount.push ($scope.formData.fibreDis[index]);
        });

        $scope.fibre = {
            template : "templates/form/fibre.html?t=" + _version,
            totalFee : monthlyTotalRate,
            discount : discount
        }
    }

    if ($scope.formData.type.ipMidbandUnli){
        var monthlyTotalRate = [];
        var discount = [];
        // var plans = [];
        // var prof_install = [];
        angular.forEach($scope.items['ip_midbandunli'],function(item,index){
            //var totalIpFee = $scope.formData.ipMidbandUnliPlans[index].price + $scope.formData.ipMidbandUnliProf[index].price;
            // plans.push($scope.formData.ipMidbandUnliPlans[index]);
            // prof_install.push($scope.formData.ipMidbandUnliProf[index]);
            monthlyTotalRate.push($scope.formData.ipMidbandUnliPlans[index].price);
            discount.push($scope.formData.ipMidbandUnliDis[index])
        });

        $scope.ipMidbandUnli = {
            template : "templates/forms/ip_midbandunli.html?t=" + _version,
            totalFee : monthlyTotalRate,
            discount : discount
            // plan : plans,
            // prof_install : prof_install
        }
    }

    if ($scope.formData.type.nbnMonthly) {
        var nbnPlan = {
            255 : {rate : 99, desc : "NBN 25Mbps/5Mbps*"},
            2510 : {rate : 109, desc : "NBN 25Mbps/10Mbps*"},
            5020 : {rate : 119, desc : "Up to 50/20Mbps**"},
            10040 : {rate : 129, desc : "NBN 100Mbps/40Mbps*"}
        };
        var nbnDownload = {
            100 :{plan : "100GB", rate : 39},
            150 :{plan : "150GB", rate : 49},
            200 : {plan : "200GB" , rate :59},
            300 :{plan : "300GB", rate : 69},
            500 : {plan : "500GB",rate : 79},
            1000 : {plan : "1000GB", rate : 99}
        };

        var plans = [];
        var downloads = [];
        var monthlyTotalRate = [];
        var totalDiscount = [];
        var analoguePrice = [];
        angular.forEach($scope.items['nbn'], function(item, index) {
            var totalNbnFee = nbnPlan[$scope.formData.nbnPlans[index]].rate + nbnDownload[$scope.formData.nbnDownload[index]].rate;
            var price = $scope.formData.voiceCompAnalougeNBNMonthly[index] * 39.95;
            monthlyTotalRate.push(totalNbnFee + price);
            plans.push(nbnPlan[$scope.formData.nbnPlans[index]]);
            downloads.push(nbnDownload[$scope.formData.nbnDownload[index]]);
            totalDiscount.push($scope.formData.voiceCompAnalougeDisNBNMonthly[index] + $scope.formData.nbnDis[index]);
            analoguePrice.push(price);
        });

        $scope.nbn = {
            template : "templates/forms/nbn.html?t=" + _version,
            totalFee : monthlyTotalRate,
            plan : plans,
            download : downloads,
            analoguePrice : analoguePrice,
            discount : totalDiscount
        }
    }

    if ($scope.formData.type.nbnUnlimitedPlans) {
        var monthlyTotalRate = [];
        var plans = [];
        var prices = [];
        var analoguePrice = [];
        var discount = [];
        angular.forEach($scope.items['nbnUnlimited'], function(item, index) {
            var totalNbnUnlimitedFee = $scope.formData.UnlimitedPlans[index].price;
            var price = $scope.formData.voiceCompAnalougeNBNUnli[index] * 39.95;
            monthlyTotalRate.push(totalNbnUnlimitedFee + price);
            discount.push($scope.formData.voiceCompAnalougeDisNBNUnli[index] + $scope.formData.nbnUnlimitedDis[index]);
            analoguePrice.push(price);
        });

        $scope.nbnUnlimitedPlans = {
            template : "templates/forms/nbnUnlimited.html?t=" + _version,
            totalFee : monthlyTotalRate,
            analoguePrice : analoguePrice,
            discount : discount
        }
    }

    $scope.addBlankSpace = function(count) {
        var spacer = ""
        for (var i = 0; i<count; i++) {
            spacer += '\xa0\xa0';
        }
        return spacer;
    }

    $scope.processFields = function(content, maxLimit) {
        var length = content.length;
        var space = $scope.addBlankSpace(maxLimit-(length*2));
        return content+space;
    }

    if ($scope.formData.type.monitoring_solution){
        $scope.configApp = {
            template : "templates/forms/monitoring_solution.html?t=" + _version,
        }
    }

    if ($scope.formData.type.configApp) {
        var rowWidth = 3;
        $scope.telRow = new Array();
        var tempRow = new Array();
        var tdCount = 0;

        //Put tel no 3 per row
        angular.forEach($scope.formData.configAppTelNo, function(data) {
            //alert('Billing Telephone');
            console.log(data);
            if (tdCount < rowWidth) {
                tempRow.push(data.tel);
                tdCount++;
            }
            if (tdCount == rowWidth) {
                $scope.telRow.push(tempRow);
                tdCount = 0;
                tempRow = new Array();
            }
        });
        if (tdCount > 0 ) {
            $scope.telRow.push(tempRow);
        }
        $scope.configApp = {
            template : "templates/forms/billing_app.html?t=" + _version,
        }
    }

    if ($scope.formData.type.rental) {
        $scope.rental = {
           template : "templates/forms/rental.html?t=" + _version,
        };
    }
    if ($scope.formData.type.leasing) {
        $scope.leasing = {
           template : "templates/forms/leasing.html?t=" + _version,
        };
    }

    if ($scope.formData.type.chattle) {


        $scope.chattle = {
            template : "templates/forms/chattle.html?t=" + _version,
        }
    }
    
    if ($scope.formData.type.mobileCap) {
        var monthlyTotalRate = 0;
        var discount = isNaN($scope.formData.mobileCapDis) || $scope.formData.mobileCapDis == null?0:parseFloat($scope.formData.mobileCapDis);
        console.log(discount);
        var ratePerMob = 0;

        angular.forEach($scope.mobileMegaPlans,function(item,index){
            ratePerMob = $scope.mobile_mega_plans[index].price * item;
            monthlyTotalRate += ratePerMob;
        });

        $scope.mobileCap = {
            template : "templates/forms/mobile_mega.html?t=" + _version,
            totalFee : monthlyTotalRate,
            discount : discount
        };

        // var mobCPlan = {
        //     39 : {desc:" $250 inc calls 500MB"},
        //     49 : {desc:" $2500 inc calls 2000MB"},
        //     59 : {desc:" $2500 inc calls 3000MB"}
        // }
        // $scope.mobileCap = {
        //    template : "templates/forms/mobile_mega.html",
        //    plan : mobCPlan
        // };
    }

    if ($scope.formData.type.mobileUt) {
        var monthlyTotalRate = 0;
        var discount = isNaN($scope.formData.mobileUtDis) || $scope.formData.mobileUtDis == null?0:parseFloat($scope.formData.mobileUtDis);
        console.log(discount);
        var ratePerMob = 0;

        angular.forEach($scope.mobile4GUntimedPlans,function(item,index){
            ratePerMob = $scope.mobile_4G_Untimed_Calls[index].price * item;
            monthlyTotalRate += ratePerMob;
        });

        $scope.mobileUt = {
            template : "templates/forms/mobile_mega.html?t=" + _version,
            totalFee : monthlyTotalRate,
            discount : discount
        };

        // $scope.mobileUt = {
        //    template : "templates/forms/mobile_ut.html",
        // };
    }

    if ($scope.formData.type.mobileWireless) {
        $scope.mobileWireless = {
           template : "templates/forms/mobile_wireless.html?t=" + _version,
        };
    }

    if ($scope.formData.type.rate131300) {
        $scope.rate131300 = {
            template : "templates/forms/1300.html?t=" + _version,
        }
    }

    if ($scope.formData.type.rateDis131300) {
        $scope.rateDis131300 = {
            template : "templates/forms/1300_discounted.html?t=" + _version,
        }
    }

    $scope.oneAtATime = true;

    $scope.sign = function(id) {
       $("#testDi").dialog("open");
       $('#iAccept').attr('data-id', id);
       if (!$('#'+id).find('canvas').length) {
            $('#signatureBox').html("<span>Sign here!</span>&nbsp;&nbsp;<i class='fa fa-refresh'onclick=clearSg('signatureBox')></i>");
            $('#signatureBox').jSignature({color:"#000000",lineWidth:1,
                                    width :490, height :98,
                                    cssclass : "signature-canvas",
                                   "decor-color": 'transparent'
                                  });
            clicked = true;
        }
    }

    $scope.currentSign = 0;
    $scope.signNavigate = function(direction) {
        var signItems = angular.element(".signItem");
        var elementId = "";
        if (direction =="next") {
            if ($scope.currentSign == 0) {
               currentItem = signItems[$scope.currentSign];
               $scope.currentSign +=1;
            } else if ($scope.currentSign < signItems.length -1) {
                $scope.currentSign +=1;
                currentItem = signItems[$scope.currentSign];
            } else {
                currentItem = signItems[$scope.currentSign];
            }

        } else if (direction == "previous") {
            if ($scope.currentSign == 0) {
               currentItem = signItems[$scope.currentSign];
            } else if ($scope.currentSign > 0) {
                $scope.currentSign -=1;
                currentItem = signItems[$scope.currentSign];
            }

        }

        elementId = currentItem.getAttribute("id");

        var top = $("#"+elementId).position().top;
        $(window).scrollTop(top-300);
        $(".signItem").removeClass("selected-to-sign");
        $("#"+elementId).addClass("selected-to-sign");
       // $(document).scrollTo("#"+elementId, 500 , {offset: -$(window).height()/2});
    }

    $scope.downloadPdf = function() {
        angular.forEach($rootScope.formData.type, function(value,key) {
             var nametail = new Date().getTime();
             var rand = Math.floor((Math.random()*1000)+10);
             var fileName = key+rand+nametail+".pdf";
             $("#loading").show();
             $("#downloadPdfBn").prop('disabled',true);
             if (value == true) {
                var html =  $("#"+key).html();
                var pdf = Form.update({html:html, fileName : fileName}, function(data) {
                   // window.open("assets/files/"+fileName,'_blank');
                        $("#downloadPdfBn").prop('disabled',false);
                        $("#loadingStatus").html("Loading "+key);
                    });
             }

        });
        if($rootScope.editId) {
            var editId = $rootScope.editId;
            $rootScope.editId = null;
        }
        Form.save({data:$scope.formData, user : user.id, editId : editId});
        $state.go('forms');
        $("#loading").hide();
    }

});
 Qms.controller('ViewFormsCtrl', function($scope, $state,$filter, Scopes, Form, $rootScope, FlashMessage, $http){
    $scope.pages = 0;
    $scope.itemsPerPage = 10;
    $scope.count = 0;
    $scope.status = "";

    $scope.sortType = 'creator_name';
    $scope.reverse = false;

    $http.get("profile").success(function(response) {
        var user = response;
        Form.show({user:user.id}, function(data) {
            $scope.forms = data.formData;
            $scope.userStatus = 'all';
            if (data.userStatus == 'user') {
                $scope.userStatus = 5;
            }
        });
    });

    $scope.filterForms = function(status) {
       $scope.status = status;
    }

    $scope.edit = function(id) {
        var data = Form.show({id : id}, function(data) {
            angular.forEach(data.formData,function(name,index){
                if (index=='data'){
                    //alert(index);
                    angular.forEach(name,function(val,index){
                        if (index=='voiceEssentialChannel'){
                            //alert(angular.isArray(name));
                            if (!angular.isArray(name)){
                                var key = val;
                                delete val;
                                name.voiceEssentialChannel = [{'voiceEssentialChannel-0' : key}];
                            }
                        }
                        if (index=='voiceEssentialDID'){
                            //alert(angular.isArray(name));
                            if (!angular.isArray(val)){
                                var key = val;
                                delete val;
                                name.voiceEssentialDID = [{'voiceEssentialDID-0' : key}];
                            }
                        }
                    });
                } 
            })
            $rootScope.viewFormData = data.formData;
            console.log($rootScope.viewFormData);
            $state.go('forms');
        });
    }

    $scope.downloadForms = function(id) {
        var forms = Form.downloadForms({id:id}, function(data) {
           if (data.success) {
               angular.forEach(data.files, function(name, index){
                    window.open("assets/files/"+name,'_blank');
               });

           }
        });
    }

    $scope.delete = function(id) {
        $('<div></div>').appendTo('body')
        .html('<div><h6>Are you really sure to delete this item?</h6></div>')
        .dialog({
            modal: true,
            title: 'You want to delete this item?',
            zIndex: 10000,
            autoOpen: true,
            width: '315px',
            resizable: false,
            buttons: {
                Yes: function () {
                    var data = Form.delete({id : id}, function(data) {
                        if (data.success) {
                            FlashMessage.setMessage(data);
                          Form.show({user:user.id}, function(data){
                             $scope.forms = data.formData;
                          });
                        }
                    });
                    $(this).dialog("close");
                },
                No: function () {
                    $(this).dialog("close");
                }
            },
            close: function (event, ui) {
                $(this).remove();
            }
        });

    }

});

Qms.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('renderFinish');
                });
            }
        }
    }
});

Qms.directive('integer', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return parseInt(viewValue, 10);
            });
        }
    };
});


Qms.directive('rowTools', function() {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'templates/common/row_tools.html',
        link: function($scope, $element, attrs) {
            $scope.row_id = attrs['rowId'];
        }
    };
});

Qms.directive('rowToolsProp', function() {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'templates/common/row_tools_prop.html',
        link: function($scope, $element, attrs) {
            $scope.row_id = attrs['rowId'];
        }
    };
});

Qms.directive("flashMessage", function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'templates/common/msg.html?t=" + _version,',
        link: function($scope) {
           $scope.$watch(function() {
               $scope.flashMessage = $scope.$parent.flashMessage;
               if ($scope.flashMessage.header) {
                   $timeout(function() {
                      $scope.flashMessage.header= null;
                   },3000);
               }
           });
           $scope.remove = function() {
               $scope.flashMessage.header = null;
           }
        }
    }
});


Qms.directive("passwordMatch", function(FlashMessage, $timeout) {
    return {
        restrict: 'EA',
        link: function($scope, $element, $attrs) {

            $element.on("keyup", function() {
                if ($scope.user.password != $scope.user.cpassword) {
                    $element

                }
            })

        }
    }
});

// Qms.directive('currentYear',function(){
//     return function(){
//         var now = new Date();
//         console.log(now.getFullYear());
//         return now.getFullYear();
//     }
// });

Qms.filter('range',function(){
    return function(input, min, max) {
    min = parseInt(min);
    max = parseInt(max);
    for (var i=min; i<=max; i++)
      input.push(i);
    return input;
  };
});

Qms.filter('range_printer',function(){
    return function(input, min, max) {
    var min_r = parseFloat(min);
    var max_r = parseFloat(max);
    //console.log(min + '-' + max);
    var i = min_r;
    while (i<=max_r){
        var num = i.toFixed(1);
        input.push(num);
        i+=0.1;
    }
    return input;
  };
});

Qms.filter('capitalizefirstletter', function() {
    return function(input, all) {
        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
});

Qms.filter('removecurrent', function() {
    console.log(1);
    console.log($scope);
    return function(input, all) {
        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
});


/* move to directives*/

Qms.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('change',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                        return false;
                    }
                });
            }
        };
    }
]);

Qms.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});

Qms.directive('onlyDigits', function () {

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

Qms.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});

Qms.filter('unsafe', function($sce) {

    return function(value) {

        //mod
        wordwise = true;
        max = 50;
        tail = "...";
        max = parseInt(50, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        value + (tail || ' �');
        //mod

        return $sce.trustAsHtml(value);

    };

});


Qms.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' �');
        };
});


Qms.directive('realTimeCurrency', function ($filter, $locale) {
var decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP;
    var toNumberRegex = new RegExp('[^0-9\\' + decimalSep + ']', 'g');
    var trailingZerosRegex = new RegExp('\\' + decimalSep + '0+$');
    /*var filterFunc = function (value) {
        return $filter('currency')(value);
    };*/
    var currencyFilter = $filter('currency');
    var formats = $locale.NUMBER_FORMATS;
    var filterFunc = function(value) {
        var value = currencyFilter(value);
        var sep = value.indexOf(formats.DECIMAL_SEP);
        if(value >= 0) {
            return value.substring(0, sep);
        }
        return value.substring(0, sep);
    };

    function getCaretPosition(input){
        if (!input) return 0;
        if (input.selectionStart !== undefined) {
            return input.selectionStart;
        } else if (document.selection) {
            // Curse you IE
            input.focus();
            var selection = document.selection.createRange();
            selection.moveStart('character', input.value ? -input.value.length : 0);
            return selection.text.length;
        }
        return 0;
    }

    function setCaretPosition(input, pos){
        if (!input) return 0;
        if (input.offsetWidth === 0 || input.offsetHeight === 0) {
            return; // Input's hidden
        }
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(pos, pos);
        }
        else if (input.createTextRange) {
            // Curse you IE
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function toNumber(currencyStr) {
        return parseFloat(currencyStr.replace(toNumberRegex, ''), 10);
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, elem, attrs, modelCtrl) {
            modelCtrl.$formatters.push(filterFunc);
            modelCtrl.$parsers.push(function (newViewValue) {
                var oldModelValue = modelCtrl.$modelValue;
                var newModelValue = toNumber(newViewValue);
                modelCtrl.$viewValue = filterFunc(newModelValue);
                var pos = getCaretPosition(elem[0]);
                elem.val(modelCtrl.$viewValue);
                var newPos = pos + modelCtrl.$viewValue.length -
                                   newViewValue.length;
                if ((oldModelValue === undefined) || isNaN(oldModelValue)) {
                    newPos -= 3;
                }
                setCaretPosition(elem[0], newPos);
                return newModelValue;
            });
        }
    };
});

Qms.factory('Scopes', function ($rootScope) {
    var mem = {};

    return {
        store: function (key, value) {
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
});

//
//Qms.factory('NgRepeatSkip', function() {
//  return function(values) {
//    var list = {};
//
//    list.index = 0;
//
//    list.next = function() {
//      list.index += 1;
//    };
//
//     list.next2 = function() {
//      list.index += 2;
//    };
//
//     list.next3 = function() {
//      list.index += 3;
//    };
//
//     list.next4 = function() {
//      list.index += 4;
//    };
//
//    list.previous = function() {
//      list.index -= 1;
//    };
//
//    list.value = function() {
//      return values[list.index];
//    };
//  };
//});
//

Qms.run(function ($rootScope) {
    $rootScope.$on('scope.stored', function (event, data) {
        console.log("scope.stored", data);
    });
});

Qms.run(function($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            console.log($templateCache);
            //$templateCache.remove(current.templateUrl);
        }
    });
});