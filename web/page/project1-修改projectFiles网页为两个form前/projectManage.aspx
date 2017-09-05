<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="projectManage.aspx.cs" Inherits="web.page.project.projectManage" validateRequest="false" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>工程项目管理</title>
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
	<blockquote class="layui-elem-quote news_search">
		<div class="layui-inline">
		    <div class="layui-input-inline">
		    	<input type="text" value="" placeholder="请输入关键字" class="layui-input search_input" />
		    </div>
		    <a class="layui-btn search_btn">查询</a>
		</div>
		<div class="layui-inline">
			<a class="layui-btn layui-btn-normal projectAdd_btn">新建项目</a>
		</div>
		<div class="layui-inline">
			<div class="layui-form-mid layui-word-aux">  </div>
		</div>
	</blockquote>
	<div class="layui-form news_list">
	  	<table class="layui-table">
		    <colgroup>
                <col width="6%" />
				<col width="13%" />
				<col width="5%" />
				<col width="6%" />
                <col width="13%" />
				<col width="9%" />
				<col width="5%" />
				<col width="8%" />
                <col width="8%" />
                <col width="4%" />
                <col width="4%" />
				<col width="4%" />
				<col width="4%" />
				<col width="4%" />
                <col width="4%" />
		    </colgroup>
		    <thead>
				<tr>
					<th>项目编号</th>
                    <th>项目名称</th>
					<th>行政区</th>
					<th>所属河流</th>
					<th>项目位置</th>
                    <th>业主单位</th>
					<th>录入人</th>
                    <th>录入部门</th>
					<th>录入时间</th>
                    <th>项目建议书</th>
					<th>可行性研究报告</th>
                    <th>初步设计</th>
					<th>施工图及招标</th>
                    <th>设计变更</th>
					<th>计算书</th>
				</tr> 
		    </thead>
		    <tbody class="project_content"></tbody>
		</table>
	</div>
	<div id="page"></div>
	<script type="text/javascript" src="../../plugins/layui/layui.js"></script>
	<script type="text/javascript" src="./projectManage.js"></script>
</body>
</html>
