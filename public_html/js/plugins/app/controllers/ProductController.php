<?php

class ProductController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$products = Product::all();
		foreach ($products as $key => $value) {
			$product = $value;
			$product['linked_product'] = unserialize($value['linked_product']);
			$product['category']       = Category::find($value['cat_id']);

			$productsnew[] = $product;
		}

		return Response::json($productsnew);

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



	public function upload(){

		if ( !empty( $_FILES ) ) {

		    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
		    $uploadPath = storage_path() . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];

		    move_uploaded_file( $tempPath, $uploadPath );

		    $answer = array( 'answer' => 'File transfer completed' );
		    $json = json_encode( $answer );

		    echo $json;

		} else {

		    echo 'No files';
		}
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{	$input = Input::all();


		try{
			$p = new Product();

			$p->code 			= $input['code'];
			$p->cat_id  		= $input['cat_id'];
			$p->description     = $input['description'];
			//$p->image 			= $input['image'];
			$p->price  			= $input['price'];
			$p->tax 			= $input['tax'];
			$p->linked_product	= @serialize($input['linked_product']);
			$p->created_at 		= time();
			$p->updated_at 		= time();


				if($p->save())
					return Response::json(array('success' => true,'id'=>$p->id,'message'=>"Product saved successfully!"));
				else
					throw new \Exception("Couldnot save the product");

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
		$product = Product::find($id);
		$product['linked_product'] = unserialize($product['linked_product']);

		return Response::json($product);

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

		$p = Product::find($id);


		$p->code 			= $input['code'];
		$p->cat_id  		= $input['cat_id'];
		$p->description     = $input['description'];
		$p->price  			= $input['price'];
		$p->tax 			= $input['tax'];
		$p->linked_product	= serialize($input['linked_product']);
		$p->created_at 		= time();
		$p->updated_at 		= time();



		if($p->save())
			return Response::json(array('success' => true,'id'=>$p->id));
		else
			throw new \Exception("Couldnot save the product");
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{

	 if(Product::find($id)->delete())
		return Response::json(array('success' => true));
	 else
	 	return Response::json(array('success' => false));



	}


}
