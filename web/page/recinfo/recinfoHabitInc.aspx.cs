using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static tools.quaryData;

namespace web.page.recinfo
{
    public partial class recinfoHabitInc : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string type = Request.QueryString["type"];
            if (type != null)
            {
                string typestr = string.Empty;
                if (type == "河流")
                    typestr = "RIVER";
                if (type == "湖泊")
                    typestr = "LAKE";
                if (type == "水库")
                    typestr = "RESERVOIR";
                if (type == "堤防")
                    typestr = "DIKE";
                if (type == "泵站")
                    typestr = "PUMP";
                if (type == "水闸")
                    typestr = "SLUICE";
                string sql = "UPDATE REC_HABIT SET " + typestr + "=" + typestr + "+1";
                OperateUser(sql);
            }
            Response.Write("<script> window.close();</script>");
        }
    }
}