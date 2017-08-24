using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Data;
using System.Data.OracleClient;
using System.Configuration;
using System.Data.OleDb;

namespace tools
{
    public static class quaryData
    {
        public static DataSet QuaryUser(string sql)
        {
            OracleDataAdapter ad = new OracleDataAdapter(sql, usercon());
            DataSet ds = new DataSet();
            ad.Fill(ds);
            return ds;
        }
        public static DataSet QuarySde(string sql)
        {
            OracleDataAdapter ad = new OracleDataAdapter(sql, sdecon());
            DataSet ds = new DataSet();
            ad.Fill(ds);
            return ds;
        }
        public static DataSet QuaryExcel(string sql)
        {
            OleDbDataAdapter ad = new OleDbDataAdapter(sql, excelcon());
            DataSet ds = new DataSet();
            ad.Fill(ds);
            return ds;
        }
        public static void OperateUser(string sql)
        {
            OracleConnection con = usercon();
            OracleCommand cmd = new OracleCommand(sql, con);
            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();
        }
        public static void OperateSde(string sql)
        {
            OracleConnection con = sdecon();
            OracleCommand cmd = new OracleCommand(sql, con);
            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();
        }

        private static OracleConnection usercon()
        {
            return new OracleConnection("Data Source=192.168.2.55:1521/orcl;Persist Security Info=True;User ID=useradmin;Password=userad;Unicode=True");
        }
        private static OracleConnection sdecon()
        {
            return new OracleConnection("Data Source=192.168.2.55:1521/orcl;Persist Security Info=True;User ID=sde;Password=sde;Unicode=True");
        }
        private static OleDbConnection excelcon()
        {
            return new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=F:/config.xlsx;Extended Properties='Excel 12.0;IMEX=1';");
        }
    }
}
