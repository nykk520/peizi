<?php

namespace app\common\taglib;
use think\template\TagLib;
class Cshuo extends TagLib
{
    
    /**
     * 定义标签列表
     */
    //  order - desc by - id
    protected $tags   =  [
        // 标签定义： attr 属性列表 close 是否闭合（0 或者1 默认1） alias 标签别名 level 嵌套层次
        'navs' => ['attr' =>'id,key'],
        'hot' => ['attr' => 'id,key'],
        'plateform' =>['attr'=>'id,key,num,wd,pstatus,province,paging,field'],
        'province' =>['attr'=>'id,key'],
        'pstatus' => ['attr'=>'id,key'],
        'news' => ['attr'=>'id,key,paging,field,num'],
        'warn' => ['attr'=>'id,key,paging,field,num']
    ];
    
    
    public function tagNavs($tag,$content)
    {
        $tag['id'] = isset($tag['id']) ? $tag['id'] : 'vo';
        $tag['key'] = isset($tag['key']) ? $tag['key'] : 'key';
        $parse = '<?php ';
        $parse .= ' $model = new \app\admin\model\CmsNavs;';
        $parse .= '$__LIST__ = $model->listCacheData();';
        $parse .= ' ?>';
        $parse .= '{volist name="__LIST__[\'list\']" id="'.$tag['id'].'" key="'.$tag['key'].'"';
        $parse .= '}';
        if(!empty($tag['offset'])){
            $parse .= ' offset="'.$tag['offset'].'"';
        }
        if(!empty($tag['length'])){
            $parse .= ' length="'.$tag['length'].'"';
        }
        
        $parse .= $content;
        $parse .= '{/volist}';

        return $parse;
    }
    
    
    
    
    
    public function tagHot($tag,$content)
    {
        $tag['id'] = isset($tag['id']) ? $tag['id'] : 'vo';
        $tag['key'] = isset($tag['key']) ? $tag['key'] : 'key';
        $parse = '<?php ';
        $parse .= '$__LIST__ = explode("|",get_config("web_hot_search"));';
        $parse .= ' ?>';
        $parse .= '{volist name="__LIST__" id="'.$tag['id'].'" key="'.$tag['key'].'"';
        $parse .= '}';
        if(!empty($tag['offset'])){
            $parse .= ' offset="'.$tag['offset'].'"';
        }
        if(!empty($tag['length'])){
            $parse .= ' length="'.$tag['length'].'"';
        }
        
        $parse .= $content;
        $parse .= '{/volist}';

        return $parse;
    }
    
    
 
//   id,key,num,wd,pstatus,province,paging
    public function tagPlateform($tag,$content)
    {
     
        $tag['num'] = isset($tag['num']) ? $tag['num'] : '10';
        $tag['id'] = isset($tag['id']) ? $tag['id'] : 'vo';
        $tag['key'] = isset($tag['key']) ? $tag['key'] : 'key';
        $tag['wd'] = isset($tag['wd']) ? $tag['wd'] : '';
        $tag['pstatus'] = isset($tag['pstatus']) ? $tag['pstatus'] : '';
        $tag['province'] = isset($tag['province']) ? $tag['province'] : '';
        $tag['paging'] = isset($tag['paging']) ? $tag['paging'] : 'no';
        $tag['field'] = isset($tag['field']) ? $tag['field'] : '';
        $parse = '<?php ';
        $parse .= '$__TAG__ = \'' . json_encode($tag) . '\';';
        $parse .= ' $model = new \app\admin\model\CmsPlateform;';
        $parse .= '$__LIST__ = $model->listCacheData($__TAG__);';
        //  ["total"]=> int(2110) ["per_page"]=> int(7) ["current_page"]=> int(1) ["last_page"]=> int(302) 
         
        if($tag['paging']== "yes"){
            $parse .= '$__PAGING__ =  xiaoyu_page_param($__LIST__[\'total\'],$__LIST__[\'per_page\'],$__LIST__[\'current_page\'],$__LIST__[\'page_url\'],3);';
        }
        $parse .= ' ?>';
        $parse .= '{volist name="__LIST__[\'list\']" id="'.$tag['id'].'" key="'.$tag['key'].'"';
        if(!empty($tag['offset'])){
            $parse .= ' offset="'.$tag['offset'].'"';
        }
        if(!empty($tag['length'])){
            $parse .= ' length="'.$tag['length'].'"';
        }
        if(!empty($tag['mod'])){
            $parse .= ' mod="'.$tag['mod'].'"';
        }
        if(!empty($tag['empty'])){
            $parse .= ' empty="'.$tag['empty'].'"';
        }
        $parse .= '}';
        $parse .= $content;
        $parse .= '{/volist}';

        return $parse;
    }
    
     
    //根据省份获取平台数据

    public function tagProvince($tag,$content)
    {
        $tag['id'] = isset($tag['id']) ? $tag['id'] : 'vo';
        $tag['key'] = isset($tag['key']) ? $tag['key'] : 'key';
        $parse = '<?php ';
        $parse .= ' $model = new \app\admin\model\CmsPlateform;';
        $parse .= '$__LIST__ = $model->listProvince();';
        $parse .= ' ?>';
        $parse .= '{volist name="__LIST__[\'list\']" id="'.$tag['id'].'" key="'.$tag['key'].'"';
        if(!empty($tag['offset'])){
            $parse .= ' offset="'.$tag['offset'].'"';
        }
        if(!empty($tag['length'])){
            $parse .= ' length="'.$tag['length'].'"';
        }
        if(!empty($tag['mod'])){
            $parse .= ' mod="'.$tag['mod'].'"';
        }
        if(!empty($tag['empty'])){
            $parse .= ' empty="'.$tag['empty'].'"';
        }
        $parse .= '}';
        $parse .= $content;
        $parse .= '{/volist}';

        return $parse;
    }
    
