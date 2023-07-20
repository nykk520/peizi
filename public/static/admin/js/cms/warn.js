define(["jquery", "easy-admin"], function ($, ea) {

    var init = {
        table_elem: '#currentTable',
        table_render_id: 'currentTableRenderId',
        index_url: 'cms.warn/index',
        add_url: 'cms.warn/add',
        edit_url: 'cms.warn/edit',
        delete_url: 'cms.warn/delete',
        export_url: 'cms.warn/export',
        modify_url: 'cms.warn/modify',
    };

    var Controller = {

        index: function () {
            ea.table.render({
                init: init,
                toolbar: ['refresh',
                    [{
                        text: '添加',
                        url: init.add_url,
                        method: 'open',
                        auth: 'add',
                        class: 'layui-btn layui-btn-normal layui-btn-sm',
                        icon: 'fa fa-plus ',
                        extend: 'data-full="true"',
                    }],
                    'delete'],
                cols: [[
                    {type: 'checkbox'},
                    {field: 'id', title: 'id'},
                    {field: 'title', title: '标题'},
                    {field: 'status', title: '状态',selectList:{0:'禁用',1:'启用'}, templet: ea.table.switch},
                    {field: 'class', title: '方式',selectList:{1:'后台添加',2:'用户反馈'},templet:ea.table.list},
                    {field: 'isread', title: '反馈',selectList:{0:'未处理',1:'处理'},templet:ea.table.list},
                    {field:'logo',title:'logo',templet:ea.table.image},
                    {field: 'plateform', title: '平台'},
                    {field:'pub_time',title:"发布时间",search:"range"},
                    {field: 'create_time', title: '创建时间',search:"range"},
                    {
                        width: 150, 
                        title: '操作', 
                        templet: ea.table.tool,
                        operat: [
                            [{
                                text: '编辑',
                                url: init.edit_url,
                                method: 'open',
                                auth: 'edit',
                                class: 'layui-btn layui-btn-xs layui-btn-success',
                                extend: 'data-full="true"',
                            }],
                            'delete']
                    },
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