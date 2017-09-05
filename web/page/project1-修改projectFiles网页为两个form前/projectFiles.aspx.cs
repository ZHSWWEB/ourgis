using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
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
            {
                Response.Write("<script languge='javascript'>alert('没有指定正确的项目序号！');</script>");
                return;
            }

            ProjectFilesLoad(filetype, prosystemid);
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
                                                    + "<td><a class=\"layui-btn downloadfile\" data-type=\""+ type + "\" data-id=\"" + temprow["ID"].ToString() + "\" >下载</a>"
                                                    + "</tr>";
                }
            }
            else files_content.InnerHtml = "<tr><td colspan=\"8\">暂无数据</td></tr>";
        }

        protected string FileType2TableName(string type)
        {
            string tablename = string.Empty;
            if (type == "1")
            {
                //项目建议书
                tablename = "PRO_PROPOSAL";
            }
            else if (type == "2")
            {
                //可行性研究报告
                tablename = "PRO_FEASIBILITY_STUDY";
            }
            else if (type == "3")
            {
                //初步设计
                tablename = "PRO_PRELIMINARY_DESIGN";
            }
            else if (type == "4")
            {
                //施工图及招标书
                tablename = "PRO_DETAILED_DESIGN";
            }
            else if (type == "5")
            {
                //计划变更报告
                tablename = "PRO_DESIGN_CHANGE";
            }
            else if (type == "6")
            {
                //计算书
                tablename = "PRO_CALCULATION";
            }
            return tablename;
        }

        protected void btnSaveFile_Click(object sender, EventArgs e)
        {
            if (FileUpload1.HasFile)
            {
                //获取项目存储资料路径
                string proid = Request.QueryString["proid"];
                string filetype = Request.QueryString["tabtype"];
                if (proid == null || filetype == null)
                {
                    return;
                }
                string sqlstr = "SELECT PROJECT_PATH FROM PROJECT_INFO WHERE SYSTEMID = " + proid;
                DataSet prods = QuarySde(sqlstr);
                if (prods.Tables[0].Rows.Count > 0)
                {
                    string savepath = prods.Tables[0].Rows[0]["PROJECT_PATH"].ToString();
                    string filename = FileUpload1.FileName;
                    string pathToCheck = savepath + filename;
                    string tmpfilename = string.Empty;
                    //已有相同文件名的文件，对此次上传文件重命名
                    if (File.Exists(pathToCheck))
                    {
                        int counter = 2;
                        while (File.Exists(pathToCheck))
                        {
                            tmpfilename = "(" + counter.ToString() + ")" + filename;
                            pathToCheck = savepath + tmpfilename;
                            counter++;
                        }
                        filename = tmpfilename;
                    }

                    savepath += filename;
                    FileUpload1.SaveAs(savepath);

                    //增加新条目到对应的文件信息表
                    sqlstr = "SELECT ID FROM " + FileType2TableName(filetype) + " ORDER BY ID DESC";
                    DataSet fileinfods = QuaryUser(sqlstr);
                    string fileidstr = string.Empty;
                    string profileidstr = string.Empty;
                    //得到上传文件总序号和在对应项目中的文件序号
                    if (fileinfods.Tables[0].Rows.Count > 0)
                    {
                        fileidstr = (Convert.ToInt32(fileinfods.Tables[0].Rows[0]["ID"].ToString()) + 1).ToString();
                        sqlstr = "SELECT PROFILEID FROM " + FileType2TableName(filetype) + " WHERE SYSID = " + proid + " ORDER BY PROFILEID DESC";
                        DataSet fileinfods1 = QuaryUser(sqlstr);
                        if (fileinfods1.Tables[0].Rows.Count > 0)
                            profileidstr = (Convert.ToInt32(fileinfods1.Tables[0].Rows[0]["PROFILEID"].ToString()) + 1).ToString();
                        else if (fileinfods1.Tables[0].Rows.Count == 0)
                            profileidstr = "1";
                    }
                    else if (fileinfods.Tables[0].Rows.Count == 0)
                    {
                        fileidstr = profileidstr = "1";
                    }

                    //string filedetail = Request.QueryString["filedetail"];//获取上传者对文件的说明
                    string filedetail = filedetailinput.Value;
                    sqlstr = "SELECT * FROM USERLIST WHERE ID = " + Request.Cookies["userId"].Value;
                    DataSet userds = QuaryUser(sqlstr);
                    string username = userds.Tables[0].Rows[0]["BYNAME"].ToString();
                    string userdept = userds.Tables[0].Rows[0]["DEPARTMENT"].ToString();
                    string uploadtime = DateTime.Now.ToLocalTime().ToString();//获取上传者信息及上传时间
                    //文件大小
                    FileInfo savefileinfo = new FileInfo(savepath);
                    string filesize = ((float)savefileinfo.Length/(1024 * 1024)).ToString("F2")+"M";//获取文件大小，以“M”为单位
                    sqlstr = "INSERT INTO " + FileType2TableName(filetype) + " VALUES (" + fileidstr + "," + proid
                             + ",'" + filedetail + "','" + filename + "','" + prods.Tables[0].Rows[0]["PROJECT_PATH"].ToString()
                             + "','" + username + "','" + userdept + "',to_date('" + uploadtime + "','yyyy/mm/dd HH24:MI:SS')"
                             + "," + profileidstr + ",'" + filesize + "')";
                    OperateUser(sqlstr);
                    Response.Write("<script languge='javascript'>location.replace('./projectFiles.aspx?proid=" + proid + "&tabtype=" + filetype + "');</script>");
                }
                else
                    Response.Write("<script languge='javascript'>alert('找不到指定项目序号！');</script>");
            }
        }
    }
}