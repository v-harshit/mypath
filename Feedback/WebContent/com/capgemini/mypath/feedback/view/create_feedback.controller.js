sap.ui.controller("com.capgemini.mypath.feedback.view.create_feedback", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.capgemini.mypath.feedback.view.create_feedback
*/
//	onInit: function() { 
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.capgemini.mypath.feedback.view.create_feedback
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.capgemini.mypath.feedback.view.create_feedback
*/
	onAfterRendering: function() {
		
		feedbackContext.feedback_provider_input.attachBrowserEvent("keypress",function(e){
			var keycode = e.keyCode || e.which;
			if(keycode ==13){
				feedback_ns.feedback_search();
				
			}
		});
		
		//feedbackContext.feedback_provider_label.setTooltip(myPathContext.createCallout(myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO").toString()));
		feedbackContext.title_input.focus();
		
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.capgemini.mypath.feedback.view.create_feedback
*/
//	onExit: function() {
//
//	}
	
	cancel_feedback : function()
	{
		feedbackContext.myGF = false;
		//myPathContext.isEdited = false;
		myPathContext.back();
	},
	other_selected : function()
	{
		feedbackContext.feedback_provider_label.setText(myPathContext.i18nModel.getProperty("EMPLOYEE"));
		feedbackContext.next_btn.setVisible(true);
		feedbackContext.create_btn.setVisible(false);
		feedbackContext.vlayout_attachment.setVisible(false);
		feedbackContext.attachment_count.setVisible(false);
		feedbackContext.myGF = false ;
		myPathContext.isEdited = true;
		
	},
	employee_selected : function()
	{
		feedbackContext.feedback_provider_label.setText(myPathContext.i18nModel.getProperty("FEEDBACK_PROVIDER"));
		feedbackContext.next_btn.setVisible(false);
		feedbackContext.create_btn.setVisible(true);
		feedbackContext.vlayout_attachment.setVisible(true);
		feedbackContext.myGF = true ;
		myPathContext.isEdited = true;
		feedbackContext.FileArray = [];
	},
	call_others_feedback:function()	{
		
		if(feedbackContext.title_input.getValue()!="" && feedbackContext.feedback_from_date.getValue()!="" && feedbackContext.feedback_to_date.getValue()!="" && feedbackContext.feedback_provider_input.getValue()!="")
		{
			//Call create feedback first
			feedbackContext.isCalledFromNext = true;
			feedback_ns.createFeedback();
			
			 if(!feedbackContext.isCalledFromNext)
			{
				 feedbackContext.create_feedback_matrix.setVisible(false);
				 feedbackContext.vlayout_attachment.setVisible(true);
				feedbackContext.feedback_provider_matrix.setVisible(true);
				feedbackContext.others_feedback_matrix.setVisible(true);	
				  
				
				 feedbackContext.next_btn.setVisible(false);
				 feedbackContext.create_btn.setVisible(false);
				 feedbackContext.cancel_btn.setVisible(false);
				feedbackContext.save_btn.setVisible(true);
				feedbackContext.complete_btn.setVisible(true);  
				
				feedbackContext.vlayout2.setVisible(true);						
				feedbackContext.relationship_input.focus();	
			}	 
		}
		 
		else
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
		
		
	},
	
	//function to perform create feedback
	createFeedback:function()
	{
		showBusy();
		setTimeout(function(){
			feedback_ns.createFeedback();
		}, 0);
	},

	saveFeedback:function()
	{
		showBusy();
		setTimeout(function(){
				feedback_ns.saveFeedback();
		}, 0);
	},
	provideFeedback:function()
	{
		showBusy();
		setTimeout(function(){
		if(feedbackContext.relationship_input.getValue().toString().trim()!="" && feedbackContext.feedback_input.getValue().toString().trim()!="")
		{
			//Calling provide feedback service
			var odatamodel = feedbackContext.feedback_oDataModel;
			odatamodel.setHeaders({
				"X-Requested-With" : "XMLHttpRequest",
				"Content-Type" : "application/atom+xml",
				"DataServiceVersion" : "2.0"
			});
			//showBusy();
			
			var provide_feedback_request = "ProvideFeedbackSet";
			
			var provide_feedback_data = {
				Appraisalid:myPathContext.documentId,
				Relation:feedbackContext.relationship_input.getValue(),
				Feedback:feedbackContext.feedback_input.getValue()
				};
			//setTimeout(function(){
			//Call service to create feedback
			odatamodel.create(provide_feedback_request, provide_feedback_data, null, 
			
			//success function for create feedback service call		
			function(oData,oResponse) {
				hideBusy();
				if(oResponse.headers.status.toUpperCase() == "S")
				{
					var success_msg = decodeURI(oResponse.headers.message);
		              sap.m.MessageToast.show(success_msg, {
		                  duration: 3000,                  
		                  width: "40%",                   
		                  my: "center center",             
		                  at: "center center",             
		                  onClose: function(){
		                	  myPathContext.isEdited = false;
		                	  myPathContext.back();
		                  },                   
		                  animationDuration: 500,        
		              });

					
					
				}
				else
				{
					var error_msg = decodeURI(oResponse.headers.message);
					sap.ui.commons.MessageBox.alert(error_msg);
				}
			},
			
			//error function for create feedback service call
			function (oError) {
				hideBusy();
			
					
			});	
	//		}, 0);
		}
		else
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
		
		hideBusy();
		}, 0);
	},
});

