//create object for the application context
sap.ui.getCore().myPathContext = new Object();
var	myPathContext = sap.ui.getCore().myPathContext;
//sap.ui.getCore().getConfiguration().setLanguage("es-ES");zh-Hans/ ES
//sap.ui.getCore().getConfiguration().setLanguage("ES");
myPathContext.username = "User Name";
myPathContext.url_host = location.protocol +"//"+ $(location).attr("host");
myPathContext.url_root = myPathContext.url_host + "/sap/opu/odata/sap/";
myPathContext.url_app = myPathContext.url_host + "/sap/bc/ui5_ui5/sap/";

//set i18n model 
var i18nModel = new sap.ui.model.resource.ResourceModel({ 
	bundleName:"com.capgemini.mypath.i18n.i18n",
}); 

//Declaration of variables
var hk = "oooooopo" ;
myPathContext.isEdited = false;
myPathContext.seeAllFlag = false;
myPathContext.i18nModel = i18nModel;
myPathContext.contentStack = new Array();
myPathContext.titleStack = new Array();
myPathContext.asAnEmpSelectedFilters = new Array();
myPathContext.buttonText = new Object();
myPathContext.subStatusText = new Object();
myPathContext.columnText = new Object();
myPathContext.feedback_template = new Object();
myPathContext.feedback_template_loaded = false;
myPathContext.appraisal_template = new Object();
myPathContext.appraisal_template_loaded = false;
myPathContext.performanceReview_template = new Object();
myPathContext.performanceReview_template_loaded = false;
myPathContext.hrbpreports_template = new Object();
myPathContext.hrbpreports_template_loaded = false;
myPathContext.performancereviewVP_template = new Object();
myPathContext.performancereviewVP_template_loaded = false;
myPathContext.pip_template = new Object();
myPathContext.pip_template_loaded = false;
myPathContext.talent_profile_template = new Object();
myPathContext.talent_profile_loaded = false;
myPathContext.buttonTextVP = new Object();
myPathContext.subStatusTextVP = new Object();
myPathContext.columnTextVP = new Object();

// Q Doc Upload
myPathContext.QDocUpload =   new sap.ui.unified.FileUploader();
myPathContext.oFlexboxD = new sap.m.FlexBox();


/* Document types to compare */
myPathContext.documentText = {
		GENERAL_FEEDBACK : "GENERAL FEEDBACK",
		ASSIGNMENT_APPRAISAL : "ASSIGNMENT APPRAISAL",
		PERFORMANCE_REVIEW : "PERFORMANCE REVIEW",
		VP_PERFORMANCE_REVIEW: "VP PERFORMANCE & DEVELOPMENT",
		PIP : "PERFORMANCE IMPROVEMENT PLAN",
};

/* Navigation menu model data */
myPathContext.nav_menu_modeldata1 = [
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
      	                          }
      	                         ];


var prArr = ["2B" , "2D" , "3F" , "3H" , "4J" , "4N" ];
var aaArr = ["2P" , "2Z" , "3R" , "3T"];
var gfArr = ["2V"];


/*
 * Function to show loading icon
 */
function showBusy(){
	$(".app_container").css('pointer-events', 'none');
	$(".loader").show();
}

/*
 * Function to hide loading icon
 */
function hideBusy(){
	$(".app_container").css('pointer-events', '');
	$(".loader").hide();
}

/*
 * Function to display error messages
 */
function displayErrorMessage(message){
	jQuery.sap.require("sap.m.MessageBox");
	sap.m.MessageBox.show(
	message, {
	          icon: sap.m.MessageBox.Icon.ERROR,
	          title: "My message box title",
	    }
	);
}

/* Function to display pdf document in an overlay for print functionality */
function displayPrintDocument(documentid){
	var url = myPathContext.url_root+"ZGW_MYPATH_APPRAISAL_SRV/AssignmentAppraisalMediaSet(AppraisalId='"+documentid+"',Pernr='')/$value";
	
	var html = new sap.ui.core.HTML();  
	html.setContent("<iframe src=" + url + " width='100%' height='100%' data-tap-disabled='true'></iframe>");
	
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE");
	console.log(msie);
	
	var closeVis = true ;
	
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) 
		{
		closeVis = false ;
		}
	
		console.log(closeVis);
		
	var pdfOverlayContainer = sap.ui.getCore().byId("pdfdisplayOverlay");
	if(pdfOverlayContainer){
		
		pdfOverlayContainer.destroyContent();
		pdfOverlayContainer.addContent(html);
		pdfOverlayContainer.open();
	}
	else{
		var pdfOverlayContainer = new sap.ui.ux3.OverlayContainer({
			id:"pdfdisplayOverlay",
			content:[html],
			openButtonVisible: false,
			closeButtonVisible: closeVis , //msie == -1 ? true : false 
		}).addStyleClass("pdfdisplayOverlay");
		
		/* Code to close the overlay when clicked outside the content area
			 * The addEventDelegate method can be attached to any control to handle
			 * onAfterRendering of that particular control */
		pdfOverlayContainer.addEventDelegate({
				onAfterRendering: function(){
					$(".pdfdisplayOverlay").click(function(e){
						if($(e.target).hasClass("sapUiUx3OCOverlay")){
							pdfOverlayContainer.destroyContent();
							pdfOverlayContainer.close();
						};
					});
				}
			});
	    
		pdfOverlayContainer.placeAt("content");
		pdfOverlayContainer.open();
	}
	
	
}

