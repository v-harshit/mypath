sap.ui.jsview("com.capgemini.mypath.feedback.view.create_feedback", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.feedback.view.create_feedback
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.feedback.view.create_feedback";
	}, 

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.feedback.view.create_feedback
	*/ 
	createContent : function(oController) {
		
		var top_panel = new sap.m.Panel({	 		
		}).addStyleClass("panel_header");	
		
		
		var create_feedback_matrix = new sap.ui.commons.layout.MatrixLayout({
			columns : 5,
			width:"75%",
			widths : ['1%','22%','1%','32%','19%']}).addStyleClass("create_feedback_style");
	
		var feedback_for_label = new sap.m.Text({
			width:"100%",
			text :'{i18n>FEEDBACK_FOR}',
			textDirection: sap.ui.core.TextDirection.RTL 
		}).addStyleClass("title_text");	
		
		
		 
		var employee_rb = new sap.m.RadioButton({
	        groupName: "rbgrp",
	        text: myPathContext.i18nModel.getProperty("EMPLOYEE")+" "+myPathContext.employeeName,
	        selected: true,
	        select:oController.employee_selected
	    });
	    
	    
	    var other_employee_rb = new sap.m.RadioButton({
	        groupName: "rbgrp",
	        text: '{i18n>OTHER_EMPLOYEES}',	        
	        select:oController.other_selected
	    });
	    
	    var feedback_divider_cell = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan : 4 
		});
	    var feedback_divider = new sap.ui.commons.HorizontalDivider({
	    	  width: "100%",
	          type: "Page",
	          height: "Small"
            }).addStyleClass("divider_style");
	    feedback_divider_cell.addContent(feedback_divider);
	    
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
	    
	    feedbackContext.title_input = title_input;
	    
	    var validity_period_label = new sap.m.Label({
				width:"100%",
				text :'{i18n>VALIDITY_PERIOD}',
				textDirection: sap.ui.core.TextDirection.LTR,
				textAlign : sap.ui.core.TextAlign.Right
		}).addStyleClass("title_text");
	    
	    validity_period_label.setRequired(true);
	    
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
		
		var feedback_from_date = new sap.m.DatePicker({
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
		}).setModel(from_model).addStyleClass("date_cell_style");
		
		feedbackContext.feedback_from_date = feedback_from_date;
		
		 var to_label = new sap.m.Label({
				text :'{i18n>TO}',
				textDirection: sap.ui.core.TextDirection.LTR,
				textAlign : sap.ui.core.TextAlign.Right,
				required:true
			}).addStyleClass("to_label_style").addStyleClass("title_text").addStyleClass("date_cell_style");

	    
	    var feedback_to_date = new sap.m.DatePicker({
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
	    
	    feedbackContext.feedback_to_date = feedback_to_date;
	    validityPeriodCell.addContent(feedback_from_date);
	    validityPeriodCell.addContent(to_label);	  
	    validityPeriodCell.addContent(feedback_to_date);
	    
		 
    	
	    var feedback_provider_label = new sap.ui.commons.Label({
			//width:"100%",
			text :'{i18n>FEEDBACK_PROVIDER}',
			required:true,
			//requiredAtBegin :true,
			textDirection: sap.ui.core.TextDirection.RTL,
			textAlign : sap.ui.core.TextAlign.Left
		}).addStyleClass("title_text").addStyleClass("feedback_provider_label_style").addStyleClass("underline_style");

	    feedback_provider_label.setTooltip(myPathContext.createCallout(myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO1") + myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO2")));
	    
	   // feedback_provider_label.setTooltip(myPathContext.createCallout
	    //(myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO")));
	   // feedback_provider_label.setTooltip
	   // (myPathContext.createCallout("Enter the last and first name, separated by a space (e.g. Smith John)\nUse * to search on letters contained in the last and first name, separated by a space (e.g. *Dyke *Sebas)\nOr if the name contains multiple words such as: Sebastien Van Dyke"));
	    

		   var feedback_provider_info_icon = new sap.m.Image({
		    	src:feedback_ns.url_app+"com/capgemini/mypath/feedback/images/info_icon.png",
		    });
		 feedback_provider_info_icon.setTooltip(myPathContext.createCallout(myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO1") + myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO2")));
		   
		 //  feedback_provider_label.setTooltip(myPathContext.createCallout
			//	    (myPathContext.i18nModel.getProperty("EMP_SEARCH_INFO")));
		   
		   var hlayout1 = new sap.ui.commons.layout.HorizontalLayout({
				content:[feedback_provider_info_icon,feedback_provider_label]
			}).addStyleClass("hlayout_style");
		   
		   
	 
	    feedbackContext.feedback_provider_label = feedback_provider_label;
	    
	    var feedback_provider_input = new sap.m.Input({
	    	change : function(event)
	    	{
					myPathContext.isEdited = true;				
	    	},
			width:"100%",
		});
	    
	    feedbackContext.feedback_provider_input = feedback_provider_input;
	    
	    var feedback_search_icon = new sap.m.Image({
	    	src:feedback_ns.url_app+"com/capgemini/mypath/feedback/images/search_icon.png",
	    	press:feedback_ns.feedback_search
	    }).addStyleClass("search_icon_style");
	    
	    var cancel_create_cell = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan : 4 
		});
	    
	    var cancel_btn = new sap.m.Button({
	    width : "50%",
		text: '{i18n>CANCEL}',
		press:oController.cancel_feedback,
	    }).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
	    
	    var create_btn = new sap.m.Button({
		    width : "50%",
			text: myPathContext.buttonText.ZCREATEFEEDBACK.toUpperCase(),//'{i18n>CREATE}',
			press:oController.createFeedback
		}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
	    
	    var next_btn = new sap.m.Button({
		    width : "50%",
		    visible : false,
			text: '{i18n>NEXT}',
			press:oController.call_others_feedback
		}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
	    
	    /*declaring matrix for creating feedback for others*/
	    var others_feedback_matrix = new sap.ui.commons.layout.MatrixLayout({
			columns : 6,
			width:"75%",
			visible:false,
			widths : ['3%','0%','15%','3%','70%','3%']}).addStyleClass("others_feedback_style");
	    
	   /* var feedback_display_preview_cell = new sap.ui.commons.layout.MatrixLayoutCell({
			rowSpan : 1 
		});	*/	
		
	    var display_preview_link = new sap.m.Link(
	    		{
	    			//text:"EXPAND TEXT FIELD",
	    			text :'{i18n>EXPAND_TEXT_FIELD}',
	    			press:function()
	    	    	{
	    	    		feedback_ns.openReadOnlyText(feedbackContext.feedback_input.getValue());
	    	    	}
	    		}
	    		
	    ).addStyleClass("display_preview_style");
	    
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
					feedbackContext.feedback_input.setValue("");
					feedbackContext.feedback_input.setValue(feedbackContext.overlay_text.getValue());
					this.close(); 
				}.bind(this));
			}
		};
		
		$(function() {
			  $('body').on('click', '#sap-ui-blocklayer-popup', function() {
				  feedbackContext.feedback_input.setValue("");
					feedbackContext.feedback_input.setValue(feedbackContext.overlay_text.getValue());
				  dlg.close();
			  });
			});
		
		feedbackContext.overlay_text = overlay_text;
		feedbackContext.dlg = dlg;	
	    
	    
		 var relationship_label = new sap.m.Label({
				width:"100%",
				text :myPathContext.columnText.ZREL,
				required:true,
				textDirection: sap.ui.core.TextDirection.LTR,
				textAlign : sap.ui.core.TextAlign.Right
			}).addStyleClass("title_text").addStyleClass("create_others_title");
		 
		 
			
			 
		 var relationship_input = new sap.m.TextArea({
				width:"100%",	
				rows:5,
				change:function()
				{
					myPathContext.isEdited = true;
				}
			});
		 
		 feedbackContext.relationship_input = relationship_input;
		 
		 var feedback_label = new sap.ui.commons.Label({
				width:"100%",
				text :myPathContext.columnText.ZFEE,
				required:true,
				//requiredAtBegin :true,
				textDirection: sap.ui.core.TextDirection.RTL,
				textAlign : sap.ui.core.TextAlign.Left
			}).addStyleClass("title_text").addStyleClass("feedback_provider_label_style").addStyleClass("underline_style");
		feedback_label.setTooltip(myPathContext.createCallout(myPathContext.feedback_template["0001"].infotext));
		 
		 
		 var feedback_info_icon = new sap.m.Image({
		    	src:feedback_ns.url_app+"com/capgemini/mypath/feedback/images/info_icon.png",
		    	tooltip:"Feedback text"
		    }).addStyleClass("appraisal_info_icon_style");
		 feedback_info_icon.setTooltip(myPathContext.createCallout(myPathContext.feedback_template["0001"].infotext));
		
		// openEmpDetails("hola");
		 var feedback_input = new sap.m.TextArea({
				width:"100%",
				//cols:50,
				rows:5,
				change:function()
				{
					myPathContext.isEdited = true;
					feedbackContext.overlay_text.setValue(this.getValue());
				}
			});		 
		 
		 feedbackContext.feedback_input = feedback_input;
		 var hlayout2 = new sap.ui.commons.layout.HorizontalLayout({
				content:[feedback_info_icon,feedback_label]
			}).addStyleClass("hlayout_style");
		 
		 var feedback_display_preview_vLayout = new sap.ui.commons.layout.VerticalLayout({
				content:[hlayout2,display_preview_link]
			}).addStyleClass("displayLinkMatrixStyle");
		 
		/* feedback_display_preview_cell.addContent(hlayout2);
		 feedback_display_preview_cell.addContent(display_preview_link);*/
		/*Declaring matrix for feedback provider details*/
		 
		 var feedback_provider_matrix = new sap.ui.commons.layout.MatrixLayout({
				columns : 5,
				width:"75%",
				visible:false,
				widths : ['1%','10%','10%','3%','15%']}).addStyleClass("feedback_details_style").addStyleClass("feedback_details_matrix_style");
			
		 var feedback_docname_label = new sap.m.Label({
				width:"100%",
				text :myPathContext.feedback_template["0001"].name,
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("label_style");
			
			 var feedback_docname = new sap.m.Text({
					width:"100%",
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("title_text");
			 
			 feedbackContext.feedback_docname = feedback_docname;
			 
			var feedback_provider = new sap.m.Label({
				width:"100%",
				text :'{i18n>FEEDBACK_PROVIDER}',
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("label_style");
			
			 var feedback_provider_name = new sap.m.Text({
					width:"100%",
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("title_text").addStyleClass("date_cell_style");
			 
			 feedbackContext.feedback_provider_name = feedback_provider_name;
			 var employee_label = new sap.m.Label({
					width:"100%",
					text :'{i18n>EMPLOYEE}',
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("label_style");
				
		     var employee_name = new sap.m.Text({
						width:"100%",
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("title_text").addStyleClass("date_cell_style");
		     
		     feedbackContext.employee_name = employee_name;
				 
			var validity_period = new sap.m.Label({
						width:"100%",
						text :'{i18n>VALIDITY_PERIOD}',
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("label_style");
					
		
			var from_date = new sap.m.Text({
							width:"100%",
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("title_text");
					 
			feedbackContext.from_date = from_date;
			
			var to_label = new sap.m.Label({
							width:"100%",
							text :'{i18n>TO}',
							textDirection: sap.ui.core.TextDirection.LTR
						}).addStyleClass("label_style");
						
			var to_date = new sap.m.Text({
								width:"100%",
								textDirection: sap.ui.core.TextDirection.LTR
							}).addStyleClass("title_text");
			
			feedbackContext.to_date = to_date;			
						 
				 feedback_provider_matrix.createRow(null);
				 feedback_provider_matrix.createRow("",feedback_docname_label,feedback_docname,"","");
				 feedback_provider_matrix.createRow("",feedback_provider,feedback_provider_name,employee_label,employee_name);
				 feedback_provider_matrix.createRow("",validity_period,from_date,to_label,to_date);
				 feedback_provider_matrix.createRow(null);
		
	    	 var save_complete_cell = new sap.ui.commons.layout.MatrixLayoutCell({
				colSpan : 6
			});
		
		   var save_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZSAVE.toUpperCase(),
				visible: false,
				press:oController.saveFeedback
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
		    
		    var complete_btn = new sap.m.Button({
			    width : "50%",
			    visible: false,
				text: myPathContext.buttonText.ZCOMPLETE.toUpperCase(),
				press:oController.provideFeedback
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		    
		    feedbackContext.save_btn = save_btn;
		    feedbackContext.complete_btn = complete_btn;
		    save_complete_cell.addContent(save_btn);
		    save_complete_cell.addContent(complete_btn);
		    
		    others_feedback_matrix.createRow(null);
		    others_feedback_matrix.createRow("","",relationship_label,"",relationship_input,"");
		    others_feedback_matrix.createRow("","",feedback_display_preview_vLayout,"",feedback_input,"");
		    //others_feedback_matrix.createRow(save_complete_cell);
		    
		    
	    feedbackContext.next_btn = next_btn ;
	    feedbackContext.create_btn = create_btn;
	    feedbackContext.cancel_btn = cancel_btn;
	    
	    cancel_create_cell.addContent(cancel_btn);
	    cancel_create_cell.addContent(create_btn);
	    cancel_create_cell.addContent(next_btn);
	    
		create_feedback_matrix.createRow("",feedback_for_label,"",employee_rb,"");
		create_feedback_matrix.createRow("","","",other_employee_rb,"");
		create_feedback_matrix.createRow(feedback_divider_cell,"");
		create_feedback_matrix.createRow("",title_label,"",title_input,"");
		create_feedback_matrix.createRow("",validity_period_label,"",validityPeriodCell,"");
		create_feedback_matrix.createRow("",hlayout1,"",feedback_provider_input,feedback_search_icon);
		create_feedback_matrix.createRow("","","","","");
		//create_feedback_matrix.createRow(cancel_create_cell);

		
		feedbackContext.create_feedback_matrix = create_feedback_matrix;
		feedbackContext.feedback_provider_matrix = feedback_provider_matrix;
		feedbackContext.others_feedback_matrix = others_feedback_matrix;
		
		
		
		var general_feedback_link = new sap.m.Text({text:myPathContext.i18nModel.getProperty("CREATE_GEN_FEEDBACK").toUpperCase(),width:"100%",}).addStyleClass("link_titletext").addStyleClass("header_link").addStyleClass("header_link_selected");
		feedbackContext.general_feedback_link = general_feedback_link;
		
		var one_text = new sap.m.Text({text : "1"}).addStyleClass("header_link_number_blue");
		feedbackContext.one_text = one_text;
		
		
		var vlayout1 = new sap.ui.commons.layout.VerticalLayout({
			content:[one_text,general_feedback_link]
		}).addStyleClass("top_panel_content").addStyleClass("link_marginleft");
		
		feedbackContext.vlayout1 = vlayout1;
		top_panel.addContent(vlayout1);
		
			
		var others_feedback_link = new sap.m.Text({text:'{i18n>FEEDBACK_FOR_OTHERS}',width:"100%"}).addStyleClass("header_link").addStyleClass("header_link_selected").addStyleClass("link_titletext");
		top_panel.addContent(others_feedback_link);
		
		var two_text = new sap.m.Text({text : "2"}).addStyleClass("header_link_number_blue");
		var vlayout2 = new sap.ui.commons.layout.VerticalLayout({
			content:[two_text,others_feedback_link],
			visible:false
		}).addStyleClass("top_panel_content");
		
		feedbackContext.vlayout2 = vlayout2;
		top_panel.addContent(vlayout2);

		 
		 /*Attachment layout*/
		 
		 var attachmentIcon = new sap.m.Image({
				src : feedback_ns.url_app+"com/capgemini/mypath/feedback/images/attachment_icon.png",
				width : "30px", 
				height : "30px",
				visible: true,
				press : function()
				{
					feedbackContext.isCalledFromFeedback = true;
					if (feedbackContext.myGF == true  )
					{
						openUDGF();
					}
					else
						{
					openUploadDownload();
						}
				}
			}).addStyleClass("attachmentImageFeedback");
		 
			/*PDF layout*/
		/*	var pdfIcon = new sap.m.Image({
				src : feedback_ns.url_app+"com/capgemini/mypath/feedback/images/pdf_icon.png",
				width : "30px",
				height : "30px",
				visible: true,
				press :function(oEvent) {
					
					displayPrintDocument(myPathContext.documentId);
				}
			}).addStyleClass("pdfImage");
			feedbackContext.pdfIcon = pdfIcon;
			
			var vlayout_pdf = new sap.ui.commons.layout.VerticalLayout({
				visible:false,
				content:[pdfIcon]
			}).addStyleClass("top_panel_display_content");		
			
			feedbackContext.vlayout_pdf = vlayout_pdf;*/
			/*end of pdf layout*/
			

		 feedbackContext.attachmentIcon = attachmentIcon;
		 myPathContext.feedbackContext.attachmentIcon = feedbackContext.attachmentIcon;
		 
			var attachment_count = new sap.m.Text({visible:false}).addStyleClass("header_link_number_blue_attachment");
			feedbackContext.attachment_count = attachment_count;
			myPathContext.feedbackContext.attachment_count = feedbackContext.attachment_count;
			
			attachment_count.attachBrowserEvent("click", function() {
				feedbackContext.isCalledFromFeedback = true;
				if (feedbackContext.myGF == true  )
				{
					openUDGF();
				}
				else
					{
				openUploadDownload();
					}
			});
			
			
			var vlayout_attachment = new sap.ui.commons.layout.VerticalLayout({
				content:[attachment_count,attachmentIcon]
			}).addStyleClass("top_panel_image_content").addStyleClass("feedback_top_panel_image_content");
			
			feedbackContext.vlayout_attachment = vlayout_attachment;
			
			top_panel.addContent(vlayout_attachment);
			//top_panel.addContent(vlayout_pdf);
		 
		 feedbackContext.general_feedback_link = general_feedback_link;
		 feedbackContext.others_feedback_link = others_feedback_link;
	
		this.addContent(top_panel);		
		this.addContent(cancel_btn);
		this.addContent(create_btn);
		this.addContent(next_btn);
		this.addContent(save_btn);
		this.addContent(complete_btn);
		this.addContent(create_feedback_matrix);
		this.addContent(feedback_provider_matrix);
		this.addContent(others_feedback_matrix);
	
	}

});