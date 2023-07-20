<?php


namespace app\index\controller;
use think\Request;
use think\facade\Db;
use think\facade\View;
use EasyAdmin\upload\Uploadfile;
class Ajax
{
    
    
    public function upload(Request $request)
    {
        if($request->isPost()){
            $data = $request->post();
            
            $files = request()->file();
            $ext = get_config("upload_allow_ext");
            $filesize = get_config("upload_size");
            try {
                validate(['file'=>'fileSize:'.$filesize.'|fileExt:'.$ext])->check($files);
            } catch (\think\exception\ValidateException $e) {
                return json(['code'=>'error','msg'=>$e->getMessage()]);
            } 
            
          
            try {
                $uploadConfig = sysconfig('upload');
                $upload = Uploadfile::instance()
                    ->setUploadType($uploadConfig['upload_type'])
                    ->setUploadConfig($uploadConfig)
                    ->setFile($files['file'])
                    ->save();
            } catch (\Exception $e) {
                return json(['code'=>'error','msg'=>$e->getMessage()]);
            }
            if ($upload['save'] == true) {
                return json(['code'=>'success','msg'=>$upload['msg'],'data'=>['url'=>$upload['url']]]);
            } else {
                return json(['code'=>'error','msg'=>$upload['msg']]);
            }
        }
        
    }
    
    
}