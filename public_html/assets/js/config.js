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
    var version = _version;
    $urlRouterProvider.otherwise("/forms")
    $stateProvider
        .state('service_qualify',{
            url: "/service_qualify",
            templateUrl: "templates/catalog/frontier/service_qualify.html?t=" + version,
            controller:'ServiceQualifyCtrl'
        })
        .state('products', {
            url: "/products",
            templateUrl: "templates/catalog/products/list.html?t=" + version,
            controller:'ProductListCtrl'
        })
        .state('schedule_goods',{
             url: "/schedule_goods",
            templateUrl: "templates/catalog/schedule_goods/list.html?t=" + version,
            controller:'ScheduleGoodsListCtrl'
        })
        .state('add_product', {
            url: "/products/new",
            templateUrl: "templates/catalog/products/form.html?t=" + version,
            controller:'ProductCtrl'
        })
        .state('edit_product', {
            url: "/product/edit/:id",
            templateUrl: "templates/catalog/products/form.html?t=" + version,
            controller:'ProductCtrl'
        })
        .state('categories', {
            url: "/categories",
            templateUrl: "templates/catalog/categories/list.html?t=" + version,
            controller:'CategoryListCtrl'
        })
        .state('add_category', {
            url: "/category/new",
            templateUrl: "templates/catalog/categories/form.html?t=" + version,
            controller:'CategoryCtrl'
        })
        .state('edit_category', {
            url: "/category/edit/:id",
            templateUrl: "templates/catalog/categories/form.html?t=" + version,
            controller:'CategoryCtrl'
        })
        .state('companies', {
            url: "/companies",
            templateUrl: "templates/company/list.html?t=" + version,
            controller:'CompanyListCtrl',
            data: { pageTitle: 'Companies' }
        })
        .state('add_company', {
            url: "/companies/new",
            templateUrl: "templates/company/form.html?t=" + version,
            controller:'CompanyCtrl',
            data: { pageTitle: 'Companie' }
        })
         .state('edit_company', {
            url: "/company/edit/:id",
            templateUrl: "templates/company/form.html?t=" + version,
            controller:'CompanyCtrl'
        })
        .state('salesreps', {
            url: "/salesreps",
            templateUrl: "templates/salesrep/list.html?t=" + version,
            controller:'SalesRepListCtrl'
        })
        .state('add_salesrep', {
            url: "/salesrep/new",
            templateUrl: "templates/salesrep/form.html?t=" + version,
            controller:'SalesRepCtrl'
        })
        .state('edit_salesrep', {
            url: "/salesrep/edit/:id",
            templateUrl: "templates/salesrep/form.html?t=" + version,
            controller:'SalesRepCtrl'
        })
        .state('telemarketers', {
            url: "/telemarketers",
            templateUrl: "templates/telemarketer/list.html?t=" + version,
            controller:'TelemarketerListCtrl',
            data: { pageTitle: 'Telemarketer' }
        })
        .state('add_telemarketer', {
            url: "/telemarketer/new",
            templateUrl: "templates/telemarketer/form.html?t=" + version,
            controller:'TelemarketerCtrl'
        })
        .state('edit_telemarketer', {
            url: "/telemarketer/edit/:id",
            templateUrl: "templates/telemarketer/form.html?t=" + version,
            controller:'TelemarketerCtrl'
        })
        .state('winbacks', {
            url: "/winbacks",
            templateUrl: "templates/winback/list.html?t=" + version,
            controller:'WinBackListCtrl',
            data: { pageTitle: 'Telemarketer' }
        })
        .state('add_winback', {
            url: "/winback/new",
            templateUrl: "templates/winback/form.html?t=" + version,
            controller:'WinBackCtrl'
        })
        .state('edit_winback', {
            url: "/winback/edit/:id",
            templateUrl: "templates/winback/form.html?t=" + version,
            controller:'WinBackCtrl'
        })
        .state('leadsources', {
            url: "/leadsources",
            templateUrl: "templates/leadsource/list.html?t=" + version,
            controller:'LeadSourceListCtrl',
            data: { pageTitle: 'LeadSource' }
        })
        .state('add_leadsource', {
            url: "/leadsource/new",
            templateUrl: "templates/leadsource/form.html?t=" + version,
            controller:'LeadSourceCtrl'
        })
         .state('edit_leadsource', {
            url: "/leadsource/edit/:id",
            templateUrl: "templates/leadsource/form.html?t=" + version,
            controller:'LeadSourceCtrl'
        })
        .state('users', {
            url: "/users",
            templateUrl: "templates/user/list.html?t=" + version,
            controller:'UserListCtrl',
            data: { pageTitle: 'Users' }
        })
        .state('add_user', {
            url: "/user/new",
            templateUrl: "templates/user/form.html?t=" + version,
            controller:'UserCtrl',
            data: { pageTitle: 'User' }
        })
        .state('edit_user', {
            url: "/user/edit/:id",
            templateUrl: "templates/user/form.html?t=" + version,
            controller:'UserCtrl'
        })
        .state('config', {
            url: "/config",
            templateUrl: "templates/config/form.html?t=" + version,
            controller:'ConfigCtrl'
        })
        .state('finance_rates', {
            url: "/finance_rates",
            templateUrl: "templates/config/finance_rates.html?t=" + version,
            controller:'FinanceRatesCtrl'
        })
        .state('flexi_rent', {
            url: "/flexi_rent",
            templateUrl: "templates/flexirent/flexi_rent.html?t=" + version,
            controller:'FlexiRentCtrl'
        })
        .state('proposals', {
            url: "/proposals",
            templateUrl: "templates/proposal/list.html?t=" + version,
            controller:'ProposalListCtrl'
        })
        .state( 'view_products', {
            url : "/proposal/view-products/:id",
            templateUrl : "templates/proposal/view-products.html?t=" + version,
            controller : 'ProductViewCtrl'          
           
        })
        .state('add_proposal', {
            url: "/proposal/new",
            templateUrl: "templates/proposal/form.html?t=" + version,
            controller:'ProposalCtrl'
        })
	    .state('edit_proposal', {
            url: "/proposal/edit/:id",
            templateUrl: "templates/proposal/form.html?t=" + version,
            controller:'ProposalCtrl'
        })
        .state('forms', {
            url: "/forms",
            templateUrl: "templates/forms/form.html?t=" + version,
            controller : "FormDataCtrl"
        })
        .state('view_forms', {
            url : "/view-forms",
            templateUrl : "templates/forms/view-forms.html?t=" + version,
            controller : "ViewFormsCtrl"
        })
        .state ('rate_card', {
            url : "/forms/rate_card",
            templateUrl : "templates/forms/rate_card.html?t=" + version,
            controller : "FormCtrl"
        })
        .state ('form_fields', {
            url : "/forms/form_fields",
            templateUrl : "templates/forms/form_fields.html?t=" + version,
            controller : "FormFieldCtrl"
        })
        .state ('settings', {
            url : "/user/settings",
            controller : "UserCtrl"
        })
      
}
angular
    .module('qms')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });