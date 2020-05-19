/*
 * Function to register module paths for different components 
 */
myPathContext.registerModulePath = function(){
	
	jQuery.sap.registerModulePath("com.capgemini.mypath.feedback", myPathContext.url_app + "zfeedback/com/capgemini/mypath/feedback");
	jQuery.sap.registerModulePath("com.capgemini.mypath.appraisal", myPathContext.url_app + "zappraisal/com/capgemini/mypath/appraisal");
	jQuery.sap.registerModulePath("com.capgemini.mypath.perforeview", myPathContext.url_app + "zmgrdashboard/com/capgemini/mypath/perforeview");
	jQuery.sap.registerModulePath("com.capgemini.mypath.performancereview", myPathContext.url_app + "zperformreview/com/capgemini/mypath/performancereview");
	jQuery.sap.registerModulePath("com.capgemini.mypath.historical", myPathContext.url_app + "zhistoricaldocs/com/capgemini/mypath/historical");
	jQuery.sap.registerModulePath("com.capgemini.mypath.performancereviewVP", myPathContext.url_app + "zperfrmreviewvp/com/capgemini/mypath/performancereviewVP");
	
	if ( "ECD" ==  myPathContext.system ||  "ECQ" ==  myPathContext.system || "ECR" == myPathContext.system)
	{
	jQuery.sap.registerModulePath("com.capgemini.mypath.talent_profile", myPathContext.url_app + "ztalentprofile/com/capgemini/mypath/talent_profile");
	jQuery.sap.registerModulePath("com.capgemini.mypath.talent_profileREV", myPathContext.url_app + "ztalentprofile/com/capgemini/mypath/talent_profileREV");
	jQuery.sap.registerModulePath("com.capgemini.mypath.pip", myPathContext.url_app + "ZPerformImpPlan/com/capgemini/mypath/pip");
	jQuery.sap.registerModulePath("com.capgemini.mypath.hrbpreports", myPathContext.url_app + "zhrbpreports/com/capgemini/mypath/hrbpreports");
	}
	
	if ( "ECD" !=  myPathContext.system)
		{
	sap.ui.core.AppCacheBuster.register(myPathContext.url_app + "zfeedback");
	sap.ui.core.AppCacheBuster.register(myPathContext.url_app + "zappraisal");
	sap.ui.core.AppCacheBuster.register(myPathContext.url_app + "zmgrdashboard");
	sap.ui.core.AppCacheBuster.register(myPathContext.url_app + "zperformreview");
	sap.ui.core.AppCacheBuster.register(myPathContext.url_app + "zhistoricaldocs");
	sap.ui.core.AppCacheBuster.register(myPathContext.url_app + "zperfrmreviewvp");
	/*sap.ui.core.AppCacheBuster.register(myPathContext.url_app + "ztalentprofile");
	sap.ui.core.AppCacheBuster.register(myPathContext.url_app + "ZPerformImpPlan");
	sap.ui.core.AppCacheBuster.register(myPathContext.url_app + "zhrbpreports");*/
		}
	
};

