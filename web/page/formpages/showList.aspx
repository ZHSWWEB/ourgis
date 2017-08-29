<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="showList.aspx.cs" Inherits="web.page.formpages.showList" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <style type="text/css">
        .dropList {
            left: 11px;
            display: none;
            border: 1px solid Gray;
            background-color: White;
            width: 132px;
            position: absolute;
            height: 200px;
            overflow-y: auto;
            overflow-x: hidden;
            margin-top: -5px;
        }
    </style>
    <script type="text/javascript" src="../../plugins/layui/layui.js"></script>
    <script type="text/javascript">
        function showDetail( objectId, hcmc, table )
        {
            layui.use( 'layer', function ()
            {
                var layer = layui.layer;
                layer.open( {
                    type: 2, title: '#' + objectId + hcmc, shadeClose: true, shade: [0.3],
                    maxmin: false, move: false, area: ['632px', '90%'],
                    content: 'showDetail.aspx?table=' + table + '&&objectId=' + objectId,
                    end: function ()
                    {
                        document.getElementById( "Button2" ).click();
                    }
                } )
            } )
        };
    </script>
    <script type="text/javascript"> 
        var timoutID;
        function ShowMList()
        {
            document.getElementById( "dropList" ).style.display = "block";
        }
        function HideMList()
        {
            if ( document.getElementById( "dropList" ) != null )
                document.getElementById( "dropList" ).style.display = "none";
        }
        function ChangeInfo()
        {
            var ObjectText = "";
            var ObjectValue = "";
            var r = document.getElementsByName( "subBox" );
            for ( var i = 0; i < r.length; i++ )
            {
                if ( r[i].checked )
                { 
                    ObjectText += r[i].nextSibling.nodeValue + "|";
                    ObjectValue += r[i].value + "|";
                }
            }
            ObjectText = ObjectText.substr( 0, ObjectValue.length - 1 );
            ObjectValue = ObjectValue.substr( 0, ObjectValue.length - 1 );
            document.getElementById( "txtBox" ).value = ObjectText;
            document.getElementById( "GridView1_newValue_" + "<%= GridView1.EditIndex %>" ).value = ObjectValue;
        }

        function BodyTr_onload(){
            this.left = document.getElementById( 'headTr' ).left;
        }
    </script>
</head>
<body>
    <form id="Form1" runat="server">
        <%--<asp:SqlDataSource ID="hechongDate" runat="server" ConnectionString="<%$ ConnectionStrings:OracleConnectionString %>" ProviderName="<%$ ConnectionStrings:OracleConnectionString.ProviderName %>" SelectCommand="SELECT OBJECTID,HCMC,HCBM,HCGN,HCFL FROM SLG_RV_po"></asp:SqlDataSource>--%>
        <asp:DropDownList ID="DistrictList" runat="server" AutoPostBack="True" OnSelectedIndexChanged="DistrictList_SelectedIndexChanged" BackColor="#CCCCCC" Font-Italic="False" Font-Names="微软雅黑" Font-Overline="False" Font-Size="Small" Font-Strikeout="False" Height="25px" Width="90px" Style="margin-bottom: 7px;"></asp:DropDownList>
        <asp:TextBox ID="TextBox1" runat="server" Height="16px" Width="146px" Style="margin-bottom: 10px;" Font-Names="微软雅黑" Font-Size="Small" MaxLength="100"></asp:TextBox>
        <asp:DropDownList ID="SearchList" runat="server" AutoPostBack="True" OnSelectedIndexChanged="SearchList_SelectedIndexChanged" BackColor="#CCCCCC" Font-Italic="False" Font-Names="微软雅黑" Font-Overline="False" Font-Size="Small" Font-Strikeout="False" Height="25px" Width="90px" Style="margin-bottom: 7px;"></asp:DropDownList>
        <asp:Button ID="Button1" runat="server" Text="查询" OnClick="Button1_Click" Height="24px" Width="50px" Style="margin-bottom: 8px;" Font-Names="微软雅黑" Font-Size="Small" BackColor="#CCCCCC"/>
        <asp:Button ID="Button2" runat="server" OnClick="Button2_Click" Style="height:0;width:0;padding-left:0;padding:0 0;border-left-width:0;border-right-width:0;border-top-width:0;border-bottom-width:0;"/>
        
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" AllowSorting="True" AllowPaging="True" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" ForeColor="Black" GridLines="Vertical" PageSize="25" Width="100%" EmptyDataText="暂缺"
            OnRowEditing="GridView1_RowEditing" OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowUpdating="GridView1_RowUpdating" OnRowDeleting="GridView1_RowDeleting" OnPageIndexChanging="GridView1_PageIndexChanging" OnRowDataBound="GridView1_RowDataBound" OnRowCommand="GridView1_RowCommand" OnSorting="GridView1_Sorting">
            <AlternatingRowStyle BackColor="White" />
            <Columns>
                <asp:TemplateField runat="server" HeaderText="选择">
                    <ItemTemplate>
                        <asp:CheckBox ID="ChkItem" runat="server" Width="40px" />
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" Width="40px" />
                </asp:TemplateField>

                <asp:TemplateField runat="server" HeaderText="行政区">
                    <ItemTemplate>
                        <asp:Label runat="server" Text= '<%# DataBinder.Eval(Container.DataItem,"XZQ")%>'>></asp:Label>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" Width="50px" />
                    <EditItemTemplate>
                        <div id="dropCheckBox" onmouseover="clearTimeout(timoutID);" onmouseout="timoutID = setTimeout('HideMList()', 250);">
                            <table width="150px">
                                <tr id="headTr">
                                    <td align="left">
                                        <asp:HiddenField id="newValue" runat="server"></asp:HiddenField>
                                        <input id="txtBox" type="text" value="<%=nameList %>" readonly="readonly" onclick="ShowMList()"
                                            style="width: 130px;" />
                                    </td>
                                    <%--<td align="left" valign="middle"><a href="#" onclick="ShowMList()" >选择</a></td> --%>
                                </tr>
                                <tr id="bodyTr" style="color: #454B5A; font-family:Arial; font-size:14px;font-weight:lighter" onload="BodyTr_onload();">
                                    <td colspan="2">
                                        <div id="dropList" class="dropList">
                                            <%=checkList%>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </EditItemTemplate>
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
                    CommandName="Page" Visible='<%# ((GridView)Container.NamingContainer).PageIndex != 0 %>' Text="上一页"></asp:Button>
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
</body>
</html>
