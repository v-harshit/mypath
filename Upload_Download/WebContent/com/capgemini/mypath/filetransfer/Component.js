// define a new (simple) UIComponent
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("com.capgemini.mypath.filetransfer.scripts.scripts");

//new component declaration
jQuery.sap.declare("com.capgemini.mypath.filetransfer.Component");

//new Component initialization
sap.ui.core.UIComponent.extend("com.capgemini.mypath.filetransfer.Component", {
       createContent : function() {
    	   
    	   var fileUploacdArr = [];
       jQuery.sap.includeStyleSheet("com/capgemini/mypath/css/Style.css");


//Declare the view
oView = sap.ui.view({
       viewName : "com.capgemini.mypath.filetransfer.view.mypath_filetransfer_main",
       type : "JS",
       viewData : {
              component : this
       }
});
       
       //Call to the function
       
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
                                         debugger;
                                         
                                         var filename = oEvent.oSource.mProperties.text ;
                                         var path = oEvent.oSource.oPropagatedProperties.oBindingContexts.undefined.sPath;
                                         path = path.split("/");
                                         path = path[2];
                                         var fileid = oTable.getModel().getData().results[path].Id;
                                         var filetype = oTable.getModel().getData().results[path].Type;
                                         
                                          window.open("http://gdhrsdvecal1d.corp.capgemini.com:8010/sap/opu/odata/sap/ZGW_MYPATH_ATTACHMENT_SRV_01/GetFileSet(Fileid='"+fileid+"',Filename='" +filename+ "',Type='"+filetype+"')/$value?sap-client=300","_blank")
                                         
                                         
                                   }
              }),    
              new sap.m.Text({text: "{Id}"}), 
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
                            "Id" : result[index].Id,
                     "Name" : result[index].Name,
                     "Type" : result[index].Type,
               }

               resultArrIni.push(resultData);
               }
               resDataFinalArray =  {"results" : resultArrIni};
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
              // call the upload method  
        	// getXCRF();
        	
        	fileUploacdArr.push(oFileUploader);
        	
               
         }  
       
       
    }).addStyleClass("PaddingandFont");
       
       var oTriggerButtonA = new sap.m.Button({  
           text:'rrrrrrrrrr',  
           width : "84px",
           enabled:true,
           press:function() { 
                 // call the upload method  
        	   
        	   for (var index = 0; index < fileUploacdArr.length; index++) {
        		   getXCRF(fileUploacdArr[index]);
			}
           	
           	
           //	fileUploacdArr.push(oFileUploader);
           	
                  
            }  
          
          
       }).addStyleClass("PaddingandFont");

       debugger;
       var oModel = new sap.ui.model.json.JSONModel();
       var oFileUploader = new sap.ui.unified.FileUploader({  
              uploadUrl : "/sap/opu/odata/sap/ZGW_MYPATH_ATTACHMENT_SRV_01/FileSet",
              name: "UploadDocument",   
        uploadOnChange: false,
       /* headerParameters: [  
                                 
                 new sap.ui.unified.FileUploaderParameter({name: "x-csrf-token", value: csrfToken }),
                              ],*/
        maximumFileSize: 5,
        sendXHR: true,  
        change : function(oEvent)
        {
             
        	
              var filename= oFileUploader.getValue();

              if (filename !== ""){
                     oTriggerButton.setEnabled(true);
              }
        },
        useMultipart: false, 
        
        uploadComplete: function (oEvent) {  
            var sResponse = oEvent.getParameter("response");  
            if (sResponse) {  
              oDialog.close();  
                sap.ui.commons.MessageBox.show("Return Code: " + sResponse, "Response", "Response");  
            }  
        }  
        
        
        
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
              items : [     oFileUploader,
                            oTriggerButton,
                            oTriggerButtonA,
                            oText,
                            oTable
                       ]
       });
    oDialog.addContent(oFlexbox) ; 
    oDialog.open(); 
    
       
       /////////////////////
    function getXCRF(oFileUploaderM){
       

        
        var url1 = "http://gdhrsdvecal1d.corp.capgemini.com:8010/sap/opu/odata/sap/ZGW_MYPATH_ATTACHMENT_SRV_01";
        
        var headers = {} ;
        headers["X-CSRF-Token"] = "Fetch";
        headers["Content-Type"] = "application/pdf";
        //headers["slug"] = "544FEB3F73FF1EB0E10080000AF79B1C&UI5test133013.PDF&PDF" ;
        headers = JSON.parse(JSON.stringify(headers));
        
        var aData = jQuery.ajax({   
             url : url1,
             headers: headers,
             type: "GET",
            // async : true,
          //contentType : "application/json",
          //dataType : 'json',
             data : " ",
          success : function(data, textStatus, jqXHR) {
                
                csrfToken = jqXHR.getResponseHeader('x-csrf-token');
               // console.log()
                oFileUploaderM.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "x-csrf-token", value: csrfToken  }));
                oFileUploaderM.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "slug", value:"544FEB3F73FF1EB0E10080000AF79B1C&UI5test133013.PDF&PDF"  }));  
                oFileUploaderM.upload();  
                //alert(csrfToken);
             
                
          },
          error: function(jqXHR, textStatus, errorThrown) { 
                    alert("Error");           
          }
        });

       
       
       
    }
    
    
       return oView;
}
});
