import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';
export default function ReportsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>Community Reports</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Example pothole</Text>
        <Text style={styles.detail}>Category: Road</Text>
        <Text style={styles.detail}>Status: Submitted</Text>
        <Text style={styles.description}>
          Large pothole near the intersection.
        </Text>
      </View>

      <Text style={styles.note}>
        Reports saved in Firebase will appear on this screen.
      </Text>
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
  note: {
    marginTop: 20,
    color: COLORS.muted,
    textAlign: 'center',
  },
});