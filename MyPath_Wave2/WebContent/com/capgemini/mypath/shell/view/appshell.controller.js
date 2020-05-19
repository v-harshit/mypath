sap.ui.controller("com.capgemini.mypath.shell.view.appshell", {

	onInit: function() {
		//load user dash board component initially
		//myPathContext.setAppContent(myPathContext.i18nModel.getProperty("MY_DASHBOARD"),"com.capgemini.mypath.dashboard",false);

	},
});

/*
 * Function to create header layout for shell
 */
myPathContext.createHeaderLayout = function(){
	
	var welcome_txt = new sap.ui.commons.TextView({
		text: "{i18n>WELCOME}",
	}).addStyleClass("header1content").addStyleClass("headertext");
	
	var username_txt = new sap.ui.commons.TextView({
		text: myPathContext.employeeName,
	}).addStyleClass("header1content").addStyleClass("headertext");
	
	
	//log off button and code for log off
	var logoff_btn = new sap.ui.commons.Button({
		icon: "./com/capgemini/mypath/images/icon_logoff.png",
		width: "35px",
		press: function(){
			window.localStorage.setItem("myPathURL" , window.location.href);
			sessionStorage.myPathURL = window.location.href ;
			var logoffWin = window.open("PostLogoff.html" , "_self");
			//logoff event
			/*$.ajax({
				url: myPathContext.url_host+"/sap/public/bc/icf/logoff",
				async: false
			}).complete(function(){
				window.open("PostLogoff.html" , "_self");
				//location.reload();
			});*/
		}
	}).addStyleClass("header1content").addStyleClass("logoff_btn");
	
	//Header bar with welcome message and log off button
	var header_item1 = new sap.m.CustomListItem({
		type: sap.m.ListType.Inactive,
		content : [logoff_btn, username_txt, welcome_txt],
	}).addStyleClass("header_bar1");
	
	//Header bar with content title
	var header_item2 = new sap.m.CustomListItem({
		type: sap.m.ListType.Inactive,
		content : [],
	}).addStyleClass("header_bar2");
	
	// set header item for content title in context so it can be referred 
	// from anywhere in the application to change the title 
	myPathContext.currentTitle = header_item2;
	
	var header_list = new sap.m.List({
		width:"100%",
		items:[ header_item1, header_item2 ]
	}).addStyleClass("header_container");
	
	return header_list;
};

/*
 * Function to create the navigation menu
 */
myPathContext.createNavigationMenu = function(){
	
	var nav_menu_list = new sap.m.List({
		width: "100%"
	});
	
	var mypath_logo = new sap.m.CustomListItem({
		type: sap.m.ListType.Inactive,
		content : [
		           new sap.ui.commons.Image({
		        	   src:"./com/capgemini/mypath/images/mypath_logo.png",
		        	   press: function(){
		        		   
		        		  // if(!myPathContext.isEdited)
		        		   //{
			        		   //load the dash board component
			        		   myPathContext.setAppContent(myPathContext.i18nModel.getProperty("MY_DASHBOARD"),"com.capgemini.mypath.dashboard",false);		        		  
			        		   //call function to set dashboard as selected 
			        		   myPathContext.setSelectedMenuItem(nav_menu_list.getItems()[0]);
		        		   //}
		        		   //else
		        			 //  sap.ui.commons.MessageBox.alert("You have unsaved changes , please first save the changes");
		        	   }
		        	   
		           }).addStyleClass("mypath_logo")
		],
	}).addStyleClass("mpath_logo_container");
	
	//navigation menu item template
	//icon (image control) and text are added as content
	//added custom data for selected and unselected icons
	
	
	var nav_menu_item_template = new sap.m.CustomListItem({
		type: sap.m.ListType.Active,
		visible: "{visible}",
		content:[
		         	new sap.ui.commons.Image({
		        	 src:"{icon}",
		         	}).addStyleClass("nav_menu_icon"),
		         	
		         	new sap.ui.commons.TextView({
		         		text: "{text}",
		         		width: "100%"
		         	}).addStyleClass("nav_menu_text"),
		         	
		         	new sap.ui.commons.Image({
		        	 src:"./com/capgemini/mypath/images/Spade.png",
		         	}).addStyleClass("nav_menu_spade"),
		         ],
		 customData:[
		             {
		            	 Type:"sap.ui.core.CustomData",
		            	 key:"icon_off",
		            	 value:"{icon_off}" // bind custom data
		             },
		             {
		            	 Type:"sap.ui.core.CustomData",
		            	 key:"icon_on",
		            	 value:"{icon_on}" // bind custom data
		             },
		             {
		            	 Type:"sap.ui.core.CustomData",
		            	 key:"key",
		            	 value:"{key}" // bind custom data
		             },
		             ],
		    press: function(){
		    	
		    	//If there are any unsaved changed , alert will be shown and navigation will not be permitted
		    	if(myPathContext.isEdited)
		    		sap.ui.commons.MessageBox.alert("There are unsaved changes, please save your changes first.");
		    	
		    	//if item is currently selected and there are not any unsaved changes then don't do anything
		    	else //if(!this.hasStyleClass("nav_menu_item_selected"))
		    	{
		    		myPathContext.navMenuItemPressed(this);
		    	}
		    		
		    }
	}).addStyleClass("nav_menu_item");
	
	/* Set the visible property of nav menu items */
	for(var i=0; i<myPathContext.nav_menu_modeldata.length; i++){
		if(myPathContext.nav_menu_modeldata[i].key == "reviewer" ){
			myPathContext.nav_menu_modeldata[i].visible = myPathContext.isUserReviewer;
		} else if(myPathContext.nav_menu_modeldata[i].key == "hrbp" ){
			myPathContext.nav_menu_modeldata[i].visible = myPathContext.isUserHRBP;
		}
	}
	
	var nav_menu_model = new sap.ui.model.json.JSONModel();
	nav_menu_model.setData({modelData: myPathContext.nav_menu_modeldata});
	nav_menu_list.setModel(nav_menu_model);
	
	nav_menu_list.bindAggregation("items","/modelData",nav_menu_item_template);
	
	//call function to set first item as initially selected 
	myPathContext.setSelectedMenuItem(nav_menu_list.getItems()[0]);
	
	return [mypath_logo,nav_menu_list];
};

