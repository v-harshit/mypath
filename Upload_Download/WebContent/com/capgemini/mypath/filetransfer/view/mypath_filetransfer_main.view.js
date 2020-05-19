sap.ui.jsview("com.capgemini.mypath.filetransfer.view.mypath_filetransfer_main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf mypath_upload.View_1
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.filetransfer.view.mypath_filetransfer_main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf mypath_upload.View_1
	*/ 
	createContent : function(oController) {
		
 
		var oButton = new sap.m.Button({
			text : "Button",
			press : oController.handlePressButton
		});
		
		//return oButton;  
	}

});
