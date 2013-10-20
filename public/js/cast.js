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

var CastReceiver = function() {

	var _this = this;

	_this.windows = {};
	_this.ws = new WebSocket(SOCKET_HOST);

	_this.onMessage = function(e) {

		log.debug(e);

		var cmd = $.parseJSON(e.data);

		if(cmd.cmd == "show") {

			$('#idle_container').fadeOut('slow');

			var url = cmd.url;
			var windowName = "popUp";//$(this).attr("name");
			var windowSize = 'width='+screen.width;', height='+screen.height;

			_this.windows[cmd.app] = window.open(url, windowName, windowSize);
			// window.location = url;

		} else if(cmd.cmd == "idle") {

			$('#idle_container').fadeIn('slow');

		} else if(cmd.cmd == "close") {

			$('#idle_container').fadeIn('slow');
			windows[cmd.app].close();
		}
	}

	_this.init = function() {

		log.info("cast - initializing...")

		// bind event handler
		_this.ws.onmessage = _this.onMessage;
	}

	return _this.init();
};

var cast = new CastReceiver();