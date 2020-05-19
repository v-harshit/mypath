//new component declaration
jQuery.sap.declare("com.capgemini.mypath.talent_profileREV.Component");

//define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.talent_profileREV.scripts.scripts");

//new component declaration
//jQuery.sap.declare("mypath_feedback.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.talent_profileREV.Component", {

	metadata : {
		properties : {
			text : "string"
		}
	}
});

com.capgemini.mypath.talent_profileREV.Component.prototype.createContent = function() {

	//create object for the application context
	
	if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	
	}
	
	if(!myPathContext.talent_profileREV_loaded){
		
		jQuery.sap.includeStyleSheet(talent_profile_ns.url_app + "com/capgemini/mypath/talent_profileREV/css/talent_profile_REV_style.css");
		
		myPathContext.talent_profileREV_loaded = true;
		
		myPathContext.talentProfileREVContext = new Object();	
		talentProfileREVContext = myPathContext.talentProfileREVContext;

	  
	}
	
	
	
	oView = sap.ui.view({
		id : "mypath_tpmgr",
		viewName : "com.capgemini.mypath.talent_profileREV.view.talent_profile_mgr",
		type : "JS",
		viewData : {
			component : this
		}
	});  
    
	createTPItemTemplateOwn();
	callTPManagerService();
	
	// set i18n model 
	/*var i18nModel = new sap.ui.model.resource.ResourceModel({ 
		bundleName:"com.capgemini.mypath.talent_profileREV.i18n.i18n",
		bundleLocale:"EN"
	});
	
	oView.setModel(i18nModel, "i18n");*/
	
	oView.setModel(myPathContext.i18nModel, "i18n");
	
	function callTPManagerService()
	{

		var serviceURL = myPathContext.url_root + "ZGW_MYPATH_TALENT_PROFILE_SRV";
		var dashboard_ODataModel = new sap.ui.model.odata.ODataModel(serviceURL);
	    myPathContext.dashboard_ODataModel = dashboard_ODataModel;
	   // myPathContext.employeeId = "60018639" ;
		var readRequestURL = "/EmployeeSet?$filter=IvEmployeeid eq '"+myPathContext.employeeId+"''&$format=json";
		myPathContext.dashboard_ODataModel.read(readRequestURL, null, null, false,     
	    function(oData,oResponse){
			 var obj = JSON.parse(oResponse.body);
			 var results = obj.d.results;
			var emp_data = new Array();
			for(var i=0; i<results.length; i++){
				emp_data.push(results[i]);
			}
			var emp_itemTemplate = createTPItemTemplate("employee");
			var emp_data_model = new sap.ui.model.json.JSONModel();
			emp_data_model.setData({modelData: emp_data});
			talentProfileREVContext.emp_list.setModel(emp_data_model);
			talentProfileREVContext.emp_list.bindAggregation("items", "/modelData", emp_itemTemplate);
		},
		function(oError){
	     	 //TO DO - code to display error message
			hideBusy();
		});
		//}, 500);
		

		/*
		var emp_itemTemplate = createTPItemTemplate("employee");
		var emp_data_model = new sap.ui.model.json.JSONModel();
		emp_data_model.setData({modelData: emp_data});
		myPathContext.carousel_emp_list.setModel(emp_data_model);
		myPathContext.carousel_emp_list.bindAggregation("items", "/modelData", emp_itemTemplate);*/
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
	            var obj = talentProfileREVContext.emp_list.getModel().getProperty(path);
	            var index = parseInt(path.substring(path.lastIndexOf('/')+1));
	            myPathContext.employeeIdIV =  talentProfileREVContext.emp_list.getModel().oData.modelData[index].Employeeid;
	            myPathContext.TPUsrName = talentProfileREVContext.emp_list.getModel().oData.modelData[index].Name;
	            openEmpDetails(myPathContext.employeeIdIV);
				myPathContext.setAppContent(myPathContext.i18nModel.getProperty("TALENT_PROFILE"),"com.capgemini.mypath.talent_profile",true);
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
			        	 text: myPathContext.i18nModel.getProperty("EMPLOYEE") + " : ",
			         }).addStyleClass("tp_emphl_text"),
			         
			         new sap.m.Text({
			        	 text: myPathContext.employeeName
			         }).addStyleClass("tp_emphl_name").setTooltip
				 		(myPathContext.createCallout(myPathContext.AddUserDataTP)),
			         //.addStyleClass("mypath_doc_item_statustext"),
			         
			       ]
		}).addStyleClass("tp_emphl");
		
	   var hLayout2= new sap.ui.commons.layout.HorizontalLayout({
			content:[
			         new sap.m.Text({
			        	 text: myPathContext.i18nModel.getProperty("ASSIGNMENT_MANAGER") + " : ",
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
				myPathContext.TPUsrName = myPathContext.employeeName ;
				myPathContext.employeeIdIV = myPathContext.employeeId; 
				openEmpDetails(myPathContext.employeeIdIV);
				myPathContext.setAppContent(myPathContext.i18nModel.getProperty("TALENT_PROFILE"),"com.capgemini.mypath.talent_profile",true);
			},
			/*customData : [ {
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
			]*/
		}).addStyleClass("mypath_doc_item_tp");
		
		var empData = { "Name" : "Himanshu Kandpal" , "Manager" : "Anurag Mathur"}; 
		
		var emp_data = new Array();
			emp_data.push(empData);
		
		var emp_data_model = new sap.ui.model.json.JSONModel();
		emp_data_model.setData({modelData: emp_data});
		talentProfileREVContext.mgr_list.setModel(emp_data_model);
		talentProfileREVContext.mgr_list.bindAggregation("items", "/modelData", action_item);
		
		//return action_item;
		
	}


	talentProfileREVContext.toTPDetails = function(item , isMgr)
	{
		


	}

	return oView;
};