jQuery.sap.declare("com.capgemini.mypath.util.MyPathText");
jQuery.sap.require("sap.m.Text");
jQuery.sap.require("sap.m.Link");
jQuery.sap.require("sap.m.Dialog");

sap.m.Text.extend("com.capgemini.mypath.util.MyPathText", {
	metadata: {
		library: "com.capgemini.mypath.util",
		properties: {
			showLimit : {type: "int", defaultValue: 100},
			showTextArea : {type: "boolean", defaultValue: false},
			colsCount : {type: "int", defaultValue: 0},
			rowsCount : {type: "int", defaultValue: 0}
		},
		aggregations: {},
		events: {}
	},

	renderer: {
		render: function(oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.addClass("showMoreText");
			oRm.writeClasses();
			oRm.write(">");
			
			var dlg = new sap.ui.ux3.OverlayDialog({
				width : "50%", // sap.ui.core.CSSSize
				height : "50%",
				openButtonVisible: false,
				closeButtonVisible: true,
				content: [new sap.m.TextArea({
					value: oControl.getText(),
					editable : false, // boolean, since 1.12.0
					width : "100%", // sap.ui.core.CSSSize
					height : "100%",
				})]//.addStyleClass("showMoreTextStyle")]
			}).addStyleClass("showMoreDialog");
			
			dlg.addEventDelegate({
				onAfterRendering: function(){
					$(".showMoreDialog").click(function(e){
						if($(e.target).hasClass("sapUiUx3ODOverlay sapUiUx3OverlayOverlay")){
							//dlg.destroyContent();
							dlg.close();
						};
					});
				}
			});
			var rowsLimit = 5;//parseInt(oControl.getShowLimit() / 35);
			var colsLimit = oControl.getShowLimit() / 2;
			if (oControl.getText().trim().length > oControl.getShowLimit()) {
				var ftext = new sap.m.TextArea({
					value : oControl.getText().substring(0, oControl.getShowLimit()),// + "...", // string
					editable : false, // boolean, since 1.12.0
					rows : oControl.getRowsCount() === 0 ? rowsLimit : oControl.getRowsCount(), // int
					cols : oControl.getColsCount() === 0 ? colsLimit : oControl.getColsCount()// int
				});
				oRm.renderControl(ftext);
				var aLink = new sap.m.Link({
					text: myPathContext.isVPReviewForm ? "MORE": myPathContext.i18nModel.getProperty("MORE").toUpperCase(), // string
					press : function() {dlg.open();}
				}).addStyleClass("showMoreLink");
				var aBr = new sap.ui.core.HTML(
							{
								content : "<br />", // string
							});
				oRm.renderControl(aBr);
				oRm.renderControl(aLink);
			} else if (oControl.getText()) {
				if(!oControl.getShowTextArea() && oControl.getText().indexOf("\n") === -1) {
					rowsLimit = 1;
					colsLimit = 50;
				} else if (!oControl.getShowTextArea()) {
					rowsLimit = 1;	
				}
				var ftext = new sap.m.TextArea({
					value : oControl.getText(),// + "...", // string
					editable : false, // boolean, since 1.12.0
					rows : oControl.getRowsCount() === 0 ? rowsLimit : oControl.getRowsCount(), // int
					cols : oControl.getColsCount() === 0 ? colsLimit : oControl.getColsCount()// int
				});
				oRm.renderControl(ftext);
			} else {
				oRm.write(oControl.getText());
			}
			oRm.write("</div>");
		}
	}
});