<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="testDrop.aspx.cs" Inherits="web.page.formpages.testDrop" %>
<%@ Register Src="DropMultiSelect.ascx" TagName="CheckboxListControl" TagPrefix="uc1" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head runat="server">
    <title></title>
    <script src="../../js/jquery.js"></script>
</head>
<body>
    <form id="form2" runat="server">
        <uc1:CheckboxListControl ID="dropMSelect" runat="server" />
    </form>
</body>
</html>
