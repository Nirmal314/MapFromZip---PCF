import * as React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

type GeoLocation = {
  latitude: number;
  longitude: number;
};

type ZipCodeProps = {
  zipCode: number;
};

async function getGeolocation(zipCode: number) {
  const response = await fetch(`https://api.zippopotam.us/in/${zipCode}`);
  if (!response.ok) {
    return { latitude: 23.181, longitude: 80.2514 };
  }
  const data = await response.json();
  const { latitude, longitude } = data.places[0];

  return { latitude, longitude };
}

const Map: React.FC<ZipCodeProps> = (props: ZipCodeProps) => {
  const [latitude, setLatitude] = React.useState(23.181);
  const [longitude, setLongitude] = React.useState(80.2514);

  React.useEffect(() => {
    async function geoHelper() {
      const { latitude, longitude } = await getGeolocation(props.zipCode);
      setLatitude(latitude);
      setLongitude(longitude);
    }
    geoHelper();
    console.log("map updated");
  }, [props.zipCode]);

  const icon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/484/484167.png",
    iconSize: [38, 38],
  });

  return (
    <MapContainer
      style={{ height: "80vh", width: "80vw" }}
      center={[23.181, 80.2514]}
      zoom={5}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[23.0276649, 72.5870439]}> */}
      <Marker position={[latitude, longitude]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default Map;
