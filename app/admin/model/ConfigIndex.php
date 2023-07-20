<?php

namespace app\admin\model;

use app\common\model\TimeModel;

class ConfigIndex extends TimeModel
{

    protected $name = "config_index";


     public function group()
    {
        return $this->belongsTo('app\admin\model\ConfigGroup', 'groupid', 'id');
    }
    
    public function type()
    {
        return $this->belongsTo('app\admin\model\ConfigAttr', 'type', 'id');
    }
    
    

}