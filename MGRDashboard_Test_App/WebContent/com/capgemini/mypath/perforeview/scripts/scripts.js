if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	
	}
	
myPathContext.performanceReviewerContext = new Object();	
performanceReviewerContext = myPathContext.performanceReviewerContext;

var url_root = "",url_app="";

performanceReviewerContext.url_host = location.protocol +"//"+ $(location).attr("host");
performanceReviewerContext.url_root = performanceReviewerContext.url_host + "/sap/opu/odata/sap/";
performanceReviewerContext.url_app = performanceReviewerContext.url_host + "/sap/bc/ui5_ui5/sap/zmgrdashboard/";

/* Function to call the service to get reportees data */
performanceReviewerContext.getReporteesData = function(){
	
	showBusy();
	performanceReviewerContext.documentListLevel0 = [];
	performanceReviewerContext.documentListLevel1 = [];
	performanceReviewerContext.documentListLevel2 = [];
	performanceReviewerContext.mgrdashboard_ODataModel_DocumentSet = myPathContext.dashboard_ODataModel;
    var readRequestURL = "/ReportsSet?$expand=ReportsToReportdocument&$filter=Manager eq '"+myPathContext.employeeId+"'";
	performanceReviewerContext.mgrdashboard_ODataModel_DocumentSet.read(
		readRequestURL, null, null, true, function(oData, oResponse) {

			var results = [];
			if(oData.results.length > 0){
				results = oData.results[0].ReportsToReportdocument.results;
			}
					
			if (results.length > 0) {
				//performanceReviewerContext.documentList = results;
				hideBusy();
								
				for(var i=0; i<results.length; i++){
					results[i].ApStartDateISO = new Date(results[i].ApStartDate);
					results[i].ApEndDateISO = new Date(results[i].ApEndDate);
					results[i].ApStartDateISO.setTime( results[i].ApStartDateISO.getTime() + results[i].ApStartDateISO.getTimezoneOffset()*60*1000 );
					results[i].ApEndDateISO.setTime( results[i].ApEndDateISO.getTime() + results[i].ApEndDateISO.getTimezoneOffset()*60*1000 );
					 
					 myPathContext.hidden_date_for_format.setDateValue(results[i].ApStartDateISO);
					 results[i].validfrom = myPathContext.hidden_date_for_format.getValue();
					 myPathContext.hidden_date_for_format.setDateValue(results[i].ApEndDateISO);
					 results[i].validto = myPathContext.hidden_date_for_format.getValue();
					 results[i].doc_icon_path =  myPathContext.docJSON[results[i].ApStatus + results[i].ApStatusSub];
					 
					 if(results[i].ActionRequired == "X"){
						 results[i].ActionRequired = true;
						 results[i].Action = myPathContext.i18nModel.getProperty("PR_AR");
					 }
					 else{
						 results[i].ActionRequired = false;
						 results[i].Action = myPathContext.i18nModel.getProperty("PR_NAR");
					 }
					 
					 if(results[i].Level == "0"){
						 performanceReviewerContext.documentListLevel0.push(results[i]);
					 }
					 else if(results[i].Level == "1"){
						 performanceReviewerContext.documentListLevel1.push(results[i]);
					 }
					 else if(results[i].Level == "2"){
						 performanceReviewerContext.documentListLevel2.push(results[i]);
					 }
				}
				
				var selectedCriteria = performanceReviewerContext.reporting_criteria_dropdown.getSelectedKey();
				performanceReviewerContext.documentList = performanceReviewerContext["documentListLevel"+selectedCriteria];
				
				var itemTemplate = createSeeAllDocumentItemTemplate("manager");
				var data_model = new sap.ui.model.json.JSONModel();
				data_model.setData({modelData: performanceReviewerContext.documentList});
				performanceReviewerContext.docList.setModel(data_model);
				performanceReviewerContext.docList.bindRows("/modelData", itemTemplate);
				
				performanceReviewerContext.generateFilters(myPathContext.performanceReview_Dashboard_Loaded);
				
				myPathContext.performanceReview_Dashboard_Loaded = true;
				
			} else {
				// TO DO - code to display error message
				hideBusy();
			}
		}, function(oError) {
			// TO DO - code to display error message
			hideBusy();
		});
};

/* Function to generate filter buttons */

