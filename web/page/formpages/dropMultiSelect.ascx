<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="dropMultiSelect.ascx.cs" Inherits="web.page.formpages.dropMultiSelect" %>           
<style type="text/css">
    .dropList {
        left:11px;
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
<script type="text/javascript"> 
    var timoutID;
    function ShowMList() {
        document.getElementById( "dropList" ).style.display = "block";
        document.getElementById( "dropListClose" ).style.display = "block";
   }
   function HideMList() {
        if ( document.getElementById( "dropList" ) != null )
        document.getElementById( "dropList" ).style.display = "none";
        document.getElementById( "dropListClose" ).style.display = "none";
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
                ObjectValue += r[i].value + ",";
                ObjectText += r[i].nextSibling.nodeValue + ",";
            }
        }
        document.getElementById( "txtBox" ).value = ObjectText;
        $( "#newValue" ).val = ObjectValue;

    }
</script> 
<div id="dropCheckBox" onmouseover="clearTimeout(timoutID);" onmouseout="timoutID = setTimeout('HideMList()', 250);"> 
    <table width="150px"> 
        <tr> 
            <td align="left"> 
               <asp:HiddenField ID="newValue" runat="server" OnValueChanged="newValue_ValueChanged"></asp:HiddenField>
                <input id="txtBox" type="text" value="<%=nameList %>" readonly="readonly" onclick="ShowMList()" 
                    style="width: 130px;" /> 
            </td> 
            <%--<td align="left" valign="middle"> 
                <a href="#" onclick="ShowMList()" >选择</a> 
            </td> --%>
        </tr> 
        <tr> 
            <td colspan="2"> 
                <div id="dropList" class="dropList"> 
                    <%=checkList%> 
                </div> 
                <div id="dropListClose"> 
                    &nbsp; 
                </div> 
            </td> 
        </tr> 
    </table> 
</div> 