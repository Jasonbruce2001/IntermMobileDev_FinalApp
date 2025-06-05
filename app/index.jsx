import { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import homeImage from '@/assets/images/HomeImage.jpg';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const HomeScreen = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size='large' color='#007bff' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={homeImage} style={styles.image} />
      <Text style={styles.title}>Artist Central</Text>
      <Text style={styles.subtitle}>
        Explore useful tools to empower your works
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/materials')}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default HomeScreen;
