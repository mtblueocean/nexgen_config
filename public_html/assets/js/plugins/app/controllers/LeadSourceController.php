<?php

class LeadSourceController extends \BaseController {


	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$telemarketers = LeadSource::all();
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

		$c = new LeadSource();

		try {

			$c->name 			= $input['name'];
			$c->phone 			= $input['phone'];
			$c->email 			= $input['email'];

			$c->created_at 		= time();
			$c->updated_at 		= time();


			if($c->save())
				return Response::json(array('success' => true,'id'=>$c->id, "message"=>'LeadSource saved successfully'));
			else
				throw new \Exception("Couldnot save the LeadSource");
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
		$leadsource = LeadSource::find($id);
		return Response::json($leadsource);

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

			$c =  LeadSource::find($id);
			$c->name 			= $input['name'];
			$c->phone 			= $input['phone'];
			$c->email 			= $input['email'];

			$c->updated_at 		= time();


			if($c->save())
				return Response::json(array('success' => true,'id'=>$c->id, "message"=>'LeadSource saved successfully'));
			else
				throw new \Exception("Couldnot save the LeadSource");
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
		if(LeadSource::find($id)->delete())
			return Response::json(array('success' => true));
		 else
		 	return Response::json(array('success' => false));
	}





}
