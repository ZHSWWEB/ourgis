<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="projectAdd.aspx.cs" Inherits="web.page.project.projectAdd" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>添加新项目</title>
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
    <form id="form1" class="layui-form" style="width:48%;float:left">
        <div style="height:20px"></div>
        <div class="layui-form-item">
            <label class="layui-form-label">项目编号</label>
            <div class="layui-input-block">
                <input type="text" name="projectNO" class="layui-input projectNO" lay-verify="required" placeholder="请输入项目编号" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">项目名称</label>
            <div class="layui-input-block">
                <input type="text" name="projectName" class="layui-input projectName" lay-verify="required" placeholder="请输入项目名称" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">行政区</label>
            <div class="layui-input-block">
                <input type="text" name="projectDistrict" class="layui-input projectDistrict" lay-verify="required" placeholder="请输入项目所在行政区" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">所属河流</label>
            <div class="layui-input-block">
                <input type="text" name="projectRiver" class="layui-input projectRiver" lay-verify="required" placeholder="请输入项目所属河流" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">项目位置</label>
            <div class="layui-input-block">
                <input type="text" name="projectLocation" class="layui-input projectLocation" lay-verify="required" placeholder="请输入项目位置" />
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">业主单位</label>
                <div class="layui-input-block">
                    <select name="projectEmployer" class="projectEmployer">
                        <option>广州市河涌管理处</option>
                        <option>广州市水务勘测设计研究院</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <div id="pointReady" data-value="0" style="color:orangered;font-family:'Microsoft YaHei';font-weight:bold">请在右侧地图上选定项目位置</div>
                <div id="pointSaved" data-value="0" style="display:none"></div>
             </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" onclick="projectSave()">立即提交</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>
    <form class="layui-form" style="width:50%;float:left;padding-left:10px">
        <iframe id="mapforproject" class="fullHeight" width="100%" height="1000px" frameborder="0" src="../map/map.html?app=1" onload="FullHeight(this)">抱歉！该页面不支持您的浏览器！</iframe>
    </form>
    <script type="text/javascript" src="../../plugins/layui/layui.js"></script>
    <script>
        var $;
        layui.config({
            base: "js/"
        }).use(['form', 'layer', 'jquery'], function () {
            var form = layui.form(),
                layer = parent.layer === undefined ? layui.layer : parent.layer,
                laypage = layui.laypage;
            $ = layui.jquery;            
        })

        var t, maxt=10;
        function FullHeight(ele) {
            ele.height = document.documentElement.clientHeight;
        }

        function projectTimer() {
            if (document.getElementById("pointSaved").getAttribute("data-value") == 1)
            {
                clearTimeout(t);
                document.getElementById("form1").submit();
            }
            else t = setTimeout("projectTimer()", 500);
        }

        function projectSave() {
            var pointReady = document.getElementById("pointReady").getAttribute("data-value");
            if (pointReady != 1) {
                alert("请先选定项目位置")
            } else {
                //var mapWin = parent.document.getElementById("mapforproject").contentWindow;
                var mapWin = document.getElementById("mapforproject").contentWindow;
                //send save
                mapWin.document.getElementById("projectPoint").innerText = "";
                //wait for saved
                projectTimer();
            }
        }
    </script>
    <div id="endAddProjectDiv" runat="server"></div>
</body>
</html>
