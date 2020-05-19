sap.ui.jsview("com.capgemini.mypath.feedback.view.display_feedback", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.feedback.view.display_feedback
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.feedback.view.display_feedback";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.feedback.view.display_feedback
	*/ 
	createContent : function(oController) {

		 
		var top_panel = new sap.m.Panel({			
		}).addStyleClass("panel_header");	
		
		 /*declaring matrix for creating feedback for others*/
	    var others_feedback_matrix = new sap.ui.commons.layout.MatrixLayout({
			columns : 6,
			width:"75%",
			widths : ['0%','0%','22%','3%','70%','3%']}).addStyleClass("others_feedback_style");
	    
	    var feedback_display_preview_cell = new sap.ui.commons.layout.MatrixLayoutCell({
			rowSpan : 1 
		});		
		
	    var display_preview_link = new sap.m.Link({
	    	//text:"EXPAND TEXT FIELD",
	    	text :'{i18n>EXPAND_TEXT_FIELD}',
	    	visible:false,
	    	press:function()
	    	{
	    		feedback_ns.openReadOnlyText(feedbackContext.feedback_input_readOnly.getText());
	    	}
	    }).addStyleClass("display_preview_style");
	    
	    
	    var overlay_text = new sap.m.TextArea({
	    	editable:false,
	    	cols:100
	    	}).addStyleClass("showMoreTextStyle").addStyleClass("textAreaStyle");
	    
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
					feedbackContext.feedback_input_readOnly.setText("");
					feedbackContext.feedback_input_readOnly.setText(feedbackContext.overlay_text.getValue());
					this.close(); 
				}.bind(this));
			}
		};
		
		$(function() {
			  $('body').on('click', '#sap-ui-blocklayer-popup', function() {
				  dlg.close();
			  });
			});
		
		
		feedbackContext.overlay_text = overlay_text;
		feedbackContext.dlg = dlg;	
		

	    
		 var relationship_label = new sap.m.Text({
				width:"100%",
				text :myPathContext.columnText.ZREL,//'{i18n>RELATIONSHIP}',
				textDirection: sap.ui.core.TextDirection.RTL
			}).addStyleClass("title_text");
		 

		 
		/* var relationship_input = new sap.m.TextArea({
				width:"100%",
				rows:1,
				editable:false
			});
		 
		 feedbackContext.relationship_input = relationship_input;*/
		 
		 /*Logic for relationship input visibility*/
		 relationship_input_readOnly = new com.capgemini.mypath.util.MyPathText({
			   
		            	showLimit : 500,
		            	width: "100%",
		            	showTextArea : true,
		            	colsCount:150,
		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
						text : feedbackContext.relationship_input_readOnly_data
							
						}).addStyleClass("showMoreTextGF");
		   
		 feedbackContext.relationship_input_readOnly = relationship_input_readOnly;
		 /*End of logic for relationship input visibility*/
		 
		 feedback_display_preview_cell.addContent(hlayout1);
		 feedback_display_preview_cell.addContent(display_preview_link);
		
		 
		 var feedback_label = new sap.m.Text({
				width:"100%",
				text :myPathContext.columnText.ZFEE,
				textDirection: sap.ui.core.TextDirection.RTL
			}).addStyleClass("title_text").addStyleClass("feedback_provider_label_style").addStyleClass("underline_style");
		 feedback_label.setTooltip(myPathContext.createCallout(myPathContext.feedback_template["0001"].infotext));
		 
		 var feedback_info_icon = new sap.m.Image({
		    	src:feedback_ns.url_app+"com/capgemini/mypath/feedback/images/info_icon.png",
		    	tooltip:"Feedback text"
		    }).addStyleClass("appraisal_info_icon_style");
		 feedback_info_icon.setTooltip(myPathContext.createCallout(myPathContext.feedback_template["0001"].infotext));
		 
		 var hlayout1 = new sap.ui.commons.layout.HorizontalLayout({
				content:[feedback_info_icon,feedback_label]
			}).addStyleClass("hlayout_style");
		 
		/* var feedback_input = new sap.m.TextArea({
				width:"100%",
				editable:false,
				cols:50,
				rows:5
			});		 
		 
		 feedbackContext.feedback_input = feedback_input;*/
		 
		 /*Logic for feedback input visibility*/
		 feedback_input_readOnly = new com.capgemini.mypath.util.MyPathText({
			   
		            	showLimit : 500,
		            	width: "100%",
		            	showTextArea : true,
		            	colsCount:150,
		            	//visible:!appraisalContext.appraisal_data.objectives_comments_editable,
						text : feedbackContext.feedback_input_readOnly_data,
							
						}).addStyleClass("showMoreTextGF");
		   
		 feedbackContext.feedback_input_readOnly = feedback_input_readOnly;
		  
		 
		 feedback_display_preview_cell.addContent(hlayout1);
		 feedback_display_preview_cell.addContent(display_preview_link);
		 /*End of logic for feedback input visibility*/
		 
		/*Declaring matrix for feedback provider details*/		 
		 var feedback_provider_matrix = new sap.ui.commons.layout.MatrixLayout({
				columns : 5,
				width:"75%",
				widths : ['1%','12%','12%','6%','15%']}).addStyleClass("feedback_details_style").addStyleClass("feedback_details_matrix_style");
		 
		 var feedback_docname_label = new sap.m.Label({
				width:"100%",
				text :myPathContext.feedback_template["0001"].name,
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("label_style");
			
			 var feedback_docname = new sap.m.Text({
					width:"100%",
					textDirection: sap.ui.core.TextDirection.LTR,
					text : myPathContext.docTitle
				}).addStyleClass("title_text");	
		 
			var feedback_provider = new sap.m.Label({
				width:"100%",
				text :'{i18n>FEEDBACK_PROVIDER}',
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("label_style");
			
			 var feedback_provider_name = new sap.m.Text({
					width:"100%",
					text :myPathContext.appraiserName,
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("title_text").addStyleClass("date_cell_style");
			 
			 var employee_label = new sap.m.Label({
					width:"100%",
					text :'{i18n>EMPLOYEE}',
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("label_style");
				
		     var employee_name = new sap.m.Text({
						//width:"100%",
						text :myPathContext.appraiseeName,
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("title_text").addStyleClass("underline_style").addStyleClass("date_cell_style");
		     employee_name.setTooltip(myPathContext.createCallout(myPathContext.AddUserData));
				 
			var validity_period = new sap.m.Label({
						width:"100%",
						text :'{i18n>VALIDITY_PERIOD}',
						textDirection: sap.ui.core.TextDirection.LTR
					}).addStyleClass("label_style");
					
			var from_date = new sap.m.Text({
							width:"100%",
							//text :"01.01.2015",
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
								//text :"31.12.2015",
								textDirection: sap.ui.core.TextDirection.LTR
							}).addStyleClass("title_text");
						 
			feedbackContext.to_date = to_date;
			
				 feedback_provider_matrix.createRow("","","","","");
				 feedback_provider_matrix.createRow("",feedback_docname_label,feedback_docname,"","");
				 feedback_provider_matrix.createRow("",feedback_provider,feedback_provider_name,employee_label,employee_name);
				 feedback_provider_matrix.createRow("",validity_period,from_date,to_label,to_date);
				 feedback_provider_matrix.createRow("","","","","");
	
		    
		    others_feedback_matrix.createRow("","","","","","");
		    others_feedback_matrix.createRow("","",relationship_label,"",relationship_input_readOnly,"");
		    others_feedback_matrix.createRow("","",feedback_display_preview_cell,"",feedback_input_readOnly,"");

		    
		    var others_feedback_link = new sap.m.Text({text:'{i18n>DISPLAY_FEEDBACK}',width:"9%"}).addStyleClass("header_link").addStyleClass("header_link_selected").addStyleClass("link_titletext").addStyleClass("others_feedback_link_style");
			top_panel.addContent(others_feedback_link);
			
			 
                 /*Attachment layout*/			 
			 var attachmentIcon = new sap.m.Image({
					src : feedback_ns.url_app+"com/capgemini/mypath/feedback/images/attachment_icon.png",
					width : "30px", 
					height : "30px",
					press : function()
					{
						feedbackContext.isCalledFromFeedback = true;
						openUploadDownload();
					}
				}).addStyleClass("attachmentImageFeedback");

			 feedbackContext.attachmentIcon = attachmentIcon;
			 
				var attachment_count = new sap.m.Text({
					text : feedbackContext.doc_count,
				}).addStyleClass("header_link_number_blue_attachment").addStyleClass("display_header_link_number");
				feedbackContext.attachment_count = attachment_count;	
				
				attachment_count.attachBrowserEvent("click", function() {
					feedbackContext.isCalledFromFeedback = true;
					openUploadDownload();
				});
				
				var vlayout_attachment = new sap.ui.commons.layout.VerticalLayout({
					visible:feedbackContext.doc_count > 0 ? true : false,
					content:[attachment_count,attachmentIcon]
				}).addStyleClass("top_panel_display_content").addStyleClass("top_panel_displayfb_attachment");
			      /*end of attachment layout*/
				
				/*PDF layout*/
				var pdfIcon = new sap.m.Image({
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
					content:[pdfIcon]
				}).addStyleClass("top_panel_display_content");				
				/*end of pdf layout*/
				top_panel.addContent(vlayout_attachment);				
				top_panel.addContent(vlayout_pdf);
				
				
				
			
		
			 /*Date logic for top matrix*/
				var fromdate_oData = {				
						path_from_date : myPathContext.validFromISO,//new Date(myPathContext.validFrom),
						
					    };
			
			var todate_oData = {				
					
					path_to_date : myPathContext.validToISO,//new Date(myPathContext.validTo),
					
				    };
			
			
			var from_model = new sap.ui.model.json.JSONModel();		
			from_model.setData(fromdate_oData);
			
			var to_model = new sap.ui.model.json.JSONModel();		
			to_model.setData(todate_oData);
			
			var feedback_from_date = new sap.m.DatePicker({
				visible:false,
				width:"35%",
				value:
				{
					path:"/path_from_date",
					type : new sap.ui.model.type.Date()
					
				}
			}).setModel(from_model).addStyleClass("date_cell_style");
			
			feedbackContext.feedback_from_date = feedback_from_date;
			
			var feedback_to_date = new sap.m.DatePicker({
				visible:false,
				width:"35%",
				value:
				{
					path:"/path_to_date",
					type : new sap.ui.model.type.Date()
					
				}
			}).setModel(to_model);
		    
		    feedbackContext.feedback_to_date = feedback_to_date;
		    
		   
			 
			this.addContent(top_panel);	
			this.addContent(feedback_provider_matrix);
			this.addContent(others_feedback_matrix);
			
		    
		    
	
	}

});