function displayPrintDocumentTP(empID)
{

	var url = myPathContext.url_root+"ZGW_MYPATH_TALENT_PROFILE_SRV/TalentprofilePDFSet(IvPersonid='"+empID+"')/$value";
	//http://gdhrsdvecal1d.corp.capgemini.com:8010/sap/opu/odata/sap/ZGW_MYPATH_TALENT_PROFILE_SRV/TalentprofilePDFSet(IvPersonid='60018639')/$value
	//var url = myPathContext.url_root+"ZGW_MYPATH_APPRAISAL_SRV/AssignmentAppraisalMediaSet(AppraisalId='"+documentid+"',Pernr='')/$value";
	//http://gdhrsdvecal1d.corp.capgemini.com:8010/sap/opu/odata/sap/ZGW_MYPATH_TALENT_PROFILE_SRV/TalentprofilePDFSet(IvPersonid='60018639')/$value
	
	var html = new sap.ui.core.HTML();  
	html.setContent("<iframe src=" + url + " width='100%' height='100%'></iframe>");
	
var closeVis = true ;

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE");
	
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) 
		{
		closeVis = false ;
		}
	
	
	var pdfOverlayContainer = sap.ui.getCore().byId("pdfdisplayOverlay");
	if(pdfOverlayContainer){
		
		pdfOverlayContainer.addContent(html);
		pdfOverlayContainer.open();
	}
	else{
		var pdfOverlayContainer = new sap.ui.ux3.OverlayContainer({
			id:"pdfdisplayOverlay",
			content:[html],
			openButtonVisible: false,
			closeButtonVisible: closeVis , //msie > 0 ? false : true 
		}).addStyleClass("pdfdisplayOverlay");
		
		/* Code to close the overlay when clicked outside the content area
			 * The addEventDelegate method can be attached to any control to handle
			 * onAfterRendering of that particular control */
		pdfOverlayContainer.addEventDelegate({
				onAfterRendering: function(){
					$(".pdfdisplayOverlay").click(function(e){
						if($(e.target).hasClass("sapUiUx3OCOverlay")){
							pdfOverlayContainer.destroyContent();
							pdfOverlayContainer.close();
						};
					});
				}
			});
	    
		pdfOverlayContainer.placeAt("content");
		pdfOverlayContainer.open();
	}
	
	


}


function getDocCount(docID , openPopup)
{
	showBusy();
	 myPathContext.downloadDocTableData = [] ;
	 myPathContext.downloadDocCount = 0 ;
	 var serviceURL = myPathContext.url_root + "ZGW_MYPATH_ATTACHMENT_SRV_01/";
	 var downloadDocumentSet = new sap.ui.model.odata.ODataModel(serviceURL);
	 myPathContext.filedocid  = docID ;
     var readRequestURL = "/GetListSet?$filter=AppraisalId eq '" + docID + "'&$format=json";
     myPathContext.downloadDocTableData = [] ;
	 myPathContext.downloadDocCount = 0 ;
     downloadDocumentSet.read(readRequestURL, null, null, false,     
     function(oData,oResponse){
    	 var obj = JSON.parse(oResponse.body);
		 oData = obj.d.results;
    	 if(oData.length > 0){
    		/* var downloadDocTableData = oData.results ;
    		 var downloadDocCount =  oData.results.length ;*/
    		 
    		 var downloadDocTableData = oData ;
    		 var downloadDocCount =  oData.length ;
    		 
    		 myPathContext.downloadDocTableData = downloadDocTableData ;
    		 myPathContext.downloadDocCount = downloadDocCount ;
    		 
    		 if(undefined!=myPathContext.feedbackContext)
    		{
	    		 if(myPathContext.downloadDocCount > 0 && feedbackContext.isCalledFromFeedback)
	    		{
	    			 feedbackContext.attachment_count.setText(myPathContext.downloadDocCount);
	    			 feedbackContext.attachment_count.setVisible(true);
	    		}
    		}
    		 
    		 if(undefined!=myPathContext.appraisalContext)
    		{ 
	    		 if(myPathContext.downloadDocCount > 0 && appraisalContext.isCalledFromAppraisal)
	     		{
	    			 appraisalContext.attachment_count.setText(myPathContext.downloadDocCount);
	    			 appraisalContext.attachment_count.setVisible(true);
	     		}
    		}
    		 if(undefined!=myPathContext.pipContext)
      		{ 
  	    		 if(myPathContext.downloadDocCount > 0 && pipContext.isCalledFromPIP)
  	     		{
  	    			pipContext.attachment_count.setText(myPathContext.downloadDocCount);
  	    			pipContext.attachment_count.setVisible(true);
  	     		}
      		}
    		 
    		 if(undefined!=myPathContext.performancereviewContext)
     		{ 
 	    		 if(myPathContext.downloadDocCount > 0 && performancereviewContext.isCalledFromPR)
 	     		{
 	    			performancereviewContext.attachment_count.setText(myPathContext.downloadDocCount);
 	    			performancereviewContext.attachment_count.setVisible(true);
 	    			performancereviewContext.doc_count = myPathContext.downloadDocCount;
 	     		}
     		}
    		 
    		 if(undefined!=myPathContext.performancereviewVPContext)
      		{ 
  	    		 if(myPathContext.downloadDocCount > 0 && performancereviewVPContext.isCalledFromVP)
  	     		{
  	    			performancereviewVPContext.attachment_count.setText(myPathContext.downloadDocCount);
  	    			performancereviewVPContext.attachment_count.setVisible(true);
  	     		}
      		}
    		 
    		 if(undefined!=myPathContext.hrbpreportsContext)
       		{ 
   	    		 if(myPathContext.downloadDocCount > 0 && hrbpreportsContext.isCalledFromHRBP)
   	     		{
   	    			hrbpreportsContext.attachment_count.setText(myPathContext.downloadDocCount);
   	    			hrbpreportsContext.attachment_count.setVisible(true);
   	    			hrbpreportsContext.doc_count = myPathContext.downloadDocCount;
   	     		}
       		}
    		 
    		 hideBusy();
    		 
    		 if ( openPopup ==  true )
    			 {
    			 openUploadDownload();
    			 }
    		 //
    		 
    		
    	 }
    	 else{
    		 hideBusy();
    	 }
     },
    	 function(oError){
    	 hideBusy();
        	 
         });
     
     return  myPathContext.downloadDocCount;
}