performanceReviewerContext.generateFilters = function (remove_rows_flag){
	
	var facetMatrixlayout = performanceReviewerContext.oFacetMatrixlayout;
	
	if(remove_rows_flag)
		facetMatrixlayout.destroyRows();
	
	performanceReviewerContext.empArray = [];
	performanceReviewerContext.subStatusArr = [];
	performanceReviewerContext.docArray = [];
	
	for(var index = 0 ; index < performanceReviewerContext.documentList.length ; index++)
	{
		if (performanceReviewerContext.empArray.indexOf(performanceReviewerContext.documentList[index].AppraiseeName) == -1)		
			performanceReviewerContext.empArray.push(performanceReviewerContext.documentList[index].AppraiseeName);
	 
		if (performanceReviewerContext.subStatusArr.indexOf(performanceReviewerContext.documentList[index].ApStatusSubName) == -1)		
			performanceReviewerContext.subStatusArr.push(performanceReviewerContext.documentList[index].ApStatusSubName);

		if (performanceReviewerContext.docArray.indexOf(performanceReviewerContext.documentList[index].AppraisalTypeLn) == -1)		
			performanceReviewerContext.docArray.push(performanceReviewerContext.documentList[index].AppraisalTypeLn);
		
		//check for selected filter texts
		if(performanceReviewerContext.preSelectedFilters.indexOf(performanceReviewerContext.documentList[index].AppraisalTypeText) >= 0){
			if(performanceReviewerContext.asPRSelectedFilters.indexOf(performanceReviewerContext.documentList[index].AppraisalTypeLn) == -1)
				performanceReviewerContext.asPRSelectedFilters.push(performanceReviewerContext.documentList[index].AppraisalTypeLn);
		}
	 
	}
	
	//reset preselected filters array
	performanceReviewerContext.preSelectedFilters = new Array();
	
	facetMatrixlayout.createRow(new sap.m.Label({
		text : myPathContext.i18nModel.getProperty("FILTER_DOCUMENTS_BY").toUpperCase()
	}).addStyleClass("reviewDocumentsFilterHeaderLabel"));
	
	var oResetButton = new sap.m.Text({
		text :myPathContext.i18nModel.getProperty("RESET_FILTERS").toUpperCase(),
	}).addStyleClass("oResetFilter");
	performanceReviewerContext.oResetButton = oResetButton;
	
	oResetButton.attachBrowserEvent("click",function(evt) {
		performanceReviewerContext.resetFilterHandler();
	});
	
	facetMatrixlayout.createRow(performanceReviewerContext.oResetButton);
	
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.perforeview.scripts.FilterButton({
				header : myPathContext.i18nModel.getProperty("ACTION").toUpperCase(), 
				buttonNames : [myPathContext.i18nModel.getProperty("PR_AR"), myPathContext.i18nModel.getProperty("PR_NAR")]
	}));
	
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.perforeview.scripts.FilterButton({
				header :"{i18n>APPRAISEE_FILTER}", 
				buttonNames : performanceReviewerContext.empArray
	}));
	
	//Creating row in matrix for listing documents
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.perforeview.scripts.FilterButton({
				header :"{i18n>DOCUMENT}", 
				buttonNames : performanceReviewerContext.docArray
	}));
	
	facetMatrixlayout.createRow(
			new sap.m.Label({
				text :"{i18n>DATE_RANGE}"
	}).addStyleClass("reviewDocumentsFilterLabel"));
	
	var facetDatePicker = new sap.m.DatePicker
	({
		width : "70%", 
		dateValue : new Date(),
		change : function() 
		{
			performanceReviewerContext.applyFilter();
		}
    }).addStyleClass("factDatePic");
	performanceReviewerContext.facetDatePicker = facetDatePicker ;
	facetMatrixlayout.createRow(performanceReviewerContext.facetDatePicker);
	
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.perforeview.scripts.FilterButton({
				header : "", 
				buttonNames :["{i18n>BEFORE}" , "{i18n>AFTER}" ]
	}));
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.perforeview.scripts.FilterButton({
				header : myPathContext.i18nModel.getProperty("SUB_STATUS").toUpperCase(), 
				buttonNames : performanceReviewerContext.subStatusArr
	}));
};

/*  Function to reset all filters */
performanceReviewerContext.resetFilterHandler = function(){
	
	performanceReviewerContext.totalSelectedButtonsArray = [];
	performanceReviewerContext.asPRSelectedFilters = [];
	performanceReviewerContext.asPRSelectedFiltersLevel0 = [];
	performanceReviewerContext.asPRSelectedFiltersLevel1 = [];
	performanceReviewerContext.asPRSelectedFiltersLevel2 = [];
	performanceReviewerContext.generateFilters(true);
	performanceReviewerContext.docList.getBinding("rows").filter(null);
	performanceReviewerContext.docCountText.setText(performanceReviewerContext.docList.getBinding("rows").iLength);
	
};

