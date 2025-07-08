import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StatusBar, Text, View } from "react-native";
import styles from "./styles";
import MapView, { Marker, Polygon } from "react-native-maps";

StatusBar.setBarStyle("dark-content");

type Overlay = {
  coordinates: { latitude: number; longitude: number }[];
  strokeColor: string;
  strokeWidth: number;
};

const ipaRegion: Overlay = {
  coordinates: [
    { latitude: 43.8486744, longitude: -79.0695283 },
    { latitude: 43.8537168, longitude: -79.0700046 },
    { latitude: 43.8518394, longitude: -79.0725697 },
    { latitude: 43.8481651, longitude: -79.0716377 },
    { latitude: 43.8486744, longitude: -79.0695283 },
  ],
  strokeColor: "coral",
  strokeWidth: 4,
};

const stoutRegion: Overlay = {
  coordinates: [
    { latitude: 43.8486744, longitude: -79.0695283 },
    { latitude: 43.8537168, longitude: -79.0700046 },
    { latitude: 43.8518394, longitude: -79.0725697 },
    { latitude: 43.8481651, longitude: -79.0716377 },
    { latitude: 43.8486744, longitude: -79.0695283 },
  ],
  strokeColor: "firebrick",
  strokeWidth: 4,
};

export default function PlottingOverlays() {
  const [ipaStyles, setIpaStyles] = useState<any>([
    styles.ipaText,
    styles.boldText,
  ]);
  const [stoutStyles, setStoutStyles] = useState<any>([styles.stoutText]);
  const [overlays, setOverlays] = useState<Overlay[]>([ipaRegion]);

  function onClickIpa() {
    setIpaStyles([...ipaStyles, styles.boldText]);
    setStoutStyles([stoutStyles[0]]);
    setOverlays([ipaRegion]);
  }

  function onClickStout() {
    setIpaStyles([...stoutStyles, styles.boldText]);
    setStoutStyles([ipaStyles[0]]);
    setOverlays([stoutRegion]);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={ipaStyles} onPress={onClickIpa}>
          IPA Fans
        </Text>
        <Text style={stoutStyles} onPress={onClickStout}>
          Stout Fans
        </Text>
      </View>

      <MapView
        style={styles.mapView}
        showsPointsOfInterest={false}
        initialRegion={{
          latitude: 43.8486744,
          longitude: -79.0695283,
          latitudeDelta: 0.002,
          longitudeDelta: 0.04,
        }}
      >
        {overlays.map((v, i) => (
          <Polygon
            key={i}
            coordinates={v.coordinates}
            strokeColor={v.strokeColor}
            strokeWidth={v.strokeWidth}
          />
        ))}
      </MapView>
    </View>
  );
}

// export default () => {
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.mapView} showsUserLocation followsUserLocation>
//         <Marker
//           title="Cloud Campus"
//           description="Cloud Cmpus : l'école des spécialistes du développement web."
//           coordinate={{
//             latitude: 48.8585802,
//             longitude: 2.3730884,
//           }}
//         />
//       </MapView>
//     </View>
//   );
// };

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
