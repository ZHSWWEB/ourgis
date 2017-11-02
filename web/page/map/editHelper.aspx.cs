using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;
using static tools.quaryData;

namespace web.page.map
{
    public partial class editHelper : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string user = Request.Cookies["userId"].Value;
            string table = Request["table"];
            string objectid = Request["objectid"];
            string method = Request["method"];
            DataSet ds = QuaryUser("SELECT BYNAME,DEPARTMENT FROM USERLIST WHERE ID=" + user);
            string byname = Convert.ToString(ds.Tables[0].Rows[0][0]);
            string department = Convert.ToString(ds.Tables[0].Rows[0][1]);
            string now = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            if (method == "delete")
            {
                OperateSde("UPDATE " + table + " SET SCZT=1,SCR='" + byname + "',SCBM='" + department + "',SCRQ=to_date('" + now + "', 'yyyy-mm-dd hh24:mi:ss') where objectid=" + objectid);
            }
            else
            {
                OperateSde("UPDATE " + table + " SET XGR='" + byname + "',XGBM='" + department + "',XGRQ=to_date('" + now + "', 'yyyy-mm-dd hh24:mi:ss') where objectid=" + objectid);
            }

            Response.Clear();
            Response.ContentEncoding = Encoding.UTF8;
            Response.Write(user +table+ objectid + method); 
            Response.Flush();
            Response.End();
        }
    }
}