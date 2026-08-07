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

import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import { createReport } from '../services/firebaseApi';
import { sendReportNotification } from '../services/notifications';
import { COLORS } from '../theme';

type Coordinate = {
  latitude: number;
  longitude: number;
};

export default function SubmitReportScreen() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMapPress = (event: MapPressEvent) => {
    setLocation(event.nativeEvent.coordinate);
  };

  const handleSubmit = async () => {
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

    try {
      setIsSubmitting(true);

      await createReport({
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
      });

      await sendReportNotification();

      setTitle('');
      setCategory('');
      setDescription('');
      setLocation(null);
    } catch (error) {
      console.error('Report submission error:', error);

      Alert.alert(
        'Submission failed',
        'The report could not be saved. Check the Firebase database rules and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
        placeholderTextColor={COLORS.muted}
        keyboardAppearance="dark"
      />

      <Text style={styles.label}>Category</Text>

      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Road, streetlight, trash, drainage..."
        placeholderTextColor={COLORS.muted}
        keyboardAppearance="dark"
      />

      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the issue"
        placeholderTextColor={COLORS.muted}
        keyboardAppearance="dark"
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Issue location</Text>

      <Text style={styles.instructions}>
        Press the map to place the report marker.
      </Text>

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
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
      </View>

      {location && (
        <View style={styles.coordinateBox}>
          <Text style={styles.coordinateText}>
            Latitude: {location.latitude.toFixed(5)}
          </Text>

          <Text style={styles.coordinateText}>
            Longitude: {location.longitude.toFixed(5)}
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title={isSubmitting ? 'Submitting...' : 'Submit Report'}
          color={COLORS.accent}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.text,
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
    color: COLORS.muted,
    marginBottom: 10,
  },
  mapContainer: {
    height: 270,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  map: {
    flex: 1,
  },
  coordinateBox: {
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  coordinateText: {
    color: COLORS.text,
    marginBottom: 3,
  },
  buttonContainer: {
    marginTop: 22,
  },
});