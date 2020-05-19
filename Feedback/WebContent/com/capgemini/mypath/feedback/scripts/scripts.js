//declare a name space object for the application to hold application specific variables and functions
var feedback_ns = {};

var feedbackContext = null;
var url_root = "",url_app="";
feedback_ns.host = $(location).attr("host");

if ($(location).attr("hostname") == "localhost")
{
	feedback_ns.url_root = "proxy/sap/opu/odata/sap/";
	feedback_ns.url_app = location.protocol + "//"+ feedback_ns.host + "/myPath_Feedback/";
}
else
{
	feedback_ns.url_root = location.protocol + "//" + feedback_ns.host + "/sap/opu/odata/sap/";
	feedback_ns.url_app = location.protocol + "//"+ feedback_ns.host + "/sap/bc/ui5_ui5/sap/zfeedback/";
}	 

feedback_ns.openReadOnlyText = function(args)
{

    if(args != undefined)
    var lines = args.split("\n"); 
    var count = lines.length;
    
    for(var i = 0  ; i < lines.length ; i++)    
    	if(lines[i].toString().length >= 100)    		
    	 count = count + parseInt((lines[i].toString().length)/100);   	
    
    	 count = count < 4 ? 20 : 20;
		//var rows_count = feedback_ns.getNoOfRows(feedbackContext.feedback_input.getValue());
		feedbackContext.overlay_text.setRows(count);
		
		if(!feedbackContext.isCalledFromDisplayFeedback)
		feedbackContext.overlay_text.setValue(feedbackContext.feedback_input.getValue());
		
		else
		feedbackContext.overlay_text.setValue(feedbackContext.feedback_input_readOnly.getText());
		
		feedbackContext.dlg.open();
};



/* Function to call service to get column texts */
function getFeedbackTemplateService(){
	var readRequestURL = "/ElementsTextSet?$filter=IvAppraisalType eq '"+myPathContext.documentText.GENERAL_FEEDBACK+"'";
	myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
    function(oData,oResponse){
		
		for(var i=0; i<oData.results.length; i++){
			var record = { name: oData.results[i].Name, infotext: oData.results[i].Tline};
			myPathContext.feedback_template[oData.results[i].RowIid] = record;
		}
			
		myPathContext.feedback_template_loaded = true;
	},
	function(oError){
    	 //TO DO - code to display error message
	});
	
}
