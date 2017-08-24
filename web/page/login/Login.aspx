<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="web.page.login.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>登录--广州市水务规划勘测设计研究院地理信息系统</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="../../plugins/layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="//at.alicdn.com/t/font_x69q3tdmpkhgp66r.css" media="all" />
	<link rel="stylesheet" href="login.css" media="all" />
    <link rel="stylesheet" href="../../plugins/jQuery-xzlb/css/carousel.css">
	<style type="text/css">
	    .caroursel {margin: 150px auto;}
	    body {background-color: #2A2A2A;}
	</style>
    <!--[if IE]>
		<script src="http://libs.baidu.com/html5shiv/3.7/html5shiv.min.js"></script>
	<![endif]-->
</head>
<body>
        <article id="pictureBox" class="jq22-container">
        <div class="caroursel poster-main" data-setting='{
	        "height":500,
	        "posterHeight":500,
	        "scale":0.8,
	        "dealy":"4000",
	        "algin":"middle"
	    }'>
            <ul class="poster-list">
                <li class="poster-item">
                    <img src="../../page/login/background0.jpg" width="100%" height="100%"/></li>
                <li class="poster-item">
                    <img src="../../page/login/background1.jpg" width="100%" height="100%"/></li>
                <li class="poster-item">
                    <img src="../../page/login/background2.jpg" width="100%" height="100%"/></li>
            </ul>
            <div class="poster-btn poster-prev-btn"></div>
            <div class="poster-btn poster-next-btn"></div>
        </div>
    </article>
	<!--<div class="video_mask"></div>-->
	<div class="login">
	    <p style="margin-bottom:0;">欢迎登录</p>
        <p style="margin-bottom:0;font-size:18px;">广州市水务规划勘测设计研究院</p>
        <p style="font-size:20px;">地理信息系统</p>
	    <form class="layui-form" method="post">
	    	<div class="layui-form-item">
				<input class="layui-input" name="username" placeholder="用户名" lay-verify="required" type="text" autocomplete="off"/>
		    </div>
		    <div class="layui-form-item">
				<input class="layui-input" name="password" placeholder="密码" lay-verify="required" type="password" autocomplete="off"/>
		    </div>
		    <div class="layui-form-item form_code">
				<input class="layui-input" name="code" placeholder="验证码" lay-verify="required" type="text" autocomplete="off"/>
				<div class="code">
                    <asp:Image ID="Image1" runat="server" ImageUrl="checkCode.aspx" style="height:36px;"/>
				</div>
		    </div>
			<button class="layui-btn login_btn" lay-submit="" lay-filter="login">登录</button>
		</form>
        <a onClick="alert('请联系智慧水务研发所找回密码')">忘记密码</a>
	</div>
    <script src="../../js/jquery.js"></script>
	<script type="text/javascript" src="../../plugins/layui/layui.js"></script>
    <script src="../../plugins/jQuery-xzlb/js/jquery.carousel.js"></script>
    <script>Caroursel.init( $( '.caroursel' ) )</script>
	<script type="text/javascript" src="login.js"></script>
    <div id="endDiv" runat="server"></div>
</body>
</html>
