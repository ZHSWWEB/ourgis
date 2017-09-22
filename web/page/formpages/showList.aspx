<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="showList.aspx.cs" Inherits="web.page.formpages.showList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link rel="stylesheet" href="../../fonts/iconfont.css" media="all" />
    <%--<link href="plugins/layui/css/layui.css" rel="stylesheet" />--%>
    <link href="formstyle.css" rel="stylesheet" />
    <%--引入jquery将导致弹窗失败--%>
    <script src="../../js/jquery.js"></script>
    <script type="text/javascript" src="plugins/layui/layui.all.js"></script>
    <script type="text/javascript">
        function showDetail( objectId, hcmc, table )
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
        function showHz( hzcd, hcmc, table )
        {
            layui.use( 'layer', function ()
            {
                var layer = layui.layer;
                layer.open( {
                    type: 2, title: hcmc, shadeClose: true, shade: [0.3],
                    maxmin: false, move: false, area: ['90%', '40%'], scrollbar: false,
                    content: 'showList.aspx?table=' + table + '&&hzcd=' + hzcd
                } )
            } )
        };
        var url = window.location.href;
        var timoutID;
        var curmenu = JSON.parse( sessionStorage.getItem( "curmenu" ) );
        var title = curmenu.title;
        var topShow = sessionStorage.getItem( "topShow_" + title );
        if ( topShow == null )//首次打开
        {
            sessionStorage.setItem( "topShow_" + title ,true);
            topShow = true;
        } else
        {
            topShow = ( topShow == "true" );
        }
    </script>