function openUploadDownload()
{
	
	
	var oTable = new sap.m.Table({
		columns: [
		          new sap.m.Column({ 
		        	 // width: "2em"
		        	  width : "70%",
		          }),
		          new sap.m.Column({  
		        	 // width: "2em"
		        	  width : "30%",
		          }),
		          ],
		          mode: "SingleSelectMaster",
				  selectionChange: function()
				  {
					  
					var fileid = oTable.getModel().getProperty(oTable.getSelectedItem().getBindingContext().sPath+ "/Id");
  	  				var filetype = oTable.getModel().getProperty(oTable.getSelectedItem().getBindingContext().sPath+ "/Type");
  	  				var fileName = oTable.getModel().getProperty(oTable.getSelectedItem().getBindingContext().sPath+ "/Name");
  	  				
  	  				 var serviceURL = myPathContext.url_root + "ZGW_MYPATH_ATTACHMENT_SRV_01/";
  	  				fileName = encodeURIComponent(fileName);
  	  				 var uri =  serviceURL + "/GetFileSet(Fileid='"+fileid+"',Filename='" +fileName+ "',Type='"+filetype+"')/$value" ;
  	  				 uri = encodeURI(uri);
  	  				window.open( uri ,"_blank");
  	  				oTable.removeSelections();
  	  				//window.open( serviceURL + "/GetFileSet(Fileid='"+fileid+"',Filename='" +fileName+ "',Type='"+filetype+"')/$value","_blank");
				  },
				
      items: {
          path: "/results",
          template: new sap.m.ColumnListItem({
            visible : true,
            cells : [
              new sap.m.Text({text: "{Name}",
            	            //   enabled : false ,
            	  design : "Bold",
              }),    
              new sap.m.Text({text: "{Type}"}), 
            ],
          type : sap.m.ListType.Active,
          
          }),
          
        },
}).addStyleClass("TableHeader");
	
	myPathContext.uploadTable= oTable ;
	
	var scroll = new sap.m.ScrollContainer({
        height : "200px",
        width : "99%" ,
        vertical :true
      }).addStyleClass("fileScroll");
scroll.addContent(oTable);
	
	var result =  myPathContext.downloadDocTableData ;
	var resultArrIni = [];
	if(result.length > 0){
		 for ( var index = 0 ; index < result.length ;  index ++ )
		 {
		 var resultData = {
				 "Id" : result[index].Id,
              	"Name" : result[index].Name , //decodeURIComponent(result[index].Name),
              	"Type" : result[index].Type,
 		 };

		 resultArrIni.push(resultData);
		 }
		 var resDataFinalArray =  {"results" : resultArrIni};
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(resDataFinalArray);
		oTable.setModel(oModel);
		
      }
	
	/// Declare the dialog and open it 
	
				 var oDialog = new sap.m.Dialog({
						contentWidth: "70%",
						showHeader : false,
						subHeader : 
									new sap.m.Bar({
										contentRight : [
										                new sap.m.Button({	
									                					icon : "sap-icon://sys-cancel",
								                                    	  press : function(oEvent){
								                                    		  if(undefined!=myPathContext.feedbackContext && feedbackContext.isCalledFromFeedback)
								                                    			  feedbackContext.isCalledFromFeedback = false;
								                                    		  if(undefined!=myPathContext.appraisalContext && appraisalContext.isCalledFromAppraisal)
								                                    			  appraisalContext.isCalledFromAppraisal = false;
								                                    		  if(undefined!=myPathContext.pipContext && pipContext.isCalledFromPIP)
								                                    			  pipContext.isCalledFromPIP = false;
								                                    		  if(undefined!=myPathContext.performancereviewContext && myPathContext.performancereviewContext)
								                                    			  performancereviewContext.isCalledFromPR = false;
								                                    		  if(undefined!=myPathContext.performancereviewVPContext && myPathContext.performancereviewVPContext)
								                                    			  performancereviewVPContext.isCalledFromVP = false;
								                                    		  if(undefined!=myPathContext.hrbpreportsContext && myPathContext.hrbpreportsContext)
								                                    			  hrbpreportsContext.isCalledFromHRBP = false;
								                                    		  oDialog.close();  
								                                    	  }	
										                				})
										                ],
			                contentMiddle : [
			                                 new sap.m.Text({
			                                 	text : myPathContext.i18nModel.getProperty("FILE_UPLOAD") ,
			                                 })
			                                 ]
			
											})                
					}).addStyleClass("Background");
			
				 $(function() {
					  $('body').on('click', '#sap-ui-blocklayer-popup', function() {
						  if(undefined!=myPathContext.feedbackContext && feedbackContext.isCalledFromFeedback)
                			  feedbackContext.isCalledFromFeedback = false;
                		  if(undefined!=myPathContext.appraisalContext && appraisalContext.isCalledFromAppraisal)
                			  appraisalContext.isCalledFromAppraisal = false;
                		  if(undefined!=myPathContext.pipContext && pipContext.isCalledFromPIP)
                			  pipContext.isCalledFromPIP = false;
                		  if(undefined!=myPathContext.performancereviewContext && myPathContext.performancereviewContext)
                			  performancereviewContext.isCalledFromPR = false;
                		  if(undefined!=myPathContext.performancereviewVPContext && myPathContext.performancereviewVPContext)
                			  performancereviewVPContext.isCalledFromVP = false;
                		  if(undefined!=myPathContext.hrbpreportsContext && myPathContext.hrbpreportsContext)
                			  hrbpreportsContext.isCalledFromHRBP = false;
                		  oDialog.close();  
					  });
					});
				 
			var oTriggerButton = new sap.m.Button({  
			text: myPathContext.i18nModel.getProperty("FILE_UPLOAD"),
			width : "84px",
			enabled:false,
			visible : myPathContext.uploadContentVisible,
			press:function() {  
							
				getXCRF();
			}  
			}).addStyleClass("PaddingandFont");
			
			myPathContext.oTriggerButton = oTriggerButton;
			
			var oFileUploader = new sap.ui.unified.FileUploader({  
	              uploadUrl : "/sap/opu/odata/sap/ZGW_MYPATH_ATTACHMENT_SRV_01/FileSet",
	              name: "UploadDocument",   
	        uploadOnChange: false,
	        visible : myPathContext.uploadContentVisible,
	       // maximumFileSize: 20,
	        fileSizeExceed : function()
	        {
	        },
	        sendXHR: true,  
	        change : function(oEvent)
	        {
	              var filename= oFileUploader.getValue();
	              myPathContext.filename  = filename ;

	              if (filename !== ""){
	                     oTriggerButton.setEnabled(true);
	              }
	        },
	        useMultipart: false, 
	        
	        uploadComplete: function (oEvent) {  
	            var sResponse = oEvent.getParameter("response");  
	            var sResponseErr = oEvent.mParameters.headers.error ;
	            if ( undefined == sResponseErr){
	           // if ("201" == oEvent.getParameter("status")) {  
	            	 hideBusy();
	           	             oDialog.close();
	              
	                getDocCount(myPathContext.filedocid , true);
	                sap.ui.commons.MessageBox.show(myPathContext.i18nModel.getProperty("FILE_SUC") );


	            }  
	            
	            else
	            	{
	            	 hideBusy();
	            	//sap.ui.commons.MessageBox.show(myPathContext.i18nModel.getProperty("FILE_NSUC") );
	            	 sResponseErr =  decodeURI(sResponseErr);
	            	sap.ui.commons.MessageBox.show(sResponseErr);
	            	
	            	}
	            
	        }  
	        
	        
	        
	        
	    }).addStyleClass("FontStyle");
			myPathContext.oFileUploader = oFileUploader ;
			
			var oText = new sap.m.Text({
			text : myPathContext.i18nModel.getProperty("UPL_DOC") //"UPLOADED DOCUMENTS"
			}).addStyleClass("PaddingAndFont");
			
			var oFlexbox = new sap.m.FlexBox({
			direction: sap.m.FlexDirection.Column,
			justifyContent : sap.m.FlexJustifyContent.Inherit,
			alignItems: sap.m.FlexAlignItems.Inherit,
			width: "100%",
			height: "100%",
			items : [	oFileUploader,
			oTriggerButton,
			oText,
			scroll
			]
			});
			oDialog.addContent(oFlexbox) ; 
			oDialog.open(); 
}

