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
			$c->company 		= serialize($input['company']);
			$c->leadsource 		= isset($input['leadsource'])?$input['leadsource']:NULL;
			$c->month 			= isset($input['month'])?$input['month']:NULL;
			//$c->plan_fees 		= $input['plan_fees'];
			$c->sites	 		= serialize($input['sites']);
			$c->products 		= serialize($input['products']);
			$c->salesrep 		= isset($input['salesrep'])?$input['salesrep']:NULL;
			$c->telemarketer 	= isset($input['telemarketer'])?$input['telemarketer']:NULL;
			$c->term 			= isset($input['term'])?$input['term']:NULL;
			$c->winback 		= isset($input['winback'])?$input['winback']:NULL;
			$c->purchaseopt		= $input['purchaseopt'];                        
			$c->hardware_discount		= $input['hardware_discount'];
			$c->residual		= isset($input['residual'])?$input['residual']:NULL;
			$c->situation		= isset($input['situation'])?$input['situation']:NULL;
			$c->problems		= isset($input['problems'])?$input['problems']:NULL;
			$c->implication		= isset($input['implication'])?$input['implication']:NULL;
			$c->needspayoff		= isset($input['needspayoff'])?$input['needspayoff']:NULL;
			
			// service
			$c->csit1		= isset($input['csit1'])?$input['csit1']:NULL;
			$c->csit2		= isset($input['csit2'])?$input['csit2']:NULL;
			$c->csit3		= isset($input['csit3'])?$input['csit3']:NULL;
			$c->csit4		= isset($input['csit4'])?$input['csit4']:NULL;
			$c->csit5		= isset($input['csit5'])?$input['csit5']:NULL;
			$c->csit6		= isset($input['csit6'])?$input['csit6']:NULL;
			$c->csit7		= isset($input['csit7'])?$input['csit7']:NULL;
			$c->csit8		= isset($input['csit8'])?$input['csit8']:NULL;			
			
			$c->prop1		= isset($input['prop1'])?$input['prop1']:NULL;
			$c->prop2		= isset($input['prop2'])?$input['prop2']:NULL;
			$c->prop3		= isset($input['prop3'])?$input['prop3']:NULL;
			$c->prop4		= isset($input['prop4'])?$input['prop4']:NULL;
			$c->prop5		= isset($input['prop5'])?$input['prop5']:NULL;
			$c->prop6		= isset($input['prop6'])?$input['prop6']:NULL;
			$c->prop7		= isset($input['prop7'])?$input['prop7']:NULL;
			$c->prop8		= isset($input['prop8'])?$input['prop8']:NULL;
			
			$c->mdis1		= isset($input['mdis1'])?$input['mdis1']:NULL;
			$c->mdis2		= isset($input['mdis2'])?$input['mdis2']:NULL;
			$c->mdis3		= isset($input['mdis3'])?$input['mdis3']:NULL;
			$c->mdis4		= isset($input['mdis4'])?$input['mdis4']:NULL;
			$c->mdis5		= isset($input['mdis5'])?$input['mdis5']:NULL;
			// service

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
		$prop['company'] = unserialize($prop['company']);
		
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
			$c->company 		= serialize($input['company']);
			$c->leadsource 		= isset($input['leadsource'])?$input['leadsource']:NULL;
			$c->month 			= isset($input['month'])?$input['month']:NULL;
			//$c->plan_fees 		= $input['plan_fees'];
			$c->sites	 		= serialize($input['sites']);
			$c->products 		= serialize($input['products']);
			$c->salesrep 		= isset($input['salesrep'])?$input['salesrep']:NULL;
			$c->telemarketer 	= isset($input['telemarketer'])?$input['telemarketer']:NULL;
			$c->term 			= isset($input['term'])?$input['term']:NULL;
			$c->winback 		= $input['winback'];
			$c->purchaseopt		= $input['purchaseopt'];                        
			$c->hardware_discount		= $input['hardware_discount'];
			$c->residual		= isset($input['residual'])?$input['residual']:NULL;
			$c->situation		= isset($input['situation'])?$input['situation']:NULL;
			$c->problems		= isset($input['problems'])?$input['problems']:NULL;
			$c->implication		= isset($input['implication'])?$input['implication']:NULL;
			$c->needspayoff		= isset($input['needspayoff'])?$input['needspayoff']:NULL;
			
			// service
			$c->csit1		= isset($input['csit1'])?$input['csit1']:NULL;
			$c->csit2		= isset($input['csit2'])?$input['csit2']:NULL;
			$c->csit3		= isset($input['csit3'])?$input['csit3']:NULL;
			$c->csit4		= isset($input['csit4'])?$input['csit4']:NULL;
			$c->csit5		= isset($input['csit5'])?$input['csit5']:NULL;
			$c->csit6		= isset($input['csit6'])?$input['csit6']:NULL;
			$c->csit7		= isset($input['csit7'])?$input['csit7']:NULL;
			$c->csit8		= isset($input['csit8'])?$input['csit8']:NULL;			
			
			$c->prop1		= isset($input['prop1'])?$input['prop1']:NULL;
			$c->prop2		= isset($input['prop2'])?$input['prop2']:NULL;
			$c->prop3		= isset($input['prop3'])?$input['prop3']:NULL;
			$c->prop4		= isset($input['prop4'])?$input['prop4']:NULL;
			$c->prop5		= isset($input['prop5'])?$input['prop5']:NULL;
			$c->prop6		= isset($input['prop6'])?$input['prop6']:NULL;
			$c->prop7		= isset($input['prop7'])?$input['prop7']:NULL;
			$c->prop8		= isset($input['prop8'])?$input['prop8']:NULL;			
			
			$c->mdis1		= isset($input['mdis1'])?$input['mdis1']:NULL;
			$c->mdis2		= isset($input['mdis2'])?$input['mdis2']:NULL;
			$c->mdis3		= isset($input['mdis3'])?$input['mdis3']:NULL;
			$c->mdis4		= isset($input['mdis4'])?$input['mdis4']:NULL;
			$c->mdis5		= isset($input['mdis5'])?$input['mdis5']:NULL;
			// service

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
        /**
         * 
         * @param int $id
         */
  
        public function viewProducts($id)
        {       
            //    $id = $_REQUEST["id"];
                $prop = Proposal::find($id);
		
		$prop['products'] = unserialize($prop['products']);
                $products = array();
                $proposalDetails = array();
                $i = 0;
                foreach($prop["products"] as $p) {
                    $cat = Category::find($p["cat"]);
                    $productObj = Product::find($p["id"]);
                    $products[$i]["category"] = $cat["name"];
                    $products[$i]["name"] = $productObj["code"];
                    $products[$i]["qty"] = $p["qty"];
                    $products[$i]["tax"] = $p["tax"];
                    $products[$i]["rrp_tax"] = $p["rrp_tax"];
                    $products[$i]["sell_price"] = $p["sell_price"];
                    $products[$i]["description"]= substr($p["desc"], 0, 150).".....";
                    $i++;
                }
                $salesRep = SalesRep :: find($prop['salesrep']);
                $teleMarketer = Telemarketer :: find($prop["telemarketer"]);
                $leadSource = LeadSource :: find($prop["leadsource"]);
                
                
                $proposalDetails["salesrep"] = $salesRep["name"];
                $proposalDetails["telemarketer"] = $teleMarketer["name"];
                $proposalDetails["leadSource"] = $leadSource["name"];
                $proposalDetails["monthlyRental"] = $prop["monthly_rental"];
                $proposalDetails["weeklyRental"] = $prop["weekly_rental"];
                $proposalDetails["planFees"] = $prop["plan_fees"];
                $proposalDetails["hardwareDiscount"] = $prop["hardware_discount"];
                $proposalDetails["term"] = $prop["term"];
                $proposalDetails["month"] = $prop["month"];
                        
                
                
             
		  return Response::json(array("items" => $products, "details" => $proposalDetails));
        }
        
        public function getProductRules($productA)
        {   $products = array();
            $productRelation = ProductRelation::where('product_a','=', $productA)->get();
            
            foreach ($productRelation as $pr) {
             
                $r = ProductRelation::find($pr['rule'])->rules;  
                $item = array("rule" => $r['rule_name'],
                              "product" => $pr['product_b'],
                              "limit" => $pr["limit"],
                              "start_range" => $pr["start_range"],
                              "end_range" => $pr["end_range"]);
                $products[] =$item;
            }
           
            return Response::json($products);
        }

}
