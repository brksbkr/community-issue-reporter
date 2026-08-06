import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { RootStackParamList } from '../navigationTypes';
import { COLORS } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={require('../../assets/community-icon.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Community Issue Reporter</Text>

        <Text style={styles.description}>
          Report potholes, damaged signs, broken streetlights, trash,
          drainage problems, and other community issues.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Submit a Report"
          color={COLORS.accent}
          onPress={() => navigation.navigate('SubmitReport')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Issue Map"
          color={COLORS.accent}
          onPress={() => navigation.navigate('ReportMap')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Reports"
          color={COLORS.accent}
          onPress={() => navigation.navigate('Reports')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 22,
    justifyContent: 'center',
  },
  hero: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 24,
    marginBottom: 26,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.muted,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 14,
  },
});