/* Function to call a service to get user details */
/* Parameter - appshell view to be passed to get employee details method */
function getUserDetails(view){
	$.ajax({
 		url: myPathContext.url_host + '/sap/bc/ui2/start_up',
 		type :'GET',
 		async:true,
 		
 		//Success function for Ajax call
 		success : function (data){
 			 var userid = data.UserId;
 			 if(userid == "" || userid ==null){
 				 userid = data.id;
  			 }
 			
 			myPathContext.userid = userid;
 			
 			var date_format = data.dateFormat;
			 if(date_format == "" || date_format ==null){
				 date_format = data.dateFormat;
 			 }
			 
 			var oFormatSettings = sap.ui.getCore().getConfiguration().getFormatSettings();
 		    oFormatSettings.setLegacyDateFormat(date_format);
 		    
 		    myPathContext.language = data.language;
 		   sap.ui.getCore().getConfiguration().setLanguage(myPathContext.language);
 		   myPathContext.system = data.system;
 		   //set i18n model 
 		   var i18nModel = new sap.ui.model.resource.ResourceModel({ 
 		   		bundleName:"com.capgemini.mypath.i18n.i18n",
 		   		bundleLocale : myPathContext.language
 		   }); 
 		   
 		   myPathContext.i18nModel = i18nModel;
 		    
 		   getEmployeeDetails(view,userid);
 		   
 		  myPathContext.nav_menu_modeldata = [
 		         	                          { 
 		         	                        	  text: myPathContext.i18nModel.getProperty("MY_DASHBOARD").toUpperCase(),
 		         	                        	  icon:"./com/capgemini/mypath/images/icon_dashboard_off.png", 
 		         	                        	  icon_off:"./com/capgemini/mypath/images/icon_dashboard_off.png", 
 		         	                        	  icon_on:"./com/capgemini/mypath/images/icon_dashboard_on.png", 
 		         	                        	  key:"dashboard",
 		         	                        	  visible: true
 		         	                          },
 		         	                          { 
 		         	                        	  text: myPathContext.i18nModel.getProperty("PERFORMANCE_REVIEWER").toUpperCase(),
 		         	                        	  icon:"./com/capgemini/mypath/images/icon_perf_review_off.png",
 		         	                        	  icon_off:"./com/capgemini/mypath/images/icon_perf_review_off.png", 
 		         	                        	  icon_on:"./com/capgemini/mypath/images/icon_perf_review_on.png", 
 		         	                        	  key:"reviewer",
 		         	                        	  visible: true
 		         	                          },
 		         	                          { 
 		         	                        	  text: myPathContext.i18nModel.getProperty("TALENT_PROFILE").toUpperCase(),
 		         	                        	  icon:"./com/capgemini/mypath/images/icon_talent_profile_off.png",
 		         	                        	  icon_off:"./com/capgemini/mypath/images/icon_talent_profile_off.png", 
 		         	                        	  icon_on:"./com/capgemini/mypath/images/icon_talent_profile_on.png", 
 		         	                        	  key:"talent",
 		         	                        	  visible: true
 		         	                          },
 		         	                          { 
 		         	                        	  text: myPathContext.i18nModel.getProperty("HISTORICAL_DATA").toUpperCase(),
 		         	                        	  icon:"./com/capgemini/mypath/images/icon_historical_data_off.png",
 		         	                        	  icon_off:"./com/capgemini/mypath/images/icon_historical_data_off.png",
 		         	                        	  icon_on:"./com/capgemini/mypath/images/icon_historical_data_on.png",
 		         	                        	  key:"historical",
 		         	                        	  visible: true
 		         	                          },
 		         	                          { 
 		         	                        	  text: myPathContext.i18nModel.getProperty("MY_LEARNING").toUpperCase(),
 		         	                        	  icon:"./com/capgemini/mypath/images/icon_mylearning_off.png", 
 		         	                        	  icon_off:"./com/capgemini/mypath/images/icon_mylearning_off.png", 
 		         	                        	  icon_on:"./com/capgemini/mypath/images/icon_mylearning_on.png", 
 		         	                        	  key:"learning",
 		         	                        	  visible: true
 		         	                          },
	 		       	                          { 
	 		       	                        	  text: myPathContext.i18nModel.getProperty("HRBP_REPORTS_CAP"),
	 		       	                        	  icon:"./com/capgemini/mypath/images/HRPB-grey.png", 
	 		       	                        	  icon_off:"./com/capgemini/mypath/images/HRPB-grey.png", 
	 		       	                        	  icon_on:"./com/capgemini/mypath/images/hrbp_on.png", 
	 		       	                        	  key:"hrbp",
	 		       	                        	  visible:  ("ECD" ==  myPathContext.system ||  "ECQ" ==  myPathContext.system || "ECR" ==  myPathContext.system) ? true : false
	 		       	                          }
 		         	                         ];
 			 
 		 },
 	 
 		 //Error function for Ajax call
 		 error : function (e){
 			  hideBusy();
 			 //TO DO - code to display error message
 		 }
 	});
}

