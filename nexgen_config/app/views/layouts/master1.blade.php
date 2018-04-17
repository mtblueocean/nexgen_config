
<!DOCTYPE html>
<html lang="en" ng-app="MedFund">


  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Medfund</title>

    <!-- Bootstrap -->
    <%%  HTML::style( '/assets/css/bootstrap.min.css') %%>
    <%%  HTML::style( '/assets/css/dashboard.css')  %%>
    <%%  HTML::style( '/assets/css/bootstrap-datetimepicker.min.css')  %%>
    <%%  HTML::style( '/assets/css/style.css')  %%>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

     <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Quote Configurator</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">

          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      @yield('content')
    </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
      <%% HTML::script( '/assets/js/bootstrap.min.js') %%>
      <%% HTML::script( '/assets/js/angular.min.js') %%>
      <%% HTML::script( '/assets/js/moment.js') %%>
      <%% HTML::script( '/assets/js/bootstrap-datetimepicker.js') %%>
      <%% HTML::script( '/assets/js/app.js') %%>
  </body>
</html>