function getXCRF(){
    

   // showBusy();
    
    $(".loader").show();
    var url1 = myPathContext.url_root + "ZGW_MYPATH_ATTACHMENT_SRV_01/";
    
    var headers = {} ;
    headers["X-CSRF-Token"] = "Fetch";
    headers = JSON.parse(JSON.stringify(headers));
    
    var aData = jQuery.ajax({   
         url : url1,
         headers: headers,
         type: "GET",
         data : " ",
      success : function(data, textStatus, jqXHR) {
            
            csrfToken = jqXHR.getResponseHeader('x-csrf-token');
            console.log(csrfToken);
            var oFileUploader = myPathContext.oFileUploader ;
            var filename= oFileUploader.getValue();
            //filename = encodeURIComponent(filename);
            myPathContext.filename  = filename ;
            var extIndex = myPathContext.filename.lastIndexOf(".");
            var ext = myPathContext.filename.substring(extIndex + 1);
            var slug =  myPathContext.filedocid + "?" + myPathContext.filename + "?" + ext ;
            oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "x-csrf-token", value: csrfToken  }));
            oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "slug", value: slug  }));
            //if ("msg".toUpperCase() == ext.toUpperCase())
        //	{
        	 oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "Content-Type", value: "*" }));
        	//}
            oFileUploader.upload();  
            showBusy();
         
            
      },
      error: function(jqXHR, textStatus, errorThrown) { 
    		sap.ui.commons.MessageBox.show(sResponseErr);("XCRF Error");           
      }
    });

   
   
   
}

