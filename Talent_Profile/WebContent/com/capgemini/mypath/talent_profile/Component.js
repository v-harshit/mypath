//new component declaration
jQuery.sap.declare("com.capgemini.mypath.talent_profile.Component");

//define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.talent_profile.scripts.scripts");

//new component declaration
//jQuery.sap.declare("mypath_feedback.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.talent_profile.Component", {

	metadata : {
		properties : {
			text : "string"
		}
	}
});

com.capgemini.mypath.talent_profile.Component.prototype.createContent = function() {

	//create object for the application context
	myPathContext.isEdited = false ;
	if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	
	}
	
	if(!myPathContext.talent_profile_loaded){
		
		jQuery.sap.includeStyleSheet(talent_profile_ns.url_app + "com/capgemini/mypath/talent_profile/css/talent_profile_style.css");
		
		myPathContext.talent_profile_loaded = true;
		
		myPathContext.talentProfileContext = new Object();	
		talentProfileContext = myPathContext.talentProfileContext;
		
		
		talentProfileContext.ExpAllBool = false ;
	   //Create odata model for talent profile servivce
	   var serviceURL = talent_profile_ns.url_root + "ZGW_MYPATH_PERFORMANCE_SRV";
	   var talentprofile_searchoDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
	   talentProfileContext.talentprofile_searchoDataModel = talentprofile_searchoDataModel;
	   
	   serviceURL = talent_profile_ns.url_root + "ZGW_MYPATH_TALENT_PROFILE_SRV";
	   var talentprofile_oDataModel = new sap.ui.model.odata.ODataModel(serviceURL);
	   talentProfileContext.talentprofile_oDataModel = talentprofile_oDataModel;
		
	   //service call to get core behavior competencies
		getCoreBehaviorCompetencies();
		
		//service call to get professional competencies
	    getProfessionalCompetencies(); 
	    
	    //service call to get talent profile template
	   // getAllQualifications();
	}
	
	talentProfileContext.employeeId = myPathContext.employeeId;
	talentProfileContext.competencies = {
			CORE_BEHAVIOR: "60000200",
			PROFESSIONAL: "60000199",
			ROLE_SPECIFIC: "60000201"
	};
	talentProfileContext.qualificationGroups = [];
	talentProfileContext.coreBehaviorQualifications = [];
	talentProfileContext.professionalQualifications = [];
	talentProfileContext.roleQualifications = [];
	talentProfileContext.modeldata = [];
	talentProfileContext.modelrecord = {
			  "ObjId":"",
			  "Stext":"",
			  "Begda":"",
			  "Endda":"",
			  "Rating":"",
			  "RatingText":"",
			  "QgroupId":"",
			  "Qgrouptxt":"",
			  "ScaleId":"",
			  "Scaletxt":"",
			  "ChangedOn":"",
			  "UserName":"",
			  "Short":"",
			  "EvIsOk":"",
			  "isNA":true,
			  "isCleared":true,
			  "sliderEnabled" : true,
	};
	
	var oView="";	

	oView = sap.ui.view({
		id : "mypath_tp",
		viewName : "com.capgemini.mypath.talent_profile.view.talent_profile",
		type : "JS",
		viewData : {
			component : this
		}
	});  
	
	/*oView = sap.ui.view({
		id : "mypath_tpmgr",
		viewName : "com.capgemini.mypath.talent_profile.view.talent_profile_mgr",
		type : "JS",
		viewData : {
			component : this
		}
	}); */ 
    
	createTPItemTemplateOwn();
	callTPManagerService();
	
	// set i18n model 
	/*var i18nModel = new sap.ui.model.resource.ResourceModel({ 
		bundleName:"com.capgemini.mypath.talent_profile.i18n.i18n",
		bundleLocale:"EN"
	});
	
	
	oView.setModel(i18nModel, "i18n");*/
	oView.setModel(myPathContext.i18nModel, "i18n");
	
	function callTPManagerService()
	{/*

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
	*/}

	function createTPItemTemplate(){/*
		
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
	            talentProfileContext.emp_list.getModel().oData.modelData[index].Employeeid
	            
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
		
	*/}

	function createTPItemTemplateOwn(){}


	talentProfileContext.toTPDetails = function(item , isMgr)
	{
		


	}

	return oView;
};