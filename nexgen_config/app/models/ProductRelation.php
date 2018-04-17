<?php 

class ProductRelation extends  Eloquent{

    protected $table = 'product_relations';
    
    public function rules() 
    { 
      return $this->hasOne('Rule','id');
    }
    public function productB()
    {
        return $this->hasOne('Product','id');
    }
}

