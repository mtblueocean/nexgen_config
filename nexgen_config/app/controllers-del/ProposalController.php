<?php

class ProposalController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$proposals  = Proposal::all();

		foreach ($proposals as $key => $value) {
			$proposal = $value;
			$proposal['salesrep']     = SalesRep::find($value['salesrep']);
			$proposal['leadsource']   = LeadSource::find($value['leadsource']);
			$proposal['telemarketer'] = Telemarketer::find($value['telemarketer']);
			$proposal['winback']	  = LeadSource::find($value['winback']);
			$proposal['company']      = LeadSource::find($value['company']);
			$proposalsnew[] 		  = $proposal;
			# code...
		}

		return Response::json($proposalsnew);

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
			$c = new Proposal();

			$c->call_discount 	= $input['call_discount'];
			$c->company 		= $input['company'];
			$c->leadsource 		= $input['leadsource'];
			$c->month 			= $input['month'];
			//$c->plan_fees 		= $input['plan_fees'];
			$c->sites	 		= serialize($input['sites']);
			$c->products 		= serialize($input['products']);
			$c->salesrep 		= $input['salesrep'];
			$c->telemarketer 	= $input['telemarketer'];
			$c->term 			= $input['term'];
			$c->winback 		= $input['winback'];
			$c->purchaseopt		= $input['purchaseopt'];
			$c->hardware_discount		= $input['hardware_discount'];
			$c->residual		= $input['residual'];
			$c->situation		= $input['situation'];
			$c->problems		= $input['problems'];
			$c->implication		= $input['implication'];
			$c->needspayoff		= $input['needspayoff'];

			$montly_rental_total = 0;
			$weekly_rental_total = 0;
			
			/*
			$var = print_r($input['items'], true);
			
			$file = 'C:/wamp/www/lavarel/app/controllers/debug.txt';
			// Open the file to get existing content
			$current = file_get_contents($file);
			// Append a new person to the file
			$current .= $var;
			// Write the contents back to the file
			file_put_contents($file, $current);*/

			foreach ($input['products'] as $key => $value) {
				$montly_rental_total+= $value['monthly_rent'];
				$weekly_rental_total+= $value['weekly_rent'];
			}

			$c->monthly_rental   = $montly_rental_total;
			$c->weekly_rental    = $weekly_rental_total;

			if($c->save())
				return Response::json(array('success' => true,'id'=>$c->id, "message"=>'Proposal saved successfully'));
			else
				throw new \Exception("Proposal save the config");

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
		$prop = Proposal::find($id);
		$prop['sites'] = unserialize($prop['sites']);
		$prop['products'] = unserialize($prop['products']);
		return Response::json($prop);
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
		$c =  Proposal::find($id);

		try {
			//$c->updated_at 		= time();
			
			$c->call_discount 	= $input['call_discount'];
			$c->company 		= $input['company'];
			$c->leadsource 		= $input['leadsource'];
			$c->month 			= $input['month'];
			//$c->plan_fees 		= $input['plan_fees'];
			$c->sites	 		= serialize($input['sites']);
			$c->products 		= serialize($input['products']);
			$c->salesrep 		= $input['salesrep'];
			$c->telemarketer 	= $input['telemarketer'];
			$c->term 			= $input['term'];
			$c->winback 		= $input['winback'];
			$c->purchaseopt		= $input['purchaseopt'];
			$c->hardware_discount		= $input['hardware_discount'];
			$c->residual		= $input['residual'];
			$c->situation		= $input['situation'];
			$c->problems		= $input['problems'];
			$c->implication		= $input['implication'];
			$c->needspayoff		= $input['needspayoff'];

			$montly_rental_total = 0;
			$weekly_rental_total = 0;
			
			/*
			$var = print_r($input['items'], true);
			
			$file = 'C:/wamp/www/lavarel/app/controllers/debug.txt';
			// Open the file to get existing content
			$current = file_get_contents($file);
			// Append a new person to the file
			$current .= $var;
			// Write the contents back to the file
			file_put_contents($file, $current);*/

			foreach ($input['products'] as $key => $value) {
				$montly_rental_total+= $value['monthly_rent'];
				$weekly_rental_total+= $value['weekly_rent'];
			}

			$c->monthly_rental   = $montly_rental_total;
			$c->weekly_rental    = $weekly_rental_total;


			if($c->save())
				return Response::json(array('success' => true,'id'=>$c->id, "message"=>'Proposal saved successfully'));
			else
				throw new \Exception("Could not save the proposal");

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
		if(Proposal::find($id)->delete())
			return Response::json(array('success' => true));
		else
			return Response::json(array('error' => false));
	}


}
