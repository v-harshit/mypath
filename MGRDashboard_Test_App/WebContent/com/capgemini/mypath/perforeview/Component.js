jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.perforeview.scripts.FilterButton");
jQuery.sap.require("com.capgemini.mypath.perforeview.scripts.scripts");
jQuery.sap.declare("com.capgemini.mypath.perforeview.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.perforeview.Component", {

	metadata : {
		
		     properties: {
                    text : "string"
            }  
	}
});

com.capgemini.mypath.perforeview.Component.prototype.createContent = function() {
	
	if(!myPathContext.performanceReview_Dashboard_Loaded){
		jQuery.sap.includeStyleSheet(performanceReviewerContext.url_app + "com/capgemini/mypath/perforeview/css/pr_style.css");
	}
	 performanceReviewerContext.documentList = [];
	 performanceReviewerContext.documentListLevel0 = [];
	 performanceReviewerContext.documentListLevel1 = [];
	 performanceReviewerContext.documentListLevel2 = [];
	 performanceReviewerContext.docArray = [];
	 performanceReviewerContext.empArray = [];
	 performanceReviewerContext.subStatusArr = [];
	 performanceReviewerContext.docFilter = [];
	 performanceReviewerContext.empFilter = [];
	 performanceReviewerContext.subStFilter = [];
	 performanceReviewerContext.actionFilter = [];
	 performanceReviewerContext.dateFilter = [];
	 performanceReviewerContext.totalSelectedButtonsArray = [];
	 performanceReviewerContext.asPRSelectedFilters = [];
	 performanceReviewerContext.asPRSelectedFiltersLevel0 = [];
	 performanceReviewerContext.asPRSelectedFiltersLevel1 = [];
	 performanceReviewerContext.asPRSelectedFiltersLevel2 = [];
	 performanceReviewerContext.selectedCriteria = "0";
	
    // create root view
	oView = sap.ui.view({
		viewName : "com.capgemini.mypath.perforeview.view.pr_facet_parent",
		type : "JS",
		viewData : {
			component : this
		}
	}).addStyleClass("facetview");
	
	oView.setModel(myPathContext.i18nModel, "i18n");
	
	return oView;
	
};