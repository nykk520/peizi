<?php


namespace app\index\controller;
use think\Request;
use think\facade\Db;
use think\facade\View;
use app\admin\model\CmsPlateback;
use app\admin\model\CmsWarn;
class Guestbook 
{
    
    
    public function index(Request $request)
    {
        if($request->isPost()){
            $data = $request->post();
            if(empty($data['applying_name']) || empty($data['applying_url']) || empty($data['applying_qq'])){
                return json(['code'=>'error','msg'=>'请填入必填项','data'=>[]]);
            }
            $images = '';
            if($data['applying_images']){
                $string = htmlspecialchars_decode($data['applying_images']);
                $array = json_decode($string,true);
                $array = array_column($array, 'url');
                
                foreach ($array as $key => $v){
                    $images .= $v;
                    if($key + 1 < count($array)){
                        $images .= '|';
                    }
                }
            }
            
            $temp = [
              'name' => $data['applying_name'],
              'website' => $data['applying_url'],
              'qq' => $data['applying_qq'],
              'images' => $images,
              'create_time' => time()
            ];
            
            $save = CmsPlateback::create($temp);
            if($save){
                 return json(['code'=>'success','msg'=>'反馈成功','data'=>[]]);
            }
        }
        
    }
     public function warn(Request $request)
    {
        if($request->isPost()){
            $data = $request->post();
            if(empty($data['website']) || empty($data['name']) || empty($data['reason']) || empty($data['description'])){
                return json(['code'=>'error','msg'=>'请填入必填项','data'=>[]]);
            }
            
            $temp = [
              'title' => $data['reason'],
              'content' => $data['description'],
              'website' => $data['website'],
              'plateform' => $data['name'],
              'isread' => 0,
              'status' => 0,
              'class' => 2,
              'create_time' => time()
            ];
            
            $save = CmsWarn::create($temp);
            if($save){
                 return json(['code'=>'success','msg'=>'反馈成功','data'=>[]]);
            }
        }
        
    }
    
}