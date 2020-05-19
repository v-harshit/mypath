jQuery.sap.declare("com.capgemini.mypath.util.MyPathText");
jQuery.sap.require("sap.m.Text");
jQuery.sap.require("sap.m.Link");
jQuery.sap.require("sap.m.Dialog");

sap.m.Text.extend("com.capgemini.mypath.util.MyPathText", {
	metadata: {
		library: "com.capgemini.mypath.util",
		properties: {
			showLimit : {type: "int", defaultValue: 100}
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

			/*var dlg = new sap.m.Dialog({
				showHeader : false, 
				content: [new sap.m.Text({text: oControl.getText()}).addStyleClass("showMoreTextStyle")]
			}).addStyleClass("showMoreDialog");
			dlg.onAfterRendering = function() {
				if (sap.m.Dialog.prototype.onAfterRendering) {
					sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
					var b = $('<div class="showMoreDialogClosebtn">X</div>');
					this.$().prepend(b);
					b.click(function() {
						this.close(); 
					}.bind(this));
				}
			};*/
			
			var dlg = new sap.ui.ux3.OverlayDialog({
				//showHeader : false, 
				openButtonVisible: false,
				closeButtonVisible: true,
				content: [new sap.m.Text({text: oControl.getText()}).addStyleClass("showMoreTextStyle")]
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
			
			/*dlg.addEventDelegate({
				onAfterRendering: function(){
					var b = $('<div class="showMoreDialogClosebtn">X</div>');
					$("#"+dlg.getId()).prepend(b);
					b.click(function() {
						//dlg.destroyContent();
						dlg.close(); 
					});
					
					var content = $("#"+dlg.getId()+" .sapUiUx3ODContent");
					b.css("top",(parseInt(content.css("margin-top"))+content.height()-20)+"px");
					b.css("right",(parseInt(content.css("margin-left"))+content.width()-40)+"px");
					$(".showMoreDialog").click(function(e){
						if($(e.target).hasClass("sapUiUx3ODOverlay")){
							//dlg.destroyContent();
							dlg.close();
						};
					});
				}
			});*/
			if (oControl.getText().trim().length > oControl.getShowLimit()) {
				oRm.write(oControl.getText().trim().substring(0, oControl.getShowLimit()) + "...");
				var aLink = new sap.m.Link({
					text: myPathContext.i18nModel.getProperty("MORE").toUpperCase(), // string
					press : function() {dlg.open();}
				}).addStyleClass("showMoreLink");
				oRm.renderControl(aLink);
			} else {
				oRm.write(oControl.getText());
			}
			oRm.write("</div>");
		}
	}
});