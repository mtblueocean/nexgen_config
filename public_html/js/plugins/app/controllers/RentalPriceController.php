<?php

class RentalPriceController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$configs  = RentalPrice::all();
		foreach ($configs as $key => $config) {
			$c[$config->key]	 = unserialize($config->value);
		}

		return Response::json($c);
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{

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
			$saved = false;
			foreach ($input as $key => $value) {
				$fr = new RentalPrice();

				if($financerates = RentalPrice::findByKey($key)){
					$fr = RentalPrice::find($financerates->id);
				}

				$fr->key 			= $key;
				$fr->value 			= serialize($value);

				if($fr->save())
				   $saved = true;

			}



			if($saved)
				return Response::json(array('success' => true,'id'=>$fr->id, "message"=>'Config saved successfully'));
			else
				throw new \Exception("Couldnot save the config");

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
		//
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
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}


}
