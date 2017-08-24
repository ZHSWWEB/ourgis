using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static tools.quaryData;

namespace web.page.formpages
{
    public partial class testDrop : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DataSet ds = QuarySde("select distinct xzq,xzq val from slg_rv_po");
            dropMSelect.ds = ds;//操作数据库，获得数据集dataset 
            dropMSelect.inputValue = "天河区,白云区";//编辑时，可把字符串赋值到该参数 
        }
    }
}