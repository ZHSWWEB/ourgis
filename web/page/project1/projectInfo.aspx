<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="projectInfo.aspx.cs" Inherits="web.page.project.projectInfo" validateRequest="false" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>项目详细信息</title>
	<meta name="renderer" content="webkit" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="stylesheet" href="../../plugins/layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="//at.alicdn.com/t/font_eolqem241z66flxr.css" media="all" />
	<link rel="stylesheet" href="../../css/user.css" media="all" />
    <style type="text/css">
        .layui-table td {
            background:#d2d2d2;
        }
    </style>
</head>
<body>
    <div>
        <div id="proTitleDiv" runat="server"></div>
        <div style="position:absolute;float:left;width:20%"></div>
        <div style="position:absolute;float:left;left:20%;width:60%">
            <table class="layui-table">
                <%--<colgroup>
                    <col width="30%" />
                    <col />
                </colgroup>--%>
                <tbody id="proinfo_body" runat="server"></tbody>
            </table>
        </div>
        <div style="position:absolute;float:right;width:20%"></div>
    </div>
</body>
</html>
