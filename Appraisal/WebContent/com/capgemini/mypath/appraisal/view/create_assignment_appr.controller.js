sap.ui.controller("com.capgemini.mypath.appraisal.view.create_assignment_appr", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.capgemini.mypath.appraisal.view.create_assignment_appr
*/
	onInit: function() {		
		
		var matrix =  appraisalContext.appraisal_obj_matrix;
		 var  assign_obj_model = new sap.ui.model.json.JSONModel();		 
		 assign_obj_model.setData({modelData: appraisalContext.assignment_objectives_data});				
		 matrix.setModel(assign_obj_model);
	 
		 if(appraisalContext.assignment_objectives_data.length > 6)
		 {
			 appraisalContext.add_appr_obj_btn_2.setVisible(false);
			 appraisalContext.add_appr_obj_btn.setVisible(false);
		 }
		
		 var oRowTemplate = new sap.ui.commons.layout.MatrixLayoutRow({
				cells: [
					new sap.ui.commons.layout.MatrixLayoutCell({
						content: [    new sap.m.Text({
						        	  text: '{i18n>TITLE}',
						        	  width: appraisalContext.appraisal_data.objectives_comments_editable == true ? '10%' : '9%',
						        	  textDirection: sap.ui.core.TextDirection.LTR
						          }).addStyleClass("title_text").addStyleClass("assignment_obj_title").addStyleClass("segmented_btn_style1"),	
						          
						          new sap.m.TextArea({
						                value: "{title}",
						                width: "70%",
						                maxLength :80,
						                rows:1,
						                editable : appraisalContext.appraisal_data.objectives_comments_editable,
						                change : function()
						                {
						              	  appraisalContext.isObjEditedFlag = true;
						              	  myPathContext.isEdited = true;
						                }
						            }).addStyleClass("segmented_btn_style1"),					              
					              
						            new sap.ui.commons.layout.VerticalLayout({
						            	 width:  '19%',
										content:[
									              new sap.m.Text({
									            	  text: myPathContext.columnText.OBJ0,
									            	  width:  '100%',
									            	  textDirection: sap.ui.core.TextDirection.LTR
									              }).addStyleClass("title_text").addStyleClass("assignment_obj_desc").addStyleClass("segmented_btn_style1"),
									              
									             new sap.m.Link(
												    		{
												    			
												    			text :'{i18n>EXPAND_TEXT_FIELD}',
												    			 width: "100%",
												    			visible:appraisalContext.appraisal_data.objectives_comments_editable,
												    			press:function(evt)
												    	    	{
												    				 appraisalContext.isCalledAAObj = true;
												    				 appraisal_ns.openReadOnlyTextObj(evt);
												    				
												    	    	}
												    			}).addStyleClass("segmented_btn_style1").addStyleClass("expand_obj_style")
									             ]
						            }).addStyleClass("segmented_btn_style1"),
					              new sap.m.TextArea({
					                  value: "{description}",
					                  width: "70%",					                 
					                  rows:4,
					                  visible:appraisalContext.appraisal_data.objectives_comments_editable,
					                  editable : appraisalContext.appraisal_data.objectives_comments_editable,
					                  change : function()
					                  {
					                	  appraisalContext.isObjEditedFlag = true;
					                	  myPathContext.isEdited = true;
					                  }
					              }).addStyleClass("segmented_btn_style1").addStyleClass("signoff_readonly_style"),
					              
					              new com.capgemini.mypath.util.MyPathText(
					  	            	{
					  		            	showLimit : 500,
					  		            	width: "70%",
					  		            	showTextArea : true,
					  		            	visible:!appraisalContext.appraisal_data.objectives_comments_editable,
					  						text : "{description}"
					  						})/*.addStyleClass("showMoreTextAA")*/.addStyleClass("showMoreObjAA"),
					              new sap.ui.commons.Button({
					                  text: myPathContext.i18nModel.getProperty("REMOVE"),
					                  width: "150px",
					                  icon: appraisal_ns.url_app+"com/capgemini/mypath/appraisal/images/trash_icon.png",
					                  lite: true,
					                  visible:appraisalContext.appraisal_data.objectives_comments_editable,
					                  press: function(evt){
					                	  appraisal_ns.remove_assignment_obj(evt);
					                  }
					              }).addStyleClass("remove_btn"),
					              new sap.ui.commons.HorizontalDivider({
					                  width: "100%",
					                  type: "Page",
					                  height: "Small"
					              }).addStyleClass("assign_objectives_divider"),
						          
					         ]
					}).addStyleClass("per_objectives_matrix_cell")
				]
			}).addStyleClass("per_objectives_matrix_row");
		 
			matrix.bindAggregation("rows", "/modelData", oRowTemplate);
			
			appraisalContext.appr_obj_row_template = oRowTemplate;
			
			 this.getView().setModel(appraisalContext.contextModel,"abc");
			 appraisalContext.currentView = this.getView();	
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.capgemini.mypath.appraisal.view.create_assignment_appr
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.capgemini.mypath.appraisal.view.create_assignment_appr
*/
	onAfterRendering: function() {
		
		var rating_btn_arr = appraisalContext.rating_btns.getButtons();		
		var rating = parseInt(appraisalContext.Rating,"10");
		
		if(rating <= 5 && rating!=0)
			appraisalContext.rating_btns.setSelectedButton(rating_btn_arr[rating-1]);
		
		else if (rating == 6)
			appraisalContext.rating_btns.setSelectedButton(rating_btn_arr[5]);
		
		else
		{
			appraisalContext.rating_btns.setSelectedButton(rating_btn_arr[6]);
			appraisalContext.appraisal_rating =="";
		}
		
		/*JSON model for header matrix*/
		  
		if(!appraisalContext.isAppraisalCreated)
		{
			 contextModelData= {};
			 contextModelData.validfrom = appraisalContext.appr_from_date.getValue();
			 contextModelData.validto = appraisalContext.appr_to_date.getValue();
			 contextModelData.docTitle = myPathContext.docTitle;
			 contextModelData.appraiseeName = myPathContext.appraiseeName;
			 contextModelData.appraiserName = myPathContext.appraiserName;			 
			 appraisalContext.contextModel.setData(contextModelData);
			
		}
		
		appraisalContext.assignment_manager_input.attachBrowserEvent("keypress",function(e){
			var keycode = e.keyCode || e.which;
			if(keycode ==13){
				appraisal_ns.appraisal_search();
				
			}
		});
		
		appraisalContext.title_input.focus();
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.capgemini.mypath.appraisal.view.create_assignment_appr
*/
//	onExit: function() {
//
//	}
	next_assignment_features:function()
	{		
		if(appraisalContext.client_name_input.getValue().toString().trim()!="")
		{
			 if(appraisalContext.isfeatureEditedFlag == true || appraisalContext.client_name_input.getValue().toString().trim()=="")
				{
				
				 appraisalContext.isFeaturesCalledFromNext = true;
				 appraisal_ns.save_assignment_features();
				 appraisalContext.objectives_assignment_tab.setEnabled(true);
				 appraisalContext.appraisal_tabstrip.setSelectedKey("assign_objectives_tab");
					//sap.ui.commons.MessageBox.alert("Please first save the features.");
				}
		
			else
			{
			appraisalContext.objectives_assignment_tab.setEnabled(true);
			appraisalContext.appraisal_tabstrip.setSelectedKey("assign_objectives_tab");
			}
		}
		else
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
		
	},
	
	perform_cancel : function()
	{
		
		myPathContext.back();
	},
	
	add_assignment_obj: function(){
		appraisalContext.assignment_objectives_data=[];
		var matrix = appraisalContext.appraisal_obj_matrix;	
		var assign_obj_model = matrix.getModel();
		var modeldata = assign_obj_model.getData().modelData;
		
		//Maximum 18 objectives can be added
	//	if(modeldata.length < 7){
			
			modeldata.push({
				title:"",
				description:""
			});
			
			assign_obj_model.setData({modelData:modeldata});
			matrix.setModel(assign_obj_model);
			
			
		
			matrix.bindAggregation("rows", "/modelData", appraisalContext.appr_obj_row_template);
			
			if(modeldata.length > 6)
			{
				appraisalContext.add_appr_obj_btn_2.setVisible(false);
				appraisalContext.add_appr_obj_btn.setVisible(false);
			} 
	//	}
		//else{
			//sap.ui.commons.MessageBox.alert("Maximum 7 assignment objectives can be added.");
		//	appraisalContext.add_appr_obj_btn_2.setVisible(false);
		//	appraisalContext.add_appr_obj_btn.setVisible(false);
		//}
			jQuery('html, body').animate({scrollTop:jQuery(document).height()}, 1000);
	},
	
	//function to perform create appraisal
	createAppraisal:function()
	{
		
		/*if(!(appraisalContext.appraisal_from_date.getDateValue() <= appraisalContext.appraisal_to_date.getDateValue()))				 
			   sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("VALID_DATE_MSG"));
		
		else if(appraisalContext.appraisal_provider == myPathContext.employeeId)			
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("APPRAISER_SELECT_MSG"));*/
		
		
	//	else
		//{
		if( appraisalContext.title_input.getValue().toString().trim()!="" && appraisalContext.appraisal_from_date.getValue().toString().trim()!="" && appraisalContext.appraisal_to_date.getValue().toString().trim()!="" && appraisalContext.assignment_manager_input.getValue().toString().trim()!="" && (appraisalContext.appraisal_provider!="" && appraisalContext.appraisal_provider!=undefined))
		{
				showBusy();
				
				if(appraisalContext.appraisal_from_date.getDateValue() <= appraisalContext.appraisal_to_date.getDateValue())				 
				{	  
						if(appraisalContext.appraisal_provider == myPathContext.employeeId)	
						{
							sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("APPRAISER_SELECT_MSG"));
						}
						else
						{
							var odatamodel = appraisalContext.appraisal_oDataModel;
							odatamodel.setHeaders({
								"X-Requested-With" : "XMLHttpRequest",
								"Content-Type" : "application/atom+xml",
								"DataServiceVersion" : "2.0"
							});
							
							
							var create_appraisal_request = "CreateAppraisalSet";
							
							var create_appraisal_data = {
									Title : appraisalContext.title_input.getValue(),
									Manager : appraisalContext.appraisal_provider,
									Employeeid :  myPathContext.employeeId,
									Validfrom : appraisal_ns.convertDate(new Date(appraisalContext.appraisal_from_date.getDateValue())),//'2015-01-01T06:15:07'
									Validto : appraisal_ns.convertDate(new Date(appraisalContext.appraisal_to_date.getDateValue())),
									Flag : 'create_appraisal',
								};
							
							
							//Call service to create appraisal
							odatamodel.create(create_appraisal_request, create_appraisal_data, null, 
							
							//success function for create appraisal service call		
							function(oData,oResponse) {
						
								if(oResponse.headers.status.toUpperCase() == "S")
								{
									hideBusy();
									myPathContext.documentId = oData.Appraisalid;
									appraisalContext.doc_count = getDocCount(myPathContext.documentId,false);
									 
									 
			//						sap.m.MessageToast.show(oResponse.headers.message, {
			//			                  duration: 3000,                  
			//			                  width: "40%",                   
			//			                  my: "center center",             
			//			                  at: "center center",             
			//			                  onClose: function(){
						                	 
						  					appraisalContext.create_assignment_tab.setVisible(false);
						  					appraisalContext.features_assignment_tab.setVisible(true);
						  					appraisalContext.objectives_assignment_tab.setVisible(true);
						  					appraisalContext.objectives_assignment_tab.setEnabled(false);
						  					appraisalContext.appraisal_tabstrip.setSelectedKey("assign_features_tab");
						  					appraisalContext.vlayout_attachment.setVisible(true);	
						  				  	appraisalContext.pdfIcon.setVisible(true);
						  					appraisalContext.appraisal_provider = ""; 					
						  				
						  					var createAppraisalModelData = {};
						  					createAppraisalModelData.docTitle = appraisalContext.title_input.getValue();
						  					createAppraisalModelData.validfrom = appraisalContext.appraisal_from_date.getValue();
						  					createAppraisalModelData.validto = appraisalContext.appraisal_to_date.getValue();
						  					createAppraisalModelData.appraiseeName = myPathContext.employeeName;
						  					createAppraisalModelData.appraiserName = appraisalContext.assignment_manager_input.getValue();
						  					appraisalContext.isAppraisalCreated = true;
						  					 myPathContext.isEdited = false; 
						  					 appraisalContext.contextModel.setData(createAppraisalModelData);
						  					 myPathContext.subStatus = "P";
						  					 appraisal_ns.getWorkFlow();
						  					appraisalContext.currentView.getContent()[appraisalContext.currentView.getContent().length - 2].destroy();
						  					appraisalContext.currentView.getContent()[appraisalContext.currentView.getContent().length - 1].destroy();
						  					appraisalContext.currentView.addContent(appraisalContext.appr_workFlow1);
						  					appraisalContext.currentView.addContent(appraisalContext.appr_workFlow2);
						                 // },                   
						               //   animationDuration: 500,        
						             // });
				
								}
								else
								{
									hideBusy();
									var error_msg = decodeURI(oResponse.headers.message);
									sap.ui.commons.MessageBox.alert(error_msg);
								}
							},
							
							//error function for create appraisal service call
							function (oError) {
								hideBusy();
								
									
							});	
					}
				
				}
				else
				{
				  sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("VALID_DATE_MSG"));
				}	
		}
			 
		else
		{
			sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
			hideBusy();
		}

		//}
		hideBusy();
	},
	
	submit_emp_assessment : function()
	{
		
	},
	
});

