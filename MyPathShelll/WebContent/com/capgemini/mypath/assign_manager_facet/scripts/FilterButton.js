jQuery.sap.declare("com.capgemini.mypath.assign_manager_facet.scripts.FilterButton");
jQuery.sap.require("sap.m.Label");
jQuery.sap.require("sap.m.ToggleButton");
sap.ui.core.Control.extend("com.capgemini.mypath.assign_manager_facet.scripts.FilterButton", {
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
			var isBRNeeded = true;
			if (oControl.getHeader()) {
				oRm.renderControl(_headerText.setText(oControl.getHeader()).addStyleClass("reviewDocumentsFilterLabel"));
			} else {
				isBRNeeded = false;
			}
			
			var buttonTextArr = oControl.getButtonNames();
			for (var int = 0; int < buttonTextArr.length; int++) {
				var buttonText = buttonTextArr[int];
				var pressed = false;
				
				if(selected_buttons.indexOf(buttonText) != -1){
					pressed = true;
				}
				
				//Check for preselected filters for as an assignment manager view and show those filters as selected
				//also apply filters on the list
				if(asAssignManagerContext.asAnAMSelectedFilters.indexOf(buttonText) != -1){
					pressed = true;
					var index = asAssignManagerContext.totalSelectedButtonsArray.indexOf(oControl);
					if(index === -1){
						asAssignManagerContext.totalSelectedButtonsArray.push(oControl);
					}
					
				}
				
				_button   = new sap.m.ToggleButton({
					text : buttonText , 
					pressed : pressed,
					press : [function(oEvent) {
						oControl.fireButtonsPress(oEvent);

						var index = asAssignManagerContext.totalSelectedButtonsArray.indexOf(oControl);
						var selected_buttons = oControl.getSelectedButtons();
						
						if(index === -1){
							if(selected_buttons.length > 0){
								asAssignManagerContext.totalSelectedButtonsArray.push(oControl);
							}
						}
						else{
							if(selected_buttons.length <= 0){
								asAssignManagerContext.totalSelectedButtonsArray.splice(index,1);
							}
						}
						
						asAssignManagerContext.asAnAMSelectedFilters = [];
						for(var i=0; i< asAssignManagerContext.totalSelectedButtonsArray.length;i++){
							var sel_buttons = asAssignManagerContext.totalSelectedButtonsArray[i].getSelectedButtons();
							for(var j=0; j<sel_buttons.length; j++){
								asAssignManagerContext.asAnAMSelectedFilters.push(sel_buttons[j]);
							}
						}
						asAssignManagerContext.applyFilter();
					}, this]
				}).addStyleClass("reviewDocumentsFilterToggleButtonM");
				oControl.addButton(_button);
			}
			for (var int = 0; int < oControl.getButtons().length; int++) {
				var aButton = oControl.getButtons()[int];
				if (isBRNeeded) {
					oRm.write("<br />");
				}
				isBRNeeded = true;
				oRm.renderControl(aButton);
				oRm.write("<br class=\"actionSpaceBR\"/>");
			}
			oRm.write("<br /><br />");
		}
	}
});