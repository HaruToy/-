package executingprogram;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBC_example {
	// TODO Auto-generated method stub
			String url = "jdbc:mysql://localhost/list";
			String sql = "insert into customer values (?,?,?,?)";
			//table column
			
			String name;
			{
			try {
				Connection conn = DriverManager.getConnection(url, "root", "rlatngur1141!");
				Statement stmt = conn.createStatement();
				ResultSet rset = stmt.executeQuery("select* from list");
				while(rset.next()) {
					name = rset.getString(1);
					System.out.println(" name : " + name);
				}
				//PreparedStatement pstmt = conn.prepareStatement(sql);
				//pstmt.setString(1, "20210005");
				//pstmt.setString(2, "Leehimchan");
				//pstmt.setInt(3, 710000);
				//pstmt.setString(4, "01049072111");
				//pstmt.executeUpdate();
				
				stmt.close();
				conn.close();
			}
				catch(SQLException sqle) {
					System.out.println("SQLException: "+sqle);
				}
			}	
}
