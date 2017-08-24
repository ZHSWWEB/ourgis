var $;
layui.config({
	base : "js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage;
		$ = layui.jquery;

 	var addUserArray = [],addUser;
 	form.on("submit(addUser)",function(data){
 		//是否添加过信息
	 	/*if(window.sessionStorage.getItem("addUser")){
	 		addUserArray = JSON.parse(window.sessionStorage.getItem("addUser"));
	 	}*/

        //  var userStatus, userEndTime;
        //var userGrade;
	 	//会员等级
	 	/*if(data.field.userGrade == '0'){
              userGrade = "外部用户";
 		}else if(data.field.userGrade == '1'){
              userGrade = "普通用户";
 		}else if(data.field.userGrade == '2'){
              userGrade = "高级用户";
 		}else if(data.field.userGrade == '3'){
              userGrade = "管理员";
 		}*/
 		//会员状态
 		/*if(data.field.userStatus == '0'){
 			userStatus = "正常使用";
 		}else if(data.field.userStatus == '1'){
 			userStatus = "限制用户";
 		}*/

        //检验是否用户名已存在 TODO
        

        //验证用户密码两次输入是否一致
        /*if ($(".userPassword1").val() != $(".userPassword2").val())
        {
            //top.layer.close(index);
            top.layer.msg("密码输入不一致！");
            layer.closeAll("iframe");
            parent.location.reload();
            return false;
        }*/

 		/*addUser = '{"usersId":"'+ new Date().getTime() +'",';//id
        addUser += '"userName":"' + $(".userName").val() + '",';  //账号
        addUser += '"userNickname":"' + $(".userNickname").val() + '",';  //昵称
        addUser += '"userPassword1":"' + $(".userPassword1").val() + '",';  //密码
        addUser += '"userDetail":"' + $(".userDetail").val() + '",';  //备注
 		//addUser += '"userEmail":"'+ $(".userEmail").val() +'",';	 //邮箱
 		addUser += '"userSex":"'+ data.field.sex +'",'; //性别
        addUser += '"userGrade":"' + userGrade +'",'; //权限
 		//addUser += '"userGrade":"'+ userGrade +'",'; //会员状态
        addUser += '"userCreateTime":"' + formatTime(new Date()) + '"}';  //创建时间

        //TODO 新的用户信息写入数据库

 		console.log(addUser);
 		addUserArray.unshift(JSON.parse(addUser));
 		window.sessionStorage.setItem("addUser",JSON.stringify(addUserArray));
 		//弹出loading
 		var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        /*setTimeout(function(){
            top.layer.close(index);
			top.layer.msg("用户添加成功！");
 			layer.closeAll("iframe");
	 		//刷新父页面
	 		parent.location.reload();
        },2000);*/
 		//return false;
 	})
	
})

//格式化时间
function formatTime(_time){
    var year = _time.getFullYear();
    var month = _time.getMonth()+1<10 ? "0"+(_time.getMonth()+1) : _time.getMonth()+1;
    var day = _time.getDate()<10 ? "0"+_time.getDate() : _time.getDate();
    var hour = _time.getHours()<10 ? "0"+_time.getHours() : _time.getHours();
    var minute = _time.getMinutes()<10 ? "0"+_time.getMinutes() : _time.getMinutes();
    return year+"-"+month+"-"+day+" "+hour+":"+minute;
}
