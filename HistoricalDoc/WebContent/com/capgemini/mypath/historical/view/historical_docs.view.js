sap.ui.jsview("com.capgemini.mypath.historical.view.historical_docs", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf com.capgemini.mypath.historical.view.historical_docs
	 */
	getControllerName : function() {
		return "com.capgemini.mypath.historical.view.historical_docs";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf com.capgemini.mypath.historical.view.historical_docs
	 */
	createContent : function(oController) {
		var oAccordion = new sap.ui.commons.Accordion({

		}).addStyleClass("historicaldoc_accordion");
		
		historicalContext.historicaldoc_accordion = oAccordion;

		//Building Section 1 - for local testing
/*		var oSection1 = new sap.ui.commons.AccordionSection();
		oSection1.setTitle("2015");

		for (var i = 0; i < 5; i++) {
			var oLink1 = new sap.m.Link({
				text : "Section 1 File name  " + (i + 1)
			}).addStyleClass("document_link");

			oSection1.addContent(oLink1);
		}
		oAccordion.addSection(oSection1);*/

		this.addContent(oAccordion);
	}

});