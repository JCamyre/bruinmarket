import React, {useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Icon } from 'leaflet'
import {Container, VStack, Input} from "@chakra-ui/react"
import '../Map.css';
import marker from '../marker.png';

const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [22,32]
   })

function ChangePosition({latitude, longitude}) {
    const map = useMap();
    map.flyTo([latitude, longitude]);
    return null;
}

function BMap() {
    var ziptolonglat = {
        "90024": [34.065723, -118.434969],
        "90025": [34.045421, -118.445873],
        "90049": [34.092540, -118.491064],
        "90095": [34.071200, -118.443523]
    };
    const [latitude, setLatitude] = useState(34.0725);
    const [longitude, setLongitude] = useState(-118.4522);
    const [zipcode, setZipcode] = useState("");
    useEffect(() => {
        console.log(zipcode);
        if (zipcode in ziptolonglat) {
            console.log("Hello");
            setLatitude(ziptolonglat[zipcode][0]);
            setLongitude(ziptolonglat[zipcode][1]);
        }
        console.log(latitude);
        console.log(longitude);
    })
  return (
      <div>
        <Container maxW="container.md" pt="40">
        <Input
              placeholder="Postal Code"
              onChange={(e) => {setZipcode(e.currentTarget.value)}}
            />
        <VStack>
        <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin=""
        />
        <MapContainer center={[34.0725, -118.4522]} zoom={16}scrollWheelZoom={false}>
        {<ChangePosition latitude={latitude} longitude={longitude} />}
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude] } icon={myIcon}/>
        </MapContainer>
        </VStack>
        </Container>
      </div>
  );
}

export default BMap;