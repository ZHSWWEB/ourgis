﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="projectFilesList.aspx.cs" Inherits="web.page.project1.projectFilesList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>项目文件管理</title>
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
<body>
	        <div class="layui-form news_list" >
	  	        <table class="layui-table">
		            <colgroup>
                        <col width="5%" />
				        <col width="10%" />
				        <col width="10%" />
				        <col width="5%" />
                        <col width="5%" />
				        <col width="8%" />
				        <col width="8%" />
				        <col width="5%" />
		            </colgroup>
		            <thead>
				        <tr>
					        <th>序号</th>
                            <th>文件说明</th>
					        <th>文件名</th>
					        <th>文件大小</th>
					        <th>上传人</th>
                            <th>部门</th>
					        <th>上传日期</th>
                            <th>操作</th>
				        </tr> 
		            </thead>
		            <tbody id="files_content" runat="server"></tbody>
		        </table>
	        </div>
    <script type="text/javascript" src="../../plugins/layui/layui.js"></script>
	<script type="text/javascript" src="./projectFiles.js"></script>
</body>
</html>