</head>
<body>
    <form id="Form1" runat="server">
        <div id="headBox" style="display: block">
            <div id="topBox" style="display: none">
                <div>
                    <asp:Label runat="server" for="DistrictList" ID="lDistrictList">行政区：</asp:Label>
                    <asp:DropDownList ID="DistrictList" runat="server" AutoPostBack="True" OnSelectedIndexChanged="DistrictList_SelectedIndexChanged" BackColor="#CCCCCC" Font-Italic="False" Font-Names="微软雅黑" Font-Overline="False" Font-Size="Small" Font-Strikeout="False" Height="25px" Width="70px" Style="margin-bottom: 7px"></asp:DropDownList>
                    <asp:Label runat="server" for="set1368" ID="lset1368">&nbsp;&nbsp;&nbsp;&nbsp;1368条河流：</asp:Label>
                    <asp:DropDownList ID="set1368" runat="server" AutoPostBack="True" OnSelectedIndexChanged="set1368_SelectedIndexChanged" BackColor="#CCCCCC" Font-Italic="False" Font-Names="微软雅黑" Font-Overline="False" Font-Size="Small" Font-Strikeout="False" Height="25px" Width="70px" Style="margin-bottom: 7px">
                        <asp:ListItem Value="" Selected="True">全部</asp:ListItem>
                        <asp:ListItem Value="F1368 > 0 AND ">仅1368</asp:ListItem>
                        <asp:ListItem Value="F1368 = 0 AND ">非1368</asp:ListItem>
                    </asp:DropDownList>
                    &nbsp;&nbsp;&nbsp;&nbsp;数据ID：<asp:TextBox ID="objectidd" runat="server" Width="60px" onkeypress="inputObjectId(event)" onblur="checkObjectId()"></asp:TextBox>
                    &#126;&nbsp;<asp:TextBox ID="objectidu" runat="server" Width="60px" onkeypress="inputObjectId(event)" onblur="checkObjectId()"></asp:TextBox>
                </div>
                <div>
                    <asp:CheckBox ID="only187" runat="server" AutoPostBack="True" Text="仅显示187条重点黑臭河流" OnCheckedChanged="only187_CheckedChanged" />
                    <asp:CheckBox ID="only35" runat="server" AutoPostBack="True" Text="仅显示35条重点黑臭河流" OnCheckedChanged="only35_CheckedChanged" />
                </div>
            </div>
            <hr style="margin-bottom: 0; margin-top: 2px; height: 2px" onclick="toplist()" />
            <div style="height: 8px; text-align: center" onclick="toplist()">
                <i id="topu" style="font-size: 22px; display: none" class="iconfont icon-shang"></i>
                <i id="topd" style="font-size: 22px; display: block" class="iconfont icon-xia"></i>
            </div>
        </div>
        
        <asp:TextBox ID="TextBox1" runat="server" Height="16px" Width="146px" Style="margin-bottom: 10px;" Font-Names="微软雅黑" Font-Size="Small" MaxLength="100"></asp:TextBox>
        <asp:DropDownList ID="SearchList" runat="server" AutoPostBack="True" OnSelectedIndexChanged="SearchList_SelectedIndexChanged" BackColor="#CCCCCC" Font-Italic="False" Font-Names="微软雅黑" Font-Overline="False" Font-Size="Small" Font-Strikeout="False" Height="25px" Width="90px" Style="margin-bottom: 7px;"></asp:DropDownList>
        <asp:Button ID="Button1" runat="server" Text="查询" OnClick="Button1_Click" Style="margin-bottom: 5px;" Font-Names="微软雅黑" Font-Size="Small"/>
        <asp:Button ID="Button2" runat="server" OnClick="Button2_Click" Style="height:0;width:0;padding-left:0;padding:0 0;border-left-width:0;border-right-width:0;border-top-width:0;border-bottom-width:0;"/>

        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" AllowSorting="True" AllowPaging="True" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" ForeColor="Black" GridLines="Vertical" PageSize="20" Width="100%" EmptyDataText="暂缺"
            OnRowEditing="GridView1_RowEditing" OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowUpdating="GridView1_RowUpdating" OnRowDeleting="GridView1_RowDeleting" OnPageIndexChanging="GridView1_PageIndexChanging" OnRowDataBound="GridView1_RowDataBound" OnRowCommand="GridView1_RowCommand" OnSorting="GridView1_Sorting">
            <AlternatingRowStyle BackColor="White" />
            <Columns>
                <asp:TemplateField HeaderText="行号">
                    <ItemTemplate>
                        <asp:Label ID="rowIndex" class="rowIndex" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
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
    </form>
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
<script> 
    document.getElementById( "headBox" ).style.display = ( url.indexOf( "hz" ) > -1 ? "none" : "block" );
    document.getElementById( "topBox" ).style.display = ( topShow ? "block" : "none" );
    document.getElementById( "topu" ).style.display = ( topShow ? "block" : "none" );
    document.getElementById( "topd" ).style.display = ( !topShow ? "block" : "none" );
    //设置样式
    $( "#Button1" ).addClass( "layui-btn layui-btn-small layui-btn-normal" )
    $( "td :submit" ).addClass( "layui-btn layui-btn-radius layui-btn-mini layui-btn-normal" );
    $( "td :button[value='河长']" ).addClass( "layui-btn layui-btn-mini layui-btn-normal" );
    $( "td :button[value='修改']" ).addClass( "layui-btn layui-btn-mini" );
    $( "td :submit[value='确认']" ).removeClass( "layui-btn-radius layui-btn-normal" ).addClass( "layui-btn-danger" );
    $( "td :button[value='取消']" ).addClass( "layui-btn layui-btn-mini layui-btn-primary" );
    $( "td :button[value='详情']" ).addClass( "layui-btn layui-btn-mini layui-btn-normal" );
    $( "td :button[value='定位']" ).addClass( "layui-btn layui-btn-radius layui-btn-mini" );
    function loadRowIndex()
    {
        var len = $( ".rowIndex" ).length;
        for ( var i = 0; i < len; i++ )
        {
            $( "#GridView1_rowIndex_" + i )[0].innerHTML = "&nbsp;&nbsp;" + ( i + 1 ) + "&nbsp;&nbsp;";
        }
    }
    //写入行号
    loadRowIndex();

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
    function toplist()
    {
        $( "#topu" ).toggle();
        $( "#topd" ).toggle();
        $( "#topBox" ).slideToggle();
        topShow = !topShow;
        sessionStorage.setItem( "topShow_" + title, topShow );
        //$( "#topd" )[0].style.display = $( "#topd" )[0].style.display == "none" ? "block" : "none";
    }
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
    function checkObjectId()
    {
        var d = document.getElementById( "objectidd" );
        var u = document.getElementById( "objectidu" );
        if ( d.value != "" && !( /^\d+$/.test( d.value ) ) )//是否全为数字
        {
            d.value = "";
            alert( "请输入数字" );
            return false;
        }
        if ( u.value != "" && !( /^\d+$/.test( u.value ) ) )//是否全为数字
        {
            u.value = "";
            alert( "请输入数字" );
            return false;
        }
        if ( d.value == "" || u.value == "" )
        {
            return true;
        }
        else if ( d.value < u.value )
        {
            return true;
        } else
        {
            d.value = "";
            u.value = "";
            alert( "左侧值应小于右侧值" );
            return false;
        }
    }
</script>
</html>