/* Function to get employee details for logged in user */
/* Parameter - appshell view which is to be rendered after successful service call */
function getEmployeeDetails(view,userid){
	
	//Call service to get employee details for logged in user
	 var serviceURL = myPathContext.url_root + "ZGW_MYPATH_USERDASHBOARD_SRV";
    var dashboard_ODataModel = new sap.ui.model.odata.ODataModel(serviceURL);
    myPathContext.dashboard_ODataModel = dashboard_ODataModel;
    
    var readRequestURL = "/EmployeeSet?$filter=SapUname eq '"+myPathContext.userid+"'";

    dashboard_ODataModel.read(readRequestURL, null, null, true,     
    
   function(oData,oResponse){

		  hideBusy();
		  if(oResponse.headers.error)
			  {
			  sap.m.MessageToast.show(oResponse.headers.error, {
				    duration: 3000,                  
				    width: "40%",                   
				    my: "center center",             
				    at: "center center",             
				    onClose: function(){
				    	//logoff event
						$.ajax({
							url: myPathContext.url_host+"/sap/public/bc/icf/logoff",
							async: false
						}).complete(function(){
							location.reload();
						});
				    },                   
				    animationDuration: 500,        
				});
				
			  }
		  else{
			  if(oData.results.length > 0){
        		 
				//Set the employee data in application context
				 var employeeData = oData.results[0];
        		 
        		 myPathContext.employeeId = employeeData.Employeeid;
            	 myPathContext.employeeName = employeeData.EmployeeName;
            	 myPathContext.employeeBand = employeeData.EmployeeBand;
            	 myPathContext.employeeDesg = employeeData.EmployeeDesignation;
            	 myPathContext.reviewerId = employeeData.ReviewerEmployeeid;
            	 myPathContext.reviewerName = employeeData.ReviewerName;
            	 myPathContext.isUserReviewer = employeeData.IsReviewer=="X"?true:false;
            	 myPathContext.isUserHRBP = employeeData.Hrbp=="X"?true:false;
            	 
            	 //call function to register all required module paths
            	 myPathContext.registerModulePath();
            	 
            	 view.addContent(view.viewContent());
            	 myPathContext.setAppContent(myPathContext.i18nModel.getProperty("MY_DASHBOARD"),"com.capgemini.mypath.dashboard",false);
         		
        	 }
        	 
        	 else{
        		 //TO DO - code to display error message
        	 }
		  }
		  
   }, 
    
    function(oError){
        hideBusy(); 
   	 //TO DO - code to display error message
   	 
    });
}

/* 
 * Function to create the current title content for the header
 * parameters - 
 * title - text to be displayed
 * backlink_flag - whether back link to be displayed or not
 */
myPathContext.setCurrentTitleContent = function(title,backlink_flag){
	
	var currentTitle = myPathContext.currentTitle;
	currentTitle.destroyContent();
	
	var title_txt = new sap.ui.commons.TextView({
		text: title
	}).addStyleClass("titlecontent").addStyleClass("titlecontent_text");
	
	//add back link and arrow if backlink_flag is true
	if(backlink_flag){
		
		title_txt.addStyleClass("titlecontent_text_margin");
		
		
		var title_arrow_back = new sap.ui.commons.Image({
			src: "./com/capgemini/mypath/images/title_arrow_back.png",
			height: "100%",
			press : function(){
				myPathContext.back();
			}
		}).addStyleClass("titlecontentBack");
		
		var title_link = new sap.ui.commons.Button({
			text: "{i18n>BACK}",
			//icon: "sap-icon://nav-back",
			//type: sap.m.ButtonType.Emphasized,
			press: function(){
				myPathContext.back();
			}
		}).addStyleClass("titlecontent").addStyleClass("titlecontent_btn");
		
		var title_arrow = new sap.ui.commons.Image({
			src: "./com/capgemini/mypath/images/title_arrowBig.png",
			height: "100%"
		}).addStyleClass("titlecontent");
		currentTitle.addContent(title_arrow_back);
		currentTitle.addContent(title_link);
		currentTitle.addContent(title_arrow);
	}
	
	currentTitle.addContent(title_txt);
};

/*
 * Function to set application content in the border layout center area
 * Parameters - 
 * componentname - name of the component to be loaded
 * backlink_flag - true if existing content to be kept available for back navigation  
 */
