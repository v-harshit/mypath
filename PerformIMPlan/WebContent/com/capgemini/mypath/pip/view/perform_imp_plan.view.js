sap.ui.jsview("com.capgemini.mypath.pip.view.perform_imp_plan", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.pip.view.perform_imp_plan
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.pip.view.perform_imp_plan";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.pip.view.perform_imp_plan
	*/ 
	createContent : function(oController) {
		 
		/* Declaring create PIP matrix*/
		var create_pip_matrix = new sap.ui.commons.layout.MatrixLayout({
			columns : 5,
			width:"75%",
			 enabled:true,
	          visible:true,
			widths : ['1%','21%','1%','50%','25%']}).addStyleClass("create_appraisal_style");
		
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
		    
		    pipContext.title_input = title_input;
		    
		    
		    var validity_period_label = new sap.m.Label({
					width:"100%",
					text :'{i18n>PIP_START}',
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
			
			var pip_from_date = new sap.m.DatePicker({
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
			
			pipContext.pip_from_date = pip_from_date;
			
			 var to_label = new sap.m.Label({
					text :'{i18n>TO}',
					required : true,
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("to_label_appraisal_style").addStyleClass("title_text");

		    
		    var pip_to_date = new sap.m.DatePicker({
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
		    
		  
		    pipContext.pip_to_date = pip_to_date;
		    
		    validityPeriodCell.addContent(pip_from_date);
		    validityPeriodCell.addContent(to_label);		
		    validityPeriodCell.addContent(pip_to_date);	    
			 
	    	
		    var create_pip_emp_label = new sap.ui.commons.Label({
				//width:"100%",
				text :'{i18n>PIP_EMP_NAME}',
				required : true,
				//requiredAtBegin :true,
				textDirection: sap.ui.core.TextDirection.RTL,
				textAlign : sap.ui.core.TextAlign.Right
			}).addStyleClass("title_text").addStyleClass("assignment_manager_label_style").addStyleClass("underline_style");;
		    create_pip_emp_label.setTooltip(myPathContext.createCallout(myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO1") + myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO2")));
		    
		    var pip_emp_info_icon = new sap.m.Image({
		    	src:pip_ns.url_app+"com/capgemini/mypath/pip/images/info_icon.png",		    	
		    });
		    pip_emp_info_icon.setTooltip(myPathContext.createCallout(myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO1") + myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO2")));
		   
		   var hlayout1 = new sap.ui.commons.layout.HorizontalLayout({
				content:[pip_emp_info_icon,create_pip_emp_label]
			}).addStyleClass("add_obj_btn_style");
		   
		    
		    
		    var pip_emp_input = new sap.m.Input({
				width:"100%",
				change:function()
				{
					myPathContext.isEdited = true;
				}
			});
		    
		    pipContext.pip_emp_input = pip_emp_input;
		    
		    var employee_search_icon = new sap.m.Image({
		    	src:pip_ns.url_app+"com/capgemini/mypath/pip/images/search_icon.png",
		    	press:function()
		    	{
		    		pipContext.isSearchEmp = true;
		    		pipContext.isSearchHr = false;
		    		pip_ns.pip_search();
		    	}
		    }).addStyleClass("search_icon_style");
		    
		    
		    var pip_hr_label = new sap.ui.commons.Label({
				//width:"100%",
				text :'{i18n>HR_CONTACT}',
				required : true,
				//requiredAtBegin :true,
				textDirection: sap.ui.core.TextDirection.RTL,
				textAlign : sap.ui.core.TextAlign.Right
			}).addStyleClass("title_text").addStyleClass("assignment_manager_label_style").addStyleClass("underline_style");;
			pip_hr_label.setTooltip(myPathContext.createCallout(myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO1") + myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO2")));
			
			 var pip_hr_info_icon = new sap.m.Image({
			    	src:pip_ns.url_app+"com/capgemini/mypath/pip/images/info_icon.png",			    	
			    });
			 pip_hr_info_icon.setTooltip(myPathContext.createCallout(myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO1") + myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO2")));
			
			
			 var hlayout2 = new sap.ui.commons.layout.HorizontalLayout({
					content:[pip_hr_info_icon,pip_hr_label]
				}).addStyleClass("add_obj_btn_style");
			   
			    
			    
			    var pip_hr_input = new sap.m.Input({
					width:"100%",
					change:function()
					{
						myPathContext.isEdited = true;
					}
				});
			    
			    pipContext.pip_hr_input = pip_hr_input;
			    
			    var hr_search_icon = new sap.m.Image({
			    	src:pip_ns.url_app+"com/capgemini/mypath/pip/images/search_icon.png",
			    	press:function()
			    	{
			    		pipContext.isSearchHr = true;
			    		pipContext.isSearchEmp = false;
			    		pip_ns.pip_search();
			    	}
			    }).addStyleClass("search_icon_style");
			    
			    create_pip_matrix.createRow("","","","","");
				create_pip_matrix.createRow("",title_label,"",title_input,"");
				create_pip_matrix.createRow("",validity_period_label,"",validityPeriodCell,"");
				create_pip_matrix.createRow("",hlayout1,"",pip_emp_input,employee_search_icon);
				create_pip_matrix.createRow("",hlayout2,"",pip_hr_input,hr_search_icon);
				create_pip_matrix.createRow("","","","","");			
				/* End of create PIP matrix*/		    
				
				/*Declaring matrix for PIP details*/		 
				 var pip_details_matrix = new sap.ui.commons.layout.MatrixLayout({
						columns : 7,
						width:"75%",
						enabled:true,
				        visible:true,
						widths : ['1%','11%','1%','11%','8%','1%','9%']}).addStyleClass("feedback_details_style").addStyleClass("appraisal_details_style");
					
				 var pip_label = new sap.m.Label({
						width:"100%",
						text :'{i18n>PIP_LABEL}',
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("label_style");
					
			     var pip_name = new sap.m.Text({
							width:"100%",
							text :"{pip>/docTitle}",
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("title_text");
					 
					 var employee_label = new sap.m.Label({
							width:"100%",
							text :'{i18n>EMPLOYEE}',
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("label_style");
						
				     var employee_name = new sap.m.Text({
								//width:"100%",
								text :"{pip>/appraiseeName}",
								textDirection: sap.ui.core.TextDirection.LTR
							}).addStyleClass("title_text").addStyleClass("underline_style").addStyleClass("pip_float_left");
						     employee_name.setTooltip(myPathContext.createCallout(myPathContext.AddUserData));
				     
				     pipContext.employee_name = employee_name; 
				    
				     
					 var assignment_manager_label = new sap.m.Label({
							width:"100%",
							text :'{i18n>PERFORMANCE_REVIEWER}',
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("label_style");
						
				     var assignment_manager_name = new sap.m.Text({
								width:"100%",
								text :"{pip>/appraiserName}",
								textDirection: sap.ui.core.TextDirection.LTR
							}).addStyleClass("title_text");
				     
				     pipContext.assignment_manager_name = assignment_manager_name;
						 
					var validity_period = new sap.m.Label({
								width:"100%",
								text :'{i18n>PIP_START}',
								textDirection: sap.ui.core.TextDirection.LTR
							}).addStyleClass("label_style");
							
					var from_date = new sap.m.Text({
									width:"100%",
									text :"{pip>/validfrom}",
									textDirection: sap.ui.core.TextDirection.LTR
								}).addStyleClass("title_text");
							 
					pipContext.from_date = from_date;
					
					var to_label = new sap.m.Label({
									width:"100%",
									text :'{i18n>TO}',
									textDirection: sap.ui.core.TextDirection.LTR
								}).addStyleClass("label_style");
								
					var to_date = new sap.m.Text({
										width:"100%",
										text :"{pip>/validto}",
										textDirection: sap.ui.core.TextDirection.LTR
									}).addStyleClass("title_text");	
					
					pipContext.to_date = to_date;	
					
					 var hr_label = new sap.m.Label({
							width:"100%",
							text :'{i18n>HR_CONTACT}',
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("label_style");
						
				     var hr_name = new sap.m.Text({
								width:"100%",
								text :"{pip>/hrName}",
								textDirection: sap.ui.core.TextDirection.LTR
							}).addStyleClass("title_text");
				     
				     pipContext.employee_name = employee_name; 
					    
				 pip_details_matrix.createRow(null);
				 pip_details_matrix.createRow("",pip_label,"",pip_name,"","","");
				 pip_details_matrix.createRow("",employee_label,"",employee_name,assignment_manager_label,"",assignment_manager_name);
				 pip_details_matrix.createRow("",validity_period,"",from_date,to_label,"",to_date);
				 pip_details_matrix.createRow("",hr_label,"",hr_name,"","","");
				 pip_details_matrix.createRow("","","","","","","");
				 
				 var pip_details_matrix1 =  pip_details_matrix.clone();
				 var pip_details_matrix2 =  pip_details_matrix.clone();
				 var pip_details_matrix3 =  pip_details_matrix.clone();
				 var pip_details_matrix4 =  pip_details_matrix.clone();
				/*End of  matrix for PIP details*/			 
				
			    
				 /*Declaring matrix for PIP objectives*/				
				 var pip_obj_action_matrix = new sap.ui.commons.layout.MatrixLayout({                  
	                 columns : 1,
	             	 width:"75%",    
	             	enabled:true,
	   	            visible:pipContext.pip_data.obj_action_visible,
	          }).addStyleClass("pip_obj_style").addStyleClass("matrix_row_color");
				 
				 pipContext.pip_obj_action_matrix = pip_obj_action_matrix;				 
			    /*End of matrix for PIP objectives and action plan*/
				 
				 /*Declaring matrix for PIP action plan*/				
				 var pip_action_plan_matrix = new sap.ui.commons.layout.MatrixLayout({                  
	                 columns : 1,
	             	 width:"75%",    
	             	enabled:true,
	   	            visible:pipContext.pip_data.obj_action_visible,
	          }).addStyleClass("pip_obj_style").addStyleClass("matrix_row_color");
				 
				 pipContext.pip_action_plan_matrix = pip_action_plan_matrix;				 
			    /*End of matrix for PIP action plan*/
				 
				 
				 /*Declaring matrix for PIP Action plan header button*/			 
				  var pip_action_header_matrix = new sap.ui.commons.layout.MatrixLayout({   
		             	width:"75%", 
		             	columns : 2,
		             	widths:['40%','60%'],
		             	enabled:true,
		   	            //visible:pipContext.pip_data.obj_action_visible,
		          }).addStyleClass("others_appraisal_style").addStyleClass("pip_header_obj_style");
				    
				    
				    var pip_action_plan = new sap.m.Text({
						//width:"100%",
						text :'{i18n>PIP_ACTION_PLAN}',
						//visible:pipContext.pip_data.obj_action_visible,
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("title_text").addStyleClass("assign_obj_style").addStyleClass("assign_obj_bold");	
				    
				    var add_pip_action_btn = new sap.m.Button({
				    	type : "Emphasized",
						icon : "sap-icon://add",
						visible : pipContext.pip_data.obj_action_editable,
						text: '{i18n>ADD_ACTION}',
						press:oController.add_action
					    }).addStyleClass("add_obj_btn_style");	
				    
				    var add_pip_action_btn_2 = add_pip_action_btn.clone();		
				    
				    pipContext.add_pip_action_btn = add_pip_action_btn;
				    pipContext.add_pip_action_btn_2 = add_pip_action_btn_2;
				    
				    pip_action_header_matrix.createRow("","");
				    pip_action_header_matrix.createRow(pip_action_plan,add_pip_action_btn_2);			    
				    /*End of  matrix for PIP Action plan header button*/		
				    
				    /*Declaring matrix for PIP action plan footer button*/		
				    var pip_action_btn_matrix = new sap.ui.commons.layout.MatrixLayout({                  
		                 columns : 1,
		             	width:"75%",   
		             	 enabled:true,
		   	          visible: pipContext.pip_data.obj_action_editable,
		          }).addStyleClass("pip_obj_style").addStyleClass("pip_obj_add_style");
				    
				    pip_action_btn_matrix.createRow(add_pip_action_btn);	
					 /*End of matrix for PIP action plan footer button*/
				    
				    /*Declaring matrix for employee action plan comments*/			    
				    var emp_action_plan_matrix = new sap.ui.commons.layout.MatrixLayout({                  
		                 columns : 1,
		                 width:"75%",	
		   	             visible:pipContext.pip_data.action_emp_comments_visible,
		            }).addStyleClass("pip_action_emp_style");
				    
				    var emp_action_text = new sap.m.Text({
						width:"100%",
						text :'{i18n>PIP_ACTION_EMP_COMMENTS}',
						visible:pipContext.pip_data.action_emp_comments_visible,
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("title_text").addStyleClass("emp_signoff_content_style").addStyleClass("assign_obj_bold");
				    
				    
					var emp_action_div_cell = new sap.ui.commons.layout.MatrixLayoutCell({
						colSpan : 1 
					});
				    
				   var emp_action_div = new sap.ui.commons.HorizontalDivider({
		                  width: "100%",
		                  type: "Page",
		                  height: "Small"
		              }).addStyleClass("assign_objectives_divider");
				   
				   emp_action_div_cell.addContent(emp_action_div);	   
			
				   var expand_emp_action_plan = new sap.m.Link(
				    		{
				    			//text:"EXPAND TEXT FIELD",
				    			text :'{i18n>EXPAND_TEXT_FIELD}',
				    			visible:pipContext.pip_data.action_emp_comments_editable,
				    			 // width: "100%",
				    			press:function(evt)
				    	    	{
				    				pipContext.isCalledFromEmpActionPlan = true;
				    				pip_ns.openReadOnlyTextObj(evt);
				    	    	}
				    			}).addStyleClass("emp_signoff_content_style").addStyleClass("pip_action_expand_emp_margin");
				   
				   var emp_action_input = new sap.m.TextArea({
		                  width: "97%",
		                  editable: pipContext.pip_data.action_emp_comments_editable,
		                  //visible : pipContext.pip_data.action_emp_comments_visible,
		                  value : pipContext.action_emp_comments,
		                  rows: 2,		                 
		                  change : function()
		                  {
		                	  myPathContext.isEdited = true;
		                  }
		              }).addStyleClass("emp_signoff_content_style").addStyleClass("pip_evalution_style").addStyleClass("pip_action_emp_textarea_margin").addStyleClass("pip_float_left");
				   pipContext.emp_action_input = emp_action_input;
				   
				   /*Logic for employee action input visibility*/
				   emp_action_input_readOnly = new com.capgemini.mypath.util.MyPathText({
						   
			  		            	showLimit : 200,
			  		            	width: "100%",
			  		            	//visible:!pipContext.appraisal_data.objectives_comments_editable,
			  						text : pipContext.action_emp_comments,
			  						colsCount:250,
			  						showTextArea : true,
			  						}).addStyleClass("showMoreText").addStyleClass("showMoreTextPIP").addStyleClass("pip_action_emp_textarea_margin");
					   
					 
					   var  emp_action_input_control = null;
					   if(pipContext.pip_data.action_emp_comments_editable)
					   {
						   emp_action_input_control = emp_action_input;
					   }
					   else
					   {
						   emp_action_input_control = emp_action_input_readOnly;
					   }
					   
				   
				   emp_action_plan_matrix.createRow(emp_action_text);				   
				   emp_action_plan_matrix.createRow(emp_action_div_cell);
				   emp_action_plan_matrix.createRow(expand_emp_action_plan);
				   emp_action_plan_matrix.createRow(emp_action_input_control);			   
				   /*End of matrix for employee action plan comments*/
					 
				   /*Declaring matrix for PIP Progress*/				
					 var pip_progress_matrix = new sap.ui.commons.layout.MatrixLayout({                  
		                 columns : 1,
		             	 width:"75%",    
		             	enabled:true,
		   	            visible:pipContext.pip_data.progress_evaluation_visible,
		          }).addStyleClass("pip_obj_style").addStyleClass("matrix_row_color");
					 
					 pipContext.pip_progress_matrix = pip_progress_matrix;				 
				    /*End of matrix for PIP Progress*/
					 
					 /*Declaring matrix for PIP progress header button*/			 
					  var pip_progress_header_matrix = new sap.ui.commons.layout.MatrixLayout({   
			             	width:"75%", 
			             	columns : 2,
			             	widths:['40%','60%'],
			             	 enabled:true,
			   	          //visible:pipContext.pip_data.progress_evaluation_editable,
			          }).addStyleClass("others_appraisal_style").addStyleClass("pip_header_obj_style");
					    
					    
					    var pip_progress = new sap.m.Text({
							//width:"100%",
							text :'{i18n>PIP_PROGRESS_TEXT}',
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("title_text").addStyleClass("assign_obj_style").addStyleClass("assign_obj_bold");	
					    
					    var add_pip_progress_btn = new sap.m.Button({
					    	type : "Emphasized",
							icon : "sap-icon://add",
							visible :pipContext.pip_data.progress_evaluation_editable,
							text: '{i18n>ADD_PROGRESS}',
							press:oController.add_progress
						    }).addStyleClass("add_obj_btn_style");	
					    
					    var add_pip_progress_btn_2 = add_pip_progress_btn.clone();		
					    
					    pipContext.add_pip_progress_btn = add_pip_progress_btn;
					    pipContext.add_pip_progress_btn_2 = add_pip_progress_btn_2;
					    
					    pip_progress_header_matrix.createRow("","");
					    pip_progress_header_matrix.createRow(pip_progress,add_pip_progress_btn_2);			    
					    /*End of  matrix for PIP progress header button*/		
					    
					    /*Declaring matrix for PIP progress footer button*/		
					    var pip_progress_btn_matrix = new sap.ui.commons.layout.MatrixLayout({                  
			                 columns : 1,
			             	width:"75%",   
			             	 enabled:true,
			   	          visible:pipContext.pip_data.progress_evaluation_editable,
			          }).addStyleClass("pip_obj_style").addStyleClass("pip_obj_add_style");
					    
					    pip_progress_btn_matrix.createRow(add_pip_progress_btn);	
						 /*End of matrix for PIP progress footer button*/
					    
					    /*Declaring matrix for employee progress comments*/			    
					    var emp_progress_matrix = new sap.ui.commons.layout.MatrixLayout({                  
			                 columns : 1,
			                 width:"75%",	
			   	            visible:pipContext.pip_data.progress_emp_comments_visible,
			            }).addStyleClass("pip_action_emp_style");
					    
					    var emp_progress_text = new sap.m.Text({
							width:"100%",
							text :'{i18n>PIP_ACTION_EMP_COMMENTS}',
							visible:pipContext.pip_data.progress_emp_comments_visible,
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("title_text").addStyleClass("emp_signoff_content_style").addStyleClass("assign_obj_bold");
					    
						var emp_progress_div_cell = new sap.ui.commons.layout.MatrixLayoutCell({
							colSpan : 1 
						});
					    
					   var emp_progress_div = new sap.ui.commons.HorizontalDivider({
			                  width: "100%",
			                  type: "Page",
			                  height: "Small"
			              }).addStyleClass("assign_objectives_divider");
					   
					   emp_progress_div_cell.addContent(emp_progress_div);	   
				
					   
					   var emp_progress_input = new sap.m.TextArea({
			                  width: "99%",
			                  editable: pipContext.pip_data.progress_emp_comments_editable,
			                  visible : pipContext.pip_data.progress_emp_comments_visible,
			                  //value : pipContext.emp_signoff_comments,
			                  rows: 2,					                
			                  change : function()
			                  {
			                	 
			                  }
			              }).addStyleClass("emp_signoff_content_style");
					   pipContext.emp_progress_input = emp_progress_input;
					   
					   emp_progress_matrix.createRow(emp_progress_text);
					   emp_progress_matrix.createRow(emp_progress_div_cell);
					   emp_progress_matrix.createRow(emp_progress_input);			   
					   /*End of matrix for employee progress comments*/
				 
				 /*Declaring PIP Final comments matrix*/
				  var pip_signoff_matrix = new sap.ui.commons.layout.MatrixLayout({                  
		                 columns : 2,
		                 width:"75%",
		             	widths:['28%','80%'],		             
		   	           visible:pipContext.pip_data.hr_comments_visible,
		            }).addStyleClass("pip_signoff_style");				    
							   
				   
				   var pip_signoff_hr_comment = new sap.m.Text({
						width:"100%",
						text :'{i18n>PIP_HR_COMMENTS}',
						visible:pipContext.pip_data.hr_comments_visible,
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("title_text").addStyleClass("assign_obj_style").addStyleClass("assign_obj_bold");
				   
				   var pip_signoff_hr_expand = new sap.m.Link(
				    		{
				    			//text:"EXPAND TEXT FIELD",
				    			text :'{i18n>EXPAND_TEXT_FIELD}',
				    			visible:pipContext.pip_data.hr_comments_editable,
				    			 // width: "100%",
				    			press:function(evt)
				    	    	{
				    				pipContext.isCalledFromSignoff = true;
				    				pip_ns.openReadOnlyTextObj(evt);
				    	    	}
				    			}).addStyleClass("assign_obj_style").addStyleClass("text_align_left");
				   var pip_signoff_vlayout = new sap.ui.commons.layout.VerticalLayout({
					   width: "100%",
						content:[pip_signoff_hr_comment,pip_signoff_hr_expand]
					}).addStyleClass("displayLinkMatrixStyle");
				   
				   
				   var pip_signoff_hr_comments_input = new sap.m.TextArea({
		                  value: pipContext.final_hr_comments,
		                  width: "100%",
		                  //visible:pipContext.pip_data.hr_comments_visible,
		                  editable:pipContext.pip_data.hr_comments_editable,
		                  change:function()
		                  {
		                	  myPathContext.isEdited = true;
		                  },
		                  value : pipContext.final_hr_comments,
		                  rows: 4,				                
		                  
		              });
				   
				   pipContext.pip_signoff_hr_comments_input = pip_signoff_hr_comments_input;
				   
				   /*Logic for employee action input visibility*/
				   pip_signoff_hr_comments_readOnly = new com.capgemini.mypath.util.MyPathText({
						   
			  		            	showLimit : 200,
			  		            	width: "99%",
			  		            	//visible:!pipContext.appraisal_data.objectives_comments_editable,
			  						text :pipContext.final_hr_comments,
			  						showTextArea : true,
			  						}).addStyleClass("showMoreText").addStyleClass("showMoreTextPIPHRComments");
					   
					 
					   var  pip_signoff_hr_comments_control = null;
					   if(pipContext.pip_data.hr_comments_editable)
					   {
						   pip_signoff_hr_comments_control = pip_signoff_hr_comments_input;
					   }
					   else
					   {
						   pip_signoff_hr_comments_control = pip_signoff_hr_comments_readOnly;
					   }
					   
						var reviewer_indicator_text_cell = new sap.ui.commons.layout.MatrixLayoutCell({
							colSpan : 2 
						});
						
						 var reviewer_indicator_text = new sap.m.Text({
								width:"100%",
								text :'{i18n>SBU_DEFINE}',
								visible:pipContext.pip_data.reviewer_ind_visible,
								textDirection: sap.ui.core.TextDirection.LTR
							}).addStyleClass("title_text").addStyleClass("review_ind_text_style").addStyleClass("assign_obj_bold");
						 
						 reviewer_indicator_text_cell.addContent(reviewer_indicator_text);	   
				   
				   var pip_signoff_reviewer_indicator = new sap.m.Text({
						width:"100%",
						text :'{i18n>PIP_REVIEW_INDICATOR}',
						visible:pipContext.pip_data.reviewer_ind_visible,
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("title_text").addStyleClass("assign_obj_style").addStyleClass("assign_obj_bold");
				   
				   var reviewer_indicator_dropdown = new sap.ui.commons.DropdownBox(
						   {
							   visible:pipContext.pip_data.reviewer_ind_visible,
							   enabled:pipContext.pip_data.reviewer_ind_editable,
							   items:pipContext.reviewer_indicator_array,
							   selectedKey:"",
							   change:function()
							    {
									myPathContext.isEdited = true;
							    },
							   value:pipContext.reviewer_indicator
						   }).addStyleClass("pip_float_left");		
				   pipContext.reviewer_indicator_dropdown = reviewer_indicator_dropdown;
				   
				   pip_signoff_matrix.createRow("","");			
				   pip_signoff_matrix.createRow(pip_signoff_vlayout,pip_signoff_hr_comments_control);
				   pip_signoff_matrix.createRow("","");
				   pip_signoff_matrix.createRow(reviewer_indicator_text_cell);
				   pip_signoff_matrix.createRow(pip_signoff_reviewer_indicator,reviewer_indicator_dropdown);
				   /*End of PIP Final comments matrix*/
				   
				   /*Declaring matrix for PIP Evaluation*/				
					 var pip_evaluation_matrix = new sap.ui.commons.layout.MatrixLayout({                  
		                 columns : 1,
		             	 width:"75%",    
		             	enabled:true,
		   	            visible:pipContext.pip_data.progress_evaluation_visible,
		          }).addStyleClass("pip_obj_style").addStyleClass("pip_margin_top").addStyleClass("matrix_row_color");
					 
					 pipContext.pip_evaluation_matrix = pip_evaluation_matrix;				 
				    /*End of matrix for PIP Evaluation*/
				   
				 /*Declaring matrix for PIP header button*/			 
				  var pip_obj_header_matrix = new sap.ui.commons.layout.MatrixLayout({   
		             	width:"75%", 
		             	columns : 2,
		             	widths:['40%','60%'],
		             	enabled:true,
		   	          visible:pipContext.pip_data.obj_action_visible,
		          }).addStyleClass("others_appraisal_style").addStyleClass("pip_header_obj_style");
				    
				    
				    var pip_objectives = new sap.m.Text({
						//width:"100%",
						text :'{i18n>OBJECTIVES}',
						//visible:pipContext.pip_data.obj_action_editable,
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("title_text").addStyleClass("assign_obj_style").addStyleClass("assign_obj_bold");	
				    
				    var add_pip_obj_btn = new sap.m.Button({
				    	type : "Emphasized",
						icon : "sap-icon://add",
						visible : pipContext.pip_data.obj_action_editable,
						text: '{i18n>ADD_ADDITIONAL_OBJECTIVE}',
						press:oController.add_obj
					    }).addStyleClass("add_obj_btn_style");	
				    
				    var add_pip_obj_btn_2 = add_pip_obj_btn.clone();	
				    
				    pipContext.add_pip_obj_btn = add_pip_obj_btn;
				    pipContext.add_pip_obj_btn_2 = add_pip_obj_btn_2;
				    
				    pip_obj_header_matrix.createRow("","");
				    pip_obj_header_matrix.createRow(pip_objectives,add_pip_obj_btn_2);				    
				    /*End of  matrix for PIP header button*/		
				    
				    /*Declaring matrix for PIP objectives footer button*/		
				    var pip_obj_btn_matrix = new sap.ui.commons.layout.MatrixLayout({                  
		                 columns : 1,
		             	width:"75%",   
		             	 enabled:true,
		   	          visible:pipContext.pip_data.obj_action_editable,
		          }).addStyleClass("pip_obj_style").addStyleClass("pip_obj_add_style");
				    
					 pip_obj_btn_matrix.createRow(add_pip_obj_btn);	
					 /*End of matrix for PIP objectives footer button*/
		   
		   /*Declaring footer buttons*/ 
					 
			/*Declaring pair 1*/		 
		    var cancel_btn = new sap.m.Button({
		    width : "50%",
			text: '{i18n>CANCEL}',
			press: oController.perform_cancel,
			visible : true,//pipContext.appraisal_data.footer_btn_visible,
		    }).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");	    
		
		    
		    var next_btn = new sap.m.Button({
			    width : "50%",
				text: '{i18n>NEXT}',
				visible : true,//pipContext.appraisal_data.footer_btn_visible,
				press:oController.createPip
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");		
		    /*End of pair 1*/
		    
		    /*Declaring pair 2*/
		    var obj_setting_save_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSAVE.toUpperCase(),//myPathContext.buttonText.ZSAVE.toUpperCase(),
				press: function()
				{
					pipContext.isCalledFromChangeStatus = false;
				    
					showBusy();
					setTimeout(function(){
						pip_ns.save_PIP();
					}, 0);
					//pip_ns.save_PIP();/*SAVE*/
				},
				visible : pipContext.pip_data.obj_save_sendToHr_btn_flag,
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
		    
		    pipContext.obj_setting_save_btn = obj_setting_save_btn;
		    
		    var obj_setting_send_to_hr_btn = new sap.m.Button({
			    width : "50%",
				text:  myPathContext.buttonText.ZSEND_TOHRC.toUpperCase(),//"SEND TO HR",
				press: function()
				{
					showBusy();
					setTimeout(function(){
						pip_ns.changePIPDocStatus("ZSEND_TOHRC");/*ZSEND_TOHRC*/
					}, 0);
				},
				visible : pipContext.pip_data.obj_save_sendToHr_btn_flag,
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		    
		    pipContext.obj_setting_send_to_hr_btn = obj_setting_send_to_hr_btn;
		    /*End of pair 2*/
		    
		    /*Declaring pair 3*/
		    var obj_setting_send_rev_signoff_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSENDREV_SIGNOF.toUpperCase(),//"SEND TO REVIEWER FOR SIGNOFF",
				//press: appraisal_ns.save_Objectives,/*ZSENDREV_SIGNOF*/
				press: function()
				{
					showBusy();
					setTimeout(function(){
						pip_ns.changePIPDocStatus("ZSENDREV_SIGNOF");/*ZSEND_TOHRC*/
					}, 0);
				},
				visible : pipContext.pip_data.obj_backToRev_signoffToRev_flag,
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		    
		    var obj_setting_return_rev_updates_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZRETURN_REV.toUpperCase(),//"RETURN TO REVIEWER FOR UPDATES",
				press: function()
				{
					showBusy();
					setTimeout(function(){
						pip_ns.changePIPDocStatus("ZRETURN_REV");/*ZRETURN_REV*/
					}, 0);
				},
				visible : pipContext.pip_data.obj_backToRev_signoffToRev_flag,
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
		    /*End of pair 3*/
		    
		    /*Declaring pair 4*/
		    /*var obj_setting_rev_save_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSAVE.toUpperCase(),
				press: function()
				{
					pip_ns.save_PIP();
				},
				visible : pipContext.pip_data.obj_save_sendToEmp_flag,
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");*/
		    
		    var final_comments_cancel_signoff_btn = new sap.m.Button({
			    width : "50%",
			    text: '{i18n>CANCEL}',
				press: oController.perform_cancel,
				visible : pipContext.pip_data.obj_save_sendToEmp_flag,
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
		    
		    var obj_setting_send_to_emp_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSEN_EMPLOYEE.toUpperCase(),//"SEND TO EMPLOYEE",
				press: function()
				{	
					showBusy();
				     setTimeout(function(){
				    	 pip_ns.changePIPDocStatus("ZSEN_EMPLOYEE");/*ZSEN_EMPLOYEE*/
				     }, 0);
				},
				visible : pipContext.pip_data.obj_save_sendToEmp_flag,
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		    
		  /*  var final_cancel_btn_visible = false;
		    
		    if((myPathContext.subStatus=="I" && myPathContext.docStatus=="2") || (myPathContext.subStatus=="Y" && myPathContext.docStatus=="4"))
		    {
		    	if(myPathContext.isReviewer==false && myPathContext.isPartAppraiser==false)
		    	{
		    	  final_cancel_btn_visible = true;
		    	}
		        else
		        {
		        	final_cancel_btn_visible = false;
		        }
		    }
		    
		    var final_cancel_btn = new sap.m.Button({
			    width : "50%",
			    text: '{i18n>CANCEL}',
				press: oController.perform_cancel,
				visible :final_cancel_btn_visible,
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");*/
		    
		    /*End of pair 4*/
		    
		    /*Declaring pair 5*/
		    var obj_setting_emp_save_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSAVE.toUpperCase(),
				press: function()
				{
					pipContext.isCalledFromChangeStatus = false;
					showBusy();
				     setTimeout(function(){
				    	 pip_ns.save_PIP();
				     }, 0);
				},
				visible : pipContext.pip_data.obj_save_signoff_emp_flag,
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
		    
		    var obj_setting_emp_signoff_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSIGN_OFF.toUpperCase(),//"SIGNOFF",
				press: function()
				{
					showBusy();
				     setTimeout(function(){
					pip_ns.changePIPDocStatus("ZSIGN_OFF");/*ZSIGN_OFF*/
				     }, 0);
				},
				visible : pipContext.pip_data.obj_save_signoff_emp_flag,
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		    /*End of pair 5*/
		    
		    /*Declaring pair 6*/
		    var assessment_send_to_hr_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSEND_TOHRC.toUpperCase(),//"SEND TO HR",
				//press: appraisal_ns.save_Objectives,/*ZSEND_TOHRC*/
				press: function()
				{
					showBusy();
				     setTimeout(function(){
					   pip_ns.changePIPDocStatus("ZSEND_TOHRC");
				     }, 0);
				},
				visible : pipContext.pip_data.assessment_sendToHR_sendToEmp_flag,
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
		    
		    var assessment_send_to_emp_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSEN_EMPLOYEE.toUpperCase(),//"SEND TO EMPLOYEE",
				press: function()
				{
					showBusy();
			     setTimeout(function(){
					pip_ns.changePIPDocStatus("ZSEN_EMPLOYEE");/*ZSEN_EMPLOYEE*/
			     }, 0);
				},
				visible :pipContext.pip_data.assessment_sendToHR_sendToEmp_flag,
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		    /*End of pair 6*/
		    
		    /*Declaring pair 7*/
		    var assessment_emp_save_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSAVE.toUpperCase(),
				press: function()
				{
					pipContext.isCalledFromChangeStatus = false;
					showBusy();
				     setTimeout(function(){
				    	 pip_ns.save_PIP();
				     }, 0);
				},
				visible : pipContext.pip_data.assessment_save_sendToReviewer_flag,
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
		    
		    var assessment_emp_send_to_rev_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSEND_REVIEWER.toUpperCase(),//"SEND TO REVIEWER",
				press: function()
				{
					showBusy();
				     setTimeout(function(){
					pip_ns.changePIPDocStatus("ZSEND_REVIEWER");/*ZSEND_REVIEWER*/
				     }, 0);
				},
				visible :pipContext.pip_data.assessment_save_sendToReviewer_flag,
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		    /*End of pair 7*/
		    
		    /*Declaring pair 8*/
		    var assessment_hr_send_to_rev_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSEND_REVIEWER.toUpperCase(),//"SEND TO REVIEWER",				
				press: function()
				{showBusy();
			     setTimeout(function(){
					pip_ns.changePIPDocStatus("ZSEND_REVIEWER");
			     }, 0);
				},
				visible : pipContext.pip_data.assessment_sendToReviewer_complete_flag,
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
		    
		    var assessment_hr_signoff = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.COMPLETE.toUpperCase(),//"COMPLETE",
				press: function()
				{
					showBusy();
				     setTimeout(function(){
					pip_ns.changePIPDocStatus("ZPIP_COMP");/*ZPIP_COMP*/
				     }, 0);
				},
				visible : pipContext.pip_data.assessment_sendToReviewer_complete_flag,
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		    /*End of pair 8*/
		    
		    /*End of footer buttons*/
			
		    /*Attachment and pdf icons*/
		    var pdfIcon = new sap.m.Image({
				src : pip_ns.url_app+"com/capgemini/mypath/pip/images/pdf_icon.png",
				width : "30px", 
				height : "30px",
				visible: pipContext.pip_data.action_plan_tab_visible_flag,
				press :function(oEvent) {
					displayPrintDocument(myPathContext.documentId);
				}
		   
			}).addStyleClass("pippdfImage");		 
		    pipContext.pdfIcon = pdfIcon;	    
		    
		    var attachmentIcon = new sap.m.Image({
				src : pip_ns.url_app+"com/capgemini/mypath/pip/images/attachment_icon.png",
				width : "30px", 
				height : "30px",
				visible: pipContext.pip_data.attachment_icon_visible,
				press : function()
				{
					pipContext.isCalledFromPIP = true;
					openUploadDownload();
				}
			}).addStyleClass("attachmentImageAppraisal");

		    pipContext.attachmentIcon = attachmentIcon;
		 
		    var pip_count_visible = pipContext.doc_count > 0 && pipContext.pip_data.attachment_icon_visible;
			var attachment_count = new sap.m.Text({						
				text : pipContext.doc_count,
				visible:pip_count_visible,//(pipContext.doc_count > 0 && pipContext.pip_data.attachment_icon_visible) == true ? true : false,				
			}).addStyleClass("header_link_number_blue").addStyleClass("appraisal_header_link_number_blue")/*.addStyleClass("pip_header_link_number_blue")*/;
			pipContext.attachment_count = attachment_count;
			
			attachment_count.attachBrowserEvent("click", function() {
				pipContext.isCalledFromPIP = true;
				openUploadDownload();
			});
			
			var vlayout_attachment = new sap.ui.commons.layout.VerticalLayout({
				visible:pipContext.pip_data.attachment_icon_visible,
				content:[attachment_count,attachmentIcon]
			}).addStyleClass("top_panel_image_content").addStyleClass("appraisal_top_panel_image_content").addStyleClass("pip_top_panel_image_content");
			
			pipContext.vlayout_attachment = vlayout_attachment;		     
			  /*End of attachment and pdf icons*/
			
		 /**********************Date logic for top matrix*********************/
					
	var path_from_date = new Date(myPathContext.validFromISO);
	//path_from_date.setTime( path_from_date.getTime() + path_from_date.getTimezoneOffset()*60*1000 );
	 
		
	
	var path_to_date = new Date(myPathContext.validToISO);
	//path_to_date.setTime(path_to_date.getTime() + path_to_date.getTimezoneOffset()*60*1000 );

		
		var pip_hidden_from_date = new sap.m.DatePicker({
			visible:false,
			width:"35%",			
		});
		
		pipContext.pip_hidden_from_date = pip_hidden_from_date;
		pipContext.pip_hidden_from_date.setDateValue(path_from_date);
		
		var pip_hidden_to_date = new sap.m.DatePicker({
			visible:false,
			width:"35%",			
		});
	    
		pipContext.pip_hidden_to_date = pip_hidden_to_date;
		pipContext.pip_hidden_to_date.setDateValue(path_to_date);
			 
	 
		
		pipContext.from_date.setText(pipContext.pip_hidden_from_date.getValue());
		pipContext.to_date.setText(pipContext.pip_hidden_to_date.getValue());
		
		   /**********************End of Date logic for top matrix*********************/    
		 
		/*Code for cancel and next buttons for all tabs*/
		 var obj_cancel_btn = new sap.m.Button({
			    width : "50%",
				text: '{i18n>CANCEL}',
				press: oController.perform_cancel,
				visible : pipContext.pip_data.obj_cancel_next_btn_flag
			    }).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");	    
			
		  var obj_save_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSAVE.toUpperCase(),//myPathContext.buttonText.ZSAVE.toUpperCase(),
				press: function()
				{
					pipContext.isCalledFromChangeStatus = false;
					pipContext.isMandatoryCheckReq = false;
					showBusy();
					setTimeout(function(){
						pip_ns.save_PIP();
					}, 0);
					//pip_ns.save_PIP();/*SAVE*/
				},
				visible : pipContext.pip_data.obj_action_editable,
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
		  
		  pipContext.obj_save_btn = obj_save_btn;
			    
			    var obj_next_btn = new sap.m.Button({
				    width : "50%",
					text: '{i18n>NEXT}',
					visible : pipContext.pip_data.obj_cancel_next_btn_flag,
					press:function()
					{
						pipContext.isActionTabClicked = true;
						pipContext.action_pip_tab.setEnabled(true);
						pipContext.pip_tabstrip.setSelectedKey("action_pip_tab");
					}
				}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");	
			    
			    pipContext.obj_next_btn = obj_next_btn;
			    
			  
			    
			    
			    
			    var action_cancel_btn = new sap.m.Button({
				    width : "50%",
					text: '{i18n>CANCEL}',
					press: oController.perform_cancel,
					visible : pipContext.pip_data.action_cancel_next_btn_flag
				    }).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
			    
			    var action_save_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZSAVE.toUpperCase(),//myPathContext.buttonText.ZSAVE.toUpperCase(),
					press: function()
					{
						pipContext.isCalledFromChangeStatus = false;
					    
						showBusy();
						setTimeout(function(){
							pip_ns.save_PIP();
						}, 0);
						//pip_ns.save_PIP();/*SAVE*/
					},
					visible : (pipContext.pip_data.obj_action_editable || pipContext.pip_data.action_emp_comments_editable),
				}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
				
				    
				    var action_next_btn = new sap.m.Button({
					    width : "50%",
						text: '{i18n>NEXT}',
						visible : pipContext.pip_data.action_cancel_next_btn_flag,
						press:function()
						{
							//when there are only 3 tabs present and Final tab is at 3rd position
							if(pipContext.pip_data.progress_tab_visible_flag == false && pipContext.pip_data.evaluation_tab_visible_flag == false)
								pipContext.isFinalTabClicked = true;
							
							//when there are 5 tabs present and Final tab is at 3rd position
							else
							pipContext.isProgressTabClicked = true;
							
							//pipContext.isCalledFromChangeStatus = true;
							//pip_ns.save_PIP();
							// if(pipContext.isPIPSaved == true)
							// {
								if(!(pipContext.pip_data.progress_tab_visible_flag == false && pipContext.pip_data.evaluation_tab_visible_flag == false))	
								{
								 pipContext.progress_pip_tab.setEnabled(true);
								 pipContext.pip_tabstrip.setSelectedKey("progress_pip_tab");
								}
								else
								{
									pipContext.final_pip_tab.setEnabled(true);
									pipContext.pip_tabstrip.setSelectedKey("final_pip_tab");
								}
							// }
							
						}
					}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");	
				    
				    pipContext.action_next_btn =action_next_btn;
				    
				    var progress_cancel_btn = new sap.m.Button({
					    width : "50%",
						text: '{i18n>CANCEL}',
						press: oController.perform_cancel,
						visible : pipContext.pip_data.progress_cancel_next_btn_flag,
					    }).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");	    
					
					    
				    var progress_save_btn = new sap.m.Button({
					    width : "50%",
						text: myPathContext.buttonText.ZSAVE.toUpperCase(),//myPathContext.buttonText.ZSAVE.toUpperCase(),
						press: function()
						{
							pipContext.isCalledFromChangeStatus = false;
						    
							showBusy();
							setTimeout(function(){
								pip_ns.save_PIP();
							}, 0);
							//pip_ns.save_PIP();/*SAVE*/
						},
						visible : (pipContext.pip_data.progress_evaluation_editable || pipContext.pip_data.progress_emp_comments_editable),
					}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
				    
					    var progress_next_btn = new sap.m.Button({
						    width : "50%",
							text: '{i18n>NEXT}',
							visible : pipContext.pip_data.progress_cancel_next_btn_flag,
							press:function()
							{
								
								pipContext.isPIPSaved = false;
								pipContext.isCalledFromChangeStatus = true;
								pip_ns.save_PIP();
								if(pipContext.isPIPSaved == true)
								{
									pipContext.isEvaluationTabClicked = true;
									pipContext.evaluation_pip_tab.setEnabled(true);
									pipContext.pip_tabstrip.setSelectedKey("evaluation_pip_tab");
								}
								else
								{
									pipContext.isEvaluationTabClicked = false;
									pipContext.pip_tabstrip.setSelectedKey("progress_pip_tab");
								}
							}
						}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");	
					    
					    pipContext.progress_next_btn = progress_next_btn;
					    
					    var evaluation_cancel_btn = new sap.m.Button({
						    width : "50%",
							text: '{i18n>CANCEL}',
							press: oController.perform_cancel,
							visible :pipContext.pip_data.evaluation_cancel_next_btn_flag
						    }).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");	    
						
					    var evaluation_save_btn = new sap.m.Button({
						    width : "50%",
							text: myPathContext.buttonText.ZSAVE.toUpperCase(),//myPathContext.buttonText.ZSAVE.toUpperCase(),
							press: function()
							{
								pipContext.isCalledFromChangeStatus = false;
								pipContext.isMandatoryCheckReq = false;
								showBusy();
								setTimeout(function(){
									pip_ns.save_PIP();
								}, 0);
								//pip_ns.save_PIP();/*SAVE*/
							},
							visible : (pipContext.pip_data.evaluation_achieved_editable || pipContext.pip_data.progress_emp_comments_editable),
						}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
					    
						    var evaluation_next_btn = new sap.m.Button({
							    width : "50%",
								text: '{i18n>NEXT}',
								visible : pipContext.pip_data.evaluation_cancel_next_btn_flag,
								press:function()
								{
									pipContext.isFinalTabClicked = true;
									pipContext.final_pip_tab.setEnabled(true);
									pipContext.pip_tabstrip.setSelectedKey("final_pip_tab");
								}
							}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");	
						    
						    pipContext.evaluation_next_btn = evaluation_next_btn;
		/*End of code for cancel and next buttons for all tabs*/
		
			
			/*Code of PIP tab*/
			 var create_pip_tab = new sap.m.IconTabFilter({
		          text: '{i18n>CREATE_PIP}',
		          key:"create_pip_tab",
		          count:1,
		          enabled:true,
		          visible:pipContext.pip_data.substatus==""?true:false,//!pipContext.appraisal_data.other_tab_visible,
		          content: [create_pip_matrix,cancel_btn,next_btn]
		        });
			 pipContext.create_pip_tab = create_pip_tab;
			 
			 
			 var obj_pip_tab = new sap.m.IconTabFilter({
		          text: '{i18n>OBJECTIVES}',
		          key:"obj_pip_tab",
		          count:1,
		          enabled:true,
		          visible:pipContext.pip_data.obj_tab_visible_flag,
		          content: [pip_details_matrix,pip_obj_header_matrix,pip_obj_action_matrix,pip_obj_btn_matrix,obj_cancel_btn,obj_save_btn,obj_next_btn/*,obj_setting_save_btn,obj_setting_send_to_hr_btn*/]
		        });
			 pipContext.obj_pip_tab = obj_pip_tab;
			 
			 
			 var action_pip_tab = new sap.m.IconTabFilter({
		          text: '{i18n>PIP_ACTION}',
		          key:"action_pip_tab",
		          count:2,
		          enabled:true,
		          visible:pipContext.pip_data.action_plan_tab_visible_flag,
		          content: [pip_details_matrix1,pip_action_plan_matrix,pip_action_header_matrix,pip_action_plan_matrix,pip_action_btn_matrix,emp_action_plan_matrix,action_cancel_btn,action_next_btn,obj_setting_save_btn,action_save_btn,obj_setting_send_to_hr_btn]
		        });
			  pipContext.action_pip_tab = action_pip_tab;
			  
			  var progress_pip_tab = new sap.m.IconTabFilter({
		          text: '{i18n>PIP_PROGRESS}',
		          key:"progress_pip_tab",
		          count:3,
		          enabled:true,
		          visible:pipContext.pip_data.progress_tab_visible_flag,
		          content: [pip_details_matrix2,pip_progress_header_matrix,pip_progress_matrix,pip_progress_btn_matrix,progress_cancel_btn,progress_save_btn,progress_next_btn]
		        });
			  pipContext.progress_pip_tab = progress_pip_tab;
			  
			  var evaluation_pip_tab = new sap.m.IconTabFilter({
		          text: '{i18n>PIP_EVALUATION}',
		          key:"evaluation_pip_tab",
		          count:4,
		          enabled:true,
		          visible:pipContext.pip_data.evaluation_tab_visible_flag,
		          content: [pip_details_matrix3,pip_evaluation_matrix,evaluation_cancel_btn,evaluation_save_btn,evaluation_next_btn]
		        });
			  pipContext.evaluation_pip_tab = evaluation_pip_tab;
			  
			  var final_pip_tab = new sap.m.IconTabFilter({
		          text: '{i18n>PIP_FINAL_COMMENTS}',
		          key:"final_pip_tab",
		          count:(pipContext.pip_data.progress_tab_visible_flag == false && pipContext.pip_data.evaluation_tab_visible_flag == false)? 3:5,
		          enabled:true,
		          visible:pipContext.pip_data.final_tab_visible_flag,
		          content: [pip_details_matrix4,pip_signoff_matrix,obj_setting_send_rev_signoff_btn,obj_setting_return_rev_updates_btn,final_comments_cancel_signoff_btn,obj_setting_send_to_emp_btn,obj_setting_emp_save_btn,obj_setting_emp_signoff_btn,assessment_send_to_hr_btn,assessment_send_to_emp_btn,assessment_emp_save_btn,assessment_emp_send_to_rev_btn,assessment_hr_send_to_rev_btn,assessment_hr_signoff/*,final_cancel_btn*/]
		        });
			  pipContext.final_pip_tab = final_pip_tab;
			 
			 
			 
				var pip_tabstrip = new sap.m.IconTabBar({
				      expanded: !jQuery.device.is.phone,
				      expandable : false,
				      select://oController.next_assignment_features,
					      function()
					      {
				    	    pip_ns.tab_Nav_PIP(this);				    	  
				    	  },
				      items: [create_pip_tab,obj_pip_tab,action_pip_tab,progress_pip_tab,evaluation_pip_tab,final_pip_tab]
				    }).addStyleClass("myPathAppraisalTabBar").addStyleClass("appraisalTabStyle");
				
				pipContext.pip_tabstrip = pip_tabstrip;
				
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
							
							if(pipContext.isCalledFromObjMatrix == true)
							{
								pipContext.obj_text_area_ref.setValue("");
								pipContext.obj_text_area_ref.setValue(pipContext.overlay_text.getValue());
							}	
							
							if(pipContext.isCalledFromActionMatrix == true)
							{
								pipContext.obj_text_area_ref.setValue("");
								pipContext.obj_text_area_ref.setValue(pipContext.overlay_text.getValue());
							}	
							
							if(pipContext.isCalledFromProgressMatrix == true)
							{
								pipContext.obj_text_area_ref.setValue("");
								pipContext.obj_text_area_ref.setValue(pipContext.overlay_text.getValue());
							}	
							if(pipContext.isCalledFromEmpActionPlan == true)
							{
								pipContext.emp_action_input.setValue("");							  
								pipContext.emp_action_input.setValue(pipContext.overlay_text.getValue());
							}	
							
							if(pipContext.isCalledFromSignoff == true)
							{
								pipContext.pip_signoff_hr_comments_input.setValue("");							  
								pipContext.pip_signoff_hr_comments_input.setValue(pipContext.overlay_text.getValue());
								
							}
							
							pipContext.isCalledFromObjMatrix = false;
							pipContext.isCalledFromObjPer = false;
							pipContext.isCalledFromObjFb = false;
							pipContext.isCalledFromObjReq = false;
							pipContext.isCalledFromActionMatrix = false;
							pipContext.isCalledFromProgressMatrix = false;
							pipContext.isCalledFromProgressRev = false;
							pipContext.isCalledFromProgressEmp = false;
							pipContext.isCalledFromEmpActionPlan = false;
							pipContext.isCalledFromSignoff = false;
						
							this.close(); 
						}.bind(this));
					}
				};
				$(function() {
					  $('body').on('click', '#sap-ui-blocklayer-popup', function() {
						  
						  if(pipContext.isCalledFromObjMatrix == true)
							{
								pipContext.obj_text_area_ref.setValue("");
							  
							  if(pipContext.overlay_text.getValue().toString().trim()!="")
								  pipContext.obj_text_area_ref.setValue(pipContext.overlay_text.getValue());
							}	
						  
						  if(pipContext.isCalledFromActionMatrix == true)
							{
								pipContext.obj_text_area_ref.setValue("");
							  
							  if(pipContext.overlay_text.getValue().toString().trim()!="")
								  pipContext.obj_text_area_ref.setValue(pipContext.overlay_text.getValue());
							}	
						  
						  if(pipContext.isCalledFromProgressMatrix == true)
							{
								pipContext.obj_text_area_ref.setValue("");
							  
							  if(pipContext.overlay_text.getValue().toString().trim()!="")
								  pipContext.obj_text_area_ref.setValue(pipContext.overlay_text.getValue());
							}	
						  if(pipContext.isCalledFromEmpActionPlan == true)
							{
							  pipContext.emp_action_input.setValue("");
							  
							  if(pipContext.overlay_text.getValue().toString().trim()!="")
								  pipContext.emp_action_input.setValue(pipContext.overlay_text.getValue());
							}	
						  
						  if(pipContext.isCalledFromSignoff == true)
							{
							  pipContext.pip_signoff_hr_comments_input.setValue("");
							  
							  if(pipContext.overlay_text.getValue().toString().trim()!="")
								  pipContext.pip_signoff_hr_comments_input.setValue(pipContext.overlay_text.getValue());
							}
						  
						    pipContext.isCalledFromObjMatrix = false;
							pipContext.isCalledFromObjPer = false;
							pipContext.isCalledFromObjFb = false;
							pipContext.isCalledFromObjReq = false;
							pipContext.isCalledFromActionMatrix = false;
							pipContext.isCalledFromProgressMatrix = false;
							pipContext.isCalledFromProgressRev = false;
							pipContext.isCalledFromProgressEmp = false;
							pipContext.isCalledFromEmpActionPlan = false;
							pipContext.isCalledFromSignoff = false;
						
						  dlg.close();
					  });
					});
				
				
				pipContext.overlay_text = overlay_text;
				pipContext.dlg = dlg;	
			    
			    /*end of declaring overlay and text area for expand text field link*/
				
			this.addContent(pip_tabstrip);
			this.addContent(vlayout_attachment);
			this.addContent(pdfIcon);	
			this.addContent(pipContext.pip_workFlow1);
			this.addContent(pipContext.pip_workFlow2);
			
			//Adding footer buttons
		/*	this.addContent(obj_setting_save_btn);
			this.addContent(obj_setting_send_to_hr_btn);
			this.addContent(obj_setting_send_rev_signoff_btn);
			this.addContent(obj_setting_return_rev_updates_btn);
			this.addContent(obj_setting_rev_save_btn);
			this.addContent(obj_setting_send_to_emp_btn);
			this.addContent(obj_setting_emp_save_btn);
			this.addContent(obj_setting_emp_signoff_btn);
			this.addContent(assessment_send_to_hr_btn);
			this.addContent(assessment_send_to_emp_btn);
			this.addContent(assessment_emp_save_btn);
			this.addContent(assessment_emp_send_to_rev_btn);
			this.addContent(assessment_hr_send_to_rev_btn);
			this.addContent(assessment_hr_signoff);*/
			
	}

});