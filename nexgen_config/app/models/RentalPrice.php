<?php

class RentalPrice extends Eloquent{


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'rental_price';

    public static function  findByKey($key){
        $config = DB::table('rental_price')->where('key', $key)->first()  ;
        return $config;
    }

}
