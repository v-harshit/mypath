//declare a name space object for the application to hold application specific variables and functions
var appraisal_ns = {};
var appraisalContext = null;
var url_root = "",url_app="";
appraisal_ns.host = $(location).attr("host");

if ($(location).attr("hostname") == "localhost")
{
	appraisal_ns.url_root = "proxy/sap/opu/odata/sap/";
	appraisal_ns.url_app = location.protocol + "//"+ appraisal_ns.host + "/myPath_Appraisal/";
}
else
{
	appraisal_ns.url_root = location.protocol + "//" + appraisal_ns.host + "/sap/opu/odata/sap/";
	appraisal_ns.url_app = location.protocol + "//"+ appraisal_ns.host + "/sap/bc/ui5_ui5/sap/Zappraisal/";
}	


emp_appraisal_modeldata = [
      	                          { 
      	                        	substatus :"P",	
      	                        	assessment_tab_visible:false,
      	                      	    assessment_tab_enabled : false,
      	                      	    features_comments_editable:true,
      	                      	    objectives_comments_editable:true,
      	                      	    footer_btn_visible : true,
      	                      	    over_all_assessment_emp_visible : false,
      	                      	    over_all_assessment_emp_editable : false,
      	                      	    over_all_assessment_manager_visible : false,
      	                      	    over_all_assessment_manager_editable : false,
      	                      	    other_tab_visible : true,
      	                      	    emp_signoff_comments_visible:false,
      	                      	    emp_signoff_comments_editable : false,
      	                      	    
      	                      	    appr_obj_save_submit_flag : true,
      	                      	    appr_obj_save_signoff_flag : false,
      	                      	    appr_obj_cancel_accept_flag : false,
      	                      	    assess_save_submit_flag : false,
      	                      	    assess_cancel_accept_flag : false,
      	                      	    assess_save_sign_off_flag : false,
      	                      	    pdf_icon_visible :true,//false
      	                      	   // attachement_icon_visible :true 
      	                      	    features_tab_cancel_btn_visible : false,
      	                      	    features_tab_next_btn_visible : false,
      	                      	    objectives_tab_cancel_btn_visible:false,
      	                      	    objectives_tab_next_btn_visible:false
      	                          },
      	                          { 
      	                        	substatus :"Q",	
      	                        	assessment_tab_visible:false,
      	                      	    assessment_tab_enabled : false,
      	                      	    features_comments_editable:false,
      	                      	    objectives_comments_editable:false,
      	                      	    footer_btn_visible : false,
      	                      	    over_all_assessment_emp_visible : false,
      	                      	    over_all_assessment_emp_editable : false,
      	                      	    over_all_assessment_manager_visible : false,
      	                      	    over_all_assessment_manager_editable : false,
      	                      	    other_tab_visible : true,
      	                         	emp_signoff_comments_visible:false,
   	                      	        emp_signoff_comments_editable : false,
      	                      	    
      	                      	    appr_obj_save_submit_flag : false,
	   	                      	    appr_obj_save_signoff_flag : false,
	   	                      	    appr_obj_cancel_accept_flag : false,
	   	                      	    assess_save_submit_flag : false,
	   	                      	    assess_cancel_accept_flag : false,
	   	                      	    assess_save_sign_off_flag : false,
	   	                         	pdf_icon_visible :true,
		                      	   // attachement_icon_visible :false
		   	                         features_tab_cancel_btn_visible : true,
	   	                      	     features_tab_next_btn_visible : true,
	   	                      	     objectives_tab_cancel_btn_visible:false,
	   	                      	     objectives_tab_next_btn_visible:false
      	                          },
      	                          { 
      	                        	substatus :"Z",	
      	                        	assessment_tab_visible:false,
      	                      	    assessment_tab_enabled : false,
      	                      	    features_comments_editable:false,
      	                      	    objectives_comments_editable:false,
      	                      	    footer_btn_visible : false,
      	                      	    over_all_assessment_emp_visible : false,
      	                      	    over_all_assessment_emp_editable : false,
      	                      	    over_all_assessment_manager_visible : false,
      	                      	    over_all_assessment_manager_editable : false,
      	                      	    other_tab_visible : true,
      	                      	    emp_signoff_comments_visible:false,
   	                      	        emp_signoff_comments_editable : false,
      	                      	    
      	                     	    appr_obj_save_submit_flag : false,
    	                      	    appr_obj_save_signoff_flag : false,
    	                      	    appr_obj_cancel_accept_flag : true,//Cancel and accept buttons
    	                      	    assess_save_submit_flag : false,
    	                      	    assess_cancel_accept_flag : false,
    	                      	    assess_save_sign_off_flag : false,
    	                      	    pdf_icon_visible :true,
    	                      	   // attachement_icon_visible :false
    	                      	     features_tab_cancel_btn_visible : true,
	   	                      	     features_tab_next_btn_visible : true,
	   	                      	     objectives_tab_cancel_btn_visible:false,
	   	                      	     objectives_tab_next_btn_visible:false
      	                          },
      	                          { 
      	                        	substatus :"R",	
      	                        	assessment_tab_visible:true,
      	                      	    assessment_tab_enabled : true,
      	                      	    features_comments_editable:false,
      	                      	    objectives_comments_editable:false,
      	                      	    footer_btn_visible : false,
      	                      	    over_all_assessment_emp_visible : true,
      	                      	    over_all_assessment_emp_editable : true,
      	                      	    over_all_assessment_manager_visible : false,
      	                      	    over_all_assessment_manager_editable : false,
      	                      	    other_tab_visible : true,
      	                      	    emp_signoff_comments_visible:false,
   	                      	        emp_signoff_comments_editable : false,
      	                      	    
	      	                      	appr_obj_save_submit_flag : false,
		                      	    appr_obj_save_signoff_flag : false,
		                      	    appr_obj_cancel_accept_flag : false,
		                      	    assess_save_submit_flag : true,//save and submit buttons
		                      	    assess_cancel_accept_flag : false,
		                      	    assess_save_sign_off_flag : false,
		                      	    pdf_icon_visible :true,//false
		                      	   // attachement_icon_visible :true
		                      	     features_tab_cancel_btn_visible : true,
	   	                      	     features_tab_next_btn_visible : true,
	   	                      	     objectives_tab_cancel_btn_visible:true,
	   	                      	     objectives_tab_next_btn_visible:true
      	                          },
      	                          { 
      	                        	substatus :"S",	
      	                        	assessment_tab_visible:true,
      	                      	    assessment_tab_enabled : true,
      	                      	    features_comments_editable:false,
      	                      	    objectives_comments_editable:false,
      	                      	    footer_btn_visible : false,
      	                      	    over_all_assessment_emp_visible : true,
      	                      	    over_all_assessment_emp_editable : false,
      	                      	    over_all_assessment_manager_visible : false,
      	                      	    over_all_assessment_manager_editable : false,
      	                      	    other_tab_visible : true,
      	                      	    emp_signoff_comments_visible:false,
   	                      	        emp_signoff_comments_editable : false,
      	                      	    
	      	                      	appr_obj_save_submit_flag : false,
		                      	    appr_obj_save_signoff_flag : false,
		                      	    appr_obj_cancel_accept_flag : false,
		                      	    assess_save_submit_flag : false,
		                      	    assess_cancel_accept_flag : false,
		                      	    assess_save_sign_off_flag : false,
		                      	    pdf_icon_visible :true,
  	                      	       // attachement_icon_visible :false
		                      	     features_tab_cancel_btn_visible : true,
	   	                      	     features_tab_next_btn_visible : true,
	   	                      	     objectives_tab_cancel_btn_visible:true,
	   	                      	     objectives_tab_next_btn_visible:true
      	                          },
      	                          { 
    	                        	substatus :"T",	
    	                        	assessment_tab_visible:true,
      	                      	    assessment_tab_enabled : true,
      	                      	    features_comments_editable:false,
      	                      	    objectives_comments_editable:false,
      	                      	    footer_btn_visible : false,
      	                      	    over_all_assessment_emp_visible : true,
      	                      	    over_all_assessment_emp_editable : false,
      	                      	    over_all_assessment_manager_visible : true,
      	                      	    over_all_assessment_manager_editable : false,
      	                      	    other_tab_visible : true,
      	                      	    emp_signoff_comments_visible:true,
   	                      	        emp_signoff_comments_editable : true,
      	                      	    
	      	                       	appr_obj_save_submit_flag : false,
		                      	    appr_obj_save_signoff_flag : false,
		                      	    appr_obj_cancel_accept_flag : false,
		                      	    assess_save_submit_flag : false,
		                      	    assess_cancel_accept_flag : true,//cancel and accept
		                      	    assess_save_sign_off_flag : false,
		                      	    pdf_icon_visible :true,//false
		                      	   // attachement_icon_visible :true
		                      	     features_tab_cancel_btn_visible : true,
	   	                      	     features_tab_next_btn_visible : true,
	   	                      	     objectives_tab_cancel_btn_visible:true,
	   	                      	     objectives_tab_next_btn_visible:true
        	                      },
        	                      { 
        	                        	substatus :"X",	
        	                        	assessment_tab_visible:true,
          	                      	    assessment_tab_enabled : true,
          	                      	    features_comments_editable:false,
          	                      	    objectives_comments_editable:false,
          	                      	    footer_btn_visible : false,
          	                      	    over_all_assessment_emp_visible : true,
          	                      	    over_all_assessment_emp_editable : false,
          	                      	    over_all_assessment_manager_visible : true,
          	                      	    over_all_assessment_manager_editable : false,
          	                      	    other_tab_visible : true,
          	                      	    emp_signoff_comments_visible:true,
       	                      	        emp_signoff_comments_editable : false,
          	                      	    
          	                        	appr_obj_save_submit_flag : false,
        	                      	    appr_obj_save_signoff_flag : false,
        	                      	    appr_obj_cancel_accept_flag : false,
        	                      	    assess_save_submit_flag : false,
        	                      	    assess_cancel_accept_flag : false,
        	                      	    assess_save_sign_off_flag : false,
        	                      	    pdf_icon_visible :true,
      	                      	       // attachement_icon_visible :false
        	                      	  features_tab_cancel_btn_visible : true,
 	   	                      	     features_tab_next_btn_visible : true,
 	   	                      	     objectives_tab_cancel_btn_visible:true,
 	   	                      	     objectives_tab_next_btn_visible:true
            	                   },
            	                   { 
       	                        	    substatus :"",	
       	                        	    assessment_tab_visible:false,
         	                      	    assessment_tab_enabled : false,
         	                      	    features_comments_editable:true,
         	                      	    objectives_comments_editable:true,
         	                      	    footer_btn_visible : true,
         	                      	    over_all_assessment_emp_visible : false,
         	                      	    over_all_assessment_emp_editable : false,
         	                      	    over_all_assessment_manager_visible : false,
         	                      	    over_all_assessment_manager_editable : false,
         	                      	    other_tab_visible : false,
         	                      	    emp_signoff_comments_visible:false,
       	                      	        emp_signoff_comments_editable : false,
         	                      	    
         	                         	appr_obj_save_submit_flag : true,
        	                      	    appr_obj_save_signoff_flag : false,
        	                      	    appr_obj_cancel_accept_flag : false,
        	                      	    assess_save_submit_flag : false,
        	                      	    assess_cancel_accept_flag : false,
        	                      	    assess_save_sign_off_flag : false,
        	                      	    pdf_icon_visible :false,
      	                      	       // attachement_icon_visible :false
        	                      	    features_tab_cancel_btn_visible : false,
        	                      	    features_tab_next_btn_visible : false,
        	                      	    objectives_tab_cancel_btn_visible:false,
        	                      	    objectives_tab_next_btn_visible:false
           	                   },
      	                         ];	

