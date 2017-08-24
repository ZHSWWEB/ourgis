using System;
using System.Data;
using System.Text;
using static tools.quaryData;
using static tools.ConvertJson;

namespace web.json
{
    public partial class userList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DataSet ds = QuaryUser("SELECT * FROM USERLIST ORDER BY DEPARTMENT DESC");

            Response.Clear();
            Response.ContentEncoding = Encoding.UTF8;
            Response.ContentType = "application/json";
            Response.Write(ToJson(ds));
            Response.Flush();
            Response.End();
        }
    }
}