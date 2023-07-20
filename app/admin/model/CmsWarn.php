<?php

namespace app\admin\model;

use app\common\model\TimeModel;
use think\facade\Cache;
use think\facade\Db;
class CmsWarn extends TimeModel
{

    protected $name = "cms_warn";

    protected $deleteTime = "delete_time";

    
     public function listCacheData($lp)
    {
        $page = input('page') ? input('page') : 1;  
        $cach_name = md5('warn'.$lp."page=".$page);
        
        $res = Cache::get($cach_name);
        
        if(empty($res)) {
            $lp = json_decode($lp,true);
            if($lp['paging'] == 'no'){
                $page = 1;
            }else{
                $page = $page;
            }
            $order = 'id desc';
            $where = [];
            $field= '';
            if($lp['field']){
                $field = $lp['field'];
            }
            $where[] = ['status','=',1];
            $res = $this->listData($where,$order,$field,$lp['num'],$page);
            $res['list'] = $res['data'];
            if(!empty($lp['paging']) && $lp['paging'] == 'yes' ){
                $urls = Db::name("cms_navs")->where('model','warn')->value('urls');
                $res['page_url'] = '/'.$urls.'/page/PAGEINDEX';
               
             }
            Cache::set($cach_name,$res,get_config('cache_time'));
        }
        return $res;
    }
    public function listData($where,$order,$field='',$pagesize=10,$page=1)
    {
        if(!is_array($where)){
            $where = json_decode($where,true);
        }
        if($field){
            $res = $this->where($where)
                ->order($order)
                ->field($field)
                ->paginate(['list_rows'=>$pagesize,'page'=>$page])
                ->toArray();
        }else{
            $res = $this->where($where)
                ->order($order)
                ->paginate(['list_rows'=>$pagesize,'page'=>$page])
                ->toArray();
        }
        
        
        return $res;
    }

}