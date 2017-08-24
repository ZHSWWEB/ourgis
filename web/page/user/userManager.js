layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

	//加载页面数据
	var usersData = '';
    $.get( "../../json/userList.aspx", function(data){
		usersData = data;
		if(window.sessionStorage.getItem("addUser")){
			var addUsers = window.sessionStorage.getItem("addUser");
			usersData = JSON.parse(addUsers).concat(usersData);
		}
		//执行加载数据的方法
		usersList();
	})

	//查询
	$(".search_btn").click(function(){
		var userArray = [];

		if($(".search_input").val() != ''){
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
					url : "../../json/userList.aspx",
					type : "get",
					dataType : "json",
					success : function(data){
						if(window.sessionStorage.getItem("addUsers")){
							var addUsers = window.sessionStorage.getItem("addUsers");
							usersData = JSON.parse(addUsers).concat(data);
						}else{
							usersData = data;
						}
						for(var i=0;i<usersData.length;i++){
							var usersStr = usersData[i];
							var selectStr = $(".search_input").val();
		            		function changeStr(data){
		            			var dataStr = '';
		            			var showNum = data.split(eval("/"+selectStr+"/ig")).length - 1;
		            			if(showNum > 1){
									for (var j=0;j<showNum;j++) {
		            					dataStr += data.split(eval("/"+selectStr+"/ig"))[j] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>";
		            				}
		            				dataStr += data.split(eval("/"+selectStr+"/ig"))[showNum];
		            				return dataStr;
		            			}else{
		            				dataStr = data.split(eval("/"+selectStr+"/ig"))[0] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>" + data.split(eval("/"+selectStr+"/ig"))[1];
		            				return dataStr;
		            			}
		            		}
		            		//
		            		if(usersStr.NAME.indexOf(selectStr) > -1){
			            		usersStr["NAME"] = changeStr(usersStr.NAME);
		            		}
		            		//
		            		if(usersStr.BYNAME.indexOf(selectStr) > -1){
			            		usersStr["BYNAME"] = changeStr(usersStr.BYNAME);
		            		}
		            		//
		            		if(usersStr.PASSWORD.indexOf(selectStr) > -1){
			            		usersStr["PASSWORD"] = changeStr(usersStr.PASSWORD);
		            		}
		            		//
		            		if(usersStr.PERMISSION.indexOf(selectStr) > -1){
			            		usersStr["PERMISSION"] = changeStr(usersStr.PERMISSION);
                            }
                            //
                            if ( usersStr.REMARK.indexOf( selectStr ) > -1 ) {
                                usersStr["REMARK"] = changeStr( usersStr.REMARK );
                            }
                            //
                            if ( usersStr.LASTESTLOGINTIME.indexOf( selectStr ) > -1 ) {
                                usersStr["LASTESTLOGINTIME"] = changeStr( usersStr.LASTESTLOGINTIME );
                            }
                            //创建时间
                            if (usersStr.CREATETIME.indexOf(selectStr) > -1) {
                                usersStr["CREATETIME"] = changeStr(usersStr.CREATETIME);
                            }
                            //部门
                            if (usersStr.DEPARTMENT.indexOf(selectStr) > -1) {
                                usersStr["DEPARTMENT"] = changeStr(usersStr.DEPARTMENT);
                            }

                            if (usersStr.NAME.indexOf(selectStr) > -1 || usersStr.BYNAME.indexOf(selectStr) > -1 || usersStr.PASSWORD.indexOf(selectStr) > -1 || usersStr.PERMISSION.indexOf(selectStr) > -1 || usersStr.REMARK.indexOf(selectStr) > -1 || usersStr.LASTESTLOGINTIME.indexOf(selectStr) > -1 || usersStr.CREATETIME.indexOf(selectStr) > -1 || usersStr.DEPARTMENT.indexOf(selectStr) > -1) {
		            			userArray.push(usersStr);
		            		}
		            	}
		            	usersData = userArray;
		            	usersList(usersData);
					}
				})
            	
                layer.close(index);
            },2000);
		}else{
			layer.msg("请输入需要查询的内容");
		}
	})

	//添加用户
	$(".usersAdd_btn").click(function(){
		var index = layui.layer.open({
			title : "添加用户",
			type : 2,
			content : "addUser.aspx",
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
		$(window).resize(function(){
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})

    //全选
	form.on('checkbox(allChoose)', function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		child.each(function(index, item){
			item.checked = data.elem.checked;
		});
		form.render('checkbox');
	});

	//通过判断文章是否全部选中来确定全选按钮是否选中
	form.on("checkbox(choose)",function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		var childChecked = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"]):checked')
		if(childChecked.length == child.length){
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = true;
		}else{
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = false;
		}
		form.render('checkbox');
	})

	//操作
	$("body").on("click",".users_edit",function(){  //编辑
		layer.alert('您点击了会员编辑按钮，由于是纯静态页面，所以暂时不存在编辑内容，后期会添加，敬请谅解。。。',{icon:6, title:'文章编辑'});
	})

	$("body").on("click",".users_del",function(){  //删除
        var _this = $(this);
        layer.confirm('确定删除此用户？', { icon: 3, title: '提示信息' }, function (index) {
            window.location.href = "./page/user/userManager.aspx?deleteid=" + _this.attr("data-id");
            layer.close(index);
        });
    })

    //激活或者禁用用户
    $("body").on("click", ".users_act", function () {
        var _this = $(this);
        window.location.href = "userManager.aspx?activeid=" + _this.attr("data-id");
    })

    //重置用户密码
    $("body").on("click", ".users_resetpwd", function (){
        var _this = $(this);
        layer.confirm('确定重置此用户密码为“123456”？', { icon: 3, title: '提示信息' }, function (index) {
            window.location.href = "./page/user/userManager.aspx?resetpwdid=" + _this.attr("data-id");
            layer.close(index);
        });
    })

	function usersList(){
		//渲染数据
		function renderDate(data,curr){
            var dataHtml = '';
            var activeStatus = '';
			currData = usersData.concat().splice(curr*nums-nums, nums);
			if(currData.length != 0){
                for (var i = 0; i < currData.length; i++){
                    if (currData[i].ACTIVE == '1')
                        activeStatus = "禁用";
                    else activeStatus = "激活";
					dataHtml += '<tr>'
			    	+  '<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
			    	+  '<td>'+currData[i].NAME+'</td>'
			    	+  '<td>'+currData[i].BYNAME+'</td>'
			    	+  '<td>'+currData[i].PASSWORD+'</td>'
                    + '<td>' + currData[i].PERMISSION + '</td>'
                    + '<td>' + currData[i].DEPARTMENT + '</td>'
			    	+  '<td>'+currData[i].REMARK+'</td>'
                    + '<td>' + currData[i].LASTESTLOGINTIME + '</td>'
                    + '<td>' + currData[i].CREATETIME + '</td>'
			    	+  '<td>'
                    //+ '<a class="layui-btn layui-btn-mini users_edit"><i class="iconfont icon-edit"></i>编辑</a>'
                        + '<a class="layui-btn layui-btn-danger layui-btn-mini users_resetpwd" data-id="' + currData[i].ID +'"><i class="layui-icon">&#xe642;</i>重置密码</a>'
                        + '<a class="layui-btn layui-btn-danger layui-btn-mini users_del" data-id="' + currData[i].ID+'"><i class="layui-icon">&#xe640;</i>删除</a>'
                    + '</td>'
                        + '<td><a class="layui-btn layui-btn-mini users_act" data-id="' + currData[i].ID + '"><i class="layui-icon">&#xe618;</i>' + activeStatus +'</a></td>'
			    	+'</tr>';
				}
			}else{
				dataHtml = '<tr><td colspan="11">暂无数据</td></tr>';
			}
		    return dataHtml;
		}

		//分页
		var nums = 15; //每页出现的数据量
		laypage({
			cont : "page",
			pages : Math.ceil(usersData.length/nums),
			jump : function(obj){
				$(".users_content").html(renderDate(usersData,obj.curr));
				$('.users_list thead input[type="checkbox"]').prop("checked",false);
		    	form.render();
			}
		})
	}
        
})