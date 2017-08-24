<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="userInfo.aspx.cs" Inherits="web.page.user.userInfo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>个人资料</title>
	<meta name="renderer" content="webkit" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="stylesheet" href="../../plugins/layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="../../css/user.css" media="all" />
</head>
<body class="childrenBody">
	<form class="layui-form" id="form1" style="float:left;margin:5px;width:49%">
		<div style="margin-right:10%">
			<div class="layui-form-item">
			    <label class="layui-form-label">账号</label>
			    <div class="layui-input-block" style="margin-right:10%">
			    	<%--<input type="text" value="请叫我马哥" disabled class="layui-input layui-disabled" />--%>
                    <div id="userNameDiv" runat="server"></div>
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">姓名</label>
			    <div class="layui-input-block" style="margin-right:10%">
			    	<%--<input type="text" value="" disabled class="layui-input layui-disabled" />--%>
                    <div id="userByNameDiv" runat="server"></div>
			    </div>
			</div>
			<div class="layui-form-item" pane="">
			    <label class="layui-form-label">性别</label>
			    <div class="layui-input-block" style="margin-right:10%">
			    	<%--<input type="radio" name="sex" value="男" title="男" checked="" />
	     			<input type="radio" name="sex" value="女" title="女" />
	     			<input type="radio" name="sex" value="保密" title="保密" />--%>
                    <div id="userSexDiv" runat="server"></div>
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">手机号码</label>
			    <div class="layui-input-block" style="margin-right:10%">
			    	<%--<input type="tel" value="" placeholder="请输入手机号码" lay-verify="required|phone" class="layui-input">--%>
                    <div id="userPhoneDiv" runat="server"></div>
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">出生日期</label>
			    <div class="layui-input-block" style="margin-right:10%">
			    	<%--<input type="text" value="" placeholder="请输入出生日期" lay-verify="required|date" onclick="layui.laydate({elem: this,max: laydate.now()})" class="layui-input">--%>
                    <div id="userBirthdayDiv" runat="server"></div>
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">家庭住址</label>
                <div class="layui-input-block" style="margin-right:10%">
			    	<%--<input type="text" value="" placeholder="请输入详细地址" class="layui-input" />--%>
                    <div id="userAddressDiv" runat="server"></div>
			    </div>
			    <%--<div class="layui-input-inline">
	                <select name="province" lay-filter="province">
	                    <option value="">请选择省</option>
	                </select>
	            </div>
	            <div class="layui-input-inline">
	                <select name="city" lay-filter="city" disabled>
	                    <option value="">请选择市</option>
	                </select>
	            </div>
	            <div class="layui-input-inline">
	                <select name="area" lay-filter="area" disabled>
	                    <option value="">请选择县/区</option>
	                </select>
	            </div>--%>
			</div>
			<%--<div class="layui-form-item">
			    <label class="layui-form-label">兴趣爱好</label>
			    <div class="layui-input-block">
			    	<input type="checkbox" name="like1[javascript]" title="Javascript">
				    <input type="checkbox" name="like1[html]" title="HTML(5)">
				    <input type="checkbox" name="like1[css]" title="CSS(3)">
				    <input type="checkbox" name="like1[php]" title="PHP">
				    <input type="checkbox" name="like1[.net]" title=".net">
				    <input type="checkbox" name="like1[ASP]" title="ASP">
				    <input type="checkbox" name="like1[C#]" title="C#">
				    <input type="checkbox" name="like1[Angular]" title="Angular">
				    <input type="checkbox" name="like1[VUE]" title="VUE">
				    <input type="checkbox" name="like1[XML]" title="XML">
			    </div>
			</div>--%>
			<div class="layui-form-item">
			    <label class="layui-form-label">邮箱</label>
			    <div class="layui-input-block" style="margin-right:10%">
			    	<%--<input type="text" value="" placeholder="请输入邮箱" lay-verify="required|email" class="layui-input" />--%>
                    <div id="userEmailDiv" runat="server"></div>
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">自我评价</label>
			    <div class="layui-input-block" style="margin-right:10%">
			    	<%--<textarea placeholder="请输入内容" class="layui-textarea"></textarea>--%>
                    <div id="userEvaluteDiv" runat="server"></div>
			    </div>
			</div>
		</div>
		<%--<div class="user_right">
            <asp:FileUpload ID="FileUpload1" runat="server" onchange="Text1.value=this.value" Style="visibility:hidden" />
            <input id="Text1" type="text"  readonly="readonly" style="height:32px"/>
            <input type="button" class="layui-btn" value="选择文件" onclick="FileUpload1.click()" />
            <asp:Button class="layui-btn" ID="btnSave" runat="server" Text="上传" OnClick="btnSave_Click" style="margin-left:1px" />
            <div id="userFaceDiv" runat="server"></div>
		</div>--%>
		<div class="layui-form-item" style="margin-right:10%">
		    <div class="layui-input-block" style="margin-right:10%">
		    	<button class="layui-btn" lay-submit="" lay-filter="changeUserInfo">立即提交</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
		    </div>
		</div>
	</form>
    <form class="layui-form" runat="server" id="form2" style="float:left;margin:5px;width:49%">
        <div id="userFaceDiv" runat="server"></div>
        <br />
        <div>
            <asp:FileUpload ID="FileUpload1" runat="server" onchange="Text1.value=this.value" Style="visibility:hidden;width:0px;height:38px" />
            <input id="Text1" type="text"  readonly="readonly" style="display:inline-block;margin-left:16px;margin-bottom:5px;height:38px;line-height:38px;border:none;border-radius:2px;background-color:darkseagreen;width:162px"/>
        </div>
        <div>
            <input type="button" class="layui-btn" style="margin-left:20px" value="选择头像" onclick="FileUpload1.click()" />
            <asp:Button class="layui-btn" ID="Button1" runat="server" Text="上传" OnClick="btnSave_Click" style="margin-left:1px" />
        </div>
    </form>
	<script type="text/javascript" src="../../plugins/layui/layui.js"></script>
	<%--<script type="text/javascript" src="address.js"></script>--%>
	<script type="text/javascript" src="user.js"></script>
    <div id="userInfoEndDiv" runat="server"></div>
</body>
</html>