function getXCRFGF()
{
	uploadDocumentGF()
}

function uploadDocumentGF()
{
	
	var d = new Date();
    console.log(d.toLocaleTimeString());;
	  var url1 = myPathContext.url_root + "ZGW_MYPATH_ATTACHMENT_SRV_01/";
	    var headers = {} ;
	    headers["X-CSRF-Token"] = "Fetch";
	    headers = JSON.parse(JSON.stringify(headers));
	    
	    var aData = jQuery.ajax({   
	         url : url1,
	         headers: headers,
	         type: "GET",
	         data : " ",
	      success : function(data, textStatus, jqXHR) {
	            
	            csrfToken = jqXHR.getResponseHeader('x-csrf-token');
	            console.log(csrfToken);
	            for (var indexF = 0; indexF < feedbackContext.FileArray.length; indexF++) {
		        var fileval = feedbackContext.FileArray[indexF].getValue();  
		        //fileval = encodeURIComponent(fileval);
	            var extIndex = fileval.lastIndexOf(".");
	            var ext = fileval.substring(extIndex + 1);
	            var slug =  myPathContext.filedocid + "?" + fileval + "?" + ext ;
	            var oFileUploaderGF = feedbackContext.FileArray[indexF];
	            if ( indexF != 0)
	            	{
	            	oFileUploaderGF.destroyHeaderParameters();
	            	
	            	}
	            oFileUploaderGF.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "x-csrf-token", value: csrfToken  }));
	            oFileUploaderGF.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "slug", value: slug  }));
	            oFileUploaderGF.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "Content-Type", value: "*" }));
	            oFileUploaderGF.upload();
		            //}, delay); 
	            }

	            
	      },
	      error: function(jqXHR, textStatus, errorThrown) { 
	    	  sap.ui.commons.MessageBox.show(sResponseErr);("XCRF Error");         
	      }
	    });


}



