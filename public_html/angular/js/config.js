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
    $urlRouterProvider.otherwise("/products");
    $stateProvider
        .state('products', {
            url: "/products",
            templateUrl: "templates/catalog/products/list.html",
        })
        .state('add_product', {
            url: "/products/new",
            templateUrl: "templates/catalog/products/form.html",
        })
        .state('categories', {
            url: "/categories",
            templateUrl: "templates/catalog/categories/list.html",
            data: { pageTitle: 'categories 2' }
        })
        .state('schedule_goods',{
            url: "/schedule_goods",
            templateUrl: "templates/catalog/schedule_goods/list.html",
            data: { pageTitle: 'Schedule of Goods' }
        })
        .state('dashboard_3', {
            url: "/dashboard_3",
            templateUrl: "angular/views/dashboard_3.html",
            data: { pageTitle: 'Dashboard 3' }
        })
        .state('flot_chart', {
            url: "/flot_chart",
            templateUrl: "angular/views/graph_flot.html",
            data: { pageTitle: 'Flot chart' }
        })
        .state('morris_chart', {
            url: "/morris_chart",
            templateUrl: "angular/views/graph_morris.html",
            data: { pageTitle: 'Morris chart' }
        })
        .state('rickshaw_chart', {
            url: "/rickshaw_chart",
            templateUrl: "angular/views/graph_rickshaw.html",
            data: { pageTitle: 'Rickshaw chart' }
        })
        .state('peity_chart', {
            url: "/peity_chart",
            templateUrl: "angular/views/graph_peity.html",
            data: { pageTitle: 'Peity graphs' }
        })
        .state('sparkline_chart', {
            url: "/sparkline_chart",
            templateUrl: "angular/views/graph_sparkline.html",
            data: { pageTitle: 'Sparkline chart' }
        })
        .state('chartjs_chart', {
            url: "/chartjs_chart",
            templateUrl: "angular/views/chartjs.html",
            data: { pageTitle: 'Chart.js' }
        })
        .state('inbox', {
            url: "/inbox",
            templateUrl: "views/mailbox.html",
            data: { pageTitle: 'Mail Inbox' }
        })
        .state('email_view', {
            url: "/email_view",
            templateUrl: "angular/views/mail_detail.html",
            data: { pageTitle: 'Mail detail' }
        })
        .state('email_compose', {
            url: "/email_compose",
            templateUrl: "angular/views/mail_compose.html",
            data: { pageTitle: 'Mail compose' }
        })
        .state('widgets', {
            url: "/widgets",
            templateUrl: "views/widgets.html",
            data: { pageTitle: 'Widhets' }
        })
        .state('basic_form', {
            url: "/basic_form",
            templateUrl: "angular/views/form_basic.html",
            data: { pageTitle: 'Basic form' }
        })
        .state('advanced_plugins', {
            url: "/advanced_plugins",
            templateUrl: "angular/angular/views/form_advanced.html",
            data: { pageTitle: 'Advanced form' }
        })
        .state('wizard', {
            url: "/wizard",
            templateUrl: "angular/angular/views/form_wizard.html",
            controller: wizardCtrl,
            data: { pageTitle: 'Wizard form' }
        })
        .state('wizard.step_one', {
            url: '/step_one',
            templateUrl: 'angular/views/wizard/step_one.html',
            data: { pageTitle: 'Wizard form' }
        })
        .state('wizard.step_two', {
            url: '/step_two',
            templateUrl: 'angular/views/wizard/step_two.html',
            data: { pageTitle: 'Wizard form' }
        })
        .state('wizard.step_three', {
            url: '/step_three',
            templateUrl: 'angular/views/wizard/step_three.html',
            data: { pageTitle: 'Wizard form' }
        })
        .state('file_upload', {
            url: "/file_upload",
            templateUrl: "angular/views/form_file_upload.html",
            data: { pageTitle: 'File upload' }
        })
        .state('text_editor', {
            url: "/text_editor",
            templateUrl: "angular/views/form_editors.html",
            data: { pageTitle: 'Text editor' }
        })
        .state('contacts', {
            url: "/contacts",
            templateUrl: "angular/views/contacts.html",
            data: { pageTitle: 'Contacts' }
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "angular/views/profile.html",
            data: { pageTitle: 'Profile' }
        })
        .state('projects', {
            url: "/projects",
            templateUrl: "angular/views/projects.html",
            data: { pageTitle: 'Projects' }
        })
        .state('project_detail', {
            url: "/project_detail",
            templateUrl: "angular/views/project_detail.html",
            data: { pageTitle: 'Project detail' }
        })
        .state('file_manager', {
            url: "/file_manager",
            templateUrl: "angular/views/file_manager.html",
            data: { pageTitle: 'File manager' }
        })
        .state('calendar', {
            url: "/calendar",
            templateUrl: "angular/views/calendar.html",
            data: { pageTitle: 'Calendar' }
        })
        .state('faq', {
            url: "/faq",
            templateUrl: "angular/views/faq.html",
            data: { pageTitle: 'FAQ' }
        })
        .state('timeline', {
            url: "/timeline",
            templateUrl: "angular/views/timeline.html",
            data: { pageTitle: 'Timeline' }
        })
        .state('pin_board', {
            url: "/pin_board",
            templateUrl: "angular/views/pin_board.html",
            data: { pageTitle: 'Pin board' }
        })
        .state('invoice', {
            url: "/invoice",
            templateUrl: "angular/views/invoice.html",
            data: { pageTitle: 'Invoice' }
        })
        .state('search_results', {
            url: "/search_results",
            templateUrl: "angular/views/search_results.html",
            data: { pageTitle: 'Search results' }
        })
        .state('empy_page', {
            url: "/empy_page",
            templateUrl: "angular/views/empty_page.html",
            data: { pageTitle: 'Empty page' }
        })
        .state('typography', {
            url: "/typography",
            templateUrl: "angular/views/typography.html",
            data: { pageTitle: 'Typography' }
        })
        .state('icons', {
            url: "/icons",
            templateUrl: "angular/views/icons.html",
            data: { pageTitle: 'Icons' }
        })
        .state('draggable_panels', {
            url: "/draggable_panels",
            templateUrl: "views/draggable_panels.html",
            data: { pageTitle: 'Draggable panels' }
        })
        .state('buttons', {
            url: "/buttons",
            templateUrl: "views/buttons.html",
            data: { pageTitle: 'Buttons' }
        })
        .state('tabs_panels', {
            url: "/tabs_panels",
            templateUrl: "angular/views/tabs_panels.html",
            data: { pageTitle: 'Tabs and panels' }
        })
        .state('notifications_tooltips', {
            url: "/notifications_tooltips",
            templateUrl: "angular/views/notifications.html",
            data: { pageTitle: 'Notifications and tooltips' }
        })
        .state('badges_labels', {
            url: "/badges_labels",
            templateUrl: "angular/views/badges_labels.html",
            data: { pageTitle: 'Badges and labels and progress' }
        })
        .state('video', {
            url: "/video",
            templateUrl: "angular/views/video.html",
            data: { pageTitle: 'Responsible Video' }
        })
        .state('grid_options', {
            url: "/grid_options",
            templateUrl: "angular/views/grid_options.html",
            data: { pageTitle: 'Grid options' }
        })
        .state('static_table', {
            url: "/static_table",
            templateUrl: "angular/views/table_basic.html",
            data: { pageTitle: 'Static table' }
        })
        .state('data_tables', {
            url: "/data_tables",
            templateUrl: "angular/views/table_data_tables.html",
            data: { pageTitle: 'Data Tables' }
        })
        .state('basic_gallery', {
            url: "/basic_gallery",
            templateUrl: "angular/views/basic_gallery.html",
            data: { pageTitle: 'Basic gallery' }
        })
        .state('bootstrap_carousel', {
            url: "/bootstrap_carousel",
            templateUrl: "angular/views/carousel.html",
            data: { pageTitle: 'Bootstrap carousel' }
        })
        .state('css_animations', {
            url: "/css_animations",
            templateUrl: "angular/views/css_animation.html",
            data: { pageTitle: 'CSS Animations' }
        });
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });