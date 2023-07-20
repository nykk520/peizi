<?php

namespace app\admin\model;

use app\common\model\TimeModel;
use think\facade\Cache;
use think\facade\Db;
class CmsPlateform extends TimeModel
{

    protected $name = "cms_plateform";

    protected $deleteTime = "delete_time";

    
    public function listCacheData($lp)
    {
        $page = input('page') ? input('page') : 1;  
        $cach_name = md5('plateform'.$lp."page=".$page);
        
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
            if($lp['wd']){
                $where[] = ['title','like','%'.$lp['wd'].'%'];
            }
            if($lp['pstatus']){
                $where[] = ['pstatus','=',$lp['pstatus']];
            }
            if($lp['province']){
                $where[] = ['province','=',$lp['province']];
            }
            $field= '';
            if($lp['field']){
                $field = $lp['field'];
            }
            $where[] = ['status','=',1];
            $res = $this->listData($where,$order,$field,$lp['num'],$page);
            $res['list'] = $res['data'];
            if(!empty($lp['paging']) && $lp['paging'] == 'yes' ){
                $urls = Db::name("cms_navs")->where('model','plateform')->value('urls');
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
   
   
    public function listProvince()
    {
        $cach_name = "province_plateform_data";
        $res= Cache::get($cach_name);
        if(empty($res)){
            $province = Db::name('cms_province')->order('id asc')->select()->toArray();
            $res['list'] = $province;
            Cache::set($cach_name,$res,get_config('cache_time'));
        }
        return $res;
    }
    
    public function listPstatus()
    {
        $cach_name = "pstatus_plateform_data";
        $res= Cache::get($cach_name);
        if(empty($res)){
            
            $pstatus = [1=>'在业',2=>'异常',3=>'停业',4=>'失联'];
            $data = [];
            foreach ($pstatus as $key =>$v){
              $data[$key]['count'] = $this->where('pstatus',$key)->where('status',1)->count();
              $data[$key]['name'] = $v;
              $data[$key]['status'] = $key;
            }
            
            $res['list'] = $data;
            Cache::set($cach_name,$res,get_config('cache_time'));
        }
        return $res;
        
    }
}