using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static tools.quaryData;

namespace web.page.recinfo
{
    public partial class recinfoHabit : System.Web.UI.Page
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
            string permissinsql = "SELECT HABIT FROM PERMISSION WHERE USERID = " + userId;
            DataSet userPerinfo = QuaryUser(permissinsql);
            bool canLoad = false;
            if (userPerinfo.Tables[0].Rows.Count > 0)
            {
                int userchange = Convert.ToInt32(userPerinfo.Tables[0].Rows[0]["HABIT"].ToString());
                if (userchange == 1)
                    canLoad = true;
            }
            if (canLoad == false)
            {
                //Response.Write("<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('没有权限', {icon: 5,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>");
                Response.Write("<script>window.location.href = \"../noPermission.html\";</script>");
                return;
            }
        }
    }
}