    public function tagNews($tag,$content)
    {
     
        $tag['num'] = isset($tag['num']) ? $tag['num'] : '10';
        $tag['id'] = isset($tag['id']) ? $tag['id'] : 'vo';
        $tag['key'] = isset($tag['key']) ? $tag['key'] : 'key';
     
        $tag['paging'] = isset($tag['paging']) ? $tag['paging'] : 'no';
        $tag['field'] = isset($tag['field']) ? $tag['field'] : '';
        $parse = '<?php ';
        $parse .= '$__TAG__ = \'' . json_encode($tag) . '\';';
        $parse .= ' $model = new \app\admin\model\CmsNews;';
        $parse .= '$__LIST__ = $model->listCacheData($__TAG__);';
        //  ["total"]=> int(2110) ["per_page"]=> int(7) ["current_page"]=> int(1) ["last_page"]=> int(302) 
         
        if($tag['paging']== "yes"){
            $parse .= '$__PAGING__ =  xiaoyu_page_param($__LIST__[\'total\'],$__LIST__[\'per_page\'],$__LIST__[\'current_page\'],$__LIST__[\'page_url\'],3);';
        }
        $parse .= ' ?>';
        $parse .= '{volist name="__LIST__[\'list\']" id="'.$tag['id'].'" key="'.$tag['key'].'"';
        if(!empty($tag['offset'])){
            $parse .= ' offset="'.$tag['offset'].'"';
        }
        if(!empty($tag['length'])){
            $parse .= ' length="'.$tag['length'].'"';
        }
        if(!empty($tag['mod'])){
            $parse .= ' mod="'.$tag['mod'].'"';
        }
        if(!empty($tag['empty'])){
            $parse .= ' empty="'.$tag['empty'].'"';
        }
        $parse .= '}';
        $parse .= $content;
        $parse .= '{/volist}';

        return $parse;
    }
    
    public function tagWarn($tag,$content)
    {
     
        $tag['num'] = isset($tag['num']) ? $tag['num'] : '10';
        $tag['id'] = isset($tag['id']) ? $tag['id'] : 'vo';
        $tag['key'] = isset($tag['key']) ? $tag['key'] : 'key';
     
        $tag['paging'] = isset($tag['paging']) ? $tag['paging'] : 'no';
        $tag['field'] = isset($tag['field']) ? $tag['field'] : '';
        $parse = '<?php ';
        $parse .= '$__TAG__ = \'' . json_encode($tag) . '\';';
        $parse .= ' $model = new \app\admin\model\CmsWarn;';
        $parse .= '$__LIST__ = $model->listCacheData($__TAG__);';
        //  ["total"]=> int(2110) ["per_page"]=> int(7) ["current_page"]=> int(1) ["last_page"]=> int(302) 
         
        if($tag['paging']== "yes"){
            $parse .= '$__PAGING__ =  xiaoyu_page_param($__LIST__[\'total\'],$__LIST__[\'per_page\'],$__LIST__[\'current_page\'],$__LIST__[\'page_url\'],3);';
        }
        $parse .= ' ?>';
        $parse .= '{volist name="__LIST__[\'list\']" id="'.$tag['id'].'" key="'.$tag['key'].'"';
        if(!empty($tag['offset'])){
            $parse .= ' offset="'.$tag['offset'].'"';
        }
        if(!empty($tag['length'])){
            $parse .= ' length="'.$tag['length'].'"';
        }
        if(!empty($tag['mod'])){
            $parse .= ' mod="'.$tag['mod'].'"';
        }
        if(!empty($tag['empty'])){
            $parse .= ' empty="'.$tag['empty'].'"';
        }
        $parse .= '}';
        $parse .= $content;
        $parse .= '{/volist}';

        return $parse;
    }
     public function tagPstatus($tag,$content)
    {
        $tag['id'] = isset($tag['id']) ? $tag['id'] : 'vo';
        $tag['key'] = isset($tag['key']) ? $tag['key'] : 'key';
        $parse = '<?php ';
        $parse .= ' $model = new \app\admin\model\CmsPlateform;';
        $parse .= '$__LIST__ = $model->listPstatus();';
        $parse .= ' ?>';
        $parse .= '{volist name="__LIST__[\'list\']" id="'.$tag['id'].'" key="'.$tag['key'].'"';
        if(!empty($tag['offset'])){
            $parse .= ' offset="'.$tag['offset'].'"';
        }
        if(!empty($tag['length'])){
            $parse .= ' length="'.$tag['length'].'"';
        }
        if(!empty($tag['mod'])){
            $parse .= ' mod="'.$tag['mod'].'"';
        }
        if(!empty($tag['empty'])){
            $parse .= ' empty="'.$tag['empty'].'"';
        }
        $parse .= '}';
        $parse .= $content;
        $parse .= '{/volist}';

        return $parse;
    }
   
}
    
    