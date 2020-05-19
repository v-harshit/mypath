sap.ui.jsview("com.capgemini.mypath.perforeview.view.pr_facet_list", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.perforeview.view.pr_facet_list
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.perforeview.view.pr_facet_list";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.perforeview.view.pr_facet_list
	*/ 
	createContent : function(oController) {

		/* Create Reporting criteria drop down */
		
		var pipButton = new sap.m.Button({
			 type : "Emphasized",
		     icon : "sap-icon://add",
			text : "Create PIP",
			press : function()
			{
				myPathContext.docStatus = "1";
				myPathContext.subStatus = "";
				myPathContext.isReviewer = true ;
				myPathContext.setAppContent("Performance Improvement Plan","com.capgemini.mypath.pip",true);
			}
			
		}).addStyleClass("mypath_add_button_style").addStyleClass("dashboard_create_feedback_btn");
		
		
        var reporting_criteria_lbl = new sap.m.Label({
            text: myPathContext.i18nModel.getProperty("REPORTING_CRITERIA"),
        }).addStyleClass('reporting_criteria_lbl');


        var reporting_criteria_dropdown = new sap.ui.commons.DropdownBox({
            editable: true,
            change :  function()
  	        {
		    	   oController.selectionCriteria();
		    },
        }).addStyleClass('reporting_criteria_dropdown');
        reporting_criteria_lbl.setLabelFor(reporting_criteria_dropdown);
        performanceReviewerContext.reporting_criteria_dropdown = reporting_criteria_dropdown ;
        
        var oItem1 = new sap.ui.core.ListItem();
        oItem1.setText(myPathContext.i18nModel.getProperty("PR_DREP"));
        oItem1.setKey("0");
        reporting_criteria_dropdown.addItem(oItem1);
        
        oItem1 = new sap.ui.core.ListItem();
        oItem1.setText(myPathContext.i18nModel.getProperty("PR_L1"));
        oItem1.setKey("1");
        reporting_criteria_dropdown.addItem(oItem1);
        
        oItem1 = new sap.ui.core.ListItem();
        oItem1.setText(myPathContext.i18nModel.getProperty("PR_L2"));
        oItem1.setKey("2");
        reporting_criteria_dropdown.addItem(oItem1);
        
        reporting_criteria_dropdown.setSelectedKey("0");
        
        var reportingCriteriaLayout = new sap.ui.commons.layout.VerticalLayout({
			content:[reporting_criteria_lbl,reporting_criteria_dropdown]
		}).addStyleClass("reporting_criteria_vlayout");
        
        /* Create document list */
		var assignManagerFacetHeaderText = new sap.m.Text({
			text: "{i18n>DOCUMENTS}"
		}).addStyleClass("mypath_list_header_text");
			
		var docCountText = new sap.m.Text({
			text: performanceReviewerContext.documentList.length
		}).addStyleClass("mypath_list_header_num");
		performanceReviewerContext.docCountText = docCountText;
		
		var headerLayout = new sap.ui.commons.layout.HorizontalLayout({
			content:[assignManagerFacetHeaderText,docCountText]
		}).addStyleClass("mypath_list_header_content");
		
		var docList = new sap.ui.commons.RowRepeater({
			numberOfRows: 10
		}).addStyleClass("mypath_doc_list");
		
		performanceReviewerContext.docList = docList;
		
		var perHlayout = new sap.ui.commons.layout.HorizontalLayout({
			content:[headerLayout,
			         pipButton , 
			         ]
		});
		
		var docPageLayout = new sap.ui.commons.layout.VerticalLayout({
			content:[reportingCriteriaLayout,
			         //headerLayout,
			         //pipButton ,
			         perHlayout ,
			         docList
			         ]
		}).addStyleClass("mypath_doc_vlayout");
		
		this.addContent(docPageLayout);
	
	}

});