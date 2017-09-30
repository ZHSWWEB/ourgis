<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="showList.aspx.cs" Inherits="web.page.formpages.showList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link rel="stylesheet" href="../../fonts/iconfont.css" media="all" /><%--加载字体图标--%>
    <link href="plugins/layui/css/layui.css" rel="stylesheet" /><%--加载layui样式--%>
    <link href="formstyle.css" rel="stylesheet" /><%--加载自定义样式覆盖layui样式--%>

    <script src="../../js/jquery.js"></script><%--预先加载jquery--%>
    <script type="text/javascript" src="plugins/layui/layui.all.js"></script><%--加载layui--%>
    <script type="text/javascript">
        function showDetail( objectId, hcmc, table )//用于弹出详情页面窗口
        {
            layui.use( 'layer', function ()
            {
                var layer = layui.layer;
                layer.open( {
                    type: 2, title: '#' + objectId + hcmc, shadeClose: true, shade: [0.3],
                    maxmin: false, move: false, area: ['632px', '90%'], scrollbar: false,
                    content: 'showDetail.aspx?table=' + table + '&&objectId=' + objectId,
                    end: function ()
                    {
                        document.getElementById( "Button2" ).click();
                    }
                } )
            } )
        };
        function showHz( hzcd, hcmc, table )//用于弹出河长页面窗口
        {
            layui.use( 'layer', function ()
            {
                var layer = layui.layer;
                layer.open( {
                    type: 2, title: hcmc, shadeClose: true, shade: [0.3],
                    maxmin: true,resize: true, move: true, area: ['90%', '40%'], scrollbar: false,
                    content: 'showList.aspx?table=' + table + '&&hzcd=' + hzcd
                } )
            } )
        };
        function showMsg( msg )//用于弹出顶部抖动提示信息
        {
            layui.use( 'layer', function ()
            {
                var layer = layui.layer;
                layer.msg( msg, { anim: 6 } );
            } )
        };
        var url = window.location.href;//用于分析页面内容
        var timoutID;//用于下拉多选菜单的延迟隐藏
        var curmenu = JSON.parse( sessionStorage.getItem( "curmenu" ) );//获取当前tab卡信息
        var title = curmenu.title;
        var topShow = sessionStorage.getItem( "topShow_" + title );//查找页面对应sessionStorage获取顶部部件历史状态
        if ( topShow == null )//首次打开
        {
            sessionStorage.setItem( "topShow_" + title, true );///设置sessionStorage
            topShow = true;
        } else
        {
            topShow = ( topShow == "true" );//读取sessionStorage
        }
    </script>
