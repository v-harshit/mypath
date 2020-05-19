//declare a name space object for the application to hold application specific variables and functions
var performancereview_ns = {};

var performancereviewContext = null;
var url_root = "",url_app="";
performancereview_ns.host = $(location).attr("host");

if ($(location).attr("hostname") == "localhost")
{
	performancereview_ns.url_root = "proxy/sap/opu/odata/sap/";
	performancereview_ns.url_app = location.protocol + "//"+ performancereview_ns.host + "/PerformanceReview/";
}
else
{
	performancereview_ns.url_root = location.protocol + "//" + performancereview_ns.host + "/sap/opu/odata/sap/";
	performancereview_ns.url_app = location.protocol + "//"+ performancereview_ns.host + "/sap/bc/ui5_ui5/sap/zperformreview/";
}	






