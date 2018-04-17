<?php

class SalesRepController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$salesrep = SalesRep::all();
		return Response::json($salesrep);

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

	    try{
			$c = new SalesRep();

			$c->name 			= $input['name'];
			$c->phone 			= $input['phone'];
			$c->email 			= $input['email'];

			$c->created_at 		= time();
			$c->updated_at 		= time();


			if($c->save())
				return Response::json(array('success' => true,'id'=>$c->id,"message"=>'Salesrep saved successfully'));
			else
				throw new \Exception("Couldnot save the salesrep");

	   } catch (\Exception $e){
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
		$salesrep = SalesRep::find($id);
		return Response::json($salesrep);

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
		$c     = SalesRep::find($id);

	    try{

			$c->name 			= $input['name'];
			$c->phone 			= $input['phone'];
			$c->email 			= $input['email'];

			$c->updated_at 		= time();


			if($c->save())
				return Response::json(array('success' => true,'id'=>$c->id,"message"=>'Salesrep saved successfully'));
			else
				throw new \Exception("Couldnot save the salesrep");

	   } catch (\Exception $e){
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
		 if(SalesRep::find($id)->delete())
			return Response::json(array('success' => true));
		 else
		 	return Response::json(array('success' => false));

	}


}
