<?php
use think\facade\Db;
//后台配置 单选框内容改成数组
function get_item($str)
{
    $array = explode("\n", str_replace("\r\n", "\n", trim($str,"\r\n")));
    $items = [];
    foreach ($array as $val) {
        // code..
        list($k, $v) = explode('|', $val);
        $items[$k] = $v;
    }
   return $items;
}

function get_province()
{
    return Db::name('cms_province')->select()->toArray();
}

function get_city($name)
{
    $pid = Db::name('cms_province')->where('name',$name)->value('id');
    return Db::name('cms_city')->where('pid',$pid)->select()->toArray();
}