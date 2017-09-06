using System;
using System.Data;
using System.Web;
using System.Web.UI.WebControls;
using static tools.quaryData;

namespace web.page.formpages
{
    public partial class showList : System.Web.UI.Page
    {
        //初始化静态变量（全设置信息、list列设置信息、list表名、是否已点击排序、现有排序列序号）
        [ThreadStatic]
        static DataTable config;
        [ThreadStatic]
        static DataTable listconfig;
        [ThreadStatic]
        static string listName;
        [ThreadStatic]
        static string pagename;
        [ThreadStatic]
        static bool onSort = false;
        [ThreadStatic]
        static int index = -1;

        protected void Page_Load(object sender, EventArgs e)
        {
            //获得此cookie对象 
            HttpCookie cookie = Request.Cookies["userId"];
            //检验Cookie是否已经存在 
            if (null == cookie)
            {
                //未登录的跳转
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
                    if (listName != tablename)
                    {
                        listName = tablename;
                        config = QuaryExcel("SELECT * FROM [" + listName + "$]").Tables[0];
                        listconfig = QuaryExcel("SELECT fieldName,fieldCN,onListControlWidth,onListHeaderWidth,readOnly FROM[" + listName + "$] WHERE onList>0 ORDER BY onList ASC").Tables[0];
                        pagename = Convert.ToString(config.Rows[0]["pagename"]);
                    }
                    //检查对应权限
                    string sql = "SELECT " + pagename + " FROM PERMISSION WHERE USERID = '" + userId + "'";
                    DataSet ds = QuaryUser(sql);
                    if (Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString()) < 1)
                    {
                        //无浏览权限的跳转
                        Response.Write("<script>window.location.href = \"../noPermission.html\";</script>");
                    }
                    else
                    {
                        //记录用户习惯
                        sql = "UPDATE REC_HABIT SET " + pagename + " = " + pagename + " + 1";
                        OperateUser(sql);
                        //首次打开
                        if (!IsPostBack)
                        {
                            //绑定下拉菜单
                            DistrictList_bind();
                            SearchList_bind();
                            //生成选择框
                            only187.Visible = pagename == "RIVER";
                            only35.Visible = pagename == "RIVER";
                            //生成GridView
                            build();
                            //获取按键所在列
                            int editcontrol = listconfig.Rows.Count + 1;
                            int detailcontrol = listconfig.Rows.Count + 2;
                            int mapcontrol = listconfig.Rows.Count + 3;
                            //隐藏按键
                            GridView1.Columns[editcontrol].Visible = (Convert.ToInt32(config.Rows[0]["showEdit"]) == 0 || Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString()) < 2) ? false : true;
                            GridView1.Columns[detailcontrol].Visible = Convert.ToInt32(config.Rows[0]["showDetail"]) == 1 ? true : false;
                            GridView1.Columns[mapcontrol].Visible = Convert.ToInt32(config.Rows[0]["showMap"]) == 1 ? true : false;
                            //设置初始排序
                            ViewState["SortOrder"] = config.Rows[0]["mainKey"];
                            ViewState["OrderDire"] = "ASC";
                            //调用绑定数据信息函数
                            refresh();
                        }
                    }
                }
            }
        }
        protected void build()
        {
            //设置主键
            GridView1.DataKeyNames = new string[] { Convert.ToString(config.Rows[0]["mainKey"]) };
            //设置数据列
            for (int i = 0; i < listconfig.Rows.Count; i++)
            {
                BoundField bf = new BoundField();
                bf.DataField = Convert.ToString(listconfig.Rows[i]["fieldName"]);
                bf.SortExpression = Convert.ToString(listconfig.Rows[i]["fieldName"]);
                bf.HeaderText = Convert.ToString(listconfig.Rows[i]["fieldCN"]);
                bf.HeaderStyle.Width = new Unit((string)listconfig.Rows[i]["onListHeaderWidth"]);
                bf.ReadOnly = (double)listconfig.Rows[i]["readOnly"] > 0;
                GridView1.Columns.Add(bf);
            }
            //设置按钮
            CommandField cf = new CommandField();
            cf.ShowEditButton = true; cf.ButtonType = ButtonType.Button;
            cf.EditText = "修改"; cf.UpdateText = "确认";
            cf.ItemStyle.HorizontalAlign = HorizontalAlign.Center;
            cf.ItemStyle.VerticalAlign = VerticalAlign.Middle;
            cf.ItemStyle.Width = new Unit("40px");
            GridView1.Columns.Add(cf);
            ButtonField btnf1 = new ButtonField();
            btnf1.CommandName = "detail"; btnf1.Text = "详情"; btnf1.ButtonType = ButtonType.Button;
            btnf1.ItemStyle.HorizontalAlign = HorizontalAlign.Center;
            btnf1.ItemStyle.VerticalAlign = VerticalAlign.Middle;
            btnf1.ItemStyle.Width = new Unit("40px");
            GridView1.Columns.Add(btnf1);
            ButtonField btnf2 = new ButtonField();
            btnf2.CommandName = "map"; btnf2.Text = "定位"; btnf2.ButtonType = ButtonType.Button;
            btnf2.ItemStyle.HorizontalAlign = HorizontalAlign.Center;
            btnf2.ItemStyle.VerticalAlign = VerticalAlign.Middle;
            btnf2.ItemStyle.Width = new Unit("40px");
            GridView1.Columns.Add(btnf2);
        }
        protected void refresh()//绑定到GridView
        {
            //获取行政区下拉菜单、搜索框、搜索选项等的值
            string district = DistrictList.SelectedValue;
            string field = SearchList.SelectedValue;
            string find = TextBox1.Text;
            string set187 = only187.Checked ? "AND F1368查187>0 " : "";
            string set35 = only35.Checked ? "AND F1368查35>0 " : "";
            //拼接Listconfig的查询字符串
            string sql = "";
            for (int i = 0; i < listconfig.Rows.Count; i++)
            {
                sql = sql + listconfig.Rows[i]["fieldName"] + (i < listconfig.Rows.Count - 1 ? "," : "");
            }
            sql = "SELECT " + sql + " From " + config.Rows[0]["tableName"] + " WHERE " + district + field + " like '%" + find + "%' " + set187 + set35;
            //string sql = "SELECT OBJECTID,HCMC,其他叫法,XZQ,F1368,F1368NUM,F1368查187,F1368查35,HZ_SHI,HZ_QU,HZ_JIEDAO FROM SLG_RV_po where " + xzq + field + " like '%" + find + "%'";
            DataSet ds = QuarySde(sql);
            //ds非空
            if (ds.Tables[0].Rows.Count > 0)
            {
                //绑定到ds的可排序视图
                DataView view = ds.Tables[0].DefaultView;
                string sort = (string)ViewState["SortOrder"] + " " + (string)ViewState["OrderDire"];
                view.Sort = sort;
                GridView1.DataSource = view;
                GridView1.DataBind();
                //绑定数据的条数到分页菜单栏
                Label dataCount = (Label)GridView1.BottomPagerRow.Cells[0].FindControl("dataCount");
                dataCount.Text = view.Count.ToString();
            }
            //ds为空
            else
            {
                //清空行政区下拉菜单值、搜索框文本后重绑定
                DistrictList.SelectedValue = "";
                TextBox1.Text = "";
                refresh();
                Response.Write("<script>alert(\"未查找到符合条件的数据\");</script>");
            }
            //对排序列进行色彩渲染
            sortColor(onSort, index);
        }
        protected void DistrictList_bind()//绑定到行政区DropList
        {
            //行政区拼接查询语句
            string sql = "SELECT text,left+'" + config.Rows[0]["districtName"] + "'+' '+value,value1 FROM [District$] WHERE " + config.Rows[0]["tableName"] + " = 1";
            DataSet ds = QuaryExcel(sql);
            //清除all选项的多余字段
            ds.Tables[0].Rows[0]["Expr1001"] = "";
            //绑定到下拉菜单
            DistrictList.DataSource = ds;
            DistrictList.DataTextField = "text";
            DistrictList.DataValueField = "Expr1001";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++) {//拼接value和value1
                ds.Tables[0].Rows[i][1] = ds.Tables[0].Rows[i][1].ToString() + ds.Tables[0].Rows[i][2].ToString();
            } 
            DistrictList.DataBind();
        }
        protected void SearchList_bind()//绑定到搜索选项DropList
        {
            //拼接查询语句
            string sql = "SELECT fieldCN,fieldName FROM [" + config.Rows[0]["tableName"] + "$] WHERE onListSearch > 0 ORDER BY onListSearch ASC";
            DataSet ds = QuaryExcel(sql);
            //绑定到下拉菜单
            SearchList.DataSource = ds;
            SearchList.DataTextField = "fieldCN";
            SearchList.DataValueField = "fieldName";
            SearchList.DataBind();
        }
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)//加载鼠标指针效果到行事件
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                e.Row.Attributes.Add("onmouseover", "currentColor=this.style.backgroundColor;this.style.backgroundColor='#31b7ab';");
                e.Row.Attributes.Add("onmouseout", "this.style.backgroundColor=currentColor;");
            }
        }
        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)//行编辑事件
        {

            GridView1.EditIndex = e.NewEditIndex;
            GridView1.SelectedIndex = e.NewEditIndex;
            //controlStyle的width无法在build()里设置生效
            for (int i = 1; i < listconfig.Rows.Count; i++)
            {
                GridView1.Columns[i].ControlStyle.Width = new Unit((string)listconfig.Rows[i - 1]["onListControlWidth"]);
            }
            refresh();
        }
        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)//行编辑的取消事件
        {
            GridView1.EditIndex = -1;
            refresh();
        }
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)//行更新事件
        {
            GridView1.EditIndex = e.RowIndex;
            string objectId = GridView1.DataKeys[e.RowIndex].Value.ToString();
            //拼接Listconfig的查询字符串
            string sql = "";
            for (int i = 0; i < listconfig.Rows.Count; i++)
            {
                sql = sql + listconfig.Rows[i]["fieldName"] + (i < listconfig.Rows.Count - 1 ? "," : "");
            }
            sql = "SELECT " + sql + " From " + config.Rows[0]["tableName"] + " WHERE " + config.Rows[0]["mainKey"] + " = " + objectId;
            //string sql = "SELECT OBJECTID,HCMC,其他叫法,XZQ,F1368,F1368NUM,F1368查187,F1368查35,HZ_SHI,HZ_QU,HZ_JIEDAO FROM SLG_RV_po WHERE OBJECTID=" + objectId;
            DataSet ds = QuarySde(sql);
            string update = "";
            string history = "";
            for (int i = 0; i < GridView1.Columns.Count; i++)
            {
                BoundField boundField = GridView1.Columns[i] as BoundField;
                if (boundField == null) continue;
                if (boundField.ReadOnly) continue;
                string fieldName = boundField.DataField;
                string fieldCN = boundField.HeaderText;
                string newvalue = ((TextBox)(GridView1.Rows[e.RowIndex].Cells[i].Controls[0])).Text;
                string oldvalue = ds.Tables[0].Rows[0][i - 1].ToString();
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
            GridView1.EditIndex = -1;
            refresh();
        }
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)//行删除事件
        {
            //使用objectid删除
            string objectId = GridView1.DataKeys[e.RowIndex].Value.ToString();
            string sql = "delete from " + config.Rows[0]["tableName"] + " where objectid = " + objectId;
            OperateSde(sql);
            //返回值并刷新
            GridView1.EditIndex = -1;
            refresh();
        }
        protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)//分页事件
        {
            //取消选中行
            GridView1.SelectedIndex = -1;
            // 得到该控件
            GridView theGrid = sender as GridView;
            int newPageIndex = 0;
            if (e.NewPageIndex == -4)
            {
                //点击了Set按钮
                TextBox txtPageSize = null;
                GridViewRow pagerRow = theGrid.BottomPagerRow;
                txtPageSize = pagerRow.FindControl("txtNewPageSize") as TextBox;
                theGrid.PageSize = int.Parse(txtPageSize.Text);
            }
            else
            {
                if (e.NewPageIndex == -3)
                {
                    //点击了Go按钮
                    TextBox txtNewPageIndex = null;

                    //GridView较DataGrid提供了更多的API，获取分页块可以使用BottomPagerRow 或者TopPagerRow，当然还增加了HeaderRow和FooterRow
                    GridViewRow pagerRow = theGrid.BottomPagerRow;

                    if (pagerRow != null)
                    {
                        //得到text控件
                        txtNewPageIndex = pagerRow.FindControl("txtNewPageIndex") as TextBox;
                    }
                    if (txtNewPageIndex != null)
                    {
                        //得到索引
                        newPageIndex = int.Parse(txtNewPageIndex.Text) - 1;
                    }
                }
                else
                {
                    //点击了其他的按钮
                    newPageIndex = e.NewPageIndex;
                }
                //防止新索引溢出
                newPageIndex = newPageIndex < 0 ? 0 : newPageIndex;
                newPageIndex = newPageIndex >= theGrid.PageCount ? theGrid.PageCount - 1 : newPageIndex;

                //得到新的值
                theGrid.PageIndex = newPageIndex;
            }
            //重新绑定
            refresh();
        }
        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)//行命令事件：详情、定位
        {
            if (e.CommandName == "detail")//详情按钮
            {
                //获取当前行的index、objectid主键、位于第二列的名称
                int index = int.Parse(e.CommandArgument.ToString());
                GridView1.SelectedIndex = index;
                string objectId = GridView1.DataKeys[index].Value.ToString();
                string name = GridView1.Rows[index].Cells[2].Text;
                //调用自制的layer函数showDetail
                Page.ClientScript.RegisterStartupScript(Page.GetType(), "showDetail", "showDetail('" + objectId + "','" + name + "','" + listName + "');", true);
            }
            if (e.CommandName == "map")//定位按钮
            {
                //获取当前行的index、objectid主键
                int index = int.Parse(e.CommandArgument.ToString());
                GridView1.SelectedIndex = index;
                string objectId = GridView1.DataKeys[index].Value.ToString();
                //切换到map页
                Response.Write("<script>parent.$(\"#tomap\").click();</script>");
                //定位到所选项:由map的initMap.js处理
                Response.Write("<script>parent.$(\"#map\").attr(\"src\",\"page/map/map.html?layerat=" + config.Rows[0]["layerName"] + "&objectidat=" + objectId + "\");</script>");
            }
        }

        protected void GridView1_Sorting(object sender, GridViewSortEventArgs e)//排序事件
        {
            //取消选中行
            GridView1.SelectedIndex = -1;
            //获取新排序的列名
            string sPage = e.SortExpression;
            //判断是否返回默认排序
            onSort = true;
            //二次三次排序
            if (ViewState["SortOrder"].ToString() == sPage)
            {
                //二次排序、正序
                if (ViewState["OrderDire"].ToString() == "Desc")
                    ViewState["OrderDire"] = "ASC";
                //三次排序、返回默认
                else if (ViewState["OrderDire"].ToString() == "ASC")
                {
                    ViewState["SortOrder"] = config.Rows[0]["mainKey"];
                    ViewState["OrderDire"] = "Desc";
                    //添加默认排序标记
                    onSort = false;
                }
            }
            //首次排序、倒序
            else
            {
                ViewState["SortOrder"] = e.SortExpression;
                ViewState["OrderDire"] = "Desc";
            }
            //获取所排序列的index
            DataControlField col;
            for (int i = 0; i < GridView1.Columns.Count; i++)
            {
                col = GridView1.Columns[i];
                //只有BoundField列才有DataField
                if (col is BoundField)
                {
                    var col1 = (BoundField)col;
                    if (col1.DataField == e.SortExpression)
                    {
                        index = i;
                        break;
                    }
                }
            }
            //刷新数据
            refresh();
        }
        protected void sortColor(bool onSort, int index)//对所排序列进行色彩渲染
        {
            if (onSort)
            {
                for (int i = 0; i < GridView1.Rows.Count; i++)
                {
                    GridView1.Rows[i].Cells[index].Attributes.Add("style", "border-color:#1bb3a5");
                    GridView1.Rows[i].Cells[index - 1].Attributes.Add("style", "border-color:#1bb3a5");
                }
                GridView1.HeaderRow.Cells[index].Attributes.Add("style", "border-color:#1bb3a5");
                GridView1.HeaderRow.Cells[index - 1].Attributes.Add("style", "border-color:#1bb3a5");
                GridView1.HeaderRow.Cells[index].ForeColor = System.Drawing.Color.FromName("#1bb3a5"); ;
            }
        }
        protected void Button1_Click(object sender, EventArgs e)//搜索键的点击事件
        {
            //重置页码
            GridView1.PageIndex = 0;
            //取消选中行
            GridView1.SelectedIndex = -1;
            refresh();
        }
        protected void Button2_Click(object sender, EventArgs e)//刷新键的点击事件
        {
            refresh();
        }
        protected void DistrictList_SelectedIndexChanged(object sender, EventArgs e)//行政区的切换事件
        {
            //重置页码
            GridView1.PageIndex = 0;
            //取消选中行
            GridView1.SelectedIndex = -1;
            refresh();
        }
        protected void SearchList_SelectedIndexChanged(object sender, EventArgs e)//搜索选项的切换事件
        {
            //refresh();
        }
        protected void only187_CheckedChanged(object sender, EventArgs e)
        {
            if (only187.Checked) only35.Checked = false;
            refresh();
        }
        protected void only35_CheckedChanged(object sender, EventArgs e)
        {
            if (only35.Checked) only187.Checked = false;
            refresh();
        }
    }
}