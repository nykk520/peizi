define(["jquery", "easy-admin"], function ($, ea) {

    var init = {
        table_elem: '#currentTable',
        table_render_id: 'currentTableRenderId',
        index_url: 'cms.plateback/index',
        add_url: 'cms.plateback/add',
        edit_url: 'cms.plateback/edit',
        delete_url: 'cms.plateback/delete',
        export_url: 'cms.plateback/export',
        modify_url: 'cms.plateback/modify',
    };

    var Controller = {

        index: function () {
            ea.table.render({
                init: init,
                toolbar: ['refresh','delete'],
                cols: [[
                    {type: 'checkbox'},
                    {field: 'id', title: 'id',hide:true,seach:false},
                    {field: 'name', title: '名称'},
                    {field: 'website', title: '网址'},
                    {field: 'images', title: '图片', templet: ea.table.image},
                    {field: 'qq', title: 'qq'},
                    {field: 'status', title: '审核', selectList:{0:"未处理",1:"已处理"},templet:ea.table.list},
                    {field: 'create_time', title: '创建时间',search:"range"},
                    {width: 150, title: '操作', templet: ea.table.tool},
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