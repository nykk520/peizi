define(["jquery", "easy-admin"], function ($, ea, Vue) {


    var Controller = {
       index: function () {
             ea.listen(function (data) {
                return data;
            }, function (res) {
                ea.msg.success(res.msg, function () {
                    window.location.reload();
                })
            }, function (res) {
                ea.msg.error(res.msg, function () {
                     window.location.reload();
                });
            });
        },
        
    };
    return Controller;
});