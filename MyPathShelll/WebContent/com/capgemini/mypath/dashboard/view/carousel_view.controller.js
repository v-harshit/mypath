
sap.ui.controller("com.capgemini.mypath.dashboard.view.carousel_view", {

});

/* Function create carousel item for As An Employee */
function createEmployeeCarouselItem(){
	
	//Carousel Item Label
	var item_label = new sap.m.Text({
		text: myPathContext.i18nModel.getProperty("AS_AN_EMP").toUpperCase()
	}).addStyleClass("carousel_item_label");
	
	//Carousel Item Content
	var list1 = new sap.m.List({
		
	}).addStyleClass("carousel_item_content_list");
	myPathContext.carousel_emp_list = list1;
	
	//SEE ALL Button
	var see_all_btn = new sap.m.Button({
        type : "Emphasized",
        text: myPathContext.i18nModel.getProperty("SEE_ALL").toUpperCase(),
        press: function(){
        	var parent = this.getParent().getParent();
        	if(parent.hasStyleClass("carousel_left_item")){
        		moveCarousel("right");
        	}
        	else if(parent.hasStyleClass("carousel_right_item")){
        		moveCarousel("left");
        	}
        	else{
        		myPathContext.seeAllFlag = true;
            	myPathContext.asAnEmpSelectedFilters = [myPathContext.documentText.GENERAL_FEEDBACK,
            	                                        myPathContext.documentText.ASSIGNMENT_APPRAISAL];
            	myPathContext.setAppContent(myPathContext.i18nModel.getProperty("AS_AN_EMP"),
       				 "com.capgemini.mypath.employee_facet", true);
        	}
        	
        }
    }).addStyleClass("mypath_add_button_style").addStyleClass("carousel_see_all_btn");
	
	var vLayout1 = new sap.ui.commons.layout.VerticalLayout({
		content:[item_label,list1,see_all_btn]
	}).addStyleClass("carousel_item_content");
	
	//Carousel Item
	var carousel_item = new sap.m.CustomListItem({
		type: sap.m.ListType.Inactive,
		content:[vLayout1]
	}).addStyleClass("carousel_item");
	
	return carousel_item;
}

/* Function create carousel item for As An Assignment Manager/Feedback Provider */
function createManagerCarouselItem(){
	
	var item_label = new sap.m.Text({
		text: myPathContext.i18nModel.getProperty("AS_AN_ASSGN_MGR_HR_CONTACT").toUpperCase()
	}).addStyleClass("carousel_item_label").addStyleClass("carousel_manager_item_label");
	
	//Carousel Item Content
	var list1 = new sap.m.List({
		
	}).addStyleClass("carousel_item_content_list");
	myPathContext.carousel_am_list = list1;
	
	var see_all_btn = new sap.m.Button({
        type : "Emphasized",
        text: myPathContext.i18nModel.getProperty("SEE_ALL").toUpperCase(),
        press: function(){
        	var parent = this.getParent().getParent();
        	if(parent.hasStyleClass("carousel_left_item")){
        		moveCarousel("right");
        	}
        	else if(parent.hasStyleClass("carousel_right_item")){
        		moveCarousel("left");
        	}
        	else{
        		myPathContext.seeAllFlag = true;
        		myPathContext.setAppContent(myPathContext.i18nModel.getProperty("AS_AN_ASSGN_MGR_HR_CONTACT"),
      				 "com.capgemini.mypath.assign_manager_facet", true);
        	}
        }
    }).addStyleClass("mypath_add_button_style").addStyleClass("carousel_see_all_btn");
	
	var vLayout1 = new sap.ui.commons.layout.VerticalLayout({
		content:[item_label,list1,see_all_btn]
	}).addStyleClass("carousel_item_content");
	
	var carousel_item = new sap.m.CustomListItem({
		type: sap.m.ListType.Inactive,
		content:[vLayout1]
	}).addStyleClass("carousel_item");
	
	return carousel_item;
	
}

