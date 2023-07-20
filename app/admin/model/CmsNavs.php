<?php

namespace app\admin\model;

use app\common\model\TimeModel;
use think\facade\Cache;
class CmsNavs extends TimeModel
{

    protected $name = "cms_navs";

    protected $deleteTime = "delete_time";

    
    public function listCacheData()
    {
        
        
        $cach_name = "Cshuo_navs_cache";
        
        $res = Cache::get($cach_name);
        
        if(empty($res)) {
            $data = $this->order('sort desc')->select()->toArray();
            $res['list'] = $data;
            Cache::set($cach_name,$res,get_config('cache_time'));
        }

        return $res;
    }
    
   

}