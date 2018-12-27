var checkTime;

//Initialize function
var init = function() {
  // TODO:: Do your initialization job
  console.log('init() called');
  $.ajaxSetup({
    'cache': true
  });
  getPrices($);

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Something you want to do when hide or exit.
    } else {
      // Something you want to do when resume.
    }
  });

  // add eventListener for keydown
  var focusable = document.querySelectorAll("a.btn");
  var i = 0;
  var firstFocusable = focusable[0];
  var lastFocusable = focusable[focusable.length - 1];
  console.log(focusable[0].id);
  console.log(focusable.length);

  document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case 37: //LEFT arrow
      if (i < focusable.length - 1) {
        firstFocusable = focusable[i];
        document.getElementById(firstFocusable.id).focus();
        i--;
      } else {
        i = 0;
      }
        break;
      case 38: //UP arrow
        break;
      case 39: //RIGHT arrow
      if (i < focusable.length - 1) {
        firstFocusable = focusable[i];
        document.getElementById(firstFocusable.id).focus();
        i++;
      } else {
        i = 0;
      }
        break;
      case 40: //DOWN arrow
                break;
      case 13: //OK button
        document.getElementById(firstFocusable.id).click();
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


function infoCoin() {
  $.get({
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
    dataType: 'json',
    data: {
      'CMC_PRO_API_KEY': 'cef0c950-831e-4cff-837c-1b81ddc7470b',
      id: 1,
    },
    success: function(response) {
      console.log('request succed');
      var node = document.createElement("p");
      var textnode = document.createTextNode(response.data[1].name);
      node.appendChild(textnode);

      document.getElementById("info").appendChild(node);
    },
    error: function() {
      console.log("error");
    }
  });
}

function getPrices($) {
  var resp = $.getJSON('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=EUR');
  resp.done(function(data) {
    $('#Bitcoin').text(data[0].price_eur);
  });
  var resp = $.getJSON('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR');
  resp.done(function(data) {
    $('#Ethereum').text(data[0].price_eur);
  });
  var resp = $.getJSON('https://api.coinmarketcap.com/v1/ticker/tron/?convert=EUR');
  resp.done(function(data) {
    $('#Tron').text(data[0].price_eur);
  });
  var resp = $.getJSON('https://api.coinmarketcap.com/v1/ticker/bitcoin-cash/?convert=EUR');
  resp.done(function(data) {
    $('#Bitcoin-Cash').text(data[0].price_eur);
  });
};
