import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function ReportMapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.0609,
          longitude: -95.7975,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: 36.0609,
            longitude: -95.7975,
          }}
          title="Example pothole"
          description="Road issue currently marked as Submitted"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});