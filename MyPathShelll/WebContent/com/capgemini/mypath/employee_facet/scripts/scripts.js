if( !sap.ui.getCore().myPathContext){
		sap.ui.getCore().myPathContext = new Object();	
		myPathContext = sap.ui.getCore().myPathContext;
	
	}
	
myPathContext.asAnEmpContext = new Object();	
asAnEmpContext = myPathContext.asAnEmpContext;

/* Function to generate filter buttons */

asAnEmpContext.generateFilters = function (remove_rows_flag){
	
	var facetMatrixlayout = asAnEmpContext.oFacetMatrixlayout;
	
	if(remove_rows_flag)
		facetMatrixlayout.destroyRows();
	
	asAnEmpContext.empArray = [];
	asAnEmpContext.subStatusArr = [];
		
	for(var index = 0 ; index < myPathContext.employeeDocuments.length ; index++)
	{
		if (asAnEmpContext.docArray.indexOf(myPathContext.employeeDocuments[index].AppraisalTypeLn) == -1)		
			asAnEmpContext.docArray.push(myPathContext.employeeDocuments[index].AppraisalTypeLn);
	 
		if (asAnEmpContext.subStatusArr.indexOf(myPathContext.employeeDocuments[index].ApStatusSubName) == -1)		
			asAnEmpContext.subStatusArr.push(myPathContext.employeeDocuments[index].ApStatusSubName);
		
		//check for selected filter texts
			if(myPathContext.asAnEmpSelectedFilters.indexOf(myPathContext.employeeDocuments[index].AppraisalTypeText) >= 0){
				if(asAnEmpContext.asAnEmpSelectedFilters.indexOf(myPathContext.employeeDocuments[index].AppraisalTypeLn) == -1)
					asAnEmpContext.asAnEmpSelectedFilters.push(myPathContext.employeeDocuments[index].AppraisalTypeLn);
		}
		
	}
	
	myPathContext.asAnEmpSelectedFilters = [];

	facetMatrixlayout.createRow(new sap.m.Label({
		text : myPathContext.i18nModel.getProperty("FILTER_DOCUMENTS_BY").toUpperCase()
	}).addStyleClass("reviewDocumentsFilterHeaderLabel"));
	
	var oResetButton = new sap.m.Text({
		text : myPathContext.i18nModel.getProperty("RESET_FILTERS").toUpperCase() ,
	}).addStyleClass("oResetFilter");
	asAnEmpContext.oResetButton = oResetButton;
	
	oResetButton.attachBrowserEvent("click",function(evt) {
		asAnEmpContext.resetFilterHandler();
	});
	
	facetMatrixlayout.createRow(asAnEmpContext.oResetButton);
	
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.employee_facet.scripts.FilterButton({
				header : myPathContext.i18nModel.getProperty("ACTION").toUpperCase(), 
				buttonNames : [myPathContext.i18nModel.getProperty("PR_AR"), myPathContext.i18nModel.getProperty("PR_NAR")]
	}));
	
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.employee_facet.scripts.FilterButton({
				header :"{i18n>DOCUMENT}", 
				buttonNames : asAnEmpContext.docArray
	}));
	facetMatrixlayout.createRow(
			new sap.m.Label({
				text :"{i18n>DATE_RANGE}"
	}).addStyleClass("reviewDocumentsFilterLabel"));
	
	var facetDatePicker = new sap.m.DatePicker
	({
		width : "70%", 
		dateValue : new Date(),
		change :function()
		{
			asAnEmpContext.applyFilter() ;
		}
    }).addStyleClass("factDatePic");
	asAnEmpContext.facetDatePicker = facetDatePicker ;
	facetMatrixlayout.createRow(asAnEmpContext.facetDatePicker);
	
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.employee_facet.scripts.FilterButton({
				header : "", 
				buttonNames :["{i18n>BEFORE}" , "{i18n>AFTER}" ]
	}));
	facetMatrixlayout.createRow(
			new com.capgemini.mypath.employee_facet.scripts.FilterButton({
				header : myPathContext.i18nModel.getProperty("SUB_STATUS").toUpperCase(), 
				buttonNames : asAnEmpContext.subStatusArr
	}));
	
};

