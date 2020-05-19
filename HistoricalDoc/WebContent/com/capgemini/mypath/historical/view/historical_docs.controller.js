sap.ui.controller("com.capgemini.mypath.historical.view.historical_docs", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.capgemini.mypath.historical.view.historical_docs
*/
	onInit: function() {
		
		var odatamodel =   historicalContext.historical_oDataModel;	
		var readRequestURL = "DocListSet?$filter=Employeeid eq '"+myPathContext.employeeId+"'";	//00300136
		showBusy();
		odatamodel.read(readRequestURL, null, null, true, function (oData,oResponse) {
			hideBusy();
			var file_data = oData.results;
			if(file_data.length <= 0){
				var oSection1 = new sap.ui.commons.AccordionSection();
				oSection1.setTitle(myPathContext.i18nModel.getProperty("NO_DATA_MSG"));
				
				historicalContext.historicaldoc_accordion.addSection(oSection1);
			}
			else{
				
				var historical_doc_data = new Array();
				
				for(var i=0; i<file_data.length; i++){
					
					var year_found = false;
					for(var j = 0; j < historical_doc_data.length; j++)
					{
						if(historical_doc_data[j].year == file_data[i].Zyear){
							var record = {
								filetype: file_data[i].Reserve,
								filename: file_data[i].Filename,
								fileid: file_data[i].ArcDocId,
								archiveid: file_data[i].ArchivId
							};
							historical_doc_data[j].files.push(record);
							year_found = true;
							break;
						}
					}
					if(!year_found){
						var record = {
							displayfilename: file_data[i].Filename+"."+file_data[i].Reserve,
							filetype: file_data[i].Reserve,
							filename: file_data[i].Filename,
							fileid: file_data[i].ArcDocId,
							archiveid: file_data[i].ArchivId
						};
						historical_doc_data.push({year: file_data[i].Zyear,files:[record]});
					}
					
				}
				
				for(var i=0; i<historical_doc_data.length; i++){
					
					var oSection1 = new sap.ui.commons.AccordionSection();
					oSection1.setTitle(historical_doc_data[i].year);
					
					for(var j=0;j<historical_doc_data[i].files.length; j++){
						var oLink1 = new sap.m.Link({
							text : historical_doc_data[i].files[j].filename,
							press: function(){
								downloadHistoricalDoc(this);
							},
							customData:[
							            {
							            	Type : "sap.ui.core.CustomData",
							            	key : "filetype",
							            	value : historical_doc_data[i].files[j].filetype
							            },
							            {
							            	Type : "sap.ui.core.CustomData",
							            	key : "fileid",
							            	value : historical_doc_data[i].files[j].fileid
							            },
							            {
							            	Type : "sap.ui.core.CustomData",
							            	key : "archiveid",
							            	value : historical_doc_data[i].files[j].archiveid
							            }
							            
							            ]
						}).addStyleClass("document_link");

						oSection1.addContent(oLink1);
					}
					
					historicalContext.historicaldoc_accordion.addSection(oSection1);
				}
				
				
			}
			
		},
		function(oError)
		{
			hideBusy();
			
		});
	},

});

//http://gdhrsdvecal1d.corp.capgemini.com:8010/sap/opu/odata/sap/ZGW_MYPATH_HISTORICAL_DOC_SRV/DocDetailsSet(ArcDocId='536A1971A8EB4250E10080000AF79B1C',ArchivId='Z1',Reserve='PDF',Filename='2011%20Document%2020140508')/$value
/* Function to download historical docs */
function downloadHistoricalDoc(link){
	
	var filetype = link.getCustomData()[0].getValue();
	var fileid = link.getCustomData()[1].getValue();
	var archiveid = link.getCustomData()[2].getValue();
	var filename = link.getText();
	
	var url =historical_ns.url_root+"ZGW_MYPATH_HISTORICAL_DOC_SRV/DocDetailsSet(ArcDocId='"+fileid+"',ArchivId='"+archiveid+"',Reserve='"+filetype+"',Filename='"+filename+"')/$value";
	window.open(url,'_blank');
}