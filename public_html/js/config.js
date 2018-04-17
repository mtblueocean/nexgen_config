/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2014 Webapplayers.com
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.otherwise("/proposals")
           
    
    $stateProvider
        .state('products', {
            url: "/products",
            templateUrl: "templates/catalog/products/list.html",
            controller:'ProductListCtrl'
        })
        .state('add_product', {
            url: "/products/new",
            templateUrl: "templates/catalog/products/form.html",
            controller:'ProductCtrl'
        })
        .state('edit_product', {
            url: "/product/edit/:id",
            templateUrl: "templates/catalog/products/form.html",
            controller:'ProductCtrl'
        })
        .state('categories', {
            url: "/categories",
            templateUrl: "templates/catalog/categories/list.html",
            controller:'CategoryListCtrl'
        })
        .state('add_category', {
            url: "/category/new",
            templateUrl: "templates/catalog/categories/form.html",
            controller:'CategoryCtrl'
        })
        .state('edit_category', {
            url: "/category/edit/:id",
            templateUrl: "templates/catalog/categories/form.html",
            controller:'CategoryCtrl'
        })
        .state('companies', {
            url: "/companies",
            templateUrl: "templates/company/list.html",
            controller:'CompanyListCtrl',
            data: { pageTitle: 'Companies' }
        })
        .state('add_company', {
            url: "/companies/new",
            templateUrl: "templates/company/form.html",
            controller:'CompanyCtrl',
            data: { pageTitle: 'Companie' }
        })
         .state('edit_company', {
            url: "/company/edit/:id",
            templateUrl: "templates/company/form.html",
            controller:'CompanyCtrl'
        })
        .state('salesreps', {
            url: "/salesreps",
            templateUrl: "templates/salesrep/list.html",
            controller:'SalesRepListCtrl'
        })
        .state('add_salesrep', {
            url: "/salesrep/new",
            templateUrl: "templates/salesrep/form.html",
            controller:'SalesRepCtrl'
        })
        .state('edit_salesrep', {
            url: "/salesrep/edit/:id",
            templateUrl: "templates/salesrep/form.html",
            controller:'SalesRepCtrl'
        })
        .state('telemarketers', {
            url: "/telemarketers",
            templateUrl: "templates/telemarketer/list.html",
            controller:'TelemarketerListCtrl',
            data: { pageTitle: 'Telemarketer' }
        })
        .state('add_telemarketer', {
            url: "/telemarketer/new",
            templateUrl: "templates/telemarketer/form.html",
            controller:'TelemarketerCtrl'
        })
        .state('edit_telemarketer', {
            url: "/telemarketer/edit/:id",
            templateUrl: "templates/telemarketer/form.html",
            controller:'TelemarketerCtrl'
        })
        .state('winbacks', {
            url: "/winbacks",
            templateUrl: "templates/winback/list.html",
            controller:'WinBackListCtrl',
            data: { pageTitle: 'Telemarketer' }
        })
        .state('add_winback', {
            url: "/winback/new",
            templateUrl: "templates/winback/form.html",
            controller:'WinBackCtrl'
        })
        .state('edit_winback', {
            url: "/winback/edit/:id",
            templateUrl: "templates/winback/form.html",
            controller:'WinBackCtrl'
        })
        .state('leadsources', {
            url: "/leadsources",
            templateUrl: "templates/leadsource/list.html",
            controller:'LeadSourceListCtrl',
            data: { pageTitle: 'LeadSource' }
        })
        .state('add_leadsource', {
            url: "/leadsource/new",
            templateUrl: "templates/leadsource/form.html",
            controller:'LeadSourceCtrl'
        })
         .state('edit_leadsource', {
            url: "/leadsource/edit/:id",
            templateUrl: "templates/leadsource/form.html",
            controller:'LeadSourceCtrl'
        })
        .state('users', {
            url: "/users",
            templateUrl: "templates/user/list.html",
            controller:'UserListCtrl',
            data: { pageTitle: 'Users' }
        })
        .state('add_user', {
            url: "/user/new",
            templateUrl: "templates/user/form.html",
            controller:'UserCtrl',
            data: { pageTitle: 'User' }
        })
        .state('edit_user', {
            url: "/user/edit/:id",
            templateUrl: "templates/user/form.html",
            controller:'UserCtrl'
        })
        .state('config', {
            url: "/config",
            templateUrl: "templates/config/form.html",
            controller:'ConfigCtrl'
        })
        .state('finance_rates', {
            url: "/finance_rates",
            templateUrl: "templates/config/finance_rates.html",
            controller:'FinanceRatesCtrl'
        })
        .state('flexi_rent', {
            url: "/flexi_rent",
            templateUrl: "templates/flexirent/flexi_rent.html",
            controller:'FlexiRentCtrl'
        })
        .state('proposals', {
            url: "/proposals",
            templateUrl: "templates/proposal/list.html",
            controller:'ProposalListCtrl'
        })
        .state( 'view_products', {
            url : "/proposal/view-products/:id",
            templateUrl : "templates/proposal/view-products.html",
            controller : 'ProductViewCtrl'          
           
        })
        .state('add_proposal', {
            url: "/proposal/new",
            templateUrl: "templates/proposal/form.html",
            controller:'ProposalCtrl'
        })
	    .state('edit_proposal', {
            url: "/proposal/edit/:id",
            templateUrl: "templates/proposal/form.html",
            controller:'ProposalCtrl'
        })
        .state('forms', {
            url: "/forms",
            templateUrl: "templates/forms/form.html",
            controller : "FormDataCtrl"
        })
        .state('view_forms', {
                    url : "/view-forms",
            templateUrl : "templates/forms/view-forms.html",
            controller : "ViewFormsCtrl"
        })
        .state ('rate_card', {
                    url : "/forms/rate_card",
            templateUrl : "templates/forms/rate_card.html",
            controller : "FormCtrl"
        })
        .state ('form_fields', {
                    url : "/forms/form_fields",
            templateUrl : "templates/forms/form_fields.html",
            controller : "FormFieldCtrl"
        })
      
}
angular
    .module('qms')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });