var mymap = L.map('map');
 
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>',
}).addTo(mymap);

mymap.setView([37.109592, 138.256757], 15);

$.getJSON("/positions" , function(data) {
  var len = data.length;
  for(var i = 0; i < len; i++) {
    L.marker([data[i].lat, data[i].lng]).addTo(mymap);
  }
});
