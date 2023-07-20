<?php

namespace app\admin\controller\config;

use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;
use EasyAdmin\annotation\NodeAnotation;
use think\App;

/**
 * @ControllerAnnotation(title="配置显示")
 */
class Config extends AdminController
{

    use \app\admin\traits\Curd;

    public function __construct(App $app)
    {
        parent::__construct($app);

        $this->model = new \app\admin\model\ConfigIndex();
        
    }

    
    /**
     * @NodeAnotation(title="列表")
     */
    public function index()
    {
        if($this->request->isPost()){
            $data = $this->request->param();
            foreach ($data as $k=>$v){
                $this->model->where('name',$k)->cache('config_'.$k)->update(['value'=>$v]);
            }
            $this->success('保存成功');
        }
        $config_group = (new \app\admin\model\ConfigGroup())->select();
        $config_attr = (new \app\admin\model\ConfigAttr())->select();
        $list = $this->model->select();
        // $tpl_theme_list = glob(public_path().'template/*', GLOB_ONLYDIR);
        // foreach ($tpl_theme_list as $key => &$val) {
        //     $val = str_replace('\\', '/', $val);
        //     $val = preg_replace('/^(.*)\/([^\/]*)$/i', '${2}', $val);
        // }
        // $this->assign('template',$tpl_theme_list);
        $this->assign('group',$config_group);
        $this->assign('attr',$config_attr);
        $this->assign('list',$list);
        return $this->fetch();
    }
    
}