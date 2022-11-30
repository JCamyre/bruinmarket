import React, {useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../App.css';

// function componentDidMount() {
// navigator.geolocation.getCurrentPosition(function(position) {
//     console.log("Latitude is :", position.coords.latitude);
//     console.log("Longitude is :", position.coords.longitude);
//     //return [position.coords.latitude, position.coords.longitude];
//   });
// }
function App() {
    //position = [45.4, -75.7]
    //navigator.geolocation.getCurrentPosition(function(position) {return [position.coords.latitude, position.coords.longitude];});
    //var position = navigator.geolocation.getCurrentPosition(function(position) {return [position.coords.latitude, position.coords.longitude];});
    //console.log(position);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            //return [position.coords.latitude, position.coords.longitude];
        })
    })
  return (
      <div>
        <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin=""
        />
        <MapContainer center={[latitude, longitude]} zoom={12}scrollWheelZoom={false}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        </MapContainer>
      </div>
  );
}

export default App;