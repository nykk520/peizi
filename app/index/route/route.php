<?php
// +----------------------------------------------------------------------
// | HkCms 路由
// +----------------------------------------------------------------------
// | Copyright (c) 2020-2021 http://www.hkcms.cn, All rights reserved.
// +----------------------------------------------------------------------
// | Author: 广州恒企教育科技有限公司 <admin@hkcms.cn>
// +----------------------------------------------------------------------

use think\facade\Route;
Route::pattern([
    'catdir' => '[A-Za-z0-9_\-]+', // 栏目的父级英文目录
    'catname' => '[A-Za-z0-9_\-]+', // 栏目英文目录名称
    'catid' => '\d+',  // 栏目ID
    'id' => '[A-Za-z0-9_\-]+',    // 文章ID或文章别名
    'model' => '[A-Za-z0-9_\-]+',  // 模型标识
    'year' => '\d+',  // 年、月、日
    'month' => '\d+',
    'day' => '\d+',
    'page' => '\d+',
    'lang' => '[A-Za-z_\-]+'
]);

Route::post('/feedback/plateform', 'Guestbook/index'); //分类/列表显示
Route::post('/feedback/warn', 'Guestbook/warn'); //分类/列表显示
Route::post('/ajax/upload','Ajax/upload');
Route::any('/:catname/:id','Index/detail')->ext('html'); //文章详情
Route::any('/:catname', 'Index/show'); //分类/列表显示

