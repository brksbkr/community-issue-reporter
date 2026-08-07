import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import { getReports, Report } from '../services/firebaseApi';
import { COLORS } from '../theme';

export default function ReportMapScreen() {
  const mapRef = useRef<MapView>(null);

  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadReports = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const savedReports = await getReports();
      setReports(savedReports);

if (savedReports.length === 1) {
  const report = savedReports[0];

  setTimeout(() => {
    mapRef.current?.animateToRegion(
      {
        latitude: report.latitude,
        longitude: report.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
      500
    );
  }, 500);
} else if (savedReports.length > 1) {
  setTimeout(() => {
    mapRef.current?.fitToCoordinates(
      savedReports.map((report) => ({
        latitude: report.latitude,
        longitude: report.longitude,
      })),
      {
        edgePadding: {
          top: 80,
          right: 80,
          bottom: 80,
          left: 80,
        },
        animated: true,
      }
    );
  }, 500);
}
    } catch (error) {
      console.error('Firebase map loading error:', error);
      setErrorMessage('The report locations could not be loaded.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, [loadReports])
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 36.0609,
          longitude: -95.7975,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            title={report.title}
            description={`${report.category} • ${report.status}`}
          />
        ))}
      </MapView>

      {isLoading && (
        <View style={styles.messageBox}>
          <ActivityIndicator color={COLORS.accent} />
          <Text style={styles.messageText}>Loading report locations...</Text>
        </View>
      )}

      {!isLoading && errorMessage !== '' && (
        <View style={styles.messageBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      {!isLoading && !errorMessage && reports.length === 0 && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            No report locations have been submitted.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  map: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  messageBox: {
    position: 'absolute',
    top: 18,
    left: 18,
    right: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  messageText: {
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 8,
  },
  errorText: {
    color: '#ff8a65',
    textAlign: 'center',
  },
});