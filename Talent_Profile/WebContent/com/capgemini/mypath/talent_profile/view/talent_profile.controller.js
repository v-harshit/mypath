sap.ui.controller("com.capgemini.mypath.talent_profile.view.talent_profile", {

	onInit: function() {
		
		
		//getTalentProfileModelData();
		//getAllQualifications();
		talentProfileContext.AddedObj = [];
		talentProfileContext.coreBehaviorQualifications = [];
		talentProfileContext.professionalQualifications = [];
		talentProfileContext.roleQualifications = [];
		showBusy();
		//var requestURL = "TalentProfileSet?$filter=IvEmployeeid eq '"+myPathContext.employeeIdIV+"'";
		//var requestURL =  "TalentProfileSet?$expand=TalentProfileToPositionProfile&$filter=IvEmployeeid eq '" +myPathContext.employeeIdIV + "'" ;
		var requestURL =  "TalentHeaderSet?$expand=TalentHeaderToTalentProfile,TalentHeaderToPositionProfile&$filter=IvSobid eq '" +
		myPathContext.employeeIdIV + "'&$format=json";
		talentProfileContext.talentprofile_oDataModel.read(requestURL,null,null,true,
			function(oData, oResponse){
			var obj = JSON.parse(oResponse.body);
			 var resultsTP = obj.d.results;
			/*var results = oData.results[0].TalentHeaderToTalentProfile.results ;
			talentProfileContext.ProfileArr = oData.results[0].TalentHeaderToPositionProfile.results ; */
			 
			 var results = resultsTP[0].TalentHeaderToTalentProfile.results ;
				talentProfileContext.ProfileArr = resultsTP[0].TalentHeaderToPositionProfile.results ; 
				
				
				for(var i=0; i<results.length; i++){
					results[i].isNA = false;
					results[i].isCleared = false;
					results[i].sliderEnabled = true;
					results[i].Rating = parseInt(results[i].Rating,"10");
					results[i].RatingInitial =  results[i].Rating ;
					//results[i].RatingTh =  5  ;
					results[i].TP1 = "";
					results[i].OriginalNA = false;
					results[i].RPVis  = false;
					
					
					for (var index = 0; index < talentProfileContext.ProfileArr.length; index++) {
						
						if ( talentProfileContext.ProfileArr[index].Tbjid == results[i].ObjId)
							{
							results[i].Profcy =  talentProfileContext.ProfileArr[index].Profcy ;
							results[i].RPVis  = true;
							}
						
					}				
					talentProfileContext.AddedObj.push(results[i].ObjId);
					talentProfileContext.modeldata.push(results[i]);
				}
				getAllQualifications();
				hideBusy();
				
			},
			function(oError){
				hideBusy();
				//TO DO code for error handling
			}
		
		);
	},
	
	onAfterRendering: function() {
		
		//var 
		
	},
	
	setStyleClassAcc1 : function()
	{
		/*if ( talentProfileContext.PCTable.getRows().length  != 0 )
			{
		
		var allrows = talentProfileContext.PCTable.getRows() ;
		for (var index = 0; index < allrows.length; index++) {
			
			talentProfileContext.PCTable.getRows()[3].$().toggleClass("talent_profile_slider_N", true);
			talentProfileContext.PCTable.getRows()[2].$().toggleClass("talent_profile_slider_N", true);
			
		}*/
		if ( talentProfileContext.PCTable.getRows().length  != 0 )
		{
		var profileData = talentProfileContext.ProfileArr ;
		
		for (var index = 0; index < talentProfileContext.PCModelArr.length; index++) {
			
			for (var indexJ = 0; indexJ < talentProfileContext.ProfileArr.length; indexJ++) {
			
			 if ( talentProfileContext.PCModelArr[index].ObjId ==  talentProfileContext.ProfileArr[indexJ].Tbjid)
				 {
				 if (  talentProfileContext.PCModelArr[index].Rating <  parseInt(talentProfileContext.ProfileArr[indexJ].Profcy))
					 {
					 talentProfileContext.PCTable.getRows()[index].$().toggleClass("talent_profile_slider_N", true);
					 }
				 else
					 {
					 talentProfileContext.PCTable.getRows()[index].$().toggleClass("talent_profile_slider", true);
					 }
				 //talentProfileContext.PCTable.getRows()[talentProfileContext.PCTable.getRows().length -1].mAggregations.cells[2].mAggregations.content[0].aCustomStyleClasses[0] = "tpRP1"
				 talentProfileContext.PCTable.getRows()[index].
				 mAggregations.cells[2].mAggregations.content[0].$().toggleClass
				 ("tpRP"+parseInt(talentProfileContext.ProfileArr[indexJ].Profcy).toString(), true);
				 talentProfileContext.PCTable.getRows()[index].
				 mAggregations.cells[2].mAggregations.content[1].$().toggleClass
				 ("tpRPVert"+parseInt(talentProfileContext.ProfileArr[indexJ].Profcy).toString(), true);
				 
				 if ( 1 == parseInt(talentProfileContext.ProfileArr[indexJ].Profcy))
					 {
					 
					 }
				 }
			}
		}
		}
			
	
		},
		
	setStyleClassAcc2 : function()
	{
		/*if ( talentProfileContext.CBTable.getRows().length  != 0 )
			{
		
		var allrows = talentProfileContext.CBTable.getRows() ;
		for (var index = 0; index < allrows.length; index++) {
			talentProfileContext.CBTable.getRows()[0].$().toggleClass("talent_profile_slider_N", true);
			
		}
			*/
			
			if ( talentProfileContext.CBTable.getRows().length  != 0 )
			{
			var profileData = talentProfileContext.ProfileArr ;
			
			for (var index = 0; index < talentProfileContext.CBModelArr.length; index++) {
				
				for (var indexJ = 0; indexJ < talentProfileContext.ProfileArr.length; indexJ++) {
				
				 if ( talentProfileContext.CBModelArr[index].ObjId ==  talentProfileContext.ProfileArr[indexJ].Tbjid)
					 {
					 if (  talentProfileContext.CBModelArr[index].Rating <  parseInt(talentProfileContext.ProfileArr[indexJ].Profcy))
						 {
						 talentProfileContext.CBTable.getRows()[index].$().toggleClass("talent_profile_slider_N", true);
						 }
					 else
						 {
						 talentProfileContext.CBTable.getRows()[index].$().toggleClass("talent_profile_slider", true);
						 }
					 
					 talentProfileContext.CBTable.getRows()[index].
					 mAggregations.cells[2].mAggregations.content[0].$().toggleClass
					 ("tpRPCB"+parseInt(talentProfileContext.ProfileArr[indexJ].Profcy).toString(), true);
					 talentProfileContext.CBTable.getRows()[index].
					 mAggregations.cells[2].mAggregations.content[1].$().toggleClass
					 ("tpRPVertCB"+parseInt(talentProfileContext.ProfileArr[indexJ].Profcy).toString(), true);
					 
					 }
				}
			}
			}
			
			
		},
		
	setStyleClassAcc3 : function()
	{
		/*if ( talentProfileContext.RSTable.getRows().length  != 0 )
			{
		
		var allrows = talentProfileContext.RSTable.getRows() ;
		for (var index = 0; index < allrows.length; index++) {
			talentProfileContext.RSTable.getRows()[0].$().toggleClass("talent_profile_slider_N", true);
			
		}
			}*/
		
		if ( talentProfileContext.RSTable.getRows().length  != 0 )
		{
		var profileData = talentProfileContext.ProfileArr ;
		
		for (var index = 0; index < talentProfileContext.RSModelArr.length; index++) {
			
			for (var indexJ = 0; indexJ < talentProfileContext.ProfileArr.length; indexJ++) {
			
			 if ( talentProfileContext.RSModelArr[index].ObjId ==  talentProfileContext.ProfileArr[indexJ].Tbjid)
				 {
				 if (  talentProfileContext.RSModelArr[index].Rating <  parseInt(talentProfileContext.ProfileArr[indexJ].Profcy))
					 {
					 talentProfileContext.RSTable.getRows()[index].$().toggleClass("talent_profile_slider_N", true);
					 }
				 else
					 {
					 talentProfileContext.RSTable.getRows()[index].$().toggleClass("talent_profile_slider", true);
					 }
				 
				 
				 talentProfileContext.RSTable.getRows()[index].
				 mAggregations.cells[2].mAggregations.content[0].$().toggleClass
				 ("tpRP"+parseInt(talentProfileContext.ProfileArr[indexJ].Profcy).toString(), true);
				 talentProfileContext.RSTable.getRows()[index].
				 mAggregations.cells[2].mAggregations.content[1].$().toggleClass
				 ("tpRPVert"+parseInt(talentProfileContext.ProfileArr[indexJ].Profcy).toString(), true);
				 
				 }
			}
		}
		}
		
		hideBusy();
		
		},
	
		
	
	saveTP : function()
	{
		

		talentProfileContext.CBModelArr
		talentProfileContext.RSModelArr
		talentProfileContext.PCModelArr
		
		/*Objid: "60000202"
			QgroupId: "60000200"
			Rating: 1
			Stext: "Core Behaviours"
			isCleared: false
			isNA: true*/
			
		
		var satveTPServiceURL = talent_profile_ns.url_root + "ZGW_MYPATH_TALENT_PROFILE_SRV";
		   var talentprofile_oDataModel = new sap.ui.model.odata.ODataModel(satveTPServiceURL);
		  var  odatamodel = talentprofile_oDataModel;
		//var odatamodel = talentProfileContext.talentprofile_oDataModel;
		var requestURL = "/SaveProfileSet";
		
		odatamodel.setHeaders({
			"X-Requested-With" : "XMLHttpRequest",
			"Content-Type" : "application/atom+xml",
			"DataServiceVersion" : "2.0",

		});
		showBusy();
		
		var createReqData = {
				//"IvSobid" : myPathContext.employeeId				
				};
		
		createReqData.IvSobid = myPathContext.employeeIdIV ;// myPathContext.employeeId;
		createReqData.Temp = "";
		var tpDataArr = [];
		var tpDataArrDel = [];
		
		for (var index = 0; index < talentProfileContext.CBModelArr.length; index++) {
			
			
			
			
			/*if ( talentProfileContext.CBModelArr[index].isNA == true)
				{
				if ( talentProfileContext.AddedObj.indexOf(talentProfileContext.CBModelArr[index].ObjId) != -1)
				{
				tpDataArrDel.push(createTPDeepEntityModel);
				}
				}*/
			
			if (talentProfileContext.CBModelArr[index].Rating == 0 && talentProfileContext.CBModelArr[index].OriginalNA == false)
				{
				var createTPDeepEntityModel = {
						//"Rating" : 	talentProfileContext.CBModelArr[index].Rating,
						"ObjId" :  talentProfileContext.CBModelArr[index].ObjId,
						"Begda" : talentProfileContext.CBModelArr[index].Begda,
					    "Endda" : talentProfileContext.CBModelArr[index].Endda,

					}; 
				
				tpDataArrDel.push(createTPDeepEntityModel);
				}
			
			else if (talentProfileContext.CBModelArr[index].RatingInitial !=  
				talentProfileContext.CBModelArr[index].Rating && talentProfileContext.CBModelArr[index].isNA == false)
				{
				
				var createTPDeepEntityModel = {
						"Rating" : 	talentProfileContext.CBModelArr[index].Rating,
						"ObjId" :  talentProfileContext.CBModelArr[index].ObjId
						//"Begda" : talentProfileContext.CBModelArr[index].Begda,
					    //"Endda" : talentProfileContext.CBModelArr[index].Endda,

					}; 
				tpDataArr.push(createTPDeepEntityModel)
				}
			
			
		}
		
			for (var index = 0; index < talentProfileContext.RSModelArr.length; index++) {
				
			
			
			
			/*if ( talentProfileContext.RSModelArr[index].isNA == true)
				{
				if ( talentProfileContext.AddedObj.indexOf(talentProfileContext.RSModelArr[index].ObjId) != -1)
				{
				tpDataArrDel.push(createTPDeepEntityModel);
				}
				}*/
			if (talentProfileContext.RSModelArr[index].Rating == 1 && talentProfileContext.RSModelArr[index].OriginalNA == false)
			{
				var createTPDeepEntityModel = {
						//"Rating" : talentProfileContext.RSModelArr[index].Rating,
						"ObjId" :  talentProfileContext.RSModelArr[index].ObjId,
						"Begda" : talentProfileContext.RSModelArr[index].Begda,
					    "Endda" : talentProfileContext.RSModelArr[index].Endda,
						
					}; 
			tpDataArrDel.push(createTPDeepEntityModel);
			}
			
			else if (talentProfileContext.RSModelArr[index].RatingInitial !=  talentProfileContext.RSModelArr[index].Rating && talentProfileContext.RSModelArr[index].isNA == false)
				{
				var createTPDeepEntityModel = {
						"Rating" : talentProfileContext.RSModelArr[index].Rating,
						"ObjId" :  talentProfileContext.RSModelArr[index].ObjId
						//"Begda" : talentProfileContext.RSModelArr[index].Begda,
					    //"Endda" : talentProfileContext.RSModelArr[index].Endda,
						
					}; 
				tpDataArr.push(createTPDeepEntityModel)
				}
				
			
		}
			
			for (var index = 0; index < talentProfileContext.PCModelArr.length; index++) {
				
				
				
				
				/*if ( talentProfileContext.PCModelArr[index].isNA == true)
					{
					if ( talentProfileContext.AddedObj.indexOf(talentProfileContext.PCModelArr[index].ObjId) != -1)
					{
					tpDataArrDel.push(createTPDeepEntityModel);
					}
					}*/
				if (talentProfileContext.PCModelArr[index].Rating == 1 && talentProfileContext.PCModelArr[index].OriginalNA == false)
				{
				
				var createTPDeepEntityModel = {
						//"Rating" : 	talentProfileContext.PCModelArr[index].Rating,
						"ObjId" :  talentProfileContext.PCModelArr[index].ObjId,
						"Begda" : talentProfileContext.PCModelArr[index].Begda,
					    "Endda" : talentProfileContext.PCModelArr[index].Endda,
						
					}; 
				tpDataArrDel.push(createTPDeepEntityModel);
				}
				
				else if (talentProfileContext.PCModelArr[index].RatingInitial !=  talentProfileContext.PCModelArr[index].Rating && talentProfileContext.PCModelArr[index].isNA == false)
					{
					var createTPDeepEntityModel = {
							"Rating" : 	talentProfileContext.PCModelArr[index].Rating,
							"ObjId" :  talentProfileContext.PCModelArr[index].ObjId
							//"Begda" : talentProfileContext.PCModelArr[index].Begda,
						    //"Endda" : talentProfileContext.PCModelArr[index].Endda,
							
						}; 
					tpDataArr.push(createTPDeepEntityModel)
					}
					
			}
			var createTPDeepEntityModelDummy = {
					"Rating" : 	999,
					"ObjId" :  "9999"
			}
			
			var toSave = true ;
			
			if (  tpDataArr.length == 0 &&  tpDataArrDel.length == 0)
				{
				toSave = false ;
				}
			if ( tpDataArr.length == 0)
				{
				tpDataArr.push(createTPDeepEntityModelDummy);
				
				}
			
			if ( tpDataArrDel.length == 0)
			{
				tpDataArrDel.push(createTPDeepEntityModelDummy);
				
			}

			createReqData.ProfileToAddProfile =  tpDataArr;
			createReqData.ProfileToDeleteProfile =  tpDataArrDel;
		
		//If for any objective title and details are blank then do not save
		//if(checkFlag){
			/*if ( toSave == false )
				{
				  hideBusy();
				sap.ui.commons.MessageBox.alert("There are no changes");
				}
			
			else
				{*/
			
			odatamodel.create(requestURL, createReqData, null, 
					function(oData,oResponse) {
				     hideBusy();
				    // refreshScreen();
				     myPathContext.isEdited = false ;
				     myPathContext.back();
				   if ( undefined ==  oResponse.headers.error )
					   {
					  // sap.ui.commons.MessageBox.alert(oResponse.headers.success);
					   sap.m.MessageToast.show(oResponse.headers.success, {
			                 duration: 3000,                  
			                 width: "40%",                   
			                 my: "center center",             
			                 at: "center center",             
			                 onClose: function(){
			                	 
			                 },                   
			                 animationDuration: 500,        
			             });
					  // talentProfileContext.accordion1.destroy();
					   //talentProfileContext.accordion2.destroy();
					   //talentProfileContext.accordion3.destroy();
					  /* var CBModel = talentProfileContext.CBTable.getModel().oData.modelData ;
					   for (var index = 0; index < CBModel.length; index++) {
						   CBModel[index].isCleared = false ;
						   if ( CBModel[index].Rating == 0 &&  CBModel[index].OriginalNA == false)
							   {
							   CBModel[index].OriginalNA = true ;
							   CBModel[index].isNA = true ;
							   }
						   else if (CBModel[index].Rating > 0)
							   {

							   CBModel[index].OriginalNA = false ;
							  // CBModel[index].isNA = true ;
							   
							   }
						   //talentProfileContext.CBModelArr[index].isCleared = false ;
					   }
					   talentProfileContext.CBTable.getModel().refresh();
					   
					   
					   var RSModel = talentProfileContext.RSTable.getModel().oData.modelData ;
					   for (var index = 0; index < RSModel.length; index++) {
						   RSModel[index].isCleared = false ;
						   if ( RSModel[index].Rating == 1 &&  RSModel[index].OriginalNA == false)
						   {
							   RSModel[index].OriginalNA = true ;
							   RSModel[index].isNA = true ;
						   }
						   else if ( RSModel[index].Rating > 1)
							   {
							   RSModel[index].OriginalNA = false ;
							   }
					   }
					   talentProfileContext.RSTable.getModel().refresh();
					   
					   var PCModel = talentProfileContext.PCTable.getModel().oData.modelData ;
					   for (var index = 0; index < PCModel.length; index++) {
						   PCModel[index].isCleared = false ;
						   
						   if ( PCModel[index].Rating == 1 &&  PCModel[index].OriginalNA == false)
						   {
							   PCModel[index].OriginalNA = true ;
							   PCModel[index].isNA = true ;
						   }
						   
						   else if ( PCModel[index].Rating > 1)
							   {
							   PCModel[index].OriginalNA = false ;
							   }
					   }
					   talentProfileContext.PCTable.getModel().refresh();*/
					   
					  // generateTalentProfileScreen();
					  // myPathContext.back();
					   }
				   else
					   {
					   sap.ui.commons.MessageBox.alert(oResponse.headers.error);
					   }
						
					}
			, function(oError) {
				    hideBusy();
					sap.ui.commons.MessageBox.alert(oError.Message);
				});
				//}
		
		


	}
			
	
	
});

