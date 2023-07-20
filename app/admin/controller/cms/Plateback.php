<?php

namespace app\admin\controller\cms;

use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;
use EasyAdmin\annotation\NodeAnotation;
use think\App;

/**
 * @ControllerAnnotation(title="cms_plateback")
 */
class Plateback extends AdminController
{

    use \app\admin\traits\Curd;
    
    public function __construct(App $app)
    {
        parent::__construct($app);

        $this->model = new \app\admin\model\CmsPlateback();
        
    }

    
}