function openUDGF()
{

	
	
	var oTable = new sap.m.Table({
		columns: [
		          new sap.m.Column({ 
		        	  width: "70%"
		          }),
		          new sap.m.Column({  
		        	  width: "30%"
		          }),
		          ],
		          mode: "SingleSelectMaster",
				  selectionChange: function()
				  {
					  
					var fileid = oTable.getModel().getProperty(oTable.getSelectedItem().getBindingContext().sPath+ "/Id");
  	  				var filetype = oTable.getModel().getProperty(oTable.getSelectedItem().getBindingContext().sPath+ "/Type");
  	  				var fileName = oTable.getModel().getProperty(oTable.getSelectedItem().getBindingContext().sPath+ "/Name");
  	  				
  	  				 var serviceURL = myPathContext.url_root + "ZGW_MYPATH_ATTACHMENT_SRV_01/";
  	  				fileName = encodeURIComponent(fileName);
  	  				 var uri =  serviceURL + "/GetFileSet(Fileid='"+fileid+"',Filename='" +fileName+ "',Type='"+filetype+"')/$value" ;
  	  				 uri = encodeURI(uri);
  	  				window.open( uri ,"_blank");
  	  			    oTable.removeSelections();
				  },
				
      items: {
          path: "/results",
          template: new sap.m.ColumnListItem({
            visible : true,
            cells : [
              new sap.m.Label({text: "{Name}",
            	  design : "Bold",
              }),    
              new sap.m.Text({text: "{Type}"}), 
            ],
          type : sap.m.ListType.Active,
          
          }),
          
        },
}).addStyleClass("TableHeader");
	
	myPathContext.uploadTable= oTable ;
	
	var scroll = new sap.m.ScrollContainer({
        height : "200px",
        width : "99%" ,
        vertical :true
      }).addStyleClass("fileScroll");
scroll.addContent(oTable);
	
	var result =  feedbackContext.FileArray ;
	var resultArrIni = [];
	if(result.length > 0){
		 for ( var index = 0 ; index < result.length ;  index ++ )
		 {
			 
		 var fileValue = feedbackContext.FileArray[index].getValue();
		 var extIndex = myPathContext.filename.lastIndexOf(".");
         var ext = myPathContext.filename.substring(extIndex + 1);
         var name = fileValue.substring(0, extIndex);
		 
		 var resultData = {
				 "Id" : "",
              	"Name" : name,
              	"Type" : ext,
 		 };

		 resultArrIni.push(resultData);
		 }
		 var resDataFinalArray =  {"results" : resultArrIni};
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(resDataFinalArray);
		oTable.setModel(oModel);
		
      }
	
	/// Declare the dialog and open it 
	
				 var oDialog = new sap.m.Dialog({
						contentWidth: "70%",
						contentHeight : "350px",
						verticalScrolling :  false,
						showHeader : false,
						subHeader : 
									new sap.m.Bar({
										contentRight : [
										                new sap.m.Button({	
									                					icon : "sap-icon://sys-cancel",
								                                    	  press : function(oEvent){
								                                    		  if(undefined!=myPathContext.feedbackContext && feedbackContext.isCalledFromFeedback)
								                                    			  feedbackContext.isCalledFromFeedback = false;
								                                    		  if(undefined!=myPathContext.appraisalContext && appraisalContext.isCalledFromAppraisal)
								                                    			  appraisalContext.isCalledFromAppraisal = false;
								                                    		  if(undefined!=myPathContext.performancereviewContext && myPathContext.performancereviewContext)
								                                    			  performancereviewContext.isCalledFromPR = false;
								                                    		  if(undefined!=myPathContext.performancereviewVPContext && myPathContext.performancereviewVPContext)
								                                    			  performancereviewVPContext.isCalledFromVP = false;
								                                    		  if(undefined!=myPathContext.hrbpreportsContext && myPathContext.hrbpreportsContext)
								                                    			  hrbpreportsContext.isCalledFromHRBP = false;
								                                    		  oDialog.close();  
								                                    	  }	
										                				})
										                ],
			                contentMiddle : [
			                                 new sap.m.Text({
			                                 	text : myPathContext.i18nModel.getProperty("FILE_UPLOAD") ,
			                                 })
			                                 ]
			
											})                
					}).addStyleClass("Background");
			
				 $(function() {
					  $('body').on('click', '#sap-ui-blocklayer-popup', function() {
						  if(undefined!=myPathContext.feedbackContext && feedbackContext.isCalledFromFeedback)
                			  feedbackContext.isCalledFromFeedback = false;
                		  if(undefined!=myPathContext.appraisalContext && appraisalContext.isCalledFromAppraisal)
                			  appraisalContext.isCalledFromAppraisal = false;
                		  if(undefined!=myPathContext.performancereviewContext && myPathContext.performancereviewContext)
                			  performancereviewContext.isCalledFromPR = false;
                		  if(undefined!=myPathContext.performancereviewVPContext && myPathContext.performancereviewVPContext)
                			  performancereviewVPContext.isCalledFromVP = false;
                		  if(undefined!=myPathContext.hrbpreportsContext && myPathContext.hrbpreportsContext)
                			  hrbpreportsContext.isCalledFromHRBP = false;
                		  oDialog.close();  
					  });
					});
				 
				 
				 
			var oTriggerButton = new sap.m.Button({  
			text: myPathContext.i18nModel.getProperty("FILE_UPLOAD"),
			width : "84px",
			enabled:false,
			visible : myPathContext.uploadContentVisible,
			press:function() {  
								
				showBusy();
				 var delay=700; 
		            setTimeout(function(){
		            	  hideBusy();
		            	  sap.ui.commons.MessageBox.show(myPathContext.i18nModel.getProperty("FILE_SUC") );
		           
		            	var myFileUploader = myPathContext.oFileUploader;
		            	if ( feedbackContext.FileArray.length == 0)
		            		{
		            		feedbackContext.FileArray.push(myPathContext.oFileUploader);
		            		}
		            	else
		            		{
		            		feedbackContext.FileArray.push( myPathContext.oNewFileUploader);
		            		myPathContext.oFlexboxD.addItem( myPathContext.oNewFileUploader);
		            		
		            		}
		            		var oNewFileUploader = new sap.ui.unified.FileUploader({  
		            	        uploadUrl : "/sap/opu/odata/sap/ZGW_MYPATH_ATTACHMENT_SRV_01/FileSet",
		            	        name: "UploadDocument",   
		            	  uploadOnChange: false,
		            	  visible : myPathContext.uploadContentVisible,
		            	 // maximumFileSize: 20,
		            	  fileSizeExceed : function()
		            	  {
		            	  },
		            	  sendXHR: true,  
		            	  change : function(oEvent)
		            	  {
		            	        var filename= oNewFileUploader.getValue();
		            	        myPathContext.filename  = filename ;

		            	        if (filename !== ""){
		            	        	 myPathContext.oTriggerButton.setEnabled(true);
		            	        }
		            	  
		            	  },
		            	  useMultipart: false, 
		            	  
		            	  uploadComplete: function (oEvent) {
		            	  	
		            	  }  
		            	  
		            	  
		            	  
		            	  
		            	}).addStyleClass("FontStyle");
		            	 myPathContext.oNewFileUploader = oNewFileUploader ;
		            	 
		            	 
		            	 
		            	 var oFlexbox = new sap.m.FlexBox({
								direction: sap.m.FlexDirection.Column,
								justifyContent : sap.m.FlexJustifyContent.Inherit,
								alignItems: sap.m.FlexAlignItems.Inherit,
								width: "100%",
								height: "100%",
								items : [	
								oNewFileUploader,
								oTriggerButton,
								oText,
								scroll ,
								oFileUploader,
								myPathContext.oFlexboxD
								]
								});
						 		oDialog.removeContent();
								oDialog.addContent(oFlexbox) ; 
								
						
						var tableUpload = myPathContext.uploadTable ;
						
						/****************************/
						var result =  feedbackContext.FileArray ;
						var resultArrIni = [];
						if(result.length > 0){
							var docCount = 0;
							 for ( var index = 0 ; index < result.length ;  index ++ )
							 {
								 
							 var fileValue = feedbackContext.FileArray[index].getValue();
							 if ( "" != fileValue)
								 {
							 var extIndex = fileValue.lastIndexOf(".");
					         var ext = fileValue.substring(extIndex + 1);
					         var name = fileValue.substring(0, extIndex);
							 
							 var resultData = {
									 "Id" : "",
					              	"Name" : name,
					              	"Type" : ext,
					 		 };

							 resultArrIni.push(resultData);
							 docCount ++;
							 }
							 }
							 var resDataFinalArray =  {"results" : resultArrIni};
							var oModel = new sap.ui.model.json.JSONModel();
							oModel.setData(resDataFinalArray);
							oTable.setModel(oModel);
							
							 if(docCount > 0)
					    		{
					    			 feedbackContext.attachment_count.setText(docCount);
					    			 feedbackContext.attachment_count.setVisible(true);
					    		}
							
							
					      }
		           }, delay); 
						
						
						/*****************************/
			}  
			}).addStyleClass("PaddingandFont");
			
			myPathContext.oTriggerButton = oTriggerButton;
			
			var oFileUploader = new sap.ui.unified.FileUploader({  
	              uploadUrl : "/sap/opu/odata/sap/ZGW_MYPATH_ATTACHMENT_SRV_01/FileSet",
	              name: "UploadDocument",   
	        uploadOnChange: false,
	        visible : myPathContext.uploadContentVisible,
	       // maximumFileSize: 20,
	        fileSizeExceed : function()
      	  {
      	  },
	        sendXHR: true,  
	        change : function(oEvent)
	        {

	             
	        	
	              var filename= oFileUploader.getValue();
	              myPathContext.filename  = filename ;

	              if (filename !== ""){
	                     oTriggerButton.setEnabled(true);
	              }
	        
	        },
	        useMultipart: false, 
	        
	        uploadComplete: function (oEvent) {
	        	
	        }  
	        
	        
	        
	        
	    }).addStyleClass("FontStyle");
			myPathContext.oFileUploader = oFileUploader ;
			
			var oText = new sap.m.Text({
			text : myPathContext.i18nModel.getProperty("UPL_DOC") //"UPLOADED DOCUMENTS"
			}).addStyleClass("PaddingAndFont");
			
			var oFlexbox = new sap.m.FlexBox({
			direction: sap.m.FlexDirection.Column,
			justifyContent : sap.m.FlexJustifyContent.Inherit,
			alignItems: sap.m.FlexAlignItems.Inherit,
			width: "100%",
			height: "100%",
			items : [	oFileUploader,
			oTriggerButton,
			oText,
			scroll
			]
			});
			oDialog.addContent(oFlexbox) ; 
			oDialog.open(); 


}