/* Function to generate talent profile screen */
function generateTalentProfileScreen(){
	
	for(var i=0; i<talentProfileContext.qualificationGroups.length; i++){

		var oSection1 = new sap.ui.commons.AccordionSection();
		oSection1.setTitle(talentProfileContext.qualificationGroups[i].groupname);
		oSection1.setCollapsed(true);
		if ( i == 0)
			{
			talentProfileContext.accordion1.addSection(oSection1);
			}
		else if ( i == 1)
			{
			talentProfileContext.accordion2.addSection(oSection1);
			}
		else
			{
			talentProfileContext.accordion3.addSection(oSection1);
			}
		
		var template = "";
		var tablemodel = new sap.ui.model.json.JSONModel();
						
		if(talentProfileContext.qualificationGroups[i].groupid == talentProfileContext.competencies.CORE_BEHAVIOR){
			template = generateTableTemplate(true , talentProfileContext.coreBehaviorQualifications.length);
			tablemodel.setData({modelData: talentProfileContext.coreBehaviorQualifications});
		}
		else if(talentProfileContext.qualificationGroups[i].groupid == talentProfileContext.competencies.PROFESSIONAL){
			template = generateTableTemplate(false , talentProfileContext.professionalQualifications.length);
			tablemodel.setData({modelData: talentProfileContext.professionalQualifications});
		}
		else if(talentProfileContext.qualificationGroups[i].groupid == talentProfileContext.competencies.ROLE_SPECIFIC){
			template = generateTableTemplate(false , talentProfileContext.roleQualifications.length);
			tablemodel.setData({modelData: talentProfileContext.roleQualifications});
		}
		
		template.setModel(tablemodel);
		template.bindRows("/modelData");
		
		oSection1.addContent(template);
		
		if ( i == 1)
		{
		talentProfileContext.CBModelArr = tablemodel.oData.modelData ;
		talentProfileContext.CBTable = template ;
		
		}
	else if ( i == 0)
		{
		talentProfileContext.PCModelArr = tablemodel.oData.modelData ;
		talentProfileContext.PCTable = template ;
		}
	else
		{
		talentProfileContext.RSModelArr = tablemodel.oData.modelData ;
		talentProfileContext.RSTable = template ;
		}
		
	}
	
}

