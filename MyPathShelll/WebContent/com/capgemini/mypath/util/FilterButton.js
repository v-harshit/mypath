jQuery.sap.declare("com.capgemini.mypath.util.FilterButton");
jQuery.sap.require("sap.m.Label");
jQuery.sap.require("sap.m.ToggleButton");

sap.ui.core.Control.extend("com.capgemini.mypath.util.FilterButton", {
	// the control API:
	metadata : {
		properties : {
			/* Business Object properties */
			header  		   : {type: 'string'},
			buttons 		   : {type: 'object', defaultValue: []}
		},

		aggregations : {
			_headerText        : {type: "sap.m.Label", multiple : false},
			_button            : {type : "sap.m.ToggleButton", multiple : false}
		},

		associations: {
		},

		events : {
		}
	},

	init : function(){
		var oControl = this, _headerText, _button;
		//create a header to show title of FilterButtons
		_headerText   = new sap.m.Label();
		this.setAggregation("_headerText", _headerText);
		/*//create buttons
		var buttonTextArr = oControl.getButtons();
		alert(buttonTextArr);
		for (var int = 0; int < buttonTextArr.length; int++) {
			alert( buttonTextArr[int]);
		}
		_button   = new sap.m.ToggleButton();
		this.setAggregation("_button", _button);*/
	},

	onAfterRendering: function (){
		//called after instance has been rendered (it's in the DOM)
	},

	renderer : {
		render : function(oRm, oControl) {
			var isBRNeeded = true;
			if (oControl.getHeader()) {
				oRm.renderControl(oControl.getAggregation("_headerText").setText(oControl.getHeader()).addStyleClass("reviewDocumentsFilterLabel"));
			} else {
				isBRNeeded = false;
			}
			var buttonTextArr = oControl.getButtons();
			for (var int = 0; int < buttonTextArr.length; int++) {
				if (isBRNeeded) {
					oRm.write("<br />");
				}
				isBRNeeded = true;
				var buttonText = buttonTextArr[int];
				_button   = new sap.m.ToggleButton();
				oRm.renderControl(_button.setText(buttonText).addStyleClass("reviewDocumentsFilterToggleButtonM"));
				oRm.write("<br class=\"actionSpaceBR\"/>");
			}
			oRm.write("<br /><br />");
		}
	}
});