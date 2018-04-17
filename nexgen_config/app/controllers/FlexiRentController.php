<?php

class FlexiRentController extends \BaseController {



	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$configs  = FlexiRent::all();
		$c = [];
		foreach ($configs as $key => $config) {
			$c[$config->key]	 = unserialize($config->value);
		}

		if(!isset($c['fr_egst']))
			$c['fr_egst'] = [];

		if(!isset($c['fr_promo_egst_6']))
			$c['fr_promo_egst_6'] = [];


		if(!isset($c['fr_promo_egst_3']))
			$c['fr_promo_egst_3'] = [];


		if(!isset($c['fr_fl_egst']))
			$c['fr_fl_egst'] = [];

		if(!isset($c['fr_ict']))
			$c['fr_ict'] = [];

		if(!isset($c['fr_tef']))
			$c['fr_tef'] = [];




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
				$fr = new FlexiRent();

				if($financerates = FlexiRent::findByKey($key)){
					$fr = FlexiRent::find($financerates->id);
				}

				$fr->key 			= $key;
				$fr->value 			= serialize($value);

				if($fr->save())
				   $saved = true;

			}



			if($saved)
				return Response::json(array('success' => true,'id'=>$fr->id, "message"=>'FlexiRent saved successfully'));
			else
				throw new \Exception("Couldnot save the FlexiRent");

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
