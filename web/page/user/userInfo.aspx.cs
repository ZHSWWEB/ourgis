using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static tools.quaryData;

namespace web.page.user
{
    public partial class userInfo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string userName = string.Empty;
            string querysql = "SELECT NAME,BYNAME,URLFACE,SEX,PHONENUM,TO_CHAR(BIRTHDAY,'yyyy/mm/dd') AS BIRTHDAY,ADDRESS,EMAIL,EVALUATE FROM USERLIST WHERE ID=" + Request.Cookies["userId"].Value;
            DataSet ds = QuaryUser(querysql);
            if (ds.Tables[0].Rows.Count == 0)
            {
                userInfoEndDiv.InnerHtml = "<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('没有此用户', {icon: 5,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>";
                return;
            }
            //账号初始化
            userName = ds.Tables[0].Rows[0]["NAME"].ToString();
            userNameDiv.InnerHtml = "<input type=\"text\" value=\"" + userName + "\" disabled class=\"layui-input layui-disabled\" />";
            //姓名初始化
            string userByName = ds.Tables[0].Rows[0]["BYNAME"].ToString();
            userByNameDiv.InnerHtml = "<input type=\"text\" value=\"" + userByName + "\" disabled class=\"layui-input layui-disabled\" />";
            //性别初始化
            string defSexMale = "<input type=\"radio\" name=\"sex\" value=\"男\" title=\"男\" checked=\"\" /><input type=\"radio\" name=\"sex\" value=\"女\" title=\"女\" />" +
                                "<input type=\"radio\" name=\"sex\" value=\"保密\" title=\"保密\" />";
            string defSexFemale = "<input type=\"radio\" name=\"sex\" value=\"男\" title=\"男\" /><input type=\"radio\" name=\"sex\" value=\"女\" title=\"女\" checked=\"\" />" +
                                "<input type=\"radio\" name=\"sex\" value=\"保密\" title=\"保密\" />";
            string defSexSec = "<input type=\"radio\" name=\"sex\" value=\"男\" title=\"男\" /><input type=\"radio\" name=\"sex\" value=\"女\" title=\"女\" />" +
                                "<input type=\"radio\" name=\"sex\" value=\"保密\" title=\"保密\" checked=\"\" />";
            if (ds.Tables[0].Rows[0]["SEX"].ToString() == "" || ds.Tables[0].Rows[0]["SEX"].ToString() == "男")
                userSexDiv.InnerHtml = defSexMale;
            else if (ds.Tables[0].Rows[0]["SEX"].ToString() == "女")
                userSexDiv.InnerHtml = defSexFemale;
            else if (ds.Tables[0].Rows[0]["SEX"].ToString() == "保密")
                userSexDiv.InnerHtml = defSexSec;
            //手机号码初始化
            string userPhoneNum = ds.Tables[0].Rows[0]["PHONENUM"].ToString();
            userPhoneDiv.InnerHtml = "<input type=\"tel\" name=\"phone\" value=\"" + userPhoneNum + "\" placeholder=\"请输入手机号码\" lay-verify=\"required|phone\" class=\"layui-input\" />";
            //生日初始化
            string userBirthdayNum = ds.Tables[0].Rows[0]["BIRTHDAY"].ToString();
            userBirthdayDiv.InnerHtml = "<input type=\"text\" name=\"birthday\" value=\"" + userBirthdayNum + "\" placeholder=\"请输入出生日期\" lay-verify=\"required|date\" onclick=\"layui.laydate({elem: this,max: laydate.now()})\" class=\"layui-input\" />";
            //家庭住址初始化
            string userAddress = ds.Tables[0].Rows[0]["ADDRESS"].ToString();
            userAddressDiv.InnerHtml = "<input type=\"text\" name=\"address\" value=\"" + userAddress + "\" placeholder=\"请输入详细地址\" class=\"layui-input\" />";
            //邮箱初始化
            string userEmail = ds.Tables[0].Rows[0]["EMAIL"].ToString();
            userEmailDiv.InnerHtml = "<input type=\"text\" name=\"email\" value=\"" + userEmail + "\" placeholder=\"请输入详细地址\" lay-verify=\"required|email\" class=\"layui-input\" />";
            //自我评价初始化
            string userEvaluate = ds.Tables[0].Rows[0]["EVALUATE"].ToString();
            userEvaluteDiv.InnerHtml = "<textarea name=\"evaluate\" placeholder=\"请输入内容\" class=\"layui-textarea\">" + userEvaluate + "</textarea>";
            //头像初始化
            string userFace = ds.Tables[0].Rows[0]["URLFACE"].ToString();
            if (userFace == string.Empty || userFace == "./images/logo.jpg")
                userFace = "../../images/logo.jpg";
            else userFace = "../../" + userFace;
            userFaceDiv.InnerHtml = "<br /><img src = \"" + userFace + "\" class=\"layui-circle\" style=\"width: 200px\" id=\"userFace\" />";

