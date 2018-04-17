
<!DOCTYPE html>
<html ng-app="qms">


  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Configapp</title>

    <!-- Bootstrap -->
    <$$  HTML::style( '/assets/css/bootstrap.min.css') $$>
    <$$  HTML::style( '/assets/angular/font-awesome/css/font-awesome.css') $$>
    <$$  HTML::style( '/assets/angular/css/animate.css')  $$>
    <$$  HTML::style( '/assets/angular/css/style.css')  $$>
    <$$  HTML::style( '/assets/angular/css/plugins/summernote/summernote.css')  $$>
    <$$  HTML::style( '/assets/angular/css/plugins/summernote/summernote-bs3.css')  $$>
    <$$  HTML::style( '/assets/css/parsley.css')  $$>

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


    <!-- Include all compiled plugins (below), or include individual files as needed -->
      <$$ HTML::script( '/assets/angular/js/jquery/jquery-2.1.1.min.js') $$>
      <$$ HTML::script( '/assets/js/bootstrap.min.js') $$>
      <$$ HTML::script( '/assets/js/angular.min.js') $$>
      <$$ HTML::script( '/assets/js/angular-resource.min.js') $$>
      <$$ HTML::script( '/assets/angular/js/ui-router/angular-ui-router.min.js') $$>
      <$$ HTML::script( '/assets/angular/js/plugins/metisMenu/jquery.metisMenu.js') $$>
      <$$ HTML::script( '/assets/angular/js/plugins/summernote/summernote.min.js') $$>
      <$$ HTML::script( '/assets/angular/js/plugins/summernote/angular-summernote.min.js') $$>
      <$$ HTML::script( '/assets/angular/js/bootstrap/ui-bootstrap-tpls-0.11.0.min.js') $$>
      <$$ HTML::script( '/assets/js/parsley.js') $$>
      <$$ HTML::script( '/assets/js/angular-file-upload.js') $$>

      <$$ HTML::script( '/assets/js/app.js?v=0.0.1') $$>
      <$$ HTML::script( '/assets/js/config.js') $$>
      <$$ HTML::script( '/assets/js/resources.js') $$>

      <$$ HTML::script( '/assets/js/directives.js') $$>
      <$$ HTML::script( '/assets/js/controllers.js') $$>


  </body>
</html>