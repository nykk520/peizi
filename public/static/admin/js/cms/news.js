define(["jquery", "easy-admin"], function ($, ea) {

    var init = {
        table_elem: '#currentTable',
        table_render_id: 'currentTableRenderId',
        index_url: 'cms.news/index',
        add_url: 'cms.news/add',
        edit_url: 'cms.news/edit',
        delete_url: 'cms.news/delete',
        export_url: 'cms.news/export',
        modify_url: 'cms.news/modify',
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
                    {field: 'description', title: '描述'},
                    {field: 'keywords', title: '关键词'},
                    {field: 'status', title: '状态',selectList:{0:"禁用",1:"启用"},templet: ea.table.switch},
                    {field: 'pic', title: '图片',templet:ea.table.image,search:false},
                    {field: 'author', title: '作者'},
                    {field: 'num', title: '阅读次数'},
                    {field: 'pub_time', title: '发布时间',search:"range"},
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