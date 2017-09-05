using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static tools.quaryData;
using static web.page.project.projectFiles;

namespace web.page.project1
{
    public partial class projectFilesList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string systemidstr = Request.QueryString["proid"];
            string typestr = Request.QueryString["tabtype"];
            ProjectFilesLoad(typestr, systemidstr);
        }
        protected void ProjectFilesLoad(string type, string systemid)
        {
            string sqlstr = string.Empty;
            string tableName = FileType2TableName(type);
            if (tableName == string.Empty)
            {
                Response.Write("<script languge='javascript'>alert('指定文件类型错误！');</script>");
                return;
            }
            sqlstr = "SELECT * FROM " + tableName + " WHERE SYSID = " + systemid + " ORDER BY PROFILEID ASC";

            DataSet fileds = QuaryUser(sqlstr);
            if (fileds.Tables[0].Rows.Count > 0)
            {
                //判断能否让用户下载文件
                string downbuttonstr = "<td>无下载权限</td>";
                bool candown = false;
                string sqluserstr = "SELECT PROJECT FROM PERMISSION WHERE USERID = " + Request.Cookies["userId"].Value;
                DataSet userperds = QuaryUser(sqluserstr);
                if (userperds.Tables[0].Rows.Count > 0)
                {
                    if (userperds.Tables[0].Rows[0]["PROJECT"].ToString() == "2")
                        candown = true;
                }
                
                foreach (DataRow temprow in fileds.Tables[0].Rows)
                {
                    if (candown == true)
                        downbuttonstr = "<td><a class=\"layui-btn downloadfile\" data-type=\"" + type + "\" data-id=\"" + temprow["ID"].ToString() + "\" >下载</a>";
                    files_content.InnerHtml += "<tr>"
                                                    + "<td>" + temprow["PROFILEID"].ToString() + "</td>"
                                                    + "<td>" + temprow["NAME"].ToString() + "</td>"
                                                    + "<td>" + temprow["FILENAME"].ToString() + "</td>"
                                                    + "<td>" + temprow["FILESIZE"].ToString() + "</td>"
                                                    + "<td>" + temprow["UPLOAD_PPERSON"].ToString() + "</td>"
                                                    + "<td>" + temprow["UPLOAD_DEPT"].ToString() + "</td>"
                                                    + "<td>" + temprow["UPLOAD_TIME"].ToString() + "</td>"
                                                    //+ "<td><a class=\"layui-btn downloadfile\" data-type=\"" + type + "\" data-id=\"" + temprow["ID"].ToString() + "\" >下载</a>"
                                                    + downbuttonstr
                                                    + "</tr>";
                }
            }
            else files_content.InnerHtml = "<tr><td colspan=\"8\">暂无数据</td></tr>";
        }
    }
}