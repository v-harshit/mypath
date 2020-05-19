sap.ui.jsview("com.capgemini.mypath.shell.view.appshell", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf mypath_shell.view.appshell
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.shell.view.appshell";
	},
	
	/* Function to generate view content. To be called after successful service calls to get
	 * user details and employee details */
	viewContent: function(){
		var shell_header = myPathContext.createHeaderLayout();
		var nav_menu = myPathContext.createNavigationMenu();
			
		var content_area = new sap.ui.commons.layout.BorderLayoutArea({
			contentAlign: "center",
			visible: true,
		}).addStyleClass("shell_layout_content");
		
		myPathContext.content_area = content_area;
		
		// Create a BorderLayout instance
		var shell_layout = new sap.ui.commons.layout.BorderLayout({
			
			width: "100%", 
			height: "100%", 
			
			top: new sap.ui.commons.layout.BorderLayoutArea({
				size: "90px",
				contentAlign: "center",
				visible: true, 
				content: [shell_header]
				}).addStyleClass("shell_layout_top"),
				
			begin: new sap.ui.commons.layout.BorderLayoutArea({
				size: "100px",
				contentAlign: "center",
				visible: true, 
				content: nav_menu
				}).addStyleClass("shell_layout_left"),
				
			center: content_area ,
				
		}).addStyleClass("shell_layout");
		return shell_layout;
		//this.addContent(shell_layout);
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.shell.view.appshell
	*/ 
	createContent : function(oController) {
		var _self = this;
		//if (myPathContext.isBrowserCompatible()) {
			showBusy();
			getUserDetails(_self);
		/*} else {
			sap.m.MessageToast.show(myPathContext.i18nModel.getProperty("UNSUPPORTED_BROWSER"), {
				duration: 3000,                  
				width: "40%",                   
				my: "center center",             
				at: "center center",             
				onClose: function(){
					//logoff event
					$.ajax({
						url: myPathContext.url_host+"/sap/public/bc/icf/logoff",
						async: false
					}).complete(function(){
						location.reload();
					});
				},                   
				animationDuration: 500,        
			});
		}*/
	}

});