</head>
<body>
    <form id="Form1" class="layui-form layui-form-pane" style="display:none" runat="server"><%--设置为form，隐藏等待渲染完毕--%>
        <%--顶部可下拉窗体(含分割线及指示箭头)--%>
        <div id="headBox" style="display: block">
            <div id="topBox" style="display: none"><%--顶部筛选设置窗体--%>
                <div class="layui-form-item"><%--共用同一form-item--%>
                    <Label class="layui-form-mid" Style="width: 3px" ></Label><%--前置占位符--%>
                    <%--行政区--%>
                    <asp:Label class="layui-form-label" Style="width: 80px" runat="server" ID="lDistrictList">行政区</asp:Label>
                    <div class="layui-input-inline" style="width: 150px">
                        <asp:DropDownList class="layui-input" ID="DistrictList" runat="server"></asp:DropDownList>
                    </div>
                    <%--1368条河流--%>
                    <asp:Label class="layui-form-label" Style="width: 110px" runat="server" ID="lset1368">1368条河流</asp:Label>
                    <div class="layui-input-inline" style="width: 150px">
                        <asp:DropDownList class="layui-input" ID="set1368" runat="server">
                            <asp:ListItem Value="" Selected="True">全部</asp:ListItem>
                            <asp:ListItem Value="F1368 > 0 AND ">仅1368</asp:ListItem>
                            <asp:ListItem Value="F1368 IS NULL AND ">非1368</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <%--数据ID--%>
                    <label class="layui-form-label" style="width: 80px">数据ID</label>
                    <div class="layui-input-inline" style="width: 70px;">
                        <asp:TextBox class="layui-input" ID="objectidd" runat="server" onkeypress="inputObjectId(event)" onblur="checkObjectId()"></asp:TextBox>
                    </div>
                    <label class="layui-form-mid" style="width: 10px">-</label>
                    <div class="layui-input-inline" style="width: 70px;">
                        <asp:TextBox class="layui-input" ID="objectidu" runat="server" onkeypress="inputObjectId(event)" onblur="checkObjectId()"></asp:TextBox>
                    </div>
                    <%--仅187--%>
                    <div class="layui-input-inline" style="width: 220px;">
                        <asp:CheckBox  ID="only187"  runat="server"/>
                    </div>
                    <%--仅35--%>
                    <div class="layui-input-inline" style="width: 210px;">
                        <asp:CheckBox  ID="only35" runat="server"/>
                    </div>
                </div>
            </div>
            <%--分割线与指示按钮部件--%>
            <hr class="layui-bg-gray" style="margin-bottom: 0; margin-top: 5px; height: 2px" onclick="toplist()" />
            <div style="height: 8px; text-align: center" onclick="toplist()">
                <i id="topu" style="font-size: 22px; display: none" class="iconfont icon-shang"></i>
                <i id="topd" style="font-size: 22px; display: block" class="iconfont icon-xia"></i>
            </div>
        </div>
        <%--固有搜索窗体--%>
        <div class="layui-form-item">
            <Label class="layui-form-mid" Style="width: 3px" ></Label><%--前置占位符--%>
            <%--输入框--%>
            <div class="layui-input-inline">
                <asp:TextBox class="layui-input" ID="TextBox1" runat="server" Style="margin-bottom: 10px;" placeholder="请输入搜索内容" MaxLength="100"></asp:TextBox>
            </div>
            <%--选项下拉窗--%>
            <div class="layui-input-inline" style="width: 150px;">
                <asp:DropDownList class="layui-input" ID="SearchList" runat="server"></asp:DropDownList>
            </div>
            <%--按钮组--%>
            <div class="layui-input-inline">
                <%--查询键(重置页码、选中行)--%>
                <asp:Button ID="Button1" runat="server" Text="查&nbsp;&nbsp;&nbsp;&nbsp;询" Width="80px" OnClick="Button1_Click"/>
                <%--刷新键(保留页码、选中行)--%>
                <asp:Button ID="Button2" runat="server" Text="刷新" OnClick="Button2_Click"/>
      
                <button id="submit1" style="display:none"></button><%--顶部部件的中转到查询键--%>
                <button id="submit2" style="display:none"></button><%--顶部部件中转到刷新键--%>
            </div>
        </div>

        <%--GridView窗体--%>
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" AllowSorting="True" AllowPaging="True" BackColor="White" BorderColor="#DEDFDE" BorderStyle="Solid" ForeColor="Black" GridLines="Vertical" PageSize="20" Width="100%" EmptyDataText="暂缺"
            OnRowEditing="GridView1_RowEditing" OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowUpdating="GridView1_RowUpdating" OnRowDeleting="GridView1_RowDeleting" OnPageIndexChanging="GridView1_PageIndexChanging" OnRowDataBound="GridView1_RowDataBound" OnRowCommand="GridView1_RowCommand" OnSorting="GridView1_Sorting">
            <AlternatingRowStyle BackColor="White" />
            <Columns>
                <asp:TemplateField HeaderText="行号">
                    <ItemTemplate>
                        <asp:Label ID="rowIndex" class="rowIndex" runat="server"></asp:Label>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" Width="40px" />
                </asp:TemplateField>
            </Columns>
            <PagerTemplate>
                共计
                <%--得到数据的总数--%>
                <asp:Label ID="dataCount" runat="server" Text=""></asp:Label>
                条数据&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                当前第:
                <%--((GridView)Container.NamingContainer)就是为了得到当前的控件--%>
                <asp:Label ID="LabelCurrentPage" runat="server" Text="<%# ((GridView)Container.NamingContainer).PageIndex + 1 %>"></asp:Label>
                页/共:
                <%--得到分页页面的总数--%>
                <asp:Label ID="LabelPageCount" runat="server" Text="<%# ((GridView)Container.NamingContainer).PageCount %>"></asp:Label>
                页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <%--如果该分页是首分页，那么该连接就不会显示了.同时对应了自带识别的命令参数CommandArgument--%>
                <asp:Button ID="LinkButtonFirstPage" runat="server" CommandArgument="First" CommandName="Page"
                    Visible='<%#((GridView)Container.NamingContainer).PageIndex != 0 %>' Text="首页"></asp:Button>
                <asp:Button ID="LinkButtonPreviousPage" runat="server" CommandArgument="Prev"
                    CommandName="Page" Visible='<%# ((GridView)Container.NamingContainer).PageIndex != 0 %>' Text="上一页" ></asp:Button>
                <%--如果该分页是尾页，那么该连接就不会显示了--%>
                <asp:Button ID="LinkButtonNextPage" runat="server" CommandArgument="Next" CommandName="Page"
                    Visible='<%# ((GridView)Container.NamingContainer).PageIndex != ((GridView)Container.NamingContainer).PageCount - 1 %>' Text="下一页"></asp:Button>
                <asp:Button ID="LinkButtonLastPage" runat="server" CommandArgument="Last" CommandName="Page"
                    Visible='<%# ((GridView)Container.NamingContainer).PageIndex != ((GridView)Container.NamingContainer).PageCount - 1 %>' Text="尾页"></asp:Button>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每页
                <asp:TextBox ID="txtNewPageSize" runat="server" Width="30px" Text='<%# ((GridView)Container.Parent.Parent).PageSize %>' />条
                <%--这里将CommandArgument即使点击该按钮e.newIndex 值为-4--%>
                <asp:Button ID="btnSet" runat="server" CausesValidation="False" CommandArgument="-3" CommandName="Page" Text="SET"></asp:Button>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;转到第
                <asp:TextBox ID="txtNewPageIndex" runat="server" Width="30px" Text='<%# ((GridView)Container.Parent.Parent).PageIndex + 1 %>' />页
                <%--这里将CommandArgument即使点击该按钮e.newIndex 值为-3--%>
                <asp:Button ID="btnGo" runat="server" CausesValidation="False" CommandArgument="-2" CommandName="Page" Text="GO"></asp:Button>
            </PagerTemplate>
            <FooterStyle BackColor="#454B5A" />
            <HeaderStyle BackColor="#454B5A" Font-Bold="True" ForeColor="White" />
            <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Center" VerticalAlign="Bottom" />
            <RowStyle BackColor="#F7F7DE" HorizontalAlign="Center" VerticalAlign="Middle" Wrap="False" />
            <SelectedRowStyle BackColor="#1AA094" Font-Bold="True" ForeColor="White" />
        </asp:GridView>
        <asp:HiddenField ID="sortSet" runat="server" />
    </form>

    <%--下拉多选菜单--%>
    <div id='selectList' class="dropli" style="display:none" onmouseover="clearTimeout(timoutID);"  onmouseout="timoutID = setTimeout('HideMList()', 250);">
        <table class="dropli" style="background-color: #31b7ab">
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox0" type="checkbox" onclick="checkclick(this,0);" value="白云区" />白云区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox1" type="checkbox"  onclick="checkclick(this,0);" value="从化区"/>从化区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox2" type="checkbox" onclick="checkclick(this,0);" value="番禺区"/>番禺区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox3" type="checkbox" onclick="checkclick(this,0);" value="海珠区"/>海珠区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox4" type="checkbox" onclick="checkclick(this,0);" value="花都区"/>花都区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox5" type="checkbox" onclick="checkclick(this,0);" value="黄埔区"/>黄埔区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox6" type="checkbox" onclick="checkclick(this,0);" value="荔湾区"/>荔湾区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox7" type="checkbox" onclick="checkclick(this,0);" value="南沙区"/>南沙区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox8" type="checkbox" onclick="checkclick(this,0);" value="天河区"/>天河区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox9" type="checkbox" onclick="checkclick(this,0);" value="越秀区"/>越秀区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox10" type="checkbox" onclick="checkclick(this,0);" value="增城区"/>增城区</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox11" type="checkbox" onclick="checkclick(this,0);" value="市属"/>市属</td>
            </tr>
            <tr class="dropli">
                <td class="dropli" onclick="checkclick(this.firstChild,1);"><input class="droplic" id="Checkbox12" type="checkbox" onclick="checkclick(this,0);" value="市外"/>市外</td>
            </tr>
        </table>
    </div>
