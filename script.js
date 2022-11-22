function createMap() {
  const map = L.map('map').setView([48.1119177, -1.7145364, 13], 11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  return map;
}

function addMarkerOnMap(latitude, longitude, map) {
  L.marker([latitude, longitude]).addTo(map);
}

function addRadarsOnMap(map) {
  Papa.parse('./data/radars.csv', {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function (results) {
      radars = results.data;
      radars.forEach((radar) => {
        if (radar.latitude && radar.longitude)
          addMarkerOnMap(radar.latitude, radar.longitude, map);
      });
    },
  });
}

const map = createMap();
addRadarsOnMap(map);
