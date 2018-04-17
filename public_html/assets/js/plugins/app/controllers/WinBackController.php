<?php

class WinBackController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$telemarketers = WinBack::all();
		return Response::json($telemarketers);

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

		try {

			$c = new WinBack();

			$c->name 			= $input['name'];
			$c->phone 			= $input['phone'];
			$c->email 			= $input['email'];

			$c->created_at 		= time();
			$c->updated_at 		= time();


			if($c->save())
				return Response::json(array('success' => true,'id'=>$c->id, "message"=>'WinBack saved successfully'));
			else
				throw new \Exception("Couldnot save the WinBack");
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
		$winback = WinBack::find($id);
		return Response::json($winback);

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
		$input = Input::all();

		try {

			$c =  WinBack::find($id);
			$c->name 			= $input['name'];
			$c->phone 			= $input['phone'];
			$c->email 			= $input['email'];

			$c->created_at 		= time();
			$c->updated_at 		= time();


			if($c->save())
				return Response::json(array('success' => true,'id'=>$c->id, "message"=>'WinBack saved successfully'));
			else
				throw new \Exception("Couldnot save the WinBack");
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
		if(WinBack::find($id)->delete())
			return Response::json(array('success' => true));
		 else
		 	return Response::json(array('success' => false));


	}




}
