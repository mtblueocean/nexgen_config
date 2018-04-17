<?php

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/


	public function index()
	{	Blade::setEscapedContentTags('<$', '$>');
		Blade::setContentTags('<$$', '$$>');
		$version = Config::get('app.version');
		if(Auth::check())
			return View::make('index')->with('version',$version);
		else
			return Redirect::to('login')->with('version',$version);

	}
	
	public function showReport()
	{	
			Blade::setEscapedContentTags('<$', '$>');
			Blade::setContentTags('<$$', '$$>');
			
			return View::make('report');
	}

	public function showLogin()
	{
		Blade::setEscapedContentTags('<$', '$>');
		Blade::setContentTags('<$$', '$$>');

		$version = Config::get('app.version');
		// show the form
		return View::make('login')->with('version',$version);
	}

	public function doLogin(){



		// validate the info, create rules for the inputs
		$rules = array(
			'username'  => 'required', // make sure the email is an actual email
			'password'  => 'required|min:3' // password can only be alphanumeric and has to be greater than 3 characters
		);

		// run the validation rules on the inputs from the form
		$validator = Validator::make(Input::all(), $rules);

		// if the validator fails, redirect back to the form
		if ($validator->fails()) {
			return Redirect::to('login')
				->withErrors($validator) // send back all errors to the login form
				->withInput(Input::except('password')); // send back the input (not the password) so that we can repopulate the form
		} else {

			// create our user data for the authentication
			$userdata = array(
				'username' 	=> Input::get('username'),
				'password' 	=> Input::get('password')
			);

			// attempt to do the login
			if (Auth::attempt($userdata)) {
				return Redirect::to('/');
			} else {
				// validation not successful, send back to form
				return Redirect::to('login');
			}

		}

	}

	public function doLogout()
	{
		Auth::logout(); // log the user out of our application
		return Redirect::to('login'); // redirect the user to the login screen
	}

	public function getCurrentUser()
	{
		$user = Auth::user();

		if ( !$user ) {
			return Response::json(['error' => 1, 'msg' => "Your session is expired."]);
		}

		if (Auth::check()) {
			if (!file_exists($_SERVER['DOCUMENT_ROOT'] . "/" . $user->sign))
				$user->sign = "";
		}
		return Response::json($user);
	}
}
