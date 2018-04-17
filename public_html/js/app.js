var Qms = null; //'summernote',
(function() {
    Qms = angular.module('qms', [
        'ui.router', 'ngResource', 'angularFileUpload', 'ui.bootstrap', "ngTouch", "angucomplete-alt"
    ])
})();

Qms.controller('DefaultCtrl', function($scope, Scopes, $http, FlashMessage) {
    $scope.flashMessage = FlashMessage;

    $http.get("profile").success(function(response) {
        $scope.profile = response;
		Scopes.store('DefaultCtrl', $scope);

		console.log("DefaultCtrl", Scopes.get('DefaultCtrl').profile);
    });
})

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


Qms.controller('UserCtrl', function($scope, $http, $state, $location, $stateParams, User, FlashMessage) {
    $scope.users = User.query();

    if ($stateParams.id)
        $scope.user = User.get({
            user_id: $stateParams.id
        });
    else
        $scope.user = {};

    $scope.save = function() {
        if (!$("#user_form").parsley('validate')) return;

        if (angular.isDefined($scope.user.id)) {
            User.update({
                user_id: $scope.user.id
            }, $scope.user, function(data) {

                FlashMessage.setMessage(data);

                if (data.success) $location.path("/users");
            });

        } else {

            User.save($scope.user, function(data) {
                FlashMessage.setMessage(data);

                if (data.success) $location.path("/users");
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

        console.log($scope.config);
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
        console.log(type);
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

Qms.controller("FormDataCtrl", function($scope, $state,$rootScope, $http, Scopes) {
        $scope.scheduleCount = 0;
        $scope.reset = function() {
            $scope.formData = {};
        };
        $scope.reset();

        $(".validUrl").on("keyup", function() {
            var val = this.value.replace(/^(http\:\/\/)/,'');
            this.value = "http://"+val;
        });
        $(".onlyAlpha").on("keyup", function() {
           var val = this.value.replace(/\d/g,'');
           this.value = val;
        });
        $(".dollarSign").on("keyup", function() {
           var val = this.value.replace(/\D/g,'');
           var parts = val.toString().split(".");
           parts =  parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
           this.value = "$ "+parts;
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
        });

        $scope.showOptions= function(form) {
            $(".optionBox").hide();
            $("#"+form+"Option").show();
            $(".form-label label").css('color','black');
            $("#"+form+"Label label").css('color','green');

        }

            $scope.ipPlan = {
               10 : {rate : 499, desc : "Up to 10/10 Mbps**    TPG"},
               T20 : {rate : 599, desc : "Up to 20/20 Mbps**   TPG"},
               400 : {rate : 758, desc : "Up to 400/400Mbps** TPG"},
               4 : {rate : 419, desc : "4Mbps/4Mbps"},
               8 : {rate : 429, desc : "8Mbps/8Mbps*"},
               18 : {rate : 489, desc : "18Mbps/18Mbps*"},
               20 : {rate : 599, desc : "20Mbps/20Mbps*"},
               30 : {rate : 998, desc : "30Mbps/30Mbps*"}
           }
            $scope.ipDownload = {
                50 :{plan : "50GB", rate: 69},
                100 :{plan : "100GB", rate : 79},
                200 : {plan : "200GB" , rate :139},
                300 : {plan : "300GB", rate : 209},
                500 : {plan : "500GB",rate : 339},
                1000 : {plan : "1000GB", rate : 639}
            }

            $scope.nbnPlan = {
            255 : {rate : 49, desc : "NBN 25Mbps/5Mbps*"},
            2510 : {rate : 59, desc : "NBN 25Mbps/10Mbps*"},
            5020 : {rate : 69, desc : "Up to 50/20Mbps** TPG"},
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
            $scope.formData.cSuburb = "London";
            $scope.formData.cPostCode = 2000;
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
            $scope.formData.g2Name = "John Watson";
            $scope.formData.g2Address = "220B Baker Street";
            $scope.formData.g2Suburb = "London";
            $scope.formData.g2Postcode = 2000;
            $scope.formData.g2Phone = "(02) 4342-1232";
            $scope.formData.g2License = "2332323243A";
            $scope.formData.g2Value = "$ 600,000";
            $scope.formData.g2Mortgage = "$ 400,000";
            $scope.formData.g2Owned = true;



        }


        $scope.transformTelFields = function() {

             $('.tel').on("keyup", function()
             {
                   var val = this.value.replace(/[^0-9]/ig, '');
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
        }
      //  $scope.profile =  Scopes.get('DefaultCtrl').profile;
       //
        $scope.formData.wPosition = "Sales";
        if ($rootScope.viewFormData) {
                $scope.formData = $rootScope.viewFormData.data;
                $scope.editId = $rootScope.viewFormData.id;
                if ($scope.formData.type.rental || $scope.formData.type.leasing || $scope.formData.type.singleOrder) {
                    $scope.showSch = true;

                }
            var count = 1;
            angular.forEach($scope.formData.rental.schedule, function(data) {
                if (count ==1) {
                    $(".desc").val(data.desc);
                    $(".qunatity").val(data.qty);
                } else {
                    var html = '<div class="row rentalGoods">\n\
                            <div class="col-md-2"><div class="form-group">\n\
                                <div class="col-xs-6">\n\
                                    <label class="control-label">Quantity</label>\n\
                                </div>\n\
                            <div class ="col-xs-6">\n\
                                <input type="number" value = '+data.qty+' class ="qunatity form-control">\n\
                            </div>\n\
                            </div></div>\n\
                            <div class="col-md-4">\n\
                                <div class="form-group">\n\
                                <div class="col-xs-4">\n\
                                    <label class="control-label">Description</label>\n\
                                        </div>\n\
                                    <div class ="col-xs-8">\n\
                                        <input type="text" value = '+data.desc+' class ="desc form-control">\n\
                                    </div>\n\
                                </div>\n\
                            </div>';
                     if(count>1) {
                           html = html+ '<div class="col-md-1">\n\
                                    <button class="btn btn-primary" id="schedule-'+(count-1)+'">\n\
                                        <i class="fa fa-times"></i>\n\
                                    </button>\n\
                                </div>';

                    }
                  $(".addGoodsRental").parent().before(html);
                  if (count>1) {
                       $("#schedule-"+(count-1)).click(function() {
                            $(this).parent().parent().remove();
                     });
                  }

              }
              count++;
            });

            $rootScope.viewFormData = null;
        }


        $scope.transformTelFields();

        $('.mob').on("keyup", function()
            {
                   var val = this.value.replace(/[^0-9]/ig, '');
                    var newVal = '';
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

       var dateObj = new Date();
       var dd = dateObj.getDate();
       var mm = dateObj.getMonth()+1;
       var yy = dateObj.getFullYear();
       var today = mm+"/"+dd+"/"+yy;
       $('.date').datetimepicker({
           format : "DD/MM/YYYY",
           defaultDate : today
       });
       $('#pBirthDate').datetimepicker({
           format : "DD/MM/YYYY",

       });
       $scope.showSchedule = function(a,b) {
           if (!angular.isDefined(a)) {
               a = true;
           }else if (a=='true') {
               a = false;
           } else if(a=='false') {
               a= true;
           };
           b == 'true' ? b=true: b=false;
           if (a === true || b === true) {
                  $scope.showSch = true;
              } else {
                  $scope.showSch = false;
              }

       }
    $scope.addTelCount=0;
    $scope.addTel = function() {
       $scope.addTelCount++;
       var content = $(".addTelBtn").siblings(".telNo");
       var wrapped = content.html()+'<i  id="adTel-'+$scope.addTelCount+'" class="fa fa-times"></i>';
       $(".addTelBtn").before(wrapped);
       $("#adTel-"+$scope.addTelCount).click(function() {
             $(this).parent().parent().remove();
         });
       $scope.transformTelFields();
    }

    $scope.addTel2 = function() {
        console.log("this is  a test  file");
       $scope.addTelCount++;
       var content = $(".addTelBtn").siblings(".telNo");
       var wrapped = content.html()+'<i  id="adTel-'+$scope.addTelCount+'" class="fa fa-times"></i>';
       $(".addTelBtn").before(wrapped);
       $("#adTel-"+$scope.addTelCount).click(function() {
             $(this).parent().parent().remove();
         });
       $scope.transformTelFields();
    }


    $scope.addRentalGoods =  function() {
        $scope.scheduleCount++;
         var content = $(".addGoodsRental").parent().parent().siblings(".rentalGoods");
          var html = '<div class="row rentalGoods">\n\
                            <div class="col-md-2"><div class="form-group">\n\
                                <div class="col-xs-6">\n\
                                    <label class="control-label">Quantity</label>\n\
                                </div>\n\
                            <div class ="col-xs-6">\n\
                                <input type="number" class ="qunatity form-control">\n\
                            </div>\n\
                            </div></div>\n\
                            <div class="col-md-4">\n\
                                <div class="form-group">\n\
                                <div class="col-xs-4">\n\
                                    <label class="control-label">Description</label>\n\
                                        </div>\n\
                                    <div class ="col-xs-8">\n\
                                        <input type="text" class ="desc form-control">\n\
                                    </div>\n\
                                </div>\n\
                            </div>';
         $(".addGoodsRental").parent().before(wrapped);
         $("#schedule-"+$scope.scheduleCount).click(function() {
             $(this).parent().parent().remove();
         });


     };


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
            });

       $scope.load = function(formData) {
         //setting the values changed by Script.
          formData.dateVal = $("#dateVal").val();
          formData.pBirth  = $("#pBirth").val();
          formData.pIAddress = $("#pIAddress").val();
          formData.pIState = $("#pIState").val();
          formData.pIPostcode =  $("#pIPostcode").val();
          formData.pSuburb =  $("#pISuburb").val();
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
                    var obj = {
                                    tel : item[0].value
                              };
                    telNo.push(obj);
               });
               $scope.formData.configAppTelNo = telNo;

        }

        if(formData.type.rental || formData.type.leasing ||formData.singleOrder) {
//            $scope.formData.aYear ="";
//        $scope.formData.aIndustry="";
//        $scope.formData.dateVal="";
//        $scope.formData.pExpiry="";
//        $scope.formData.aCardExpiry ="";
//        $scope.formData.cState ="";
//        $scope.formData.pState ="";
//        $scope.formData.g2State ="";
//        $scope.formData.aTerm ="";
//        $scope.formData.aPeriod ="";
//        $scope.formData.aTotal ="";
//        $scope.formData.pLicState ="";
//        $scope.formData.g2Birth = "";
//        $scope.formData.pBirth ="";
//        $scope.formData.aCardType ="";
//        $scope.formData.wName ="";
//        $scope.formData.wPosition ="";
//        $scope.formData.cPosition ="";


//


              formData["rental"] = {};
              var rental = parseInt(formData.aPayment.replace(/[^\d.]/g,''));
             // formData["aGST"] = rental*10/100;
              //formData["aTotal"] = rental + rental*10/100;

              var schedule = new Array();
              $(".rentalGoods").each(function() {
                    var item = $(this).find("input");
                    var obj = { qty : item[0].value,
                                desc :item[1].value,
                            //    itemNo : item[2].value,
                           //     serNo : item[3].value
                              };
                    schedule.push(obj);
               });
               $scope.formData.rental.schedule = schedule;

        }

        if (formData.type.singleOrder) {
            formData["singleOrder"] = {};
            var schedule = new Array();
               $(".rentalGoods").each(function() {
                    var item = $(this).find("input");
                    var obj = { qty : item[0].value,
                                desc :item[1].value,
                            //    itemNo : item[2].value,
                           //     serNo : item[3].value
                              };
               schedule.push(obj);
               });
               $scope.formData.singleOrder.schedule = schedule;

        }


         $rootScope.formData = formData;
         if($scope.editId) {
             $rootScope.editId = $scope.editId;
          }
         $state.go('rate_card');
       }


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

Qms.controller("FormCtrl", function($scope, $state, $rootScope, Form, Scopes) {
    if($scope.formData.type.voiceUt) {
        var suToE = 0;
        var suMob = 0;
        var rateStdUt = {
            3 : 297,
            6 : 499,

        };
        var sUDID = {
            10 : 9.99,
            20 : 15.99,
            50 : 19.99,
            100: 25.99
        }
         if(!$scope.formData.voiceUntimedFaxQty || isNaN($scope.formData.voiceUntimedFaxQty)) {
            $scope.formData.voiceUntimedFaxQty = 0;
        }
        if(!$scope.formData.voiceUntimedMobQty || isNaN($scope.formData.voiceUntimedMobQty)) {
            $scope.formData.voiceUntimedMobQty = 0;
        }
        if ($scope.formData.voiceUntimedFaxToEmail) {
            suToE = 9.95;
        }
        if ($scope.formData.voiceUntimedMobility) {
            suMob = 7.95;
        }
        if($scope.formData.voiceUntimedDID == "") {
            $scope.uDid = 0;

        } else {
            $scope.uDid = sUDID[$scope.formData.voiceUntimedDID];
        }
        var totalRate = Math.round($scope.formData.voiceUntimedFaxQty*9.95 +
                                   $scope.formData.voiceUntimedMobQty*7.95+
                                   rateStdUt[$scope.formData.voiceUntimedChannel]+
                                   $scope.uDid, 2);

        $scope.voiceUt = {
            template : "templates/forms/voice_solution_untimed.html",
            rate : rateStdUt,
            sfToE : suToE,
            sMob : suMob,
            sDID : sUDID,
            totalRate : totalRate
        };
    }
        if($scope.formData.type.voiceSolution) {

        var ssToE = 0;
        var ssMob = 0;
        var rateStdSolution = {
            3 : 149,
            6 : 179,

        };
        var sSolutionDID = {
            10 : 9.99,
            50 : 19.99,
            100: 25.99
        }
         if(!$scope.formData.voiceSolutionFaxQty || isNaN($scope.formData.voiceSolutionFaxQty)) {
            $scope.formData.voiceSolutionFaxQty = 0;
        }
        if(!$scope.formData.voiceSolutionMobQty || isNaN($scope.formData.voiceSolutionMobQty)) {
            $scope.formData.voiceSolutionMobQty = 0;
        }
        if ($scope.formData.voiceSolutionFaxToEmail) {
            ssToE = 9.95;
        }
        if ($scope.formData.voiceSolutionMobility) {
            ssMob = 7.95;
        }
        if($scope.formData.voiceSolutionDID == "") {
            $scope.sDid = 0;

        } else {
            $scope.sDid = sSolutionDID[$scope.formData.voiceSolutionDID];
        }
        var totalRate = Math.round($scope.formData.voiceSolutionFaxQty*9.95 +
                                   $scope.formData.voiceSolutionMobQty*7.95+
                                   rateStdSolution[$scope.formData.voiceSolutionChannel]+
                                   $scope.sDid, 2);

        $scope.voiceSolution = {
            template : "templates/forms/voice_solution_standard.html",
            rate : rateStdSolution,
            sfToE : ssToE,
            sMob : ssMob,
            sDID : sSolutionDID,
            totalRate : totalRate
        };
    }
    
    if($scope.formData.type.voiceCap) {
        var fToE = 0;
        var mob = 0;
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
            14: 89,
            16: 89,
            18: 89,
            20: 89,
            25: 89

        };
        var dID = {
            10 : 9.99,
            20 : 15.99,
            50 : 19.99,
            100: 25.99
        }
        if(!$scope.formData.voiceFaxQty || isNaN($scope.formData.voiceFaxQty)) {
            $scope.formData.voiceFaxQty = 0;
        }
        if(!$scope.formData.voiceMobQty || isNaN($scope.formData.voiceMobQty)) {
            $scope.formData.voiceMobQty = 0;
        }
        $scope.formData.voiceFaxToEmail? fToE = 9.95 : fToE = 0;
        $scope.formData.voiceMobility ? mob = 7.95 : mob = 0;
        $scope.voiceCap = {
            template : "templates/forms/voice_cap.html",
            rate : rate,
            fToE : fToE,
            mob : mob,
            dID : dID,
            cap : cap
        };
    }

     if ($scope.formData.type.singleOrder) {
        $scope.singleOrder = {
            template : "templates/forms/single_order_spec.html",
        }
     }
     if($scope.formData.type.focusStandard) {
        var sfToE = 0;
        var sMob = 0;
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
         if(!$scope.formData.voiceStdFaxQty || isNaN($scope.formData.voiceStdFaxQty)) {
            $scope.formData.voiceStdFaxQty = 0;
        }
        if(!$scope.formData.voiceStdMobQty || isNaN($scope.formData.voiceStdMobQty)) {
            $scope.formData.voiceStdMobQty = 0;
        }
        $scope.formData.voiceStdFaxToEmail? fToE = 9.95 : fToE = 0;
        $scope.formData.voiceStdMobility ? mob = 7.95 : mob = 0;
        // if ($scope.formData.voiceStdFaxToEmail) {
        //     sfToE = 9.95;
        // }
        // if ($scope.formData.voiceStdMobility) {
        //     sMob = 7.95;
        // }
        if($scope.formData.voiceStdDID == "") {
            $scope.sDid = 0;

        } else {
            $scope.sDid = sDID[$scope.formData.voiceStdDID];
        }
        var monthlyRate = [];
        var totalRate = Number(Math.round(($scope.formData.voiceStdFaxQty*fToE +
                                   $scope.formData.voiceStdMobQty*mob+
                                   rateStd[$scope.formData.voiceStdChannel]+
                                   $scope.sDid)*100)/100);
        console.log(totalRate);
        $scope.voiceStd = {
            template : "templates/forms/voice_std.html",
            rate : rateStd,
            sfToE : sfToE,
            sMob : sMob,
            sDID : sDID,
            totalRate : totalRate
        };
    }

    if($scope.formData.type.completeOffice) {
        var cfToE = 0;
        var cMob = 0;
        $scope.analouge = false;
        $scope.bri = false;
        $scope.pri = false;
        $scope.totalRate = 0;
       if(Number.isInteger($scope.formData.voiceCompAnalouge)) {
           $scope.analouge = true;
           $scope.totalRate += 39.95*$scope.formData.voiceCompAnalouge;
       }
       if(Number.isInteger($scope.formData.voiceCompBri)) {
           $scope.bri = true;
           $scope.totalRate += 99.85*$scope.formData.voiceCompBri;
       }
       if(Number.isInteger($scope.formData.vioceCompPri)) {
           $scope.pri = true;
           $scope.totalRate += 0*$scope.formData.voiceCompPri;
       }
        var cDID = {
            10 : 9.99,
            20 : 15.99,
            50 : 19.99,
            100: 25.99
        };
        if ($scope.formData.voiceCompDID) {
            cTotDid = cDID[$scope.formData.voiceCompDID];

        } else {
            cTotDid = 0;
        }

        if (Number.isInteger($scope.formData.voiceCompFaxToEmail)) {
            cfToE = 9.95;
             $scope.totalRate += cfToE * $scope.formData.voiceCompFaxQty;
        }

        if (Number.isInteger($scope.formData.voiceCompMobility)) {
            cMob = 7.95;
            $scope.totalRate += cMob * $scope.formData.voiceCompMobQty;
        }
        $scope.totalRate += cTotDid;
        $scope.totalRate = Math.round($scope.totalRate,2);
        $scope.voiceComp = {
            template : "templates/forms/voice_comp.html",
            cfToE : cfToE,
            cMob : cMob,
            cDID : cDID
        };
    }

    if ($scope.formData.type.adsl2) {
      var rate =  {
           lite : 79,
           businessUnlimited : 109,
           business100 : 109,
           business200 : 129
       }
       $scope.adsl2Total = Math.round(rate[$scope.formData.adsl2Plans],2);
       $scope.dataAdsl = {
           template : "templates/forms/data_adsl.html",
           totalFee : $scope.adsl2Total,
           rate : rate
       };


    }
    if ($scope.formData.type.ipMidband) {

        var ipPlan = {
            10 : {rate : 499, desc : "Up to 10/10 Mbps**  "},
            T20 : {rate : 599, desc : "Up to 20/20 Mbps**"},
            400 : {rate : 758, desc : "Up to 400/400Mbps**"},
            4 : {rate : 419, desc : "4Mbps/4Mbps"},
            8 : {rate : 429, desc : "8Mbps/8Mbps*"},
            18 : {rate : 489, desc : "18Mbps/18Mbps*"},
            20 : {rate : 599, desc : "20Mbps/20Mbps*"},
            30 : {rate : 998, desc : "30Mbps/30Mbps*"},
            40 : {rate : 1099, desc : "40Mbps/40Mbps*"}
        }
        var ipDownload = {
            50 :{plan : "50GB", rate: 69},
            100 :{plan : "100GB", rate : 79},
            200 : {plan : "200GB" , rate :139},
            300 : {plan : "300GB", rate : 209},
            500 : {plan : "500GB",rate : 339},
            1000 : {plan : "1000GB", rate : 639}
        }

            var totalIpFee = ipPlan[$scope.formData.ipMidbandPlans].rate+
                         ipDownload[$scope.formData.ipMidbandDownload].rate;
            $scope.ipMidband = {
                template : "templates/forms/ip_midband.html",
                totalFee : totalIpFee,
                plan : ipPlan[$scope.formData.ipMidbandPlans],
                download : ipDownload[$scope.formData.ipMidbandDownload]

            }



    }
    if ($scope.formData.type.nbnMonthly) {

        var nbnPlan = {
            255 : {rate : 49, desc : "NBN 25Mbps/5Mbps*"},
            2510 : {rate : 59, desc : "NBN 25Mbps/10Mbps*"},
            5020 : {rate : 69, desc : "Up to 50/20Mbps** TPG"},
            10040 : {rate : 79, desc : "NBN 100Mbps/40Mbps*"}
        }
        var nbnDownload = {
            100 :{plan : "100GB", rate : 19},
            200 : {plan : "200GB" , rate :25},
            500 : {plan : "500GB",rate : 29},
            1000 : {plan : "1000GB", rate : 49}
        }
        var totalNbnFee = nbnPlan[$scope.formData.nbnPlans].rate+
                         nbnDownload[$scope.formData.nbnDownload].rate;
        $scope.nbn = {
            template : "templates/forms/nbn.html",
            totalFee : totalNbnFee,
            plan : nbnPlan[$scope.formData.nbnPlans],
            download : nbnDownload[$scope.formData.nbnDownload]
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
    if ($scope.formData.type.configApp) {
        console.log("tere");
        $scope.configApp = {
            template : "templates/forms/config_app.html"
        }
        var telCount = 0;
        var html="";
        angular.forEach($scope.formData.configAppTelNo, function(data){
            if (telCount ==0) {
                html += "<tr>";
            }
            html +="<td>"+data.tel+"</td>";
            telCount++;
            if (telCount ==3) {
                html += "</tr>";
                telCount = 0;
            }
        });
        if (telCount !=3) {
                html += "</tr>";
            }

        var content = $("#telTable").html();
        $("#telTable").html(content+html);


    }

    if ($scope.formData.type.rental) {
        $scope.rental = {
           template : "templates/forms/rental.html"
        };
    }

    if ($scope.formData.type.chattle) {


        $scope.chattle = {
            template : "templates/forms/chattle.html"
        }
    }
    if ($scope.formData.type.mobileCap) {
        var mobCPlan = {
            39 : {desc:" $250 inc calls 500MB"},
            49 : {desc:" $2500 inc calls 2000MB"},
            59 : {desc:" $2500 inc calls 3000MB"}
        }
        $scope.mobileCap = {
           template : "templates/forms/mobile_mega.html",
           plan : mobCPlan
        };
    }
    if ($scope.formData.type.mobileUt) {
        var mobUPlan = {
            79 : {desc:" Business Executive Included Data 2000MB"},
            99 : {desc:" Business Professional Included Data 4000MB"}
        }
        $scope.mobileUt = {
           template : "templates/forms/mobile_ut.html",
           plan : mobUPlan
        };
    }
    if ($scope.formData.type.mobileWireless) {
        var mobWPlan = {
            15 : {desc:"1GB"},
            25 : {desc:" 2GB"},
            35 : {desc:" 3GB"},
            45 : {desc:" 4GB"},
            50 : {desc:" 6GB"},
            55 : {desc:" 8GB"}

        }
        $scope.mobileWireless = {
           template : "templates/forms/mobile_wireless.html",
           plan : mobWPlan
        };
    }

    if ($scope.formData.type.rate131300) {

        $scope.rate131300 = {
            template : "templates/forms/1300.html"
        }
    }
     if ($scope.formData.type.rateDis131300) {


        $scope.rateDis131300 = {
            template : "templates/forms/1300_discounted.html"
        }
    }
    $scope.downloadPdf = function() {
//        $(".signatureImg").each(function() {
//             var sign = $("<img class='imported' height=36 ></img>")
//            .attr("src",$(this).jSignature('getData'));
//         $(this).html(sign);
//        // $(this).css({"border":"none"});
//        });

        var userProfile =  Scopes.get('DefaultCtrl').profile;
        angular.forEach($rootScope.formData.type, function(value,key) {
             var nametail = new Date().getTime();
             var rand = Math.floor((Math.random()*1000)+10);
             var fileName = key+rand+nametail+".pdf";
             $("#loading").show();
             $("#downloadPdfBn").prop('disabled',true);
             if (value == true) {
                var html =  $("#"+key).html();
                var pdf = Form.update({html:html, fileName : fileName}, function(data) {
                    window.open("assets/files/"+fileName,'_blank');
                        $("#downloadPdfBn").prop('disabled',false);
                        $("#loadingStatus").html("Loading "+key);
                    });
             }

        });
       if($rootScope.editId) {
          var editId = $rootScope.editId;
          $rootScope.editId = null;
       }
         Form.save({data:$scope.formData, user : userProfile.id, editId : editId});
          $state.go('forms');
           $("#loading").hide();

    }

});
 Qms.controller('ViewFormsCtrl', function($scope, $state, Scopes, Form, $rootScope, FlashMessage){
        $scope.profile =  Scopes.get('DefaultCtrl').profile;
          $scope.sortKey = "created_at";
          $scope.reverse = !$scope.reverse;

        Form.show(function(data) {
            $scope.forms = data.formData;
        });



        $scope.edit = function(id) {
            var data = Form.show({id : id}, function(data) {
               $rootScope.viewFormData = data.formData;
               $state.go('forms');
            });
        }

        $scope.delete = function(id) {
           var data = Form.delete({id : id}, function(data) {
               if (data.success) {
                   FlashMessage.setMessage(data);
                 Form.show(function(data){
                    $scope.forms = data.formData;
                 });
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
})

Qms.directive('rowToolsProp', function() {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'templates/common/row_tools_prop.html',
        link: function($scope, $element, attrs) {
            $scope.row_id = attrs['rowId'];
        }
    };
})

Qms.directive("flashMessage", function(FlashMessage, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'templates/common/msg.html',
        link: function($scope) {
            $scope.flashMessage = $scope.$parent.flashMessage;
           // console.log($scope)

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

Qms.run(function ($rootScope) {
    $rootScope.$on('scope.stored', function (event, data) {
        console.log("scope.stored", data);
    });
});
