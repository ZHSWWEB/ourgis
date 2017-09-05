layui.config({
    base: "js/"
}).use(['form', 'layer', 'jquery', 'laypage', 'element'], function () {
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        element = layui.element();
    $ = layui.jquery;

    //加载页面数据
    var projectData = '';
    $.get("./projectList.aspx", function (data) {
        projectData = data;
        if (window.sessionStorage.getItem("addProject")) {//addProject页面上的提交按钮 lay-filter="addProject"
            var addProject = window.sessionStorage.getItem("addProject");
            projectData = JSON.parse(addProject).concat(projectData);
        }
        //执行加载数据的方法
        projectList();
    })

    window.projectDetail = function (obj) {
        var proid = obj.getAttribute("value");
        var infostr = '<iframe style="height:820px;width:100%" src="./projectInfo.aspx?proid=' + proid;
        var filestr = '<iframe style="height:820px;width:100%" src="./projectFiles.aspx?proid=' + proid;
        var index = layui.layer.tab({
            area: ['auto', 'auto'],
            tab: [{
                title: '项目基本信息',
                content: infostr + '"></iframe>'
            }, {
                title: '项目建议书',
                content: filestr + '&tabtype=1"></iframe>'
            }, {
                title: '可行性研究报告',
                content: filestr + '&tabtype=2"></iframe>'
            }, {
                title: '初步设计',
                content: filestr + '&tabtype=3"></iframe>'
            }, {
                title: '施工图及招标书',
                content: filestr + '&tabtype=4"></iframe>'
            }, {
                title: '计划变更报告',
                content: filestr + '&tabtype=5"></iframe>'
            }, {
                title: '计算书',
                content: filestr + '&tabtype=6"></iframe>'
            }]
        });
        $(window).resize(function () {
            layui.layer.full(index);
        })
        layui.layer.full(index);
    }

    //查询
    $(".search_btn").click(function () {
        var projectArray = [];

        if ($(".search_input").val() != '') {
            var index = layer.msg('查询中，请稍候', { icon: 16, time: false, shade: 0.8 });
            setTimeout(function () {
                $.ajax({
                    url: "./projectList.aspx",
                    type: "get",
                    dataType: "json",
                    success: function (data) {
                        if (window.sessionStorage.getItem("addProject")) {
                            var addProject = window.sessionStorage.getItem("addProject");
                            projectData = JSON.parse(addProject).concat(data);
                        } else {
                            projectData = data;
                        }
                        for (var i = 0; i < projectData.length; i++) {
                            var projectStr = projectData[i];
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
                            if (projectStr.NAME.indexOf(selectStr) > -1) {
                                projectStr["NAME"] = changeStr(projectStr.NAME);
                            }
                            //
                            //if (projectStr.SYSTEMID.indexOf(selectStr) > -1) {
                            //    projectStr["SYSTEMID"] = changeStr(projectStr.SYSTEMID);
                            //}
                            //
                            if (projectStr.DISTRICT.indexOf(selectStr) > -1) {
                                projectStr["DISTRICT"] = changeStr(projectStr.DISTRICT);
                            }
                            //
                            if (projectStr.SEAT_RIVER.indexOf(selectStr) > -1) {
                                projectStr["SEAT_RIVER"] = changeStr(projectStr.SEAT_RIVER);
                            }
                            //
                            if (projectStr.LOCATION.indexOf(selectStr) > -1) {
                                projectStr["LOCATION"] = changeStr(projectStr.LOCATION);
                            }
                            //
                            if (projectStr.EMPLOYER_DEPT.indexOf(selectStr) > -1) {
                                projectStr["EMPLOYER_DEPT"] = changeStr(projectStr.EMPLOYER_DEPT);
                            }
                            //
                            if (projectStr.CREATE_PERSON.indexOf(selectStr) > -1) {
                                projectStr["CREATE_PERSON"] = changeStr(projectStr.CREATE_PERSON);
                            }
                            //
                            if (projectStr.CREATE_DEPT.indexOf(selectStr) > -1) {
                                projectStr["CREATE_DEPT"] = changeStr(projectStr.CREATE_DEPT);
                            }
                            if (projectStr.CREATE_TIME.indexOf(selectStr) > -1) {
                                projectStr["CREATE_TIME"] = changeStr(projectStr.CREATE_TIME);
                            }
                            if (projectStr.PROPOSAL.indexOf(selectStr) > -1) {
                                projectStr["PROPOSAL"] = changeStr(projectStr.PROPOSAL);
                            }
                            if (projectStr.FEASIBILITY_STUDY.indexOf(selectStr) > -1) {
                                projectStr["FEASIBILITY_STUDY"] = changeStr(projectStr.FEASIBILITY_STUDY);
                            }
                            if (projectStr.PRELIMINARY_DESIGN.indexOf(selectStr) > -1) {
                                projectStr["PRELIMINARY_DESIGN"] = changeStr(projectStr.PRELIMINARY_DESIGN);
                            }
                            if (projectStr.DETAILED_DESIGN.indexOf(selectStr) > -1) {
                                projectStr["DETAILED_DESIGN"] = changeStr(projectStr.DETAILED_DESIGN);
                            }
                            if (projectStr.DESIGN_CHANGE.indexOf(selectStr) > -1) {
                                projectStr["DESIGN_CHANGE"] = changeStr(projectStr.DESIGN_CHANGE);
                            }
                            if (projectStr.CALCULATION.indexOf(selectStr) > -1) {
                                projectStr["CALCULATION"] = changeStr(projectStr.CALCULATION);
                            }
                            if (projectStr.SYSTEMNO.indexOf(selectStr) > -1) {
                                projectStr["SYSTEMNO"] = changeStr(projectStr.SYSTEMNO);
                            }

                            if (projectStr.NAME.indexOf(selectStr) > -1 /*|| projectStr.SYSTEMID.indexOf(selectStr) > -1 */|| projectStr.DISTRICT.indexOf(selectStr) > -1 || projectStr.SEAT_RIVER.indexOf(selectStr) > -1
                                || projectStr.LOCATION.indexOf(selectStr) > -1 || projectStr.EMPLOYER_DEPT.indexOf(selectStr) > -1 || projectStr.CREATE_PERSON.indexOf(selectStr) > -1
                                || projectStr.CREATE_DEPT.indexOf(selectStr) > -1 || projectStr.CREATE_TIME.indexOf(selectStr) > -1 || projectStr.PROPOSAL.indexOf(selectStr) > -1
                                || projectStr.FEASIBILITY_STUDY.indexOf(selectStr) > -1 || projectStr.PRELIMINARY_DESIGN.indexOf(selectStr) > -1 || projectStr.DETAILED_DESIGN.indexOf(selectStr) > -1
                                || projectStr.DESIGN_CHANGE.indexOf(selectStr) > -1 || projectStr.CALCULATION.indexOf(selectStr) > -1 || projectStr.SYSTEMNO.indexOf(selectStr) > -1)
                            {
                                projectArray.push(projectStr);
                            }
                        }
                        projectData = projectArray;
                        projectList(projectData);
                    }
                })

                layer.close(index);
            }, 2000);
        } else {
            layer.msg("请输入需要查询的内容");
        }
    })

    $(".projectAdd_btn").click(function () {
        var index = layui.layer.open({
            title: "添加项目",
            type: 2,
            content: "projectAdd.aspx",
			/*success : function(layero, index){
				layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
					tips: 3
				});
			}*/
            end: function () {
                location.reload();
            }
        })
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function () {
            layui.layer.full(index);
        })
        layui.layer.full(index);
    })

    function projectList() {
        //渲染数据
        function renderDate(data, curr) {
            var dataHtml = '';
            var activeStatus = '';
            currData = projectData.concat().splice(curr * nums - nums, nums);
            if (currData.length != 0) {
                for (var i = 0; i < currData.length; i++) {
                    var proposalstr, feastudystr, predesignstr, detdesignstr, deschangestr, calculationstr;
                    proposalstr = (currData[i].PROPOSAL == "有") ? ('<td style="color:orangered">' + currData[i].PROPOSAL + '</td>') : ('<td>' + currData[i].PROPOSAL + '</td>');
                    feastudystr = (currData[i].FEASIBILITY_STUDY == "有") ? ('<td style="color:orangered">' + currData[i].FEASIBILITY_STUDY + '</td>') : ('<td>' + currData[i].FEASIBILITY_STUDY + '</td>');
                    predesignstr = (currData[i].PRELIMINARY_DESIGN == "有") ? ('<td style="color:orangered">' + currData[i].PRELIMINARY_DESIGN + '</td>') : ('<td>' + currData[i].PRELIMINARY_DESIGN + '</td>');
                    detdesignstr = (currData[i].DETAILED_DESIGN == "有") ? ('<td style="color:orangered">' + currData[i].DETAILED_DESIGN + '</td>') : ('<td>' + currData[i].DETAILED_DESIGN + '</td>');
                    deschangestr = (currData[i].DESIGN_CHANGE == "有") ? ('<td style="color:orangered">' + currData[i].DESIGN_CHANGE + '</td>') : ('<td>' + currData[i].DESIGN_CHANGE + '</td>');
                    calculationstr = (currData[i].CALCULATION == "有") ? ('<td style="color:orangered">' + currData[i].CALCULATION + '</td>') : ('<td>' + currData[i].CALCULATION + '</td>');
                    dataHtml += '<tr>'
                        + '<td>' + currData[i].SYSTEMNO + '</td>'
                        + '<td><a href="javascript:;" value="' + currData[i].SYSTEMID + '" onclick="projectDetail(this);" style="color:darkred;font-style:italic;font-weight:bold">' + currData[i].NAME + '</a></td>'
                        + '<td>' + currData[i].DISTRICT + '</td>'
                        + '<td>' + currData[i].SEAT_RIVER + '</td>'
                        + '<td>' + currData[i].LOCATION + '</td>'
                        + '<td>' + currData[i].EMPLOYER_DEPT + '</td>'
                        + '<td>' + currData[i].CREATE_PERSON + '</td>'
                        + '<td>' + currData[i].CREATE_DEPT + '</td>'
                        + '<td>' + currData[i].CREATE_TIME + '</td>'
                        //+ '<td>' + currData[i].PROPOSAL + '</td>'
                        //+ '<td>' + currData[i].FEASIBILITY_STUDY + '</td>'
                        //+ '<td>' + currData[i].PRELIMINARY_DESIGN + '</td>'
                        //+ '<td>' + currData[i].DETAILED_DESIGN + '</td>'
                        //+ '<td>' + currData[i].DESIGN_CHANGE + '</td>'
                        //+ '<td>' + currData[i].CALCULATION + '</td>'
                        + proposalstr + feastudystr + predesignstr + detdesignstr + deschangestr + calculationstr
                        + '</tr>';
                }
            } else {
                dataHtml = '<tr><td colspan="15">暂无数据</td></tr>';
            }
            return dataHtml;
        }

        //分页
        var nums = 15; //每页出现的数据量
        laypage({
            cont: "page",
            pages: Math.ceil(projectData.length / nums),
            jump: function (obj) {
                $(".project_content").html(renderDate(projectData, obj.curr));
                //$('.users_list thead input[type="checkbox"]').prop("checked", false);
                form.render();
            }
        })
    }


})