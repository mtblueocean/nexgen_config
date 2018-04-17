<?php

class Proposal extends Eloquent{


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'proposal';

    public static function  allJoined($key){
        $config = DB::table('flexi_rent')->where('key', $key)->first()  ;
        return $config;
    }

}