myPathContext.setAppContent = function(title, componentname, backlink_flag){
	myPathContext.setCurrentTitleContent(title,backlink_flag);
	
	if(!backlink_flag){
		
		if(myPathContext.contentStack.length > 0){
			myPathContext.content_area.destroyContent();
			myPathContext.contentStack.splice(myPathContext.contentStack.length - 1, 1);
			
			for(var i=0; i<myPathContext.contentStack.length; i++){
				myPathContext.contentStack[i].destroy();
			}
		}
		myPathContext.contentStack = new Array();
		myPathContext.titleStack = new Array();
	}
	else{
		myPathContext.content_area.removeAllContent();
	}
	
	var component_container = new sap.ui.core.ComponentContainer( {
        name: componentname,
        
    }).addStyleClass("application_content");
	
	component_container.addEventDelegate({
		onAfterRendering: function(){
			$(".application_content").animate({left: '0'},300);
		}
	});
	
	myPathContext.contentStack.push(component_container);
	myPathContext.titleStack.push({title:title, backlink_flag:backlink_flag});
	
	myPathContext.content_area.addContent(component_container);
};

/*
 * Function to handle click of back link to navigate to the previous page
 */
myPathContext.back = function(){
	if (myPathContext.isEdited) {
		myPathContext.checkUnsaved();
	} else {
		myPathContext.isVPReviewForm = false;
		//if(!myPathContext.isEdited)
		//{	
		myPathContext.seeAllFlag = false;
		myPathContext.isEdited = false;
		myPathContext.content_area.destroyContent();
		myPathContext.contentStack.splice(myPathContext.contentStack.length - 1, 1);
		myPathContext.titleStack.splice(myPathContext.titleStack.length - 1, 1);

		myPathContext.setCurrentTitleContent(myPathContext.titleStack[myPathContext.titleStack.length - 1].title,myPathContext.titleStack[myPathContext.titleStack.length - 1].backlink_flag);
		myPathContext.content_area.addContent(myPathContext.contentStack[myPathContext.contentStack.length - 1]);
		//}
		// else
		//   sap.ui.commons.MessageBox.alert("You have unsaved changes , please first save the changes");
	}

};

/*
 * Function to navigate to selected document
 */
myPathContext.navigateToDocument = function(item){
	
	var parentItem = item.getParent().getParent().getParent();
	if(parentItem.hasStyleClass("carousel_left_item")){
		moveCarousel("right");
	}
	else if(parentItem.hasStyleClass("carousel_right_item")){
		moveCarousel("left");
	}
	else{
		var item_data = item.getCustomData();
		myPathContext.documentId = item_data[0].getValue();
		myPathContext.docTitle = item_data[1].getValue();
		myPathContext.subStatus = item_data[2].getValue();
		myPathContext.appraiseeId = item_data[3].getValue();
		myPathContext.appraiseeName = item_data[4].getValue();
		myPathContext.appraiserId = item_data[5].getValue();
		myPathContext.appraiserName = item_data[6].getValue();
		myPathContext.validFrom = item_data[7].getValue();
		myPathContext.validTo = item_data[8].getValue();
		myPathContext.validFromISO = item_data[9].getValue();
		myPathContext.validToISO = item_data[10].getValue();
		myPathContext.documentType = item_data[11].getValue();
		myPathContext.partAppraiserName = item_data[13].getValue();
		myPathContext.partAppraiserId = item_data[14].getValue();
		myPathContext.docStatus = item_data[15].getValue();
	
		myPathContext.isReviewer = false;
		myPathContext.isPartAppraiser = false;
		
		
		/*if(myPathContext.appraiseeId == myPathContext.employeeId){
			myPathContext.isReviewer = false;
		}
		else{
			myPathContext.isReviewer = true;
		}*/
		
		if(myPathContext.appraiserId == myPathContext.employeeId){
			myPathContext.isReviewer = true;
		}
		
		if(myPathContext.partAppraiserId == myPathContext.employeeId){
			myPathContext.isPartAppraiser = true;
		}
		
		
		//set flag in context if it is VP performance review
		myPathContext.isVPReviewForm = false;
		
		if(myPathContext.documentType == myPathContext.documentText.GENERAL_FEEDBACK){
			//load feedback component for the correct user role and sub status only
			if(!(!myPathContext.isReviewer && myPathContext.subStatus == "V")){
				myPathContext.setAppContent(myPathContext.i18nModel.getProperty("GEN_FEEDBACK"),
			   			 "com.capgemini.mypath.feedback", true);
			}
		}
		
		else if(myPathContext.documentType == myPathContext.documentText.ASSIGNMENT_APPRAISAL){
			myPathContext.setAppContent(myPathContext.i18nModel.getProperty("ASN_APP"),
			   		"com.capgemini.mypath.appraisal", true);
			
		}
		
		else if(myPathContext.documentType == myPathContext.documentText.PERFORMANCE_REVIEW)
		{
			myPathContext.setAppContent(myPathContext.i18nModel.getProperty("MY_PERFORMANCE_REVIEW"),
		   		 "com.capgemini.mypath.performancereview", true);
		}
		
		else if(myPathContext.documentType == myPathContext.documentText.VP_PERFORMANCE_REVIEW)
		{
			myPathContext.isVPReviewForm = true;
				myPathContext.setAppContent(myPathContext.i18nModel.getProperty("VP_PERFORMANCE_REVIEW"),
		   			 "com.capgemini.mypath.performancereviewVP", true);
		}
		else if(myPathContext.documentType == myPathContext.documentText.PIP || myPathContext.documentType.toUpperCase() == myPathContext.documentText.APP_DOC.toUpperCase())
		{
				myPathContext.setAppContent(myPathContext.i18nModel.getProperty("PIP_LABEL"),
		   			 "com.capgemini.mypath.pip", true);
		}
	}
	
	
	
};

