if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	
	}
	
myPathContext.asAssignManagerContext = new Object();	
asAssignManagerContext = myPathContext.asAssignManagerContext;

/* Function to generate filter buttons */

asAssignManagerContext.generateFilters = function (remove_rows_flag){
	
	var facetMatrixlayout = asAssignManagerContext.oFacetMatrixlayout;
	
	if(remove_rows_flag)
		facetMatrixlayout.destroyRows();
	
	asAssignManagerContext.empArray = [];
	asAssignManagerContext.subStatusArr = [];
	asAssignManagerContext.docArray = [];
	
	for(var index = 0 ; index < myPathContext.assignmentManagerDocuments.length ; index++)
	{
		if (asAssignManagerContext.empArray.indexOf(myPathContext.assignmentManagerDocuments[index].AppraiseeName) == -1)		
			asAssignManagerContext.empArray.push(myPathContext.assignmentManagerDocuments[index].AppraiseeName);
	 
		if (asAssignManagerContext.subStatusArr.indexOf(myPathContext.assignmentManagerDocuments[index].ApStatusSubName) == -1)		
			asAssignManagerContext.subStatusArr.push(myPathContext.assignmentManagerDocuments[index].ApStatusSubName);
		
		//adding document array to context
		if (asAssignManagerContext.docArray.indexOf(myPathContext.assignmentManagerDocuments[index].AppraisalTypeLn) == -1)		
			asAssignManagerContext.docArray.push(myPathContext.assignmentManagerDocuments[index].AppraisalTypeLn);
	 
	}

	facetMatrixlayout.createRow(new sap.m.Label({
		text : myPathContext.i18nModel.getProperty("FILTER_DOCUMENTS_BY").toUpperCase()
	}).addStyleClass("reviewDocumentsFilterHeaderLabel"));
	
	var oResetButton = new sap.m.Text({
		text : myPathContext.i18nModel.getProperty("RESET_FILTERS").toUpperCase(),
	}).addStyleClass("oResetFilter");
	asAssignManagerContext.oResetButton = oResetButton;
	
	oResetButton.attachBrowserEvent("click",function(evt) {
		asAssignManagerContext.resetFilterHandler();
	});
	
	facetMatrixlayout.createRow(asAssignManagerContext.oResetButton);
	
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.assign_manager_facet.scripts.FilterButton({
				header : myPathContext.i18nModel.getProperty("ACTION").toUpperCase(), 
				buttonNames : [myPathContext.i18nModel.getProperty("PR_AR"), myPathContext.i18nModel.getProperty("PR_NAR")]
	}));
	
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.assign_manager_facet.scripts.FilterButton({
				header :"{i18n>APPRAISEE_FILTER}", 
				buttonNames : asAssignManagerContext.empArray
	}));
	
	//Creating row in matrix for listing documents
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.assign_manager_facet.scripts.FilterButton({
				header :"{i18n>DOCUMENT}", 
				buttonNames : asAssignManagerContext.docArray
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
			asAssignManagerContext.applyFilter();
		}
    }).addStyleClass("factDatePic");
	asAssignManagerContext.facetDatePicker = facetDatePicker ;
	facetMatrixlayout.createRow(asAssignManagerContext.facetDatePicker);
	
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.assign_manager_facet.scripts.FilterButton({
				header : "", 
				buttonNames :["{i18n>BEFORE}" , "{i18n>AFTER}" ]
	}));
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.assign_manager_facet.scripts.FilterButton({
				header : myPathContext.i18nModel.getProperty("SUB_STATUS").toUpperCase(), 
				buttonNames : asAssignManagerContext.subStatusArr
	}));
};

/*  Function to reset all filters */
asAssignManagerContext.resetFilterHandler = function(){
	
	asAssignManagerContext.totalSelectedButtonsArray = [];
	asAssignManagerContext.asAnAMSelectedFilters = [];
	asAssignManagerContext.generateFilters(true);
	asAssignManagerContext.assignManagerDocList.getBinding("rows").filter(null);
	asAssignManagerContext.managerDocCountText.setText(asAssignManagerContext.assignManagerDocList.getBinding("rows").iLength);
	
};

