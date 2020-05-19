jQuery.sap.declare("com.capgemini.mypath.util.WorkflowType");
jQuery.sap.require('sap.ui.base.DataType');

com.capgemini.mypath.util.WorkflowType = sap.ui.base.DataType.createType(
		"com.capgemini.mypath.util.WorkflowType", 
		{
			isValid : function(sValue) {
				return sValue === "Active" || sValue === "Completed" || sValue === "Future";
			}
		},
		sap.ui.base.DataType.getType('string')
);
