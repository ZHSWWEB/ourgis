<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="projectFiles.aspx.cs" Inherits="web.page.project.projectFiles" %>

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
<body class="childrenBody">
   <%-- <form runat="server">--%>
    <div style="height:70%">
        <blockquote class="layui-elem-quote layui-quote-nm" style="font-size:16px;font-weight:bold;background-color:cadetblue">文件列表</blockquote>
	        <div class="layui-form news_list">
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
    </div>
        <hr />
    <div style="height:30%">
        <blockquote class="layui-elem-quote layui-quote-nm" style="font-size:16px;font-weight:bold;background-color:cadetblue">文件上传</blockquote>
            <form class="layui-form" runat="server" id="form2">
                <div class="layui-form news_list">
	  	            <table class="layui-table">
		                <colgroup>
                            <col width="50%" />
				            <col width="50%" />
		                </colgroup>
		                <thead>
				            <tr>
					            <th>文件说明</th>
                                <th>文件上传</th>
				            </tr> 
		                </thead>
		                <tbody>
                            <tr>
                              <td><input runat="server" type="text" id="filedetailinput" value="" placeholder="请输入文件说明" class="layui-input" required="required" style="display:inline-block;width:70%;margin-left:20px;border:1px solid black"/></td>
                              <td>
                                    <asp:FileUpload ID="FileUpload1" runat="server" onchange="Text1.value=this.value" Style="visibility:hidden;width:0px" />
                                    <input id="Text1" type="text"  readonly="readonly" style="display:inline-block;border:none;border-radius:2px;height:38px;width:50%;background-color:darkgray"/>
                                    <input type="button" class="layui-btn" value="选择文件" onclick="FileUpload1.click()" />
                                    <asp:Button class="layui-btn" ID="Button2" runat="server" Text="上传" OnClick="btnSaveFile_Click" style="margin-left:5px" />
                              </td>
                            </tr>
		                </tbody>
		            </table>
	            </div>
            </form>
        </div>
        <div id="endProjectFilesDiv" runat="server"></div>
	    <script type="text/javascript" src="../../plugins/layui/layui.js"></script>
	    <script type="text/javascript" src="./projectFiles.js"></script>
    <%--</form>--%>
</body>
</html>
