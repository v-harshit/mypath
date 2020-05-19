sap.ui.jsfragment("com.capgemini.mypath.hrbpreports.fragments.Dialog", {
	createContent : function(oController) {
		var data = oController[oController.f4Type];
		var oJSONModel = new sap.ui.model.json.JSONModel();
		oJSONModel.setData(data);
		var oTemplate = this.getCells(oController);   
		var columns = this.getColumns(oController);
		var oTable = new sap.m.TableSelectDialog({
			contentWidth : "50%", // sap.ui.core.CSSSize, since 1.18
			contentHeight : "60%", // sap.ui.core.CSSSize
			liveChange: function(oEvent) {oController.handleSearch(oEvent, oController)},
			search: function(oEvent) {oController.handleSearch(oEvent, oController)},
			title: hrbpreportsContext.oBundle.getText(oController.f4Type),
			confirm : function(oEvent) {oController.handleClose(oEvent, oController)},
			close : function(oEvent) {oController.handleClose(oEvent, oController)},
			columns : columns
		}).setModel(oJSONModel);  
		//id="__dialog0-searchField-I
		var path = "/results";  
		oTable.bindItems(path, oTemplate); 
		switch (oController.f4Type) {
		case "CustSpecificStatusSet":
			oTable._oSearchField.setPlaceholder("Search Status Number");
			break;
		case "PersAreaSet":
			oTable._oSearchField.setPlaceholder("Search PA");
			break;
		case "GlobalGradeSet":
			oTable._oSearchField.setPlaceholder("Search Res");
			break;
		case "AppTemplateSet":
			oTable._oSearchField.setPlaceholder("Search Object Id");
			break;
		}
		return oTable;
	},
	
	getCells : function(oController) {
		switch (oController.f4Type) {
		case "PersAreaSet":
			var oTemplate = new sap.m.ColumnListItem(  
					{cells: [
					         new sap.m.Text({text : "{Persa}"}),
					         new sap.m.Text({text : "{Name1}"}),
					         new sap.m.Text({text : "{Bukrs}"}),
					         new sap.m.Text({text : "{Molga}"})
					         ]  
					}); 
			break;
		case "CustSpecificStatusSet":
			var oTemplate = new sap.m.ColumnListItem(  
					{cells: [
					         new sap.m.Text({text : "{Sprsl}"}),
					         new sap.m.Text({text : "{Statn}"}),
					         new sap.m.Text({text : "{Statv}"}),
					         new sap.m.Text({text : "{Text1}"})
					         ]  
					}); 
			break;
		case "GlobalGradeSet":
			var oTemplate = new sap.m.ColumnListItem(  
					{cells: [
					         new sap.m.Text({text : "{Subty}"}),
					         new sap.m.Text({text : "{Hilfm}"}),
					         new sap.m.Text({text : "{Htext}"})
					         ]  
					}); 
			break;
		case "AppTemplateSet":
			var oTemplate = new sap.m.ColumnListItem(  
					{cells: [
					         new sap.m.Text({text : "{Objid}"}),
					         new sap.m.Text({text : "{Short}"}),
					         new sap.m.Text({text : "{Stext}"})
					         //new sap.m.Text({text : "{path: 'Begda', formatter: 'oController.convertDateL'}"}),
					         //new sap.m.Text({text : "{Endda}"})
					         ]  
					}); 
			break;
		default:
			break;
		}
		return oTemplate;
	},
	
	getColumns : function(oController) {
		switch (oController.f4Type) {
		case "PersAreaSet":
			var columns = [ new sap.m.Column({
						header : new sap.m.Text({text : "PA"}), // sap.ui.core.Control
					}),
					new sap.m.Column({
						header : new sap.m.Text({text : "Personnel Area Text"}), // sap.ui.core.Control
					}) ,
					new sap.m.Column({
						header : new sap.m.Text({text : "CoCd"}), // sap.ui.core.Control
					}) ,
					new sap.m.Column({
						header : new sap.m.Text({text : "CGrpg"}), // sap.ui.core.Control
					}) ]; 
			break;
		case "CustSpecificStatusSet":
			var columns = [ new sap.m.Column({
						header : new sap.m.Text({text : "Language Key"}), // sap.ui.core.Control
					}),
					new sap.m.Column({
						header : new sap.m.Text({text : "Status number"}), // sap.ui.core.Control
					}) ,
					new sap.m.Column({
						header : new sap.m.Text({text : "Stat."}), // sap.ui.core.Control
					}) ,
					new sap.m.Column({
						header : new sap.m.Text({text : "Name"}), // sap.ui.core.Control
					}) ]; 
			break;
		case "GlobalGradeSet":
			var columns = [ new sap.m.Column({
						header : new sap.m.Text({text : "STy."}), // sap.ui.core.Control
					}),
					new sap.m.Column({
						header : new sap.m.Text({text : "Res"}), // sap.ui.core.Control
					}) ,
					new sap.m.Column({
						header : new sap.m.Text({text : "Resource name"}), // sap.ui.core.Control
					}) ]; 
			break;
		case "AppTemplateSet":
				var columns = [ new sap.m.Column({
					header : new sap.m.Text({text : "Object Id"}), // sap.ui.core.Control
				}),
				new sap.m.Column({
					header : new sap.m.Text({text : "Object abbr."}), // sap.ui.core.Control
				}),
				new sap.m.Column({
					header : new sap.m.Text({text : "Object name"}), // sap.ui.core.Control
				}) ]; 
			break;
		default:
			break;
		}
		return columns;
	}
});