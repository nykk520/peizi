<?php

namespace app\index\middleware;

use think\App;
use think\facade\Request;
use think\facade\View;

/**
 * 手机电脑模板自适应
 * Class ViewInit
 * @package app\index\middleware
 */
class ViewInit
{

    public function handle(\app\Request $request, \Closure $next)
    {
        if(request()->isMobile()){
            $path = root_path() . 'template/mobile/';
        }else{
            $path = root_path() . 'template/pc/';
        }
        View::config(['view_path' => $path]);
        $request->viewPath = $path;
        
        return $next($request);
    }


}