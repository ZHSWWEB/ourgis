<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="userManager.aspx.cs" Inherits="web.page.user.userManager" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>账户管理</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="../../plugins/layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="//at.alicdn.com/t/font_eolqem241z66flxr.css" media="all" />
	<link rel="stylesheet" href="../../css/user.css" media="all" />
</head>
<body class="childrenBody">
	<blockquote class="layui-elem-quote news_search">
		<div class="layui-inline">
		    <div class="layui-input-inline">
		    	<input type="text" value="" placeholder="请输入关键字" class="layui-input search_input">
		    </div>
		    <a class="layui-btn search_btn">查询</a>
		</div>
		<div class="layui-inline">
			<a class="layui-btn layui-btn-normal usersAdd_btn">添加用户</a>
		</div>
		<%--<div class="layui-inline">
			<a class="layui-btn layui-btn-danger batchDel">批量删除</a>
		</div>--%>
		<div class="layui-inline">
			<div class="layui-form-mid layui-word-aux">  </div>
		</div>
	</blockquote>
	<div class="layui-form news_list">
	  	<table class="layui-table">
		    <colgroup>
				<col width="50">
				<col>
				<col width="10%">
				<col width="10%">
				<col width="5%">
                <col width="10%">
				<col width="20%">
				<col width="10%">
				<col width="10%">
		    </colgroup>
		    <thead>
				<tr>
					<th><input type="checkbox" name="" lay-skin="primary" lay-filter="allChoose" id="allChoose"></th>
					<th>帐号</th>
					<th>姓名</th>
					<th>密码</th>
					<th>权限</th>
                    <th>部门</th>
					<th>备注</th>
                    <th>最后登录时间</th>
					<th>创建时间</th>
					<th>操作</th>
                    <th>激活状态</th>
				</tr> 
		    </thead>
		    <tbody class="users_content"></tbody>
		</table>
	</div>
	<div id="page"></div>
	<script type="text/javascript" src="../../plugins/layui/layui.js"></script>
	<script type="text/javascript" src="userManager.js"></script>
</body>
</html>
