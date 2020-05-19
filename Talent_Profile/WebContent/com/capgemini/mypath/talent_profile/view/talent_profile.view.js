sap.ui.jsview("com.capgemini.mypath.talent_profile.view.talent_profile", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf com.capgemini.mypath.talent_profile.view.talent_profile
	 */
	getControllerName : function() {
		return "com.capgemini.mypath.talent_profile.view.talent_profile";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf com.capgemini.mypath.talent_profile.view.talentsprofile
	 */
	createContent : function(oController) {
		var oAccordion1 = new sap.ui.commons.Accordion({
			
			
			sectionOpen : function()
			{
				oAccordion1.removeStyleClass("mypath_accordion");
				oAccordion1.addStyleClass("mypath_accordion_exp");
				/*if (talentProfileContext.accordion2.getSections()[0].getCollapsed() ==  false )
				 talentProfileContext.accordion2.getSections()[0].setCollapsed(true);
				
				if (talentProfileContext.accordion3.getSections()[0].getCollapsed() ==  false )
				 talentProfileContext.accordion3.getSections()[0].setCollapsed(true);*/
				
				 if ( talentProfileContext.accordion3.getSections()[0].getCollapsed() == false &&
						 talentProfileContext.accordion2.getSections()[0].getCollapsed() == false 
						 &&  talentProfileContext.ExpAllBool == false)
				 {
					 myPathContext.expAllBut.setText(myPathContext.i18nModel.getProperty("COL_ALL").toUpperCase());
				 }
				
				
			},
			sectionClose : function()
			{
				oAccordion1.removeStyleClass("mypath_accordion_exp");
				oAccordion1.addStyleClass("mypath_accordion");
				
				 if ( talentProfileContext.accordion3.getSections()[0].getCollapsed() == true &&
						 talentProfileContext.accordion2.getSections()[0].getCollapsed() == true)
				 {
					 myPathContext.expAllBut.setText(myPathContext.i18nModel.getProperty("EXP_ALL").toUpperCase());
				 }
			}

		}).addStyleClass("mypath_accordion");
		
		oAccordion1.onAfterRendering = function()
		{
			oController.setStyleClassAcc1();
		};
		
		//oAccordion1.attachsectionClose(alert("hola"));
		
		var oAccordion2 = new sap.ui.commons.Accordion({
			sectionOpen : function()
			{
				oAccordion2.removeStyleClass("mypath_accordion");
				oAccordion2.addStyleClass("mypath_accordion_exp");
				
				/*if (talentProfileContext.accordion1.getSections()[0].getCollapsed() ==  false )
				 talentProfileContext.accordion1.getSections()[0].setCollapsed(true);
				
				if (talentProfileContext.accordion3.getSections()[0].getCollapsed() ==  false )
				 talentProfileContext.accordion3.getSections()[0].setCollapsed(true);*/
				
				 if ( talentProfileContext.accordion3.getSections()[0].getCollapsed() == false &&
						 talentProfileContext.accordion1.getSections()[0].getCollapsed() == false 
						 &&  talentProfileContext.ExpAllBool == false)
				 {
					 myPathContext.expAllBut.setText(myPathContext.i18nModel.getProperty("COL_ALL").toUpperCase());
				 }
			},
			sectionClose : function()
			{
				oAccordion2.removeStyleClass("mypath_accordion_exp");
				oAccordion2.addStyleClass("mypath_accordion");
				
				 if ( talentProfileContext.accordion3.getSections()[0].getCollapsed() == true &&
						 talentProfileContext.accordion1.getSections()[0].getCollapsed() == true)
				 {
					 myPathContext.expAllBut.setText(myPathContext.i18nModel.getProperty("EXP_ALL").toUpperCase());
				 }
			}

		}).addStyleClass("mypath_accordion");
		
		oAccordion2.onAfterRendering = function()
		{
			oController.setStyleClassAcc2();
		};
		
		var oAccordion3 = new sap.ui.commons.Accordion({
			sectionOpen : function()
			{
				showBusy();
				oAccordion3.removeStyleClass("mypath_accordion");
				oAccordion3.addStyleClass("mypath_accordion_exp");
				
				/*if (talentProfileContext.accordion1.getSections()[0].getCollapsed() ==  false )
				 talentProfileContext.accordion1.getSections()[0].setCollapsed(true);
				
				if (talentProfileContext.accordion2.getSections()[0].getCollapsed() ==  false )
				 talentProfileContext.accordion2.getSections()[0].setCollapsed(true);*/
				
				 if ( talentProfileContext.accordion1.getSections()[0].getCollapsed() == false &&
						 talentProfileContext.accordion2.getSections()[0].getCollapsed() == false 
						 &&  talentProfileContext.ExpAllBool == false) 
				 {
					 myPathContext.expAllBut.setText(myPathContext.i18nModel.getProperty("COL_ALL").toUpperCase());
				 }
			},
			sectionClose : function()
			{
				oAccordion3.removeStyleClass("mypath_accordion_exp");
				oAccordion3.addStyleClass("mypath_accordion");
				
				 if ( talentProfileContext.accordion1.getSections()[0].getCollapsed() == true &&
						 talentProfileContext.accordion2.getSections()[0].getCollapsed() == true)
				 {
					 myPathContext.expAllBut.setText(myPathContext.i18nModel.getProperty("EXP_ALL").toUpperCase());
				 }
			}

		}).addStyleClass("mypath_accordion");
		
		oAccordion3.onAfterRendering = function()
		{
			oController.setStyleClassAcc3();
			
			/*if ( talentProfileContext.ExpAllBool == true)
				{
			 talentProfileContext.ExpAllBool = false ;	 
			 expAllBut.setText(myPathContext.i18nModel.getProperty("COL_ALL").toUpperCase());
				}*/
			
		};
		
		talentProfileContext.accordion1 = oAccordion1;
		talentProfileContext.accordion2 = oAccordion2;
		talentProfileContext.accordion3 = oAccordion3;

		/*//Building Section 1 - for local testing
		var oSection1 = new sap.ui.commons.AccordionSection();
		oSection1.setTitle("Professional Competencies");
		oAccordion.addSection(oSection1);*/
		
		var feedback_provider = new sap.m.Label({
			width:"100%",
			 text: myPathContext.i18nModel.getProperty("PERFORMANCE_REVIEWER"),
			textDirection: sap.ui.core.TextDirection.LTR
		}).addStyleClass("label_styleTPREV");
		
		 var feedback_provider_name = new sap.m.Text({
				width:"100%",
				//text : "Himanshu Kandpal" , //myPathContext.appraiserName,
				text : myPathContext.TPRev,
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("title_textTP");
		 
		 var employee_label = new sap.m.Label({
				width:"100%",
				text :'{i18n>EMPLOYEE}',
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("label_styleTP");
			
	     var employee_name = new sap.m.Text({
					//width:"100%",
					//text : " Anurag Mathur " , //myPathContext.appraiseeName,
	    	 		text : myPathContext.TPUsrName,
					textDirection: sap.ui.core.TextDirection.LTR
				}).addStyleClass("tp_emp_name_det");//.addStyleClass("title_textTP");
	     employee_name.setTooltip(myPathContext.createCallout(myPathContext.AddUserDataTP));
	     
	     
	     var pdfIcon = new sap.m.Image({
				src : talent_profile_ns.url_app+"com/capgemini/mypath/talent_profile/images/pdf_icon.png",
				width : "30px", 
				height : "30px",
				//visible: appraisalContext.appraisal_data.pdf_icon_visible,
				press :function(oEvent) {
					displayPrintDocumentTP(myPathContext.employeeIdIV);
				}
			}).addStyleClass("pdfImageTP");
	     
		
		 var tpEmpLayout = new sap.ui.commons.layout.HorizontalLayout({
				content:[employee_label,employee_name , feedback_provider , feedback_provider_name , pdfIcon]
			}).addStyleClass("tp_namelayout");
		 
		 var expAllBut = new sap.m.Button({
			 text : myPathContext.i18nModel.getProperty("EXP_ALL").toUpperCase(),
			 type : "Emphasized",
			 press : function()
			 {
				 
				 if (expAllBut.getText() ==  myPathContext.i18nModel.getProperty("EXP_ALL").toUpperCase())
					 {
					 talentProfileContext.ExpAllBool = true ;	
					 
					 if ( talentProfileContext.accordion3.getSections()[0].getCollapsed() == true)
						 {
						 setTimeout(function(){
							  //your code to be executed after 1 seconds
							 talentProfileContext.ExpAllBool = false ;	
							 expAllBut.setText(myPathContext.i18nModel.getProperty("COL_ALL").toUpperCase());
							}, 1); 
						 }
					 else
						 {
						 talentProfileContext.ExpAllBool = false ;	
						 expAllBut.setText(myPathContext.i18nModel.getProperty("COL_ALL").toUpperCase());
						 }
					
				
				 if ( talentProfileContext.accordion1.getSections()[0].getCollapsed() == true)
					 {
					 talentProfileContext.accordion1.getSections()[0].setCollapsed(false);
					 }
				 
				 if ( talentProfileContext.accordion2.getSections()[0].getCollapsed() == true)
				 {
				 talentProfileContext.accordion2.getSections()[0].setCollapsed(false);
				 }
				 
				 if ( talentProfileContext.accordion3.getSections()[0].getCollapsed() == true)
				 {
				 talentProfileContext.accordion3.getSections()[0].setCollapsed(false);
				 }
				
				 //talentProfileContext.accordion2.getSections()[0].setCollapsed(false);
				 //talentProfileContext.accordion3.getSections()[0].setCollapsed(false);
					 }
				 
				 else
					 {
					 expAllBut.setText(myPathContext.i18nModel.getProperty("EXP_ALL").toUpperCase());
					  if ( talentProfileContext.accordion1.getSections()[0].getCollapsed() == false)
					  {
					 talentProfileContext.accordion1.getSections()[0].setCollapsed(true);
					  }
					 if ( talentProfileContext.accordion2.getSections()[0].getCollapsed() == false)
					  {
					 talentProfileContext.accordion2.getSections()[0].setCollapsed(true);
					  }
					 if ( talentProfileContext.accordion3.getSections()[0].getCollapsed() == false)
					  {
					 talentProfileContext.accordion3.getSections()[0].setCollapsed(true);
					  }
					//talentProfileContext.accordion2.getSections()[0].setCollapsed(true);
					 //talentProfileContext.accordion3.getSections()[0].setCollapsed(true);
						 
					 }
			 }
		 }).addStyleClass("tp_expAllBut");
		 
		 myPathContext.expAllBut = expAllBut ;
		 
		 var expAllLayout = new sap.ui.commons.layout.VerticalLayout({
				content:[tpEmpLayout , expAllBut]
			}).addStyleClass("tp_expAllLayout");
		 
		//this.addContent(tpEmpLayout);
		 
		 var cancel_btn = new sap.m.Button({
			    width : "50%",
				text: '{i18n>CANCEL}',
				press : function()
				{
					myPathContext.back();
				}
			    }).addStyleClass("cancel_btn_style").addStyleClass("btn_normal");
			    
			    var create_btn = new sap.m.Button({
				    width : "50%",
					text: myPathContext.buttonText.ZSAVE.toUpperCase() , //"SAVE",
					press:oController.saveTP
				}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
			    
		this.addContent(expAllLayout);
		this.addContent(oAccordion1);
		this.addContent(oAccordion2);
		this.addContent(oAccordion3);
		this.addContent(cancel_btn);
		this.addContent(create_btn);
	}

});