</body>
<script>//--设置及渲染部分--

    //设置顶部筛选窗体的有无
    document.getElementById( "headBox" ).style.display = ( url.indexOf( "hz" ) > -1 ? "none" : "block" );
    //设置顶部筛选部件的展开
    document.getElementById( "topBox" ).style.display = ( topShow ? "block" : "none" );
    document.getElementById( "topu" ).style.display = ( topShow ? "block" : "none" );
    document.getElementById( "topd" ).style.display = ( !topShow ? "block" : "none" );
    //渲染筛选部件组
    $( "#only187" ).attr( "lay-skin", "primary");
    $( "#only187" ).attr( "lay-filter", "only187" );
    $( "#only187" ).attr( "title", "仅显示187条重点黑臭河流" ); 
    $( "#only35" ).attr( "lay-skin", "primary" );
    $( "#only35" ).attr( "lay-filter", "only35" );
    $( "#only35" ).attr( "title", "仅显示35条重点黑臭河流" ); 
    //设置按钮样式
    $( "#Button1" ).addClass( "layui-btn layui-btn-normal" );
    $( "#Button2" ).addClass( "layui-btn layui-btn-small layui-btn-primary" );
    $( "td :submit" ).addClass( "layui-btn layui-btn-radius layui-btn-mini layui-btn-normal" );
    $( "td :button[value='河长']" ).addClass( "layui-btn layui-btn-mini layui-btn-normal" );
    $( "td :button[value='修改']" ).addClass( "layui-btn layui-btn-mini" );
    $( "td :submit[value='确认']" ).removeClass( "layui-btn-radius layui-btn-normal" ).addClass( "layui-btn-danger" );
    $( "td :button[value='取消']" ).addClass( "layui-btn layui-btn-mini layui-btn-primary" );
    $( "td :button[value='详情']" ).addClass( "layui-btn layui-btn-mini layui-btn-normal" );
    $( "td :button[value='定位']" ).addClass( "layui-btn layui-btn-radius layui-btn-mini" );
    //设置排序按钮
    var sortset = $( "#sortSet" )[0].value.split( "-" );
    $( "th a:gt(" + sortset[0] + ")" ).append( '<i style="display:none" class="iconfont icon-sortup"></i>' );
    $( "th a:lt(" + sortset[0] + ")" ).append( '<i style="display:none" class="iconfont icon-sortup"></i>' );
    $( "th a:gt(" + sortset[0] + ")" ).mouseleave( function () { $( this ).children( "i" ).toggle(); } );
    $( "th a:gt(" + sortset[0] + ")" ).mouseenter( function () { $( this ).children( "i" ).toggle(); } );
    $( "th a:lt(" + sortset[0] + ")" ).mouseleave( function () { $( this ).children( "i" ).toggle(); } );
    $( "th a:lt(" + sortset[0] + ")" ).mouseenter( function () { $( this ).children( "i" ).toggle(); } );
    //设置边框
    $( "th a:eq(" + sortset[0] + ")" ).append( '<i class="iconfont icon-sort' + ( sortset[1] == 'ASC' ? "up" : "down" ) + '"></i>' );
    $( "th:eq(" + sortset[0] + ")" ).css( "border-color", "#1bb3a5" );
    $( "th:eq(" + ( sortset[0] * 1 + 1 ) + ")" ).css( "border-color", "#1bb3a5" );
    $( "tr td:nth-child(" + ( sortset[0] * 1 + 1 ) + ")" ).css( "border-color", "#1bb3a5" );
    $( "tr td:nth-child(" + ( sortset[0] * 1 + 2 ) + ")" ).css( "border-color", "#1bb3a5" );
    $( "tr td:first-child" ).css( "border-left-color", "#1bb3a5" );
    $( "tr td:last-child" ).css( "border-right-color", "#1bb3a5" );
    $( "tr th:first-child" ).css( "border-left-color", "#1bb3a5" );
    $( "tr th:last-child" ).css( "border-right-color", "#1bb3a5" );
    //渲染Form模块
    layui.use( 'form', function ()
    {
        var form = layui.form;
        form.render();
    })
    //设置行号
    var len = $( ".rowIndex" ).length;
    for ( var i = 0; i < len; i++ )
    {
        $( "#GridView1_rowIndex_" + i )[0].innerHTML = "&nbsp;&nbsp;" + ( i + 1 ) + "&nbsp;&nbsp;";
    }

    //完成页面设置后展开页面
    $( "#Form1" ).fadeIn("fast");

