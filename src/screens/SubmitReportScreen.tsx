import { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

type Coordinate = {
  latitude: number;
  longitude: number;
};

export default function SubmitReportScreen() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<Coordinate | null>(null);

  const handleMapPress = (event: MapPressEvent) => {
    setLocation(event.nativeEvent.coordinate);
  };

  const handleSubmit = () => {
    if (
      !title.trim() ||
      !category.trim() ||
      !description.trim() ||
      !location
    ) {
      Alert.alert(
        'Missing information',
        'Enter all report information and select a location on the map.'
      );
      return;
    }

    Alert.alert(
      'Report ready',
      'The form and map are working. Firebase storage will be connected next.'
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Issue title</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Example: Pothole on Main Street"
      />

      <Text style={styles.label}>Category</Text>

      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Road, streetlight, trash, drainage..."
      />

      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the issue"
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Issue location</Text>

      <Text style={styles.instructions}>
        Press the map to place the report marker.
      </Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.0609,
          longitude: -95.7975,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={handleMapPress}
      >
        {location && <Marker coordinate={location} />}
      </MapView>

      {location && (
        <View style={styles.coordinateBox}>
          <Text>Latitude: {location.latitude.toFixed(5)}</Text>
          <Text>Longitude: {location.longitude.toFixed(5)}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Submit Report"
          color="#245c45"
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f5',
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#183c2d',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#b9c5bf',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 16,
    marginBottom: 18,
  },
  descriptionInput: {
    minHeight: 100,
  },
  instructions: {
    color: '#56625c',
    marginBottom: 10,
  },
  map: {
    height: 270,
    borderRadius: 10,
  },
  coordinateBox: {
    backgroundColor: '#e3ece7',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonContainer: {
    marginTop: 22,
  },
});