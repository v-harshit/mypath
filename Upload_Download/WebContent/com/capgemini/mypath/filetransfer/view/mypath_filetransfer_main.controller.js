var array = [];
sap.ui.controller("com.capgemini.mypath.filetransfer.view.mypath_filetransfer_main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf mypath_upload.View_1
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf mypath_upload.View_1
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf mypath_upload.View_1
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf mypath_upload.View_1
*/
//	onExit: function() {
//
//	}
	handlePressButton: function(){
		var oTable = new sap.m.Table({
	   		
			columns: [
			          new sap.m.Column({  width: "2em"
			          }),
			          new sap.m.Column({  width: "2em"
			          }),
			          ],
	      items: {
	          path: "/results",
	          template: new sap.m.ColumnListItem({
	            visible : true,
	            cells : [
	              new sap.m.Link({text: "{Name}",
	            	  			press : function(oEvent){
	            	  				
	            	  			}
	              }),    
	              new sap.m.Text({text: "{Type}"}), 
	            ],
	          type : sap.m.ListType.Active,
	          
	          }),
	          
	        },
	}).addStyleClass("TableHeader");
		
	//ACCESSING THE DOWNLOAD COUNT DETAILS

		var serviceURI  = mypath_filetransferContext.url_root + "ZGW_MYPATH_ATTACHMENT_SRV_01?sap-client=300";
	    var Un = "ZTESTEMPMIN1";
	    var pwd = "TestingE1";
		var odatamodel = new sap.ui.model.odata.ODataModel(serviceURI, true, Un, pwd);
		
		
		var requestURL = "/GetListSet?$filter=AppraisalId%20eq%27544FEB3F73FF1EB0E10080000AF79B1C%27&$format=json";

		var data = odatamodel.read(requestURL,null,null,false,
	            function(oData) {
			debugger;
			var resultArrIni = [];
			  var result = oData.results;
			  var count = oData.results.length;
	          if(result.length > 0){
	    		debugger;
	    		 for ( var index = 0 ; index < count ;  index ++ )
	    		 {
	    		 var resultData = {
	                 	"Name" : result[index].Name,
	                 	"Type" : result[index].Type,
	    		 }

	    		 resultArrIni.push(resultData);
	    		 }
	    		 var resDataFinalArray =  {"results" : resultArrIni};
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(resDataFinalArray);
				oTable.setModel(oModel);
				
	          }
	                
	               
	            },
	            function(oError) {
	                   errorRes = true;
	                   });
		
		
		
	    var oDialog = new sap.m.Dialog({
										contentWidth: "70%",
										showHeader : false,
										subHeader : 
													new sap.m.Bar({
														contentRight : [
														                new sap.m.Button({	
													                					icon : "sap-icon://sys-cancel",
												                                    	  press : function(oEvent){
												                                    		  oDialog.destroy();  
												                                    	  }	
														                				})
														                ],
						                       contentMiddle : [
						                                        new sap.m.Text({
						                                        	text : "Upload",
						                                        })
						                                        ]
					
															})                
									}).addStyleClass("Background");

	   	
		var oTriggerButton = new sap.m.Button({  
	        text:'UPLOAD',  
	        width : "84px",
	        enabled:false,
	        press:function() {  
	         }  
	    }).addStyleClass("PaddingandFont");


	   	var oModel = new sap.ui.model.json.JSONModel();
	   var oFileUploader = new sap.ui.unified.FileUploader({  
	       /* uploadUrl : "<server name> /<entity set> ('"+ user +"')/Photo", */ 
	        name: "UploadDocument",   
	        uploadOnChange: false,
	        maximumFileSize: 5,
	        change : function()
	        {
	        	var filename= oFileUploader.getValue();

	        	if (filename !== ""){
	        		oTriggerButton.setEnabled(true);
	        	}
	        },
	        useMultipart: false,    
	    }).addStyleClass("FontStyle");

	   var oText = new sap.m.Text({
		   	text : "UPLOADED DOCUMENTS"
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
			         	oTable
			         ]
		});
	    oDialog.addContent(oFlexbox) ; 
	    oDialog.open(); 
	    


	}
});