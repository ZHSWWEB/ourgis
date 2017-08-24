using System;
using System.Data;
using System.Web.UI.HtmlControls;

namespace web.page.formpages
{
    public partial class dropMultiSelect : System.Web.UI.UserControl
    {
        public string checkList { get; set; }
        public string valueList { get; set; }//复选框的value值 
        public string nameList { get; set; } // 复选框的Text值 
        public DataSet ds { get; set; }//数据源 
        public string inputValue { get; set; }//选中的字符串值 
        public string outputValue { get; set; }//新的的字符串值 
        protected void Page_Load(object sender, EventArgs e)
        {
            outputValue = inputValue;
            newValue.Value = inputValue;
            BindData();
        }
        #region 绑定数据 
        protected void BindData()
        {
            string liststr = "";
            DataTable dt = new DataTable();
            if (CheckDataSet(ds, out dt))
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    string chkchecked = "";
                    if (!string.IsNullOrEmpty(inputValue))
                    {
                        string[] arrstr = inputValue.Split(',');
                        if (arrstr != null)
                        {
                            for (int c = 0; c < arrstr.Length; c++)
                            {
                                if (arrstr[c] == dt.Rows[i][0].ToString())
                                {
                                    chkchecked = "checked=\"checked\"";
                                    valueList += dt.Rows[i][0] + ",";
                                    nameList += dt.Rows[i][1] + ",";
                                }
                            }
                        }
                    }
                    liststr += "<div><input type=\"checkbox\"   " + chkchecked + " name=\"subBox\"    onclick=\"ChangeInfo()\" value=\"" + dt.Rows[i][0] + "\" />" + dt.Rows[i][1] + "</div>";
                }
            }
            checkList = liststr;
        }
        #endregion
        /// <summary> 
        /// 检查dataset是否有值 
        /// </summary> 
        /// <param name="ds"></param> 
        /// <returns></returns> 
        public static bool CheckDataSet(DataSet ds, out DataTable dt)
        {
            dt = ds.Tables.Count > 0 ? (ds.Tables[0].Rows.Count > 0 ? ds.Tables[0] : null) : null;
            return (dt == null) ? false : true;
        }

        protected void newValue_ValueChanged(object sender, EventArgs e)
        {
            outputValue = e.ToString();
        }
    }
}