using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static tools.quaryData;
using static tools.ConvertJson;

namespace web.page.recinfo
{
    public partial class recinfoDataOperationget : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            OperateUser("UPDATE REC_HABIT SET DATAOPERATION = DATAOPERATION+1");
            //河流操作信息
            DataSet ds = QuaryUser("SELECT BYNAME,DEPARTMENT,OPERATION,'河流' LAYERTYPE,SLG_RV_PO.OBJECTID,HCMC LAYERNAME,DETAIL,REC_SLG_RV_PO.DATETIME " +
                                    "FROM USERLIST,sde.SLG_RV_PO,REC_SLG_RV_PO " +
                                    "WHERE USERLIST.ID=USERID AND REC_SLG_RV_PO.OBJECTID=SLG_RV_PO.OBJECTID");
            //水库操作信息
            DataSet ds_reservoir = QuaryUser("SELECT BYNAME,DEPARTMENT,OPERATION,'水库' LAYERTYPE,SLG_RES.OBJECTID,SKMC LAYERNAME,DETAIL,REC_SLG_RES.DATETIME " +
                                    "FROM USERLIST,sde.SLG_RES,REC_SLG_RES " +
                                    "WHERE USERLIST.ID=USERID AND REC_SLG_RES.OBJECTID=SLG_RES.OBJECTID");
            ds.Merge(ds_reservoir);

            //泵站操作信息
            DataSet ds_pump = QuaryUser("SELECT BYNAME,DEPARTMENT,OPERATION,'泵站' LAYERTYPE,SLG_PUMP.OBJECTID,BZMC LAYERNAME,DETAIL,REC_SLG_PUMP.DATETIME " +
                                    "FROM USERLIST,sde.SLG_PUMP,REC_SLG_PUMP " +
                                    "WHERE USERLIST.ID=USERID AND REC_SLG_PUMP.OBJECTID=SLG_PUMP.OBJECTID");
            ds.Merge(ds_pump);

            //水闸操作信息
            DataSet ds_gate = QuaryUser("SELECT BYNAME,DEPARTMENT,OPERATION,'水闸' LAYERTYPE,SLG_GATE.OBJECTID,SZMC LAYERNAME,DETAIL,REC_SLG_GATE.DATETIME " +
                                    "FROM USERLIST,sde.SLG_GATE,REC_SLG_GATE " +
                                    "WHERE USERLIST.ID=USERID AND REC_SLG_GATE.OBJECTID=SLG_GATE.OBJECTID");
            ds.Merge(ds_gate);
            //ds按照时间排序
            DataView dv = ds.Tables[0].DefaultView;
            dv.Sort = "DATETIME Desc";
            DataTable newtable = dv.ToTable();
            ds.Tables.Clear();
            ds.Tables.Add(newtable);

            Response.Clear();
            Response.ContentEncoding = Encoding.UTF8;
            Response.ContentType = "application/json";
            Response.Write(ToJson(ds));
            Response.Flush();
            Response.End();
        }
    }
}