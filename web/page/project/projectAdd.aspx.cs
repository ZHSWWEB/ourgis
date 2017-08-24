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
    public partial class projectAdd : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string userIdstr = Request.Cookies["userId"].Value;
            if (userIdstr == null)
            {
                Response.Write("<script>window.location.href = \"../notLogin.html\";</script>");
                return;
            }
            string permissinsql = "SELECT PROJECT FROM PERMISSION WHERE USERID = " + userIdstr;
            DataSet userPerinfo = QuaryUser(permissinsql);
            bool canLoad = false;
            if (userPerinfo.Tables[0].Rows.Count > 0)
            {
                int projectpermission = Convert.ToInt32(userPerinfo.Tables[0].Rows[0]["PROJECT"].ToString());
                if (projectpermission == 2)
                    canLoad = true;
            }
            if (canLoad == false)
            {
                Response.Write("<script>window.location.href = \"../noPermission.html\";</script>");
                return;
            }

            string projectNO = Request.QueryString["projectNO"];
            if (projectNO == null)
            {
                return;
            }
            if (CheckProjectNOValid(projectNO) == false)
            {
                LayuiMsg("创建项目失败，已存在相同项目编号！");
                return;
            }
            
            string projectName = Request.QueryString["projectName"];
            string projectDistrict = Request.QueryString["projectDistrict"];
            string projectRiver = Request.QueryString["projectRiver"];
            string projectLocation = Request.QueryString["projectLocation"];
            string projectEmployer = Request.QueryString["projectEmployer"];

            SaveProject(projectNO, projectName, projectDistrict, projectRiver, projectLocation, projectEmployer, userIdstr);
            LayuiMsg("创建项目成功");
            //Response.Write("<script>window.location.href = \"projectManage.aspx\";</script>");
        }

        protected void LayuiMsg(string msg)
        {
            endAddProjectDiv.InnerHtml = "<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('" + msg + "', {icon: 7,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>";
        }

        protected bool CheckProjectNOValid(string prono)
        {
            string sql = "SELECT SYSTEMNO FROM PROJECT_INFO WHERE SYSTEMNO = '" + prono +"'";
            DataSet ds = QuarySde(sql);

            if (ds.Tables[0].Rows.Count > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        protected void SaveProject(string prono, string proname, string prodistrict, string proriver, string prolocation, string proemployer, string userid)
        {
            string sqlstr = "SELECT SYSTEMID FROM PROJECT_INFO ORDER BY SYSTEMID DESC";
            DataSet ds1 = QuarySde(sqlstr);
            Int32 newSysId = Convert.ToInt32(ds1.Tables[0].Rows[0][0].ToString()) + 1;

            sqlstr = "SELECT BYNAME,DEPARTMENT FROM USERLIST WHERE ID = " + userid;
            DataSet ds2 = QuaryUser(sqlstr);
            string userByname = ds2.Tables[0].Rows[0]["BYNAME"].ToString();
            string userDept = ds2.Tables[0].Rows[0]["DEPARTMENT"].ToString();
            string procreatetime = DateTime.Now.ToLocalTime().ToString();

            sqlstr = "UPDATE PROJECT_INFO SET SYSTEMID = "+ newSysId + ",SYSTEMNO = '" + prono + "',NAME = '" + proname +
                        "',DISTRICT = '" + prodistrict + "',SEAT_RIVER = '" + proriver + "',LOCATION = '" + prolocation +
                        "',EMPLOYER_DEPT = '" + proemployer + "',CREATE_PERSON = '" + userByname + "',CREATE_DEPT = '" + userDept +
                        "',CREATE_TIME = to_date('" + procreatetime + "','yyyy/mm/dd HH24:MI:SS'),PROPOSAL = '无',FEASIBILITY_STUDY = '无'" +
                        ",PRELIMINARY_DESIGN = '无',DETAILED_DESIGN = '无',DESIGN_CHANGE = '无',CALCULATION = '无' WHERE SYSTEMID = -1";
            OperateSde(sqlstr);
            return;
        }
    }
}