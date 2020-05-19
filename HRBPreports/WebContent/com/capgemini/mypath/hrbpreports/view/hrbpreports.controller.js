
sap.ui.controller("com.capgemini.mypath.hrbpreports.view.hrbpreports", {
	
	f4Type : null,
	
	PersAreaSet : null,
	
	CustSpecificStatusSet : null,
	
	GlobalGradeSet : null,
	
	AppTemplateSet : null,
	
	ObjectTypesSet : null,
	
	f4Control : null,

	getI18nValue : function(text) {
		return hrbpreportsContext.oBundle.getText(text);
	},
	
	getF4 : function(type) {
		var _self = this;
		if (!this[type]) {
			hrbpreportsContext.hrbpreports_oDataModel.read(type, null, null, true,     
					function(oData,oResponse){
				_self[type] = oData;
			},
			function(oError){
			});
		}
	},
	
	getFilterText : function() {
		switch (this.f4Type) {
		case "PersAreaSet":
			var text = "Persa"; 
			break;
		case "CustSpecificStatusSet":
			var text = "Statn"; 
			break;
		case "GlobalGradeSet":
			var text = "Htext"; 
			break;
		case "AppTemplateSet":
			var text = "Objid"; 
			break;
		default:
			break;
		}
		return text;
	},
	
	handleSearch: function(oEvent, controller) {
		var sValue = oEvent.getParameter("value");
		var oFilter = new sap.ui.model.Filter(controller.getFilterText(), sap.ui.model.FilterOperator.Contains, sValue);
		var oBinding = oEvent.getSource().getBinding("items");
		oBinding.filter([oFilter]);
	},
	
	handleClose: function(oEvent, controller) {
		var aContexts = oEvent.getParameter("selectedContexts");
		if (aContexts.length) {
			aContexts.map(function(oContext) {
				controller.f4Control.setValue(oContext.getObject()[controller.getFilterText()]); 
			}).join(", ");
		}
		oEvent.getSource().getBinding("items").filter([]);
	},

	onValueHelpRequest : function(oControl) {
		this.f4Control = oControl;
		this.f4Type = oControl.getName();
		this._oDialog = sap.ui.jsfragment("com.capgemini.mypath.hrbpreports.fragments.Dialog", this);
		this.getView().addDependent(this._oDialog);
		this._oDialog.open();
	},
	
	//onAfterRendering : function() {
		//alert("dddd");
		/*oTable.addEventDelegate({
			onAfterRendering: function(){
				if (sap.ui.getCore().byId(oTable.getId() + "-searchField-I")) {
					sap.ui.getCore().byId(oTable.getId() + "-searchField-I").setPlaceHolder("Search Sanjoy");
				}
			}
		});*/
	//},
	
	handleItemPress : function (evt, _self, oBorderLayout, buttons){
		var items = evt.getSource().getItems();
	    for (var int = 0; int < items.length; int++) {
			var item = items[int];
			if (item.getSelected()) {
				hrbpreportsContext.selectedMenuItemCount = item.getCounter();
				oBorderLayout.getCenter().destroyContent();
				oBorderLayout.getCenter().addContent(_self.getHRBPForm());
				var secondButton = buttons[1];
				if (hrbpreportsContext.selectedMenuItemCount === 5) {
					secondButton.setText(hrbpreportsContext.oBundle.getText("DISPLAY"));
				} else {
					secondButton.setText(hrbpreportsContext.oBundle.getText("EXECUTE"));
				}
				break;
			}
		}
	},
	
	getHRBPFormLayout : function() {
		var _self = this;
		var form = this.getHRBPForm();
		this.getF4("PersAreaSet");
		this.getF4("CustSpecificStatusSet");
		this.getF4("GlobalGradeSet");
		this.getF4("AppTemplateSet");
		this.getF4("ObjectTypesSet");
		var execute_btn = new sap.m.Button({
			width : "50%",
			text: '{i18n>EXECUTE}',
			press: function(oEvent) {_self.execute(_self);}
		}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		var cancel_btn = new sap.m.Button({
			width : "54%",
			text: '{i18n>CANCEL}',
			press: function(oEvent) {myPathContext.back();}
		}).addStyleClass("save_btn_style").addStyleClass("btn_normal");
		var buttons = [cancel_btn, execute_btn];
		var oJSONModel = new sap.ui.model.json.JSONModel();
		var oModel = {"items": [ {"key" : 1, "text" : "MONITORING_REPORT"},  
                                 {"key" : 2, "text" : "VIEW_PRINT_SAP_PERF_DOCS"},
                                 {"key" : 3, "text" : "VIEW_PRINT_HISTORICAL_PERF_DOCS"}, 
                                 {"key" : 4, "text" : "CALIBRATION_REPORT"},  
                                 {"key" : 5, "text" : "MY_GENERATED_REPORTS"}
                                 ]};
		oJSONModel.setData(oModel);
		var oTable =  new sap.m.List({
			itemPress : function(evt) {_self.handleItemPress(evt, _self, oBorderLayout, buttons)}, 
			mode : sap.m.ListMode.SingleSelectMaster,
			items: {
				path: "/items",
				template: new sap.m.StandardListItem({
					type: "Active",
					counter : {path : 'key'},
					title: {path: 'text', formatter: _self.getI18nValue}
				}).addStyleClass("menuHRBPItemsCSS")
			},
		}).setModel(oJSONModel).addStyleClass("menuHRBPTableCSS");
		oTable.getItems()[0].setSelected(true);
		var oBorderLayout = new sap.ui.commons.layout.BorderLayout({
			begin : new sap.ui.commons.layout.BorderLayoutArea({
				contentAlign : "center", // string
				size : "20%", // sap.ui.core.CSSSize
				overflowX : "visible", // string
				overflowY : "visible", // string
				content : oTable
			}).addStyleClass("HRBPLeftAreaCSS"),
			center : new sap.ui.commons.layout.BorderLayoutArea({
				contentAlign : "left", // string
				size : "80%", // sap.ui.core.CSSSize
				overflowX : "visible", // string
				overflowY : "visible", // string
				content : form
			}).addStyleClass("HRBPRightAreaCSS")
		});
		return [oBorderLayout, buttons];
	},
	
	getHRBPForm : function() {
		var _self = this;
		switch (hrbpreportsContext.selectedMenuItemCount) {
		case 1:
		default:
			return new sap.ui.layout.form.SimpleForm({
				editable : false, 
				content : [
				           new sap.m.Label( // 0
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("TEMPLATE_SELECTION")
		        		   }).addStyleClass("assessmentlabelCSS"),
		        		   new sap.m.Text(),// 1
		        		   new sap.m.Label( // 2
	    				   {
	    					   required : true,
	    					   text : hrbpreportsContext.oBundle.getText("APPRAISAL_TEMPLATE")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.MultiInput({ // 3 VTemp
	    					   name : "AppTemplateSet",
	    					   width: "80%", 
	    					   valueHelpRequest : [ function(oEvent) {
								var control = oEvent.getSource();
								_self.onValueHelpRequest(control);
	    					   }, this ]
	    				   }),
		        		   new sap.m.Label( // 4
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("DATE")
		        		   }).addStyleClass("assessmentlabelCSS"),
		        		   new sap.m.Text(),// 5
		        		   new sap.m.Label(// 6
        				   {
        					   text : hrbpreportsContext.oBundle.getText("VALIDITY_PERIOD")
        				   }).addStyleClass("hrbpLabelCSS"),
        				   new sap.m.FlexBox( // 7
						   {
								alignItems : sap.m.FlexAlignItems.Start, // sap.m.FlexAlignItems
								items : [new sap.m.DatePicker( // 7.0 ValidFrom
						        		   {
						        			   width : "70%", 
						        			   dateValue : new Date(new Date().getFullYear(), 0, 1),
						        			   change :function()
						        			   {
						        				   
						        			   }
						        		   }).addStyleClass("factDatePic"),
						        		   new sap.m.Label( // 7.1
				        				   {
				        					   text : hrbpreportsContext.oBundle.getText("To")
				        				   }).addStyleClass("hrbpLabel1CSS"),
				        				   new sap.m.DatePicker( // 7.2 ValidTo
						        		   {
						        			   width : "70%", 
						        			   dateValue : new Date(new Date().getFullYear(), 11, 31),
						        			   change :function()
						        			   {
						        				   
						        			   }
						        		   }).addStyleClass("factDatePic")]
						   }),
		        		   new sap.m.Label( // 8
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("PARTICIPANTS")
	    				   }).addStyleClass("assessmentlabelCSS"),
	    				   new sap.m.Text(),// 9
		        		   new sap.m.Label( // 10
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("APPRAISER_LABEL")
		        		   }).addStyleClass("hrbpLabelCSS"),
		        		   new sap.m.Input({name : "", width: "100%", change : function(oEvent) { // 11 SAprnam
		        			   hrbpreportsContext.isEdited = true;
		        			   hrbpreportsContext.appraiser_search_input = oEvent.getSource();
		        			   oEvent.getSource().focus();
		        		   }}).attachBrowserEvent("keypress",function(e){
		        				var keycode = e.keyCode || e.which;
		        				if(keycode ==13){
		        					_self.hrbp_Emp_search(hrbpreportsContext.appraiser_search_input);
		        				}
		        			}),
		        		   new sap.m.Image({ // 12
		        			   width : "19%", // sap.ui.core.CSSSize
		        			   src: myPathContext.url_app + "zmypath/com/capgemini/mypath/images/search_icon.png",
		        			   press: function() {_self.hrbp_Emp_search(hrbpreportsContext.appraiser_search_input)}
		        		   }).addStyleClass("search_icon_style").addStyleClass("emp_search_image"),
		        		   new sap.m.Label( // 13
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("APPRAISEE_LABEL")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.Input({name : "", width: "100%", change : function(oEvent) { // 14 SApenam
		        			   hrbpreportsContext.isEdited = true;
		        			   hrbpreportsContext.appraisee_search_input = oEvent.getSource();
		        			   oEvent.getSource().focus();
		        		   }}).attachBrowserEvent("keypress",function(e){
		        				var keycode = e.keyCode || e.which;
		        				if(keycode ==13){
		        					_self.hrbp_Emp_search(hrbpreportsContext.appraisee_search_input);
		        				}
		        			}),
		        		   new sap.m.Image({ // 15
		        			   width : "19%", // sap.ui.core.CSSSize
		        			   src: myPathContext.url_app + "zmypath/com/capgemini/mypath/images/search_icon.png",
		        			   press: function() {_self.hrbp_Emp_search(hrbpreportsContext.appraisee_search_input)}
		        		   }).addStyleClass("search_icon_style").addStyleClass("emp_search_image"),
		        		   new sap.m.Label( // 16
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("FURTHER_SELECTION")
		        		   }).addStyleClass("assessmentlabelCSS"),
		        		   new sap.m.Text(), // 17
		        		   new sap.m.Label( // 18
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("PERSONNEL_AREA")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.MultiInput({ // 19 Werks
	    					   name : "PersAreaSet",
	    					   width: "60%", 
	    					   valueHelpRequest : [ function(oEvent) {
								var control = oEvent.getSource();
								_self.onValueHelpRequest(control);
	    					   }, this ]
	    				   }),
				           new sap.m.Label( // 20
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("EMPLOYEE_HIRE_DATE")
		        		   }).addStyleClass("hrbpLabelCSS"),
		        		   new sap.m.DatePicker( // 21 VHrdt 
				        		   {
				        			   width : "60%", 
				        			   change :function()
				        			   {
				        				   
				        			   }
				        		   }).addStyleClass("factDatePic"),
		        		   new sap.m.Label( // 22
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("CUSTOMER_SPECIFIC_STATUS")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.MultiInput({ // 23 VStat1
	    					   name : "CustSpecificStatusSet",
	    					   width: "60%", 
	    					   value : 3,
	    					   valueHelpRequest : [ function(oEvent) {
								var control = oEvent.getSource();
								_self.onValueHelpRequest(control);
	    					   }, this ]
	    				   }),
		        		   new sap.m.Label( // 24
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("STATUS")
		        		   }).addStyleClass("assessmentlabelCSS"),
		        		   new sap.m.Text(), // 25
		        		   new sap.m.Label(), // 26
		        		   new sap.m.CheckBox( //27 VPrep
        				   {
        					   selected : true,
        					   text : hrbpreportsContext.oBundle.getText("IN_PREPARATION"),
        					   select : [ function(oEvent) {
        						   var control = oEvent.getSource();
        					   }, this ]
        				   }),
        				   new sap.m.Label(), //28
        				   new sap.m.CheckBox( // 29 VPlan
						   {
							   selected : true,
							   text : hrbpreportsContext.oBundle.getText("IN_PLANNING"),
							   select : [ function(oEvent) {
								   var control = oEvent.getSource();
							   }, this ]
						   }),
						   new sap.m.Label(), // 30
		        		   new sap.m.CheckBox( // 31 VReview
        				   {
        					   selected : true,
        					   text : hrbpreportsContext.oBundle.getText("IN_REVIEW"),
        					   select : [ function(oEvent) {
        						   var control = oEvent.getSource();
        					   }, this ]
        				   }),
        				   new sap.m.Label(), // 32
        				   new sap.m.CheckBox( // 33 VProc
						   {
							   selected : true,
							   text : hrbpreportsContext.oBundle.getText("IN_PROCESS"),
							   select : [ function(oEvent) {
								   var control = oEvent.getSource();
							   }, this ]
						   }),
						   new sap.m.Label(), // 34
		        		   new sap.m.CheckBox( // 35 VCompl
        				   {
        					   selected : true,
        					   text : hrbpreportsContext.oBundle.getText("COMPLETE"),
        					   select : [ function(oEvent) {
        						   var control = oEvent.getSource();
        					   }, this ]
        				   })
	    				  ]}).addStyleClass("HRBPFormCSS");
			break;
		case 2:
			return new sap.ui.layout.form.SimpleForm({
				editable : false, 
				content : [
				           new sap.m.Label( // 0
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Appraisal_Details")
		        		   }).addStyleClass("assessmentlabelCSS"),
		        		   new sap.m.Text(), // 1
		        		   new sap.m.Label( // 2
	    				   {
	    					   required : true,
	    					   text : hrbpreportsContext.oBundle.getText("Performance_Year")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.Input({ // 3 VYear
	    					   width: "30%" 
	    				   }),
		        		   new sap.m.Label( // 4
        				   {
        					   required : true,
        					   text : hrbpreportsContext.oBundle.getText("Template")
        				   }).addStyleClass("hrbpLabelCSS"),
        				   new sap.m.MultiInput({ // 5 VDocTy
        					   name : "AppTemplateSet",
	    					   width: "50%", 
	    					   valueHelpRequest : [ function(oEvent) {
								var control = oEvent.getSource();
								_self.onValueHelpRequest(control);
	    					   }, this ]
	    				   }),
		        		   new sap.m.Label( // 6
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Reviewer_Name")
		        		   }).addStyleClass("hrbpLabelCSS"),
		        		   new sap.m.Input({name: hrbpreportsContext.oBundle.getText("Reviewer_Name"), width: "100%", change : function(oEvent) { // 7 VAppre 
		        			   hrbpreportsContext.isEdited = true;
		        			   hrbpreportsContext.appraiser_search_input = oEvent.getSource();
		        			   oEvent.getSource().focus();
		        		   }}).attachBrowserEvent("keypress",function(e){
		        				var keycode = e.keyCode || e.which;
		        				if(keycode ==13){
		        					_self.hrbp_Emp_search(hrbpreportsContext.appraiser_search_input);
		        				}
		        			}),
		        		   new sap.m.Image({ // 8
		        			   width : "19%", // sap.ui.core.CSSSize
		        			   src: myPathContext.url_app + "zmypath/com/capgemini/mypath/images/search_icon.png",
		        			   press: function() {_self.hrbp_Emp_search(hrbpreportsContext.appraiser_search_input)}
		        		   }).addStyleClass("search_icon_style").addStyleClass("emp_search_image"),
		        		   new sap.m.Label( // 9
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Reviewer_Global_Id")
		        		   }).addStyleClass("hrbpLabelCSS"),
		        		   new sap.m.Input({width: "59.5%", change : function(oEvent) { // 10 VApprei
		        			   hrbpreportsContext.isEdited = true;
		        		   }}),
		        		   new sap.m.Label( // 11
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("Employee_Name")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.Input({name: hrbpreportsContext.oBundle.getText("Employee_Name"), width: "100%", change : function(oEvent) { // 12 VApprs 
		        			   hrbpreportsContext.isEdited = true;
		        			   hrbpreportsContext.appraisee_search_input = oEvent.getSource();
		        			   oEvent.getSource().focus();
		        		   }}).attachBrowserEvent("keypress",function(e){
		        				var keycode = e.keyCode || e.which;
		        				if(keycode ==13){
		        					_self.hrbp_Emp_search(hrbpreportsContext.appraisee_search_input);
		        				}
		        			}),
		        		   new sap.m.Image({ // 13
		        			   width : "19%", // sap.ui.core.CSSSize
		        			   src: myPathContext.url_app + "zmypath/com/capgemini/mypath/images/search_icon.png",
		        			   press: function() {_self.hrbp_Emp_search(hrbpreportsContext.appraisee_search_input)}
		        		   }).addStyleClass("search_icon_style").addStyleClass("emp_search_image"),
		        		   new sap.m.Label( // 14
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Employee_Global_Id")
		        		   }).addStyleClass("hrbpLabelCSS"),
		        		   new sap.m.Input({width: "59.5%", change : function(oEvent) { // 15 VApprei
		        			   hrbpreportsContext.isEdited = true;
		        		   }}),
		        		   new sap.m.Label( // 16
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Display_View")
		        		   }).addStyleClass("assessmentlabelCSS"),
		        		   new sap.m.Text(), // 17
		        		   new sap.m.Label(), // 18
		        		   new sap.m.FlexBox( // 19
								   {
										alignItems : sap.m.FlexAlignItems.Start, // sap.m.FlexAlignItems
										items : [
										         new sap.m.RadioButton({ // 19.0 VEmp
										        	 selected : true, // boolean
										        	 groupName : "GroupA", // string
										        	 select : [ function(oEvent) {
										        		 var control = oEvent.getSource();
										        	 }, this ]
										         }),
										         new sap.m.Text({text : hrbpreportsContext.oBundle.getText("Employee_View")}).addStyleClass("hrbpRadioButtonTextSC"), // 19.1 
										         new sap.m.RadioButton({ // 19.2 VMgr
										        	 selected : false, // boolean
										        	 groupName : "GroupA", // string
										        	 select : [ function(oEvent) {
										        		 var control = oEvent.getSource();
										        	 }, this ]
										         }),
										         new sap.m.Text({text : hrbpreportsContext.oBundle.getText("Reviewer_View")}).addStyleClass("hrbpRadioButtonTextSC")] // 19.3 
								   })
	    				  ]}).addStyleClass("HRBPFormCSS");
			break;
		case 3:
			return new sap.ui.layout.form.SimpleForm({
				editable : false, 
				content : [
				           new sap.m.Label( // 0
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Selection_Parameters")
		        		   }).addStyleClass("assessmentlabelCSS"),
		        		   new sap.m.Text(), // 1
		        		   new sap.m.Label( // 2
	    				   {
	    					   required : true,
	    					   text : hrbpreportsContext.oBundle.getText("Performance_Year")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.Input({ // 3
	    					   width: "30%" 
	    				   }),
		        		   new sap.m.Label( // 4
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("Employee_Name")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.Input({name : hrbpreportsContext.oBundle.getText("Employee_Name"), width: "100%", change : function(oEvent) { // 5 SApenam
		        			   hrbpreportsContext.isEdited = true;
		        			   hrbpreportsContext.appraisee_search_input = oEvent.getSource();
		        			   oEvent.getSource().focus();
		        		   }}).attachBrowserEvent("keypress",function(e){
		        				var keycode = e.keyCode || e.which;
		        				if(keycode ==13){
		        					_self.hrbp_Emp_search(hrbpreportsContext.appraisee_search_input);
		        				}
		        			}),
		        		   new sap.m.Image({ // 6
		        			   width : "19%", // sap.ui.core.CSSSize
		        			   src: myPathContext.url_app + "zmypath/com/capgemini/mypath/images/search_icon.png",
		        			   press: function() {_self.hrbp_Emp_search(hrbpreportsContext.appraisee_search_input)}
		        		   }).addStyleClass("search_icon_style").addStyleClass("emp_search_image"),
		        		   new sap.m.Label( // 7
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Employee_Global_Id")
		        		   }).addStyleClass("hrbpLabelCSS"),
		        		   new sap.m.Input({width: "59.5%", change : function(oEvent) { // 8 VApprei
		        			   hrbpreportsContext.isEdited = true;
		        		   }})
	    				  ]}).addStyleClass("HRBPFormCSS");
			break;
		case 4:
			var oJSONModel = new sap.ui.model.json.JSONModel();
			oJSONModel.setData(_self.ObjectTypesSet);
			var oTemplate = new sap.ui.core.Item({  
	            key : "{Otype}",  
	            text : "{Otext}"  
	        });
			var path = "/results";  
			return new sap.ui.layout.form.SimpleForm({
				editable : false, 
				content : [
		        		   new sap.m.Label( // 0
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("PARTICIPANTS")
	    				   }).addStyleClass("assessmentlabelCSS"),
	    				   new sap.m.Text(), // 1
		        		   new sap.m.Label( // 2
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("APPRAISER_LABEL")
		        		   }).addStyleClass("hrbpLabelCSS"),
		        		   new sap.m.Select({selectedKey : "P"}).setModel(oJSONModel).bindItems(path, oTemplate), // 3 
		        		   new sap.m.Input({name : "", width: "100%", change : function(oEvent) { // 4 SAprnam
		        			   hrbpreportsContext.isEdited = true;
		        			   hrbpreportsContext.appraiser_search_input = oEvent.getSource();
		        			   oEvent.getSource().focus();
		        		   }}).attachBrowserEvent("keypress",function(e){
		        				var keycode = e.keyCode || e.which;
		        				if(keycode ==13){
		        					_self.hrbp_Emp_search(hrbpreportsContext.appraiser_search_input);
		        				}
		        			}),
		        		   new sap.m.Image({ // 5
		        			   width : "37%", // sap.ui.core.CSSSize
		        			   src: myPathContext.url_app + "zmypath/com/capgemini/mypath/images/search_icon.png",
		        			   press: function() {_self.hrbp_Emp_search(hrbpreportsContext.appraiser_search_input)}
		        		   }).addStyleClass("search_icon_style").addStyleClass("emp_search_image"),
		        		   new sap.m.Label( // 6
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("APPRAISEE_LABEL")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.Select({selectedKey : "P"}).setModel(oJSONModel).bindItems(path, oTemplate), // 7
	    				   new sap.m.Input({name : "", width: "100%", change : function(oEvent) { // 8 SApenam
		        			   hrbpreportsContext.isEdited = true;
		        			   hrbpreportsContext.appraisee_search_input = oEvent.getSource();
		        			   oEvent.getSource().focus();
		        		   }}).attachBrowserEvent("keypress",function(e){
		        				var keycode = e.keyCode || e.which;
		        				if(keycode ==13){
		        					_self.hrbp_Emp_search(hrbpreportsContext.appraisee_search_input);
		        				}
		        			}),
		        		   new sap.m.Image({ // 9
		        			   width : "37%", // sap.ui.core.CSSSize
		        			   src: myPathContext.url_app + "zmypath/com/capgemini/mypath/images/search_icon.png",
		        			   press: function() {_self.hrbp_Emp_search(hrbpreportsContext.appraisee_search_input)}
		        		   }).addStyleClass("search_icon_style").addStyleClass("emp_search_image"),
		        		   new sap.m.Label( // 10
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Primary_Selection")
		        		   }).addStyleClass("assessmentlabelCSS"),
		        		   new sap.m.Text(), // 11
		        		   new sap.m.Label( // 12
	    				   {
	    					   required : true,
	    					   text : hrbpreportsContext.oBundle.getText("Performance_Years")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.Input({ // 13 VYear
	    					   width: "30%" 
	    				   }),
		        		   new sap.m.Label( // 14
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("PERSONNEL_AREA")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.MultiInput({ // 15 Werks
	    					   name : "PersAreaSet",
	    					   width: "60%", 
	    					   valueHelpRequest : [ function(oEvent) {
								var control = oEvent.getSource();
								_self.onValueHelpRequest(control);
	    					   }, this ]
	    				   }),
	    				   new sap.m.Label( // 16
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Secondary_Selection")
		        		   }).addStyleClass("assessmentlabelCSS"),
		        		   new sap.m.Text(), // 17
		        		   new sap.m.Label( // 18
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("CUSTOMER_SPECIFIC_STATUS")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.MultiInput({ // 19 VStat1
	    					   value : 3,
	    					   name : "CustSpecificStatusSet",
	    					   width: "60%", 
	    					   valueHelpRequest : [ function(oEvent) {
								var control = oEvent.getSource();
								_self.onValueHelpRequest(control);
	    					   }, this ]
	    				   }),
		        		   new sap.m.Label( // 20
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("Global_Grade")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.MultiInput({ // 21 SHilfm
	    					   name : "GlobalGradeSet",
	    					   width: "60%", 
	    					   valueHelpRequest : [ function(oEvent) {
								var control = oEvent.getSource();
								_self.onValueHelpRequest(control);
	    					   }, this ]
	    				   })
	    				  ]}).addStyleClass("HRBPFormCSS");
			break;
		case 5:
			return new sap.ui.layout.form.SimpleForm({
				editable : false, 
				content : [
		        		   new sap.m.Label( // 0
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Report_Type")
		        		   }).addStyleClass("hrbpLabelCSS"),
		        		   new sap.m.ComboBox( // 1
						   {
							   maxWidth : "35%", 
							   selectedKey : "1", // string
							   items : [ new sap.ui.core.Item(
								{
									text : hrbpreportsContext.oBundle.getText("MONITORING_REPORT"),
									key : "1", // string
								}),
								 new sap.ui.core.Item(
								{
									text : hrbpreportsContext.oBundle.getText("CALIBRATION_REPORT"),
									key : "4", // string
								}) ], // sap.ui.core.Item
								selectionChange : [ function(oEvent) {
									var control = oEvent.getSource();
								}, this ]
						   }),
		        		   new sap.m.Label( // 2
		        		   {
		        			   text : hrbpreportsContext.oBundle.getText("Report_Created_Between")
		        		   }).addStyleClass("assessmentlabelCSS"),
		        		   new sap.m.Text(), // 3
		        		   new sap.m.Label( // 4
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("PIP_PROGRESS_START")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.DatePicker( // 5
		        		   {
		        			   width : "30%", 
		        			   dateValue : new Date(new Date().getFullYear(), 0, 1),
		        			   change :function()
		        			   {
		        				   
		        			   }
		        		   }).addStyleClass("factDatePic"),
		        		   new sap.m.Label( // 6
	    				   {
	    					   text : hrbpreportsContext.oBundle.getText("PIP_PROGRESS_END")
	    				   }).addStyleClass("hrbpLabelCSS"),
	    				   new sap.m.DatePicker( // 7
		        		   {
		        			   width : "30%", 
		        			   dateValue : new Date(new Date().getFullYear(), 11, 31),
		        			   change :function()
		        			   {
		        				   
		        			   }
		        		   }).addStyleClass("factDatePic")
	    				  ]}).addStyleClass("HRBPFormCSS");
			break;
		}
	},
	
	execute : function(_self) {
		showBusy();
		myPathContext.documentId = "";
		hrbpreportsContext.doc_count = 0;
		setTimeout(function(){
			var hrbpForm = _self.getView().getContent()[0].getCenter();
			var formContent = hrbpForm.getContent()[0].getContent();
			var pdfIcon = new sap.m.Image({
				src : myPathContext.url_app + "zmypath/com/capgemini/mypath/images/pdf.png", // sap.ui.core.URI
				width : "40px", // sap.ui.core.CSSSize
				height : "40px", // sap.ui.core.CSSSize
				press : [ function(oEvent) {
					if (myPathContext.documentId) {
						displayPrintDocument(myPathContext.documentId);						
					} else {
						_self.showMessage(hrbpreportsContext.oBundle.getText("Please_Select"));	
					}
				}, this ]
			}).addStyleClass("pdfImageHrbp");
			switch (hrbpreportsContext.selectedMenuItemCount) {
			case 1:
				var serviceURL = hrbpreportsContext.sServiceUrl;
				var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
				var dataToSave = {};
				dataToSave.VTemp    	= formContent[3].getValue();
				dataToSave.ValidFrom    = structureyyyymmdd(formContent[7].getItems()[0].getValue());
				dataToSave.ValidTo    	= structureyyyymmdd(formContent[7].getItems()[2].getValue());
				dataToSave.PAprty   	= "P";//formContent[].getValue();
				dataToSave.SAprnam  	= formContent[11].getValue();
				dataToSave.PApety   	= "P";//formContent[].getValue();
				dataToSave.SApenam  	= formContent[14].getValue();
				dataToSave.Werks    	= formContent[19].getValue();
				dataToSave.VHrdt    	= structureyyyymmdd(formContent[21].getValue()) === "" ? "0000-00-00T00:00:00" : structureyyyymmdd(formContent[21].getValue());
				dataToSave.VStat1   	= formContent[23].getValue();
				dataToSave.VPrep  		= formContent[27].getSelected() ? "X" : "";
				dataToSave.VPlan    	= formContent[29].getSelected() ? "X" : "";
				dataToSave.VReview    	= formContent[31].getSelected() ? "X" : "";
				dataToSave.VProc   		= formContent[33].getSelected() ? "X" : "";
				dataToSave.VCompl    	= formContent[35].getSelected() ? "X" : "";
				_self.createModel(oModel, "/MonitoringReportSet", dataToSave, dataToSave.VTemp);
				break;
			case 2:
				var vYear = formContent[3].getValue();
				var vDocTy = formContent[5].getValue();
				var vAppre = formContent[7].getValue();
				var vApprei = formContent[10].getValue();
				var vApprs = formContent[12].getValue();
				var apprsi = formContent[15].getValue();
				var vEmp = formContent[19].getItems()[0].getSelected() ? "X" : "";
				var vMgr = formContent[19].getItems()[2].getSelected() ? "X" : "";
				if (!vYear || !vDocTy) {
					hideBusy();
					_self.showMessage(hrbpreportsContext.oBundle.getText("Please_fill_all"));
					break;
				}
				//Please_fill_optional1
				if (!vAppre && !vApprei && !vApprs && !apprsi) {
					hideBusy();
					_self.showMessage(hrbpreportsContext.oBundle.getText("Please_fill_optional1"));
					break;
				}
				hrbpreportsContext.hrbpreports_oDataModel.read("/EmployeeSet?$filter=VYear eq '" + vYear + "' and VDocTy eq '" + vDocTy + "' and VAppre eq '" + vAppre + "' and VApprei eq '" + vApprei + "' and VApprs eq '" + vApprs + "' and Apprsi eq '" + apprsi + "' and VEmp eq '" + vEmp + "' and VMgr eq '" + vMgr + "'", null, null, true,     
						function(data,oResponse){
					hideBusy();
					var oJSONModel = new sap.ui.model.json.JSONModel();
					oJSONModel.setData(data);
					var reportTable = new sap.ui.table.Table(
							{
								rows : "{/results}",
								selectionMode : sap.ui.table.SelectionMode.Single,
								selectionBehavior : sap.ui.table.SelectionBehavior.Row,
								navigationMode : sap.ui.table.NavigationMode.Paginator,
								enableSelectAll : false,
								editable : false,
								visibleRowCount : 12,
								rowSelectionChange : [
														function(oEvent) {
															var control = oEvent.getSource();
															if (data.results[control.getSelectedIndex()]) {
																myPathContext.documentId = data.results[control.getSelectedIndex()].AppraisalId;
																hrbpreportsContext.doc_count = parseInt(getDocCount(data.results[control.getSelectedIndex()].AppraisalId, false));
																control.getToolbar().getContent()[2].getContent()[0].setText(hrbpreportsContext.doc_count);
																control.getToolbar().getContent()[2].destroy();
																control.getToolbar().addContent(_self.attachmentLayout(_self));
															}
														}, this ],
								toolbar : new sap.m.Toolbar(
										{
											content : [ new sap.m.Button(
													{
														icon : "sap-icon://undo", // sap.ui.core.URI
														type : "Emphasized",
														press : [
																function(oEvent) {
																	var control = oEvent.getSource();
																	if (hrbpForm.getContent()[0]) {
																		hrbpForm.getContent()[0].setVisible(true);
																		hrbpForm.getContent()[1] ? hrbpForm.getContent()[1].destroy() : "";
																		myPathContext.documentId = "";
																		hrbpreportsContext.doc_count = 0;
																	}
																}, this ]
													}), pdfIcon, _self.attachmentLayout(_self) ], // sap.ui.core.Control
										}),
								columns : [ new sap.ui.table.Column(
										{
											width : "11rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Employee Name"
													}),
											template : new sap.m.Text(
													{
														text : "{Ename}"
													})
										}),
										new sap.ui.table.Column(
										{
											width : "5rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "PERNR"
													}),
											template : new sap.m.Text(
													{
														text : "{Epernr}"
													})
										}),
										new sap.ui.table.Column(
										{
											width : "5rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Global Id"
													}),
											template : new sap.m.Text(
													{
														text : "{EglobalId}"
													})
										}),
										new sap.ui.table.Column(
										{
											width : "11rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Job Name"
													}),
											template : new sap.m.Text(
													{
														text : "{JobName}"
													})
										}),
										new sap.ui.table.Column(
										{
											width : "11rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Reviewer Name"
													}),
											template : new sap.m.Text(
													{
														text : "{Rname}"
													})
										}),
										new sap.ui.table.Column(
										{
											width : "5rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Reviewer PERNR"
													}),
											template : new sap.m.Text(
													{
														text : "{Rpernr}"
													})
										}),
										new sap.ui.table.Column(
										{
											width : "5rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Reviewer Global Id"
													}),
											template : new sap.m.Text(
													{
														text : "{RglobalId}"
													})
										}),
										new sap.ui.table.Column(
										{
											width : "11rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Document Name"
													}),
											template : new sap.m.Text(
													{
														text : "{DocName}"
													})
										}),
										new sap.ui.table.Column(
										{
											width : "5rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "No of Attachments"
													}),
											template : new sap.m.Text(
													{
														text : "{NoAttach}"
													})
										}),
										new sap.ui.table.Column(
										{
											width : "11rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Appraisal ID"
													}),
											template : new sap.m.Text(
													{
														text : "{AppraisalId}"
													})
										})]
									}) .setModel(oJSONModel);
							if (hrbpForm.getContent()[0]) {
								hrbpForm.getContent()[0].setVisible(false);
								hrbpForm.getContent()[1] ? hrbpForm.getContent()[1].destroy() : "";
							}
							hrbpForm.addContent(reportTable);
				},
				function(oError){
					hideBusy();
					_self.showMessage("Error: "+oError.message);
				});
				break;
			case 3:
				var perfYear = formContent[3].getValue();
				var empId = formContent[8].getValue();
				var name = formContent[5].getValue();
				if (!perfYear) {
					hideBusy();
					_self.showMessage(hrbpreportsContext.oBundle.getText("Please_fill_all"));
					break;
				}
				//Please_fill_optional
				if (!empId && !name) {
					hideBusy();
					_self.showMessage(hrbpreportsContext.oBundle.getText("Please_fill_optional"));
					break;
				}
				hrbpreportsContext.hrbpreports_oDataModel.read("/DocumentListSet?$filter=VInglbid eq '" + empId + "' and VYear eq '" + perfYear + "' and VAppre eq '" + name + "'", null, null, true,
						function(data,oResponse){
						hideBusy();
						var oJSONModel = new sap.ui.model.json.JSONModel();
						oJSONModel.setData(data);
						var reportTable = new sap.ui.table.Table(
								{
									rows : "{/results}",
									selectionMode : sap.ui.table.SelectionMode.Single,
									selectionBehavior : sap.ui.table.SelectionBehavior.Row,
									navigationMode : sap.ui.table.NavigationMode.Paginator,
									enableSelectAll : false,
									editable : false,
									visibleRowCount : 12,
									rowSelectionChange : [
															function(oEvent) {
																var control = oEvent.getSource();
																myPathContext.documentId = data.results[control.getSelectedIndex()].ArcDocId;
															}, this ],
									toolbar : new sap.m.Toolbar(
											{
												content : [ new sap.m.Button(
														{
															icon : "sap-icon://undo", // sap.ui.core.URI
															type : "Emphasized",
															press : [
																	function(oEvent) {
																		var control = oEvent.getSource();
																		if (hrbpForm.getContent()[0]) {
																			hrbpForm.getContent()[0].setVisible(true);
																			hrbpForm.getContent()[1] ? hrbpForm.getContent()[1].destroy() : "";
																			myPathContext.documentId = "";
																			hrbpreportsContext.doc_count = 0;
																		}
																	}, this ]
														}) ], // sap.ui.core.Control
											}),
									columns : [ new sap.ui.table.Column(
											{
												width : "11rem", // sap.ui.core.CSSSize
												label : new sap.m.Label(
														{
															text : "Employee Name"
														}),
												template : new sap.m.Text(
														{
															text : "{Fname}"
														})
											}),
											new sap.ui.table.Column(
											{
												width : "5rem", // sap.ui.core.CSSSize
												label : new sap.m.Label(
														{
															text : "Global Id"
														}),
												template : new sap.m.Text(
														{
															text : "{EglbId}"
														})
											}),
											new sap.ui.table.Column(
											{
												width : "11rem", // sap.ui.core.CSSSize
												label : new sap.m.Label(
														{
															text : "Job Name"
														}),
												template : new sap.m.Text(
														{
															text : "{EjobName}"
														})
											}),
											new sap.ui.table.Column(
											{
												width : "11rem", // sap.ui.core.CSSSize
												label : new sap.m.Label(
														{
															text : "Document Name"
														}),
												template : new sap.m.Link(
														{
															text : "{DocName}",
															target : "_blank", 
															href : {
																parts: [
														                {path: "ArcDocId", type: new sap.ui.model.type.String()},
														                {path: "ArchivId", type: new sap.ui.model.type.String()},
														                {path: "DocClass", type: new sap.ui.model.type.String()},
														                {path: "DocName", type: new sap.ui.model.type.String()}
														               ],
																formatter : function(oVal1, oVal2, oVal3, oVal4) {
																	var val2 = oVal2 ? oVal2 : "";
																	var val1 = oVal1 ? oVal1 : "";
																	var val3 = oVal3 ? oVal3 : "";
																	var val4 = oVal4 ? oVal4 : "";
																	return hrbpreportsContext.sServiceUrl1 + "/DocDetailsSet(ArcDocId='" + val1 + "',ArchivId='" + val2 + "',Reserve='" + val3 + "',Filename='" + val4 + "')/$value";
																}
															}
														})
											}),
											new sap.ui.table.Column(
											{
												width : "5rem", // sap.ui.core.CSSSize
												label : new sap.m.Label(
														{
															text : "Doc Class"
														}),
												template : new sap.m.Text(
														{
															text : "{DocClass}"
														})
											}),
											new sap.ui.table.Column(
											{
												width : "11rem", // sap.ui.core.CSSSize
												label : new sap.m.Label(
														{
															text : "Appraisal ID"
														}),
												template : new sap.m.Text(
														{
															text : "{ArcDocId}"
														})
											})]
								}) .setModel(oJSONModel);
						if (hrbpForm.getContent()[0]) {
							hrbpForm.getContent()[0].setVisible(false);
							hrbpForm.getContent()[1] ? hrbpForm.getContent()[1].destroy() : "";
						}
						hrbpForm.addContent(reportTable);
				},
				function(oError){
					hideBusy();
					_self.showMessage("Error: "+oError.message);
				});
				break;
			case 4:
				var serviceURL = hrbpreportsContext.sServiceUrl;
				var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
				var dataToSave = {};
				dataToSave.VYear    	= formContent[13].getValue();
				dataToSave.PAprty   	= formContent[3].getSelectedKey();//formContent[].getValue();3
				dataToSave.SAprnam  	= formContent[4].getValue();
				dataToSave.PApety   	= formContent[7].getSelectedKey();//formContent[].getValue();7
				dataToSave.SApenam  	= formContent[8].getValue();
				dataToSave.Werks    	= formContent[15].getValue();
				dataToSave.VStat1   	= formContent[19].getValue();
				dataToSave.SHilfm  		= formContent[21].getValue();
				_self.createModel(oModel, "/CaliberationreportSet", dataToSave, dataToSave.VYear);
				break;
			case 5:
				var reportName = formContent[1].getSelectedKey();
				var beginDate = structureyyyymmdd(formContent[5].getValue());
				var endDate = structureyyyymmdd(formContent[7].getValue());
				hrbpreportsContext.hrbpreports_oDataModel.read("/GeneratedReportsSet?$filter=ReportName eq '" + reportName + "' and BeginDate eq datetime'" + beginDate + "' and EndDate eq datetime'" + endDate + "'", null, null, true,     
						function(data,oResponse){
					hideBusy();
					var oJSONModel = new sap.ui.model.json.JSONModel();
					oJSONModel.setData(data);
					var reportTable = new sap.ui.table.Table(
							{
								rows : "{/results}",
								selectionMode : sap.ui.table.SelectionMode.Single,
								selectionBehavior : sap.ui.table.SelectionBehavior.Row,
								navigationMode : sap.ui.table.NavigationMode.Paginator,
								enableSelectAll : false,
								editable : false,
								visibleRowCount : 12,
								toolbar : new sap.m.Toolbar(
										{
											content : [ new sap.m.Button(
													{
														icon : "sap-icon://undo", // sap.ui.core.URI
														type : "Emphasized",
														press : [
																function(oEvent) {
																	var control = oEvent.getSource();
																	if (hrbpForm.getContent()[0]) {
																		hrbpForm.getContent()[0].setVisible(true);
																		hrbpForm.getContent()[1] ? hrbpForm.getContent()[1].destroy() : "";
																		myPathContext.documentId = "";
																		hrbpreportsContext.doc_count = 0;
																	}
																}, this ]
													}) ], // sap.ui.core.Control
										}),
								columns : [ new sap.ui.table.Column(
										{
											width : "20rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "File Name"
													}),
											template : new sap.m.Link(
													{
														text : "{FileName}",
														target : "_blank",
														href : {
															parts: [
													                {path: "DirectoryName", type: new sap.ui.model.type.String()},
													                {path: "FileName", type: new sap.ui.model.type.String()}
													               ],
															formatter : function(oVal1, oVal2) {
																var val2 = oVal2 ? oVal2 : "";
																var val1 = oVal1 ? oVal1 : "";
																var newchar = '%2F';
																val1 = val1 ? val1.split('/').join(newchar) : "";
																return hrbpreportsContext.sServiceUrl + "/DownloadReportSet(DirectoryName='" + val1 + "',FileName='" + val2 + "')/$value";
															}
														}
													})
										}),
										new sap.ui.table.Column(
										{
											width : "11rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Created On"
													}),
											template : new sap.m.Text(
													{
														text : {
																path : "CreatedOn",
																formatter : function(sDate) {
																	if (sDate !== null && sDate !== "" && Date.parse(sDate)) {
																		var date = new Date(sDate),
																		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
																		day = ("0" + date.getDate()).slice(-2);
																		return [day, mnth, date.getFullYear()].join(".");
																	}
																	else {
																		return sDate;
																	}
																}
														}
													})
										}),
										new sap.ui.table.Column(
										{
											width : "11rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Created At (UTC)"
													}),
											template : new sap.m.Text(
													{
														text : "{CreatedAt}"
													})
										}),
										new sap.ui.table.Column(
										{
											width : "11rem", // sap.ui.core.CSSSize
											label : new sap.m.Label(
													{
														text : "Created By"
													}),
											template : new sap.m.Text(
													{
														text : "{CreatedBy}"
													})
										})]
							}) .setModel(oJSONModel);
					if (hrbpForm.getContent()[0]) {
						hrbpForm.getContent()[0].setVisible(false);
						hrbpForm.getContent()[1] ? hrbpForm.getContent()[1].destroy() : "";
					}
					hrbpForm.addContent(reportTable);
			},
				function(oError){
					hideBusy();
					_self.showMessage("Error: "+oError.message);
				});
				break;
			default:
				break;
			}
		}, 0); 
	},
	
	createModel : function(oModel, requestURL, data, checkFlag) {
		var _self = this;
		if(checkFlag){
			oModel.create(requestURL, data, null, 
					function(oData,oResponse) {
				_self.showPopup(oResponse);
				hideBusy();
			}, function(oError) {
				hideBusy();
				_self.showMessage("Error: "+oError.message);
			});
		}
		else{
			hideBusy();
			_self.showMessage(hrbpreportsContext.oBundle.getText("Please_fill_all"));
		}
	},
	
	showMessage: function(message) {
		jQuery.sap.require("sap.m.MessageToast");
		sap.m.MessageToast.show(message, {
            duration: 3000,                  
            width: "40%",                   
            my: "center center",             
            at: "center center",             
            onClose: function(){
            },                   
            animationDuration: 500,        
        });
	},
	
	showPopup: function(oResponse) {
		var _self = this;
		jQuery.sap.require("sap.m.MessageToast");
		if (oResponse) {
			if (oResponse.headers.success) {
				myPathContext.isEdited = false;
				var success_msg = decodeURI(oResponse.headers.success);
				if (success_msg.length > 100) {
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.show(
							success_msg, {
								icon: sap.m.MessageBox.Icon.SUCCESS
							}
					);
					//sap.ui.commons.MessageBox.show(success_msg);
				} else {
					sap.m.MessageToast.show(success_msg, {
						width: "40%",                   
						my: "center center",             
						at: "center center",             
						onClose: function(){
						},                   
						animationDuration: 500,        
					});
				}
			} else {
				var error_msg = decodeURI(oResponse.headers.error);
				sap.m.MessageToast.show(error_msg, {
	                //duration: 3000,                  
	                width: "40%",                   
	                my: "center center",             
	                at: "center center",             
	                onClose: function(){
	                },                   
	                animationDuration: 500,        
	            });
			}
		} 
	},
	
	hrbp_Emp_search : function(employee_search_input) {
		var form = employee_search_input.getParent().getParent().getParent().getParent();
		switch (hrbpreportsContext.selectedMenuItemCount) {
		case 2:
			if (employee_search_input.getName() === hrbpreportsContext.oBundle.getText("Reviewer_Name")) {
				inputField = form.getContent()[10];
			} else {
				inputField = form.getContent()[15];
			}
			break;
		case 3:
			if (employee_search_input.getName() === hrbpreportsContext.oBundle.getText("Employee_Name")) {
				inputField = form.getContent()[8];
			} 
			break;
		}
		if(employee_search_input && employee_search_input.getValue().toString().trim()!="" && employee_search_input.getValue().toString().trim()!="*")
		{
			showBusy();
			var hrbp_search_overlay = null;

			//Creating Overlay when clicked on search icon		
			if(sap.ui.getCore().byId("hrbp_search_overlay_id"))
			{
				hrbp_search_overlay = sap.ui.getCore().byId("hrbp_search_overlay_id");
			}
			else
			{	
				hrbp_search_overlay = new sap.ui.ux3.OverlayDialog("hrbp_search_overlay_id",{
					modal : true,
					autoClose : true,
					closeButtonVisible : true,
					close:function(event)
					{
						var control = event.getSource();
						control.destroy();

					}
				}).addStyleClass("search_feedback_style");
			}
			// code to close overlay when clicked outside content area
			hrbp_search_overlay.addEventDelegate({
				onAfterRendering : function() {
					$("#hrbp_search_overlay_id").click(function(e) {
						if ($(e.target).hasClass("sapUiUx3ODOverlay")) {
							hrbp_search_overlay.close();
							hrbp_search_overlay.destroyContent();
							hrbp_search_overlay.destroy();
						}
					});
				}
			});

			var hrbp_search_table = null;
			if(sap.ui.getCore().byId("hrbp_search_table_id"))
			{
				hrbp_search_table = sap.ui.getCore().byId("hrbp_search_table_id");
			}
			else
			{
				hrbp_search_table = new sap.ui.table.Table("hrbp_search_table_id",{
					width: "90%",
					selectionMode : sap.ui.table.SelectionMode.Single,
					selectionBehavior : sap.ui.table.SelectionBehavior.RowOnly,
					navigationMode : sap.ui.table.NavigationMode.Paginator,
					visibleRowCount: 8,		
					title : hrbpreportsContext.oBundle.getText("EMPLOYEE_DETAILS"),
					allowColumnReordering : false

				}).addStyleClass("feedback_table_style");
			}
			hrbp_search_table.addColumn(new sap.ui.table.Column({
				label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("APPRAISER_NAME"),
					textAlign : sap.ui.core.TextAlign.Center}),
					template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Ename"),
					resizable: false,
					width: "25%",
					hAlign: "Center"
			}));

			hrbp_search_table.addColumn(new sap.ui.table.Column({
				label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("APPRAISER_ID"),
					textAlign : sap.ui.core.TextAlign.Center}),
					template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Pernr"),
					resizable: false,
					width: "15%",
					hAlign: "Center"
			}));

			hrbp_search_table.addColumn(new sap.ui.table.Column({
				label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("GLOBAL_ID"),
					textAlign : sap.ui.core.TextAlign.Center}),
					template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Icnum"),
					resizable: false,
					width: "15%",
					hAlign: "Center"
			}));

			hrbp_search_table.addColumn(new sap.ui.table.Column({
				label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("WORK_LOCATION"),
					textAlign : sap.ui.core.TextAlign.Center}),
					template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Wldesc"),
					resizable: false,
					width: "30%",
					hAlign: "Center"
			}));

			hrbp_search_table.addColumn(new sap.ui.table.Column({
				label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("SBU"),
					textAlign : sap.ui.core.TextAlign.Center}),
					template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "ZsbuT"),
					resizable: false,
					width: "30%",
					hAlign: "Center"
			}));

			hrbp_search_overlay.addContent(hrbp_search_table);

			//hrbp_search_overlay.open();

			// Calling search help service to get data of employees
			var odatamodel = hrbpreportsContext.hrbpreports_oDataModel;	
			var name = employee_search_input.getValue();	
			showBusy();
			var readRequestURL ="GetEmployeeDetSet?$filter=Fullname eq '"+name+"'&$format=json";		
			odatamodel.read(readRequestURL, null, null, true,
					function(oData, oResponse) {

				var obj = JSON.parse(oResponse.body);			 
				hideBusy();
				search_help_results = obj.d.results;//oData.results;
				//search_help_results = oData.results;
				if(search_help_results.length > 1)
				{
					var hrbp_search_table_model = new sap.ui.model.json.JSONModel();

					hrbp_search_table_model.setData({
						modelData : search_help_results
					});
					hrbp_search_table.setModel(hrbp_search_table_model);
					hrbp_search_table.bindRows("/modelData");


					setTimeout(function(){$("#hrbp_search_table_id tr").on("click",function(){              

						var index = ($(this).index()+((sap.ui.getCore().byId("hrbp_search_table_id")._oPaginator.getCurrentPage() - 1)*8));
						if(index < search_help_results.length)
						{                      			                        
							inputField.setValue(search_help_results[index].Icnum);//Pernr);	
							employee_search_input.setValue(search_help_results[index].Ename);
							sap.ui.getCore().byId("hrbp_search_overlay_id").close();
							sap.ui.getCore().byId("hrbp_search_overlay_id").destroyContent();
							sap.ui.getCore().byId("hrbp_search_overlay_id").destroy();
						}
					});
					},500);

					hrbp_search_overlay.open();
				}
				else if(search_help_results.length == 1)
				{
					sap.ui.getCore().byId("hrbp_search_overlay_id").close();
					sap.ui.getCore().byId("hrbp_search_overlay_id").destroyContent();
					sap.ui.getCore().byId("hrbp_search_overlay_id").destroy();
					inputField.setValue(search_help_results[0].Icnum);	
					employee_search_input.setValue(search_help_results[0].Ename);
				}
				else if (search_help_results.length == 0)
				{
					sap.ui.getCore().byId("hrbp_search_overlay_id").close();
					sap.ui.getCore().byId("hrbp_search_overlay_id").destroyContent();
					sap.ui.getCore().byId("hrbp_search_overlay_id").destroy();
					//sap.ui.commons.MessageBox.alert("Please enter valid input");
					sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("NO_DATA_MSG"));
				}
			}, function(oError) {

				hideBusy();
				sap.ui.getCore().byId("hrbp_search_overlay_id").close();
				sap.ui.getCore().byId("hrbp_search_overlay_id").destroyContent();
				sap.ui.getCore().byId("hrbp_search_overlay_id").destroy();
				sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("NO_DATA_MSG"));
			});

		}
		else if(employee_search_input && employee_search_input.getValue().toString().trim()=="")
		{
			hideBusy();
			//sap.ui.commons.MessageBox.alert("Please enter valid input");
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMP_SEARCH_BLANK_MSG"));
		}
		else if (employee_search_input && employee_search_input.getValue().toString().trim()=="*")
		{
			hideBusy();
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMP_SEARCH_CHAR_MSG"));
		}
	},
	
	attachmentLayout : function(_self) {
		var attachmentIcon = new sap.m.Image({
			src : myPathContext.url_app + "zmypath/com/capgemini/mypath/images/attachment.png", // sap.ui.core.URI
			width : "30px", 
			height : "30px",
			press : function()
			{
				hrbpreportsContext.isCalledFromHRBP = true;
				if (myPathContext.documentId) {
					openUploadDownload();					
				} else {
					_self.showMessage(hrbpreportsContext.oBundle.getText("Please_Select"));	
				}
			}
		});//.addStyleClass("attachmentImagePR");

		hrbpreportsContext.attachmentIcon = attachmentIcon;

		var attachment_count = new sap.m.Text({
			text : hrbpreportsContext.doc_count,
			visible:hrbpreportsContext.doc_count > 0 ? true : false
		}).addStyleClass("header_link_number_blueHRBP");
		attachment_count.attachBrowserEvent("click", function() {
			hrbpreportsContext.isCalledFromHRBP = true ;
			if (myPathContext.documentId) {
				openUploadDownload();					
			} else {
				_self.showMessage(hrbpreportsContext.oBundle.getText("Please_Select"));	
			}
		});
		hrbpreportsContext.attachment_count = attachment_count;			
		
		var vlayout_attachment = new sap.ui.commons.layout.VerticalLayout({
			content:[attachment_count,attachmentIcon]
		}).addStyleClass("attachmentImageHrbp");
		return vlayout_attachment;
	}
});

function structureyyyymmdd(sDate) {
	// yyyy-mm-ddT00:00  2015-01-01T00:00 
	if (sDate && sDate.indexOf(".") >= 0) {
		var sDates = sDate.split("."); // 31.12.2015
		var mm = sDates[0];
		if (mm.length === 1) {
			mm = "0" + mm;
		}
		var dd = sDates[1];
		var yyyy = sDates[2];
		var sDateString = yyyy + "-" + dd + "-" + mm + "T00:00";
		return sDateString;
	} else {
		return sDate;
	}
}