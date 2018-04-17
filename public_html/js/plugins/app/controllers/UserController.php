<?php

class UserController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$users = User::all();
		return Response::json($users);

	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$input = Input::all();


		if(User::userExists($input['username'])){
			return Response::json(array('success' => false,'message' => 'The username has already been taken!'));
		}


		try{

			$c = new User();

			$c->name 			= $input['name'];
			$c->username 		= $input['username'];
			$c->password 		= Hash::make($input['password']);
			$c->phone 			= $input['phone'];
			$c->email 			= $input['email'];
			$c->type 			= strtolower($input['type']);

			$c->created_at 		= time();
			$c->updated_at 		= time();


			if($c->save())
				return Response::json(array('success' => true,'id'=>$c->id ,"message"=>'User has been registered successfully!'));
			else
				throw new \Exception("Couldnot save the Users");
		} catch(\Exception $e){
			return Response::json(array('success' => false,'message'=>$e->getMessage()));
		}
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$user = User::find($id);
		return Response::json($user);
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{

		$c =  User::find($id);
		$input = Input::all();

		try{

			$c->name 			= $input['name'];
			$c->username 		= $input['username'];
			$c->phone 			= $input['phone'];
			$c->email 			= $input['email'];
			$c->type 			= strtolower($input['type']);

			$c->updated_at 		= time();

			if($c->save())
				return Response::json(array('success' => true,'id'=>$c->id));
			else
				throw new \Exception("Couldnot save the Users");

		} catch(\Exception $e){
			return Response::json(array('success' => false,'message'=>$e->getMessage()));
		}
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
	  if(User::find($id)->delete())
		return Response::json(array('success' => true));
	 else
	 	return Response::json(array('success' => false));


	}


}
