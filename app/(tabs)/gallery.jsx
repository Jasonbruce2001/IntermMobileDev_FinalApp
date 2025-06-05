import { StyleSheet, View, Text, Image} from "react-native";

const galleryScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Personal Gallery</Text>
        <View>
          <Image 
          style={styles.image}
          source={{
            uri:"https://place-hold.it/100",
          }}/>
        </View>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
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

export default galleryScreen;