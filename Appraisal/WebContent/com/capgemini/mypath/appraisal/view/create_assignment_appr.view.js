sap.ui.jsview("com.capgemini.mypath.appraisal.view.create_assignment_appr", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.appraisal.view.create_assignment_appr
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.appraisal.view.create_assignment_appr";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.appraisal.view.create_assignment_appr
	*/ 
	createContent : function(oController) {	
		
		
		var create_appraisal_matrix = new sap.ui.commons.layout.MatrixLayout({
			columns : 5,
			width:"75%", 
			 enabled:true,
	          visible:true,
			widths : ['1%','26%','1%','50%','25%']}).addStyleClass("create_appraisal_style");
		
		 var title_label = new sap.m.Label({
				width:"100%",
				text :'{i18n>TITLE}',
				required:true,
				textDirection: sap.ui.core.TextDirection.LTR,
				textAlign : sap.ui.core.TextAlign.Right
			}).addStyleClass("title_text");
		    
		    var title_input = new sap.m.Input({
				width:"100%",
				maxLength:80,
				change:function()
				{
					myPathContext.isEdited = true;
				}
			});
		    
		    appraisalContext.title_input = title_input;
		    
		    var validity_period_label = new sap.m.Label({
					width:"100%",
					text :'{i18n>VALIDITY_PERIOD}',
					required : true,
					textDirection: sap.ui.core.TextDirection.LTR,
					textAlign : sap.ui.core.TextAlign.Right
			}).addStyleClass("title_text");
		    
			
			var validityPeriodCell = new sap.ui.commons.layout.MatrixLayoutCell({
				colSpan : 1 
			});
			
			var fromdate_oData = {				
						path_from_date : new Date(),
						intValue : new Date().getTime()
					    };
			
			var todate_oData = {				
					
					path_to_date : new Date(),
					
				    };
			
			
			var from_model = new sap.ui.model.json.JSONModel();		
			from_model.setData(fromdate_oData);
			
			var to_model = new sap.ui.model.json.JSONModel();		
			to_model.setData(todate_oData);
			
			var appraisal_from_date = new sap.m.DatePicker({
				width:"35%",
				value:
				{
					path:"/path_from_date",
					type : new sap.ui.model.type.Date()
					
				},
				change:function()
				{
					myPathContext.isEdited = true;
				}
			}).setModel(from_model).addStyleClass("from_date_style");
			
			appraisalContext.appraisal_from_date = appraisal_from_date;
			
			 var to_label = new sap.m.Label({
					text :'{i18n>TO}',
					required : true,
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("to_label_appraisal_style").addStyleClass("title_text");

		    
		    var appraisal_to_date = new sap.m.DatePicker({
				width:"35%",
				value:
				{
					path:"/path_to_date",
					type : new sap.ui.model.type.Date()
					
				},
				change:function()
				{
					myPathContext.isEdited = true;
				}
			}).setModel(to_model);
		    
		  
		    appraisalContext.appraisal_to_date = appraisal_to_date;
		    
		
		    
		    validityPeriodCell.addContent(appraisal_from_date);
		    validityPeriodCell.addContent(to_label);		
		    validityPeriodCell.addContent(appraisal_to_date);
		    
			 
	    	
		    var create_assignment_manager_label = new sap.ui.commons.Label({
				width:"100%",
				text :'{i18n>ASSIGNMENT_MANAGER}',
				required : true,
				//requiredAtBegin :true,
				textDirection: sap.ui.core.TextDirection.RTL,
				textAlign : sap.ui.core.TextAlign.Left
			}).addStyleClass("title_text").addStyleClass("assignment_manager_label_style").addStyleClass("underline_style");;
		    create_assignment_manager_label.setTooltip(myPathContext.createCallout(myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO1") + myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO2")));
		    
		    var assignment_manager_info_icon = new sap.m.Image({
		    	src:appraisal_ns.url_app+"com/capgemini/mypath/appraisal/images/info_icon.png",
		    	press:function()
		    	{
		    		
		    	}
		    });
		    assignment_manager_info_icon.setTooltip(myPathContext.createCallout(myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO1") + myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO2")));
		   
		   var hlayout1 = new sap.ui.commons.layout.HorizontalLayout({
				content:[assignment_manager_info_icon,create_assignment_manager_label]
			}).addStyleClass("add_obj_btn_style");
		   
		    
		    
		    var assignment_manager_input = new sap.m.Input({
				width:"100%",
				change:function()
				{
					myPathContext.isEdited = true;
				}
			});
		    
		    appraisalContext.assignment_manager_input = assignment_manager_input;
		    
		    var feedback_search_icon = new sap.m.Image({
		    	src:appraisal_ns.url_app+"com/capgemini/mypath/appraisal/images/search_icon.png",
		    	press:function()
		    	{
		    		//showBusy();
		    		appraisal_ns.appraisal_search();
		    	}
		    }).addStyleClass("search_icon_style");
		    
		    var cancel_next_cell = new sap.ui.commons.layout.MatrixLayoutCell({
				colSpan : 5 ,
				
			});
		    
		    var cancel_btn = new sap.m.Button({
		    width : "50%",
			text: '{i18n>CANCEL}',
			press: oController.perform_cancel,
			visible : appraisalContext.appraisal_data.footer_btn_visible,
		    }).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");	    
		
		    
		    var next_btn = new sap.m.Button({
			    width : "50%",
				text: '{i18n>NEXT}',
				visible : appraisalContext.appraisal_data.footer_btn_visible,
				press:oController.createAppraisal
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		    
		    cancel_next_cell.addContent(cancel_btn);
		    cancel_next_cell.addContent(next_btn);

		    
			create_appraisal_matrix.createRow("","","","","");
			create_appraisal_matrix.createRow("",title_label,"",title_input,"");
			create_appraisal_matrix.createRow("",validity_period_label,"",validityPeriodCell,"");
			create_appraisal_matrix.createRow("",hlayout1,"",assignment_manager_input,feedback_search_icon);
			create_appraisal_matrix.createRow("","","","","");
			create_appraisal_matrix.createRow(cancel_next_cell);		
			
			
			/*Declaring matrix for Appraisal details*/		 
			 var appraisal_provider_matrix = new sap.ui.commons.layout.MatrixLayout({
					columns : 5,
					width:"80%",
					enabled:true,
			        visible:true,
					widths : ['1%','6%','10%','7%','10%']}).addStyleClass("feedback_details_style").addStyleClass("appraisal_details_style");
				
				var assigment_appraisal_label = new sap.m.Label({
					width:"100%",
					text :myPathContext.appraisal_template["0001"].name,
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("label_style");
				
				 var assigment_appraisal_name = new sap.m.Text({
						width:"100%",
						text :"{abc>/docTitle}",
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("title_text");
				 appraisalContext.assigment_appraisal_name = assigment_appraisal_name;
				 
				 var employee_label = new sap.m.Label({
						width:"100%",
						text :'{i18n>EMPLOYEE}',
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("label_style");
					
			     var employee_name = new sap.m.Text({
							//width:"100%",
							text :"{abc>/appraiseeName}",
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("title_text").addStyleClass("underline_style").addStyleClass("segmented_btn_style1");
			     employee_name.setTooltip(myPathContext.createCallout(myPathContext.AddUserData));
			     appraisalContext.employee_name = employee_name; 
			    
			     
				 var assignment_manager_label = new sap.m.Label({
						width:"100%",
						text :'{i18n>ASSIGNMENT_MANAGER}',
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("label_style");
					
			     var assignment_manager_name = new sap.m.Text({
							width:"100%",
							text :"{abc>/appraiserName}",
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("title_text");
			     
			     appraisalContext.assignment_manager_name = assignment_manager_name;
					 
				var validity_period = new sap.m.Label({
							width:"100%",
							text :'{i18n>VALIDITY_PERIOD}',
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("label_style");
						
				var from_date = new sap.m.Text({
								width:"100%",
								text :"{abc>/validfrom}",
								textDirection: sap.ui.core.TextDirection.LTR
							}).addStyleClass("title_text");
						 
				appraisalContext.from_date = from_date;
				
				var to_label = new sap.m.Label({
								width:"100%",
								text :'{i18n>TO}',
								textDirection: sap.ui.core.TextDirection.LTR
							}).addStyleClass("label_style");
							
				var to_date = new sap.m.Text({
									width:"100%",
									text :"{abc>/validto}",
									textDirection: sap.ui.core.TextDirection.LTR
								}).addStyleClass("title_text");
				
				
				appraisalContext.to_date = to_date;		 
	
				    
					 appraisal_provider_matrix.createRow(null);
					 appraisal_provider_matrix.createRow("",assigment_appraisal_label,assigment_appraisal_name,"","");
					 appraisal_provider_matrix.createRow("",employee_label,employee_name,assignment_manager_label,assignment_manager_name);
					 appraisal_provider_matrix.createRow("",validity_period,from_date,to_label,to_date);
					 appraisal_provider_matrix.createRow("","","","","");
					 
		  /*Declaring matrix for appraisal features*/					 
			var appraisal_features_matrix = new sap.ui.commons.layout.MatrixLayout({
	   		columns : 6,
			width:"75%",
			 enabled:true,
	          visible:true,
			widths : ['3%','3%','28%','2%','70%','51%']}).addStyleClass("others_appraisal_style").addStyleClass("features_matrix_Style");	

 
			var client_name_label = new sap.m.Label({
				width:"100%",
				text :myPathContext.appraisal_template["0006"].name,
				required:true,
				textDirection: sap.ui.core.TextDirection.LTR,
				textAlign : sap.ui.core.TextAlign.Right
			}).addStyleClass("title_text").addStyleClass("features_text_style");
			
			 
			 var client_name_input = new sap.m.TextArea({
					width:"100%",
					rows:1,
					editable : appraisalContext.appraisal_data.features_comments_editable,
					value: appraisalContext.Clientname,
					change:function()
					{
						appraisalContext.isfeatureEditedFlag = true;
						myPathContext.isEdited = true;
					}
				});
			 appraisalContext.client_name_input = client_name_input;
			 
			  /*Logic for client name visibility*/
			 client_name_readOnly = new com.capgemini.mypath.util.MyPathText({
				   
	  		            	showLimit : 200,
	  		            	width: "100%",
	  		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
	  						text : appraisalContext.Clientname,
	  							
	  						})/*.addStyleClass("showMoreTextAA")*/;
			   
			 
			   var  client_name_com_control = null;
			   if(appraisalContext.appraisal_data.features_comments_editable)
			   {
				   client_name_com_control = client_name_input;
			   }
			   else
			   {
				   client_name_com_control = client_name_readOnly;
			   }
			  /*End of logic for client name visibility*/
			 
			 var project_code_label = new sap.m.Text({
					width:"100%",
					text :myPathContext.appraisal_template["0007"].name,
					textDirection: sap.ui.core.TextDirection.RTL,
				}).addStyleClass("title_text").addStyleClass("features_text_style").addStyleClass("underline_style");
			 project_code_label.setTooltip(myPathContext.createCallout(myPathContext.appraisal_template["0007"].infotext));
			 
			   var proj_code_info_icon = new sap.m.Image({
			    	src:appraisal_ns.url_app+"com/capgemini/mypath/appraisal/images/info_icon.png",
			    	tooltip:"Use N/A if not applicable"
			    }).addStyleClass("icon_style");//.addStyleClass("info_icon_style");
			   
			   proj_code_info_icon.setTooltip(myPathContext.createCallout(myPathContext.appraisal_template["0007"].infotext));
			  
			  /* var proj_label_cell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan:1}).addStyleClass("features_cell_style");
			  
			   proj_label_cell.addContent(proj_code_info_icon);
			   proj_label_cell.addContent(project_code_label);*/

			   var proj_code_layout = new sap.ui.commons.layout.HorizontalLayout({
					content:[proj_code_info_icon,project_code_label]
				}).addStyleClass("add_obj_btn_style");
			   
			 var project_code_input = new sap.m.TextArea({
					width:"100%",
					rows:1,
					editable : appraisalContext.appraisal_data.features_comments_editable,
					  value: appraisalContext.Projectcode,
					change:function()
					{
						appraisalContext.isfeatureEditedFlag = true;
						myPathContext.isEdited = true;
					}
				});
			 
			 appraisalContext.project_code_input = project_code_input;
			 
			 /*Logic for project code visibility*/
			 project_code_readOnly = new com.capgemini.mypath.util.MyPathText({
				   
	  		            	showLimit : 200,
	  		            	width: "100%",
	  		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
	  						text : appraisalContext.Projectcode,
	  							
	  						})/*.addStyleClass("showMoreTextAA")*/;
			   
			 
			   var  project_code_com_control = null;
			   if(appraisalContext.appraisal_data.features_comments_editable)
			   {
				   project_code_com_control = project_code_input;
			   }
			   else
			   {
				   project_code_com_control = project_code_readOnly;
			   }
			  /*End of logic for projects code visibility*/
			
			// var significant_cell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan:1}).addStyleClass("significant_cell_style");
			 var significant_features_label = new sap.m.Text({
					width:"100%",
					text :'{i18n>SIGNIFICANT_FEATURES}',
					textAlign : sap.ui.core.TextAlign.Left,
					textDirection: sap.ui.core.TextDirection.RTL
				}).addStyleClass("title_text").addStyleClass("features_text_style").addStyleClass("underline_style");
			 significant_features_label.setTooltip(myPathContext.createCallout(myPathContext.appraisal_template["0008"].infotext));
			 
			   var significant_features_info_icon = new sap.m.Image({
			    	src:appraisal_ns.url_app+"com/capgemini/mypath/appraisal/images/info_icon.png",
			    	tooltip:"Level of responsibility, complexity, stretch (High / Normal / Low), etc "
			    }).addStyleClass("icon_style")/*.addStyleClass("significant_icon_style")*/;
			   significant_features_info_icon.setTooltip(myPathContext.createCallout(myPathContext.appraisal_template["0008"].infotext));
			
			   var significant_layout = new sap.ui.commons.layout.HorizontalLayout({
					content:[significant_features_info_icon,significant_features_label]
				}).addStyleClass("add_obj_btn_style");
			   
			 //significant_cell.addContent(significant_features_info_icon);
				 
			 var significant_features_input = new sap.m.TextArea({
					width:"100%",
					rows:1,
					editable : appraisalContext.appraisal_data.features_comments_editable,
					  value: appraisalContext.Otherfeatures,
					change:function()
					{
						appraisalContext.isfeatureEditedFlag = true;
						myPathContext.isEdited = true;
					}
				});
			 appraisalContext.significant_features_input =significant_features_input;
			 
			 /*Logic for significant features visibility*/
			 significant_features_readOnly = new com.capgemini.mypath.util.MyPathText({
				   
	  		            	showLimit : 200,
	  		            	width: "100%",
	  		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
	  						text : appraisalContext.Otherfeatures,
	  							
	  						})/*.addStyleClass("showMoreTextAA")*/;
			   
			 
			   var  significant_features_com_control = null;
			   if(appraisalContext.appraisal_data.features_comments_editable)
			   {
				   significant_features_com_control = significant_features_input;
			   }
			   else
			   {
				   significant_features_com_control = significant_features_readOnly;
			   }
			  /*End of logic for significant features visibility*/
			 
			 var revenue_managed_label = new sap.m.Text({
					width:"100%",
					text :myPathContext.appraisal_template["0009"].name,
					textDirection: sap.ui.core.TextDirection.RTL
				}).addStyleClass("title_text").addStyleClass("features_text_style");
			 
			 var revenue_managed_input = new sap.m.TextArea({
					width:"100%",
					rows:1,
					editable : appraisalContext.appraisal_data.features_comments_editable,
					 value: appraisalContext.Revenuemanaged,
					change:function()
					{
						appraisalContext.isfeatureEditedFlag = true;
						myPathContext.isEdited = true;
					}
				});
			 
			 appraisalContext.revenue_managed_input = revenue_managed_input;
			 
			 /*Logic for revenue managed visibility*/
			 revenue_managed_readOnly = new com.capgemini.mypath.util.MyPathText({
				   
	  		            	showLimit : 200,
	  		            	width: "100%",
	  		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
	  						text : appraisalContext.Revenuemanaged,
	  							
	  						})/*.addStyleClass("showMoreTextAA")*/;
			   
			 
			   var  revenue_managed_com_control = null;
			   if(appraisalContext.appraisal_data.features_comments_editable)
			   {
				   revenue_managed_com_control = revenue_managed_input;
			   }
			   else
			   {
				   revenue_managed_com_control = revenue_managed_readOnly;
			   }
			  /*End of logic for revenue managed  visibility*/
			 
			 var teamsize_managed_label = new sap.m.Text({
					width:"100%",
					text :myPathContext.appraisal_template["0010"].name,					
					textDirection: sap.ui.core.TextDirection.RTL
				}).addStyleClass("title_text").addStyleClass("features_text_style");
			 
			 var teamsize_managed_input = new sap.m.TextArea({
					width:"100%",
					rows:1,
					editable : appraisalContext.appraisal_data.features_comments_editable,
					 value: appraisalContext.Teamsize,
					change:function()
					{
						appraisalContext.isfeatureEditedFlag = true;
						myPathContext.isEdited = true;
					}
				});
			 appraisalContext.teamsize_managed_input =teamsize_managed_input;
			 
			 /*Logic for teamsize managed visibility*/
			 teamsize_managed_readOnly = new com.capgemini.mypath.util.MyPathText({
				   
	  		            	showLimit : 200,
	  		            	width: "100%",
	  		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
	  						text : appraisalContext.Teamsize,
	  							
	  						})/*.addStyleClass("showMoreTextAA")*/;
			   
			 
			   var   teamsize_managed_com_control = null;
			   if(appraisalContext.appraisal_data.features_comments_editable)
			   {
				   teamsize_managed_com_control = teamsize_managed_input;
			   }
			   else
			   {
				   teamsize_managed_com_control = teamsize_managed_readOnly;
			   }
			  /*End of logic for teamsize managed  visibility*/
			 
			 var features_save_next_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 6 
				});
			    
			    var features_save_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZSAVE.toUpperCase(),
					press:function()
					{
						showBusy();
						setTimeout(function(){
								appraisal_ns.save_assignment_features();
						}, 0);
					},
					visible : appraisalContext.appraisal_data.footer_btn_visible,
				}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
			    
			    var features_next_btn = new sap.m.Button({
				    width : "50%",
					text: '{i18n>NEXT}',
					press:oController.next_assignment_features,
					visible : appraisalContext.appraisal_data.footer_btn_visible,
				}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
			    
			    appraisalContext.features_next_btn = features_next_btn;
			    
			    features_save_next_cell.addContent(features_save_btn);
			    features_save_next_cell.addContent(features_next_btn);
			    
			 appraisal_features_matrix.createRow("","",client_name_label,"",client_name_com_control,"");
			 appraisal_features_matrix.createRow("","",proj_code_layout,"",project_code_com_control,"");
			 appraisal_features_matrix.createRow("","",significant_layout,"",significant_features_com_control,"");
			 appraisal_features_matrix.createRow("","",revenue_managed_label,"",revenue_managed_com_control,"");
			 appraisal_features_matrix.createRow("","",teamsize_managed_label,"",teamsize_managed_com_control,"");
			 appraisal_features_matrix.createRow(features_save_next_cell);
			 
			 /*Declaring matrix for appraisal objectives*/				
			 var appraisal_obj_matrix = new sap.ui.commons.layout.MatrixLayout({                  
                 columns : 1,
             	width:"75%",    
             	 enabled:true,
   	          visible:true,
          }).addStyleClass("appraisal_obj_style");
          			 
			    var obj_save_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZSAVE.toUpperCase(),
					press: function () {
						showBusy();
						setTimeout(function(){
							appraisal_ns.save_Objectives();
						}, 0);
					},
					visible : appraisalContext.appraisal_data.appr_obj_save_submit_flag,
				}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
			    
			    var obj_submit_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZSUBMIT_REVIEW.toUpperCase(),
					press: function()
					{
						showBusy();
						setTimeout(function(){
							var flag = 'send_to_reviewer';						
							if(/*appraisalContext.isObjSaved == false &&*/ appraisalContext.isObjEditedFlag == true)
							{
								appraisalContext.isSubmitObjDirectlyClicked = true;
								appraisal_ns.save_Objectives();

								if(appraisalContext.isSubmitObjDirectlyClicked == false)
									appraisal_ns.submit_signoff(flag);
							}
							else
							{
								appraisalContext.isSubmitObjDirectlyClicked = false;
								appraisal_ns.submit_signoff(flag);
							}
						}, 0);
					},
					visible : appraisalContext.appraisal_data.appr_obj_save_submit_flag,
				}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
			    
			    /* declaring additional buttons on objectives tab for manager according to status*/
			    var manager_obj_save_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZSAVE.toUpperCase(),
					press:function()
					{
						showBusy();
						setTimeout(function(){
							appraisal_ns.save_Objectives();
						}, 0);
					},
					visible : appraisalContext.appraisal_data.appr_obj_save_signoff_flag,
				}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
			    
			    var manager_obj_signoff_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZSIGN_OFF.toUpperCase(),
					visible:false,
					press: function()
					{
					  showBusy();
				      setTimeout(function(){
						var flag = 'sign_off';
						if(/*appraisalContext.isObjSaved == false &&*/ appraisalContext.isObjEditedFlag == true)
						{
							appraisalContext.isSignOffObjDirectlyClicked = true;
							appraisal_ns.save_Objectives();
							
							if(appraisalContext.isSignOffObjDirectlyClicked == false)
							appraisal_ns.submit_signoff(flag);
						}
						else
						{
							appraisalContext.isSignOffObjDirectlyClicked = false;
							appraisal_ns.submit_signoff(flag);
						}
						
					}, 0);
						/*appraisal_ns.save_Objectives();
						appraisal_ns.submit_signoff(flag);*/
						
					},
					visible : appraisalContext.appraisal_data.appr_obj_save_signoff_flag,
				}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
			    
			    obj_save_signoff_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 1 ,
					visible:false
				});
			    obj_save_signoff_cell.addContent(manager_obj_save_btn);
			    obj_save_signoff_cell.addContent(manager_obj_signoff_btn);
			    /* end of additional buttons on objectives tab for manager according to status*/
			    
			    /* declaring additional buttons on objectives tab for employee according to status*/
			    var employee_obj_cancel_btn = new sap.m.Button({
				    width : "50%",
					text: '{i18n>CANCEL}',
					press : oController.perform_cancel,
					visible : appraisalContext.appraisal_data.appr_obj_cancel_accept_flag,
				}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
			    
			    var employee_obj_accept_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZACCEPT.toUpperCase(),
					visible : appraisalContext.appraisal_data.appr_obj_cancel_accept_flag,
					press: function()
					{
						showBusy();
						setTimeout(function(){
							var flag = 'accept_appraisal';
							appraisal_ns.accept_appraisal(flag);
						}, 0);
					},
				}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
			    
			    obj_cancel_accept_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 1,
					visible:false
				});
			    obj_cancel_accept_cell.addContent(employee_obj_cancel_btn);
			    obj_cancel_accept_cell.addContent(employee_obj_accept_btn);
			    /* end of additional buttons on objectives tab for employee according to status*/
			    
			    
			    var submit_save_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 1 
				});
			    submit_save_cell.addContent(obj_save_btn);
			    submit_save_cell.addContent(obj_submit_btn);
			 
			    
			    var appraisal_obj_header_matrix = new sap.ui.commons.layout.MatrixLayout({                  
	        
	             	width:"75%", 
	             	columns : 2,
	             	widths:['40%','60%'],
	             	 enabled:true,
	   	          visible:true,
	          }).addStyleClass("others_appraisal_style");
			    
			    
			    var assignment_objectives = new sap.m.Text({
					//width:"100%",
					text :myPathContext.appraisal_template["0002"].name,
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("title_text").addStyleClass("assign_obj_style").addStyleClass("assign_obj_bold");	
			    
			    var add_appr_obj_btn = new sap.m.Button({
			    	type : "Emphasized",
					icon : "sap-icon://add",
					visible : appraisalContext.appraisal_data.objectives_comments_editable,
					text: '{i18n>ADD_ADDITIONAL_OBJECTIVE}',
					press:oController.add_assignment_obj
				    }).addStyleClass("add_obj_btn_style");	
			    
			    
			    var add_appr_obj_btn_2 = add_appr_obj_btn.clone();
			    appraisalContext.add_appr_obj_btn = add_appr_obj_btn;
			    appraisalContext.add_appr_obj_btn_2 = add_appr_obj_btn_2;
			    
			    var additional_obj_btn_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 1 
				});
			    
			    //additional_obj_btn_cell.addContent(assignment_objectives);
			    additional_obj_btn_cell.addContent(add_appr_obj_btn_2);
			    
			    appraisal_obj_header_matrix.createRow("","");
			    appraisal_obj_header_matrix.createRow(assignment_objectives,add_appr_obj_btn_2);
			   
			    
			    
			    //Creating initial row  data
			    var appraisal_obj_data = [];
			    
			    appraisal_obj_data.push({
			    	title:"",
			    	description:"",
			    });
			    
			    
			
			    
			    
				 var appraisal_obj_btn_matrix = new sap.ui.commons.layout.MatrixLayout({                  
	                 columns : 1,
	             	width:"75%",   
	             	 enabled:true,
	   	          visible:true,
	          }).addStyleClass("others_appraisal_style").addStyleClass("appraisal_obj_add_Style");
			    
				 appraisal_obj_btn_matrix.createRow(add_appr_obj_btn);
				 
				 appraisalContext.appraisal_obj_btn_matrix = appraisal_obj_btn_matrix;
				 
				 //creating row for additional buttons of objectives
				 appraisal_obj_btn_matrix.createRow(obj_save_signoff_cell);
				 appraisal_obj_btn_matrix.createRow(obj_cancel_accept_cell);
				 
				 appraisal_obj_btn_matrix.createRow(submit_save_cell);
				 
			    appraisalContext.appraisal_obj_data = appraisal_obj_data;			    
			    appraisalContext.appraisal_obj_matrix = appraisal_obj_matrix;
			    
			    /*declaring overlay and text area for expand text field link*/
			    var overlay_text = new sap.m.TextArea({
			    	cols:100,
			    	change:function()
					{
			    		myPathContext.isEdited = true;
					}
			    }).addStyleClass("showMoreTextStyle");
			    
			    var dlg = new sap.m.Dialog({
					showHeader : false, 
					content: [overlay_text]
				}).addStyleClass("showMoreDialog");
			    
				dlg.onAfterRendering = function() {
					if (sap.m.Dialog.prototype.onAfterRendering) {
						sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
						var b = $('<div class="showMoreDialogClosebtn">X</div>');
						this.$().prepend(b);
						b.click(function() {
							
							if(appraisalContext.isCalledExpandEmpComments == true)
							{
							  appraisalContext.overall_assessment_emp_input.setValue("");
							  appraisalContext.overall_assessment_emp_input.setValue(appraisalContext.overlay_text.getValue());
							}
							
							if(appraisalContext.isCalledExpandManagerComments == true)
							{
								appraisalContext.manager_objectives_cmnts_input.setValue("");
								appraisalContext.manager_objectives_cmnts_input.setValue(appraisalContext.overlay_text.getValue());
							}
							if( appraisalContext.isCalledKeyStrength == true)
							{
								appraisalContext.competencies_key_strength_input.setValue("");
								appraisalContext.competencies_key_strength_input.setValue(appraisalContext.overlay_text.getValue());
							}
							if( appraisalContext.isCalledAreasDev == true)
							{
								appraisalContext.competencies_areas_dev_input.setValue("");
								appraisalContext.competencies_areas_dev_input.setValue(appraisalContext.overlay_text.getValue());
							}
							
							if( appraisalContext.isCalledEmpSignoff == true)
							{
								appraisalContext.emp_signoff_input.setValue("");
								appraisalContext.emp_signoff_input.setValue(appraisalContext.overlay_text.getValue());
							}
							if( appraisalContext.isCalledAAObj == true)
							{
								appraisalContext.obj_text_area_ref.setValue("");
								appraisalContext.obj_text_area_ref.setValue(appraisalContext.overlay_text.getValue());
							}
							
							
							appraisalContext.isCalledExpandEmpComments = false;
							appraisalContext.isCalledExpandManagerComments = false;
							appraisalContext.isCalledKeyStrength = false;
							appraisalContext.isCalledAreasDev = false;
							appraisalContext.isCalledEmpSignoff = false;
							appraisalContext.isCalledAAObj = false;
							this.close(); 
						}.bind(this));
					}
				};
				$(function() {
					  $('body').on('click', '#sap-ui-blocklayer-popup', function() {
						  
						  if(appraisalContext.isCalledExpandEmpComments == true)
							{
							  appraisalContext.overall_assessment_emp_input.setValue("");
							  
							  if(appraisalContext.overlay_text.getValue().toString().trim()!="")
							  appraisalContext.overall_assessment_emp_input.setValue(appraisalContext.overlay_text.getValue());
							}
						  
						  if(appraisalContext.isCalledExpandManagerComments == true)
							{
								appraisalContext.manager_objectives_cmnts_input.setValue("");
								
								if(appraisalContext.overlay_text.getValue().toString().trim()!="")
								appraisalContext.manager_objectives_cmnts_input.setValue(appraisalContext.overlay_text.getValue());
							}
						  
						  if(appraisalContext.isCalledKeyStrength == true)
							{
								appraisalContext.competencies_key_strength_input.setValue("");
								
								if(appraisalContext.overlay_text.getValue().toString().trim()!="")
								appraisalContext.competencies_key_strength_input.setValue(appraisalContext.overlay_text.getValue());
							}
						  
						  if(appraisalContext.isCalledAreasDev == true)
							{
								appraisalContext.competencies_areas_dev_input.setValue("");
								
								if(appraisalContext.overlay_text.getValue().toString().trim()!="")
								appraisalContext.competencies_areas_dev_input.setValue(appraisalContext.overlay_text.getValue());
							}
						  
						  if(appraisalContext.isCalledEmpSignoff == true)
							{
								appraisalContext.emp_signoff_input.setValue("");
								
								if(appraisalContext.overlay_text.getValue().toString().trim()!="")
								appraisalContext.emp_signoff_input.setValue(appraisalContext.overlay_text.getValue());
							}
						  
						  if(appraisalContext.isCalledAAObj == true)
							{
								appraisalContext.obj_text_area_ref.setValue("");
								
								if(appraisalContext.overlay_text.getValue().toString().trim()!="")
								appraisalContext.obj_text_area_ref.setValue(appraisalContext.overlay_text.getValue());
							}
						  
						  
						  appraisalContext.isCalledExpandEmpComments = false;
						  appraisalContext.isCalledExpandManagerComments = false;
						  appraisalContext.isCalledKeyStrength = false;
						  appraisalContext.isCalledAreasDev = false;
						  appraisalContext.isCalledEmpSignoff = false;
						  appraisalContext.isCalledAAObj = false;
						  dlg.close();
					  });
					});
				
				
				appraisalContext.overlay_text = overlay_text;
				appraisalContext.dlg = dlg;	
			    
			    /*end of declaring overlay and text area for expand text field link*/
			    
			    
			    /*Declaring matrix for overall assignment assessment employee comments*/			    
			    var overall_assessment_emp_matrix = new sap.ui.commons.layout.MatrixLayout({                  
	                 columns : 2,
	                 width:"75%",
	             	widths:['30%','80%'], 
	             	//enabled:appraisalContext.appraisal_data.over_all_assessment_emp_editable,
	   	          visible:appraisalContext.appraisal_data.over_all_assessment_emp_visible,
	            }).addStyleClass("others_appraisal_style");
			    
			    var overall_assessment_empCell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 2 
				});
			    
			    var overall_assessment_emp = new sap.m.Text({
					width:"100%",
					text :'{i18n>OVERALL_ASSESSMENT_EMPLOYEE}',
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("title_text").addStyleClass("assign_obj_margin").addStyleClass("assign_obj_bold");
			    overall_assessment_empCell.addContent(overall_assessment_emp);
			    
				var overall_assessment_div_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 2 
				});
			    
			   var overall_assessment_div = new sap.ui.commons.HorizontalDivider({
	                  width: "100%",
	                  type: "Page",
	                  height: "Small"
	              }).addStyleClass("assign_objectives_divider");
			   
			   overall_assessment_div_cell.addContent(overall_assessment_div);
			   overall_assessment_div_cell2 = overall_assessment_div_cell.clone();
			   
			   var overall_assessment_emp_comments = new sap.m.Text({
					width:"90%",
					text :myPathContext.appraisal_template["0012"].name,
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("title_text").addStyleClass("assign_obj_style");
			   
			   var expand_overall_assessment_emp = new sap.m.Link(
			    		{
			    			//text:"EXPAND TEXT FIELD",
			    			text :'{i18n>EXPAND_TEXT_FIELD}',
			    			visible:appraisalContext.appraisal_data.over_all_assessment_emp_editable,
			    			press:function()
			    	    	{
			    				appraisalContext.isCalledExpandEmpComments = true;
			    				appraisal_ns.openReadOnlyText(appraisalContext.overall_assessment_emp_input.getValue());
			    	    	}
			    			}).addStyleClass("assign_obj_style");
			   
			   
			   var overall_assessment_emp_vLayout = new sap.ui.commons.layout.VerticalLayout({
					content:[overall_assessment_emp_comments,expand_overall_assessment_emp]
				}).addStyleClass("displayLinkMatrixStyle");
			   
			   
			   
			   var overall_assessment_emp_input = new sap.m.TextArea({
	                  value: "",
	                  width: "100%",
	                  editable:appraisalContext.appraisal_data.over_all_assessment_emp_editable,
	                  value : appraisalContext.appraisal_overall_comment_emp,
	                  rows: 4,					                
	                  change : function()
	                  {
	                	  appraisalContext.isEmpAssessmentEditedFlag = true;
	                	  myPathContext.isEdited = true;
	                  }
	              });
			   appraisalContext.overall_assessment_emp_input = overall_assessment_emp_input;
			   
			   /*Logic for employee overall assessment comments visibility*/
			   overall_assessment_emp_readOnly = new com.capgemini.mypath.util.MyPathText({
				   
	  		            	showLimit : 500,
	  		            	width: "70%",
	  		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
	  						text : appraisalContext.appraisal_overall_comment_emp,
	  						showTextArea : true,	
	  						})/*.addStyleClass("showMoreTextAA")*/;
			   
			 
			   var emp_overall_com_control = null;
			   if(appraisalContext.appraisal_data.over_all_assessment_emp_editable)
			   {
				   emp_overall_com_control = overall_assessment_emp_input;
			   }
			   else
			   {
				   emp_overall_com_control = overall_assessment_emp_readOnly;
			   }
			  /*End of logic for employee overall assessment comments visibility*/
			   
			   var assessment_save_submit_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 2,
					visible:true
				});
			   
			   var assessment_save_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZSAVE.toUpperCase(),
					press:function()
					{
						showBusy();
						setTimeout(function(){
							appraisal_ns.save_emp_assessment();
						}, 0);
					},
					visible : appraisalContext.appraisal_data.assess_save_submit_flag,
				}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
			    
			    var assessment_submit_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZSEND_REVIEWER.toUpperCase(),
					visible : appraisalContext.appraisal_data.assess_save_submit_flag,
					press:function()
					{
						showBusy();
						setTimeout(function(){
						if(/*appraisalContext.isEmpAssessmentSaved == false &&*/ appraisalContext.isEmpAssessmentEditedFlag == true)
						{
							appraisalContext.isEmployeeAssessmentSubmitDirectlyClicked = true;
							appraisal_ns.save_emp_assessment();
							
							if(appraisalContext.isEmployeeAssessmentSubmitDirectlyClicked == false)
							appraisal_ns.submit_emp_assessment();
						}
						else
							appraisal_ns.submit_emp_assessment();
						}, 0);
					}
				}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
			    
			    assessment_save_submit_cell.addContent(assessment_save_btn);
			    assessment_save_submit_cell.addContent(assessment_submit_btn);
			    
			    /* declaring additional buttons on assessment tab for employee according to status*/
			    var employee_assessment_cancel_btn = new sap.m.Button({
				    width : "50%",
					text: '{i18n>CANCEL}',
					press : oController.perform_cancel,
					visible : appraisalContext.appraisal_data.assess_cancel_accept_flag,
				}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
			    
			    var employee_assessment_accept_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZACCEPT.toUpperCase(),
					visible : appraisalContext.appraisal_data.assess_cancel_accept_flag,
					press: function()
					{
						showBusy();
						setTimeout(function(){
							var flag = 'accept_appraisal';
							appraisal_ns.accept_appraisal(flag);
						}, 0);
					},
				}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
			    
			    assessment_cancel_accept_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 1 ,
					
				});
			    assessment_cancel_accept_cell.addContent(employee_assessment_cancel_btn);
			    assessment_cancel_accept_cell.addContent(employee_assessment_accept_btn);
			    /* end of additional buttons on objectives tab for manager according to status*/
			    
			    
			   overall_assessment_emp_matrix.createRow("","");
			   overall_assessment_emp_matrix.createRow(overall_assessment_empCell);
			   overall_assessment_emp_matrix.createRow(overall_assessment_div_cell);
			   overall_assessment_emp_matrix.createRow("","");
			   overall_assessment_emp_matrix.createRow(overall_assessment_emp_vLayout,emp_overall_com_control);
			   overall_assessment_emp_matrix.createRow(assessment_save_submit_cell);
			   overall_assessment_emp_matrix.createRow(assessment_cancel_accept_cell);	
		
			   /*End of matrix for overall assignment assessment employee comments*/	
			   
			   /*Declaring matrix for employee signoff comments*/			    
			    var emp_signoff_matrix = new sap.ui.commons.layout.MatrixLayout({                  
	                 columns : 1,
	                 width:"75%",	
	   	          visible:appraisalContext.appraisal_data.emp_signoff_comments_visible,
	            }).addStyleClass("emp_signoff_style");
			    
			    var emp_signoff_text = new sap.m.Text({
					width:"100%",
					text :myPathContext.appraisal_template["0017"].name,
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("title_text").addStyleClass("emp_signoff_content_style").addStyleClass("assign_obj_bold");
			    
				var emp_signoff_div_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 1 
				});
			    
			   var emp_signoff_div = new sap.ui.commons.HorizontalDivider({
	                  width: "100%",
	                  type: "Page",
	                  height: "Small"
	              }).addStyleClass("assign_objectives_divider");
			   
			   emp_signoff_div_cell.addContent(emp_signoff_div);	   
		
			   
			   var emp_signoff_input = new sap.m.TextArea({
	                  width: "99%",
	                  editable: appraisalContext.appraisal_data.emp_signoff_comments_editable,
	                  visible : appraisalContext.appraisal_data.emp_signoff_comments_visible,
	                  value : appraisalContext.emp_signoff_comments,
	                  rows: 4,					                
	                  change : function()
	                  {
	                	 
	                  }
	              }).addStyleClass("emp_signoff_content_style").addStyleClass("emp_signoff_input");
			   appraisalContext.emp_signoff_input = emp_signoff_input;
			   
			   
			   var expand_emp_signoff = new sap.m.Link(
			    		{
			    			//text:"EXPAND TEXT FIELD",
			    			text :'{i18n>EXPAND_TEXT_FIELD}',
			    			visible:appraisalContext.appraisal_data.emp_signoff_comments_editable,
			    			press:function()
			    	    	{
			    				appraisalContext.isCalledEmpSignoff = true;
			    				appraisal_ns.openReadOnlyText(appraisalContext.emp_signoff_input.getValue());
			    	    	}
			    			}).addStyleClass("emp_signoff_content_style").addStyleClass("segmented_btn_style1");			   
			   
			
			   
			   /*Logic for employee signoff comments input visibility*/
			   emp_signoff_readOnly = new com.capgemini.mypath.util.MyPathText({
				   
	  		            	showLimit : 500,
	  		            	width: "70%",
	  		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
	  						text : appraisalContext.emp_signoff_comments,
	  						showTextArea : true,	
	  						})/*.addStyleClass("showMoreTextAA")*/.addStyleClass("signoff_readonly_style");
			   
			 
			   var emp_signoff_com_control = null;
			   if(appraisalContext.appraisal_data.emp_signoff_comments_editable)
			   {
				   emp_signoff_com_control = emp_signoff_input;
			   }
			   else
			   {
				   emp_signoff_com_control = emp_signoff_readOnly;
			   }
			  /*end of logic for competencies key strength input visibility*/
			   
			   var emp_signoff_vLayout = new sap.ui.commons.layout.VerticalLayout({
				   width: "100%",
					content:[expand_emp_signoff,emp_signoff_com_control]
				}).addStyleClass("displayLinkMatrixStyle");
			   
			   emp_signoff_matrix.createRow(emp_signoff_text);
			   emp_signoff_matrix.createRow(emp_signoff_div_cell);
			   emp_signoff_matrix.createRow(emp_signoff_vLayout);
			   /*End of matrix for employee signoff comments*/
			   
			   /*Declaring matrix for overall assignment assessment manager comments*/
			    var overall_assessment_manager_matrix = new sap.ui.commons.layout.MatrixLayout({                  
	                 columns : 2,
	                 width:"75%",
	             	widths:['30%','80%'],
	   	          visible:appraisalContext.appraisal_data.over_all_assessment_manager_visible,
	            }).addStyleClass("overall_manager_style");
			    
			    
			    var overall_assessment_managerCell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 2 
				});
			    
		
			    var overall_assessment_manager = new sap.m.Text({
					text :'{i18n>OVERALL_ASSESSMENT_MANAGER}',
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("title_text").addStyleClass("assign_obj_margin").addStyleClass("assign_obj_bold");
			    
			
			    overall_assessment_managerCell.addContent(overall_assessment_manager);
			    
				var overall_assessment_div_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 2 
				});
			    
			   var overall_assessment_div = new sap.ui.commons.HorizontalDivider({
	                  width: "100%",
	                  type: "Page",
	                  height: "Small"
	              }).addStyleClass("assign_objectives_divider");
			   
			   overall_assessment_div_cell.addContent(overall_assessment_div);
			   
			   var manager_objectives_cmnts = new sap.m.Label({
					width:"100%",
					required:true,
					textDirection: sap.ui.core.TextDirection.LTR,
					text :myPathContext.appraisal_template["0013"].name,
				}).addStyleClass("title_text").addStyleClass("assign_obj_style").addStyleClass("manager_assessment_style");
			   
			   var expand_overall_assessment_manager = new sap.m.Link(
			    		{
			    			//text:"EXPAND TEXT FIELD",
			    			text :'{i18n>EXPAND_TEXT_FIELD}',
			    			visible:appraisalContext.appraisal_data.over_all_assessment_manager_editable,
			    			press:function()
			    	    	{
			    				appraisalContext.isCalledExpandManagerComments = true;
			    				appraisal_ns.openReadOnlyText(appraisalContext.manager_objectives_cmnts_input.getValue());
			    	    	}
			    			}).addStyleClass("assign_obj_style");
			   
			   
			   var overall_assessment_manager_vLayout = new sap.ui.commons.layout.VerticalLayout({
					content:[manager_objectives_cmnts,expand_overall_assessment_manager]
				}).addStyleClass("displayLinkMatrixStyle");
			   
			   
			   var manager_objectives_cmnts_input =   new sap.m.TextArea({
	                  value: "",
	                  width: "100%",
	                  editable:appraisalContext.appraisal_data.over_all_assessment_manager_editable,
	                  rows: 4,			
	                  value : appraisalContext.ManagerComments,
	                  change : function()
	                  {
	                	  appraisalContext.isManagerAssessmentEditedFlag = true;
	                	  myPathContext.isEdited = true;
	                  }
	              });
			   appraisalContext.manager_objectives_cmnts_input  = manager_objectives_cmnts_input;
			   
			   /*Logic for manager comments against objectives visibility*/
			   manager_objectives_cmnts_readOnly = new com.capgemini.mypath.util.MyPathText({
				   
	  		            	showLimit : 500,
	  		            	width: "70%",
	  		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
	  						text : appraisalContext.ManagerComments,
	  						showTextArea : true,	
	  						})/*.addStyleClass("showMoreTextAA")*/;
			   
			 
			   var manager_objectives_com_control = null;
			   if(appraisalContext.appraisal_data.over_all_assessment_manager_editable)
			   {
				   manager_objectives_com_control = manager_objectives_cmnts_input;
			   }
			   else
			   {
				   manager_objectives_com_control = manager_objectives_cmnts_readOnly;
			   }
			  /*End of logic for manager comments against objectives visibility*/
			   
			   var competencies_key_strength = new sap.m.Text({
					width:"100%",
					text :myPathContext.appraisal_template["0014"].name,
					 value : appraisalContext.AreasForDevelopment,					
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("title_text").addStyleClass("assign_obj_style");
			   
			   var expand_competencies_key_strength = new sap.m.Link(
			    		{
			    			//text:"EXPAND TEXT FIELD",
			    			text :'{i18n>EXPAND_TEXT_FIELD}',
			    			visible:appraisalContext.appraisal_data.over_all_assessment_manager_editable,
			    			press:function()
			    	    	{
			    				appraisalContext.isCalledKeyStrength = true;
			    				appraisal_ns.openReadOnlyText(appraisalContext.competencies_key_strength_input.getValue());
			    	    	}
			    			}).addStyleClass("assign_obj_style");
			   
			   
			   var competencies_key_strength_vLayout = new sap.ui.commons.layout.VerticalLayout({
					content:[competencies_key_strength,expand_competencies_key_strength]
				}).addStyleClass("displayLinkMatrixStyle");
			   
			   
			   var competencies_key_strength_input =   new sap.m.TextArea({
	                  value: "",
	                  width: "100%",
	                  editable:appraisalContext.appraisal_data.over_all_assessment_manager_editable,
	                  value:appraisalContext.KeyStrengthsDemo,
	                  rows: 4,					                
	                  change : function()
	                  {
	                	  appraisalContext.isManagerAssessmentEditedFlag = true;
	                	  myPathContext.isEdited = true;
	                  }
	              });
			   appraisalContext.competencies_key_strength_input = competencies_key_strength_input;
			   
			   /*Logic for competencies key strength input visibility*/
			   competencies_key_strength_readOnly = new com.capgemini.mypath.util.MyPathText({
				   
	  		            	showLimit : 500,
	  		            	width: "70%",
	  		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
	  						text : appraisalContext.KeyStrengthsDemo,
	  						showTextArea : true,
	  						})/*.addStyleClass("showMoreTextAA")*/;
			   
			 
			   var competencies_key_strength_com_control = null;
			   if(appraisalContext.appraisal_data.over_all_assessment_manager_editable)
			   {
				   competencies_key_strength_com_control = competencies_key_strength_input;
			   }
			   else
			   {
				   competencies_key_strength_com_control = competencies_key_strength_readOnly;
			   }
			  /*end of logic for competencies key strength input visibility*/
			   
			   
			   var competencies_areas_dev = new sap.m.Text({
					width:"100%",
					text :myPathContext.appraisal_template["0015"].name,
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("title_text").addStyleClass("assign_obj_style");
			   
			   var expand_competencies_areas_dev = new sap.m.Link(
			    		{
			    			//text:"EXPAND TEXT FIELD",
			    			text :'{i18n>EXPAND_TEXT_FIELD}',
			    			visible:appraisalContext.appraisal_data.over_all_assessment_manager_editable,
			    			press:function()
			    	    	{
			    				appraisalContext.isCalledAreasDev = true;
			    				appraisal_ns.openReadOnlyText(appraisalContext.competencies_areas_dev_input.getValue());
			    	    	}
			    			}).addStyleClass("assign_obj_style");
			   
			   
			   var competencies_areas_dev_vLayout = new sap.ui.commons.layout.VerticalLayout({
				   width:"100%",
					content:[competencies_areas_dev,expand_competencies_areas_dev]
				}).addStyleClass("displayLinkMatrixStyle");
			   
			   var competencies_areas_dev_input =   new sap.m.TextArea({
	                  value: "",
	                  width: "100%",
	                  editable:appraisalContext.appraisal_data.over_all_assessment_manager_editable,
	                  value : appraisalContext.AreasForDevelopment,
	                  rows: 4,					                
	                  change : function()
	                  {
	                	  appraisalContext.isManagerAssessmentEditedFlag = true;
	                	  myPathContext.isEdited = true;
	                  }
	              });
			   
			   appraisalContext.competencies_areas_dev_input = competencies_areas_dev_input;
			   
			   /*Logic for competencies key strength input visibility*/
			   competencies_areas_dev_readOnly = new com.capgemini.mypath.util.MyPathText({
				   
	  		            	showLimit : 500,
	  		            	width: "70%",
	  		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
	  						text : appraisalContext.AreasForDevelopment,
	  						showTextArea : true,
	  						})/*.addStyleClass("showMoreTextAA")*/;
			   
			 
			   var competencies_areas_dev_com_control = null;
			   if(appraisalContext.appraisal_data.over_all_assessment_manager_editable)
			   {
				   competencies_areas_dev_com_control = competencies_areas_dev_input;
			   }
			   else
			   {
				   competencies_areas_dev_com_control = competencies_areas_dev_readOnly;
			   }
			  /*end of logic for competencies key strength input visibility*/
			   
			   
			   var rating_text = new sap.m.Text({
					width:"100%",
					text :myPathContext.appraisal_template["0016"].name,
					textDirection: sap.ui.core.TextDirection.LTR,
				}).addStyleClass("title_text").addStyleClass("assign_obj_style").addStyleClass("assign_obj_bold");
			
			   var rating_btns = new sap.m.SegmentedButton({    
			        buttons: [    
			          new sap.m.Button({ text: "1",width:"25px" }),    
			          new sap.m.Button({ text: "2",width:"25px" }),    
			          new sap.m.Button({ text: "3",width:"25px"}),  
			          new sap.m.Button({ text: "4",width:"25px" }),    
			          new sap.m.Button({ text: "5",width:"25px" }),			          
			          new sap.m.Button({text:"N/A",width: "25px"}),
			          new sap.m.Button({text:"",width: "1px",visible:false}).addStyleClass("AAdisplaynone"),
			          
			        ],
			        enabled :appraisalContext.appraisal_data.over_all_assessment_manager_editable,
			        select:function(evt)
			        {
			        	appraisalContext.appraisal_rating = evt.getParameters().button.getText();
			        	appraisalContext.isManagerAssessmentEditedFlag = true;
			        	myPathContext.isEdited = true;
			        }}).addStyleClass("segmented_btn_style").addStyleClass("segmented_btn_style1");	 
			   
			   appraisalContext.rating_btns = rating_btns;
			   
			  
			   
			   var rating_btn_cell = new sap.ui.commons.layout.MatrixLayoutCell({
					colSpan : 1 
				});
			   
			   rating_btn_cell.addContent(rating_btns);
			  
				
				    var manager_assessment_save_btn = new sap.m.Button({
					    width : "50%",
						text: myPathContext.buttonText.ZSAVE.toUpperCase(),
						visible : appraisalContext.appraisal_data.assess_save_sign_off_flag,
						press: function()
						{
							showBusy();
							setTimeout(function(){
								appraisal_ns.save_manager_assessment();

							}, 0);
						},
					}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
				    
				    var manager_assessment_signoff_btn = new sap.m.Button({
					    width : "50%",
						text:myPathContext.buttonText.ZSIGN_OFF.toUpperCase(),
						visible : appraisalContext.appraisal_data.assess_save_sign_off_flag,
						press:function()
						{
							showBusy();
							setTimeout(function(){
							if(/*(appraisalContext.isManagerAssessmentSaved == false &&*/ appraisalContext.isManagerAssessmentEditedFlag == true/*)*/ || (appraisalContext.manager_objectives_cmnts_input.getValue().toString().trim()==""))
							{
								appraisalContext.isManagerAssessmentSubmitDirectlyClicked = true;
								appraisal_ns.save_manager_assessment();
								
								if(appraisalContext.isManagerAssessmentSubmitDirectlyClicked)
								appraisal_ns.submit_manager_assessment();
							}
							else
								appraisal_ns.submit_manager_assessment();
							}, 0);
						}
					}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
				    
				    assessment_save_signoff_cell = new sap.ui.commons.layout.MatrixLayoutCell({
						colSpan : 1 ,
						visible:false,
					});
				    assessment_save_signoff_cell.addContent(manager_assessment_save_btn);
				    assessment_save_signoff_cell.addContent(manager_assessment_signoff_btn); 
				    
				    
			   
			   overall_assessment_manager_matrix.createRow("","");
			   overall_assessment_manager_matrix.createRow(overall_assessment_managerCell);
			   overall_assessment_manager_matrix.createRow(overall_assessment_div_cell);
			   overall_assessment_manager_matrix.createRow("","");
			   overall_assessment_manager_matrix.createRow(overall_assessment_manager_vLayout,manager_objectives_com_control);
			   overall_assessment_manager_matrix.createRow(competencies_key_strength_vLayout,competencies_key_strength_com_control);
			   overall_assessment_manager_matrix.createRow(competencies_areas_dev_vLayout,competencies_areas_dev_com_control);
			   overall_assessment_manager_matrix.createRow(overall_assessment_div_cell2);
			   overall_assessment_manager_matrix.createRow("","");
			   overall_assessment_manager_matrix.createRow(rating_text,rating_btn_cell);
			   overall_assessment_manager_matrix.createRow("","");
			   overall_assessment_manager_matrix.createRow(assessment_save_signoff_cell);
			   /*End of matrix for overall assignment assessment manager comments*/
			   
				 /**********************Date logic for top matrix*********************/
				//var fromdate_oData = {				
						var path_from_date =  new Date(myPathContext.validFromISO); //new Date(myPathContext.validFrom+"Z");
						//path_from_date.setTime( path_from_date.getTime() + path_from_date.getTimezoneOffset()*60*1000 );
					   // };
			
			//var todate_oData = {				
					
					var path_to_date = new Date(myPathContext.validToISO); //new Date(myPathContext.validTo+"Z");
					//path_to_date.setTime(path_to_date.getTime() + path_to_date.getTimezoneOffset()*60*1000 );
				   // };
					
					
			/*********himanshu*******************************/
					
					
					
					
			/**********************************************/		
			
			
			/*var from_model = new sap.ui.model.json.JSONModel();		
			from_model.setData(fromdate_oData);
			
			var to_model = new sap.ui.model.json.JSONModel();		
			to_model.setData(todate_oData);*/
			
			var appr_from_date = new sap.m.DatePicker({
				visible:false,
				width:"35%",
				/*value:
				{
					path:"/path_from_date",
					type : new sap.ui.model.type.Date()
					
				}*/
			});//.setModel(from_model).addStyleClass("date_cell_style");
			
			appraisalContext.appr_from_date = appr_from_date;
			appraisalContext.appr_from_date.setDateValue(path_from_date);
			
			var appr_to_date = new sap.m.DatePicker({
				visible:false,
				width:"35%",
				/*value:
				{
					path:"/path_to_date",
					type : new sap.ui.model.type.Date()
					
				}*/
			});//.setModel(to_model);
		    
			appraisalContext.appr_to_date = appr_to_date;
			appraisalContext.appr_to_date.setDateValue(path_to_date);
				 
		    /**********************End of Date logic for top matrix*********************/
			
			appraisalContext.from_date.setText(appraisalContext.appr_from_date.getValue());
			appraisalContext.to_date.setText(appraisalContext.appr_to_date.getValue());
			
			 var appraisal_provider_matrix_2 = appraisal_provider_matrix.clone();
			 var appraisal_provider_matrix_3 = appraisal_provider_matrix.clone();	
			 
			 /*Declaring cancel and next buttons for all tabs*/
			 var features_tab_cancel_btn = new sap.m.Button({
				    width : "50%",
					text: '{i18n>CANCEL}',
					press: oController.perform_cancel,
					visible : appraisalContext.appraisal_data.features_tab_cancel_btn_visible,
				    }).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
			 
			 var objectives_tab_cancel_btn = new sap.m.Button({
				    width : "50%",
					text: '{i18n>CANCEL}',
					press: oController.perform_cancel,
					visible : appraisalContext.appraisal_data.objectives_tab_cancel_btn_visible,
				    }).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
				
				    
				    var features_tab_next_btn = new sap.m.Button({
					    width : "50%",
						text: '{i18n>NEXT}',
						visible : appraisalContext.appraisal_data.features_tab_next_btn_visible,
						 press:oController.next_assignment_features,
					}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
				    
				    appraisalContext.features_tab_next_btn = features_tab_next_btn;
				    
			 var objectives_tab_next_btn = new sap.m.Button({
				    width : "50%",
					text: '{i18n>NEXT}',
					visible : appraisalContext.appraisal_data.objectives_tab_next_btn_visible,
					press:function()
					{
						appraisalContext.appraisal_assesment_tab.setEnabled(true);
						appraisalContext.appraisal_tabstrip.setSelectedKey("appraisal_assesment_tab");
						
					}
				}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
				    
			 appraisalContext.objectives_tab_next_btn = objectives_tab_next_btn;
			 
				    /*End of cancel and next buttons for all tabs*/
			 var create_assignment_tab = new sap.m.IconTabFilter({
		          text: myPathContext.i18nModel.getProperty("CREATE_ASN_APP").toUpperCase(),
		          key:"create_assign_tab",
		          count:1,
		          enabled:true,
		          visible:!appraisalContext.appraisal_data.other_tab_visible,
		          content: [create_appraisal_matrix]
		        });
			 
			 var features_assignment_tab = new sap.m.IconTabFilter({
		          text: '{i18n>FEATURES}',
		          key:"assign_features_tab",
		          count:1,
		          enabled:true,
		          visible:appraisalContext.appraisal_data.other_tab_visible,
		          content: [appraisal_provider_matrix,appraisal_features_matrix,features_tab_cancel_btn,features_tab_next_btn]
		        });
			
			 
			 var objectives_assignment_tab = new sap.m.IconTabFilter({
		          text: '{i18n>OBJECTIVES}',
		          key:"assign_objectives_tab",
		          count:2,		         
		          enabled:false,//!appraisalContext.appraisal_data.footer_btn_visible,
		          visible: appraisalContext.appraisal_data.other_tab_visible,
		          content: [appraisal_provider_matrix_2,appraisal_obj_header_matrix,appraisal_obj_matrix,appraisal_obj_btn_matrix,objectives_tab_cancel_btn,objectives_tab_next_btn]
		        });
			 
			 var appraisal_assesment_tab = new sap.m.IconTabFilter({
		          text: '{i18n>ASSESSMENT}',
		          key:"appraisal_assesment_tab",
		          count:3,
		          enabled:false,
		          visible:appraisalContext.appraisal_data.assessment_tab_visible,
		          content: [appraisal_provider_matrix_3,overall_assessment_emp_matrix,overall_assessment_manager_matrix,emp_signoff_matrix]
		        });
			 
			 appraisalContext.appraisal_assesment_tab = appraisal_assesment_tab;
			 
			 var pdfIcon = new sap.m.Image({
					src : appraisal_ns.url_app+"com/capgemini/mypath/appraisal/images/pdf_icon.png",
					width : "30px", 
					height : "30px",
					visible: appraisalContext.appraisal_data.pdf_icon_visible,
					press :function(oEvent) {
						displayPrintDocument(myPathContext.documentId);
					}
				}).addStyleClass("pdfImage");
			 
			 appraisalContext.pdfIcon = pdfIcon;
				
				/*Attachment layout*/
				 
				 var attachmentIcon = new sap.m.Image({
						src : appraisal_ns.url_app+"com/capgemini/mypath/appraisal/images/attachment_icon.png",
						width : "30px", 
						height : "30px",
						visible: true,
						press : function()
						{
							appraisalContext.isCalledFromAppraisal = true;
							openUploadDownload();
						}
					}).addStyleClass("attachmentImageAppraisal");

				 appraisalContext.attachmentIcon = attachmentIcon;
				 
					var attachment_count = new sap.m.Text({						
						text : appraisalContext.doc_count,
						visible:appraisalContext.doc_count > 0 ? true : false,
					}).addStyleClass("header_link_number_blue").addStyleClass("appraisal_header_link_number_blue");
					appraisalContext.attachment_count = attachment_count;
					
					attachment_count.attachBrowserEvent("click", function() {
						appraisalContext.isCalledFromAppraisal = true;
						openUploadDownload();
					});
					
					var vlayout_attachment = new sap.ui.commons.layout.VerticalLayout({
						visible:myPathContext.subStatus != "" ? true : false,
						content:[attachment_count,attachmentIcon]
					}).addStyleClass("top_panel_image_content").addStyleClass("appraisal_top_panel_image_content");
					
					appraisalContext.vlayout_attachment = vlayout_attachment;
					/*End of attachment layout*/	
					
				
			var appraisal_tabstrip = new sap.m.IconTabBar({
			      expanded: !jQuery.device.is.phone,
			      expandable : false,
			      select://oController.next_assignment_features,
			      function()
			      {
			    	/*if(this.getSelectedKey()=="assign_objectives_tab" && isObjTabClicked==false)
			    	{
			    		this.setSelectedKey("assign_features_tab");
			    	var div = jQuery("#"+appraisalContext.features_next_btn.getId() + "-inner");
			   		div.fadeTo(100, 0.1).fadeTo(200, 1.0);
			   		var div = jQuery("#"+appraisalContext.features_tab_next_btn.getId() + "-inner");
			   		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);			    		
			    	}
			    	
			    	if (this.getSelectedKey()=="appraisal_assesment_tab" && isAssessmentTabClicked==false)
			    	{
			    		if(isObjTabClicked==false)
			    		{
			    			this.setSelectedKey("assign_features_tab");
					    	var div = jQuery("#"+appraisalContext.features_next_btn.getId() + "-inner");
					   		div.fadeTo(100, 0.1).fadeTo(200, 1.0);
					   		var div = jQuery("#"+appraisalContext.features_tab_next_btn.getId() + "-inner");
					   		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
			    		}
			    		
			    		else
			    		{
			    			this.setSelectedKey("assign_objectives_tab");
			    			var div = jQuery("#"+appraisalContext.objectives_tab_next_btn.getId() + "-inner");
					   		  div.fadeTo(100, 0.1).fadeTo(200, 1.0);
			    		}
			    	}*/
			    	if(appraisalContext.client_name_input.getValue().toString().trim()=="")  
			    	{
			    		sap.ui.commons.MessageBox.alert(myPathContext.i18nModel.getProperty("Please_fill_all"));
			    		this.setSelectedKey("assign_features_tab");
			    	}
			    	else if (appraisalContext.isfeatureEditedFlag)
			    	{	
			    		appraisalContext.isFeaturesCalledFromNext = true;
						appraisal_ns.save_assignment_features();
			    		
			    	}
			      },
			      items: [create_assignment_tab,features_assignment_tab,objectives_assignment_tab,appraisal_assesment_tab]
			    }).addStyleClass("myPathAppraisalTabBar").addStyleClass("appraisalTabStyle");
			
			appraisalContext.appraisal_tabstrip = appraisal_tabstrip;
			
			appraisalContext.create_assignment_tab = create_assignment_tab;
			appraisalContext.features_assignment_tab = features_assignment_tab;
			appraisalContext.objectives_assignment_tab = objectives_assignment_tab;
			
			this.addContent(appraisal_tabstrip);
			this.addContent(vlayout_attachment);
			this.addContent(pdfIcon);			
			this.addContent(appraisalContext.appr_workFlow1);
			this.addContent(appraisalContext.appr_workFlow2);
	}

});