feedback_ns.convertDate = function(date)
{
	var month= date.getMonth()+1;
	month = month < 10 ? '0' + month : '' + month;
	return date.getFullYear()+"-"+month+"-"+date.getDate()+"T00:00:00";
};

feedback_ns.createFeedback = function()
{
	/*if(feedbackContext.feedback_provider == myPathContext.employeeId)
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("FEEDBACK_PROVIDER_SELECT_MSG"));*/
	//else
	//{
		if(feedbackContext.title_input.getValue().toString().trim()!="" && feedbackContext.feedback_from_date.getValue().toString().trim()!="" && feedbackContext.feedback_to_date.getValue().toString().trim()!="" && feedbackContext.feedback_provider_input.getValue().toString().trim()!="")
		{
		  if((feedbackContext.feedback_from_date.getDateValue() <= new Date() && feedbackContext.feedback_to_date.getDateValue() <= new Date())
			&&	(feedbackContext.feedback_from_date.getDateValue() <= feedbackContext.feedback_to_date.getDateValue())  )
		  {
				  if(feedbackContext.feedback_provider == myPathContext.employeeId)
				  {
					sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("FEEDBACK_PROVIDER_SELECT_MSG"));
				  }
					else
					{	 
						var odatamodel = feedbackContext.feedback_oDataModel;
						odatamodel.setHeaders({
							"X-Requested-With" : "XMLHttpRequest",
							"Content-Type" : "application/atom+xml",
							"DataServiceVersion" : "2.0"
						});
						//showBusy();
					
						var create_feedback_request = "CreateFeedbackSet";
					
						var create_feedback_data = {
								Feedbacktitle : feedbackContext.title_input.getValue(),
								Feedbackprovider : feedbackContext.isCalledFromNext == false ? feedbackContext.feedback_provider : myPathContext.employeeId,
								Employeeid : feedbackContext.isCalledFromNext == false ? myPathContext.employeeId : feedbackContext.feedback_provider,
								Validfrom : feedback_ns.convertDate(new Date(feedbackContext.feedback_from_date.getDateValue())),
								Validto : feedback_ns.convertDate(new Date(feedbackContext.feedback_to_date.getDateValue())),
					
							};
				
						//Call service to create feedback
						odatamodel.create(create_feedback_request, create_feedback_data, null, 
						
						//success function for create feedback service call		
						function(oData,oResponse) {
							hideBusy();
							if(oResponse.headers.status.toUpperCase() == "S")
							{
								
								myPathContext.documentId = oData.Appraisalid;			
								
								//calling doc count method
								feedbackContext.doc_count = getDocCount(myPathContext.documentId,false);
								
								if(feedbackContext.isCalledFromNext)
								{
									feedbackContext.isCalledFromNext = false;
									feedbackContext.feedback_docname.setText(feedbackContext.title_input.getValue());
									 feedbackContext.employee_name.setText(feedbackContext.feedback_provider_input.getValue());					
				 					 feedbackContext.feedback_provider_name.setText(myPathContext.employeeName);
				 					 feedbackContext.from_date.setText(feedbackContext.feedback_from_date.getValue());
				 					 feedbackContext.to_date.setText(feedbackContext.feedback_to_date.getValue());		 					
				 					feedbackContext.one_text.removeStyleClass("header_link_number_blue");
				 					feedbackContext.one_text.addStyleClass("header_link_number");
				 					feedbackContext.general_feedback_link.removeStyleClass("header_link_selected");	 					
				 					feedbackContext.general_feedback_link.addStyleClass("header_link_deselected");
				 					feedbackContext.vlayout1.addStyleClass("top_panel_content_deselcted");
				 					
				 					//feedbackContext.vlayout_pdf.setVisible(true);
									 /*sap.m.MessageToast.show(oResponse.headers.message, {
						                  duration: 3000,                  
						                  width: "40%",                   
						                  my: "center center",             
						                  at: "center center",             
						                  onClose: function(){
						 				
						                  },                   
						                  animationDuration: 500,        
						              });*/
				
								}
								else
								{
									myPathContext.filedocid =  oData.Appraisalid;
									feedbackContext.myGF = false ;
									getXCRFGF();
									var success_msg = decodeURI(oResponse.headers.message);
							          sap.m.MessageToast.show(success_msg, {
						                  duration: 3000,                  
						                  width: "40%",                   
						                  my: "center center",             
						                  at: "center center",             
						                  onClose: function(){
						                	  myPathContext.isEdited = false;
						                	  myPathContext.back();
						                  },                   
						                  animationDuration: 500,        
						              });
								}
								
								 myPathContext.isEdited = false;
								
							}
							else
							{
								var error_msg = decodeURI(oResponse.headers.message);
								sap.ui.commons.MessageBox.alert(error_msg);
							}
						},
						
						//error function for create feedback service call
						function (oError) {
							hideBusy();
								
						});	
					
				  }
		}
		  
		  else
		  {
			  if(!(feedbackContext.feedback_from_date.getDateValue() <= feedbackContext.feedback_to_date.getDateValue()))
				  //sap.ui.commons.MessageBox.alert("Please check the dates , from date should be less than to date");
				  sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("VALID_DATE_MSG"));
			  
			  else if(!(feedbackContext.feedback_from_date.getDateValue() <= new Date() && feedbackContext.feedback_to_date.getDateValue() <= new Date()))
			  sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("GF_VAL_PER"));
			  
			  
			   
		  }
		}
		 
		else
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
	//}
	
	hideBusy();
};
feedback_ns.saveFeedback = function()
{
	if(feedbackContext.relationship_input.getValue().toString().trim()!="" && feedbackContext.feedback_input.getValue().toString().trim()!="")
	{
		var odatamodel = feedbackContext.feedback_oDataModel;
		odatamodel.setHeaders({
			"X-Requested-With" : "XMLHttpRequest",
			"Content-Type" : "application/atom+xml",
			"DataServiceVersion" : "2.0"
		});
		//showBusy();
		var save_feedback_request = "SaveFeedbackSet";
		
		var save_feedback_data = {		
				Appraisalid:myPathContext.documentId,
				Relation:feedbackContext.relationship_input.getValue(),
				Feedback:feedbackContext.feedback_input.getValue()
			};
//		setTimeout(function(){
		//Call service to create feedback
		odatamodel.create(save_feedback_request, save_feedback_data, null, 
		
		//success function for create feedback service call		
		function(oData,oResponse) {
			hideBusy();
			if(oResponse.headers.status.toUpperCase() == "S")
			{
				var success_msg = decodeURI(oResponse.headers.message);
				sap.m.MessageToast.show(success_msg, {
	                  duration: 3000,                  
	                  width: "40%",                   
	                  my: "center center",             
	                  at: "center center",             
	                  onClose: function(){
	                	  myPathContext.isEdited = false;
	                  },                   
	                  animationDuration: 500,        
	              });
				
			}
			else
			{
				var error_msg = decodeURI(oResponse.headers.message);
				sap.ui.commons.MessageBox.alert(error_msg);
			}
		},
		
		//error function for create feedback service call
		function (oError) {
			hideBusy();
		});	
	//	}, 0);
	}
	else
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
	
	hideBusy();
	};
	