/* function to generate core behavior template */
function generateCoreBehaviorTemplate(section){
	
}

/* function to generate professional template */
function generateProfessionalTemplate(section){
	
}

/* function to generate role specific template */
function generateRoleSpecificTemplate(section){
	
}

/* Function to generate the table template */
function generateTableTemplate(flag , rows){
	
	var visibleRowCount = 10;
	/*if(flag){
		visibleRowCount = 2;
	}*/
	visibleRowCount = rows ;
	//Create an instance of the table control
	var oTable = new sap.ui.table.Table({
	        visibleRowCount: visibleRowCount,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        allowColumnReordering: false
	}).addStyleClass("talent_tablestyle");

	//Define the columns and the control templates to be used
	var oColumn = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: myPathContext.i18nModel.getProperty("QUAL")}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Stext").setTooltip("{Stext}").setWrapping(true).addStyleClass("talent_profile_title"),
	      //  sortProperty: "Stext",
	       // filterProperty: "Stext",
	        width: "30%",
	        resizable: true,
	        //tooltip : 
	});
	oTable.addColumn(oColumn);
	//console.log("{Stext}");
	
	oTable.addColumn(new sap.ui.table.Column({
        label: new sap.ui.commons.Label({text: myPathContext.i18nModel.getProperty("N_A").toUpperCase()}),
        template: new sap.ui.commons.CheckBox().bindProperty("checked", "isNA").addStyleClass("talent_profile_checkbox").attachChange(function(oControlEvent){
        	//alert("hola");
        	myPathContext.isEdited = true ;
        	var path = oControlEvent.getSource().getBindingContext().sPath;
            var obj = oTable.getModel().getProperty(path);
           // alert(JSON.stringify(obj));
            
            var index = parseInt(path.substring(path.lastIndexOf('/')+1));
            
            if ( "60000200" ==  oTable.getModel().oData.modelData[index].QgroupId)
            	{
            	 oTable.getModel().oData.modelData[index].Rating =  0 ;
            	}
            
            else
            	{
            	 oTable.getModel().oData.modelData[index].Rating =  1 ;
            	}
           
        	if ( this.getChecked())
        		{
        	
           // alert(index);
            oTable.getModel().oData.modelData[index].sliderEnabled =  false ;
        		}
        	
        	else
        		{
        		 oTable.getModel().oData.modelData[index].sliderEnabled =  true ;
        		}
        	
        	//Models
        	if ( "60000200" ==  oTable.getModel().oData.modelData[index].QgroupId)
        	{
        		talentProfileContext.CBModelArr = oTable.getModel().oData.modelData ; //tablemodel.oData.modelData ;
        	}
        	else if ( "60000199" ==  oTable.getModel().oData.modelData[index].QgroupId)
        	{
        		talentProfileContext.PCModelArr = oTable.getModel().oData.modelData ;
        		
        	}
        	
        	else
        	{
        		talentProfileContext.RSModelArr = oTable.getModel().oData.modelData ; //tablemodel.oData.modelData ;
        	}
        		
        	
        }),
        //sortProperty: "checked",
        //filterProperty: "checked",
        width: "70px",
        hAlign: "Center",
        resizable: false
	}));
		
	var labels = [];
	var minval = 1, maxval;
	if(flag){
		labels.push("Not Applicable");
		for(var key in talentProfileContext.coreBehaviorCompetencies){
			labels.push(talentProfileContext.coreBehaviorCompetencies[key]);
		}
		minval = 0;
		maxval = labels.length - 1;
	}
	else{
		for(var key in talentProfileContext.professionalCompetencies){
			labels.push(talentProfileContext.professionalCompetencies[key]);
		}
		minval = 1;
		maxval = labels.length;
	}
	//labels.push(<font color="red">This is some text!</font>
	var reqProftext = new sap.m.Text({
		text : "Required \n Proficiency"
	}).addStyleClass("tpRP").bindProperty("visible", "RPVis");
	
	/*var reqProftextI = new sap.m.Text({
		text : "|"
	}).addStyleClass("tpRPVert").bindProperty("visible", "RPVis");*/
	
	var reqProftextI = new sap.m.Image({
		src : "./com/capgemini/mypath/images/icon_proficiencyTP.png"
	}).addStyleClass("tpRPVert");
	
	//capgemini/mypath/talent_profile/images/icon_proficiencyTP.png
	
	var sliderTP = new sap.ui.commons.Slider({
    	min: minval,
    	max: maxval,
    	totalUnits:labels.length,
    	labels: labels,
    	stepLabels: true,
    	smallStepWidth: 1,
    	change : function(oControlEvent)
    	{
    		//this.removeStyleClass("talent_profile_slider");
    		//this.addStyleClass("talent_profile_slider_N");
    		myPathContext.isEdited = true ;
    		var path = oControlEvent.getSource().getBindingContext().sPath;
            var obj = oTable.getModel().getProperty(path);
           // alert(JSON.stringify(obj));
            
            var index = parseInt(path.substring(path.lastIndexOf('/')+1));
            
           
           // alert(index);sliderEnabled
            oTable.getModel().oData.modelData[index].Rating =  this.getValue() ;
            
            if ( "60000200" ==  oTable.getModel().oData.modelData[index].QgroupId)
        	{
        		talentProfileContext.CBModelArr = oTable.getModel().oData.modelData ;
        		
        		//if ( oTable.getModel().oData.modelData[index].ObjId
        		
        		for (var indexJ = 0; indexJ < talentProfileContext.ProfileArr.length; indexJ++) {
        			
       			 if ( oTable.getModel().oData.modelData[index].ObjId ==  talentProfileContext.ProfileArr[indexJ].Tbjid)
       				 {
       				 if (  oTable.getModel().oData.modelData[index].Rating <  parseInt(talentProfileContext.ProfileArr[indexJ].Profcy))
       					 {
       					 talentProfileContext.CBTable.getRows()[index].$().toggleClass("talent_profile_slider_N", true);
       					 talentProfileContext.CBTable.getRows()[index].$().toggleClass("talent_profile_slider", false);
       					 }
       				 else
       					 {
       					 talentProfileContext.CBTable.getRows()[index].$().toggleClass("talent_profile_slider", true);
       					 talentProfileContext.CBTable.getRows()[index].$().toggleClass("talent_profile_slider_N", false);
       					 }
       				 }
       			}
        		
        	}
        	else if ( "60000199" ==  oTable.getModel().oData.modelData[index].QgroupId)
        	{
        		talentProfileContext.PCModelArr = oTable.getModel().oData.modelData ;
        		
        		for (var indexJ = 0; indexJ < talentProfileContext.ProfileArr.length; indexJ++) {
        			
          			 if ( oTable.getModel().oData.modelData[index].ObjId ==  talentProfileContext.ProfileArr[indexJ].Tbjid)
          				 {
          				 if (  oTable.getModel().oData.modelData[index].Rating <  parseInt(talentProfileContext.ProfileArr[indexJ].Profcy))
          					 {
          					 talentProfileContext.PCTable.getRows()[index].$().toggleClass("talent_profile_slider_N", true);
          					talentProfileContext.PCTable.getRows()[index].$().toggleClass("talent_profile_slider", false);
          					 }
          				 else
          					 {
          					 talentProfileContext.PCTable.getRows()[index].$().toggleClass("talent_profile_slider", true);
          					talentProfileContext.PCTable.getRows()[index].$().toggleClass("talent_profile_slider_N", false);
          					 }
          				 }
          			}
        		
        	}
        	
        	else
        	{
        		talentProfileContext.RSModelArr = oTable.getModel().oData.modelData ; //; tablemodel.oData.modelData ;
        		
        		for (var indexJ = 0; indexJ < talentProfileContext.ProfileArr.length; indexJ++) {
        			
         			 if ( oTable.getModel().oData.modelData[index].ObjId ==  talentProfileContext.ProfileArr[indexJ].Tbjid)
         				 {
         				 if (  oTable.getModel().oData.modelData[index].Rating <  parseInt(talentProfileContext.ProfileArr[indexJ].Profcy))
         					 {
         					 talentProfileContext.RSTable.getRows()[index].$().toggleClass("talent_profile_slider_N", true);
         					 talentProfileContext.RSTable.getRows()[index].$().toggleClass("talent_profile_slider", false);
         					 }
         				 else
         					 {
         					 talentProfileContext.RSTable.getRows()[index].$().toggleClass("talent_profile_slider", true);
         					 talentProfileContext.RSTable.getRows()[index].$().toggleClass("talent_profile_slider_N", false);
         					 }
         				 }
         			}
        	}
    	}
    }).bindProperty("value", "Rating").addStyleClass("talent_profile_slider").bindProperty("enabled" , "sliderEnabled");
	
	oTable.addColumn(new sap.ui.table.Column({
        label: new sap.ui.commons.Label({text: myPathContext.i18nModel.getProperty("STATUS")}),
       template : 
       new sap.ui.layout.HorizontalLayout({
    	 //  id :"kandpal",
            content: [ 
                      	reqProftext , reqProftextI  , sliderTP
                      ],
        }).addStyleClass("tpHorzLayout"),
        //template :  tpSlider1,
       /* template: /*new sap.ui.commons.Slider({
        	min: minval,
        	max: maxval,
        	totalUnits:labels.length,
        	labels: labels,
        	stepLabels: true,
        	smallStepWidth: 1,
        	change : function(oControlEvent)
        	{
        		//this.removeStyleClass("talent_profile_slider");
        		//this.addStyleClass("talent_profile_slider_N");
        		var path = oControlEvent.getSource().getBindingContext().sPath;
                var obj = oTable.getModel().getProperty(path);
               // alert(JSON.stringify(obj));
                
                var index = parseInt(path.substring(path.lastIndexOf('/')+1));
                
               
               // alert(index);sliderEnabled
                oTable.getModel().oData.modelData[index].Rating =  this.getValue() ;
                
                if ( "60000200" ==  oTable.getModel().oData.modelData[index].QgroupId)
            	{
            		talentProfileContext.CBModelArr = oTable.getModel().oData.modelData ;
            		
            		//if ( oTable.getModel().oData.modelData[index].ObjId
            		
            		for (var indexJ = 0; indexJ < talentProfileContext.ProfileArr.length; indexJ++) {
            			
           			 if ( oTable.getModel().oData.modelData[index].ObjId ==  talentProfileContext.ProfileArr[indexJ].Tbjid)
           				 {
           				 if (  oTable.getModel().oData.modelData[index].Rating <  parseInt(talentProfileContext.ProfileArr[indexJ].Profcy))
           					 {
           					 talentProfileContext.CBTable.getRows()[index].$().toggleClass("talent_profile_slider_N", true);
           					 talentProfileContext.CBTable.getRows()[index].$().toggleClass("talent_profile_slider", false);
           					 }
           				 else
           					 {
           					 talentProfileContext.CBTable.getRows()[index].$().toggleClass("talent_profile_slider", true);
           					 talentProfileContext.CBTable.getRows()[index].$().toggleClass("talent_profile_slider_N", false);
           					 }
           				 }
           			}
            		
            	}
            	else if ( "60000199" ==  oTable.getModel().oData.modelData[index].QgroupId)
            	{
            		talentProfileContext.PCModelArr = oTable.getModel().oData.modelData ;
            		
            		for (var indexJ = 0; indexJ < talentProfileContext.ProfileArr.length; indexJ++) {
            			
              			 if ( oTable.getModel().oData.modelData[index].ObjId ==  talentProfileContext.ProfileArr[indexJ].Tbjid)
              				 {
              				 if (  oTable.getModel().oData.modelData[index].Rating <  parseInt(talentProfileContext.ProfileArr[indexJ].Profcy))
              					 {
              					 talentProfileContext.PCTable.getRows()[index].$().toggleClass("talent_profile_slider_N", true);
              					talentProfileContext.PCTable.getRows()[index].$().toggleClass("talent_profile_slider", false);
              					 }
              				 else
              					 {
              					 talentProfileContext.PCTable.getRows()[index].$().toggleClass("talent_profile_slider", true);
              					talentProfileContext.PCTable.getRows()[index].$().toggleClass("talent_profile_slider_N", false);
              					 }
              				 }
              			}
            		
            	}
            	
            	else
            	{
            		talentProfileContext.RSModelArr = oTable.getModel().oData.modelData ; //; tablemodel.oData.modelData ;
            		
            		for (var indexJ = 0; indexJ < talentProfileContext.ProfileArr.length; indexJ++) {
            			
             			 if ( oTable.getModel().oData.modelData[index].ObjId ==  talentProfileContext.ProfileArr[indexJ].Tbjid)
             				 {
             				 if (  oTable.getModel().oData.modelData[index].Rating <  parseInt(talentProfileContext.ProfileArr[indexJ].Profcy))
             					 {
             					 talentProfileContext.RSTable.getRows()[index].$().toggleClass("talent_profile_slider_N", true);
             					 talentProfileContext.RSTable.getRows()[index].$().toggleClass("talent_profile_slider", false);
             					 }
             				 else
             					 {
             					 talentProfileContext.RSTable.getRows()[index].$().toggleClass("talent_profile_slider", true);
             					 talentProfileContext.RSTable.getRows()[index].$().toggleClass("talent_profile_slider_N", false);
             					 }
             				 }
             			}
            	}
        	}
        }).bindProperty("value", "Rating").addStyleClass("talent_profile_slider").bindProperty("enabled" , "sliderEnabled"),*/
        width: "65%",
        hAlign: "Center",
        resizable: true
	}));
	
  
	/*var oColumn = new sap.ui.table.Column({
        label: new sap.ui.commons.Label({text: "Required Proficiency"}),
        template: new sap.ui.commons.TextView().bindProperty("text", "Profcy").setTooltip("{Profcy}").setWrapping(true).addStyleClass("talent_profile_title"),
     //   sortProperty: "Stext",
      //  filterProperty: "Stext",
        width: "20%",
        resizable: true,
        //tooltip : 
});
oTable.addColumn(oColumn);*/


	oTable.addColumn(new sap.ui.table.Column({
        label: new sap.ui.commons.Label({text: myPathContext.i18nModel.getProperty("CLEAR")}),
        template: new sap.ui.commons.CheckBox().bindProperty("checked", "isCleared").
        bindProperty("enabled" , "sliderEnabled").addStyleClass("talent_profile_checkbox").attachChange(function(oControlEvent){
        	var path = oControlEvent.getSource().getBindingContext().sPath;
        	myPathContext.isEdited = true ;
            var obj = oTable.getModel().getProperty(path);
            var index = parseInt(path.substring(path.lastIndexOf('/')+1));
            if ( "60000200" ==  oTable.getModel().oData.modelData[index].QgroupId)
        	{
        	 oTable.getModel().oData.modelData[index].Rating =  0 ;
        	}
        
        else
        	{
        	 oTable.getModel().oData.modelData[index].Rating =  1 ;
        	}
            
            if ( "60000200" ==  oTable.getModel().oData.modelData[index].QgroupId)
        	{
        		talentProfileContext.CBModelArr = oTable.getModel().oData.modelData ;
        	}
        	else if ( "60000199" ==  oTable.getModel().oData.modelData[index].QgroupId)
        	{
        		talentProfileContext.PCModelArr = oTable.getModel().oData.modelData ;
        		
        	}
        	
        	else
        	{
        		talentProfileContext.RSModelArr =  oTable.getModel().oData.modelData ;
        	}
            
            oTable.getModel().oData.modelData[index].isCleared =  false ;
        	
        }),
       // sortProperty: "checked",
        //filterProperty: "checked",
        width: "90px",
        hAlign: "Center",
        resizable: true
	}));
		
	return oTable;
	
}

