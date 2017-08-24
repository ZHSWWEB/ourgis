using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static tools.quaryData;
using System.Collections;

namespace web.page.formpages
{
    public partial class showDetail : System.Web.UI.Page
    {
        //初始化静态变量（全设置信息、list列设置信息、list表名、是否已点击排序、现有排序列序号）
        static DataTable config;
        static DataTable detailconfig;
        static string detailName;
        static string pagename;
        protected void Page_Load(object sender, EventArgs e)
        {
            //获得此cookie对象 
            HttpCookie cookie = Request.Cookies["userId"];
            //检验Cookie是否已经存在 
            if (null == cookie)
            {
                Response.Write("<script>window.location.href = \"../notLogin.html\";</script>");
            }
            else
            {
                //已登陆，存在Cookie的值 
                string userId = cookie.Value;
                {
                    //获取权限及历史表中的页面名称
                    string tablename = Request.QueryString["table"];
                    //页面首次打开时获取Excel配置信息
                    if (detailName != tablename)
                    {
                        detailName = tablename;
                        config = QuaryExcel("SELECT * FROM [" + detailName + "$]").Tables[0];
                        detailconfig = QuaryExcel("SELECT fieldName,fieldCN,readOnly,onDetailHeaderWidth FROM[" + detailName + "$] WHERE onDetail>0 ORDER BY onDetail ASC").Tables[0];
                        pagename = Convert.ToString(config.Rows[0]["pagename"]);
                    }
                    //检查对应权限
                    string sql = "SELECT " + pagename + " FROM PERMISSION WHERE USERID = '" + userId + "'";
                    DataSet ds = QuaryUser(sql);
                    if (Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString()) < 1)
                    {
                        //无浏览权限的跳转
                        Response.Write("<script>window.location.href = \"../notPermission.html\";</script>");
                    }
                    else
                    {
                        //首次打开
                        if (!IsPostBack)
                        {
                            build();        //生成DetailsView
                            //隐藏按键
                            DetailsView1.Fields[detailconfig.Rows.Count].Visible = (Convert.ToInt32(config.Rows[0]["showEdit"]) == 0 || Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString()) < 2) ? false : true;
                            refresh();      //调用绑定数据信息函数
                        }
                    }
                }
            }
        }
        public void build()
        {
            //设置主键
            DetailsView1.DataKeyNames = new string[] { Convert.ToString(config.Rows[0]["mainKey"]) };
            //设置数据列
            for (int i = 0; i < detailconfig.Rows.Count; i++)
            {
                BoundField bf = new BoundField();
                bf.DataField = Convert.ToString(detailconfig.Rows[i]["fieldName"]);
                bf.HeaderText = Convert.ToString(detailconfig.Rows[i]["fieldCN"]);
                bf.HeaderStyle.Width = new Unit((string)detailconfig.Rows[i]["onDetailHeaderWidth"]);
                bf.ReadOnly = (double)detailconfig.Rows[i]["readOnly"] > 0;
                bf.HeaderStyle.BackColor = System.Drawing.ColorTranslator.FromHtml("#CCCCCC");
                DetailsView1.Fields.Add(bf);
            }
            //设置按钮
            CommandField cf = new CommandField();
            cf.ShowEditButton = true; cf.ButtonType = ButtonType.Button;
            cf.EditText = "修改"; cf.UpdateText = "确认";
            //cf.ItemStyle.HorizontalAlign = HorizontalAlign.Center;
            //cf.ItemStyle.VerticalAlign = VerticalAlign.Middle;
            //cf.ItemStyle.Width = new Unit("40px");
            DetailsView1.Fields.Add(cf);

            ButtonField btnf = new ButtonField();
            btnf.CommandName = "return"; btnf.Text = "返回"; btnf.ButtonType = ButtonType.Button;
            //btnf.ItemStyle.HorizontalAlign = HorizontalAlign.Center;
            //btnf.ItemStyle.VerticalAlign = VerticalAlign.Middle;
            //btnf.ItemStyle.Width = new Unit("40px");
            DetailsView1.Fields.Add(btnf);
        }
        public void refresh()
        {
            string objectId = Request.QueryString["objectId"];
            //string sql = "SELECT OBJECTID,HCMC,HCBM,其他叫法,XZQ,F1368,F1368NUM,F1368查187,F1368查35,HZ_SHI,HZ_QU,HZ_JIEDAO,HCGN,HCFL,HCCD,LYMJ,HCKD,SMMJ,ISKQY,ISHC,SGNYJQ,SQNEJQ,SGNQSZMB,SJFHBZ,SJPLBZ,ZZCD,QDMC,QDQX,QDJZ,QD_X,QD_Y,ZDMC,ZDQX,ZDJZ,ZD_X,ZD_Y,SSPLP,SZLY,SJHLMC,SJHLDM,HLJB,XGR,XGRQ FROM SLG_RV_po WHERE OBJECTID = " + objectId;
            //拼接detailconfig的查询字符串
            string sql = "";
            for (int i = 0; i < detailconfig.Rows.Count; i++)
            {
                sql = sql + detailconfig.Rows[i]["fieldName"] + (i < detailconfig.Rows.Count - 1 ? "," : "");
            }
            sql = "SELECT " + sql + " From " + config.Rows[0]["tableName"] + " WHERE OBJECTID = " + objectId;
            //string sql = "SELECT OBJECTID,HCMC,其他叫法,XZQ,F1368,F1368NUM,F1368查187,F1368查35,HZ_SHI,HZ_QU,HZ_JIEDAO FROM SLG_RV_po where " + xzq + field + " like '%" + find + "%'";
            DataSet ds = QuarySde(sql);

            if (ds.Tables[0].Rows.Count > 0)
            {
                DetailsView1.DataSource = ds;
                //添加修改人
                //sql = "SELECT BYNAME FROM REC_SLG_RV_PO,USERLIST WHERE OBJECTID = 10 AND USERID=ID ORDER BY DATETIME DESC";
                //DataSet xgr = QuaryUser(sql);
                //ds.Tables[0].Columns.Add("XGR", typeof(string));
                //ds.Tables[0].Rows[0]["XGR"] = xgr.Tables[0].Rows.Count > 0 ? xgr.Tables[0].Rows[0][0] : "暂无";
                DetailsView1.DataBind();
            }
        }
        protected void DetailsView1_ModeChanging(object sender, DetailsViewModeEventArgs e)
        {
            DetailsView1.ChangeMode(e.NewMode);
            refresh();
        }

        protected void DetailsView1_ItemUpdating(object sender, DetailsViewUpdateEventArgs e)
        {
            string objectId = e.Keys["OBJECTID"].ToString();

            //string[] key = { "HCMC", "HCBM", "其他叫法", "XZQ", "F1368", "F1368NUM", "F1368查187", "F1368查35", "HZ_SHI", "HZ_QU", "HZ_JIEDAO", "HCGN", "HCFL", "HCCD", "LYMJ", "HCKD", "SMMJ", "ISKQY", "ISHC", "SGNYJQ", "SQNEJQ", "SGNQSZMB", "SJFHBZ", "SJPLBZ", "ZZCD", "QDMC", "QDQX", "QDJZ", "QD_X", "QD_Y", "ZDMC", "ZDQX", "ZDJZ", "ZD_X", "ZD_Y", "SSPLP", "SZLY", "SJHLMC", "SJHLDM", "HLJB" };
            //用于标记date类型数据
            //string[] dateKey = { "XGRQ" };
            string sql = "";
            for (int i = 0; i < detailconfig.Rows.Count; i++)
            {
                sql = sql + detailconfig.Rows[i]["fieldName"] + (i < detailconfig.Rows.Count - 1 ? "," : "");
            }
            sql = "SELECT " + sql + " From " + config.Rows[0]["tableName"] + " WHERE OBJECTID = " + objectId;
            DataSet ds = QuarySde(sql);
            string update = "";
            string history = "";
            for (int i = 0; i < DetailsView1.Fields.Count; i++)
            {
                BoundField boundField = DetailsView1.Fields[i] as BoundField;
                if (boundField == null) continue;
                if (boundField.ReadOnly) continue;
                string fieldName = boundField.DataField;
                string fieldCN = boundField.HeaderText;
                string newvalue = ((TextBox)(DetailsView1.Rows[i].Cells[1].Controls[0])).Text;
                string oldvalue = ds.Tables[0].Rows[0][i].ToString();
                if (newvalue != oldvalue)
                {
                    update = update + fieldName + " = '" + newvalue + "',";
                    history = history + "#" + fieldCN + " ：[" + oldvalue + "] >> [" + newvalue + "]" + ", ";
                }
            }
            if (update != "")
            {
                string now = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                string xgrSql = "select byname,department from userlist where id ='" + Request.Cookies["userId"].Value + "'";
                DataSet xgrDs = QuaryUser(xgrSql);
                string xgr = xgrDs.Tables[0].Rows[0][0].ToString();
                string xgbm = xgrDs.Tables[0].Rows[0][1].ToString();

                update = "update " + config.Rows[0]["tableName"] + " set " + update + config.Rows[0]["updatePerson"] + " = '" + xgr + "', " + config.Rows[0]["updateDepartment"] + " = '" + xgbm + "', " + config.Rows[0]["updateTime"] + " = to_date('" + now + "', 'yyyy-mm-dd hh24:mi:ss')" + "  where " + config.Rows[0]["mainKey"] + " = " + objectId;
                history = history.Remove(history.Length - 2, 2);
                history = "insert into REC_" + config.Rows[0]["tableName"] + " (USERID,OBJECTID,OPERATION,DATETIME,DETAIL) values ('" + Request.Cookies["userId"].Value + "','" + objectId + "','修改',to_date('" + now + "', 'yyyy-mm-dd hh24:mi:ss'),'" + history + "')";
                OperateSde(update);
                OperateUser(history);
            }
            //切换模式、重新绑定数据
            DetailsView1.ChangeMode(DetailsViewMode.ReadOnly);
            refresh();
        }
        protected void DetailsView1_ItemCommand(object sender, DetailsViewCommandEventArgs e)
        {
            if (e.CommandName == "return")//返回按钮
            {
                headDiv.InnerHtml = "<script>var index = parent.layer.getFrameIndex(window.name);parent.layer.close(index);</script>";

            }
        }
    }
}