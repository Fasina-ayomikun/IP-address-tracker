const url = `https://geo.ipify.org/api/v2/country?apiKey=at_S5vFmrUOf0jMQcBPCKGDx8Phwe2Ld&ipAddress=`;

const input = document.querySelector('.input')
const arrow = document.querySelector('.arrow')
const container = document.querySelector('.info-container');

let IP ='8.8.8.8';
const init = async()=>{
    
    const response = await fetch(`${url}${IP}`);
    const data = await response.json()
    // const contents = data.map((content)=>{
    //     const {location, domains,ip,isp} = content;
    //     const {country, region,timezone} = location;
    //     console.log(location, domains,ip,isp);
    // })
    const {location, domains,ip,isp} = data;
    const {country, region,timezone} = location;
    container.innerHTML = ` <div class="content">
    <p class="type">ip address</p>
    <h2 class="info">${ip}</h2>
  </div>
  <div class="content">
    <p class="type">location</p>
    <h2 class="info">${region},${country}</h2>
  </div>
  <div class="content">
    <p class="type">timezone</p>
    <h2 class="info">${timezone}</h2>
  </div>
  <div class="content">
    <p class="type">isp</p>
    <h2 class="info">${isp}</h2>
  </div>
</div>`;
    
}
window.addEventListener('DOMContentLoaded',function(){
    init()
});

arrow.addEventListener('click',function(){
    IP = input.textContent;
    init()
    
})

class Map {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.map =  L.map('map', {
            center: [this.lat,this.lng],
            zoom: 15,
            zoomControl: false
        });
        this.myIcon = L.icon({
            iconUrl: './images/icon-location.svg',
            iconSize:  [38, 48],
            iconAnchor: [22, -50]
        });
    }

    setMapLocation(lat, lng){
        this.lat = lat;
        this.lng = lng
        this.map.setView([this.lat, this.lng]);
        L.marker([this.lat, this.lng], {icon: this.myIcon}).addTo(this.map);
    };

    makeMap() {
        
        L.marker([this.lat, this.lng], {icon: this.myIcon}).addTo(this.map);
        
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoicGhzZXMiLCJhIjoiY2wzMWVoYXJwMXNpYjNjcWM0Mmc4Mms5aiJ9.FHHDvKrOokMqLwDMj9keXg'
        }).addTo(this.map);
    }
}

const map = new Map(51.505, -0.09);
map.makeMap()