//declare a name space object for the application to hold application specific variables and functions
var talent_profile_ns = {};

var url_root = "",url_app="";
talent_profile_ns.host = $(location).attr("host");

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

/* function to get core behavior competencies */
function getCoreBehaviorCompetencies(){
	talentProfileContext.coreBehaviorCompetencies = new Object();
	talentProfileContext.talentprofile_searchoDataModel.read("RatingSearchHelpSet?$filter=ValueType eq '" + 84 + "'", null, null, true, 
	function(oData, oResponse) {
	    var array = oData.results;
	    for (var i = 0; i < array.length; i++) {
	    	var value = array[i];
	    	talentProfileContext.coreBehaviorCompetencies[value.ValueIid] = value.ValueText;
	    }
	}, function() {});
}

/* function to get professional competencies */
function getProfessionalCompetencies(){
	talentProfileContext.professionalCompetencies = new Object();
	talentProfileContext.talentprofile_searchoDataModel.read("RatingSearchHelpSet?$filter=ValueType eq '" + 86 + "'", null, null, true, 
	function(oData, oResponse) {
	    var array = oData.results;
	    for (var i = 0; i < array.length; i++) {
	    	var value = array[i];
	    	talentProfileContext.professionalCompetencies[value.ValueIid] = value.ValueText;
	    }
	}, function() {});
}

/* function to get all qualifications */
function getAllQualifications(){
	
	var requestURL = "QualificationSet";
	talentProfileContext.talentprofile_oDataModel.read(requestURL,null,null,true,
		function(oData, oResponse){
			
			var results = oData.results;
			myPathContext.talent_profile_template = [];
			var level2Prof = "";
			var level2ObjID  = "";
			for(var i=0; i<results.length; i++){
				//Level: 2Objid: "60000199"Otype: "QK"Stext: "Professional Competencies"
				
				
					
					if ( results[i].Level == 2)
						{
						var data = { qgroupid:results[i].Objid, qgrouptext: results[i].Stext };
						myPathContext.talent_profile_template.push(data);
						level2Prof  = results[i].Stext ;
						level2ObjID = results[i].Objid ;
						}
					else if ( results[i].Level == 3)
						{/*
						results[i].isNA = false;
						results[i].isCleared = false;
						results[i].sliderEnabled = true;
						results[i].Rating = parseInt(results[i].Rating,"10");
						talentProfileContext.modeldata.push(results[i]);60000200
						*/}
					if (  results[i].Level != 2)
						{
						var rating = 1;
						
						if ( "60000200" == level2ObjID)
							{
							rating =  0 ;
							}
						if ( talentProfileContext.AddedObj.indexOf(results[i].Objid) == -1)
							{
					var data = {"Stext" : results[i].Stext  , "isNA" : true , "isCleared" : false , "QgroupId" : level2ObjID , "Rating":  rating , "ObjId" : results[i].Objid,
							"sliderEnabled" : false , "OriginalNA" : true};
					talentProfileContext.modeldata.push(data);
							}
						}
			};
			
			for(var i=0; i<talentProfileContext.modeldata.length; i++){
				
				if(talentProfileContext.modeldata[i].QgroupId == talentProfileContext.competencies.CORE_BEHAVIOR){
					talentProfileContext.coreBehaviorQualifications.push(talentProfileContext.modeldata[i]);
				}
				else if(talentProfileContext.modeldata[i].QgroupId == talentProfileContext.competencies.PROFESSIONAL){
					talentProfileContext.professionalQualifications.push(talentProfileContext.modeldata[i]);
				}
				else if(talentProfileContext.modeldata[i].QgroupId == talentProfileContext.competencies.ROLE_SPECIFIC){
					talentProfileContext.roleQualifications.push(talentProfileContext.modeldata[i]);
				}
			}
			
			
			getTalentProfileModelData();
			//generateTalentProfileScreen();
			
		},
		function(oError){
			hideBusy();
			//TO DO code for error handling
		}
		);
		
	
}

/* Function to generate talent profile model data */
function getTalentProfileModelData(){
	
	//talentProfileContext.modeldata = [];
	talentProfileContext.qualificationGroups = [];
	
	for(var i=0; i<myPathContext.talent_profile_template.length; i++){
		var record = talentProfileContext.modelrecord;
		
		record.QgroupId = myPathContext.talent_profile_template[i].qgroupid;
		record.Qgrouptxt = myPathContext.talent_profile_template[i].qgrouptext;
		record.ObjId = myPathContext.talent_profile_template[i].qid;
		record.Stext = myPathContext.talent_profile_template[i].qtext;
		
		//talentProfileContext.modeldata.push(record);
		
		record = {groupid : myPathContext.talent_profile_template[i].qgroupid, groupname : myPathContext.talent_profile_template[i].qgrouptext};
		if(talentProfileContext.qualificationGroups.indexOf(record) < 0){
			talentProfileContext.qualificationGroups.push(record);
		}
	}
	generateTalentProfileScreen();
	
	//"60000202" , 60000203, "60000310"
	/*talentProfileContext.qualificationGroups = [
	                                        	{groupid: "60000200",groupname: "Core Behaviours" },
	                                        	{groupid: "60000199",groupname: "Professional Competencies" },
	                                        	{groupid: "60000201",groupname: "Role-Specific Competencies" },
	                                        	];*/
}

