import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getReports, Report } from '../services/firebaseApi';
import { COLORS } from '../theme';

export default function ReportsScreen() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadReports = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const savedReports = await getReports();
      setReports(savedReports);
    } catch (error) {
      console.error('Firebase loading error:', error);
      setErrorMessage('The reports could not be loaded.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, [loadReports])
  );

  const formatDate = (createdAt: string) => {
    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
      return 'Unknown date';
    }

    return date.toLocaleString();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>Community Reports</Text>

      {isLoading && (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" color={COLORS.accent} />
          <Text style={styles.messageText}>Loading reports...</Text>
        </View>
      )}

      {!isLoading && errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      {!isLoading && !errorMessage && reports.length === 0 && (
        <Text style={styles.messageText}>
          No community reports have been submitted.
        </Text>
      )}

      {!isLoading &&
        !errorMessage &&
        reports.map((report) => (
          <View key={report.id} style={styles.card}>
            <Text style={styles.title}>{report.title}</Text>

            <Text style={styles.detail}>
              Category: {report.category}
            </Text>

            <Text style={styles.detail}>
              Status: {report.status}
            </Text>

            <Text style={styles.detail}>
              Submitted: {formatDate(report.createdAt)}
            </Text>

            <Text style={styles.description}>
              {report.description}
            </Text>
          </View>
        ))}
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 18,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  detail: {
    fontSize: 15,
    marginBottom: 4,
    color: COLORS.muted,
  },
  description: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
    color: COLORS.text,
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  messageText: {
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 12,
  },
  errorText: {
    color: '#ff8a65',
    textAlign: 'center',
    marginTop: 30,
  },
});