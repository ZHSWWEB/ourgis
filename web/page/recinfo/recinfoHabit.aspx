<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="recinfoHabit.aspx.cs" Inherits="web.page.recinfo.recinfoHabit" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>使用习惯信息</title>
	<meta name="renderer" content="webkit" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="stylesheet" href="../../plugins/layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="//at.alicdn.com/t/font_eolqem241z66flxr.css" media="all" />
	<link rel="stylesheet" href="../../css/user.css" media="all" />
</head>
<body class="childrenBody">
    <%--<blockquote class="layui-elem-quote news_search">
		<div class="layui-inline">
		    <div class="layui-input-inline">
		    	<input type="text" value="" placeholder="请输入关键字" class="layui-input search_input" />
		    </div>
		    <a class="layui-btn search_btn">查询</a>
		</div>
		<div class="layui-inline">
			<div class="layui-form-mid layui-word-aux">  </div>
		</div>
	</blockquote>--%>
	<div class="layui-form news_list">
	  	<table class="layui-table">
		    <colgroup>
				<col width="5%" />
				<col width="5%" />
                <col width="5%" />
				<col width="5%" />
				<col width="5%" />
                <col width="5%" />
                <col width="5%" />
                <%--<col width="5%" />
                <col width="5%" />--%>
                <col width="5%" />
		    </colgroup>
		    <thead>
				<tr>
                    <th></th>
					<th>河流</th>
                    <th>湖泊</th>
                    <th>水库</th>
                    <th>堤防</th>
                    <th>泵站</th>
                    <th>水闸</th>
                    <%--<th>地图放大</th>
                    <th>地图缩小</th>--%>
                    <th>用户操作历史</th>
				</tr> 
		    </thead>
		    <tbody class="habit_rec"></tbody>
		</table>
	</div>
	<div id="page"></div>
	<script type="text/javascript" src="../../plugins/layui/layui.js"></script>
	<script type="text/javascript" src="recinfoHabit.js"></script>
</body>
</html>
