var checkTime;

//Initialize function
var init = function() {
  // TODO:: Do your initialization job
  console.log('init() called');
  callapi();

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

(function($){
	var cmc_ajax = $.getJSON('https://api.coinmarketcap.com/v1/ticker/Bitcoin/?convert=EUR');
    cmc_ajax.done(function(data){
    	$('#BTC').text(data[0]['price_eur']);
    });
})(jQuery);
(function($){
	var cmc_ajax = $.getJSON('https://api.coinmarketcap.com/v1/ticker/bitcoin-cash/?convert=EUR');
    cmc_ajax.done(function(data){
    	$('#BCH').text(data[0]['price_eur']);
    });
})(jQuery);
(function($){
	var cmc_ajax = $.getJSON('https://api.coinmarketcap.com/v1/ticker/Ethereum/?convert=EUR');
    cmc_ajax.done(function(data){
    	$('#ETH').text(data[0]['price_eur']);
    });
})(jQuery);
(function($){
	var cmc_ajax = $.getJSON('https://api.coinmarketcap.com/v1/ticker/Tron/?convert=EUR');
    cmc_ajax.done(function(data){
    	$('#TRX').text(data[0]['price_eur']);
    });
})(jQuery);
