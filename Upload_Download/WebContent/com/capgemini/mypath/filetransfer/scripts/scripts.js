var mypath_filetransfer_ns = {};
var url_root = "",url_app="";

sap.ui.getCore().mypath_filetransferContext = new Object();
var	mypath_filetransferContext = sap.ui.getCore().mypath_filetransferContext;

mypath_filetransfer_ns.host = $(location).attr("host");
mypath_filetransferContext.url_host = location.protocol +"//"+ $(location).attr("host");
mypath_filetransferContext.url_root = mypath_filetransferContext.url_host + "/sap/opu/odata/sap/";
/*mypath_filetransferContext.url_app = mypath_filetransferContext.url_host + "/sap/bc/ui5_ui5/sap/";*/

if ($(location).attr("hostname") == "localhost")
{
	mypath_filetransferContext.url_root = "proxy/sap/opu/odata/sap/";

}
else
{
	mypath_filetransfer_ns.url_root = location.protocol + "//" + mypath_filetransfer_ns.host + "/sap/opu/odata/sap/";
	
}	