/* Function create carousel item for performance review documents */
function createPerformanceCarouselItem(){
	
	var item_label = new sap.m.Text({
		text: myPathContext.i18nModel.getProperty("MY_PERFORMANCE_REVIEW").toUpperCase()
		//text: "MY PERFORMANCE REVIEW" 
	}).addStyleClass("carousel_item_label");
	
	//Carousel Item Content
	var list1 = new sap.m.List({
		
	}).addStyleClass("carousel_item_content_list");
	myPathContext.carousel_perf_list = list1;
	
	var see_all_btn = new sap.m.Button({
        type : "Emphasized",
        text: myPathContext.i18nModel.getProperty("SEE_ALL").toUpperCase(),
        press: function(){
        	var parent = this.getParent().getParent();
        	if(parent.hasStyleClass("carousel_left_item")){
        		moveCarousel("right");
        	}
        	else if(parent.hasStyleClass("carousel_right_item")){
        		moveCarousel("left");
        	}
        	else{
        		myPathContext.seeAllFlag = true;
        		myPathContext.asAnEmpSelectedFilters = [myPathContext.documentText.PERFORMANCE_REVIEW,
        	                                        myPathContext.documentText.VP_PERFORMANCE_REVIEW];
        		myPathContext.setAppContent(myPathContext.i18nModel.getProperty("AS_AN_EMP"),
   				 "com.capgemini.mypath.employee_facet", true);
        	}
        }
    }).addStyleClass("mypath_add_button_style").addStyleClass("carousel_see_all_btn");
	
	var vLayout1 = new sap.ui.commons.layout.VerticalLayout({
		content:[item_label,list1,see_all_btn]
	}).addStyleClass("carousel_item_content");
	
	var carousel_item = new sap.m.CustomListItem({
		type: sap.m.ListType.Inactive,
		content:[vLayout1]
	}).addStyleClass("carousel_item");
	
	return carousel_item;
}

/* Function to create document item template */
function createDocumentItemTemplate(type){
	
	var actionIcon = new sap.ui.commons.Image({
		src : "./com/capgemini/mypath/images/icon_actionflag.png",
		visible : "{ActionRequired}"	
	}).addStyleClass("carousel_doc_item_actionflag");
	
	var docIcon = new sap.ui.commons.Image({
		src : "{doc_icon_path}",
	}).addStyleClass("carousel_doc_item_icon");
	
	var appraisername = new sap.m.Text({
		text : "{AppraiserName}",
	}).addStyleClass("carousel_doc_item_name");
	
	var appraiseename = new sap.m.Text({
		text : "{AppraiseeName}",
	}).addStyleClass("carousel_doc_item_name");
	
	var appraisername_action = new sap.m.Text({
		visible: "{AsEmpAction}",
		text : "{AppraiserName}",
	}).addStyleClass("carousel_doc_item_name");
	
	var appraiseename_action = new sap.m.Text({
		visible: "{AsMgrAction}",
		text : "{AppraiseeName}",
	}).addStyleClass("carousel_doc_item_name");
	
	var vLayout1 = new sap.ui.commons.layout.VerticalLayout({
		content:[
		         new sap.m.Text({
		        	 text: "{AppraisalName}"
		         }).addStyleClass("carousel_doc_item_title"),
		         
		         new sap.m.Text({
		        	 text: "{ApStatusSubName}"
		         }).addStyleClass("carousel_doc_item_substatus")
		         ]
	});
	
	var carousel_item = new sap.m.CustomListItem({
		type: sap.m.ListType.Active,
		press: function(){
			myPathContext.navigateToDocument(this);
		},
		customData : [ {
			Type : "sap.ui.core.CustomData",
			key : "documentid",
			value : "{AppraisalId}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "documenttitle",
			value : "{AppraisalName}"
		},{
			Type : "sap.ui.core.CustomData",
			key : "substatus",
			value : "{ApStatusSub}"
		},{
			Type : "sap.ui.core.CustomData",
			key : "appraiseeid",
			value : "{AppraiseeId}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "appraiseename",
			value : "{AppraiseeName}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "appraiserid",
			value : "{AppraiserId}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "appraisername",
			value : "{AppraiserName}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "validfrom",
			value : "{ApStartDate}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "validto",
			value : "{ApEndDate}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "validfromISO",
			value : "{ApStartDateISO}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "validtoISO",
			value : "{ApEndDateISO}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "documenttype",
			value : "{AppraisalTypeText}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "documenttype_displaytext",
			value : "{AppraisalTypeLn}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "partappraisername",
			value : "{PartAppraiserName}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "partappraiserid",
			value : "{PartAppraiserId}"
		}, {
			Type : "sap.ui.core.CustomData",
			key : "status",
			value : "{ApStatus}"
		}]
	}).addStyleClass("carousel_doc_item");
	
	if(type == "performance"){
		vLayout1.addStyleClass("carousel_doc_item_perfinfolayout");
		carousel_item.addContent(docIcon);
		carousel_item.addContent(vLayout1);
	}
	else if(type == "employee"){
		vLayout1.addStyleClass("carousel_doc_item_infolayout");
		carousel_item.addContent(actionIcon);
		carousel_item.addContent(appraisername);
		carousel_item.addContent(vLayout1);
	}
	else if(type == "reviewer"){
		vLayout1.addStyleClass("carousel_doc_item_infolayout");
		carousel_item.addContent(actionIcon);
		carousel_item.addContent(appraiseename);
		carousel_item.addContent(vLayout1);
	}
	else if(type == "action"){
		vLayout1.addStyleClass("carousel_doc_item_infolayout");
		carousel_item.addContent(actionIcon);
		carousel_item.addContent(appraiseename_action);
		carousel_item.addContent(appraisername_action);
		carousel_item.addContent(vLayout1);
	}
	
	return carousel_item;
	
}

