<?php

namespace app\admin\controller\cms;

use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;
use EasyAdmin\annotation\NodeAnotation;
use think\App;
use think\facade\Db;

/**
 * @ControllerAnnotation(title="cms_plateform")
 */
class Plateform extends AdminController
{

    use \app\admin\traits\Curd;

    public function __construct(App $app)
    {
        parent::__construct($app);

        $this->model = new \app\admin\model\CmsPlateform();
        
    }
     /**
     * @NodeAnotation(title="获取城市")
     */
    public function getCity()
    {
        if(request()->isAjax()){
            
            $city = Db::name('cms_city')->where('pid',input('pid'))->select()->toArray();
            
            return json(['code'=>1,'msg'=>'','data'=>$city]);
        }
    }
    
    
    
    /**
     * @NodeAnotation(title="添加")
     */
    public function add()
    {
        if ($this->request->isPost()) {
            $post = $this->request->post();
            $rule = [];
            $this->validate($post, $rule);
            try {
                $save2 = Db::name('cms_province')->where('name',$post['province'])->inc('num')->update();
                $save = $this->model->save($post);
            } catch (\Exception $e) {
                $this->error('保存失败:'.$e->getMessage());
            }
            $save ? $this->success('保存成功') : $this->error('保存失败');
        }
        return $this->fetch();
    }

    /**
     * @NodeAnotation(title="编辑")
     */
    public function edit($id)
    {
        $row = $this->model->find($id);
        empty($row) && $this->error('数据不存在');
        if ($this->request->isPost()) {
            $post = $this->request->post();
            $rule = [];
            $this->validate($post, $rule);
            try {
                if($row['province'] != $post['province']){
                    $num = Db::name('cms_province')->where('name',$row['province'])->value('num');
                    if($num > 0){
                        $save3 = Db::name('cms_province')->where('name',$row['province'])->dec('num')->update();
                    }
                    $save2 = Db::name('cms_province')->where('name',$post['province'])->inc('num')->update();
                }
                $save = $row->save($post);
            } catch (\Exception $e) {
                $this->error('保存失败');
            }
            $save ? $this->success('保存成功') : $this->error('保存失败');
        }
        $this->assign('row', $row);
        return $this->fetch();
    }

}