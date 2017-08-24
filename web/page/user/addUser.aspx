<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="addUser.aspx.cs" Inherits="web.page.user.addUser" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>用户添加--layui后台管理模板</title>
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="format-detection" content="telephone=no" />
    <link rel="stylesheet" href="../../plugins/layui/css/layui.css" media="all" />
    <style type="text/css">
        .layui-form-item .layui-inline {
            width: 33.333%;
            float: left;
            margin-right: 0;
        }

        @media(max-width:1240px) {
            .layui-form-item .layui-inline {
                width: 100%;
                float: none;
            }
        }
    </style>
</head>
<body class="childrenBody">
    <form class="layui-form" style="width:80%;">
        <div class="layui-form-item">
            <label class="layui-form-label">账号</label>
            <div class="layui-input-block">
                <input type="text" name="userName" class="layui-input userName" lay-verify="required" placeholder="请输入账号" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">姓名</label>
            <div class="layui-input-block">
                <input type="text" name="userNickname" class="layui-input userNickname" lay-verify="required" placeholder="请输入姓名" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">密码</label>
            <div class="layui-input-block">
                <input type="text" name="userPassword1" class="layui-input userPassword1" lay-verify="required" placeholder="请输入密码" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">确认密码</label>
            <div class="layui-input-block">
                <input type="text" name="userPassword2" class="layui-input userPassword2" lay-verify="required" placeholder="请输入密码" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">备注</label>
            <div class="layui-input-block">
                <input type="text" name="userDetail" class="layui-input userDetail" placeholder="请输入备注" />
            </div>
        </div>
        <div class="layui-form-item">
            <!--div class="layui-inline">
                <label class="layui-form-label">性别</label>
                <div class="layui-input-block userSex">
                    <input type="radio" name="sex" value="男" title="男" checked />
                    <input type="radio" name="sex" value="女" title="女" />
                    <input type="radio" name="sex" value="保密" title="保密" />
                </div>
            </div-->
            <div class="layui-inline">
                <label class="layui-form-label">权限</label>
                <div class="layui-input-block">
                    <select name="userGrade" class="userGrade" lay-filter="userGrade">
                        <option>外部用户</option>
                        <option>普通用户</option>
                        <option>高级用户</option>
                        <option>管理员</option>
                    </select>
                </div>
            </div>
            <!--div class="layui-inline">
                <label class="layui-form-label">会员状态</label>
                <div class="layui-input-block">
                    <select name="userStatus" class="userStatus" lay-filter="userStatus">
                        <option value="0">正常使用</option>
                        <option value="1">限制用户</option>
                    </select>
                </div>
            </div-->
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">部门</label>
                <div class="layui-input-block">
                    <select name="userDept" class="userDept" lay-filter="userDept">
                        <option>第三方部门</option>
                        <option>院领导</option>
                        <option>市政所</option>
                        <option>机电所</option>
                        <option>规划所</option>
                        <option>智慧所</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">激活状态</label>
                <div class="layui-input-block">
                    <select name="userActive" class="userActive" lay-filter="userActive">
                        <option value="0">禁用</option>
                        <option value="1" selected="selected">激活</option>
                    </select>
                </div>
            </div>
        </div>
        <!--div class="layui-form-item">
            <label class="layui-form-label">站点描述</label>
            <div class="layui-input-block">
                <textarea placeholder="请输入站点描述" class="layui-textarea linksDesc"></textarea>
            </div>
        </div-->
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit="" lay-filter="addUser">立即提交</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>
    <script type="text/javascript" src="../../plugins/layui/layui.js"></script>
    <script type="text/javascript" src="addUser.js"></script>
    <div id="endAdduserdiv" runat="server"></div>
</body>
</html>
