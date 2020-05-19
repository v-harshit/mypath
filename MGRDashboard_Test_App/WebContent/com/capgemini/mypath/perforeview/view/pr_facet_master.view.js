sap.ui.jsview("com.capgemini.mypath.perforeview.view.pr_facet_master", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.perforeview.view.pr_facet_master
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.perforeview.view.pr_facet_master";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.perforeview.view.pr_facet_master
	*/ 
	createContent : function(oController) {
		
		var oFacetMatrixlayout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			columns : 1,
			width : "100%"
		}).addStyleClass("oFacetMatrixlayout");

		
		performanceReviewerContext.oFacetMatrixlayout = oFacetMatrixlayout ;
					
        return oFacetMatrixlayout ;
		
	}

});