function cloneObject(oFileUploaderP) {
	if (oFileUploaderP === null || typeof oFileUploaderP !== 'object') {
        return oFileUploaderP;
    }
	
    var temp = oFileUploaderP.constructor(); // give temp the original obj's constructor
    for (var key in oFileUploaderP) {
        temp[key] = cloneObject(oFileUploaderP[key]);
    }
 
    return temp;
}


function createFileUploadEl()
{
	var oNewFileUploader = new sap.ui.unified.FileUploader({  
        uploadUrl : "/sap/opu/odata/sap/ZGW_MYPATH_ATTACHMENT_SRV_01/FileSet",
        name: "UploadDocument",   
  uploadOnChange: false,
  visible : myPathContext.uploadContentVisible,
  //maximumFileSize: 20,
  fileSizeExceed : function()
  {
  },
  sendXHR: true,  
  change : function(oEvent)
  {

       
  	
        var filename= oNewFileUploader.getValue();
        myPathContext.filename  = filename ;

        if (filename !== ""){
        	 myPathContext.oTriggerButton.setEnabled(true);
        }
  
  },
  useMultipart: false, 
  
  uploadComplete: function (oEvent) {
  	
  }  
  
  
  
  
}).addStyleClass("FontStyle");
 myPathContext.oNewFileUploader = oNewFileUploader ;
	
	return oNewFileUploader ;
}


