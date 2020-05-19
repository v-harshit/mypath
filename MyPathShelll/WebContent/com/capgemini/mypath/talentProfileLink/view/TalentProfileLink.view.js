sap.ui.jsview("com.capgemini.mypath.talentProfileLink.view.TalentProfileLink", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.talentProfileLink.view.TalentProfileLink
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.talentProfileLink.view.TalentProfileLink";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.talentProfileLink.view.TalentProfileLink
	*/ 
	createContent : function(oController) {
		
		var mytalprof = new sap.m.Button({
			type : "Emphasized",
			//icon : "sap-icon://add",
			text: myPathContext.i18nModel.getProperty("MY_TALENT_PROFILE") , //'MY TALENT PROFILE',
			press: function(oEvent) {
				
				if ("ECP" ==  myPathContext.system)
					{
					//var urlFinal = "https://myconnect.capgemini.com/irj/servlet/prt/portal/prteventname/Navigate/prtroot/pcd!3aportal_content!2fevery_user!2fgeneral!2fdefaultAjaxframeworkContent!2fcom.sap.portal.contentarea?windowId=WIDx1445345755547&ApplicationParameter=&System=SAP_ECC_HumanResources&WebDynproApplication=HRTMC_EMPLOYEE_PROFILE&WebDynproConfiguration=HRTMC_EMPLOYEE_PROFILE_ESS_703&WebDynproNamespace=sap&PrevNavTarget=navurl%3A%2F%2F657236dbfed463f1f1ed97973a9615cb&TarTitle=MyPath - My Talent Profile&NavMode=3&CurrentWindowId=WID1445345652796"
					
					var urlFinal = "https://myconnect.capgemini.com/irj/portal?NavigationTarget=ROLES%3A%2F%2Fportal_content%2Fcom.sap.pct%2Fevery_user%2Fcom.sap.pct.erp.common.bp_folder%2Fcom.sap.pct.erp.common.roles%2Fcom.sap.pct.erp.common.erp_common%2Fcom.sap.pct.erp.common.lpd_start_wd_abap&ApplicationParameter=&System=SAP_ECC_HumanResources&WebDynproApplication=HRTMC_EMPLOYEE_PROFILE&WebDynproConfiguration=HRTMC_EMPLOYEE_PROFILE_ESS_703&WebDynproNamespace=sap&PrevNavTarget=navurl%3A%2F%2F657236dbfed463f1f1ed97973a9615cb&TarTitle=MyPath%20-%20My%20Talent%20Profile&NavMode=3&CurrentWindowId=WID1446109907132"	
					window.open(urlFinal,'_blank');
					}
				else if ("ECR" ==  myPathContext.system)
					{
					var urlFinal = "https://myconnect-preproduction.capgemini.com/irj/portal?NavigationTarget=ROLES%3A%2F%2Fportal_content%2Fcom.sap.pct%2Fevery_user%2Fcom.sap.pct.erp.common.bp_folder%2Fcom.sap.pct.erp.common.roles%2Fcom.sap.pct.erp.common.erp_common%2Fcom.sap.pct.erp.common.lpd_start_wd_abap&ApplicationParameter=&System=SAP_ECC_HumanResources&WebDynproApplication=HRTMC_EMPLOYEE_PROFILE&WebDynproConfiguration=HRTMC_EMPLOYEE_PROFILE_ESS_703&WebDynproNamespace=sap&PrevNavTarget=navurl%3A%2F%2F657236dbfed463f1f1ed97973a9615cb&TarTitle=MyPath%20-%20My%20Talent%20Profile&NavMode=3&CurrentWindowId=WID1445336310799"
					window.open(urlFinal,'_blank');
					}
				else if ("ECT" ==  myPathContext.system)
				{
				//var urlFinal = "https://myconnect-preproduction.capgemini.com/irj/portal?NavigationTarget=ROLES%3A%2F%2Fportal_content%2Fcom.sap.pct%2Fevery_user%2Fcom.sap.pct.erp.common.bp_folder%2Fcom.sap.pct.erp.common.roles%2Fcom.sap.pct.erp.common.erp_common%2Fcom.sap.pct.erp.common.lpd_start_wd_abap&ApplicationParameter=&System=SAP_ECC_HumanResources&WebDynproApplication=HRTMC_EMPLOYEE_PROFILE&WebDynproConfiguration=HRTMC_EMPLOYEE_PROFILE_ESS_703&WebDynproNamespace=sap&PrevNavTarget=navurl%3A%2F%2F657236dbfed463f1f1ed97973a9615cb&TarTitle=MyPath%20-%20My%20Talent%20Profile&NavMode=3&CurrentWindowId=WID1445336310799"
				var urlFinal = "http://gdhrsqaecal1d.corp.capgemini.com:50000/irj/portal?NavigationTarget=ROLES%3A%2F%2Fportal_content%2Fcom.sap.pct%2Fevery_user%2Fcom.sap.pct.erp.common.bp_folder%2Fcom.sap.pct.erp.common.roles%2Fcom.sap.pct.erp.common.erp_common%2Fcom.sap.pct.erp.common.lpd_start_wd_abap&ApplicationParameter=&System=SAP_ECC_HumanResources&WebDynproApplication=HRTMC_EMPLOYEE_PROFILE&WebDynproConfiguration=HRTMC_EMPLOYEE_PROFILE_ESS_703&WebDynproNamespace=sap&PrevNavTarget=navurl%3A%2F%2Fe1e8ae118bb10001856ea95af4517da0&TarTitle=Talent%20Profile&NavMode=3&CurrentWindowId=WID1446194450661"
					window.open(urlFinal,'_blank');
				}
				else
					{
				var url1 = location.hostname ;
				var urlFinal = "http://"+ url1 + ":50000/irj/portal?NavigationTarget=ROLES%3A%2F%2Fportal_content%2Fcom.sap.pct%2Fevery_user%2Fcom.sap.pct.erp.common.bp_folder%2Fcom.sap.pct.erp.common.roles%2Fcom.sap.pct.erp.common.erp_common%2Fcom.sap.pct.erp.common.lpd_start_wd_abap&ApplicationParameter=&System=SAP_ECC_HumanResources&WebDynproApplication=HRTMC_EMPLOYEE_PROFILE&WebDynproConfiguration=HRTMC_EMPLOYEE_PROFILE_ESS_703&WebDynproNamespace=sap&PrevNavTarget=navurl%3A%2F%2F657236dbfed463f1f1ed97973a9615cb&TarTitle=MyPath%20-%20My%20Talent%20Profile&NavMode=3&CurrentWindowId=WID1441370294067"
				window.open(urlFinal,'_blank');
					}
				
			}
		});

		var teamtalprof =  new sap.m.Button({
			type : "Emphasized",
		//	icon : "sap-icon://add",
			text: myPathContext.i18nModel.getProperty("MY_TEAM_TALENT_PROFILE") , //"MY TEAM'S TALENT PROFILE",
			press: function(oEvent) {
				if ("ECP" ==  myPathContext.system)
				{
				var urlFinal = "https://myconnect.capgemini.com/irj/portal/interop?NavigationTarget=pcd:portal_content/com.cg.fld.capgemini/com.cg.glob.fld.global/com.cg.glob.fld.roles/com.cg.glob.role.performance_reviewer/com.sap.pct.addon.mss.Manager_Self-Service/Overview/com.sap.pct.addon.mss.Talent_Management/Talent_Management/com.sap.pct.addon.mss.Talent_Information/com.sap.pct.addon.mss.Talent_Information"
				window.open(urlFinal,'_blank');
				}
			else if ("ECR" ==  myPathContext.system)
				{
				var urlFinal = "https://myconnect-preproduction.capgemini.com/irj/portal/interop?NavigationTarget=pcd:portal_content/com.cg.fld.capgemini/com.cg.glob.fld.global/com.cg.glob.fld.roles/com.cg.glob.role.performance_reviewer/com.sap.pct.addon.mss.Manager_Self-Service/Overview/com.sap.pct.addon.mss.Talent_Management/Talent_Management/com.sap.pct.addon.mss.Talent_Information/com.sap.pct.addon.mss.Talent_Information"
				window.open(urlFinal,'_blank');
				}
			else if ("ECT" ==  myPathContext.system)
			{
			//var urlFinal = "https://myconnect-preproduction.capgemini.com/irj/portal?NavigationTarget=ROLES%3A%2F%2Fportal_content%2Fcom.sap.pct%2Fevery_user%2Fcom.sap.pct.erp.common.bp_folder%2Fcom.sap.pct.erp.common.roles%2Fcom.sap.pct.erp.common.erp_common%2Fcom.sap.pct.erp.common.lpd_start_wd_abap&ApplicationParameter=&System=SAP_ECC_HumanResources&WebDynproApplication=HRTMC_EMPLOYEE_PROFILE&WebDynproConfiguration=HRTMC_EMPLOYEE_PROFILE_ESS_703&WebDynproNamespace=sap&PrevNavTarget=navurl%3A%2F%2F657236dbfed463f1f1ed97973a9615cb&TarTitle=MyPath%20-%20My%20Talent%20Profile&NavMode=3&CurrentWindowId=WID1445336310799"
			var urlFinal = "http://gdhrsqaecal1d.corp.capgemini.com:50000/irj/portal/interop?NavigationTarget=pcd:portal_content/com.cg.fld.capgemini/com.cg.glob.fld.global/com.cg.glob.fld.roles/com.cg.glob.role.performance_reviewer/com.sap.pct.addon.mss.Manager_Self-Service/Overview/com.sap.pct.addon.mss.Talent_Management/Talent_Management/com.sap.pct.addon.mss.Talent_Information/com.sap.pct.addon.mss.Talent_Information"
				window.open(urlFinal,'_blank');
			}
			else
				{
				var url1 = location.hostname ;
				var urlFinal = "http://"+ url1 + ":50000/irj/portal/interop?NavigationTarget=pcd:portal_content/com.cg.fld.capgemini/com.cg.glob.fld.global/com.cg.glob.fld.roles/com.cg.glob.role.performance_reviewer/com.sap.pct.addon.mss.Manager_Self-Service/Overview/com.sap.pct.addon.mss.Talent_Management/Talent_Management/com.sap.pct.addon.mss.Talent_Information/com.sap.pct.addon.mss.Talent_Information"
				window.open(urlFinal,'_blank');
				}
				
			}
		});
		
		var oCellMyTP = new sap.ui.commons.layout.MatrixLayoutCell();
		oCellMyTP.addContent(mytalprof);
		oCellMyTP.setHAlign("Center");
		oCellMyTP.setVAlign("Middle");
        
        var oCellTeamTP = new sap.ui.commons.layout.MatrixLayoutCell();
        oCellTeamTP.addContent(teamtalprof);
        oCellTeamTP.setHAlign("Center");
        oCellTeamTP.setVAlign("Middle")
		
		var oTPMatrixLayout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			//width : '700px',
			columns : 1,
			width : "100%"
			//widths : ['320px'] 
		});
		
		oTPMatrixLayout.createRow(oCellMyTP);
		oTPMatrixLayout.createRow(oCellTeamTP);
		
		return oTPMatrixLayout ;
		
	}

});