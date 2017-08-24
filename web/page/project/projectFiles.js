layui.config({
    base: "js/"
}).use(['form', 'layer', 'jquery', 'laypage'], function () {
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery;

    $("body").on("click", ".downloadfile", function () {  //删除
        var _this = $(this);
        //var tmpstr = "{ 'filetype': " + _this.attr("data-type") + ", 'fileid': " + _this.attr("data-id") + "}";
        //var tmpstr2 = JSON.stringify(tmpstr);
        //$.ajax({
        //    type: "Post",
        //    url: "./projectFilesDownload.aspx/DownloadFile",
        //    //记得加双引号 T_T   
        //    data: JSON.stringify(tmpstr),
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    //success: function (data) {
        //    //    alert("key: haha ==> " + data.d["haha"] + "\n key: www ==> " + data.d["www"]);
        //    //},
        //    error: function (err) {
        //        alert(err + "err");
        //    }
        //}); 
        //layer.confirm('确定删除此用户？', { icon: 3, title: '提示信息' }, function (index) {
        //parent.parent.location.href = "./projectFilesDownload.aspx?filetype=" + _this.attr("data-type") + "&fileid=" + _this.attr("data-id");
        window.open("./projectFilesDownload.aspx?filetype=" + _this.attr("data-type") + "&fileid=" + _this.attr("data-id"));
        //    layer.close(index);
        //});
    })

    //激活或者禁用用户
    $("body").on("click", ".users_act", function () {
        var _this = $(this);
        window.location.href = "userManager.aspx?activeid=" + _this.attr("data-id");
    })

})