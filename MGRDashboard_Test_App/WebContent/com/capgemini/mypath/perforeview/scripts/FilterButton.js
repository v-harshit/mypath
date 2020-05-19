jQuery.sap.declare("com.capgemini.mypath.perforeview.scripts.FilterButton");
jQuery.sap.require("sap.m.Label");
jQuery.sap.require("sap.m.ToggleButton");
sap.ui.core.Control.extend("com.capgemini.mypath.perforeview.scripts.FilterButton", {
	// the control API:
	metadata : {
		properties : {
			"header"  		   : {type: 'string'},
			"buttonNames"	   : {type: 'object', defaultValue: []}
		},

		aggregations : {
			"headerText"       : {type: "sap.m.Label", multiple : false},
			"buttons"          : {type: "sap.m.ToggleButton", multiple : true, singularName : "button"}
		},
		
		defaultAggregation : "buttons",

		associations : {
		},

		events : {
			buttonsPress : {enablePreventDefault : true}
		}
	},

	init : function() { },

	onAfterRendering: function (){
		
	},
	
	getSelectedButtons : function() {
		var selectedButtons = [];
		for (var int = 0; int < this.getButtons().length; int++) {
			var button = this.getButtons()[int];
			var index = selectedButtons.indexOf(button.getText());
			if (button.getPressed()) {
				if (index === -1) {
					selectedButtons.push(button.getText());									
				}
			} else {
				if (index !== -1) {
					selectedButtons.splice(index);
				}
			}
		}
		return selectedButtons;
	},
	
	renderer : {
		render : function(oRm, oControl) {
			_headerText   = new sap.m.Label();
			
			var selected_buttons = oControl.getSelectedButtons();
			
			if(oControl.getButtons().length > 0){
				for(var i=oControl.getButtons().length-1; i >= 0; i--){
					oControl.removeButton(oControl.getButtons()[i]);
				}
			}
			
			oRm.renderControl(_headerText.setText(oControl.getHeader()).addStyleClass("reviewDocumentsFilterLabel"));
			var buttonTextArr = oControl.getButtonNames();
			for (var int = 0; int < buttonTextArr.length; int++) {
				var buttonText = buttonTextArr[int];
				var pressed = false;
				
				if(selected_buttons.indexOf(buttonText) != -1){
					pressed = true;
				}
				
				//Check for preselected filters for as an assignment manager view and show those filters as selected
				//also apply filters on the list
				if(performanceReviewerContext.asPRSelectedFilters.indexOf(buttonText) != -1){
					pressed = true;
					var index = performanceReviewerContext.totalSelectedButtonsArray.indexOf(oControl);
					if(index === -1){
						performanceReviewerContext.totalSelectedButtonsArray.push(oControl);
					}
					
				}
				
				_button   = new sap.m.ToggleButton({
					text : buttonText , 
					pressed : pressed,
					press : [function(oEvent) {
						oControl.fireButtonsPress(oEvent);

						var index = performanceReviewerContext.totalSelectedButtonsArray.indexOf(oControl);
						var selected_buttons = oControl.getSelectedButtons();
						
						if(index === -1){
							if(selected_buttons.length > 0){
								performanceReviewerContext.totalSelectedButtonsArray.push(oControl);
							}
						}
						else{
							if(selected_buttons.length <= 0){
								performanceReviewerContext.totalSelectedButtonsArray.splice(index,1);
							}
						}
						
						performanceReviewerContext.asPRSelectedFilters = [];
						for(var i=0; i< performanceReviewerContext.totalSelectedButtonsArray.length;i++){
							var sel_buttons = performanceReviewerContext.totalSelectedButtonsArray[i].getSelectedButtons();
							for(var j=0; j<sel_buttons.length; j++){
								performanceReviewerContext.asPRSelectedFilters.push(sel_buttons[j]);
							}
						}
						performanceReviewerContext.applyFilter();
					}, this]
				}).addStyleClass("reviewDocumentsFilterToggleButtonM");
				oControl.addButton(_button);
			}
			
			if(performanceReviewerContext.totalSelectedButtonsArray.length > 0)
				performanceReviewerContext.applyFilter();
			
			for (var int = 0; int < oControl.getButtons().length; int++) {
				var aButton = oControl.getButtons()[int];
				oRm.write("<br />");
				oRm.renderControl(aButton);
				oRm.write("<br class=\"actionSpaceBR\"/>");
			}
			oRm.write("<br /><br />");
		}
	}
});