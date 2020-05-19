//declare a name space object for the application to hold application specific variables and functions
var historical_ns = {};

var historicalContext = null;
var url_root = "",url_app="";
historical_ns.host = $(location).attr("host");

if ($(location).attr("hostname") == "localhost")
{
	historical_ns.url_root = "proxy/sap/opu/odata/sap/";
	historical_ns.url_app = location.protocol + "//"+ historical_ns.host + "/myPath_HistoricalDocs/";
}
else
{
	historical_ns.url_root = location.protocol + "//" + historical_ns.host + "/sap/opu/odata/sap/";
	historical_ns.url_app = location.protocol + "//"+ historical_ns.host + "/sap/bc/ui5_ui5/sap/zhistoricaldocs/";
}	






