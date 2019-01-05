//Initialize function
var focusable1;
var coins;

var init = function() {
  // TODO:: Do your initialization job
  $.ajaxSetup({
    'cache': true
  });
  getPrices();
  bestCoins();
  document.getElementById("coin_info").style.display = "none";
  var i = 0;
  var j = 0;
  // add eventListener for keydown
  document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case 37: //LEFT arrow
        if (i > 0) {
          i--;
          document.getElementById(focusable1[i].id).focus();
          console.log(i);

        } else {
          i = focusable1.length - 1;
          document.getElementById(focusable1[i].id).focus();
          console.log(i);
        }
        break;
      case 38: //UP arrow
        if (j >0) {
        j--;
        document.getElementById(focusable1[j].id).focus();
        console.log(j);

      } else {
        j = focusable1.length - 1;
        document.getElementById(focusable1[j].id).focus();
        console.log(j);
      }
        break;
      case 39: //RIGHT arrow
        if (i < focusable1.length - 1) {
          i++;
          document.getElementById(focusable1[i].id).focus();
          console.log(i);

        } else {
          i = 0;
          document.getElementById(focusable1[i].id).focus();
          console.log(i);
        }
        break;
      case 40: //DOWN arrow
        if (j < focusable1.length - 1) {
          j++;
          document.getElementById(focusable1[j].id).focus();
          console.log(j);
        } else {
          j = 0;
          document.getElementById(focusable1[j].id).focus();
          console.log(i);
        }
        break;
      case 13: //OK button
        document.getElementById(focusable1[i].id).click();
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

function bestCoins() {
  $.get({
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    dataType: 'json',
    data: {
      'CMC_PRO_API_KEY': 'cef0c950-831e-4cff-837c-1b81ddc7470b'
    },
    success: function(response) {
      console.log('request succed');
      var node = document.createElement("p");
      var text = " ";
      for (var i = 0; i < response.data.length; i++) {
        coins = response;
        text += response.data[i].name + ":" + response.data[i].quote.USD.price.toFixed(4) + " / ";
        var node1 = document.createElement("li");
        var node2 = document.createElement("a");
        node2.className = "btn btn-dark mb-2";
        node2.id = "coin_"+i;
        node2.setAttribute('href', "#");
        node2.setAttribute('onClick','showCoinsInfo('+i+')');
        var textnode1 = document.createTextNode(response.data[i].name);
        node2.appendChild(textnode1);
        node1.appendChild(node2);
        document.getElementById("all_coins").appendChild(node1);
      }
      var textnode = document.createTextNode(text);
      node.appendChild(textnode);
      document.getElementById("coins").appendChild(node);
      focusable1 = document.querySelectorAll(".btn");
    },
    error: function() {
      console.log("error");
    }
  });

}

function getPrices() {
  var resp = $.getJSON('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=EUR');
  resp.done(function(data) {
    $('#Bitcoin').text(data[0].price_eur);
  });
  var resp1 = $.getJSON('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR');
  resp1.done(function(data) {
    $('#Ethereum').text(data[0].price_eur);
  });
  var resp2 = $.getJSON('https://api.coinmarketcap.com/v1/ticker/tron/?convert=EUR');
  resp2.done(function(data) {
    $('#Tron').text(data[0].price_eur);
  });
  var resp3 = $.getJSON('https://api.coinmarketcap.com/v1/ticker/bitcoin-cash/?convert=EUR');
  resp3.done(function(data) {
    $('#Bitcoin-Cash').text(data[0].price_eur);
  });
}

function showCoinsInfo(i){
  coin = i;
  document.getElementById("content").style.display = "none";
  document.getElementById("coin_info").style.display = "block";
  document.getElementById("return").style.display = "block";


  var n = document.createElement("p");
  textt = coins.data[coin].name;
  var textn = document.createTextNode(textt);
  n.style.textAlign = 'center';
  n.style.fontSize = '50px';
  n.appendChild(textn);
  document.getElementById("coin_info").appendChild(n);

  var n = document.createElement("p");
  textt = "Price: " + coins.data[coin].quote.USD.price.toFixed(4) + "$";
  var textn = document.createTextNode(textt);
  n.appendChild(textn);
  document.getElementById("coin_info").appendChild(n);

  var n = document.createElement("p");
  textt = "Last Updated: " + coins.data[coin].quote.USD.last_updated;
  var textn = document.createTextNode(textt);
  n.appendChild(textn);
  document.getElementById("coin_info").appendChild(n);

  var n = document.createElement("p");
  textt = "Change 1h: " + coins.data[coin].quote.USD.percent_change_1h;
  var textn = document.createTextNode(textt);
  n.appendChild(textn);
  document.getElementById("coin_info").appendChild(n);

  var n = document.createElement("p");
  textt = "Change 24h: " + coins.data[coin].quote.USD.percent_change_24h;
  var textn = document.createTextNode(textt);
  n.appendChild(textn);
  document.getElementById("coin_info").appendChild(n);

  var n = document.createElement("p");
  textt = "Change 7 days: " + coins.data[coin].quote.USD.percent_change_7d;
  var textn = document.createTextNode(textt);
  n.appendChild(textn);
  document.getElementById("coin_info").appendChild(n);

  var n = document.createElement("p");
  textt = "Volume 24h: " + coins.data[coin].quote.USD.volume_24h;
  var textn = document.createTextNode(textt);
  n.appendChild(textn);
  document.getElementById("coin_info").appendChild(n);

  console.log(coins.data[coin]);




}

function goBack(){
  document.getElementById("content").style.display = "block";
  document.getElementById("coin_info").style.display = "none";
  document.getElementById("return").style.display = "none";

  document.getElementById("coin_info").innerHTML = "";
}

function searchCoin() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("all_coins");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function refresh(){
  var marque = document.getElementById("coins");
  marque.start();
  getPrices();
  bestCoins();
}