/*  Function to reset all filters */
asAnEmpContext.resetFilterHandler = function(){
	asAnEmpContext.totalSelectedButtonsArray = [];
	asAnEmpContext.asAnEmpSelectedFilters = [];
	asAnEmpContext.generateFilters(true);
	asAnEmpContext.employeeDocList.getBinding("rows").filter(null);
	asAnEmpContext.employeeDocCountText.setText(asAnEmpContext.employeeDocList.getBinding("rows").iLength);
	
};

/* Function to apply selected filters on the list */
asAnEmpContext.applyFilter = function() {

	for (var i = 0; i < asAnEmpContext.totalSelectedButtonsArray.length; i++) {

		var filter_button = asAnEmpContext.totalSelectedButtonsArray[i];
		var selected_buttons = filter_button.getSelectedButtons();
		
		if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("SUB_STATUS").toUpperCase()) {
			asAnEmpContext.subStFilter = [];
			
			for (var index = 0; index < selected_buttons.length; index++) {
				asAnEmpContext.subStFilter.push(new sap.ui.model.Filter("ApStatusSubName",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		else if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("ACTION").toUpperCase()) {
			asAnEmpContext.actionFilter = [];

			for (var index = 0; index < selected_buttons.length; index++) {
				asAnEmpContext.actionFilter.push(new sap.ui.model.Filter("Action",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		else if (filter_button.getHeader().toUpperCase() == myPathContext.i18nModel.getProperty("DOCUMENT").toUpperCase()) {
			asAnEmpContext.docFilter = [];

			for (var index = 0; index < selected_buttons.length; index++) {
				asAnEmpContext.docFilter.push(new sap.ui.model.Filter("AppraisalTypeLn",
						sap.ui.model.FilterOperator.EQ, selected_buttons[index]));

			}
		}
		
		else if (filter_button.getHeader().toUpperCase() == ""){

			asAnEmpContext.dateFilter = [];

			var dateValue = asAnEmpContext.facetDatePicker.getDateValue();
			
			for (var index = 0; index < selected_buttons.length; index++) {
				
				if(selected_buttons[index] == myPathContext.i18nModel.getProperty("BEFORE")){
					asAnEmpContext.dateFilter.push(new sap.ui.model.Filter("ApEndDateISO", sap.ui.model.FilterOperator.LT, dateValue));
				}
				else{
					asAnEmpContext.dateFilter.push(new sap.ui.model.Filter("ApEndDateISO", sap.ui.model.FilterOperator.GT, dateValue));
				}
			}
		}
		
	}
	
	var bSubStatusFilter = false, bDocFilter = false, bActionFilter = false, bDateFilter = false;
	
	if (asAnEmpContext.subStFilter.length > 0) {

		asAnEmpContext.subStFilter = new sap.ui.model.Filter({
			filters : asAnEmpContext.subStFilter,
			and : false
		});
		bSubStatusFilter = true;
	}
	if (asAnEmpContext.docFilter.length > 0) {

		asAnEmpContext.docFilter = new sap.ui.model.Filter({
			filters : asAnEmpContext.docFilter,
			and : false
		});
		bDocFilter = true;
	}
	if (asAnEmpContext.actionFilter.length > 0) {

		asAnEmpContext.actionFilter = new sap.ui.model.Filter({
			filters : asAnEmpContext.actionFilter,
			and : false
		});
		bActionFilter = true;
	}
	if (asAnEmpContext.dateFilter.length > 0) {

		asAnEmpContext.dateFilter = new sap.ui.model.Filter({
			filters : asAnEmpContext.dateFilter,
			and : false
		});
		bDateFilter = true;
	}
	
	var finalFilterList = [];
	if(bSubStatusFilter){
		finalFilterList.push(asAnEmpContext.subStFilter);
	}
	if(bDocFilter){
		finalFilterList.push(asAnEmpContext.docFilter);
	}
	if(bActionFilter){
		finalFilterList.push(asAnEmpContext.actionFilter);
	}
	if(bDateFilter){
		finalFilterList.push(asAnEmpContext.dateFilter);
	}
	
	/* Apply filter to the list if any filter is selected. If no filter is selected then remove all filters */
	if(finalFilterList.length>0){
		var oFilter = new sap.ui.model.Filter({
			filters: finalFilterList ,
			and: true
		});
		asAnEmpContext.employeeDocList.getBinding("rows").filter([oFilter]);
	}
	else{
		asAnEmpContext.employeeDocList.getBinding("rows").filter(null);
	}
	
	asAnEmpContext.employeeDocCountText.setText(asAnEmpContext.employeeDocList.getBinding("rows").iLength);
	

};