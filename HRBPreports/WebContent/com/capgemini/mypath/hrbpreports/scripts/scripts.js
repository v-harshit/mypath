//declare a name space object for the application to hold application specific variables and functions
var hrbpreports_ns = {};

var hrbpreportsContext = null;
var url_root = "",url_app="";
hrbpreports_ns.host = $(location).attr("host");

if ($(location).attr("hostname") == "localhost")
{
	hrbpreports_ns.url_root = "proxy/sap/opu/odata/sap/";
	hrbpreports_ns.url_app = location.protocol + "//"+ hrbpreports_ns.host + "/hrbpreports/";
}
else
{
	hrbpreports_ns.url_root = location.protocol + "//" + hrbpreports_ns.host + "/sap/opu/odata/sap/";
	hrbpreports_ns.url_app = location.protocol + "//"+ hrbpreports_ns.host + "/sap/bc/ui5_ui5/sap/zhrbpreports/";
}	






