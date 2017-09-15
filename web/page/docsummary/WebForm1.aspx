<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="web.page.docsummary.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:TextBox ID="TextBox1" runat="server" Height="16px" Width="146px" Style="margin-bottom: 10px;" Font-Names="微软雅黑" Font-Size="Small" MaxLength="100"></asp:TextBox>
        <asp:DropDownList ID="SearchList" runat="server" AutoPostBack="True" OnSelectedIndexChanged="SearchList_SelectedIndexChanged" BackColor="#CCCCCC" Font-Italic="False" Font-Names="微软雅黑" Font-Overline="False" Font-Size="Small" Font-Strikeout="False" Height="25px" Width="90px" Style="margin-bottom: 7px;"></asp:DropDownList>
        <asp:Button ID="Button1" runat="server" Text="查询" OnClick="Button1_Click" Height="24px" Width="50px" Style="margin-bottom: 8px;" Font-Names="微软雅黑" Font-Size="Small" BackColor="#CCCCCC"/>
        
    </form>
</body>
</html>
