var SOCKET_HOST = "ws://localhost:8008/stage";

// wrap logger
// -----------
// useful to send to external file
// for raspberry pi log viewing
var log = {

	info: function(msg) {
		console.log("info:", msg)
	},

	debug: function(msg) {
		console.log("debug:", msg)
	},

	error: function(msg) {
		console.log("error:", msg)
	}
}

var CastReceiver = function(display) {

	var _this = this;

	_this.windows = {};
	_this.ws = new WebSocket(SOCKET_HOST);

	_this.onMessage = function(e) {

		var cmd = $.parseJSON(e.data);

		if(cmd.cmd == "show") {

			$('#idle_container').fadeOut('slow');

			var url = cmd.url;
			var windowName = "popUp";//$(this).attr("name");
			var windowSize = 'width='+screen.width;', height='+screen.height;

			//_this.windows[cmd.app] = window.open(url, windowName, windowSize);
			// window.location = url;
			_this.windows[cmd.app] = display.load(url);

		} else if(cmd.cmd == "idle") {

			display.close();
			display.home();

		} else if(cmd.cmd == "close") {

			display.close();
			display.home();
		}
	}

	_this.init = function() {

		log.info("cast - initializing...")

		// bind event handler
		_this.ws.onmessage = _this.onMessage;
	}

	return _this.init();
};

var DisplayHandler = function() {

	var _this = this;
	
	_this.active = false;
	_this.exports = {}
	_this.windows = [];

	_this.home = _this.exports.home = function(cb) {

		cb = cb || function(){};

		log.info("display - loading home...")
		_this.menu("true");
		_this.close();
	}

	_this.close = _this.exports.close = function() {

		$("#content").fadeOut("fast");

		$("#content-view").attr("src", "")
		$("#content-view").html("")
	}

	_this.load = _this.exports.load = function(url, cb) {

		cb = cb || function(){};

		log.info("display - loading url...")
		log.info("display - url:" + url)
		
		$("#content-view").attr("src", url)
		$("#content").fadeIn("fast");
		_this.menu("false");
	};

	_this.menu = _this.exports.menu = function(force) {

		force = force || false;

		var state = $(".sidebar").attr("active");

		if((!force && state == "true") || (force && force === "false")) {

			$(".sidebar").attr("active", "busy");

			$(".sidebar").animate({

				opacity: 0.25,
				top: "-" + $(".sidebar").height()

			}, 1000, function() {

				log.info("keyboard - menu toggled")
				$(".sidebar").attr("active", "false");
			});

		}

		else if((!force && state == "false") || (force && force == "true")) {

			$(".sidebar").attr("active", "busy");

			$(".sidebar").animate({

				opacity: 1.25,
				top: 0

			}, 1000, function() {
				log.info("keyboard - menu toggled")
				$(".sidebar").attr("active", "true");
			});
		}
	};

	return _this.exports;
}

var display = new DisplayHandler();
var cast = new CastReceiver(display);