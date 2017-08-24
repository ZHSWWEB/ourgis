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
    public partial class projectInfo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string proidstr = Request.QueryString["proid"];
            string tabtypestr = Request.QueryString["tabtype"]; 
            if (proidstr != null)
            {
                if (tabtypestr == null)
                {
                    //项目基本信息标签页
                    string sqlstr = "SELECT NAME,SYSTEMID,DISTRICT,SEAT_RIVER,LOCATION,EMPLOYER_DEPT,CREATE_PERSON,CREATE_DEPT,CREATE_TIME," +
                                    "PROPOSAL,FEASIBILITY_STUDY,PRELIMINARY_DESIGN,DETAILED_DESIGN,DESIGN_CHANGE,CALCULATION,SYSTEMNO FROM PROJECT_INFO WHERE SYSTEMID=" + proidstr;
                    DataSet ds = QuarySde(sqlstr);

                    if (ds.Tables[0].Rows[0]["NAME"] == null || ds.Tables[0].Rows[0]["NAME"].ToString() == "")
                    {
                        Response.Write("<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('未找到该项目', {icon: 5,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>");
                        return;
                    }
                    proTitleDiv.InnerHtml = "<h1 align=\"center\" style =\"font-family:'Microsoft YaHei';font-size:40px;color:darkred\">" + ds.Tables[0].Rows[0]["NAME"].ToString() + "</h1>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">项目编号</th><td>" + ds.Tables[0].Rows[0]["SYSTEMNO"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">行政区</th><td>" + ds.Tables[0].Rows[0]["DISTRICT"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">所属河流</th><td>" + ds.Tables[0].Rows[0]["SEAT_RIVER"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">项目位置</th><td>" + ds.Tables[0].Rows[0]["LOCATION"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">业主单位</th><td>" + ds.Tables[0].Rows[0]["EMPLOYER_DEPT"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">项目建议书</th><td>" + ds.Tables[0].Rows[0]["PROPOSAL"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">可行性研究报告</th><td>" + ds.Tables[0].Rows[0]["FEASIBILITY_STUDY"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">初步设计</th><td>" + ds.Tables[0].Rows[0]["PRELIMINARY_DESIGN"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">施工图及招标</th><td>" + ds.Tables[0].Rows[0]["DETAILED_DESIGN"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">设计变更</th><td>" + ds.Tables[0].Rows[0]["DESIGN_CHANGE"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">计算书</th><td>" + ds.Tables[0].Rows[0]["CALCULATION"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">录入人</th><td>" + ds.Tables[0].Rows[0]["CREATE_PERSON"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">录入部门</th><td>" + ds.Tables[0].Rows[0]["CREATE_DEPT"].ToString() + "</td></tr>";
                    proinfo_body.InnerHtml += "<tr><th style=\"background:#999\">录入时间</th><td>" + ds.Tables[0].Rows[0]["CREATE_TIME"].ToString() + "</td></tr>";
                }
                //else if (Convert.ToInt32(tabtypestr) == 1)
                //{
                //    //项目建议书标签页
                //}
                //else if (Convert.ToInt32(tabtypestr) == 2)
                //{
                //    //可行性研究报告标签页
                //}
                //else if (Convert.ToInt32(tabtypestr) == 3)
                //{
                //    //初步设计标签页
                //}
                //else if (Convert.ToInt32(tabtypestr) == 4)
                //{
                //    //施工图及招标书标签页
                //}
                //else if (Convert.ToInt32(tabtypestr) == 5)
                //{
                //    //计划变更报告标签页
                //}
                //else if (Convert.ToInt32(tabtypestr) == 6)
                //{
                //    //计算书标签页
                //}
            }
        }
    }
}