            string reqSex = Request.QueryString["sex"];
            if (reqSex != null)
            {
                string reqPhone = Request.QueryString["phone"];
                string reqBirthday = Request.QueryString["birthday"];
                string reqAddress = Request.QueryString["address"];
                string reqEmail = Request.QueryString["email"];
                string reqEvaluate = Request.QueryString["evaluate"];
                if (reqSex != ds.Tables[0].Rows[0]["SEX"].ToString() || reqPhone != userPhoneNum || reqBirthday != userBirthdayNum
                    || reqAddress != userAddress || reqEmail != userEmail || reqEvaluate != userEvaluate)
                {
                    string setsql = "UPDATE USERLIST SET SEX = '" + reqSex + "',PHONENUM = '" + reqPhone + "',BIRTHDAY = to_date('" + reqBirthday + "','yyyy/mm/dd')"
                                     + ",ADDRESS = '" + reqAddress + "',EMAIL = '" + reqEmail + "',EVALUATE = '" + reqEvaluate + "' WHERE NAME = '" + userName + "'";
                    OperateUser(setsql);
                    Response.Write("<script>window.location.href = \"userInfo.aspx\";</script>");
                }
            }
        }

        protected void btnSave_Click(object sender, EventArgs e)
        {
            //string str = "";
            if (FileUpload1.HasFile)
            {
                //try
                {
                    //str += "Uploading file: " + FileUpload1.FileName;

                    //修改随机文件名
                    string newPathname = "./images/" + Guid.NewGuid().ToString() + Path.GetExtension(FileUpload1.FileName);
                    string savepath = Server.MapPath("../../" + newPathname);
                    //  保存文件
                    FileUpload1.SaveAs(savepath);

                    string sql = "SELECT URLFACE FROM USERLIST WHERE ID = " + Request.Cookies["userId"].Value;
                    DataSet ds = QuaryUser(sql);
                    string oldPathname = Server.MapPath(ds.Tables[0].Rows[0]["URLFACE"].ToString());
                    if (File.Exists(oldPathname) && ds.Tables[0].Rows[0]["URLFACE"].ToString() != "./images/logo.jpg")
                        File.Delete(oldPathname);

                    sql = "UPDATE USERLIST SET URLFACE = '" + newPathname + "' WHERE ID = " + Request.Cookies["userId"].Value;
                    OperateUser(sql);
                    //显示新头像到页面
                    Response.Write("<script>window.location.href = \"userInfo.aspx\";</script>");
                    //  显示文件信息
                    //str += "< br /> Saved As: " + FileUpload1.PostedFile.FileName;
                    //str += "< br /> File Type: " +
                    //       FileUpload1.PostedFile.ContentType;
                    //str += "< br /> File Length(bytes): " +
                    //      FileUpload1.PostedFile.ContentLength;
                    //str += "< br /> PostedFile File Name: " +
                    //       FileUpload1.PostedFile.FileName;
                }
                //catch (Exception ex)
                //{
                //    str += "< br />< b > Error </ b >< br /> Unable to save c://websites//uploads//" + FileUpload1.FileName +
                //    "< br />" + ex.Message;
                //}
            }
            //else
            //{
            //    str = "No file uploaded.";
            //}
            //lblMessage.Text = str;
        }
    }
}