feedback_ns.feedback_search = function()
{
	if(feedbackContext.feedback_provider_input.getValue().toString().trim()!="" && feedbackContext.feedback_provider_input.getValue().toString().trim()!="*")
	{
		showBusy();
		var feedback_search_overlay = null;
		
		//Creating Overlay when clicked on search icon		
		if(sap.ui.getCore().byId("feedback_search_overlay_id"))
		{
			feedback_search_overlay = sap.ui.getCore().byId("feedback_search_overlay_id");
		}
		else
		{	
			feedback_search_overlay = new sap.ui.ux3.OverlayDialog("feedback_search_overlay_id",{
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
		feedback_search_overlay.addEventDelegate({
			onAfterRendering : function() {
				$("#feedback_search_overlay_id").click(function(e) {
					if ($(e.target).hasClass("sapUiUx3ODOverlay")) {
						feedback_search_overlay.close();
						feedback_search_overlay.destroyContent();
						feedback_search_overlay.destroy();
					}
				});
			}
		});
		
		var feedback_search_table = null;
		if(sap.ui.getCore().byId("feedback_search_table_id"))
		{
			feedback_search_table = sap.ui.getCore().byId("feedback_search_table_id");
		}
		else
		{
			 feedback_search_table = new sap.ui.table.Table("feedback_search_table_id",{
				width: "90%",
				selectionMode : sap.ui.table.SelectionMode.Single,
				selectionBehavior : sap.ui.table.SelectionBehavior.RowOnly,
				navigationMode : sap.ui.table.NavigationMode.Paginator,
				visibleRowCount: 8,		
				title : "EMPLOYEE DETAILS",
				allowColumnReordering : false
				
			}).addStyleClass("feedback_table_style");
		}
		feedback_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("APPRAISER_NAME"),
			textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Ename"),
			resizable: false,
			width: "25%",
			hAlign: "Center"
		}));
		
		feedback_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("APPRAISER_ID"),
			textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Pernr"),
			resizable: false,
			width: "15%",
			hAlign: "Center"
		}));
		
		feedback_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("GLOBAL_ID"),
				textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Icnum"),
			resizable: false,
			width: "15%",
			hAlign: "Center"
		}));
		
		feedback_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("WORK_LOCATION"),
				textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Wldesc"),
			resizable: false,
			width: "30%",
			hAlign: "Center"
		}));
		
		feedback_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("SBU"),
				textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "ZsbuT"),
			resizable: false,
			width: "30%",
			hAlign: "Center"
		}));
	
		feedback_search_overlay.addContent(feedback_search_table);
		
		//feedback_search_overlay.open();
		
		// Calling search help service to get data of employees
		var odatamodel = feedbackContext.feedback_oDataModel;	
		var name = feedbackContext.feedback_provider_input.getValue();	
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
				var feedback_search_table_model = new sap.ui.model.json.JSONModel();
				
				feedback_search_table_model.setData({
					modelData : search_help_results
				});
				feedback_search_table.setModel(feedback_search_table_model);
				feedback_search_table.bindRows("/modelData");
				
	
				setTimeout(function(){$("#feedback_search_table_id tr").on("dblclick",function(){              
				                        
				                        var index = ($(this).index()+((sap.ui.getCore().byId("feedback_search_table_id")._oPaginator.getCurrentPage() - 1)*8));
				                        if(index < search_help_results.length)
				                        {                      			                        
				                        	feedbackContext.feedback_provider = search_help_results[index].Pernr;	
				                        	feedbackContext.feedback_provider_input.setValue(search_help_results[index].Ename);
				                        	sap.ui.getCore().byId("feedback_search_overlay_id").close();
				                        	sap.ui.getCore().byId("feedback_search_overlay_id").destroyContent();
				                        	sap.ui.getCore().byId("feedback_search_overlay_id").destroy();
				                        }
				                  });
				},500);
				
				feedback_search_overlay.open();
			}
			else if(search_help_results.length == 1)
			{
				sap.ui.getCore().byId("feedback_search_overlay_id").close();
            	sap.ui.getCore().byId("feedback_search_overlay_id").destroyContent();
            	sap.ui.getCore().byId("feedback_search_overlay_id").destroy();
            	feedbackContext.feedback_provider = search_help_results[0].Pernr;	
            	feedbackContext.feedback_provider_input.setValue(search_help_results[0].Ename);
			}
			else if (search_help_results.length == 0)
			{
				sap.ui.getCore().byId("feedback_search_overlay_id").close();
            	sap.ui.getCore().byId("feedback_search_overlay_id").destroyContent();
            	sap.ui.getCore().byId("feedback_search_overlay_id").destroy();
				//sap.ui.commons.MessageBox.alert("Please enter valid input");
            	sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("NO_DATA_MSG"));
			}
		}, function(oError) {
		
			hideBusy();
			sap.ui.getCore().byId("feedback_search_overlay_id").close();
        	sap.ui.getCore().byId("feedback_search_overlay_id").destroyContent();
        	sap.ui.getCore().byId("feedback_search_overlay_id").destroy();
        	sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("NO_DATA_MSG"));
		});

	}
	else if(feedbackContext.feedback_provider_input.getValue().toString().trim()=="")
	{
		hideBusy();
		//sap.ui.commons.MessageBox.alert("Please enter valid input");
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMP_SEARCH_BLANK_MSG"));
	}
	else if (feedbackContext.feedback_provider_input.getValue().toString().trim()=="*")
	{
		hideBusy();
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMP_SEARCH_CHAR_MSG"));
	}
	
};
