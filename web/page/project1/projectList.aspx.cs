using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using static tools.quaryData;
using static tools.ConvertJson;
using System.Data;

namespace web.page.project
{
    public partial class projectList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DataSet ds = QuarySde("SELECT OBJECTID,NAME,SYSTEMID,DISTRICT,SEAT_RIVER,LOCATION,EMPLOYER_DEPT,CREATE_PERSON,CREATE_DEPT,CREATE_TIME," +
                "PROPOSAL,FEASIBILITY_STUDY,PRELIMINARY_DESIGN,DETAILED_DESIGN,DESIGN_CHANGE,CALCULATION,SYSTEMNO FROM PROJECT_INFO ORDER BY CREATE_TIME DESC");

            Response.Clear();
            Response.ContentEncoding = Encoding.UTF8;
            Response.ContentType = "application/json";
            Response.Write(ToJson(ds));
            Response.Flush();
            Response.End();
        }
    }
}