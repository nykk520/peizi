<?php

namespace app\admin\controller\cms;

use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;
use EasyAdmin\annotation\NodeAnotation;
use think\App;

/**
 * @ControllerAnnotation(title="cms_navs")
 */
class Navs extends AdminController
{

    use \app\admin\traits\Curd;
    protected $sort = [
        'sort' => 'desc',
    ];
    public function __construct(App $app)
    {
        parent::__construct($app);

        $this->model = new \app\admin\model\CmsNavs();
        
    }

    
}