manager_appraisal_modeldata= [
  	                          { 
    	                        	substatus :"P",	
    	                        	assessment_tab_visible:false,
      	                      	    assessment_tab_enabled : false,
      	                      	    features_comments_editable:false,
      	                      	    objectives_comments_editable:false,
      	                      	    footer_btn_visible : false,
      	                      	    over_all_assessment_emp_visible : false,
      	                      	    over_all_assessment_emp_editable : false,
      	                      	    over_all_assessment_manager_visible : false,
      	                      	    over_all_assessment_manager_editable : false,
      	                      	    other_tab_visible : true,
      	                      	    emp_signoff_comments_visible:false,
   	                      	        emp_signoff_comments_editable : false,
      	                      	    
	      	                      	appr_obj_save_submit_flag : false,
	   	                      	    appr_obj_save_signoff_flag : false,
	   	                      	    appr_obj_cancel_accept_flag : false,
	   	                      	    assess_save_submit_flag : false,
	   	                      	    assess_cancel_accept_flag : false,
	   	                      	    assess_save_sign_off_flag : false,
	   	                      	    pdf_icon_visible :true,//false
		                      	   // attachement_icon_visible :false
		   	                      	 features_tab_cancel_btn_visible : false,
	  	                      	     features_tab_next_btn_visible : false,
	  	                      	     objectives_tab_cancel_btn_visible:false,
	  	                      	     objectives_tab_next_btn_visible:false
    	                          },
    	                          { 
    	                        	substatus :"Q",	
    	                        	assessment_tab_visible:false,
      	                      	    assessment_tab_enabled : false,
      	                      	    features_comments_editable:true,
      	                      	    objectives_comments_editable:true,
      	                      	    footer_btn_visible : true,
      	                      	    over_all_assessment_emp_visible : false,
      	                      	    over_all_assessment_emp_editable : false,
      	                      	    over_all_assessment_manager_visible : false,
      	                      	    over_all_assessment_manager_editable : false,
      	                      	    other_tab_visible : true,
      	                      	    emp_signoff_comments_visible:false,
   	                      	        emp_signoff_comments_editable : false,
      	                      	    
      	                      	    appr_obj_save_submit_flag : false,
    	                      	    appr_obj_save_signoff_flag : true,//Save and signoff buttons
    	                      	    appr_obj_cancel_accept_flag : false,
    	                      	    assess_save_submit_flag : false,
    	                      	    assess_cancel_accept_flag : false,
    	                      	    assess_save_sign_off_flag : false,
    	                      	    pdf_icon_visible :true,//false
  	                      	       // attachement_icon_visible :true
    	                      	  features_tab_cancel_btn_visible : false,
	  	                      	     features_tab_next_btn_visible : false,
	  	                      	     objectives_tab_cancel_btn_visible:false,
	  	                      	     objectives_tab_next_btn_visible:false
    	                          },
    	                          { 
    	                        	substatus :"Z",	
    	                        	assessment_tab_visible:false,
      	                      	    assessment_tab_enabled : false,
      	                      	    features_comments_editable:false,
      	                      	    objectives_comments_editable:false,
      	                      	    footer_btn_visible : false,
      	                      	    over_all_assessment_emp_visible : false,
      	                      	    over_all_assessment_emp_editable : false,
      	                      	    over_all_assessment_manager_visible : false,
      	                      	    over_all_assessment_manager_editable : false,
      	                      	    other_tab_visible : true,
      	                      	   emp_signoff_comments_visible:false,
   	                      	       emp_signoff_comments_editable : false,
      	                      	    
	      	                   	    appr_obj_save_submit_flag : false,
		                      	    appr_obj_save_signoff_flag : false,
		                      	    appr_obj_cancel_accept_flag : false,
		                      	    assess_save_submit_flag : false,
		                      	    assess_cancel_accept_flag : false,
		                      	    assess_save_sign_off_flag : false,
		                      	    pdf_icon_visible :true,
		                      	   // attachement_icon_visible :false
		                      	  features_tab_cancel_btn_visible : true,
	  	                      	     features_tab_next_btn_visible : true,
	  	                      	     objectives_tab_cancel_btn_visible:false,
	  	                      	     objectives_tab_next_btn_visible:false
    	                          },
    	                          { 
    	                        	substatus :"R",	
    	                        	assessment_tab_visible:false,
      	                      	    assessment_tab_enabled : false,
      	                      	    features_comments_editable:false,
      	                      	    objectives_comments_editable:false,
      	                      	    footer_btn_visible : false,
      	                      	    over_all_assessment_emp_visible : false,
      	                      	    over_all_assessment_emp_editable : false,
      	                      	    over_all_assessment_manager_visible : false,
      	                      	    over_all_assessment_manager_editable : false,
      	                      	    other_tab_visible : true,
      	                      	    emp_signoff_comments_visible:false,
   	                      	        emp_signoff_comments_editable : false,
      	                      	    
	      	                       	appr_obj_save_submit_flag : false,
		                      	    appr_obj_save_signoff_flag : false,
		                      	    appr_obj_cancel_accept_flag : false,
		                      	    assess_save_submit_flag : false,
		                      	    assess_cancel_accept_flag : false,
		                      	    assess_save_sign_off_flag : false,
		                      	    pdf_icon_visible :true,
  	                      	       // attachement_icon_visible :false
		                      	  features_tab_cancel_btn_visible : true,
	  	                      	     features_tab_next_btn_visible : true,
	  	                      	     objectives_tab_cancel_btn_visible:false,
	  	                      	     objectives_tab_next_btn_visible:false
    	                          },
    	                          { 
    	                        	substatus :"S",	
    	                        	assessment_tab_visible:true,
      	                      	    assessment_tab_enabled : true,
      	                      	    features_comments_editable:false,
      	                      	    objectives_comments_editable:false,
      	                      	    footer_btn_visible : false,
      	                      	    over_all_assessment_emp_visible : true,
      	                      	    over_all_assessment_emp_editable : false,
      	                      	    over_all_assessment_manager_visible : true,
      	                      	    over_all_assessment_manager_editable : true,
      	                      	    other_tab_visible : true,
      	                      	    emp_signoff_comments_visible:false,
   	                      	        emp_signoff_comments_editable : false,
      	                      	    
      	                        	appr_obj_save_submit_flag : false,
		                      	    appr_obj_save_signoff_flag : false,
		                      	    appr_obj_cancel_accept_flag : false,
		                      	    assess_save_submit_flag : false,
		                      	    assess_cancel_accept_flag : false,
		                      	    assess_save_sign_off_flag : true,
		                      	    pdf_icon_visible :true,//false
  	                      	       // attachement_icon_visible :true
		                      	  features_tab_cancel_btn_visible : true,
	  	                      	     features_tab_next_btn_visible : true,
	  	                      	     objectives_tab_cancel_btn_visible:true,
	  	                      	     objectives_tab_next_btn_visible:true
    	                          },
    	                          { 
	  	                        	substatus :"T",  
	  	                        	assessment_tab_visible:true,
		                      	    assessment_tab_enabled : true,
		                      	    features_comments_editable:false,
		                      	    objectives_comments_editable:false,
		                      	    footer_btn_visible : false,
		                      	    over_all_assessment_emp_visible : true,
		                      	    over_all_assessment_emp_editable : false,
		                      	    over_all_assessment_manager_visible : true,
		                      	    over_all_assessment_manager_editable : false,
		                      	    other_tab_visible : true,
		                      	    emp_signoff_comments_visible:false,
    	                      	    emp_signoff_comments_editable : false,
		                      	    
		                         	appr_obj_save_submit_flag : false,
		                      	    appr_obj_save_signoff_flag : false,
		                      	    appr_obj_cancel_accept_flag : false,
		                      	    assess_save_submit_flag : false,
		                      	    assess_cancel_accept_flag : false,
		                      	    assess_save_sign_off_flag : false,
		                      	    pdf_icon_visible :true,
  	                      	       // attachement_icon_visible :false
		                      	  features_tab_cancel_btn_visible : true,
	  	                      	     features_tab_next_btn_visible : true,
	  	                      	     objectives_tab_cancel_btn_visible:true,
	  	                      	     objectives_tab_next_btn_visible:true
      	                      },
      	                      { 
      	                        substatus :"X",	
      	                      	assessment_tab_visible:true,
  	                      	    assessment_tab_enabled : true,
  	                      	    features_comments_editable:false,
  	                      	    objectives_comments_editable:false,
  	                      	    footer_btn_visible : false,
  	                      	    over_all_assessment_emp_visible : true,
  	                      	    over_all_assessment_emp_editable : false,
  	                      	    over_all_assessment_manager_visible : true,
  	                      	    over_all_assessment_manager_editable : false,
  	                      	    other_tab_visible : true,
  	                      	    emp_signoff_comments_visible:true,
	                      	    emp_signoff_comments_editable : false,
  	                      	    
  	                        	appr_obj_save_submit_flag : false,
	                      	    appr_obj_save_signoff_flag : false,
	                      	    appr_obj_cancel_accept_flag : false,
	                      	    assess_save_submit_flag : false,
	                      	    assess_cancel_accept_flag : false,
	                      	    assess_save_sign_off_flag : false,
	                      	    pdf_icon_visible :true,
	                      	   // attachement_icon_visible :false
	                      	  features_tab_cancel_btn_visible : true,
	                      	     features_tab_next_btn_visible : true,
	                      	     objectives_tab_cancel_btn_visible:true,
	                      	     objectives_tab_next_btn_visible:true
          	                   },
          	                 { 
  	                        	    substatus :"",	
  	                        	    assessment_tab_visible:false,
    	                      	    assessment_tab_enabled : false,
    	                      	    features_comments_editable:true,
    	                      	    objectives_comments_editable:true,
    	                      	    footer_btn_visible : true,
    	                      	    over_all_assessment_emp_visible : false,
    	                      	    over_all_assessment_emp_editable : false,
    	                      	    over_all_assessment_manager_visible : false,
    	                      	    over_all_assessment_manager_editable : false,
    	                      	    other_tab_visible : false,
    	                       	    emp_signoff_comments_visible:false,
    	                      	    emp_signoff_comments_editable : false,
    	                      	    
    	                          	appr_obj_save_submit_flag : true,
    	                      	    appr_obj_save_signoff_flag : false,
    	                      	    appr_obj_cancel_accept_flag : false,
    	                      	    assess_save_submit_flag : false,
    	                      	    assess_cancel_accept_flag : false,
    	                      	    assess_save_sign_off_flag : false,
    	                      	    pdf_icon_visible :false,
  	                      	       // attachement_icon_visible :false
    	                      	    features_tab_cancel_btn_visible : false,
    	                      	    features_tab_next_btn_visible : false,
    	                      	    objectives_tab_cancel_btn_visible:false,
    	                      	    objectives_tab_next_btn_visible:false
      	                   },
    	                         
    	             ];



/* Function to call service to get column texts */
function getAppraisalTemplateService(){
	var readRequestURL = "/ElementsTextSet?$filter=IvAppraisalType eq '"+myPathContext.documentText.ASSIGNMENT_APPRAISAL+"'";
	myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
    function(oData,oResponse){
		
		for(var i=0; i<oData.results.length; i++){
			var record = { name: oData.results[i].Name, infotext: oData.results[i].Tline};
			myPathContext.appraisal_template[oData.results[i].RowIid] = record;
		}
			
		myPathContext.appraisal_template_loaded = true;
	},
	function(oError){
    	 //TO DO - code to display error message
	});
	
}

appraisal_ns.openReadOnlyText = function(args)
{

    if(args != undefined)
    var lines = args.split("\n"); 
    var count = lines.length;
    
    for(var i = 0  ; i < lines.length ; i++)    
    	if(lines[i].toString().length >= 100)    		
    	 count = count + parseInt((lines[i].toString().length)/100);   
    
    	 count = count < 4 ? 20 : 20;		
    	appraisalContext.overlay_text.setRows(count);
    	appraisalContext.overlay_text.setValue(args);
    	
    	appraisalContext.dlg.open();
};