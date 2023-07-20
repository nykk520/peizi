define(["jquery", "easy-admin"], function ($, ea) {

    var init = {
        table_elem: '#currentTable',
        table_render_id: 'currentTableRenderId',
        index_url: 'cms.plateform/index',
        add_url: 'cms.plateform/add',
        edit_url: 'cms.plateform/edit',
        delete_url: 'cms.plateform/delete',
        export_url: 'cms.plateform/export',
        modify_url: 'cms.plateform/modify',
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
                    {field: 'id', title: 'id',minWidth:80,search:false},
                    {field: 'title', title: '平台名称',minWidth:100},
                    {field: 'status', title: '状态', selectList:{0:"禁用",1:"启用"},templet: ea.table.switch,minWidth:100},
                    {field: 'pstatus', title: '平台状态', selectList:{1:"在业",2:"异常",3:"停业",4:"异常"},templet:ea.table.list,minWidth:100},
                    {field: 'logo', title: '平台logo', templet: ea.table.image,minWidth:100,search:false},
                    {field: 'website', title: '网址',minWidth:180,search:false},
                    {field: 'other_website', title: '其他网址',minWidth:100,search:false},
                    {field: 'main_business', title: '主营业务',minWidth:100},
                    {field: 'province', title: '省',minWidth:100},
                    {field: 'city', title: '市',minWidth:100},
                    {field: 'office_address', title: '办公地址',minWidth:150},
                    {field: 'launch_date', title: '上线时间',minWidth:150,search:false},
                    {field: 'customer_service', title: '客服热线',minWidth:150},
                    {field: 'company_name', title: '公司名称',minWidth:150},
                    {field: 'create_time', title: '创建时间',minWidth:150,search:"range"},
                    {
                        width: 130, 
                        title: '操作', 
                        fixed:'right',
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
                done: function (res, curr, count) {
                    $(".layui-table-main tr").each(function (index ,val) {
                        $($(".layui-table-fixed .layui-table-body tbody tr")[index]).height($(val).height());
                    });
                }
            });
            
            ea.listen();
        },
        add: function () {
            
            var form = layui.form;
            var pid = 0;
            form.on('select(province)', function(data){
                pid = $(data.elem).find("option:selected").attr('data-id');
                console.log(pid)
                ea.request.get(
                    {
                        url: "getCity/pid/"+pid,
                        
                    }, function (res) {
                        var list = res.data;
                        console.log(list);
                        var html = '';
                        list.forEach(val => {
                            html += '<option value="' + val["name"] + '">' + val["name"] + '</option>'
                        });
                        $("#city").html(html);
                        form.render();
                    }
                );
                
            });
            ea.listen();
        },
        edit: function () {
            var form = layui.form;
            var pid = 0;
            form.on('select(province)', function(data){
                pid = $(data.elem).find("option:selected").attr('data-id');
                console.log(pid)
                ea.request.get(
                    {
                        url: "getCity/pid/"+pid,
                        
                    }, function (res) {
                        var list = res.data;
                        console.log(list);
                        var html = '';
                        list.forEach(val => {
                            html += '<option value="' + val["name"] + '">' + val["name"] + '</option>'
                        });
                        $("#city").html(html);
                        form.render();
                    }
                );
                
            });
            ea.listen();
        },
    };
    return Controller;
});