/* Function to create call out to display info text as tooltip */
myPathContext.createCallout = function(sText){
		var Label = new sap.ui.commons.Label({ text: sText}).addStyleClass("text_bacground");
		var oCallout = new sap.ui.commons.Callout({ content: Label }).addStyleClass("calloutBackground");
		 oCallout.setPosition(sap.ui.core.Popup.Dock.LeftTop,sap.ui.core.Popup.Dock.CenterBottom);
		return oCallout;
	};
	
	/*var cyc = true ;
	function cycleImages(){
	      var $active = $('#cycler .active');
	      var $next = ($active.next().length > 0) ? $active.next() : $('#cycler img:first');
	      $next.css('z-index',2);//move the next image up the pile
	      $active.fadeOut(1500,function(){//fade out the top image
		  $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
	          $next.css('z-index',3).addClass('active');//make the next image the top one
	      });
	    
		
		$(".imageCap").fadeOut(1000);
		$(".imageSog").fadeIn(10000);
		
		$(".imageCap").fadeOut(1500,function(){//fade out the top image
			  $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
		          $next.css('z-index',3).addClass('active');//make the next image the top one
		      });
		
	};

	$(document).ready(function(){
	// run every 7s
	setInterval('cycleImages()', 15000);
	})*/
	
	
	$(window).load(function() {	//start after HTML, images have loaded

	var InfiniteRotator = 
	{
		init: function()
		{
			//initial fade-in time (in milliseconds)
			var initialFadeIn = 1000;
			
			//interval between items (in milliseconds)
			var itemInterval = 5000;
			
			//cross-fade time (in milliseconds)
			var fadeTime = 2500;
			
			//count number of items
			var numberOfItems = 2 ; //$('.rotating-item').length;

			//set current item
			var currentItem = 0;

			//show first item
			$('.rotating-item').eq(currentItem).fadeIn(initialFadeIn);

			//loop through the items		
			var infiniteLoop = setInterval(function(){
				$('.rotating-item').eq(currentItem).fadeOut(fadeTime);

				if(currentItem == numberOfItems -1){
					currentItem = 0;
				}else{
					currentItem++;
				}
				$('.rotating-item').eq(currentItem).fadeIn(fadeTime);

			}, itemInterval);	
		}	
	};

	InfiniteRotator.init();
	
});
	
	myPathContext.isBrowserCompatible = function() {
		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
		var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		// At least Safari 3+: "[object HTMLElementConstructor]"
		var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
		var isIE = /*@cc_on!@*/false || !!document.documentMode;   // At least IE6
		
		if (isIE) {
			isIE = getInternetExplorerVersion();
		}
		return isIE || isChrome;
	};	
	
	function getInternetExplorerVersion() {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var rv = -1;
		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
		{               
			if (isNaN(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))))) {
				//For IE 11 >
				if (navigator.appName == 'Netscape') {
					var ua = navigator.userAgent;
					var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(ua) != null) {
						rv = parseFloat(RegExp.$1);
						//alert(rv);
						return true;
					}
				}
			}
			else {
				//For < IE11
				//alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
				return false;
			}
		}};