import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { RootStackParamList } from '../navigationTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Community Issue Reporter</Text>

      <Text style={styles.description}>
        Report potholes, damaged signs, broken streetlights, trash,
        drainage problems, and other community issues.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Submit a Report"
          color="#245c45"
          onPress={() => navigation.navigate('SubmitReport')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Issue Map"
          color="#245c45"
          onPress={() => navigation.navigate('ReportMap')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Reports"
          color="#245c45"
          onPress={() => navigation.navigate('Reports')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f5',
    padding: 24,
    justifyContent: 'center',
  },
  image: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#183c2d',
    textAlign: 'center',
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
    color: '#46534d',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    marginBottom: 14,
  },
});