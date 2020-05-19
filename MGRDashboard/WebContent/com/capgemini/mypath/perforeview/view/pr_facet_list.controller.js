sap.ui.controller("com.capgemini.mypath.perforeview.view.pr_facet_list", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.capgemini.mypath.perforeview.view.pr_facet_list
*/
	onInit: function() {
		//array for preselected filters
		performanceReviewerContext.preSelectedFilters = new Array();
		performanceReviewerContext.preSelectedFilters.push(myPathContext.documentText.PERFORMANCE_REVIEW);
		performanceReviewerContext.preSelectedFilters.push(myPathContext.documentText.VP_PERFORMANCE_REVIEW);
		performanceReviewerContext.getReporteesData();
	},
	
	onBeforeRendering: function(){
		if(myPathContext.performanceReview_Dashboard_Loaded)
			performanceReviewerContext.getReporteesData();
	},
	
	selectionCriteria: function(){
		var selectedCriteria = performanceReviewerContext.reporting_criteria_dropdown.getSelectedKey();
		//save previous criteria filters into context
		performanceReviewerContext["asPRSelectedFiltersLevel"+performanceReviewerContext.selectedCriteria] = performanceReviewerContext.asPRSelectedFilters;
		
		//assign new selected criteria filters as current filters
		performanceReviewerContext.asPRSelectedFilters = performanceReviewerContext["asPRSelectedFiltersLevel"+selectedCriteria];
		performanceReviewerContext.documentList = performanceReviewerContext["documentListLevel"+selectedCriteria];

		performanceReviewerContext.selectedCriteria = selectedCriteria;
		
		var itemTemplate = createSeeAllDocumentItemTemplate("manager");
		var data_model = new sap.ui.model.json.JSONModel();
		data_model.setData({modelData: performanceReviewerContext.documentList});
		performanceReviewerContext.docList.setModel(data_model);
		performanceReviewerContext.docList.bindRows("/modelData", itemTemplate);
		
		performanceReviewerContext.generateFilters(true);
		performanceReviewerContext.applyFilter();
	}

});