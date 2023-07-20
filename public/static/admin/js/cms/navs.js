define(["jquery", "easy-admin"], function ($, ea) {

    var init = {
        table_elem: '#currentTable',
        table_render_id: 'currentTableRenderId',
        index_url: 'cms.navs/index',
        add_url: 'cms.navs/add',
        edit_url: 'cms.navs/edit',
        delete_url: 'cms.navs/delete',
        export_url: 'cms.navs/export',
        modify_url: 'cms.navs/modify',
    };

    var Controller = {

        index: function () {
            ea.table.render({
                init: init,
                
                cols: [[
                    {field: 'title', title: '标题',minWidth:100},
                    {field: 'name', title: '名称',minWidth:100},
                    {field: 'wap_name', title: '手机导航名称',minWidth:100},
                    {field: 'urls', title: 'url地址',minWidth:100},
                    {field: 'status', title: '状态',selectList:{0:"禁用",1:"启用"}, templet: ea.table.switch,minWidth:100},
                    {field: 'sort', title: '排序', edit:'text',minWidth:80},
                    {field: 'create_time', title: '创建时间',minWidth:100},
                    {width: 250, title: '操作', templet: ea.table.tool,minWidth:100,search:"range"},
                ]],
            });

            ea.listen();
        },
        add: function () {
            ea.listen();
        },
        edit: function () {
            ea.listen();
        },
    };
    return Controller;
});