appraisal_ns.save_emp_assessment = function()
{
	var odatamodel = appraisalContext.appraisal_oDataModel;
	odatamodel.setHeaders({
		"X-Requested-With" : "XMLHttpRequest",
		"Content-Type" : "application/atom+xml",
		"DataServiceVersion" : "2.0"
	});
	//showBusy();
	
	var emp_assessment_request = "AssignmentAppraisalSet";
	
	var emp_assessment_data = {
		
			Appraisalid:myPathContext.documentId,
			Employeecomments : appraisalContext.overall_assessment_emp_input.getValue(),
			Flag : 'empcomments',
		};
	
	//setTimeout(function(){
	//Call service to create feedback
	odatamodel.create(emp_assessment_request,emp_assessment_data, null, 
	
	//success function for create feedback service call		
	function(oData,oResponse) {

		hideBusy();
		if(oResponse.headers.status.toUpperCase() == "S")
		{
		  if(!appraisalContext.isEmployeeAssessmentSubmitDirectlyClicked)
		  {
			 var success_msg = decodeURI(oResponse.headers.message);
			 sap.m.MessageToast.show(success_msg, {
                 duration: 3000,                  
                 width: "40%",                   
                 my: "center center",             
                 at: "center center",             
                 onClose: function(){
                	 
                 },                   
                 animationDuration: 500,        
             });
		  }

     	 myPathContext.isEdited = false;
      	 appraisalContext.isEmpAssessmentSaved = true;
      	 appraisalContext.isEmpAssessmentEditedFlag = false;
      	 appraisalContext.isEmployeeAssessmentSubmitDirectlyClicked = false;
      
	
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
//}, 0);
};

appraisal_ns.submit_emp_assessment = function()
{

	/*if(!appraisalContext.isEmpAssessmentSaved)
	{
		sap.ui.commons.MessageBox.alert("Please first save the objectives.");
	}
	
	else
	{*/
	
		var odatamodel = appraisalContext.appraisal_oDataModel;
		odatamodel.setHeaders({
			"X-Requested-With" : "XMLHttpRequest",
			"Content-Type" : "application/atom+xml",
			"DataServiceVersion" : "2.0"
		});
		//showBusy();
		
		var send_to_reviewer_request = "CreateAppraisalSet";
		
		var send_to_reviewer_data = {
				
				Appraisalid:myPathContext.documentId,
				Flag : 'send_to_reviewer',
			};
		
		//setTimeout(function(){
		//Call service to create appraisal
		odatamodel.create(send_to_reviewer_request,send_to_reviewer_data, null, 
		
		//success function for create appraisal service call		
		function(oData,oResponse) {

			hideBusy();
			if(oResponse.headers.status.toUpperCase() == "S")
			{
				 myPathContext.isEdited = false;
				var success_msg = decodeURI(oResponse.headers.message);				
				 sap.m.MessageToast.show(success_msg, {
	                  duration: 3000,                  
	                  width: "40%",                   
	                  my: "center center",             
	                  at: "center center",             
	                  onClose: function(){
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
		
		//error function for create appraisal service call
		function (oError) {
			hideBusy();
				
		});	
//}, 0);
	//}
	

};


appraisal_ns.save_manager_assessment = function()
{

	if(appraisalContext.manager_objectives_cmnts_input.getValue().toString().trim()!="")
	{
		var odatamodel = appraisalContext.appraisal_oDataModel;
		odatamodel.setHeaders({
			"X-Requested-With" : "XMLHttpRequest",
			"Content-Type" : "application/atom+xml",
			"DataServiceVersion" : "2.0"
		});
		
		//showBusy();
		var manager_assessment_request = "AssignmentAppraisalSet";
		
		var manager_assessment_data = {
			
				Appraisalid:myPathContext.documentId,
				Managercomments : appraisalContext.manager_objectives_cmnts_input.getValue(),
				Keystrengthsdemo:appraisalContext.competencies_key_strength_input.getValue(),
				Areasfordevelopment:appraisalContext.competencies_areas_dev_input.getValue(),
				Appraisalrating: appraisalContext.appraisal_rating !="N/A" ? appraisalContext.appraisal_rating : "6",
				Flag : 'commrating',
			};
		
		//setTimeout(function(){
		//Call service to create appraisal
		odatamodel.create(manager_assessment_request,manager_assessment_data, null, 
		
		//success function for create appraisal service call		
		function(oData,oResponse) {
			hideBusy();
			
			if(oResponse.headers.status.toUpperCase() == "S")
			{
				if(!appraisalContext.isManagerAssessmentSubmitDirectlyClicked)
				{
					var success_msg = decodeURI(oResponse.headers.message);
					 sap.m.MessageToast.show(success_msg, {
		                 duration: 3000,                  
		                 width: "40%",                   
		                 my: "center center",             
		                 at: "center center",             
		                 onClose: function(){
		                	 
		                 },                   
		                 animationDuration: 500,        
		             });
				}

           	 myPathContext.isEdited = false;
           	 appraisalContext.isManagerAssessmentSaved = true;
           	 appraisalContext.isManagerAssessmentEditedFlag = false;
           	 appraisalContext.isManagerAssessmentSubmitDirectlyClicked = true;
            
			
			}
			else
			{
				var error_msg = decodeURI(oResponse.headers.message);
				sap.ui.commons.MessageBox.alert(error_msg);
			}
		},
		
		//error function for create appraisal service call
		function (oError) {
			hideBusy();
				
		});	
	//}, 0);
	}
	else
	{
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
		appraisalContext.isManagerAssessmentSubmitDirectlyClicked = false;
	}
	hideBusy();
};


appraisal_ns.submit_manager_assessment = function()
{

/*	if(appraisalContext.isManagerAssessmentEditedFlag == true)
	{
		sap.ui.commons.MessageBox.alert("Please first save the objectives.");			
	}
	
	else
	{*/
		var odatamodel = appraisalContext.appraisal_oDataModel;
		odatamodel.setHeaders({
			"X-Requested-With" : "XMLHttpRequest",
			"Content-Type" : "application/atom+xml",
			"DataServiceVersion" : "2.0"
		});
		//showBusy();
		
		var send_to_reviewer_request = "CreateAppraisalSet";
		
		var send_to_reviewer_data = {
		
				Appraisalid:myPathContext.documentId,
				Flag : 'sign_off',
			};
		
	//	setTimeout(function(){
		//Call service to create appraisal
		odatamodel.create(send_to_reviewer_request,send_to_reviewer_data, null, 
		
		//success function for create appraisal service call		
		function(oData,oResponse) {
			hideBusy();
			
			if(oResponse.headers.status.toUpperCase() == "S")
			{
				 myPathContext.isEdited = false;
				var success_msg = decodeURI(oResponse.headers.message);
				 sap.m.MessageToast.show(success_msg, {
	                  duration: 3000,                  
	                  width: "40%",                   
	                  my: "center center",             
	                  at: "center center",             
	                  onClose: function(){
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
		
		//error function for create appraisal service call
		function (oError) {
			hideBusy();
				
		});	
//}, 0);
	//}	

};

appraisal_ns.save_assignment_features = function()
{
	if(appraisalContext.client_name_input.getValue().toString().trim()!="")
	{
		var odatamodel = appraisalContext.appraisal_oDataModel;
		odatamodel.setHeaders({
			"X-Requested-With" : "XMLHttpRequest",
			"Content-Type" : "application/atom+xml",
			"DataServiceVersion" : "2.0"
		});
		//showBusy();
		
		var save_features_request = "AssignmentFeatureSet";
		
		var save_features_data = {
				Appraisalid:myPathContext.documentId,
				Clientname:appraisalContext.client_name_input.getValue(),
				Projectcode:appraisalContext.project_code_input.getValue(),
				Otherfeatures:appraisalContext.significant_features_input.getValue(),
				Revenuemanaged: appraisalContext.revenue_managed_input.getValue(),
				Teamsizemanaged:appraisalContext.teamsize_managed_input.getValue()
			};
	//	setTimeout(function(){
		//Call service to create appraisal
		odatamodel.create(save_features_request, save_features_data, null, 
		
		//success function for create appraisal service call		
		function(oData,oResponse) {
			hideBusy();
			if(oResponse.headers.status.toUpperCase() == "S")
			{
			  if(!appraisalContext.isFeaturesCalledFromNext)
			  {
			  /*appraisalContext.isfeatureEditedFlag = false;
           	  appraisalContext.isFeaturesSaved = true;*/
				  var success_msg = decodeURI(oResponse.headers.message);
				 sap.m.MessageToast.show(success_msg, {
	                  duration: 3000,                  
	                  width: "40%",                   
	                  my: "center center",             
	                  at: "center center",             
	                  onClose: function(){
	                  },                   
	                  animationDuration: 500,        
	              });
			  }
			  appraisalContext.isfeatureEditedFlag = false;
			  appraisalContext.isFeaturesCalledFromNext = false;
           	  appraisalContext.isFeaturesSaved = true;
           	  myPathContext.isEdited = false;
         
			}
			else
			{
				var error_msg = decodeURI(oResponse.headers.message);
				sap.ui.commons.MessageBox.alert(error_msg);
			}
		},
		
		//error function for create appraisal service call
		function (oError) {
			hideBusy();				
		});	
	//}, 0);
	}
	 
	else
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
	
	hideBusy();
};
appraisal_ns.convertDate = function(date)
{
	var month= date.getMonth()+1;
	month = month < 10 ? '0' + month : '' + month;
	return date.getFullYear()+"-"+month+"-"+date.getDate()+"T00:00:00";
};

appraisal_ns.save_Objectives = function()
{

	var odatamodel = appraisalContext.appraisal_oDataModel;
	var requestURL = "/SaveObjectivesSet";
	
	odatamodel.setHeaders({
		"X-Requested-With" : "XMLHttpRequest",
		"Content-Type" : "application/atom+xml",
		"DataServiceVersion" : "2.0",
		"Accept" : "json"

	});

	//showBusy();
	
	var assignment_object = {};

	assignment_object.Appraisalid = myPathContext.documentId;
	var assignment_obj_data = appraisalContext.appraisal_obj_matrix.getModel().getData().modelData;
	
	var checkFlag = true;
	for(var i=0; i<assignment_obj_data.length; i++){

		if((assignment_obj_data[i].title.toString().trim() == "" && assignment_obj_data[i].description.toString().trim() == "" ) || assignment_obj_data[i].title.toString().trim() == myPathContext.appraisal_template["0003"].name){
			//checkFlag = false;
			//break;
		}
		else{
			assignment_object["Description"+(i+1)] = assignment_obj_data[i].title;
			assignment_object["Note"+(i+1)] = assignment_obj_data[i].description;
			
		}
	}
	//setTimeout(function(){
	//If for any objective title and details are blank then do not save
	//if(checkFlag){
		odatamodel.create(requestURL, assignment_object, null, 
				function(oData,oResponse) {			
					hideBusy();
					if(oResponse.headers.status.toUpperCase() == "E"){
						var error_msg = decodeURI(oResponse.headers.message);
						sap.ui.commons.MessageBox.alert(error_msg);
					}
					else if(oResponse.headers.status.toUpperCase() == "S"){
						if(appraisalContext.isSubmitObjDirectlyClicked == false && appraisalContext.isSignOffObjDirectlyClicked == false)
						{
							var success_msg = decodeURI(oResponse.headers.message);
							 sap.m.MessageToast.show(success_msg, {
				                  duration: 3000,                  
				                  width: "40%",                   
				                  my: "center center",             
				                  at: "center center",             
				                  onClose: function(){
				                	  
				                  },                   
				                  animationDuration: 500,        
				              });
					    }

	                	  appraisalContext.isObjSaved = true;
	                	  appraisalContext.isObjEditedFlag = false;
	                	  appraisalContext.isSubmitObjDirectlyClicked = false;
	                	  appraisalContext.isSignOffObjDirectlyClicked = false;
	                	  myPathContext.isEdited = false;
	                  
				
					}	
				}, function(oError) {
			    hideBusy();
			    var error_msg = decodeURI(oResponse.headers.message);
				sap.ui.commons.MessageBox.alert(error_msg);
			});
//}, 0);
	/*}
	else{
		sap.ui.commons.MessageBox.alert("Please fill in title and details for all objectives.");
		hideBusy();
	}*/
	

};

appraisal_ns.submit_signoff = function(flag)
{
	
	
		//check if objectives are edited or not
		/*if(appraisalContext.isObjEditedFlag==true || appraisalContext.isObjSaved == false)
		{
			sap.ui.commons.MessageBox.alert("Please first save the objectives.");
		}
		else
		{*/
			var odatamodel = appraisalContext.appraisal_oDataModel;
			odatamodel.setHeaders({
				"X-Requested-With" : "XMLHttpRequest",
				"Content-Type" : "application/atom+xml",
				"DataServiceVersion" : "2.0"
			});
			//showBusy();
			
			var send_to_reviewer_request = "CreateAppraisalSet";
			
			var send_to_reviewer_data = {
			
					Appraisalid:myPathContext.documentId,
					Flag : flag,
				};
			
			//setTimeout(function(){
			//Call service to create appraisal
			odatamodel.create(send_to_reviewer_request,send_to_reviewer_data, null, 
			
			//success function for create appraisal service call		
			function(oData,oResponse) {

				hideBusy();
				if(oResponse.headers.status.toUpperCase() == "S")
				{
					 myPathContext.isEdited = false;
					var success_msg = decodeURI(oResponse.headers.message);
					 sap.m.MessageToast.show(success_msg, {
		                  duration: 3000,                  
		                  width: "40%",                   
		                  my: "center center",             
		                  at: "center center",             
		                  onClose: function(){
		                	  appraisalContext.isObjSavedFlag = false;
		                	  appraisalContext.isObjEditedFlag = false;
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
			
			//error function for create appraisal service call
			function (oError) {
			
				hideBusy();
			});	
//}, 0);
		//}	
		
};

appraisal_ns.accept_appraisal = function(flag)
{
	var odatamodel = appraisalContext.appraisal_oDataModel;
	odatamodel.setHeaders({
		"X-Requested-With" : "XMLHttpRequest",
		"Content-Type" : "application/atom+xml",
		"DataServiceVersion" : "2.0"
	});
	//showBusy();
	
	var send_to_reviewer_request = "CreateAppraisalSet";
	
	var send_to_reviewer_data = {
	
			Appraisalid:myPathContext.documentId,
			Employeecomment:appraisalContext.emp_signoff_input.getValue(),
			Flag : flag,
		};
	
	//setTimeout(function(){
	//Call service to create appraisal
	odatamodel.create(send_to_reviewer_request,send_to_reviewer_data, null, 
	
	//success function for create appraisal service call		
	function(oData,oResponse) {
		hideBusy();
		
		if(oResponse.headers.status.toUpperCase() == "S")
		{
			 myPathContext.isEdited = false;
			var success_msg = decodeURI(oResponse.headers.message);
			 sap.m.MessageToast.show(success_msg, {
                  duration: 3000,                  
                  width: "40%",                   
                  my: "center center",             
                  at: "center center",             
                  onClose: function(){
                	  appraisalContext.isObjSavedFlag = false;
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
	
	//error function for create appraisal service call
	function (oError) {
		hideBusy();
			
	});	
//}, 0);
};




appraisal_ns.appraisal_search = function()
{
	if(appraisalContext.assignment_manager_input.getValue().toString().trim()!="" && appraisalContext.assignment_manager_input.getValue().toString().trim()!="*")
	{
//		showBusy();
		//Creating Overlay when clicked on search icon		
		var appraisal_search_overlay = null;
		if (sap.ui.getCore().byId("appraisal_search_overlay_id")) {
			appraisal_search_overlay = sap.ui.getCore().byId("appraisal_search_overlay_id");
		} else {
			 appraisal_search_overlay = new sap.ui.ux3.OverlayDialog("appraisal_search_overlay_id",{
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
		appraisal_search_overlay.addEventDelegate({
			onAfterRendering : function() {
				$("#appraisal_search_overlay_id").click(function(e) {
					if ($(e.target).hasClass("sapUiUx3ODOverlay")) {
						appraisal_search_overlay.close();
						appraisal_search_overlay.destroyContent();
						appraisal_search_overlay.destroy();
					}
				});
			}
		});
		
		var appraisal_search_table = null;
		if(sap.ui.getCore().byId("appraisal_search_table_id")){
			appraisal_search_table = sap.ui.getCore().byId("appraisal_search_table_id");
		}
		else
		{	
			appraisal_search_table = new sap.ui.table.Table("appraisal_search_table_id",{
				width: "90%",
				selectionMode : sap.ui.table.SelectionMode.Single,
				selectionBehavior : sap.ui.table.SelectionBehavior.RowOnly,
				navigationMode : sap.ui.table.NavigationMode.Paginator,
				visibleRowCount: 8,		
				title : "EMPLOYEE DETAILS",
				allowColumnReordering : false
				
			}).addStyleClass("feedback_table_style");
		}
		appraisal_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("APPRAISER_NAME"),
			textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Ename"),
			resizable: false,
			width: "25%",
			hAlign: "Center"
		}));
		
		appraisal_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("APPRAISER_ID"),
			textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Pernr"),
			resizable: false,
			width: "15%",
			hAlign: "Center"
		}));
		
		appraisal_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("GLOBAL_ID"),
				textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Icnum"),
			resizable: false,
			width: "15%",
			hAlign: "Center"
		}));
		
		appraisal_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("WORK_LOCATION"),
				textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "Wldesc"),
			resizable: false,
			width: "30%",
			hAlign: "Center"
		}));
		
		appraisal_search_table.addColumn(new sap.ui.table.Column({
			label: new sap.m.Label({text: myPathContext.i18nModel.getProperty("SBU"),
				textAlign : sap.ui.core.TextAlign.Center}),
			template: new sap.m.Text({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text", "ZsbuT"),
			resizable: false,
			width: "30%",
			hAlign: "Center"
		}));
	
		appraisal_search_overlay.addContent(appraisal_search_table);		
		//appraisal_search_overlay.open();
		
	
		// Calling search help service to get data of employees
		var odatamodel =  appraisalContext.feedback_oDataModel;	
		var name =  appraisalContext.assignment_manager_input.getValue();	
		showBusy();
		var readRequestURL ="GetEmployeeDetSet?$filter=Fullname eq '"+name+"'&$format=json";		
		odatamodel.read(readRequestURL, null, null, true,
		function(oData, oResponse) {
			 hideBusy();
		      var obj = JSON.parse(oResponse.body);		     
		      search_help_results = obj.d.results;//oData.results;
			 //search_help_results = oData.results;
			if(search_help_results.length > 1)
			{
				
				var appraisal_search_table_model = new sap.ui.model.json.JSONModel();
				
				appraisal_search_table_model.setData({
					modelData : search_help_results
				});
				appraisal_search_table.setModel(appraisal_search_table_model);
				appraisal_search_table.bindRows("/modelData");
				
	
				setTimeout(function(){$("#appraisal_search_table_id tr").on("dblclick",function(){              
				                        
				                        var index = ($(this).index()+((sap.ui.getCore().byId("appraisal_search_table_id")._oPaginator.getCurrentPage() - 1)*8));
				                        if(index < search_help_results.length)
				                        {                      			                        
				                        	appraisalContext.appraisal_provider = search_help_results[index].Pernr;	
				                        	appraisalContext.assignment_manager_input.setValue(search_help_results[index].Ename);
				                        	appraisalContext.assignment_manager_name.setText(search_help_results[index].Ename);
					                    	sap.ui.getCore().byId("appraisal_search_overlay_id").close();
					                    	sap.ui.getCore().byId("appraisal_search_overlay_id").destroyContent();
					                    	sap.ui.getCore().byId("appraisal_search_overlay_id").destroy();
				                        }
				                  });
				},500);
				
				appraisal_search_overlay.open();
			}
			else if(search_help_results.length == 1)
			{
				sap.ui.getCore().byId("appraisal_search_overlay_id").close();
            	sap.ui.getCore().byId("appraisal_search_overlay_id").destroyContent();
            	sap.ui.getCore().byId("appraisal_search_overlay_id").destroy();
				appraisalContext.appraisal_provider = search_help_results[0].Pernr;	
            	appraisalContext.assignment_manager_input.setValue(search_help_results[0].Ename);
            	appraisalContext.assignment_manager_name.setText(search_help_results[0].Ename);
			}
			else if (search_help_results.length == 0)
			{
				sap.ui.getCore().byId("appraisal_search_overlay_id").close();
            	sap.ui.getCore().byId("appraisal_search_overlay_id").destroyContent();
            	sap.ui.getCore().byId("appraisal_search_overlay_id").destroy();
				//sap.ui.commons.MessageBox.alert("Please enter valid input");
            	sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("NO_DATA_MSG"));
			}
			
		}, function(oError) {
			hideBusy();
			sap.ui.getCore().byId("appraisal_search_overlay_id").close();
        	sap.ui.getCore().byId("appraisal_search_overlay_id").destroyContent();
        	sap.ui.getCore().byId("appraisal_search_overlay_id").destroy();
        	sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("NO_DATA_MSG"));
		});

	}
	else if (appraisalContext.assignment_manager_input.getValue().toString().trim()=="")
	{
		hideBusy();
		//sap.ui.commons.MessageBox.alert("Please enter valid input");
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMP_SEARCH_BLANK_MSG"));
	}
	else if(appraisalContext.assignment_manager_input.getValue().toString().trim()=="*")
	{
		hideBusy();
		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("EMP_SEARCH_CHAR_MSG"));
	}
	
};
//function to remove assignment objective
appraisal_ns.remove_assignment_obj = function(evt){
	var object = evt.getSource().getParent().getParent();
	var matrix = appraisalContext.appraisal_obj_matrix;	
	var index = matrix.indexOfAggregation("rows",object);
		
	var assignment_obj_model = matrix.getModel();
	var modeldata = assignment_obj_model.getData().modelData;
	
	appraisalContext.add_appr_obj_btn_2.setVisible(true);
	appraisalContext.add_appr_obj_btn.setVisible(true);
	
	//Do not remove the item if there is only 1
	if(modeldata.length > 1){
		
		modeldata.splice(index,1);
		
		assignment_obj_model.setData({modelData:modeldata});
		matrix.setModel(assignment_obj_model);
	
		matrix.removeAggregation("rows",object);
		appraisalContext.isObjEditedFlag = true;
	}
	else{
		//sap.ui.commons.MessageBox.alert("At least 1 objective should be present.");
	}
	
};

appraisal_ns.openReadOnlyTextObj = function(evt)
{

	var object = evt.getSource().getParent().getParent().getParent();
	var matrix = appraisalContext.appraisal_obj_matrix;	
	var index = matrix.indexOfAggregation("rows",object);
		
	var assignment_obj_model = matrix.getModel();
	var modeldata = assignment_obj_model.getData().modelData;
	
	var obj_text_area_ref = null;
	obj_text_area_ref = matrix.getRows()[index].getCells()[0].getContent()[3];
	appraisalContext.obj_text_area_ref = obj_text_area_ref;
	
	var args = modeldata[index].description;
	
    if(args != undefined)
    var lines = args.split("\n"); 
    var count = lines.length;
    
    for(var i = 0  ; i < lines.length ; i++)    
    	if(lines[i].toString().length >= 100)    		
    	 count = count + parseInt((lines[i].toString().length)/100);   
    
    	 count = count < 4 ? 20 : 20;		
    	appraisalContext.overlay_text.setRows(count);
    	appraisalContext.overlay_text.setValue(args);
    	
    	appraisalContext.dlg.open();
};
