using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static tools.quaryData;

namespace web.page.user
{
    public partial class userManager : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string userId = Request.Cookies["userId"].Value;
            if (userId == null)
            {
                //Response.Write("<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('用户未登录', {icon: 5,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>");
                Response.Write("<script>window.location.href = \"../notLogin.html\";</script>");
                return;
            }
            string permissinsql = "SELECT USERCHANGE FROM PERMISSION WHERE USERID = " + userId;
            DataSet userPerinfo = QuaryUser(permissinsql);
            bool canLoad = false;
            if (userPerinfo.Tables[0].Rows.Count > 0)
            {
                int userchange = Convert.ToInt32(userPerinfo.Tables[0].Rows[0]["USERCHANGE"].ToString());
                if (userchange == 1)
                    canLoad = true;
            }
            if (canLoad == false)
            {
                //Response.Write("<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('没有用户管理权限', {icon: 5,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>");
                Response.Write("<script>window.location.href = \"../noPermission.html\";</script>");
                return;
            }

            string deleteidstr = Request.QueryString["deleteid"];
            if (deleteidstr != null)
            {
                //删除头像
                string sql = "SELECT URLFACE FROM USERLIST WHERE ID = " + deleteidstr;
                DataSet ds = QuaryUser(sql);
                string oldPathname = Server.MapPath(ds.Tables[0].Rows[0]["URLFACE"].ToString());
                if (File.Exists(oldPathname) && ds.Tables[0].Rows[0]["URLFACE"].ToString() != "./images/logo.jpg")
                    File.Delete(oldPathname);

                sql = "DELETE FROM USERLIST WHERE ID = " + deleteidstr;
                OperateUser(sql);
                sql = "DELETE FROM PERMISSION WHERE USERID = " + deleteidstr;
                OperateUser(sql);
                Response.Write("<script>window.location.href = \"userManager.aspx\";</script>");
                return;
            }

            string activeidstr = Request.QueryString["activeid"];
            if (activeidstr != null)
            {
                string quarysql = "SELECT ACTIVE FROM USERLIST WHERE ID = " + activeidstr;
                DataSet actdata = QuaryUser(quarysql);
                string newact = actdata.Tables[0].Rows[0]["ACTIVE"].ToString();
                if (newact == "0")
                    newact = "1";
                else newact = "0";
                string sql = "UPDATE USERLIST SET ACTIVE=" + newact + " WHERE ID = " + activeidstr;
                OperateUser(sql);
                Response.Write("<script>window.location.href = \"userManager.aspx\";</script>");
                return;
            }

            string resetpwdidstr = Request.QueryString["resetpwdid"];
            if (resetpwdidstr != null)
            {
                string sql = "UPDATE USERLIST SET PASSWORD= '123456'" + " WHERE ID = " + resetpwdidstr;
                OperateUser(sql);
                Response.Write("<script>window.location.href = \"userManager.aspx\";</script>");
                return;
            }
        }
    }
}