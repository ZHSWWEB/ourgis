<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="showDetail.aspx.cs" Inherits="web.page.formpages.showDetail" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="plugins/layui/css/layui.css" rel="stylesheet" />
    <link href="formstyle.css" rel="stylesheet" />
    <script src="../../js/jquery.js"></script>
    <script type="text/javascript" src="plugins/layui/layui.all.js"></script>
    <script>
        var url = window.location.href;
        var timoutID;
    </script>
</head>
<body>
    <div id="dataPart" style="display: none">
        <form id="form1" runat="server">
            <asp:DetailsView ID="DetailsView1" runat="server" BackColor="#CCCCCC" BorderColor="#999999" BorderStyle="Solid" BorderWidth="3px" CellPadding="4" CellSpacing="2" ForeColor="Black" Height="100%" Width="600px" AutoGenerateRows="False" Font-Bold="True"
                OnModeChanging="DetailsView1_ModeChanging" OnItemUpdating="DetailsView1_ItemUpdating" OnItemCommand="DetailsView1_ItemCommand">
                <EditRowStyle BackColor="White" Font-Bold="True" ForeColor="Black" />
                <Fields></Fields>
                <FooterStyle BackColor="#CCCCCC" />
                <HeaderStyle BackColor="Black" Font-Bold="True" ForeColor="White" />
                <PagerStyle BackColor="#CCCCCC" ForeColor="Black" HorizontalAlign="Left" />
                <RowStyle BackColor="White" HorizontalAlign="Center" />
            </asp:DetailsView>
            <div id="headDiv" runat="server"></div>
        </form>
        <div id='selectList' class="dropli" style="display: none" onmouseover="clearTimeout(timoutID);" onmouseout="timoutID = setTimeout('HideMList()', 250);">
            <table class="dropli" style="background-color: #31b7ab">
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox0" type="checkbox" onclick="checkclick( this, 0 );" value="白云区" />白云区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox1" type="checkbox" onclick="checkclick( this, 0 );" value="从化区" />从化区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox2" type="checkbox" onclick="checkclick( this, 0 );" value="番禺区" />番禺区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox3" type="checkbox" onclick="checkclick( this, 0 );" value="海珠区" />海珠区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox4" type="checkbox" onclick="checkclick( this, 0 );" value="花都区" />花都区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox5" type="checkbox" onclick="checkclick( this, 0 );" value="黄埔区" />黄埔区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox6" type="checkbox" onclick="checkclick( this, 0 );" value="荔湾区" />荔湾区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox7" type="checkbox" onclick="checkclick( this, 0 );" value="南沙区" />南沙区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox8" type="checkbox" onclick="checkclick( this, 0 );" value="天河区" />天河区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox9" type="checkbox" onclick="checkclick( this, 0 );" value="越秀区" />越秀区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox10" type="checkbox" onclick="checkclick( this, 0 );" value="增城区" />增城区</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox11" type="checkbox" onclick="checkclick( this, 0 );" value="市属" />市属</td>
                </tr>
                <tr class="dropli">
                    <td class="dropli" onclick="checkclick(this.firstChild,1);">
                        <input class="droplic" id="Checkbox12" type="checkbox" onclick="checkclick( this, 0 );" value="市外" />市外</td>
                </tr>
            </table>
        </div>
    </div>
</body>
<script>
    $( "#DetailsView1" ).css( "margin-left", "7px" )
    $( "td :button[value='修改']" ).addClass( "layui-btn layui-btn-small" );
    $( "td :submit[value='确认']" ).removeClass( "layui-btn-radius layui-btn-normal" ).addClass( "layui-btn-danger" );
    $( "td :button[value='取消']" ).addClass( "layui-btn layui-btn-small layui-btn-primary" );
    $( "td :button[value='返回']" ).addClass( "layui-btn layui-btn-small layui-btn-normal" );
    $( "input[name$='$ctl03']" ).click( function ()
    {
        if ( url.indexOf( "slg_rv_po" ) > -1 )
        {
            var top = $( "input[name$='$ctl03']" ).offset().top;
            var left = $( "input[name$='$ctl03']" ).offset().left;
            var height = $( "input[name$='$ctl03']" ).height();
            var width = $( "input[name$='$ctl03']" ).width() + 2;
            $( "#selectList" ).css( { "position": "absolute", "left": left + 1 + "px", "top": top + height + 5 + "px", "z-index": "100" } );
            $( "#selectList" ).slideDown( "fast" );
            if ( width < 70 )//最小值
            {
                $( ".dropli" ).css( { "width": "70px", "font-size": "13px" } );//70
                $( ".droplic" ).css( { "width": "13px" } );//13
            } else
            {
                $( ".dropli" ).css( { "width": width + "px", "font-size": "13px" } );//100%
                $( ".droplic" ).css( { "width": width * 0.30 + "px" } );//20%
            }
            var val = $( "input[name$='$ctl03']" )[0].value.split( "|" );
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
            $( "input[name$='$ctl03']" )[0].value = text;
        }
    }
    $( "#dataPart" ).fadeIn();
</script>
</html> 
