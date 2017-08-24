layui.config({
    base : "js/"
}).use(['form', 'layer', 'jquery', 'laypage'], function () {
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery;

    //加载登陆历史页面
    var recData = '';
    $.get("./recinfoLoginget.aspx", function (data) {
        recData = data;
        //加载数据
        recinfoLoginLoad();
    })

    $(".search_btn").click(function () {
        var infoArray = [];

        if ($(".search_input").val() != '') {
            var index = layer.msg('查询中，请稍候', { icon: 16, time: false, shade: 0.8 });
            setTimeout(function () {
                $.ajax({
                    url: "./recinfoLoginget.aspx",
                    type: "get",
                    dataType: "json",
                    success: function (data) {
                        recData = data;
                        for (var i = 0; i < recData.length; i++) {
                            var infoStr = recData[i];
                            var selectStr = $(".search_input").val();
                            function changeStr(data) {
                                var dataStr = '';
                                var showNum = data.split(eval("/" + selectStr + "/ig")).length - 1;
                                if (showNum > 1) {
                                    for (var j = 0; j < showNum; j++) {
                                        dataStr += data.split(eval("/" + selectStr + "/ig"))[j] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>";
                                    }
                                    dataStr += data.split(eval("/" + selectStr + "/ig"))[showNum];
                                    return dataStr;
                                } else {
                                    dataStr = data.split(eval("/" + selectStr + "/ig"))[0] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>" + data.split(eval("/" + selectStr + "/ig"))[1];
                                    return dataStr;
                                }
                            }
                            //
                            if (infoStr.NAME.indexOf(selectStr) > -1) {
                                infoStr["NAME"] = changeStr(infoStr.NAME);
                            }
                            //
                            if (infoStr.BYNAME.indexOf(selectStr) > -1) {
                                infoStr["BYNAME"] = changeStr(infoStr.BYNAME);
                            }
                            //
                            if (infoStr.DEPARTMENT.indexOf(selectStr) > -1) {
                                infoStr["DEPARTMENT"] = changeStr(infoStr.DEPARTMENT);
                            }
                            //
                            if (infoStr.IP.indexOf(selectStr) > -1) {
                                infoStr["IP"] = changeStr(infoStr.IP);
                            }
                            //
                            if (infoStr.LOGINTIME.indexOf(selectStr) > -1) {
                                infoStr["LOGINTIME"] = changeStr(infoStr.LOGINTIME);
                            }

                            if (infoStr.NAME.indexOf(selectStr) > -1 || infoStr.BYNAME.indexOf(selectStr) > -1 || infoStr.DEPARTMENT.indexOf(selectStr) > -1 || infoStr.IP.indexOf(selectStr) > -1 || infoStr.LOGINTIME.indexOf(selectStr) > -1) {
                                infoArray.push(infoStr);
                            }
                        }
                        recData = infoArray;
                        recinfoLoginLoad();
                    }
                })

                layer.close(index);
            }, 2000);
        } else {
            layer.msg("请输入需要查询的内容");
        }
    })

    function recinfoLoginLoad() {
        //渲染数据
        function renderDate(data, curr) {
            var dataHtml = '';
            currData = recData.concat().splice(curr * nums - nums, nums);
            if (currData.length != 0) {
                for (var i = 0; i < currData.length; i++) {
                    dataHtml += '<tr>'
                        + '<td>' + currData[i].NAME + '</td>'
                        + '<td>' + currData[i].BYNAME + '</td>'
                        + '<td>' + currData[i].DEPARTMENT + '</td>'
                        + '<td>' + currData[i].IP + '</td>'
                        + '<td>' + currData[i].LOGINTIME + '</td>'
                        + '</tr>';
                }
            } else {
                dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
            }
            return dataHtml;
        }

        //分页
        var nums = 15; //每页出现的数据量
        laypage({
            cont: "page",
            pages: Math.ceil(recData.length / nums),
            jump: function (obj) {
                $(".login_rec").html(renderDate(recData, obj.curr));
                //$('.users_list thead input[type="checkbox"]').prop("checked", false);
                form.render();
            }
        })
    }

})