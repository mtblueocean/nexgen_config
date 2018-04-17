
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

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
	
	
	<style>
		.btn-primary {
			background-color: #000000;
			border-color: #000000;
			color: #FFFFFF;
		}
		
		.middle-box2 {
			width: 400px;
			padding-top: 40px;
			margin: 0 auto;text-align: center;
		}
		
		
		body {
		background: #FFFFFF url(assets/images/sitebg-home.png) center top repeat-x;
		padding: 0;
		margin: 0;
		}
	</style>
	
  </head>
<body >
	<div style="margin: 0 auto;text-align: center;">

		<h1 class="logo-name">nexgen</h1>

    </div>
	<div style="clear:both"></div>
    <div class="middle-box2 text-center loginscreen  animated fadeInDown">
        <div>
            
            <h3>Welcome to ConfigApp</h3>
            <p>Login in. To see it in action.</p>
            <$$ Form::open(array('url' => 'login')) $$>

            <!-- if there are login errors, show them here -->
            <p style="color:red">
                <$$ $errors->first('email') $$>
                <$$ $errors->first('password') $$>
            </p>

            <div class="form-group">
                <$$ Form::text('username', Input::old('email'), array('placeholder' => 'Username','class'=>'form-control')) $$>
            </div>

            <div class="form-group">
                <$$ Form::password('password',array('placeholder' => 'Password','class'=>'form-control')) $$>
             </div>

            <p><$$ Form::submit('Submit!',array('class'=>"btn btn-primary block full-width m-b")) $$></p>
             <$$ Form::close() $$>
             <br />
             <br />
            <p>Current Version : <$$ $version $$></p>

        </div>
    </div>

</body>

</html>
