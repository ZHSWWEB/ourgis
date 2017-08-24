using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OracleClient;
using System.Configuration;
using static tools.quaryData;


namespace web.page.login
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string na = Request.Form["username"];
            string pw = Request.Form["password"];
            string co = Request.Form["code"];
            if (na != null)
            {
                if (CheckCo(co))
                {
                    if (CheckNaPw(na, pw))
                    {
                        string quarysql = "SELECT * FROM USERLIST WHERE NAME = '" + na + "'";
                        DataSet actdata = QuaryUser(quarysql);
                        string actStatus = actdata.Tables[0].Rows[0]["ACTIVE"].ToString();
                        if (actStatus == "0") //先判断用户激活状态
                        {
                            LayerMsg("用户已禁用，请联系管理员");
                            return;
                        }

                        //记录登陆信息
                        string userIP = GetUserIP();
                        if (userIP == "::1")
                            userIP = "localhost";
                        string loginTime = DateTime.Now.ToLocalTime().ToString();
                        string recLoginsql = "INSERT INTO LOGINREC VALUES (" + actdata.Tables[0].Rows[0]["ID"] + ",'" +
                                                                               userIP + "',to_date('"+ loginTime + "', 'yyyy/mm/dd HH24:MI:SS'),'" + 
                                                                               na + "','" + actdata.Tables[0].Rows[0]["BYNAME"] + "','" + 
                                                                               actdata.Tables[0].Rows[0]["DEPARTMENT"] + "')";
                        OperateUser(recLoginsql);
                        recLoginsql = "UPDATE USERLIST SET LASTESTLOGINTIME = to_date('" + loginTime + "', 'yyyy/mm/dd HH24:MI:SS') WHERE NAME = '" + na + "'";
                        OperateUser(recLoginsql);

                        Response.Write("<script>window.location.href = \"../../index.aspx\";</script>");
                    }
                    else
                    {
                        LayerMsg("账号密码错误，请客官重新登陆。");
                    }
                }
                else
                {
                    LayerMsg("验证码输入错误，请客官重新登陆。");
                }
            }

        }

        public string GetUserIP()
        {
            string userIp = string.Empty;
            if (HttpContext.Current.Request.ServerVariables["HTTP_VIA"] != null)
            {
                if (HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
                    userIp = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
                else userIp = HttpContext.Current.Request.UserHostAddress;
            }
            else
                userIp = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"].ToString();
            return userIp;
        }

        protected void LayerMsg(string msg)
        {
            endDiv.InnerHtml = "<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('" + msg + "', {icon: 5,time: 5000,area: '300',btnAlign: 'c',btn: ['我明白了','我拒绝']});});</script>";
        }
        protected bool CheckCo(string co)
        {
            string Cook = Request.Cookies["CCode"].Value;

            if (Session == null)
                return false;
            string Sess = Session["CCode"].ToString();
            
            if  (Cook.ToUpper() == co.ToUpper())
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        protected bool CheckNaPw(string na, string pw)
        {
            string sql = "SELECT * FROM USERLIST WHERE NAME = '" + na + "' AND PASSWORD = '" + pw + "'";
            DataSet ds = QuaryUser(sql);

            if (ds.Tables[0].Rows.Count > 0)
            {
                HttpCookie loginCookie = new HttpCookie("userId", ds.Tables[0].Rows[0]["ID"].ToString());
                loginCookie.Expires = DateTime.Now.AddDays(1);
                Response.Cookies.Add(loginCookie);//写入COOKIS
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
