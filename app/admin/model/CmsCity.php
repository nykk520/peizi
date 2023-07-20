<?php

namespace app\admin\model;

use app\common\model\TimeModel;

class CmsCity extends TimeModel
{

    protected $name = "cms_city";

    protected $deleteTime = false;

    
    public function province()
    {
        return $this->belongsTo('app\admin\model\CmsProvince', 'pid', 'id');
    }

}