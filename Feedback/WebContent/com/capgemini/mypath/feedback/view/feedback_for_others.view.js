sap.ui.jsview("com.capgemini.mypath.feedback.view.feedback_for_others", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.feedback.view.feedback_for_others
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.feedback.view.feedback_for_others";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.feedback.view.feedback_for_others
	*/ 
	createContent : function(oController) {
		
		var top_panel = new sap.m.Panel({			 
		}).addStyleClass("panel_header");	
		
		 /*declaring matrix for creating feedback for others*/
	    var others_feedback_matrix = new sap.ui.commons.layout.MatrixLayout({
			columns : 6,
			width:"75%",
			widths : ['0%','0%','23%','3%','70%','3%']}).addStyleClass("others_feedback_style");
	    
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
	    			}).addStyleClass("display_preview_style");


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
				// feedbackContext.feedback_input.setValue("");
				  if(feedbackContext.overlay_text.getValue().toString().trim()!="")
					feedbackContext.feedback_input.setValue(feedbackContext.overlay_text.getValue());
				    dlg.close();
			  });
			});
		
		
		feedbackContext.overlay_text = overlay_text;
		feedbackContext.dlg = dlg;	
	    
	    
		 var relationship_label = new sap.m.Label({
				width:"100%",
				required:true,
				text :myPathContext.columnText.ZREL,
				textDirection: sap.ui.core.TextDirection.LTR,
				textAlign : sap.ui.core.TextAlign.Right
			}).addStyleClass("title_text");
		 
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
				required:true,
				//requiredAtBegin :true,
				text :myPathContext.columnText.ZFEE,
				textDirection: sap.ui.core.TextDirection.RTL,
				textAlign : sap.ui.core.TextAlign.Left
			}).addStyleClass("title_text").addStyleClass("feedback_provider_label_style").addStyleClass("underline_style");
		 
		 feedback_label.setTooltip(myPathContext.createCallout(myPathContext.feedback_template["0001"].infotext));
		 
		 var feedback_info_icon = new sap.m.Image({
		    	src:feedback_ns.url_app+"com/capgemini/mypath/feedback/images/info_icon.png",
		    	tooltip:"Feedback text"
		    }).addStyleClass("appraisal_info_icon_style");
		 feedback_info_icon.setTooltip(myPathContext.createCallout(myPathContext.feedback_template["0001"].infotext));
		 
		 
		 var feedback_input = new sap.m.TextArea({
				width:"100%",
				//cols:50,
				change:function()
				{
					feedbackContext.overlay_text.setValue(this.getValue());
				},
				rows:5
			});		 
		 
		 feedbackContext.feedback_input = feedback_input;
		 
		 var hlayout1 = new sap.ui.commons.layout.HorizontalLayout({
				content:[feedback_info_icon,feedback_label]
			}).addStyleClass("hlayout_style");
		 
		 var feedback_display_preview_vLayout = new sap.ui.commons.layout.VerticalLayout({
				content:[hlayout1,display_preview_link]
			}).addStyleClass("displayLinkMatrixStyle");
		 
//		 feedback_display_preview_cell.addContent(hlayout1);
//		 feedback_display_preview_cell.addContent(display_preview_link);
		 
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
				press:oController.saveFeedback
			}).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
		    
		    var complete_btn = new sap.m.Button({
			    width : "50%",
				text: myPathContext.buttonText.ZCOMPLETE.toUpperCase(),
				press:oController.provideFeedback
			}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		    
		    save_complete_cell.addContent(save_btn);
		    save_complete_cell.addContent(complete_btn);
		    
		    others_feedback_matrix.createRow(null);
		    others_feedback_matrix.createRow("","",relationship_label,"",relationship_input,"");
		    others_feedback_matrix.createRow("","",feedback_display_preview_vLayout,"",feedback_input,"");
		   // others_feedback_matrix.createRow(save_complete_cell);
		    
		    var others_feedback_link = new sap.m.Text({text:myPathContext.i18nModel.getProperty("GEN_FEEDBACK").toUpperCase(),width:"10%"}).addStyleClass("header_link").addStyleClass("header_link_selected").addStyleClass("link_titletext").addStyleClass("others_feedback_link_style");
			top_panel.addContent(others_feedback_link);
			
			 /*Attachment layout*/
			 
			 var attachmentIcon = new sap.m.Image({
					src : feedback_ns.url_app+"com/capgemini/mypath/feedback/images/attachment_icon.png",
					width : "30px", 
					height : "30px",
					visible: true,
					press : function()
					{
						feedbackContext.isCalledFromFeedback = true;
						openUploadDownload();
					}
				}).addStyleClass("attachmentImageFeedback");

			 feedbackContext.attachmentIcon = attachmentIcon;
			 
				var attachment_count = new sap.m.Text({
					text : feedbackContext.doc_count,
					visible:feedbackContext.doc_count > 0 ? true : false,
				}).addStyleClass("header_link_number_blue_attachment");
				feedbackContext.attachment_count = attachment_count;
				
				attachment_count.attachBrowserEvent("click", function() {
					feedbackContext.isCalledFromFeedback = true;
					openUploadDownload();
				});
				
				
				var vlayout_attachment = new sap.ui.commons.layout.VerticalLayout({
					content:[attachment_count,attachmentIcon]
				}).addStyleClass("top_panel_image_content").addStyleClass("feedback_top_panel_image_content");
				
				top_panel.addContent(vlayout_attachment);
				 /*End of Attachment layout*/
				/*PDF layout*/
				
				/*var pdfIcon = new sap.m.Image({
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
					visible:true,
					content:[pdfIcon]
				}).addStyleClass("top_panel_display_content");	
				
				
				top_panel.addContent(vlayout_pdf);*/
			
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
			this.addContent(save_btn);
			this.addContent(complete_btn);
			this.addContent(feedback_provider_matrix);
			this.addContent(others_feedback_matrix);

		    
		    
	}

});