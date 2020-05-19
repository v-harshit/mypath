//declare a name space object for the application to hold application specific variables and functions
var performancereviewVP_ns = {};

var performancereviewVPContext = null;
var url_root = "",url_app="";
performancereviewVP_ns.host = $(location).attr("host");

if ($(location).attr("hostname") == "localhost")
{
	performancereviewVP_ns.url_root = "proxy/sap/opu/odata/sap/";
	performancereviewVP_ns.url_app = location.protocol + "//"+ performancereviewVP_ns.host + "/performancereviewVP/";
}
else
{
	performancereviewVP_ns.url_root = location.protocol + "//" + performancereviewVP_ns.host + "/sap/opu/odata/sap/";
	performancereviewVP_ns.url_app = location.protocol + "//"+ performancereviewVP_ns.host + "/sap/bc/ui5_ui5/sap/zperfrmreviewvp/";
}	






