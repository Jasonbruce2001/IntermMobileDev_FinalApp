import { StyleSheet, View, Text, Image} from "react-native";

const dashboard = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <View>
            <Text style={styles.subtitle}>Statistics:</Text>
            <Text>Tracked items: </Text>
        </View>
    </View>
);

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
});

export default dashboard;