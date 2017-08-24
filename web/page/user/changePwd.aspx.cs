using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static tools.quaryData;

namespace web.page.user
{
    public partial class changePwd : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string userName = string.Empty;
            string querysql = "SELECT NAME,PASSWORD FROM USERLIST WHERE ID=" + Request.Cookies["userId"].Value;
            DataSet ds = QuaryUser(querysql);
            if (ds.Tables[0].Rows.Count == 0)
            {
                chpwdendDiv.InnerHtml = "<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('没有此用户', {icon: 5,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>";
                return;
            }
            userName = ds.Tables[0].Rows[0]["NAME"].ToString();
            userNameDiv.InnerHtml = "<input type=\"text\" value=\""+ userName + "\" disabled class=\"layui-input layui-disabled\" />";

            string oldPassword = Request.QueryString["oldpwd"];
            string newPassword = Request.QueryString["newpwd"];
            string confirmPassword = Request.QueryString["confirmpwd"];
            if (oldPassword != null && newPassword != null && newPassword != null)
            {
                if (oldPassword != ds.Tables[0].Rows[0]["PASSWORD"].ToString())
                {
                    chpwdendDiv.InnerHtml = "<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('原密码错误', {icon: 5,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>";
                    return;
                }
                if (newPassword != confirmPassword)
                {
                    chpwdendDiv.InnerHtml = "<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('两次输入密码不一致', {icon: 5,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>";
                    return;
                }
                string setsql = "UPDATE USERLIST SET PASSWORD = '"+ newPassword + "' WHERE NAME = '" + userName + "'";
                OperateUser(setsql);
                chpwdendDiv.InnerHtml = "<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('修改成功', {icon: 6,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>";
            }
        }
    }
}