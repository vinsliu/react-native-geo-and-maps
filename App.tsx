import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StatusBar, Text, View } from "react-native";
import styles from "./styles";
import MapView, { Marker } from "react-native-maps";

StatusBar.setBarStyle("dark-content");

export default () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.mapView} showsUserLocation followsUserLocation>
        <Marker
          title="Cloud Campus"
          description="Cloud Cmpus : l'école des spécialistes du développement web."
          coordinate={{
            latitude: 48.8585802,
            longitude: 2.3730884,
          }}
        />
      </MapView>
    </View>
  );
};

// const API_KEY = "";
// const URL = `https://maps.google.com/maps/api/geocode/json?key=${API_KEY}&latlng=`;

// export default function WhereAmI() {
//   const [address, setAddress] = useState("loading...");
//   const [longitude, setLongitude] = useState<number | undefined>();
//   const [latitude, setLatitude] = useState<number | undefined>();

//   useEffect(() => {
//     function setPosition({
//       coords: { latitude, longitude },
//     }: Location.LocationObject) {
//       setLongitude(longitude);
//       setLatitude(latitude);

//       fetch(`${URL}${latitude},${longitude}`)
//         .then((resp) => resp.json())
//         .then(({ results }) => {
//           if (results.length > 0) {
//             setAddress(results[0].formatted_addres);
//           }
//         })
//         .catch((error) => {
//           console.log(error.message);
//         });
//     }

//     let watcher: Location.LocationSubscription;

//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status != "granted") {
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setPosition(location);

//       watcher = await Location.watchPositionAsync(
//         { accuracy: Location.LocationAccuracy.Highest },
//         setPosition
//       );
//     })();

//     return () => {
//       watcher?.remove();
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Address : {address} </Text>
//       <Text style={styles.label}>Latitude : {latitude} </Text>
//       <Text style={styles.label}>Longitude : {longitude} </Text>
//     </View>
//   );
// }
