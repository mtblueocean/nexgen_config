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
			$c->plan_fees 		= $input['plan_fees'];
			$c->products 		= serialize($input['products']);
			$c->salesrep 		= $input['salesrep'];
			$c->telemarketer 	= $input['telemarketer'];
			$c->term 			= $input['term'];
			$c->winback 		= $input['winback'];

			$montly_rental_total = 0;
			$weekly_rental_total = 0;

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
