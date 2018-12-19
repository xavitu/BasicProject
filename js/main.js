var checkTime;

//Initialize function
var init = function() {
  // TODO:: Do your initialization job
  console.log('init() called');
  
  getPrices($);

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Something you want to do when hide or exit.
    } else {
      // Something you want to do when resume.
    }
  });

  // add eventListener for keydown
  document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case 37: //LEFT arrow
        break;
      case 38: //UP arrow
        break;
      case 39: //RIGHT arrow
        break;
      case 40: //DOWN arrow
        break;
      case 13: //OK button
        break;
      case 10009: //RETURN button
        tizen.application.getCurrentApplication().exit();
        break;
      default:
        console.log('Key code : ' + e.keyCode);
        break;
    }
  });
};
// window.onload can work without <body onload="">
window.onload = init;

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('divbutton1').innerHTML = 'Current time: ' + h + ':' + m + ':' + s;
  setTimeout(startTime, 10);
}

function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

function callapi(){
	  $.ajax({
	    url: 'https://sandbox.coinmarketcap.com/v1/cryptocurrency/listings/latest',
	    headers: {
	        'X-CMC_PRO_API_KEY': 'cef0c950-831e-4cff-837c-1b81ddc7470b'
	    },
	    type: "GET", /* or type:"GET" or type:"PUT" */
	    dataType: "jsonp",
	    json: true,
	    gzip: true,
	    success: function (result) {
	        console.log(result);
	    },
	    error: function () {
	        console.log("error");
	    }
	});

}

function getPrices($){
	var resp = $.getJSON('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=EUR');
    resp.done(function(data){
    	$('#Bitcoin').text(data[0].price_eur);
    });
    var resp = $.getJSON('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR');
    resp.done(function(data){
    	$('#Ethereum').text(data[0].price_eur);
    });
    var resp = $.getJSON('https://api.coinmarketcap.com/v1/ticker/tron/?convert=EUR');
    resp.done(function(data){
    	$('#Tron').text(data[0].price_eur);
    });
    var resp = $.getJSON('https://api.coinmarketcap.com/v1/ticker/bitcoin-cash/?convert=EUR');
    resp.done(function(data){
    	$('#Bitcoin-Cash').text(data[0].price_eur);
    });
};

function infoCoin(){
	var btcPrice;
        $.ajax({
            type: "GET",
            url: "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
            dataType: "json",
            success: function(result){
            	var node = document.createElement("P");                 
            	var textnode = document.createTextNode(result[0]);         
            	node.appendChild(textnode);                              
            	document.getElementById("info").appendChild(node); 
                btc = result[0];
            },
        error: function(err){
            console.log(err);
        }
        });
}

