<!DOCTYPE html>
<html ng-app="qms">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Quoting - Nexgen</title>


    <!-- Bootstrap -->
    <$$  HTML::style( '/assets/css/bootstrap.min.css') $$>
    <$$  HTML::style( '/assets/angular/font-awesome/css/font-awesome.css') $$>
    <$$  HTML::style( '/assets/angular/css/animate.css')  $$>
    <$$  HTML::style( '/assets/angular/css/style.css')  $$>
    <$$  HTML::style( '/assets/angular/css/plugins/summernote/summernote.css')  $$>
    <$$  HTML::style( '/assets/angular/css/plugins/summernote/summernote-bs3.css')  $$>
    <$$  HTML::style( '/assets/css/parsley.css')  $$>
    <$$  HTML::style( '/assets/css/jquery-ui.css')  $$>
    <$$  HTML::style( '/assets/angular/css/plugins/steps/jquery.steps.css')  $$>
    <$$  HTML::style( '/assets/js/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css')  $$>
    <$$  HTML::style( '/assets/angular/css/angucomplete.css')  $$>
    <$$  HTML::style( '/assets/css/checkbox-radio-switch.css')  $$>  
    <$$  HTML::style( '/assets/css/noJS.css')  $$>  
    <$$  HTML::style( '/assets/css/dropdown-style.css')  $$>  
    <$$ HTML::style( '/assets/bower_components/ng-dialog/css/ngDialog.css') $$>
    <$$ HTML::style( '/assets/bower_components/ng-dialog/css/ngDialog-theme-default.css') $$>
    <$$ HTML::style( '/assets/bower_components/chosen/chosen.css') $$> 
    <$$ HTML::style( '/assets/bower_components/textAngular/dist/textAngular.css') $$> 
    <$$ HTML::style( '/assets/bower_components/angular-google-places-autocomplete/src/autocomplete.css') $$>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    </head>

    <body>

        <!-- Wrapper-->
        <div id="wrapper" ng-controller="DefaultCtrl">

            <!-- Navigation -->
            <div ng-include="'templates/common/navigation.html'"></div>

            <!-- Page wraper -->
            <!-- ng-class with current state name give you the ability to extended customization your view -->
            <div id="page-wrapper" class="gray-bg {{$state.current.name}}">

                <!-- Page wrapper -->
                <div ng-include="'templates/common/topnavbar.html'"></div>

                <!-- Main view  -->
                  <div ui-view>
                      @yield('content')
                  </div>

                <!-- Footer -->
                <div ng-include="'templates/common/footer.html'"></div>

            </div>
            <!-- End page wrapper-->

        </div>
        <!-- End wrapper-->


        <!-- Include all compiled plugins (below), or include individual files as needed.. -->
        <$$ HTML::script( '/assets/angular/js/jquery/jquery-2.1.1.min.js') $$>
        <$$ HTML::script( '/assets/js/jSignature.min.js') $$>     
        <$$ HTML::script( '/assets/js/bower_components/moment/min/moment.min.js') $$>
        <$$ HTML::script( '/assets/js/bootstrap.min.js') $$>
        <$$ HTML::script( '/assets/js/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js') $$>
        <$$ HTML::script( '/assets/angular.min.js') $$>
        <$$ HTML::script( '/assets/angular/js/angular/angular-touch.min.js') $$>
        <$$ HTML::script( '/assets/bower_components/angular-animate/angular-animate.min.js') $$>    
        <$$ HTML::script( '/assets/js/angular-resource.min.js') $$>
        <!-- <$$ HTML::script( '/assets/js/ui-bootstrap-tpls-1.2.4.min.js') $$> -->
        <$$ HTML::script( '/assets/angular/js/ui-router/angular-ui-router.min.js') $$>     
        <$$ HTML::script( '/assets/angular/js/plugins/metisMenu/jquery.metisMenu.js') $$>
        <$$ HTML::script( '/assets/angular/js/plugins/summernote/summernote.min.js') $$>
        <$$ HTML::script( '/assets/angular/js/plugins/summernote/angular-summernote.min.js') $$>
        <$$ HTML::script( '/assets/angular/js/bootstrap/ui-bootstrap-tpls-0.11.0.min.js') $$>
        <$$ HTML::script( '/assets/js/parsley.js') $$>
        <$$ HTML::script( '/assets/js/angular-file-upload.js') $$>   
        <$$ HTML::script( '/assets/js/app.js?v=0.0.4') $$>
        <$$ HTML::script( '/assets/js/config.js') $$>
        <$$ HTML::script( '/assets/js/resources.js') $$>
        <$$ HTML::script( '/assets/js/jquery-ui.js') $$>
        <$$ HTML::script( '/assets/js/directives.js') $$>
        <$$ HTML::script( '/assets/js/controllers.js') $$>  
        <$$ HTML::script( '/assets/angular/js/angular/angucomplete.js') $$> 
        <$$ HTML::script( '/assets/bower_components/ng-dialog/js/ngDialog.js') $$>      
        <$$ HTML::script( '/assets/js/modernizr.custom.7963.js') $$> 
        <$$ HTML::script( '/assets/bower_components/chosen/chosen.jquery.min_.js') $$>
        <$$ HTML::script( '/assets/bower_components/angular-chosen-localytics/dist/angular-chosen.min.js') $$>
        <$$ HTML::script( '/assets/bower_components/textAngular/dist/textAngular-rangy.min.js') $$>
        <$$ HTML::script( '/assets/bower_components/textAngular/dist/textAngular-sanitize.min.js') $$>
        <$$ HTML::script( '/assets/bower_components/textAngular/dist/textAngular.min.js') $$>
    	<!-- Steps -->
        <$$ HTML::script( '/assets/angular/js/plugins/staps/jquery.steps.min.js') $$>
        <$$ HTML::script( '/assets/js/plugins/validate/jquery.validate.min.js') $$>  
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzAs0IiqMuvGE_x1QsxqpiD8ulkom2JLg&libraries=places" type="text/javascript"></script>
        <$$ HTML::script( '/assets/bower_components/ngmap/build/scripts/ng-map.min.js') $$>
        <$$ HTML::script( '/assets/bower_components/angular-google-places-autocomplete/src/autocomplete.js') $$>
        <script type="text/javascript">
            var _version = '<$$ $version $$>';
        </script>
    </body>
</html>