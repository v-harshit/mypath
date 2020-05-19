//declare a name space object for the application to hold application specific variables and functions
var talent_profile_ns = {};

var url_root = "",url_app="";
talent_profile_ns.host = $(location).attr("host");
var testCB = "12345" ;



if ($(location).attr("hostname") == "localhost")
{
	talent_profile_ns.url_root = "proxy/sap/opu/odata/sap/";
	talent_profile_ns.url_app = location.protocol + "//"+ talent_profile_ns.host + "/ztalentprofile/";
}
else
{
	talent_profile_ns.url_root = location.protocol + "//" + talent_profile_ns.host + "/sap/opu/odata/sap/";
	talent_profile_ns.url_app = location.protocol + "//"+ talent_profile_ns.host + "/sap/bc/ui5_ui5/sap/ztalentprofile/";
}	







