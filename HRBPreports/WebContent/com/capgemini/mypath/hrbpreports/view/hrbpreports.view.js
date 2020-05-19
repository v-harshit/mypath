sap.ui.jsview("com.capgemini.mypath.hrbpreports.view.hrbpreports", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf com.capgemini.mypath.hrbpreports.view.hrbpreports
	 */ 
	getControllerName : function() {
		return "com.capgemini.mypath.hrbpreports.view.hrbpreports";
	},
	
	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf com.capgemini.mypath.hrbpreports.view.hrbpreports
	 */ 
	createContent : function(oController) {
		return oController.getHRBPFormLayout();
	}
});