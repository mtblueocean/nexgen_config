<?php

class CategoryController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$categories = Category::all();

		foreach ($categories as $key => $value) {
			$cat = $value;
			$cat['parent_cat']       = Category::find($value['parent']);
			$cat['finance']       = Category::find($value['finance']);
			$catnew[] = $cat;
		}


		return Response::json($catnew);
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

		$c = new Category();

		$c->name 			= $input['name'];
		$c->parent  		= @$input['parent']?$input['parent']:0;;
		$c->finance 		= @$input['finance']?$input['finance']:0;
		$c->typet 			= @$input['typet']?$input['typet']:0;

		$c->created_at 		= time();
		$c->updated_at 		= time();


		if($c->save())
			return Response::json(array('success' => true,'id'=>$c->id));
		else
			throw new \Exception("Couldnot save the category");
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id, $level=null)
	{
		$cat = "";
		
		if($level==null){
			$cat = Category::find($id);
		}else{
			$cat = DB::table('categories')
                    ->where('parent', '=', $level)->get();
		}
		
		return Response::json($cat);
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

		$c = Category::find($id);

		$c->name 			= $input['name'];
		$c->parent  		= @$input['parent']?$input['parent']:0;
		$c->finance 		= @$input['finance']?$input['finance']:0;
		$c->typet 			= @$input['typet']?$input['typet']:0;

		$c->updated_at 		= time();

		if($c->save())
			return Response::json(array('success' => true,'id'=>$c->id));
		else
			throw new \Exception("Couldnot save the category");
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{

	 if(Category::find($id)->delete())
		return Response::json(array('success' => true));
	 else
	 	return Response::json(array('success' => false));

	}
	
	/**
	 * Get the category level.
	 *
	 * @param  int  $level
	 * @return Response
	 */
	public function getCatByLevel($level=null)
	{
		$cat = DB::table('categories')
                    ->where('parent', '=', 1)->get();
					
		return Response::json($cat);
	}


}