/*function callTPManagerService()
{

	var serviceURL = myPathContext.url_root + "ZGW_MYPATH_TALENT_PROFILE_SRV";
	var dashboard_ODataModel = new sap.ui.model.odata.ODataModel(serviceURL);
    myPathContext.dashboard_ODataModel = dashboard_ODataModel;
    myPathContext.employeeId = "60018639" ;
	var readRequestURL = "/EmployeeSet?$filter=IvEmployeeid eq '"+myPathContext.employeeId+"'";
	myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
    function(oData,oResponse){
		
		var emp_data = new Array();
		for(var i=0; i<oData.results.length; i++){
			emp_data.push(oData.results[i]);
		}
		var emp_itemTemplate = createTPItemTemplate("employee");
		var emp_data_model = new sap.ui.model.json.JSONModel();
		emp_data_model.setData({modelData: emp_data});
		talentProfileContext.emp_list.setModel(emp_data_model);
		talentProfileContext.emp_list.bindAggregation("items", "/modelData", emp_itemTemplate);
	},
	function(oError){
     	 //TO DO - code to display error message
		hideBusy();
	});
	//}, 500);
	

	
	var emp_itemTemplate = createTPItemTemplate("employee");
	var emp_data_model = new sap.ui.model.json.JSONModel();
	emp_data_model.setData({modelData: emp_data});
	myPathContext.carousel_emp_list.setModel(emp_data_model);
	myPathContext.carousel_emp_list.bindAggregation("items", "/modelData", emp_itemTemplate);
}

function createTPItemTemplate(){
	
	var vLayout1 = new sap.ui.commons.layout.VerticalLayout({
		content:[
		         new sap.m.Text({
		        	 text: "{Name}"
		         }).addStyleClass("tp_empname"),
		         
		       ]
	}).addStyleClass("tp_mgr_vlaoyout");
	
	var docItemArrow = new sap.ui.commons.Image({
		src : "./com/capgemini/mypath/images/icon_forward_arrow.png",
	}).addStyleClass("mypath_doc_item_arrow");
	
	var action_item = new sap.m.CustomListItem({
		type: sap.m.ListType.Active,
		content:[vLayout1,docItemArrow],
		press: function(oControlEvent){
			
			var path = oControlEvent.getSource().getBindingContext().sPath;
            var obj = talentProfileContext.emp_list.getModel().getProperty(path);
           // alert(JSON.stringify(obj));
            
            var index = parseInt(path.substring(path.lastIndexOf('/')+1));
            talentProfileContext.emp_list.getModel().oData.modelData[index]
            
			//talentProfileContext.toTPDetails(this , true)
		},
		customData : [ {
			Type : "sap.ui.core.CustomData",
			key : "empName",
			value : "{Name}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "empID",
			value : "{Employeeid}"
		},
		]
	}).addStyleClass("mypath_doc_item_tp");
	
	return action_item;
	
}

function createTPItemTemplateOwn(){
	
	var hLayout1 = new sap.ui.commons.layout.HorizontalLayout({
		content:[
		         new sap.m.Text({
		        	 text: "Employee :"
		         }).addStyleClass("tp_emphl_text"),
		         
		         new sap.m.Text({
		        	 text: myPathContext.employeeName
		         }).addStyleClass("tp_emphl_name"),
		         //.addStyleClass("mypath_doc_item_statustext"),
		         
		       ]
	}).addStyleClass("tp_emphl");
	
	var hLayout2= new sap.ui.commons.layout.HorizontalLayout({
		content:[
		         new sap.m.Text({
		        	 text: "Assignment Manager : "
		         }).addStyleClass("tp_emphl_txt"),
		         
		         new sap.m.Text({
		        	 text:  myPathContext.reviewerName
		         }).addStyleClass("tp_mgrhl_name"),
		         //.addStyleClass("mypath_doc_item_statustext"),
		         
		       ]
	}).addStyleClass("tp_mgrhl");;
	
	var vLayout1 = new sap.ui.commons.layout.VerticalLayout({
		content:[hLayout1 , hLayout2]
	}).addStyleClass("tp_mgr_vlaoyout");
	
	var docItemArrow = new sap.ui.commons.Image({
		src : "./com/capgemini/mypath/images/icon_forward_arrow.png",
	}).addStyleClass("mypath_doc_item_arrow");
	
	var action_item = new sap.m.CustomListItem({
		type: sap.m.ListType.Active,
		content:[vLayout1,docItemArrow],
		press: function(oControlEvent){
			
			var path = oControlEvent.getSource().getBindingContext().sPath;
            var obj = oTable.getModel().getProperty(path);
           // alert(JSON.stringify(obj));
            
            var index = parseInt(path.substring(path.lastIndexOf('/')+1));
            if ( "60000200" ==  oTable.getModel().oData.modelData[index].QgroupId)
        	{
        	 oTable.getModel().oData.modelData[index].Rating =  0 ;
        	}
			talentProfileContext.toTPDetails(this , true)
		},
		customData : [ {
			Type : "sap.ui.core.CustomData",
			key : "empName",
			value : "Himanshu Kandpal"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "empID",
			value : "36786"
		},
		, {
			Type : "sap.ui.core.CustomData",
			key : "mgrName",
			value : "Anurag Mathur"
		},
		]
	}).addStyleClass("mypath_doc_item_tp");
	
	var empData = { "Name" : "Himanshu Kandpal" , "Manager" : "Anurag Mathur"}; 
	
	var emp_data = new Array();
		emp_data.push(empData);
	
	var emp_data_model = new sap.ui.model.json.JSONModel();
	emp_data_model.setData({modelData: emp_data});
	talentProfileContext.mgr_list.setModel(emp_data_model);
	talentProfileContext.mgr_list.bindAggregation("items", "/modelData", action_item);
	
	//return action_item;
	
}


talentProfileContext.toTPDetails = function(item , isMgr)
{
	


}*/



