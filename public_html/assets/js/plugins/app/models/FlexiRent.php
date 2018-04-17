<?php

class FlexiRent extends Eloquent{


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'flexi_rent';

    public static function  findByKey($key){
        $config = DB::table('flexi_rent')->where('key', $key)->first()  ;
        return $config;
    }

}
