var Qms = null; //'summernote',
(function() {
    Qms = angular.module('qms', [
        'ui.router', 'ngResource', 'angularFileUpload', 'ui.bootstrap', 
    ])
})();

Qms.controller('DefaultCtrl', function($scope, $rootScope, $http, FlashMessage) {
    $scope.flashMessage = FlashMessage;

    $http.get("profile").success(function(response) {
        $scope.profile = response;
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
                $scope.categories = Category.query()
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




Qms.controller('ProposalListCtrl', function($scope, $filter, $http, $state, Proposal,Products, FlashMessage) {
    $scope.proposals = Proposal.query();

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
        }, function(data) {
          $scope.products = Products.query(); 
      });
    }
	
	$scope.delete = function(row_id) {
        Proposal.delete({
            proposal_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.proposals = Proposal.query();

        });
    }
	
	$scope.export = function(row_id) {
		
		$http.get('http://new.jimmydata.com/gf.php').success(function (data) {
			alert(row_id)
		});
        /*Proposal.delete({
            proposal_id: row_id
        }, function(data) {
            FlashMessage.setMessage(data);
            if (data.success == true)
                $scope.proposals = Proposal.query();

        });*/
    }
});


Qms.controller('ProposalCtrl', function($scope, $filter, $http, $state, $location, $stateParams, Salesrep, Leadsource, Telemarketer, Winback, Company, Product, Category, FlashMessage, FlexiRent, Proposal) {
	
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
	if (1==1) {
		var split = (document.URL).split('#');

		var first = split[0];
		var idfri = first.substr(first.length - 1);

		if(isFinite(first.substr(first.length - 2))){
			idfri = first.substr(first.length - 2);
		}
	
        $scope.proposal = Proposal.get({
            proposal_id: idfri
        });
		
		//$scope.proposal.products = $scope.proposal.items;
		
    } else {
        $scope.proposal = {
			sites: [{name:"Site"}], products: []
		};
		
		$scope.level_weekly = "";
		$scope.proposal.hardware_discount = "";
		$scope.proposal.residual = "";
		$scope.proposal.call_discount = 0;
		$scope.grant_total = 0;
	}
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
    }, {
        id: '2',
        title: 'Outright'
    }];
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
                console.log(typeof rent[i].to);
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
				gtotal =  parseInt(gtotalpm) / parseInt(curr_month.title)
			}

			$scope.level_weekly = " Monthly ";
			$scope.grant_total = gtotal;
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

        if ($scope.proposal.products)
            for (var i = 0; i < $scope.proposal.products.length; i++) {
                $scope.updateRent(i);
            }
    }

    $scope.save = function() {
		
		if (!$("#products_form").parsley('validate')) 
			return;
		
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
            console.log($scope)

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

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});