/* Functions for carousel functionality */

function getNextMoveIndex(currentindex,direction){
	
	var carousel_length = myPathContext.dashboardCarousel.getItems().length - 1;
	var newIndex = -1;
	
	if(direction == "right"){
		if(currentindex > 0){
			newIndex = currentindex - 1;
		}
		else if(currentindex == 0){
			newIndex = carousel_length;
		}
	}
	
	else if(direction == "left"){
		if(currentindex < carousel_length){
			newIndex = currentindex + 1;
		}
		else if(currentindex == carousel_length){
			newIndex = 0;
		}
	}
	return newIndex;
}

function moveCarousel(direction){
	var myCarousel = myPathContext.dashboardCarousel;
	
	var currentitem = sap.ui.getCore().byId($(".carousel_main_item").attr("id"));
	var leftitem = sap.ui.getCore().byId($(".carousel_left_item").attr("id"));
	var rightitem = sap.ui.getCore().byId($(".carousel_right_item").attr("id"));
	
	var currentitemIndex = myCarousel.indexOfItem(currentitem);
	var leftitemIndex  = myCarousel.indexOfItem(leftitem);
	var rightitemIndex = myCarousel.indexOfItem(rightitem);

	currentitem.removeStyleClass("carousel_main_item");
	leftitem.removeStyleClass("carousel_left_item");
	rightitem.removeStyleClass("carousel_right_item");
	
	currentitemIndex = getNextMoveIndex(currentitemIndex,direction);
	leftitemIndex = getNextMoveIndex(leftitemIndex,direction);
	rightitemIndex = getNextMoveIndex(rightitemIndex,direction);
	
	var items = myCarousel.getItems();
	for(var i=0; i<items.length; i++){
		if(i == currentitemIndex){
			items[i].removeStyleClass("carousel_hidden_item");
			items[i].addStyleClass("carousel_main_item");
		}
		else if(i == leftitemIndex){
			items[i].removeStyleClass("carousel_hidden_item");
			items[i].addStyleClass("carousel_left_item");
		}
		else if(i == rightitemIndex){
			items[i].removeStyleClass("carousel_hidden_item");
			items[i].addStyleClass("carousel_right_item");
		}
		else{
			items[i].addStyleClass("carousel_hidden_item");
		}
	}
}