using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using static tools.quaryData;

namespace web.page.project
{
    public partial class projectFiles : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string prosystemid = Request.QueryString["proid"];
            string filetype = Request.QueryString["tabtype"];
            if (prosystemid == null || filetype == null)
                return;

            ProjectFilesLoad(filetype, prosystemid);
        }

        protected void ProjectFilesLoad(string type, string systemid)
        {
            string sqlstr = string.Empty;
            if (type == "1")
            {
                //项目建议书
                sqlstr = "SELECT * FROM PRO_PROPOSAL WHERE SYSID = " + systemid + " ORDER BY PROFILEID ASC";
            }
            else if (type == "2")
            {
                //可行性研究报告
                sqlstr = "SELECT * FROM PRO_FEASIBILITY_STUDY WHERE SYSID = " + systemid + " ORDER BY PROFILEID ASC";
            }
            else if (type == "3")
            {
                //初步设计
                sqlstr = "SELECT * FROM PRO_PRELIMINARY_DESIGN WHERE SYSID = " + systemid + " ORDER BY PROFILEID ASC";
            }
            else if (type == "4")
            {
                //施工图及招标书
                sqlstr = "SELECT * FROM PRO_DETAILED_DESIGN WHERE SYSID = " + systemid + " ORDER BY PROFILEID ASC";
            }
            else if (type == "5")
            {
                //计划变更报告
                sqlstr = "SELECT * FROM PRO_DESIGN_CHANGE WHERE SYSID = " + systemid + " ORDER BY PROFILEID ASC";
            }
            else if (type == "6")
            {
                //计算书
                sqlstr = "SELECT * FROM PRO_CALCULATION WHERE SYSID = " + systemid + " ORDER BY PROFILEID ASC";
            }
            
            DataSet fileds = QuaryUser(sqlstr);
            if (fileds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow temprow in fileds.Tables[0].Rows)
                {
                    files_content.InnerHtml += "<tr>"
                                                    + "<td>" + temprow["PROFILEID"].ToString() + "</td>"
                                                    + "<td>" + temprow["NAME"].ToString() + "</td>"
                                                    + "<td>" + temprow["FILENAME"].ToString() + "</td>"
                                                    + "<td>" + temprow["FILESIZE"].ToString() + "</td>"
                                                    + "<td>" + temprow["UPLOAD_PPERSON"].ToString() + "</td>"
                                                    + "<td>" + temprow["UPLOAD_DEPT"].ToString() + "</td>"
                                                    + "<td>" + temprow["UPLOAD_TIME"].ToString() + "</td>"
                                                    //+ "<td><asp:Button runat=\"server\" class=\"layui-btn\" Text=\"下载\" OnClick=\"btnDl_Click\" CommandArgument=\"" + type
                                                    //+ ","+ temprow["ID"].ToString() + "\" /></td>"
                                                    //+ "<td><form runat=\"server\"><div><input type=\"button\" runat=\"server\" class=\"layui-btn\" onserverclick=\"btnDl_Click\" value=\"下载\" data-value=\""+
                                                    //type + "," + temprow["ID"].ToString() + "\" id=\"profiles_"+ temprow["ID"].ToString() + "\" /></div></form></td>"
                                                    + "<td><a class=\"layui-btn downloadfile\" data-type=\""+ type + "\" data-id=\"" + temprow["ID"].ToString() + "\" >下载</a>"
                                                    + "</tr>";
                }
            }
            else files_content.InnerHtml = "<tr><td colspan=\"8\">暂无数据</td></tr>";
        }

        //protected void btnDl_Click(object sender, EventArgs e)
        //{
        //    //Button dlbtn = sender as Button;
        //    HtmlInputButton dlbtn = sender as HtmlInputButton;
        //    string[] commandArgs = dlbtn.Attributes["data-value"].ToString().Split(new char[] {','});//获取到要下载的文件类型及在数据库中的ID号
        //    string filetable = string.Empty;
        //    if (commandArgs[0] == "1")
        //        filetable = "PRO_PROPOSAL";
        //    else if (commandArgs[0] == "2")
        //        filetable = "PRO_FEASIBILITY_STUDY";
        //    else if (commandArgs[0] == "3")
        //        filetable = "PRO_PRELIMINARY_DESIGN";
        //    else if (commandArgs[0] == "4")
        //        filetable = "PRO_DETAILED_DESIGN";
        //    else if (commandArgs[0] == "5")
        //        filetable = "PRO_DESIGN_CHANGE";
        //    else if (commandArgs[0] == "6")
        //        filetable = "PRO_CALCULATION";

        //    string sqlstr = "SELECT * FROM " + filetable + " WHERE ID = " + commandArgs[1];
        //    DataSet fileds = QuaryUser(sqlstr);
        //    if (fileds.Tables[0].Rows.Count > 0)
        //    {
        //        string fileName = fileds.Tables[0].Rows[0]["FILENAME"].ToString();//显示给客户端文件名
        //        string filePath = fileds.Tables[0].Rows[0]["PATH"].ToString();//路径
            

        //        System.IO.FileInfo fileInfo = new System.IO.FileInfo(fileName+filePath);

        //        if (fileInfo.Exists == true)
        //        {
        //            const long ChunkSize = 102400;//100K 每次读取文件，只读取100K，这样可以缓解服务器的压力
        //            byte[] buffer = new byte[ChunkSize];

        //            Response.Clear();
        //            System.IO.FileStream iStream = System.IO.File.OpenRead(fileName+filePath);
        //            long dataLengthToRead = iStream.Length;//获取下载的文件总大小
        //            Response.ContentType = "application/octet-stream";
        //            Response.AddHeader("Content-Disposition", "attachment; filename=" + HttpUtility.UrlEncode(fileName));
        //            while (dataLengthToRead > 0 && Response.IsClientConnected)
        //            {
        //                int lengthRead = iStream.Read(buffer, 0, Convert.ToInt32(ChunkSize));//读取的大小
        //                Response.OutputStream.Write(buffer, 0, lengthRead);
        //                Response.Flush();
        //                dataLengthToRead = dataLengthToRead - lengthRead;
        //            }
        //            Response.Close();
        //        }
        //        else endProjectFilesDiv.InnerHtml = "<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('服务器中找不到该文件', {icon: 7,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>";
        //    }
        //    else endProjectFilesDiv.InnerHtml = "<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('服务器中找不到该文件', {icon: 7,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>";
        //}
    }
}