<?php

class Rule extends Eloquent{


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'rules';
         
    public static function products() 
    { 
      return $this->belongsToMany('ProductsRelation');
    }


}
