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

				document.querySelector("#stop").addEventListener('click', function(){
					$.get('stopRaspi.php');
				});

				document.querySelector("#start").addEventListener('click', function(){
					$.get('startPython.php');
				});
			},

			getData: function() { /* this.dataUrl, */ 
			    // console.log("Getting : " + this.dataUrl.replace("#", ""));
			    var xmlHttp = new XMLHttpRequest();
			    xmlHttp.onreadystatechange = function() { 
			        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			        	// console.log(xmlHttp.responseText);
			        	try {
						var json = JSON.parse(xmlHttp.responseText);
				            	this.updateView(json);
					} catch (e)
					{
						console.log(xmlHttp.responseText);
					}
			        }
			    }.bind(this);
			    xmlHttp.open("GET", this.dataUrl.replace("#", ""), true); // true for asynchronous 
			    xmlHttp.send(null);
			},

			updateView: function(data) {
				console.log("Update");

				for (var key in data) {
					if (data.hasOwnProperty(key)){

						var ext = "";

						// Unity
						if (key == "humidity") { ext = "%" }
						else if (key == "temperature") { ext = "°C" }

						// 1 nb after the dot max
						if (data[key] - Math.trunc(data[key]) > 1e-10){
							// It's not an int, cut it
							data[key] = Math.round(data[key]*10)/10;
						}

						$("#text_" + key).text(data[key] + ext);
					}	
				}
				
				// temperature, humidity and air_quality color change

				if (data["temperature"] < 20) {
					$("#temperature").css("background-color", "yellowgreen");
				} else if (data["temperature"] < 25) {
					$("#temperature").css("background-color", "#d64760");
				} else if (data["temperature"] < 40){
					$("#temperature").css("background-color", "#de8443");
				} else {
					$("#temperature").css("background-color", "lightgray");
				}
				
				if (data["humidity"] == "--") {
					$("#humidity").css("background-color", "lightgray");
				}
				
				if (data["air_quality"] < 50) {
					$("#air_quality").css("background-color", "yellowgreen");
				} else if (data["air_quality"] < 150) {
					$("#air_quality").css("background-color", "#d64760");
				} else if (data["air_quality"] < 1000){
					$("#air_quality").css("background-color", "#de8443");
				} else {
					$("#air_quality").css("background-color", "lightgray");
				}

				setTimeout(function (){
					this.getData();
				}.bind(this), 1000);
			}

}; return _; })(jQuery);

binky.init();
