using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using static tools.quaryData;

namespace web
{
    public partial class index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Cookies["userId"] == null)
            {
                Response.Write("<script>window.location.href = \"./page/login/Login.aspx\";</script>");
                return;
            }
            string userId = Request.Cookies["userId"].Value;
            string sql = "SELECT * FROM USERLIST WHERE ID = '" + userId + "'";
            DataSet ds = QuaryUser(sql);
            string userPerm = ds.Tables[0].Rows[0]["PERMISSION"].ToString();
            string userByna = ds.Tables[0].Rows[0]["BYNAME"].ToString();
            string userFace = ds.Tables[0].Rows[0]["URLFACE"].ToString();
            addByname(userByna);
            addFace(userFace);

        }
        protected void addByname(string userByna)
        {
            byname1.InnerText = userByna;
            byname2.InnerText = userByna;
        }
        protected void addFace(string userFace)
        {
            face1.Attributes.Add("src", userFace);
            face2.Attributes.Add("src", userFace);
        }

    }
}