var keyBindings = {

	"M": display.menu,
	"H": display.home,

	"ESC": function() {
		chrome.app.window.current().close();
	}
}

var KeyboardHandler = function(keyBindings) {
	
	var _this = this;
	_this.cmd = {};

	

	_this.init = function() {

		log.info("keyboard - initializing...")

		for(var k in keyBindings)
			Mousetrap.bind(k.toLowerCase(), keyBindings[k] || function(){});

		log.info("keyboard - bindings ok...")

	}

	return _this.init();
};

var keyboard = new KeyboardHandler(keyBindings);

jQuery(function($){
						
	$.supersized({			
		// Functionality
		slide_interval   : 3000,		// Length between transitions
		transition       : 1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed : 1000,		// Speed of transition														   
		// Components							
		slide_links		 : 'false',	
		slides 			 : [

			// Slideshow Images
			{image : '../images/bg.jpg'}, //set background images here (absolute path) //
			{image : '../images/bg1.jpg'}  //set background images here (absolute path) //
		]					
	});		
});