</script><%----设置部分----%>

<script>//--事件及函数部分--

    //切换顶部菜单的展开状态
    function toplist()
    {
        $( "#topu" ).toggle();
        $( "#topd" ).toggle();
        $( "#topBox" ).slideToggle();
        topShow = !topShow;
        sessionStorage.setItem( "topShow_" + title, topShow );
        //$( "#topd" )[0].style.display = $( "#topd" )[0].style.display == "none" ? "block" : "none";
    }

    //---表单部分---
    //Form筛选部件事件
    layui.use( 'form', function ()
    {
        var form = layui.form;
        //部件检查后点击相应的中转按钮
        form.on( 'checkbox(only187)', function ( data )
        {
            $( "#only35" ).attr( "checked", false );
            $( "#submit1" ).click();
        } );
        form.on( 'checkbox(only35)', function ( data )
        {
            $( "#only187" ).attr( "checked", false );
            $( "#submit1" ).click();
        } );
        form.on( 'select', function ( data )
        {
            $( "#submit1" ).click();
        } );
    } )
    //部件自身检查函数
    function inputObjectId( event )//限制为只可输入为数字
    {
        if ( event.keyCode == 13 )
        {
            event.returnValue = checkObjectId();
        } else
        {
            if ( event.keyCode < 48 || event.keyCode > 57 ) event.returnValue = false;
        }
    }
    function checkObjectId()//焦点离开后检查输入内容
    {
        layui.use( 'layer', function ()
        {
            var layer = layui.layer;
            var d = document.getElementById( "objectidd" );
            var u = document.getElementById( "objectidu" );
            if ( d.value != "" && !( /^\d+$/.test( d.value ) ) )//是否全为数字
            {
                d.value = "";
                showMsg( "请输入数字" );
                return false;
            }
            if ( u.value != "" && !( /^\d+$/.test( u.value ) ) )//是否全为数字
            {
                u.value = "";
                showMsg( "请输入数字" );
                return false;
            }
            if ( d.value == "" || u.value == "" )
            {
                return true;
            }
            else if ( ( d.value * 1 ) < ( u.value * 1 ) )
            {
                return true;
            } else
            {
                d.value = "";
                u.value = "";
                showMsg( "左侧值应小于右侧值" );
                return false;
            }
        } )
    }
    //中转按钮的处理
    $( "#submit1" ).click( function ()
    {
        $( "#Button1" ).click();
        return false;
    } );
    //---表单部分---

    //---下拉多选菜单部分---
    $( "input[name$='$ctl02']" ).focus( function () { $( "input[name$='$ctl02']" )[0].readOnly = true } );
    $( "input[name$='$ctl02']" ).click( function ()
    {
        if ( url.indexOf( "slg_rv_po" ) > -1 )
        {
            var top = $( "input[name$='$ctl02']" ).offset().top;
            var left = $( "input[name$='$ctl02']" ).offset().left;
            var height = $( "input[name$='$ctl02']" ).height();
            var width = $( "input[name$='$ctl02']" ).width() + 2;
            $( "#selectList" ).css( { "position": "absolute", "left": left + 1 + "px", "top": top + height + 4 + "px", "z-index": "100" } );
            $( "#selectList" ).slideDown( "fast" );
            if ( width < 70 )//最小值
            {
                $( ".dropli" ).css( { "width": "70px", "font-size": "13px" } );//70
                $( ".droplic" ).css( { "width": "13px" } );//13
            } else
            {
                $( ".dropli" ).css( { "width": width + "px", "font-size": "13px" } );//100%
                $( ".droplic" ).css( { "width": width * 0.20 + "px" } );//20%
            }
            var val = $( "input[name$='$ctl02']" )[0].value.split( "|" );
            var check = $( "input.droplic" );
            var checked = 0;
            for ( j = 0; j < check.length; j++ )
            {
                checked = 0;
                for ( i = 0; i < val.length; i++ )
                {
                    if ( val[i].indexOf( check[j].value ) > -1 ) checked = 1;
                }
                document.getElementById( "Checkbox" + j ).checked = checked == 1;
            }
        }
    } );
    function HideMList()
    {
        if ( document.getElementById( "selectList" ) != null )
            $( "#selectList" ).slideUp( "fast" );
    }
    function checkclick( ele, flag )
    {
        ele.checked = ele.checked ? false : true;
        if ( flag == 1 )
        {
            var text = "";
            var len = ele.parentNode.parentNode.parentNode.childNodes.length / 2;
            for ( i = 0; i < len; i++ )
            {
                ckbox = document.getElementById( "Checkbox" + i );
                if ( ckbox.checked )
                {
                    text = text + ( text == "" ? ckbox.value : ( "|" + ckbox.value ) );
                }
            }
            $( "input[name$='$ctl02']" )[0].value = text;
        }
    }
    //---下拉多选菜单部分---
    
</script><%----事件及函数部分----%>
</html>
