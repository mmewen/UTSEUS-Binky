var binky = (function($) { var _ = {

	/******************************/
	/* Properties                 */
	/******************************/

		// Data src
			dataUrl: window.location.href + "data.json",

	/******************************/
	/* Methods                    */
	/******************************/
		// Main init method
			init: function() {
				this.getData(this.updateView);
			},

			getData: function() { /* this.dataUrl, */ 
			    // console.log("Getting : " + this.dataUrl);
			    var xmlHttp = new XMLHttpRequest();
			    xmlHttp.onreadystatechange = function() { 
			        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			        	// console.log(xmlHttp.responseText);
			        	var json = JSON.parse(xmlHttp.responseText);
			            this.updateView(json);
			        }
			    }.bind(this);
			    xmlHttp.open("GET", this.dataUrl, true); // true for asynchronous 
			    xmlHttp.send(null);
			},

			updateView: function(data) {
				for (var key in data) {
					if (data.hasOwnProperty(key))
						var ext = "";

						if (key == "humidity") { ext = "%" }
						else if  (key == "temperature") { ext = "°C" }
						$("#text_" + key).text(data[key] + ext);
				}

				setTimeout(function (){
					this.getData();
				}.bind(this), 1000);
			}

}; return _; })(jQuery);

binky.init();