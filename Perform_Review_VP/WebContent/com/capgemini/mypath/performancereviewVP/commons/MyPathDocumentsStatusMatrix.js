jQuery.sap.declare("com.capgemini.mypath.performancereviewVP.commons.MyPathDocumentsStatusMatrix");

/*//CONSTRUCTOR
com.capgemini.mypath.performancereviewVP.commons.MyPathDocumentsStatusMatrix = function(options) {
	this.options = jQuery.extend({}, this.defaultSettings, options);
	this.options._self = this;
	var _self = this;
}*/

//object instance methods
com.capgemini.mypath.performancereviewVP.commons.MyPathDocumentsStatusMatrix = {

		action			: false,
		editable		: false,
		visible			: false,
		hideReview      : false,
		substatus		: "A",
		iconUrl			: "",

		isAction : function(documentFor, documentType, substatus) {
			this.readJSON(documentFor, documentType, substatus);
			return this.action;
		},

		parseJSON : function(data, documentType, substatus) {
			var _self = this;
			jQuery.each(data, function(idx, obj) {
				if (obj.Substatus === substatus && obj.DocumentType === documentType) {
					//console.log(obj.Action + ", " + obj.Editable + ", " + obj.Visible);
					_self.action = obj.Action;
					_self.editable = obj.Editable;
					_self.visible = obj.Visible;
					_self.substatus = obj.Substatus;
					_self.iconUrl = obj.iconUrl;
					_self.hideReview = obj.hideReview;
				}
			});
		},

		isEditable : function(documentFor, documentType, substatus) {
			this.readJSON(documentFor, documentType, substatus);
			return this.editable;
		},

		isVisible : function(documentFor, documentType, substatus) {
			this.readJSON(documentFor, documentType, substatus);
			return this.visible;
		},
		
		isHideReview : function(documentFor, documentType, substatus) {
			this.readJSON(documentFor, documentType, substatus);
			return this.hideReview;
		},

		readJSON : function(documentFor, documentType, substatus) {
			var _self = this;
			var oModel = new sap.ui.model.json.JSONModel();
			// json url for mypath matrix  
			var url = performancereviewVP_ns.url_app + "com/capgemini/mypath/performancereviewVP/model/MyPath_Substatus.json";
			//Ajax Call   
			jQuery.ajax({
				url : url,
				enableJsonpCallback : true,
				jsonpCallback : 'getJSON',
				contentType : "application/json",
				dataType : "json",
				async : false,
				success : function(data, textStatus, jqXHR) {
					var employeeData = data.Employee;
					var reviewerData = data.Reviewer;
					if (documentFor === "Employee") {
						_self.parseJSON(employeeData, documentType, substatus);
					} else {
						_self.parseJSON(reviewerData, documentType, substatus);
					}
				}
			});
		},
		
		getSubstatus : function(documentFor, documentType, substatus) {
			this.readJSON(documentFor, documentType, substatus);
			return this.substatus;
		},
		
		getIconUrl : function(documentFor, documentType, substatus) {
			this.readJSON(documentFor, documentType, substatus);
			return this.iconUrl;
		}
};

