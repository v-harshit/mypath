jQuery.sap.require("com.capgemini.mypath.util.Workflow");
jQuery.sap.require("com.capgemini.mypath.util.WorkflowType");

sap.ui.jsview("com.capgemini.mypath.performancereviewVP.view.performancereviewVP", {
	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf com.capgemini.mypath.performancereviewVP.view.performancereviewVP
	 */ 
	getControllerName : function() {
		return "com.capgemini.mypath.performancereviewVP.view.performancereviewVP";
	},
	
	loadInView : function(oController) {
		var pdfIcon = new sap.m.Image({
			src : performancereviewVP_ns.url_app + "com/capgemini/mypath/performancereviewVP/images/pdf.png", // sap.ui.core.URI
			width : "40px", // sap.ui.core.CSSSize
			height : "40px", // sap.ui.core.CSSSize
			press : [ function(oEvent) {
				displayPrintDocument(myPathContext.documentId);
			}, this ]
		}).addStyleClass("pdfImageVP");
		var aHtml = new sap.ui.core.HTML({
			content : "<p style=\"position: absolute; top: 1.5em; right: 1em; width: 10px; padding: 4px; color: #ffffff; border-radius:50%; background-color: rgb(1,159,216); font-weight: bold; font-size: 11px;\">2</p>"
		});
		var attachmentIcon1 = new sap.m.Image({
			src : performancereviewVP_ns.url_app + "com/capgemini/mypath/performancereviewVP/images/attachment.png", // sap.ui.core.URI
			width : "30px", // sap.ui.core.CSSSize
			height : "30px", // sap.ui.core.CSSSize
			press : [ function(oEvent) {
				var control = oEvent.getSource();
			}, this ]
		});//.addStyleClass("attachmentImage");
		
		/**********************************************/
		 /*Attachment layout*/			 
		 var attachmentIcon = new sap.m.Image({
			 src : performancereviewVP_ns.url_app + "com/capgemini/mypath/performancereviewVP/images/attachment.png", // sap.ui.core.URI
				width : "30px", 
				height : "30px",
				press : function()
				{
					performancereviewVPContext.isCalledFromPR = true;
					openUploadDownload();
				}
			});//.addStyleClass("attachmentImageVP");

		 performancereviewVPContext.attachmentIcon = attachmentIcon;
		 
			var attachment_count = new sap.m.Text({
				text : performancereviewVPContext.doc_count,
				visible:performancereviewVPContext.doc_count > 0 ? true : false
			}).addStyleClass("header_link_number_blueVP");
			attachment_count.attachBrowserEvent("click", function() {
				performancereviewVPContext.isCalledFromPR = true;
				openUploadDownload();
			});
			performancereviewVPContext.attachment_count = attachment_count;			
			
			var vlayout_attachment = new sap.ui.commons.layout.VerticalLayout({
				//id : "hola",
				//visible:performancereviewVPContext.doc_count > 0 ? true : false,
				content:[attachment_count,attachmentIcon]
			}).addStyleClass("attachmentImageVP");
		      /*end of attachment layout*/
		
		
		/*************************************************/
			
		var aIconTabBar = 
			new sap.m.IconTabBar({
				expandable : false,
				select : [ function(oEvent) {
					var control = oEvent.getSource();
					oController.enableDisableNextTab(control);
				}, this ],
				selectedKey : 1
			}).addStyleClass("myPathIconTabBar");

		var aJson = '{"1" : "Objectives", "2" : "Career_Aspirations_Mobility", "3" : "Leadership_Profile_Assessment", "4" : "Overall_YearEnd_Assessment", "5" : "Ratings"}';
		var result = jQuery.parseJSON(aJson);

		jQuery.each(result, function(k, v) {
			var performance_review_matrix = new sap.ui.commons.layout.MatrixLayout({
				columns : 5,
				width:"92.5%",
				visible:true,
				widths : ['1%','5%','10%','5%','10%']}).addStyleClass("performancereviewVP_details_style");

			var performance_review = new sap.m.Label({
				width:"100%",
				text : '{i18n>EMPLOYEE}',
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("perfRevVPlabel_style");

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
			}).addStyleClass("perfRevVPlabel_style");

			var employee_name = new sap.m.Text({
				width:"100%",
				text : myPathContext.appraiserName,
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("titleText");

			var validity_period = new sap.m.Label({
				width:"100%",
				text : '{i18n>VALIDITY_PERIOD}', 
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("perfRevVPlabel_style");

			var to_label = new sap.m.Label({
				width:"100%",
				text : '{i18n>TO}',
				textDirection: sap.ui.core.TextDirection.LTR
			}).addStyleClass("perfRevVPlabel_style");

			/*Date logic for top matrix new Date(results[i].ApStartDate+"Z");*/
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
			//performancereviewVPContext.validTo = todate_oData.getValue();
			//performancereviewVPContext.validTo = todate_oData.getValue();
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
			if (myPathContext.employeeId === myPathContext.appraiserId || myPathContext.employeeId === myPathContext.appraiseeId) {
				switch (k) {
				case "1":
					switch (performancereviewVPContext.currentStatus) {
					case "B":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.predefinedObjTable(), oController.individualObjectivesTableRead()]
							});
						} else {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.predefinedObjTable(), oController.individualObjectivesTable()]
							});
						}
						break;
					case "C":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.predefinedObjTable(), oController.individualObjectivesTable()]
							});
							break;
						} 
					case "D":
					case "E":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.predefinedObjTable(), oController.individualObjectivesTableC()]
						});
						break;
					case "J":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.predefinedObjTable(), oController.individualObjectivesTableC()]
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
							content : [performance_review_matrix, br, oController.originalTableYearEnd(), oController.individualObjectivesTableYearEnd()]
						});
						break;

					case "U":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.originalTableYearEndEmployeeVisible(), oController.individualObjectivesTableYearEndEmployeeVisible()]
						});
						break;
					default :
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : false,
							content : [performance_review_matrix]
						});
					break;
					}
					break;
				case "2":
					switch (performancereviewVPContext.currentStatus) {
					case "B":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalCareerTableReadOnly()]
							});
						} else {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.careerDevTable()]
							});
						}
						break;
					case "C":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.careerDevTable()]
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
					case "J":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.originalCareerTableReadOnly()]
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
							content : [performance_review_matrix, br, oController.originalCareerTableYearEnd()]
						});
						break;
					case "U":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.originalCareerTableYearEndEmployeeVisible()]
						});
						break;
					default :
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : false,
							content : [performance_review_matrix]
						});
					break;
					}
					break;
				case "3":
					switch (performancereviewVPContext.currentStatus) {
					case "J":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.leadershipProfileAssessmentTable()]
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
							content : [performance_review_matrix, br, oController.leadershipProfileAssessmentTable()]
						});
						break;
					case "U":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.originalCareerTableYearEndEmployeeVisible()]
						});
						break;
					default :
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : false,
							content : [performance_review_matrix]
						});
					break;
					}
					break;
				case "4":
					switch (performancereviewVPContext.currentStatus) {
					case "J":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							aIconTabFilter = new sap.m.IconTabFilter({
								key : k,
								content : [performance_review_matrix, br, oController.overallYearEndAssessmentTable()]
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
							content : [performance_review_matrix, br, oController.overallYearEndAssessmentTable()]
						});
						break;
					case "U":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							content : [performance_review_matrix, br, oController.originalCareerTableYearEndEmployeeVisible()]
						});
						break;
					default :
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : false,
							content : [performance_review_matrix]
						});
					break;
					}
					break;
				case "5":
					var enabled = false;
					var currentStatus = null;
					switch (performancereviewVPContext.currentStatus) {
					case "B":
					case "C":
					case "D":
					case "E":
					case "F":
					case "G":
					case "H":
					case "I":
					case "J":
						break;
					case "K":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							enabled = true;
						} else {
							enabled = false;
						}
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							content : [performance_review_matrix, br, oController.ratingTable()]
						});
						break;
					case "L":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							enabled = true;
						} else {
							enabled = false;
						}
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							content : [performance_review_matrix, br, oController.ratingTableReadOnly()]
						});
						break;
					case "M":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
							enabled = true;
						} else {
							enabled = false;
						}
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							content : [performance_review_matrix, br, oController.ratingTableReadOnly()]
						});
						break;
					case "N":
						enabled = true;
					case "O":
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : true,
							content : [performance_review_matrix, br, oController.ratingTableReadOnly()]
						});
						break;
					case "U":
						if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("Reviewer")) {
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
							enabled : false,
							content : [performance_review_matrix]
						});
					break;
					}
					if (!aIconTabFilter) {
						aIconTabFilter = new sap.m.IconTabFilter({
							key : k,
							enabled : enabled,
							content : [performance_review_matrix, br, oController.ratingTable()]
						});
					}
					break;
				}
			} else {
				performancereviewVPContext.currentStatus = "O";
				switch (k) {
				case "1":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						content : [performance_review_matrix, br, oController.originalTableYearEnd(), oController.individualObjectivesTableYearEnd()]
					});
					break;
				case "2":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						content : [performance_review_matrix, br, oController.originalCareerTableYearEnd()]
					});
					break;
				case "3":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						content : [performance_review_matrix, br, oController.leadershipProfileAssessmentTable()]
					});
					break;
				case "4":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						content : [performance_review_matrix, br, oController.overallYearEndAssessmentTable()]
					});
					break;
				case "5":
					aIconTabFilter = new sap.m.IconTabFilter({
						key : k,
						enabled : true,
						content : [performance_review_matrix, br, oController.ratingTableReadOnly()]
					});
					break;
				}
			}
			aIconTabFilter.setText(performancereviewVPContext.oBundle.getText(v));//myPathContext.performancereviewVP_template[v].name
			aIconTabFilter.setCount(k);
			aIconTabBar.addItem(aIconTabFilter);
		});
		
		var workFlow1 = new com.capgemini.mypath.util.Workflow({
			header : performancereviewVPContext.oBundle.getText("OBJECTIVE_SETTING"),
			imageURIs : ["Employee-icon.png", "reviewer_employee-icon.png", "Signoff-1.png", "complete-icon.png"],
			tooltips : [myPathContext.subStatusTextVP["2B"], myPathContext.subStatusTextVP["2C"], myPathContext.subStatusTextVP["2D"], myPathContext.subStatusTextVP["2E"]],
			activeImageIndex : 1,
			type : "Completed",
			top : 0,
			nodeCount : 4
		});

		var workFlow2 = new com.capgemini.mypath.util.Workflow({
			header : performancereviewVPContext.oBundle.getText("MID_YEAR_ASSESSMENT"),
			imageURIs : ["Employee-icon.png", "Signoff-2.png", "Signoff-1.png", "complete-icon.png"],
			tooltips : [myPathContext.subStatusTextVP["3F"], myPathContext.subStatusTextVP["3G"], myPathContext.subStatusTextVP["3H"], myPathContext.subStatusTextVP["3I"]],
			activeImageIndex : 1,
			type : "Completed",
			top : 0,
			nodeCount : 4,
			visible : false
		});

		var workFlow3 = new com.capgemini.mypath.util.Workflow({
			header : performancereviewVPContext.oBundle.getText("Yearend_Assessment").toUpperCase(),
			imageURIs : ["Employee-icon.png", "reviewer_employee-icon.png", "Calibration-icon.png", "Signoff-1.png", "Year-End-Signoff--icon.png", "complete-icon.png"],
			tooltips : [myPathContext.subStatusTextVP["4J"], myPathContext.subStatusTextVP["4K"], myPathContext.subStatusTextVP["4L"], myPathContext.subStatusTextVP["4M"], myPathContext.subStatusTextVP["4N"], myPathContext.subStatusTextVP["4O"]],
			activeImageIndex : 1,
			type : "Completed",
			top : 0,
			nodeCount : 6
		});

		var save_btn = new sap.m.Button({
			width : "60%",
			text: '{i18n>SAVE}',
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
			switch (performancereviewVPContext.currentStatus) {
			case "B":
				if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("EMPLOYEE")) {
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
				if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("EMPLOYEE")) {
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
				if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("EMPLOYEE")) {
					//buttons = [accept_btn, back_btn];
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
			case "L":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Active");
				workFlow3.setActiveImageIndex(2);
				buttons = [cancel_btn, next_btn];
				break;
			case "J":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Active");
				workFlow3.setActiveImageIndex(0);
				if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("EMPLOYEE")) {
					buttons = [save_btn, next_btn];
				} else {
					buttons = [cancel_btn, next_btn];
				}
				break;
			case "M":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Active");
				workFlow3.setActiveImageIndex(3);
				if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("EMPLOYEE")) {
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
				if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("EMPLOYEE")) {
					//buttons = [cancel_btn, accept_btn];
					buttons = [cancel_btn, next_btn];
				} else {
					buttons = [cancel_btn, next_btn];
				}
				break;
			case "K":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Active");
				workFlow3.setActiveImageIndex(1);
				if (performancereviewVPContext.employee === performancereviewVPContext.oBundle.getText("EMPLOYEE")) {
					buttons = [cancel_btn, next_btn];
				} else {
					buttons = [save_btn, next_btn];
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
				buttons = [save_btn, next_btn];
				break;
			case "Q":
				buttons = [save_btn, next_btn];
				break;
			case "R":
				buttons = [save_btn, next_btn];
				break;
			case "S":
				buttons = [save_btn, next_btn];
				break;
			case "T":
				buttons = [save_btn, next_btn];
				break;
			case "U":
				workFlow1.setType("Completed");
				workFlow2.setType("Completed");
				workFlow3.setType("Completed");
				buttons = [save_btn, next_btn];
				break;
			case "V":
				buttons = [save_btn, next_btn];
				break;
			case "W":
				buttons = [save_btn, next_btn];
				break;
			case "X":
				buttons = [save_btn, next_btn];
				break;
			case "Y":
				buttons = [save_btn, next_btn];
				break;
			case "Z":
				buttons = [save_btn, next_btn];
				break;
			default:
				workFlow1.setType("Future");
				workFlow2.setType("Future");
				workFlow3.setType("Future");
				buttons = [save_btn, next_btn];
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
		}).addStyleClass("performancereviewVPPage");
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf com.capgemini.mypath.performancereviewVP.view.performancereviewVP
	 */ 
	createContent : function(oController, hideBusyInd) {
		var _self = this;
		if (!hideBusyInd) {
			showBusy();
		}
		var serviceURL = performancereviewVPContext.sServiceUrlFromEmp;
		var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
		var prObjectReadRequestURL = "/DocumentContentSet?$filter=IvAppraisalId eq '" + myPathContext.documentId + "' and IvEmployeeid eq '" + myPathContext.employeeId + "'";
		oModel.read(prObjectReadRequestURL + "&$format=json", null, null, true,     
				function(oData,oResponse){
			hideBusy();
			var obj = JSON.parse(oResponse.body);		     
			performancereviewVPContext.performanceReviewVPData = obj.d;//oData;
			var oModel=new sap.ui.model.json.JSONModel();
			oModel.setData(oData);
			sap.ui.getCore().setModel(oModel);
			_self.addContent(_self.loadInView(oController));
			var page = _self.getContent()[0];
			var tabBar = page.getContent()[0];
			var ratingTable = tabBar.getItems()[4].getContent()[3];
			var ratingTableItemCellForm = ratingTable.getItems()[0].getCells()[0];
			var provisionalRatingDropDown = ratingTableItemCellForm.getContent()[1];
			var potentialRatingDropDown = ratingTableItemCellForm.getContent()[3];
			oController.fillDropDown(potentialRatingDropDown, 96);
			oController.fillDropDown(provisionalRatingDropDown, 90);
			var childTable = _self.getContent()[0].getContent()[0].getItems()[0].getContent()[3];
			var rowCount = childTable.getItems().length;
			jQuery('.mergeCellAttr').prop('rowspan', rowCount);
			performancereviewVPContext.isCalledFromVP = true ;
			performancereviewVPContext.doc_count = getDocCount(myPathContext.documentId,false);
		},
		function(oError){
			hideBusy();
		});
	}
});