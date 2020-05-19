sap.ui.jsview("com.capgemini.mypath.dashboard.view.carousel_view", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.capgemini.mypath.dashboard.view.carousel_view
	*/ 
	getControllerName : function() {
		return "com.capgemini.mypath.dashboard.view.carousel_view";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.capgemini.mypath.dashboard.view.carousel_view
	*/ 
	createContent : function(oController) {
 		
		var item1 = createEmployeeCarouselItem();
		var item2 = createPerformanceCarouselItem();
		var item3 = createManagerCarouselItem();
		
		item1.addStyleClass("carousel_left_item");
		item2.addStyleClass("carousel_main_item");
		item3.addStyleClass("carousel_right_item");
		
		var dashboardCarousel = new sap.m.List({
			items:[item1, item2, item3]
		}).addStyleClass("carousel_list");
		
		myPathContext.dashboardCarousel = dashboardCarousel;
		
		var left_arrow = new sap.ui.commons.Image({
			src:"./com/capgemini/mypath/images/left_arrow.png",
			press: function(){
				moveCarousel("left");
			}
		}).addStyleClass("carousel_arrow").addStyleClass("left_arrow");
		
		var right_arrow = new sap.ui.commons.Image({
			src:"./com/capgemini/mypath/images/right_arrow.png",
			press: function(){
				moveCarousel("right");
			}
		}).addStyleClass("carousel_arrow").addStyleClass("right_arrow");
		
		this.addContent(left_arrow);
		this.addContent(right_arrow);
	    this.addContent(dashboardCarousel);
		
	}

});