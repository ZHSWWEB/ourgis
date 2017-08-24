using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Windows;
using static tools.quaryData;

namespace web.page.user
{
    public partial class addUser : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string usrName = Request.QueryString["userName"];
            //string Request.
            if (usrName == null)
            {
                return;
            }
            if (CheckUserNameValid(usrName) == false)
            {
                LayuiMsg("创建用户失败，已存在相同用户名！");
                return;
            }

            string Password = Request.QueryString["userPassword1"];
            string Password2 = Request.QueryString["userPassword2"];
            if (Password != Password2)
            {
                LayuiMsg("创建用户失败，两次输入密码不同！");
                return;
            }
            
            string Nickame = Request.QueryString["userNickname"];
            string Remark = Request.QueryString["userDetail"];
            string Permission = Request.QueryString["userGrade"];
            string Active = Request.QueryString["userActive"];
            string Department = Request.QueryString["userDept"];
            SaveUser(usrName, Nickame, Password, Remark, Permission, Active, Department);
            LayuiMsg("创建用户成功");
            //Response.Write("<script>window.location.href = \"userManager.aspx\";</script>");
        }

        protected void LayuiMsg(string msg)
        {
            endAdduserdiv.InnerHtml = "<script>layui.use('layer', function(){var layer = layui.layer;layer.msg('" + msg + "', {icon: 7,time: 5000,area: '300',btnAlign: 'c',btn: ['确认']});});</script>";
        }

        public bool CheckUserNameValid(string name)
        {
            string sql = "SELECT * FROM USERLIST WHERE NAME = '" + name+ "'";
            DataSet ds = QuaryUser(sql);//QuaryUser接口用于传输sql语言

            if (ds.Tables[0].Rows.Count > 0)
            {
                return false;
            }
            else
            {
                return true; 
            }
        }

        public void SaveUser(string name, string nickname, string password, string remark, string permission, string active, string department)
        {
            string idsql = "SELECT ID FROM USERLIST ORDER BY ID DESC";
            DataSet ds = QuaryUser(idsql);
            //string idstr = ds.Tables[0].Rows[0]["ID"].ToString();
            int id = Convert.ToInt32(ds.Tables[0].Rows[0]["ID"]) + 1;
            string createtime = DateTime.Now.ToLocalTime().ToString();
            string sql = "INSERT INTO USERLIST VALUES (" + id + ",'" + name +"','" + password + "','" + nickname + "','" + remark + "','" + permission + "','','./images/logo.jpg',to_date('" + createtime + "','yyyy/mm/dd HH24:MI:SS')," + active + ",'" + department + "','男','','','','','')";
            OperateUser(sql);

            //用户管理权限，河流读取和修改权限（1读取，2读取和修改），登陆历史查看权限，操作习惯查看权限，后台管理页面显示权限,湖泊读取和修改权限（1读取，2读取和修改），
            //水库，堤防，泵站，水闸，项目读取、添加和上传权限（1读取，2读取、添加和上传）,污水处理厂查看权限，排水泵站查看权限，排水闸查看权限
            if (permission == "管理员")
                permission = "1,2,1,1,1,2,2,2,2,2,2,1,1,1";
            else if (permission == "高级用户")
                permission = "0,2,0,0,0,2,2,2,2,2,2,1,1,1";
            else if (permission == "普通用户")
                permission = "0,1,0,0,0,1,1,1,1,1,1,1,1,1";
            else if (permission == "外部用户")
                permission = "0,1,0,0,0,1,1,1,1,1,0,0,0,0";
            sql = "INSERT INTO PERMISSION VALUES ("+ id + ","+ permission +")";
            OperateUser(sql);
        }
    }
}