/* Function to apply selected filters on the list */
performanceReviewerContext.applyFilter = function() {

	for (var i = 0; i < performanceReviewerContext.totalSelectedButtonsArray.length; i++) {

		var filter_button = performanceReviewerContext.totalSelectedButtonsArray[i];
		var selected_buttons = filter_button.getSelectedButtons();
		
		if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("SUB_STATUS").toUpperCase()) {
			performanceReviewerContext.subStFilter = [];
			
			for (var index = 0; index < selected_buttons.length; index++) {
				performanceReviewerContext.subStFilter.push(new sap.ui.model.Filter("ApStatusSubName",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		else if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("ACTION").toUpperCase()) {
			performanceReviewerContext.actionFilter = [];

			for (var index = 0; index < selected_buttons.length; index++) {
				performanceReviewerContext.actionFilter.push(new sap.ui.model.Filter("Action",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		else if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("APPRAISEE_FILTER")) {
			performanceReviewerContext.empFilter = [];

			for (var index = 0; index < selected_buttons.length; index++) {
				performanceReviewerContext.empFilter.push(new sap.ui.model.Filter("AppraiseeName",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		//adding documents filter
		else if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("DOCUMENT")) {
			performanceReviewerContext.docFilter = [];

			for (var index = 0; index < selected_buttons.length; index++) {
				performanceReviewerContext.docFilter.push(new sap.ui.model.Filter("AppraisalTypeLn",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		else if (filter_button.getHeader().toUpperCase() == ""){

			performanceReviewerContext.dateFilter = [];

			var dateValue = performanceReviewerContext.facetDatePicker.getDateValue();
			
			for (var index = 0; index < selected_buttons.length; index++) {
				
				if(selected_buttons[index] == myPathContext.i18nModel.getProperty("BEFORE")){
					performanceReviewerContext.dateFilter.push(new sap.ui.model.Filter("ApEndDateISO", sap.ui.model.FilterOperator.LT, dateValue));
				}
				else{
					performanceReviewerContext.dateFilter.push(new sap.ui.model.Filter("ApEndDateISO", sap.ui.model.FilterOperator.GT, dateValue));
				}
			}
		}
		
	}
	
	var bSubStatusFilter = false, bEmpFilter = false, bActionFilter = false, bDateFilter = false, bDocFilter = false;
	
	if (performanceReviewerContext.subStFilter.length > 0) {

		performanceReviewerContext.subStFilter = new sap.ui.model.Filter({
			filters : performanceReviewerContext.subStFilter,
			and : false
		});
		bSubStatusFilter = true;
	}
	if (performanceReviewerContext.empFilter.length > 0) {

		performanceReviewerContext.empFilter = new sap.ui.model.Filter({
			filters : performanceReviewerContext.empFilter,
			and : false
		});
		bEmpFilter = true;
	}
	if (performanceReviewerContext.actionFilter.length > 0) {

		performanceReviewerContext.actionFilter = new sap.ui.model.Filter({
			filters : performanceReviewerContext.actionFilter,
			and : false
		});
		bActionFilter = true;
	}
	
	if (performanceReviewerContext.docFilter.length > 0) {

		performanceReviewerContext.docFilter = new sap.ui.model.Filter({
			filters : performanceReviewerContext.docFilter,
			and : false
		});
		bDocFilter = true;
	}
	
	if (performanceReviewerContext.dateFilter.length > 0) {

		performanceReviewerContext.dateFilter = new sap.ui.model.Filter({
			filters : performanceReviewerContext.dateFilter,
			and : false
		});
		bDateFilter = true;
	}
	
	var finalFilterList = [];
	if(bSubStatusFilter){
		finalFilterList.push(performanceReviewerContext.subStFilter);
	}
	if(bEmpFilter){
		finalFilterList.push(performanceReviewerContext.empFilter);
	}
	if(bActionFilter){
		finalFilterList.push(performanceReviewerContext.actionFilter);
	}
	if(bDocFilter){
		finalFilterList.push(performanceReviewerContext.docFilter);
	}
	if(bDateFilter){
		finalFilterList.push(performanceReviewerContext.dateFilter);
	}
	
	/* Apply filter to the list if any filter is selected. If no filter is selected then remove all filters */
	if(finalFilterList.length>0){
		var oFilter = new sap.ui.model.Filter({
			filters: finalFilterList ,
			and: true
		});
		performanceReviewerContext.docList.getBinding("rows").filter([oFilter]);
	}
	else{
		performanceReviewerContext.docList.getBinding("rows").filter(null);
	}
	
	performanceReviewerContext.docCountText.setText(performanceReviewerContext.docList.getBinding("rows").iLength);
	

};