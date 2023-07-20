define(["jquery", "easy-admin"], function ($, ea) {

    var init = {
        table_elem: '#currentTable',
        table_render_id: 'currentTableRenderId',
        index_url: 'config.index/index',
        add_url: 'config.index/add',
        edit_url: 'config.index/edit',
        delete_url: 'config.index/delete',
        export_url: 'config.index/export',
        modify_url: 'config.index/modify',
    };

    var Controller = {

        index: function () {
            ea.table.render({
                init: init,
                cols: [[
                    {type: 'checkbox'},
                    {field: 'id', title: 'id'},
                    {field: 'name', title: '名称'},
                    {field: 'title', title: '标题'},
                    {field: 'group.name', title: '分组'},
                    {field: 'type.name', title: '类型'},
                    {field: 'create_time', title: '创建时间',search:'range'},
                    {width: 250, title: '操作', templet: ea.table.tool},
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