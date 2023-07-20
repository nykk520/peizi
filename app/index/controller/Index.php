<?php


namespace app\index\controller;
use think\Request;
use think\facade\Db;
use think\facade\View;
class Index 
{
    
    
    public function index()
    {
        $plate = Db::name('cms_navs')->where('status',1)->cache('cache_navs_plateform',get_config('cache_time'))->value('urls');
        View::assign('plateform',$plate);
        View::assign('table',"");
        return View::fetch();
    }
    
    
    
    public function show(Request $request)
    {
        $cate = $request->param('catname','');
        $status = $request->param('status','');
        $province = $request->param('province','');
        $wd =  $request->param('wd','');
        
        $data = Db::name('cms_navs')->where('urls',$cate)->cache('cache_nav_'.$cate,get_config('cache_time'))->find();
        
        
        if($data['model'] == "add"){
            $plate = Db::name('cms_navs')->where('status',1)->cache('cache_navs_plateform',get_config('cache_time'))->value('urls');
            View::assign('plateform',$plate);
        }
        
        View::assign([
            'wd' => $wd,
            'status' => $status,
            'province' => $province,
            'data' => $data,
            'table' => $data['model'],
        ]);
        return View::fetch("/show/".$data['model']);
    }
    
    
    
    public function detail(Request $request)
    {
        
        $cate = $request->param('catname','');
        $id = input('id');
        $model = Db::name('cms_navs')->where('urls',$cate)->cache('cache_nav_model_'.$cate,get_config('cache_time'))->value("model");
        $data = Db::name('cms_'.$model)->where('status',1)->cache('cache_'.$model.'_id_'.$id,get_config('cache_time'))->find($id);
        if(isset($data['document_file'])){
            $data['document_file'] = explode('|',$data['document_file']);
            $data['images'] =  explode('|',$data['images']);
        }
        if($model == "news" || $model == 'warn'){
            Db::name('cms_'.$model)->where('id',$id)->inc('num',1)->update();
            $pre = Db::name('cms_'.$model)->where([['status','=',1],['id','<',$id]])->field('id,title')->cache('cache_pre_'.$model.'_id_'.$id,get_config('cache_time'))->find();
            $next = Db::name('cms_'.$model)->where([['status','=',1],['id','>',$id]])->field('id,title')->cache('cache_next_'.$model.'_id_'.$id,get_config('cache_time'))->find();
           
            View::assign([
               'next' => $next,
               'pre' => $pre
            ]);
        }
        View::assign('data',$data);
        View::assign('model',$cate);
        View::assign('table',$model);
        return View::fetch("/detail/".$model);
    }
}