function refreshScreen()
{
	

	
	
	//getTalentProfileModelData();
	//getAllQualifications();
	talentProfileContext.AddedObj = [];
	talentProfileContext.coreBehaviorQualifications = [];
	talentProfileContext.professionalQualifications = [];
	talentProfileContext.roleQualifications = [];
	showBusy();
	//var requestURL = "TalentProfileSet?$filter=IvEmployeeid eq '"+myPathContext.employeeIdIV+"'";
	//var requestURL =  "TalentProfileSet?$expand=TalentProfileToPositionProfile&$filter=IvEmployeeid eq '" +myPathContext.employeeIdIV + "'" ;
	var requestURL =  "TalentHeaderSet?$expand=TalentHeaderToTalentProfile,TalentHeaderToPositionProfile&$filter=IvSobid eq '" +myPathContext.employeeIdIV + "'" ;
	talentProfileContext.talentprofile_oDataModel.read(requestURL,null,null,true,
		function(oData, oResponse){
			
		var results = oData.results[0].TalentHeaderToTalentProfile.results ;
		//talentProfileContext.ProfileArr = results[0].TalentProfileToPositionProfile.results ;
		//var profileResults
		talentProfileContext.ProfileArr = oData.results[0].TalentHeaderToPositionProfile.results ; 
			//var results = oData.results;
			for(var i=0; i<results.length; i++){
				results[i].isNA = false;
				results[i].isCleared = false;
				results[i].sliderEnabled = true;
				results[i].Rating = parseInt(results[i].Rating,"10");
				results[i].RatingInitial =  results[i].Rating ;
				//results[i].RatingTh =  5  ;
				results[i].TP1 = "";
				results[i].OriginalNA = false;
				
				
				/*if ( i == 0)
					{
					
					talentProfileContext.ProfileArr = results[0].TalentProfileToPositionProfile.results ;
					}*/
					
				
				/*Profcy: "0002"
					Tbjid: "60000202"
					Ttext: "Core Behaviours"*/
				
				talentProfileContext.AddedObj.push(results[i].ObjId);
				talentProfileContext.modeldata.push(results[i]);
			}
			getAllQualifications();
			
			//generate different models for each competency
			/*for(var i=0; i<talentProfileContext.modeldata.length; i++){
				
				if(talentProfileContext.modeldata[i].QgroupId == talentProfileContext.competencies.CORE_BEHAVIOR){
					talentProfileContext.coreBehaviorQualifications.push(talentProfileContext.modeldata[i]);
				}
				else if(talentProfileContext.modeldata[i].QgroupId == talentProfileContext.competencies.PROFESSIONAL){
					talentProfileContext.professionalQualifications.push(talentProfileContext.modeldata[i]);
				}
				else if(talentProfileContext.modeldata[i].QgroupId == talentProfileContext.competencies.ROLE_SPECIFIC){
					talentProfileContext.roleQualifications.push(talentProfileContext.modeldata[i]);
				}
			}*/
			
			
			hideBusy();
			//generateTalentProfileScreen();
			//generateTalentProfileScreen();
			//getAllQualifications();
			//
			
		},
		function(oError){
			hideBusy();
			//TO DO code for error handling
		}
	
	);

}



