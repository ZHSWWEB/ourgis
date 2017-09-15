using System;
using System.Data;
using System.Web;
using System.Web.UI.WebControls;
using static tools.quaryData;

namespace web.page.docsummary
{
    public partial class WebForm1 : System.Web.UI.Page
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
                    //**获取权限及历史表中的页面名称
                    pagename = "test";

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
                            //生成GridView
                            build();
                            //**设置初始排序
                            ViewState["SortOrder"] = "mainKey";
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
            //**设置主键
            GridView1.DataKeyNames = new string[] { Convert.ToString("mainKey") };
            //**设置数据列
                BoundField bf = new BoundField();
                bf.DataField = "fieldName";
                bf.SortExpression = "fieldName";
                bf.HeaderText = "fieldCN";
                bf.HeaderStyle.Width = new Unit("100%");
                bf.ReadOnly = true;
                GridView1.Columns.Add(bf);
            //设置按钮
            ButtonField btnf = new ButtonField();
            btnf.CommandName = "download"; btnf.Text = "下载"; btnf.ButtonType = ButtonType.Button;
            btnf.ItemStyle.HorizontalAlign = HorizontalAlign.Center;
            btnf.ItemStyle.VerticalAlign = VerticalAlign.Middle;
            btnf.ItemStyle.Width = new Unit("40px");
            GridView1.Columns.Add(btnf);
        }
        protected void refresh()//绑定到GridView
        {
            //**获取文本框的值
            string find = TextBox1.Text;
            //拼接Listconfig的查询字符串
            string sql = "SELECT * From xxxx";
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
                TextBox1.Text = "";
                refresh();
                Response.Write("<script>alert(\"未查找到符合条件的数据\");</script>");
            }
            //对排序列进行色彩渲染
            sortColor(onSort, index);
        }
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)//加载鼠标指针效果到行事件
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                e.Row.Attributes.Add("onmouseover", "currentColor=this.style.backgroundColor;this.style.backgroundColor='#31b7ab';");
                e.Row.Attributes.Add("onmouseout", "this.style.backgroundColor=currentColor;");
            }
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
            if (e.CommandName == "download")//**下载按钮
            {
                //获取当前行的index、主键
                int index = int.Parse(e.CommandArgument.ToString());
                GridView1.SelectedIndex = index;
                string mainkey = GridView1.DataKeys[index].Value.ToString();
                //**下载
               
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
    }
}