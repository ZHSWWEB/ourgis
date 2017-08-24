layui.config({
    base: "js/"
}).use(['form', 'layer', 'jquery', 'laypage'], function () {
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery;

    //加载登陆历史页面
    var recData = '';
    $.get("./recinfoDataOperationget.aspx", function (data) {
        recData = data;
        //加载数据
        recinfoDataOperationLoad();
    })

    $(".search_btn").click(function () {
        var infoArray = [];

        if ($(".search_input").val() != '') {
            var index = layer.msg('查询中，请稍候', { icon: 16, time: false, shade: 0.8 });
            setTimeout(function () {
                $.ajax({
                    url: "./recinfoDataOperationget.aspx",
                    type: "get",
                    dataType: "json",
                    success: function (data) {
                        recData = data;
                        for (var i = 0; i < recData.length; i++) {
                            recData[i].OBJECTIDSTR = recData[i].OBJECTID.toString();
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
                            if (infoStr.BYNAME.indexOf(selectStr) > -1) {
                                infoStr["BYNAME"] = changeStr(infoStr.BYNAME);
                            }
                            //
                            if (infoStr.DEPARTMENT.indexOf(selectStr) > -1) {
                                infoStr["DEPARTMENT"] = changeStr(infoStr.DEPARTMENT);
                            }
                            //
                            if (infoStr.OPERATION.indexOf(selectStr) > -1) {
                                infoStr["OPERATION"] = changeStr(infoStr.OPERATION);
                            }
                            //
                            if (infoStr.LAYERTYPE.indexOf(selectStr) > -1) {
                                infoStr["LAYERTYPE"] = changeStr(infoStr.LAYERTYPE);
                            }
                            if (infoStr.OBJECTIDSTR.indexOf(selectStr) > -1) {
                                infoStr["OBJECTIDSTR"] = changeStr(infoStr.OBJECTIDSTR);
                            }
                            if (infoStr.LAYERNAME.indexOf(selectStr) > -1) {
                                infoStr["LAYERNAME"] = changeStr(infoStr.LAYERNAME);
                            }
                            if (infoStr.DETAIL.indexOf(selectStr) > -1) {
                                infoStr["DETAIL"] = changeStr(infoStr.DETAIL);
                            }
                            if (infoStr.DATETIME.indexOf(selectStr) > -1) {
                                infoStr["DATETIME"] = changeStr(infoStr.DATETIME);
                            }

                            if (infoStr.BYNAME.indexOf(selectStr) > -1 || infoStr.DEPARTMENT.indexOf(selectStr) > -1 || infoStr.OPERATION.indexOf(selectStr) > -1
                                || infoStr.LAYERTYPE.indexOf(selectStr) > -1 || infoStr.LAYERNAME.indexOf(selectStr) > -1 || infoStr.OBJECTIDSTR.indexOf(selectStr) > -1
                                || infoStr.DETAIL.indexOf(selectStr) > -1 || infoStr.DATETIME.indexOf(selectStr) > -1) {
                                infoArray.push(infoStr);
                            }
                        }
                        recData = infoArray;
                        recinfoDataOperationLoad();
                    }
                })

                layer.close(index);
            }, 2000);
        } else {
            layer.msg("请输入需要查询的内容");
        }
    })

    function recinfoDataOperationLoad() {
        //渲染数据
        function renderDate(data, curr) {
            var dataHtml = '';
            currData = recData.concat().splice(curr * nums - nums, nums);
            if (currData.length != 0) {
                for (var i = 0; i < currData.length; i++) {
                    if (currData[i].OBJECTIDSTR == null)
                        currData[i].OBJECTIDSTR = currData[i].OBJECTID.toString();
                    dataHtml += '<tr>'
                        + '<td>' + currData[i].BYNAME + '</td>'
                        + '<td>' + currData[i].DEPARTMENT + '</td>'
                        + '<td>' + currData[i].OPERATION + '</td>'
                        + '<td>' + currData[i].LAYERTYPE + '</td>'
                        + '<td>' + currData[i].OBJECTIDSTR + '</td>'
                        + '<td>' + currData[i].LAYERNAME + '</td>'
                        + '<td>' + currData[i].DETAIL + '</td>'
                        + '<td>' + currData[i].DATETIME + '</td>'
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
                $(".operation_rec").html(renderDate(recData, obj.curr));
                //$('.users_list thead input[type="checkbox"]').prop("checked", false);
                form.render();
            }
        })
    }

})