/* Function to apply selected filters on the list */
asAssignManagerContext.applyFilter = function() {

	for (var i = 0; i < asAssignManagerContext.totalSelectedButtonsArray.length; i++) {

		var filter_button = asAssignManagerContext.totalSelectedButtonsArray[i];
		var selected_buttons = filter_button.getSelectedButtons();
		
		if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("SUB_STATUS").toUpperCase()) {
			asAssignManagerContext.subStFilter = [];
			
			for (var index = 0; index < selected_buttons.length; index++) {
				asAssignManagerContext.subStFilter.push(new sap.ui.model.Filter("ApStatusSubName",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		else if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("ACTION").toUpperCase()) {
			asAssignManagerContext.actionFilter = [];

			for (var index = 0; index < selected_buttons.length; index++) {
				asAssignManagerContext.actionFilter.push(new sap.ui.model.Filter("Action",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		else if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("APPRAISEE_FILTER").toUpperCase()) {
			asAssignManagerContext.empFilter = [];

			for (var index = 0; index < selected_buttons.length; index++) {
				asAssignManagerContext.empFilter.push(new sap.ui.model.Filter("AppraiseeName",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		//adding documents filter
		else if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("DOCUMENT").toUpperCase()) {
			asAssignManagerContext.docFilter = [];

			for (var index = 0; index < selected_buttons.length; index++) {
				asAssignManagerContext.docFilter.push(new sap.ui.model.Filter("AppraisalTypeLn",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		else if (filter_button.getHeader().toUpperCase() == ""){

			asAssignManagerContext.dateFilter = [];

			var dateValue = asAssignManagerContext.facetDatePicker.getDateValue();
			
			for (var index = 0; index < selected_buttons.length; index++) {
				
				if(selected_buttons[index] == myPathContext.i18nModel.getProperty("BEFORE")){
					asAssignManagerContext.dateFilter.push(new sap.ui.model.Filter("ApEndDateISO", sap.ui.model.FilterOperator.LT, dateValue));
				}
				else{
					asAssignManagerContext.dateFilter.push(new sap.ui.model.Filter("ApEndDateISO", sap.ui.model.FilterOperator.GT, dateValue));
				}
			}
		}
		
	}
	
	var bSubStatusFilter = false, bEmpFilter = false, bActionFilter = false, bDateFilter = false, bDocFilter = false;
	
	if (asAssignManagerContext.subStFilter.length > 0) {

		asAssignManagerContext.subStFilter = new sap.ui.model.Filter({
			filters : asAssignManagerContext.subStFilter,
			and : false
		});
		bSubStatusFilter = true;
	}
	if (asAssignManagerContext.empFilter.length > 0) {

		asAssignManagerContext.empFilter = new sap.ui.model.Filter({
			filters : asAssignManagerContext.empFilter,
			and : false
		});
		bEmpFilter = true;
	}
	if (asAssignManagerContext.actionFilter.length > 0) {

		asAssignManagerContext.actionFilter = new sap.ui.model.Filter({
			filters : asAssignManagerContext.actionFilter,
			and : false
		});
		bActionFilter = true;
	}
	
	if (asAssignManagerContext.docFilter.length > 0) {

		asAssignManagerContext.docFilter = new sap.ui.model.Filter({
			filters : asAssignManagerContext.docFilter,
			and : false
		});
		bDocFilter = true;
	}
	
	if (asAssignManagerContext.dateFilter.length > 0) {

		asAssignManagerContext.dateFilter = new sap.ui.model.Filter({
			filters : asAssignManagerContext.dateFilter,
			and : false
		});
		bDateFilter = true;
	}
	
	var finalFilterList = [];
	if(bSubStatusFilter){
		finalFilterList.push(asAssignManagerContext.subStFilter);
	}
	if(bEmpFilter){
		finalFilterList.push(asAssignManagerContext.empFilter);
	}
	if(bActionFilter){
		finalFilterList.push(asAssignManagerContext.actionFilter);
	}
	if(bDocFilter){
		finalFilterList.push(asAssignManagerContext.docFilter);
	}
	if(bDateFilter){
		finalFilterList.push(asAssignManagerContext.dateFilter);
	}
	
	/* Apply filter to the list if any filter is selected. If no filter is selected then remove all filters */
	if(finalFilterList.length>0){
		var oFilter = new sap.ui.model.Filter({
			filters: finalFilterList ,
			and: true
		});
		asAssignManagerContext.assignManagerDocList.getBinding("rows").filter([oFilter]);
	}
	else{
		asAssignManagerContext.assignManagerDocList.getBinding("rows").filter(null);
	}
	
	asAssignManagerContext.managerDocCountText.setText(asAssignManagerContext.assignManagerDocList.getBinding("rows").iLength);
	

};