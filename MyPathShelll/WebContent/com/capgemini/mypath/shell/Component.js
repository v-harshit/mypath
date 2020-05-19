// define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.util.scripts");
jQuery.sap.require("com.capgemini.mypath.util.FilterButton");
jQuery.sap.require("com.capgemini.mypath.util.WorkflowType");
jQuery.sap.require("com.capgemini.mypath.util.Workflow");
//jQuery.sap.require("com.capgemini.mypath.util.Logout");

//new component declaration
jQuery.sap.declare("com.capgemini.mypath.shell.Component");


// new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.shell.Component", {

	metadata : {
		
		     properties: {
                    text : "string"
            }  
	}
});

com.capgemini.mypath.shell.Component.prototype.createContent = function() {
	
//Create JSON for Document Icon
	/*var docJSON = {
		"2B" : "./com/capgemini/mypath/images/icon_emp_objsetting.png",
		"2C" : "./com/capgemini/mypath/images/icon_with_rev.png",
		"2D" : "./com/capgemini/mypath/images/icon_signoff1.png",
		"2E" : "./com/capgemini/mypath/images/icon_signoff2.png",
		
		"3F" : "./com/capgemini/mypath/images/icon_emp_objsetting.png",
		"3G" : "./com/capgemini/mypath/images/icon_signoff2.png",
		"3H" : "./com/capgemini/mypath/images/icon_signoff1.png",
		"3I" : "./com/capgemini/mypath/images/icon_complete.png",
		
		"4J" : "./com/capgemini/mypath/images/icon_emp_objsetting.png",
		"4K" : "./com/capgemini/mypath/images/icon_with_rev.png",
		"4L" : "./com/capgemini/mypath/images/icon_calibration.png",
		"4M" : "./com/capgemini/mypath/images/icon_signoff1.png",
		"4N" : "./com/capgemini/mypath/images/icon_yearend_signoff.png",
		"4O" : "./com/capgemini/mypath/images/icon_yearend_signoff.png",
		"5U" : "./com/capgemini/mypath/images/icon_complete.png",
		
		"2P" : "./com/capgemini/mypath/images/icon_emp_objsetting.png",
		"2Q" : "./com/capgemini/mypath/images/icon_signoff3.png",
		"2Z" : "./com/capgemini/mypath/images/icon_signoff2.png",
		"3R" : "./com/capgemini/mypath/images/icon_emp_objsetting.png",
		"3S" : "./com/capgemini/mypath/images/icon_signoff2.png",
		"3T" : "./com/capgemini/mypath/images/icon_signoff1.png",
		"3X" : "./com/capgemini/mypath/images/icon_complete.png",
		
		"2V" : "./com/capgemini/mypath/images/icon_gf.png",
		"2W" : "./com/capgemini/mypath/images/icon_complete.png",
		"3W" : "./com/capgemini/mypath/images/icon_complete.png",
		"3Z" : "./com/capgemini/mypath/images/icon_complete.png",
		
		//"2" : "NH"
	};*/
	var docJSON = {
			"2B" : "./com/capgemini/mypath/images/blue/Employee-icon-blue.png",
			"2C" : "./com/capgemini/mypath/images/blue/reviewer_employee-icon-blue.png",
			"2D" : "./com/capgemini/mypath/images/blue/Signoff-1-blue.png",
			"2E" : "./com/capgemini/mypath/images/blue/Signoff-2-blue.png",
			
			"3F" : "./com/capgemini/mypath/images/blue/Employee-icon-blue.png",
			"3G" : "./com/capgemini/mypath/images/blue/Signoff-2-blue.png",
			"3H" : "./com/capgemini/mypath/images/blue/Signoff-1-blue.png",
			"3I" : "./com/capgemini/mypath/images/blue/complete-icon-blue.png",
			
			"4J" : "./com/capgemini/mypath/images/blue/Employee-icon-blue.png",
			"4K" : "./com/capgemini/mypath/images/blue/reviewer_employee-icon-blue.png",
			"4L" : "./com/capgemini/mypath/images/blue/Calibration-icon-blue.png",
			"4M" : "./com/capgemini/mypath/images/blue/Signoff-1-blue.png",
			"4N" : "./com/capgemini/mypath/images/blue/Year-End-Signoff-blue.png",
			"4O" : "./com/capgemini/mypath/images/blue/Year-End-Signoff-blue.png",
			"5U" : "./com/capgemini/mypath/images/blue/complete-icon-blue.png",
			
			"2P" : "./com/capgemini/mypath/images/blue/Employee-icon-blue.png",
			"2Q" : "./com/capgemini/mypath/images/blue/Signoff-3-blue.png",
			"2Z" : "./com/capgemini/mypath/images/blue/Signoff-2-blue.png",
			"3R" : "./com/capgemini/mypath/images/blue/Employee-icon-blue.png",
			"3S" : "./com/capgemini/mypath/images/blue/Signoff-2-blue.png",
			"3T" : "./com/capgemini/mypath/images/blue/Signoff-1-blue.png",
			"3X" : "./com/capgemini/mypath/images/blue/complete-icon-blue.png",
			
			"2V" : "./com/capgemini/mypath/images/icon_gf.png",
			"2V1" : "./com/capgemini/mypath/images/blue/Create-Feedback-blue.png",
			"2W" : "./com/capgemini/mypath/images/blue/complete-icon-blue.png",
			"3W" : "./com/capgemini/mypath/images/blue/complete-icon-blue.png",
			"3Z" : "./com/capgemini/mypath/images/blue/complete-icon-blue.png",
			
			//"2" : "NH"
		};
	//console.log(docJSON("1"));
	myPathContext.docJSON = docJSON ;
	
	
//Till Here	
	
	jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/mypath_style.css");
	jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/filter_button_style.css");
	jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/workflow_style.css");
	jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/common_style.css");
	jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/appraisal_style.css");
	
	jQuery.sap.require("com.capgemini.mypath.shell.scripts.scripts");
	
	var oView = null;
	
	var hidden_date_for_format = new sap.m.DatePicker({
		visible: false
	});
	hidden_date_for_format.placeAt("content");
	myPathContext.hidden_date_for_format = hidden_date_for_format;
	
	// create root view
	oView = sap.ui.view({
		id : "mypath_mainapp",
		viewName : "com.capgemini.mypath.shell.view.appshell",
		type : "JS",
		viewData : {
			component : this
		}
	});
	
	oView.setModel(myPathContext.i18nModel, "i18n");

	return oView;
	
};