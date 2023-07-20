<?php

namespace app\admin\controller\cms;

use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;
use EasyAdmin\annotation\NodeAnotation;
use think\App;

/**
 * @ControllerAnnotation(title="cms_city")
 */
class City extends AdminController
{

    use \app\admin\traits\Curd;

    public function __construct(App $app)
    {
        parent::__construct($app);

        $this->model = new \app\admin\model\CmsCity();
        
    }

     /**
     * @NodeAnotation(title="列表")
     */
    public function index()
    {
        if ($this->request->isAjax()) {
            if (input('selectFields')) {
                return $this->selectList();
            }
            list($page, $limit, $where) = $this->buildTableParames();
           
            $list = $this->model
                ->withJoin('province', 'LEFT')
                ->where($where)
                ->paginate(['list_rows' => $limit, 'page' => $page])
                ->toArray();
            $data = [
                'code'  => 0,
                'msg'   => '',
                'count' => $list['total'],
                'data'  => $list['data'],
            ];
            return json($data);
        }
        return $this->fetch();
    }
}