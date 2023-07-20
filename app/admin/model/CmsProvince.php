<?php

namespace app\admin\model;

use app\common\model\TimeModel;

class CmsProvince extends TimeModel
{

    protected $name = "cms_province";

    protected $deleteTime = false;

    public function city()
    {
        return $this->hasMany('app\admin\model\CmsCity', 'pid', 'id');
    }
    

}