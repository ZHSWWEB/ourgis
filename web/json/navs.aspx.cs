using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;
using static tools.quaryData;


namespace web.json
{
    public partial class navs : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Cookies["userId"] != null)
            {
                string userId = Request.Cookies["userId"].Value;
                DataSet ds = QuaryUser("SELECT * FROM PERMISSION WHERE USERID = " + userId);
                DataTable dt = ds.Tables[0];
                string sql = "SELECT * FROM [navs$] WHERE show = 1";
                DataSet nds = QuaryExcel(sql);
                DataTable ndt = nds.Tables[0];
                string json = "[";
                for (int i = 0; i < ndt.Rows.Count; i++)
                {
                    if (Convert.ToString(ndt.Rows[i]["permissionName"]) != "" && dt.Rows[0][Convert.ToString(ndt.Rows[i]["permissionName"])].ToString() == "0")
                    {
                        if (i == ndt.Rows.Count - 1)
                        {
                            json = json.Remove(json.Length - 1, 1);
                        }
                        continue;
                    }
                    if (Convert.ToString(ndt.Rows[i]["isChild"]) == "")
                    {
                        json = json + "{\"title\":\"" + ndt.Rows[i]["title"] + "\",\"icon\":\"" + ndt.Rows[i]["icon"] + "\",\"href\":\"" + ndt.Rows[i]["href"] + "\",\"spread\":false}" + (i < ndt.Rows.Count - 1 ? "," : "");
                    }
                    else if (Convert.ToString(ndt.Rows[i]["isChild"]) == "0")
                    {
                        json = json + "{\"title\":\"" + ndt.Rows[i]["title"] + "\",\"icon\":\"" + ndt.Rows[i]["icon"] + "\",\"href\":\"" + ndt.Rows[i]["href"] + "\",\"spread\":false,\"children\":[";
                    }
                    else//"isChild" == "1"
                    {
                        json = json + "{\"title\":\"" + ndt.Rows[i]["title"] + "\",\"icon\":\"" + ndt.Rows[i]["icon"] + "\",\"href\":\"" + ndt.Rows[i]["href"] + "\",\"spread\":false}";
                        if (i < ndt.Rows.Count - 1)
                        {
                            json = json + (Convert.ToString(ndt.Rows[i + 1]["isChild"]) == "1" ? "," : "]},");
                        }
                        else
                        {
                            json = json + "]}";
                        }
                    }
                }
                json = json + "]";

                Response.Clear();
                Response.ContentEncoding = Encoding.UTF8;
                Response.ContentType = "application/json";

                Response.Write(json);
                Response.Flush();
                Response.End();
            }
        }
    }
}