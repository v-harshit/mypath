jQuery.sap.declare("com.capgemini.mypath.util.Workflow");
jQuery.sap.require("sap.m.Text");
jQuery.sap.require("sap.m.Image");
jQuery.sap.require("com.capgemini.mypath.util.WorkflowType");

sap.ui.core.Control.extend("com.capgemini.mypath.util.Workflow", {
	// the control API:
	metadata : {
		properties : {
			/* Business Object properties */
			header             : {type : 'string'},
			imageURIs		   : {type: 'object', defaultValue: []},
			activeImageIndex   : {type: 'int'},
			type               : {type : "com.capgemini.mypath.util.WorkflowType", defaultValue : "Future"},
			nodeCount          : {type: 'int'},
			top				   : {type: 'int'},
			tooltips		   : {type: 'object', defaultValue: []}
		},

		aggregations : {
			_headerText       : {type : "sap.m.Text", multiple : false},
			_image            : {type : "sap.m.Image", multiple : false}
		},

		associations: {
		},

		events : {
		}
	},

	init : function(){
		var oControl = this, _headerText, _image;
		//create a header to show title of workflow
		_headerText   = new sap.m.Text();
		if (myPathContext.language === "ZH") {
			_headerText.addStyleClass("workflowHeaderTextChina");
		}
		this.setAggregation("_headerText", _headerText);
		//create a image
		_image   = new sap.m.Image();
		this.setAggregation("_image", _image);
	},

	onAfterRendering: function (){
		//called after instance has been rendered (it's in the DOM)
	},

	renderer : {
		render : function(oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.addClass("workflowCSS");
			oRm.writeClasses();
			oRm.write("style=\"padding-top: 20px; margin-left: 100%;\">"); //" + oControl.getTop() + "px; padding-left: 1000px;\">");
			oRm.write("<table><tr><th class=\"workflowHeaderCSS\">");
			oRm.renderControl(oControl.getAggregation("_headerText").setText(oControl.getHeader()));
			oRm.write("</tr></th>");
			var array = oControl.getImageURIs();
			var tooltipsArray = oControl.getTooltips();
			var img_path = "./com/capgemini/mypath/images/";
			switch (oControl.getType()) {
			case "Active":
				var margintop = oControl.getTop();
				var linemargintop = oControl.getTop();
				for (var int = 0; int < array.length; int++) {
					var array_element = array[int];
					margintop = margintop / array.length;
					if (myPathContext.language === "ZH") {
						margintop = margintop / 1.5;
					}
					oRm.write("<tr><td class=\"tdClass\">");
					if (int === oControl.getActiveImageIndex()) {
						oRm.write("<a href=\"#\" class=\"tooltip\"><img src=\""+img_path + array_element + "\" alt=\"\" border=3 height=50 width=50" + "\" style=\"top: " + int + "; bottom: " + int + "; margin-top: " + margintop + "px;\" " + "></img><span>" + "<img src=\""+img_path+"tooltips.jpg\" style=\"left: 1.2rem; float:right; background-color: transparent;\" /><strong>" + tooltipsArray[int]  + "</strong></span></a>");//oControl.getAggregation("_image").setSrc(array_element));
					} else {
						oRm.write("<a href=\"#\" class=\"tooltip\"><img src=\""+img_path + array_element + "\" alt=\"\" border=3 height=30 width=30" + "\" style=\"top: " + int + "; bottom: " + int + "; margin-top: " + margintop + "px;\" " + "></img><span>" + "<img src=\""+img_path+"tooltips.jpg\" style=\"left: 1.2rem; float:right; background-color: transparent;\" /><strong>" + tooltipsArray[int]  + "</strong></span></a>");//oControl.getAggregation("_image").setSrc(array_element));
					}
					if (int < array.length - 1) {
						if (int === oControl.getActiveImageIndex()) {
							oRm.write("</td><td><hr align=\"center\" style=\"height: 6%;  margin-top: 24%;\" class=\"vertical\"/></td></tr>");
						} else {
							oRm.write("</td><td><hr align=\"center\" style=\"height: 5%;  margin-top: 14%;\" class=\"vertical\"/></td></tr>");
						}
					} else {
						oRm.write("</td></tr>");
					}
				}  
				break;
			case "Completed":
				var margintop = undefined;
				var linemargintop = undefined;
				for (var int = 0; int < oControl.getNodeCount(); int++) {
					if (int === 0) {
						margintop = margintop + 20;
					} else {
						margintop = margintop / 4;
					}
					if (myPathContext.language === "ZH") {
						margintop = margintop / 1.5;
					}
					oRm.write("<tr><td class=\"tdClass\">");
					oRm.write("<img src=\""+img_path+"blank.jpg\" alt=\"\" border=3 height=10 width=10" + "\" style=\"border-color: rgb(189, 224, 189); left: auto; right: auto; top: " + int + "; bottom: " + int + "; margin-top: " + margintop + "px;\" " + "></img>");//oControl.getAggregation("_image").setSrc(array_element));
					if (int < oControl.getNodeCount() - 1) {
						oRm.write("</td><td><hr align=\"center\" style=\"height: 7%;  margin-top: 4%;\" class=\"verticalBlank\"/></td></tr>");
					} else {
						oRm.write("</td></tr>");
					}
				}
				break;
			case "Future":
			default:
				var margintopg = undefined;
				var linemargintopg = undefined;
				for (var int = 0; int < oControl.getNodeCount(); int++) {
					if (int === 0) {
						margintopg = margintopg / 4;
					} else {
						margintopg = margintopg / 4;
					}
					if (myPathContext.language === "ZH") {
						margintop = margintop / 1.5;
					}
					oRm.write("<tr><td class=\"tdClass\">");
					oRm.write("<img src=\""+img_path+"grey.jpg\" alt=\"\" border=3 height=10 width=10" + "\" style=\"border-color: rgb(204, 204, 204); left: auto; right: auto; top: " + int + "; bottom: " + int + "; margin-top: " + margintopg + "px;\" " + "></img>");//oControl.getAggregation("_image").setSrc(array_element));
					oRm.write("</td></tr>");
					if (int < oControl.getNodeCount() - 1) {
						oRm.write("</td><td><hr align=\"center\" style=\"height: 7.3%;  margin-top: -7%;\" class=\"verticalGrey\"/></td></tr>");
					} else {
						oRm.write("</td></tr>");
					}
				}
			break;
			}
			oRm.write("</table>");
			oRm.write("</div>");
		}
	}
});