function openEmpDetails(userID)
{

	//Call service to get employee details for logged in user
	 var serviceURL = myPathContext.url_root + "ZGW_MYPATH_USERDASHBOARD_SRV";
    var dashboard_ODataModel = new sap.ui.model.odata.ODataModel(serviceURL);
    myPathContext.dashboard_ODataModel = dashboard_ODataModel;
    
    var readRequestURL = "/EmployeeAdditionalDataSet?$filter=Employeeid eq '"+userID+"'";

    dashboard_ODataModel.read(readRequestURL, null, null, false,     
    
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
        		 
        		 myPathContext.EmpDataemployeeId = employeeData.Employeeid;
            	 myPathContext.EmpDataCountry = employeeData.Country;
            	 myPathContext.EmpDataGlobalId = employeeData.GlobalId;
            	 myPathContext.EmpDataJobName = employeeData.JobName;
            	 myPathContext.EmpDataLocalOrg = employeeData.LocalOrg;
            	 myPathContext.EmpDataLocalGrade = employeeData.LocalGrade;
            	 myPathContext.EmpDataNickname = employeeData.Nickname;
            	 myPathContext.EmpDataSbu = employeeData.Sbu;
            	 myPathContext.EmpDataSbuGrade = employeeData.SbuGrade;
            	 myPathContext.TPRev = employeeData.ReviewerName;
            	 
            	 //Logoff
            	 
            	 var userDataText =  
            	 myPathContext.i18nModel.getProperty("JOB_NAME") +  " : " +  myPathContext.EmpDataJobName + "    " +
            	 "\n" +
            	 myPathContext.i18nModel.getProperty("PREF_NAME") + " : " + myPathContext.EmpDataNickname + "    " +
            	 "\n" +
            	 myPathContext.i18nModel.getProperty("COUNTRY") + " : " +myPathContext.EmpDataCountry + "    " +
            	 "\n" +
            	 myPathContext.i18nModel.getProperty("SBU") + " : " +myPathContext.EmpDataSbu  + "    " +
            	 "\n" +
            	 myPathContext.i18nModel.getProperty("SBU_GRADE") + " : " +myPathContext.EmpDataSbuGrade + "    " +
            	 "\n" +
            	 myPathContext.i18nModel.getProperty("LOCAL_ORG") + " : " +myPathContext.EmpDataLocalOrg + "    " +
            	 "\n" +
            	 myPathContext.i18nModel.getProperty("LOCAL_GRADE") + " : " +myPathContext.EmpDataLocalGrade + "    " +
            	 "\n" +
            	 myPathContext.i18nModel.getProperty("GLOBAL_ID") +  " : " + myPathContext.EmpDataGlobalId;
            	 
            	 myPathContext.AddUserData =  userDataText ;
            	 
            	 var userDataTextTP =  
            		 myPathContext.i18nModel.getProperty("LOCAL_GRADE") + " : " +myPathContext.EmpDataLocalGrade + "    " +
                	 "\n" +
                	 myPathContext.i18nModel.getProperty("Organisational Unit") + " : " +myPathContext.EmpDataLocalOrg + "    " +
                	 "\n" +
                	 myPathContext.i18nModel.getProperty("ROLE") +  " : " + myPathContext.EmpDataRole;
            	 
            	 
            	 myPathContext.AddUserDataTP =  userDataTextTP ;
            	 
            		
         		
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