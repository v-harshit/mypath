sap.ui.jsview("com.capgemini.mypath.dashboard.view.dashboard_view", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.dashboard.view.dashboard_view
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.dashboard.view.dashboard_view";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.dashboard.view.dashboard_view
	*/ 
	createContent : function(oController) {
 		
		var main_container = new sap.ui.commons.layout.MatrixLayout({
			columns: 2,
			width: "100%",
			//widths:["65%","35%"]
		}).addStyleClass("dashboard_main_container");
		
		var dashboard_left_container = new sap.ui.commons.layout.MatrixLayoutCell({
			
		}).addStyleClass("dashboard_left_container");
		
		createLeftContainerData(dashboard_left_container);
		
		var dashboard_right_container = new sap.ui.commons.layout.MatrixLayoutCell({
			hAligh: sap.ui.commons.layout.HAlign.Center
		}).addStyleClass("dashboard_right_container");
		
		createRightContainerData(dashboard_right_container);
		
		var row = new sap.ui.commons.layout.MatrixLayoutRow({
			cells:[dashboard_left_container, dashboard_right_container]
		});
		
		//main_container.createRow(dashboard_left_container,dashboard_right_container);
		
		var imageCap = new sap.m.Image({
			src : "./com/capgemini/mypath/images/Capgemini-logo.png"
		}).addStyleClass("rotating-item");
		
		var imageSog = new sap.m.Image({
			src : "./com/capgemini/mypath/images/sogeti-logo.png"
		}).addStyleClass("rotating-item");
		
/*var capImgCell = new sap.ui.commons.layout.MatrixLayoutCell({
			content : [imageCap]
		});


var sogImgCell = new sap.ui.commons.layout.MatrixLayoutCell({
	content : [imageSog]
	
})
		var imageRow = new sap.ui.commons.layout.MatrixLayoutRow({
			cells:[capImgCell , sogImgCell]
		});
		
		main_container.addRow(imageRow);*/
		main_container.addRow(row);
		this.addContent(main_container);
		this.addContent(imageCap);
		this.addContent(imageSog);
		
		
		
	}

});