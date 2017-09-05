layui.config({
    base: "js/"
}).use(['form', 'layer', 'jquery', 'laypage'], function () {
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery;

    $("body").on("click", ".downloadfile", function () {  //删除
        var _this = $(this);
        window.open("./projectFilesDownload.aspx?filetype=" + _this.attr("data-type") + "&fileid=" + _this.attr("data-id"));
    })

})