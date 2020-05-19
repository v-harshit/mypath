jQuery.sap.require("com.capgemini.mypath.util.Workflow");
jQuery.sap.require("com.capgemini.mypath.util.WorkflowType");

sap.ui.jsview("com.capgemini.mypath.performancereview.view.performanceReview", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf com.capgemini.mypath.performancereview.view.performanceReview
	 */ 
	getControllerName : function() {
		return "com.capgemini.mypath.performancereview.view.performanceReview";
	},
	
	loadInView : function(oController) {
		var pdfIcon = new sap.m.Image({
			src : performancereview_ns.url_app + "com/capgemini/mypath/performancereview/images/pdf.png", // sap.ui.core.URI
			width : "40px", // sap.ui.core.CSSSize
			height : "40px", // sap.ui.core.CSSSize
			press : [ function(oEvent) {
				displayPrintDocument(myPathContext.documentId);
			}, this ]
		}).addStyleClass("pdfImagePR");
		var aIconTabBar = 
			new sap.m.IconTabBar({
				expandable : false,
				select : [ function(oEvent) {
					var control = oEvent.getSource();
					oController.enableDisableNextTab(control);
				}, this ],
				selectedKey : 1
			}).addStyleClass("myPathIconTabBar");
		
		/**********************************************/
		/*Attachment layout*/			 
		var attachmentIcon = new sap.m.Image({
			src : performancereview_ns.url_app + "com/capgemini/mypath/performancereview/images/attachment.png", // sap.ui.core.URI
			width : "30px", 
			height : "30px",
			press : function()
			{
				performancereviewContext.isCalledFromPR = true;
				openUploadDownload();
			}
		});//.addStyleClass("attachmentImagePR");

		performancereviewContext.attachmentIcon = attachmentIcon;

		var attachment_count = new sap.m.Text({
			text : performancereviewContext.doc_count,
			visible:performancereviewContext.doc_count > 0 ? true : false
		}).addStyleClass("header_link_number_bluePR");
		attachment_count.attachBrowserEvent("click", function() {
			performancereviewContext.isCalledFromPR = true ;
			openUploadDownload();
		});
		performancereviewContext.attachment_count = attachment_count;			
		
		var vlayout_attachment = new sap.ui.commons.layout.VerticalLayout({
			//id : "hola",
			content:[attachment_count,attachmentIcon]
		}).addStyleClass("attachmentImagePR");
		/*end of attachment layout*/
		
		/*************************************************/
		var workFlow1 = new com.capgemini.mypath.util.Workflow({
			header : performancereviewContext.oBundle.getText("OBJECTIVE_SETTING"),
			imageURIs : ["Employee-icon.png", "reviewer_employee-icon.png", "Signoff-1.png", "complete-icon.png"],
			tooltips : [myPathContext.subStatusText["2B"], myPathContext.subStatusText["2C"], myPathContext.subStatusText["2D"], myPathContext.subStatusText["2E"]],
			activeImageIndex : 1,
			type : "Completed",
			top : 0,
			nodeCount : 4
		});

		var workFlow2 = new com.capgemini.mypath.util.Workflow({
			header : performancereviewContext.oBundle.getText("Mid_Year_Assessment").toUpperCase(),
			imageURIs : ["Employee-icon.png", "Signoff-2.png", "Signoff-1.png", "complete-icon.png"],
			tooltips : [myPathContext.subStatusText["3F"], myPathContext.subStatusText["3G"], myPathContext.subStatusText["3H"], myPathContext.subStatusText["3I"]],
			activeImageIndex : 1,
			type : "Completed",
			top : 0,
			nodeCount : 4
		});

		var workFlow3 = new com.capgemini.mypath.util.Workflow({
			header : performancereviewContext.oBundle.getText("Yearend_Assessment").toUpperCase(),
			imageURIs : ["Employee-icon.png", "reviewer_employee-icon.png", "Calibration-icon.png", "Signoff-1.png", "Year-End-Signoff--icon.png", "complete-icon.png"],
			tooltips : [myPathContext.subStatusText["4J"], myPathContext.subStatusText["4K"], myPathContext.subStatusText["4L"], myPathContext.subStatusText["4M"], myPathContext.subStatusText["4N"], myPathContext.subStatusText["4O"]],
			activeImageIndex : 1,
			type : "Completed",
			top : 0,
			nodeCount : 6
		});
		
		var aJson = '{"1" : "OBJECTIVES", "2" : "FINANCIAL_KPIS", "3" : "CAREER_DEVELOPMENT_PLAN", "4" : "OVERALL_ASSESSMENT", "5" : "RATINGS"}';
		var result = jQuery.parseJSON(aJson);

		jQuery.each(result, function(k, v) {
			var performance_review_matrix = new sap.ui.commons.layout.MatrixLayout({
				columns : 5,
				width:"92.5%",
				visible:true,
				widths : ['1%','5%','10%','5%','10%']}).addStyleClass("performancereview_details_style");

			var performance_review = new sap.m.Label({
				width:"100%",
				text : '{i18n>EMPLOYEE}',
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("label_style");

			var performance_review_name = new sap.m.Text({
				//width:"100%",
				text : myPathContext.appraiseeName,
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("titleText");
			
			//Himanshu
			performance_review_name.addStyleClass("underline_style");
			performance_review_name.setTooltip(myPathContext.createCallout(myPathContext.AddUserData));
			
			//Till here

			var employee_label = new sap.m.Label({
				width:"100%",
				text : '{i18n>PERFORMANCE_REVIEWER}', 
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("label_style");

			var employee_name = new sap.m.Text({
				width:"100%",
				text : myPathContext.appraiserName,
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("titleText");
			

			var validity_period = new sap.m.Label({
				width:"100%",
				text : '{i18n>VALIDITY_PERIOD}', 
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("label_style");

			var to_label = new sap.m.Label({
				width:"100%",
				text : '{i18n>TO}',
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("label_style");

			/*Date logic for top matrix*/
			var fromdate_oData = {                          
					path_from_date : new Date(myPathContext.validFrom.split("T")[0] + "T12:00:00"),
			};

			var todate_oData = {                     
					path_to_date : new Date(myPathContext.validTo.split("T")[0] + "T12:00:00"),
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
			var from_date = new sap.m.Text({
				width:"100%",
				text : feedback_from_date.getValue(),
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("titleText");
			var feedback_to_date = new sap.m.DatePicker({
				visible:false,
				width:"35%",
				value:
				{
					path:"/path_to_date",
					type : new sap.ui.model.type.Date()

				}
			}).setModel(to_model);
			//performancereviewContext.validTo = todate_oData.getValue();
			//performancereviewContext.validTo = todate_oData.getValue();
			var to_date = new sap.m.Text({
				width:"100%",
				text : feedback_to_date.getValue(),
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("titleText");

			performance_review_matrix.createRow(null);
			performance_review_matrix.createRow("",performance_review, performance_review_name,employee_label,employee_name);
			performance_review_matrix.createRow("",validity_period,from_date,to_label,to_date);
			performance_review_matrix.createRow(null);

			var br = new sap.ui.core.HTML({
				content : "<br />", // string
			});
			var aIconTabFilter = null;
			var oHorizontalLayout = new sap.ui.layout.HorizontalLayout({
				allowWrapping : true, // boolean
				content : []
			});
			if (myPathContext.employeeId === myPathContext.appraiserId || myPathContext.employeeId === myPathContext.appraiseeId) {
				switch (k) {
				case "1":
					switch (performancereviewContext.currentStatus) {
					case "B":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalTableB(), oController.individualObjectivesTableRead()]
							});
						} else {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalTableB(), oController.individualObjectivesTable()]
							});
						}
						break;
					case "C":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalTableB(), oController.individualObjectivesTable()]
							});
							break;
						} 
					case "D":
					case "E":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.originalTableB(), oController.individualObjectivesTableC()]
						});
						break;
					case "F":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalTableB(), oController.individualObjectivesTableC()]
							});
							break;
						} else {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalTableMid(), oController.individualObjectivesTableWrite()]
							});
							break;
						}
					case "G":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalTableMid(), oController.individualObjectivesTableWrite()]
							});
							break;
						}
					case "H":
					case "I":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.originalTableMid(), oController.individualObjectivesTableMid()]
						});
						break;
					case "J":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalTableMid(), oController.individualObjectivesTableMid()]
							});
							break;
						}
					case "K":
					case "L":
					case "M":
					case "N":
					case "O":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.reformTableYearEndEmployee(), oController.reformIndividualObjectiveTableYearEndEmployee()]
						});
						break;
					case "U":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.originalTableYearEndEmployeeVisible(), oController.individualObjectivesTableYearEndEmployeeVisible()]
						});
						break;
					default:
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.reformTableYearEndEmployee(), oController.reformIndividualObjectiveTableYearEndEmployee()]
						});
					break;
					}
					break;
				case "2":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						content : [performance_review_matrix, br, oController.financialKPITable()]
					});
					break;
				case "3":
					switch (performancereviewContext.currentStatus) {
					case "B":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalCareerTableRead()]
							});
						} else {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalCareerTableB()]
							});
						}
						break;
					case "C":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalCareerTableB()]
							});
							break;
						}
					case "D":
					case "E":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.originalCareerTableReadOnly()]
						});
						break;
					case "F":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalCareerTableReadOnly()]
							});
							break;
						} 
					case "G":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalCareerTableMidReviewer()]
							});
							break;
						}
					case "H":
					case "I":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.originalCareerTableMid()]
						});
						break;
					case "J":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalCareerTableMid()]
							});
							break;
						}
					case "K":
					case "L":
					case "M":
					case "N":
					case "O":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.reformCareerTableYearEndEmployeeVisible()]
						});
						break;
					case "U":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.originalCareerTableYearEndEmployeeVisible()]
						});
						break;
					default:
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.reformCareerTableYearEndEmployeeVisible()]
						});
					break;
					}
					break;
				case "4":
					switch (performancereviewContext.currentStatus) {
					case "B":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : false,
							visible : false,
							content : [performance_review_matrix, br, oController.originalTable()]
						});
						break;
					case "C":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : false,
							visible : false,
							content : [performance_review_matrix, br, oController.originalTable()]
						});
						break;
					case "D":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : false,
							visible : false,
							content : [performance_review_matrix, br, oController.originalTable()]
						});
						break;
					case "E":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : false,
							visible : false,
							content : [performance_review_matrix, br, oController.originalTable()]
						});
						break;
					case "F":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : false,
								//visible : false,
								content : [performance_review_matrix, br, oController.originalTable()]
							});
							break;
						} 
					case "G":
					case "H":
					case "I":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : true,
							//visible : true,
							content : [performance_review_matrix, br, oController.overallAssessmentMidYearSelfAssessmentEmployee()]
						});
						break;
					case "J":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : true,
								//visible : true,
								content : [performance_review_matrix, br, oController.overallAssessmentMidYearSelfAssessmentEmployee()]
							});
						} else {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : true,
								//visible : true,
								content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee()]
							});
						}
						break;
					case "K":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : true,
								//visible : true,
								content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee(), oController.workLife()]
							});
						} else {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : true,
								//visible : true,
								content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee()]
							});
						}
						break;
					case "L":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : true,
								//visible : true,
								content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee(), oController.workLifeRead()]
							});
						} else {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : true,
								//visible : true,
								content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee()]
							});
						}
						break;
					case "M":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : true,
								//visible : true,
								content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee(), oController.workLife()]
							});
						} else {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : true,
								//visible : true,
								content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee()]
							});
						}
						break;
					case "N":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : true,
								//visible : true,
								content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee(), oController.workLifeRead()]
							});
						} else {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								enabled : true,
								//visible : true,
								content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee(), br, oController.workLifeRead(), oController.employeeSignOff()]
							});
						}
						break;
					case "O":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : true,
							//visible : true,
							content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee(), oController.workLifeRead(), oController.employeeSignOffRead()]
						});
						break;
					case "P":
					case "Q":
					case "R":
					case "S":
					case "T":
					case "U":
					case "V":
					case "W":
					case "X":
					case "Y":
					case "Z":
					default:
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : true,
							//visible : true,
							content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee(), oController.workLifeRead(), oController.employeeSignOffRead()]
						});
					break;
					}
					break;
				case "5":
					var enabled = false;
					var currentStatus = null;
					var visible = true ;
					switch (performancereviewContext.currentStatus) {
					case "B":
						enabled = false;//Himanshu 
						visible = false;
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							visible : visible,
							content : [performance_review_matrix, br, oController.ratingTable()]
						});
						break;
					case "C":
						enabled = false;
						visible = false;
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							visible : visible,
							content : [performance_review_matrix, br, oController.ratingTable()]
						});
						break;
					case "D":
						enabled = false;
						visible = false;
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							visible : visible,
							content : [performance_review_matrix, br, oController.ratingTable()]
						});
						break;
					case "E":
						enabled = false;
						visible = false;
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							visible : visible,
							content : [performance_review_matrix, br, oController.ratingTable()]
						});
						break;
					case "F":
					case "G":
					case "H":
					case "I":
					case "J":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							visible : visible,
							content : [performance_review_matrix, br, oController.ratingTable()]
						});
						break;
					case "K":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							enabled = true;
						} else {
							enabled = false;
						}
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							visible : visible,
							content : [performance_review_matrix, br, oController.ratingTable()]
						});
						break;
					case "L":
					case "M":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							enabled = true;
						} else {
							enabled = false;
						}
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							visible : visible,
							content : [performance_review_matrix, br, oController.ratingTableReadOnly()]
						});
						break;
					case "N":
						enabled = true;
					case "O":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : true,
							visible : visible,
							content : [performance_review_matrix, br, oController.ratingTableReadOnly()]
						});
						break;
					case "U":
						if (performancereviewContext.employee === performancereviewContext.oBundle.getText("Reviewer")) {
							enabled = true;
						}
					case "P":
					case "Q":
					case "R":
					case "S":
					case "T":
					case "V":
					case "W":
					case "X":
					case "Y":
					case "Z":
					default:
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : true,
							visible : true,
							content : [performance_review_matrix, br, oController.ratingTableReadOnly()]
						});
					break;
					}
					if (!aIconTabFilter) {
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							visible : visible,
							content : [performance_review_matrix, br, oController.ratingTable()]
						});
					}
					break;
				default:
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						content : [performance_review_matrix, br, oController.originalTable()]
					});
				break;
				}
			} else {
				performancereviewContext.currentStatus = "O";
				switch (k) {
				case "1":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						content : [performance_review_matrix, br, oController.reformTableYearEndEmployee(), oController.reformIndividualObjectiveTableYearEndEmployee()]
					});
					break;
				case "2":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						enabled : true,
						content : [performance_review_matrix, br, oController.financialKPITable()]
					});
					break;
				case "3":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						content : [performance_review_matrix, br, oController.reformCareerTableYearEndEmployeeVisible()]
					});
					break;
				case "4":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						enabled : true,
						//visible : true,
						content : [performance_review_matrix, br, oController.overallAssessmentYearEndSelfAssessmentEmployee(), oController.workLifeRead(), oController.employeeSignOffRead()]
					});
					break;
				case "5":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						enabled : true,
						visible : true,
						content : [performance_review_matrix, br, oController.ratingTableReadOnly()]
					});
					break;
				default:
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						content : [performance_review_matrix, br, oController.originalTable()]
					});
				break;
				}
			}
			if (aIconTabFilter) {
				aIconTabFilter.setText(performancereviewContext.oBundle.getText(v));//myPathContext.performanceReview_template[v].name);
				aIconTabFilter.setCount(k);
				aIconTabBar.addItem(aIconTabFilter);
			}
		});

		var save_btn = new sap.m.Button({
			width : "60%",
			text: myPathContext.buttonText.ZSAVE.toUpperCase(),
			press: function(oEvent) {oController.showSaveMessage = true; oController.saveTab();}
		}).addStyleClass("save_btn_style").addStyleClass("btn_normal");          

		var next_btn = new sap.m.Button({
			width : "50%",
			text: '{i18n>NEXT}',
			press: function(oEvent) {oController.nextTab();}
		}).addStyleClass("create_btn_style").addStyleClass("btn_normal_blue");
		
		var cancel_btn = new sap.m.Button({
			width : "60%",
			text: '{i18n>CANCEL}',
			press: function(oEvent) {myPathContext.back();}
		}).addStyleClass("save_btn_style").addStyleClass("btn_normal");
		
		if (myPathContext.employeeId === myPathContext.appraiserId || myPathContext.employeeId === myPathContext.appraiseeId) {
			switch (performancereviewContext.currentStatus) {
			case "B":
				if (performancereviewContext.employee === performancereviewContext.oBundle.getText("EMPLOYEE")) {
					buttons = [save_btn, next_btn];
				} else {
					buttons = [cancel_btn, next_btn];
				}
				workFlow1.setType("Active");
				workFlow1.setActiveImageIndex(0);
				workFlow2.setType("Future");
				workFlow3.setType("Future");
				break;
			case "C":
				if (performancereviewContext.employee === performancereviewContext.oBundle.getText("EMPLOYEE")) {
					buttons = [cancel_btn, next_btn];
				} else {
					buttons = [save_btn, next_btn];
				}
				workFlow1.setType("Active");
				workFlow2.setType("Future");
				workFlow3.setType("Future");
				workFlow1.setActiveImageIndex(1);
				break;
			case "D":
				if (performancereviewContext.employee === performancereviewContext.oBundle.getText("EMPLOYEE")) {
					// buttons = [accept_btn, back_btn];
					buttons = [cancel_btn, next_btn];
				} else {
					buttons = [cancel_btn, next_btn];
				}
				workFlow1.setType("Active");
				workFlow1.setActiveImageIndex(2);
				workFlow2.setType("Future");
				workFlow3.setType("Future");
				break;
			case "E":
				workFlow1.setType("Active");
				workFlow1.setActiveImageIndex(3);
				workFlow2.setType("Future");
				workFlow3.setType("Future");
				buttons = [cancel_btn, next_btn];
				break;
			case "F":
				workFlow1.setType("Completed");
				workFlow2.setType("Active");
				workFlow2.setActiveImageIndex(0);
				workFlow3.setType("Future");
				if (performancereviewContext.employee === performancereviewContext.oBundle.getText("EMPLOYEE")) {
					buttons = [save_btn, next_btn];
				} else {
					buttons = [cancel_btn, next_btn];
				}
				break;
			case "G":
				workFlow1.setType("Completed");
				workFlow2.setType("Active");
				workFlow2.setActiveImageIndex(1);
				workFlow3.setType("Future");
				if (performancereviewContext.employee === performancereviewContext.oBundle.getText("EMPLOYEE")) {
					buttons = [cancel_btn, next_btn];
				} else {
					buttons = [save_btn, next_btn];
				}
				break;
			case "H":
				workFlow1.setType("Completed");
				workFlow2.setType("Active");
				workFlow2.setActiveImageIndex(2);
				workFlow3.setType("Future");
				if (performancereviewContext.employee === performancereviewContext.oBundle.getText("EMPLOYEE")) {
					//buttons = [cancel_btn, accept_btn];
					buttons = [cancel_btn, next_btn];
				} else {
					buttons = [cancel_btn, next_btn];
				}
				break;
			case "I":
				workFlow1.setType("Completed");
				workFlow2.setType("Active");
				workFlow2.setActiveImageIndex(3);
				workFlow3.setType("Future");
				buttons = [cancel_btn, next_btn];
				break;
			case "J":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Active");
				workFlow3.setActiveImageIndex(0);
				if (performancereviewContext.employee === performancereviewContext.oBundle.getText("EMPLOYEE")) {
					buttons = [save_btn, next_btn];
				} else {
					buttons = [cancel_btn, next_btn];
				}
				break;
			case "K":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Active");
				workFlow3.setActiveImageIndex(1);
				if (performancereviewContext.employee === performancereviewContext.oBundle.getText("EMPLOYEE")) {
					buttons = [cancel_btn, next_btn];
				} else {
					buttons = [save_btn, next_btn];
				}
				break;
			case "L":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Active");
				workFlow3.setActiveImageIndex(2);
				buttons = [cancel_btn, next_btn];
				break;
			case "M":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Active");
				workFlow3.setActiveImageIndex(3);
				if (performancereviewContext.employee === performancereviewContext.oBundle.getText("EMPLOYEE")) {
					buttons = [cancel_btn, next_btn];
				} else {
					//buttons = [save_btn, signoff_btn];
					buttons = [save_btn, next_btn];
				}
				break;
			case "N":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Active");
				workFlow3.setActiveImageIndex(4);
				if (performancereviewContext.employee === performancereviewContext.oBundle.getText("EMPLOYEE")) {
					//buttons = [cancel_btn, accept_btn];
					buttons = [cancel_btn, next_btn];
				} else {
					buttons = [cancel_btn, next_btn];
				}
				break;
			case "O":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Active");
				workFlow3.setActiveImageIndex(5);
				buttons = [cancel_btn, next_btn];
				break;
			case "P":
				buttons = [cancel_btn, next_btn];
				break;
			case "Q":
				buttons = [cancel_btn, next_btn];
				break;
			case "R":
				buttons = [cancel_btn, next_btn];
				break;
			case "S":
				buttons = [cancel_btn, next_btn];
				break;
			case "T":
				buttons = [cancel_btn, next_btn];
				break;
			case "U":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Completed");
				buttons = [cancel_btn, next_btn];
				break;
			case "V":
				buttons = [cancel_btn, next_btn];
				break;
			case "W":
				buttons = [cancel_btn, next_btn];
				break;
			case "X":
				buttons = [cancel_btn, next_btn];
				break;
			case "Y":
				buttons = [cancel_btn, next_btn];
				break;
			case "Z":
				buttons = [cancel_btn, next_btn];
				break;
			default:
				workFlow1.setType("Completed");
			workFlow2.setType("Completed");
			workFlow3.setType("Completed");
			buttons = [cancel_btn, next_btn];
			break;
			}
		} else {
			workFlow1.setType("Completed");
			workFlow2.setType("Completed");
			workFlow3.setType("Completed");
			buttons = [cancel_btn, next_btn];
		}
		return new sap.m.Page({
			showHeader: false,
			showFooter: false,
			content: [aIconTabBar, workFlow1, workFlow2, workFlow3, pdfIcon, vlayout_attachment, buttons]
		}).addStyleClass("performanceReviewPage");
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf com.capgemini.mypath.performancereview.view.performanceReview
	 */ 
	createContent : function(oController) {
		var _self = this;
		showBusy();
		var prObjectReadRequestURL = "/DocumentContentSet?$filter=IvAppraisalId eq '" + myPathContext.documentId + "' and IvEmployeeid eq '" + myPathContext.employeeId + "'";
		//setTimeout(function(){myPathContext.employeeId
			performancereviewContext.performancereview_oDataModel.read(prObjectReadRequestURL + "&$format=json", null, null, true,     
				function(oData,oResponse){
			hideBusy();
			var obj = JSON.parse(oResponse.body);		     
			performancereviewContext.performanceReviewData = obj.d;//oData;
			_self.addContent(_self.loadInView(oController));
			var page = _self.getContent()[0];
			var tabBar = page.getContent()[0];
			var ratingTable = tabBar.getItems()[4].getContent()[3];
			var ratingTableItemCellForm = ratingTable.getItems()[0].getCells()[0];
			var performanceRatingDropDown = ratingTableItemCellForm.getContent()[1];
			var promotionNominationDropDown = ratingTableItemCellForm.getContent()[3];
			var potentialRatingDropDown = ratingTableItemCellForm.getContent()[5];
			var careerTrackDropDown = ratingTableItemCellForm.getContent()[7];
			var expInRoleDropDown = ratingTableItemCellForm.getContent()[9];
			oController.fillDropDown(promotionNominationDropDown, 95);
			oController.fillDropDown(performanceRatingDropDown, 90);
			oController.fillDropDown(potentialRatingDropDown, 94);
			oController.fillDropDown(careerTrackDropDown, 85);
			oController.fillDropDown(expInRoleDropDown, 92);
			performancereviewContext.doc_count = getDocCount(myPathContext.documentId,false);
		},
		function(oError){
			hideBusy();
		});
	}
});