/*
 * Function to set the menu item as selected - change the 
 * font color and icon color for selected menu item
 */
myPathContext.setSelectedMenuItem = function(nav_menu_item){
	
	var currentSelectedItem = sap.ui.getCore().byId($(".nav_menu_item_selected").attr("id"));
	if(currentSelectedItem){
		currentSelectedItem.getContent()[0].setSrc(currentSelectedItem.getCustomData()[0].getValue());
		currentSelectedItem.removeStyleClass("nav_menu_item_selected");
	}
	
	nav_menu_item.addStyleClass("nav_menu_item_selected");
	nav_menu_item.getContent()[0].setSrc(nav_menu_item.getCustomData()[1].getValue());
};

/*
 * Function to handle the press event for navigation menu item
 */
myPathContext.navMenuItemPressed = function(nav_menu_item){
	
	myPathContext.setSelectedMenuItem(nav_menu_item);
	
	//Identify clicked item using custom data of the menu item
	var nav_item_data = nav_menu_item.getCustomData();
	var nav_menu_clicked_item = "";
	for(var i=0; i<nav_item_data.length; i++){
		if(nav_item_data[i].getKey() == "key"){
			nav_menu_clicked_item = nav_item_data[i].getValue();
			break;
		}
		
	}
	
	//implement switch case for each item
	switch (nav_menu_clicked_item){
	
	case "dashboard":	
		myPathContext.setAppContent(myPathContext.i18nModel.getProperty("MY_DASHBOARD"),"com.capgemini.mypath.dashboard",false);
		
		break;
		
	case "reviewer":
		myPathContext.performanceReview_Dashboard_Loaded = false;
		myPathContext.setAppContent(myPathContext.i18nModel.getProperty("PERFORMANCE_REVIEWER"),"com.capgemini.mypath.perforeview",false);

		break;
		
	case "talent":
		
		openEmpDetails(myPathContext.employeeId);
		if ( myPathContext.isUserReviewer)
			{
			myPathContext.setAppContent(myPathContext.i18nModel.getProperty("TALENT_PROFILE"),"com.capgemini.mypath.talent_profileREV",true);
			}
		else
			{
			myPathContext.employeeIdIV = myPathContext.employeeId; 
			myPathContext.TPUsrName = myPathContext.employeeName ;
			myPathContext.setAppContent(myPathContext.i18nModel.getProperty("TALENT_PROFILE"),"com.capgemini.mypath.talent_profile",true);
			}
		
		
						
		break;
		
	case "historical":		
	
		//myPathContext.setAppContent(myPathContext.i18nModel.getProperty("HISTORICAL_DATA"),"com.capgemini.mypath.historical",false);
		myPathContext.setAppContent("Performance Improvement Plan","com.capgemini.mypath.pip",false);
		
		break;
		
	case "learning":
		//myPathContext.setAppContent(myPathContext.i18nModel.getProperty("VP_PERFORMANCE_REVIEW"),"com.capgemini.mypath.performancereviewVP",false);
		//openEmpDetails("hola");
		var urlFinal ="https://capgemini.sumtotalsystems.com/sumtotal/app/management/LMS_LearnerHome.aspx?FromLogin=1";
		//window.open(urlFinal,'_blank');
		break;
		
	case "hrbp":
		myPathContext.setAppContent(myPathContext.i18nModel.getProperty("HRBP_REPORTS"),"com.capgemini.mypath.hrbpreports",true);
		break;
		
	case "":
		
		break;
		
	}
	
};