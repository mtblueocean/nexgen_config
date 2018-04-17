<?php

class BasicConfig extends Eloquent{


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'config';

    public static function  findByKey($key){
        $config = DB::table('config')->where('key', $key)->first()  ;
        return $config;
    }

}
