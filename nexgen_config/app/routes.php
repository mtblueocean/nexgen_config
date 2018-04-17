<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/


Route::get('/','HomeController@index');
Route::post('/product/upload','ProductController@upload');
//Route::get('/category/getCatByLevel','CategoryController@getCatByLevel');
Route::get('/category/{id}/{level}','CategoryController@show');
Route::resource('product', 'ProductController');
Route::resource('schedule_goods','ScheduleGoodsController');
Route::resource('category', 'CategoryController');
Route::resource('financetype', 'FinanceTypeController');
Route::resource('typet', 'TypetController');
Route::resource('company', 'CompanyController');
Route::resource('salesrep', 'SalesRepController');
Route::resource('telemarketer', 'TelemarketerController');
Route::resource('winback', 'WinBackController');
Route::resource('leadsource', 'LeadSourceController');
Route::resource('user', 'UserController');
Route::resource('config', 'ConfigController');
Route::resource('sellprice', 'SellPriceController');
Route::resource('rentalprice', 'RentalPriceController');
Route::resource('flexirent', 'FlexiRentController');
Route::get('/proposal/view-products/{id}', 'ProposalController@viewProducts');
Route::get('/proposal/get-product-rules/{productA}','ProposalController@getProductRules');
Route::resource('proposal', 'ProposalController');
Route::get('report{id}', array('uses' => 'HomeController@showReport'));
Route::get('login', array('uses' => 'HomeController@showLogin'));
Route::post('login', array('uses' => 'HomeController@doLogin'));
Route::get('logout', array('uses' => 'HomeController@doLogout'));
Route::get('profile', array('uses' => 'HomeController@getCurrentUser'));
Route::post('/form/create-pdf', array('uses'=> 'FormController@createPdf'));
Route::post('/form/save-data', array('uses'=> 'FormController@saveData'));
Route::post('/form/show-data', array('uses'=> 'FormController@showForms'));
Route::post('/form/delete-data', array('uses'=> 'FormController@deleteForm'));
Route::post('/form/download-forms', array('uses'=> 'FormController@downloadForms'));
Route::post('/form/get-schedule-goods', array('uses'=> 'FormController@getScheduleGoods'));