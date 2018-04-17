<?php

class SellPrice extends Eloquent{


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'sell_price';

    public static function  findByKey($key){
        $config = DB::table('sell_price')->where('key', $key)->first()  ;
        return $config;
    }

}
