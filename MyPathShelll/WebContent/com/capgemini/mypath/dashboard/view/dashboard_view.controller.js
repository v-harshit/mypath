sap.ui.controller("com.capgemini.mypath.dashboard.view.dashboard_view", {

	onBeforeRendering: function(){
		callActionCountService();
		callEmployeeDocumentService();
		callAssignmentManager_FeedbackProviderService();
		callPerformanceReviewerService();
	}

});