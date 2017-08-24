<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="showDetail.aspx.cs" Inherits="web.page.formpages.showDetail" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script type="text/javascript" src="../../plugins/layui/layui.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:DetailsView ID="DetailsView1" runat="server" BackColor="#CCCCCC" BorderColor="#999999" BorderStyle="Solid" BorderWidth="3px" CellPadding="4" CellSpacing="2" ForeColor="Black" Height="100%" Width="600px" AutoGenerateRows="False" Font-Bold="True"
            OnModechanging="DetailsView1_ModeChanging" OnItemUpdating="DetailsView1_ItemUpdating" OnItemCommand="DetailsView1_ItemCommand">
            <EditRowStyle BackColor="White" Font-Bold="True" ForeColor="Black" />
            <Fields>
                <%--<asp:BoundField DataField="OBJECTID" HeaderText="OBJECTID"  HeaderStyle-BackColor="#CCCCCC" ReadOnly ="true" HeaderStyle-Width="40%"  >
<HeaderStyle BackColor="#CCCCCC" Width="40%"></HeaderStyle>
                </asp:BoundField>--%>
               <%-- <asp:BoundField DataField="HCMC" HeaderText="河涌名称"  HeaderStyle-BackColor="#CCCCCC" ><HeaderStyle BackColor="#CCCCCC"></HeaderStyle></asp:BoundField>--%>
               
                <%--<asp:CommandField ShowEditButton="True" UpdateText="确定" ButtonType="Button" />
                <asp:CommandField ShowDeleteButton="True" DeleteText="返回" ButtonType="Button" />--%>
            </Fields>
            <FooterStyle BackColor="#CCCCCC" />
            <HeaderStyle BackColor="Black" Font-Bold="True" ForeColor="White" />
            <PagerStyle BackColor="#CCCCCC" ForeColor="Black" HorizontalAlign="Left" />
            <RowStyle BackColor="White" HorizontalAlign="Center" />
        </asp:DetailsView>
        <div id="headDiv" runat="server"></div>
    </form>

</body>
</html> 
