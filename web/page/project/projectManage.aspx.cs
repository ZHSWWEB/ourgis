using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static tools.quaryData;

namespace web.page.project
{
    public partial class projectManage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string userId = Request.Cookies["userId"].Value;
            if (userId == null)
            {
                Response.Write("<script>window.location.href = \"../notLogin.html\";</script>");
                return;
            }
            string permissinsql = "SELECT PROJECT FROM PERMISSION WHERE USERID = " + userId;
            DataSet userPerinfo = QuaryUser(permissinsql);
            bool canLoad = false;
            if (userPerinfo.Tables[0].Rows.Count > 0)
            {
                int projectpermission = Convert.ToInt32(userPerinfo.Tables[0].Rows[0]["PROJECT"].ToString());
                if (projectpermission >= 1)
                    canLoad = true;
            }
            if (canLoad == false)
            {
                Response.Write("<script>window.location.href = \"../noPermission.html\";</script>");
                return;
            }
        }
    }
}