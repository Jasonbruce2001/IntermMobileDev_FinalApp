import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert,
  ActivityIndicator,   Platform,} from "react-native";
import AddGalleryModal from "../../components/AddGalleryModal"
import galleryService from "../../services/galleryService"
import { useAuth } from '@/contexts/AuthContext';
import GalleryList from "../../components/GalleryList";
import FileUpload from "../../components/FileUpload";

export default gallery = () => {
  const { user, loading: authLoading } = useAuth();  
  const [galleryItems, setGalleryItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newLink, setNewLink] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchGalleryItems();
    }
  }, [user]);

  const fetchGalleryItems = async () => {
      setLoading(true);
      const response = await galleryService.getGalleryItems(user.$id);
  
      if (response.error) {
        setError(response.error);
        Alert.alert('Error', response.error);
      } else {
        console.log(response.data);
        setGalleryItems(response.data);
        setError(null);
      }
  
      setLoading(false);
    };

  // Add New Gallery item
  const addGalleryItem = async () => {
    //if (newTitle.trim() === '') return;
    console.log("Adding");

    const response = await galleryService.addGalleryItem(user.$id, newTitle, newLink);

    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setGalleryItems([...galleryItems, response.data]);
    }

    //clear inputs
    setNewLink('');
    setNewTitle('');
    setModalVisible(false);
  };

  
  // Delete Gallery Item
  const deleteGalleryItem = async (id) => {
    if (Platform.OS === 'web') {
      
    const confirmed = window.confirm('Are you sure you want to delete this gallery item?');
    if (!confirmed) return;

    const response = await galleryService.deleteGalleryItem(id);
    if (response.error) {
      window.alert(`Error: ${response.error}`);
    } else {
      setGalleryItems(galleryItems.filter((item) => item.$id !== id));
    }
    } else {
      Alert.alert('Delete Gallery Item', 'Are you sure you want to delete this gallery item?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const response = await galleryService.deleteGalleryItem(id);
            if (response.error) {
              Alert.alert('Error', response.error);
            } else {
              setGalleryItems(galleryItems.filter((item) => item.$id !== id));
            }
          },
        },
      ]);
    }
  };

  // Edit Gallery Item
  const editGalleryItem = async (id, newTitle, newLink) => {
    if (!newTitle.trim() || !newLink.trim()) {

      if(Platform.OS === "web"){
        Window.alert('Please fill out all fields.');
      } else {
        Alert.alert('Error', 'Please fill out all fields.');
      }
    
      return;
    }

    const response = await galleryService.updateGalleryItem(id, newTitle, newLink);
    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setGalleryItems((prevItems) =>
        prevItems.map((item) =>
          item.$id === id ? { ...item, title: response.data.title, link: response.data.link } : item
        )
      );
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Personal Gallery</Text>

        {loading ? (
                <ActivityIndicator size='large' color='#007bff' />
              ) : (
                <>
                  {error && <Text style={styles.errorText}>{error}</Text>}
        
                  {galleryItems.length === 0 ? (
                    <Text style={styles.noNotesText}>You have no gallery items added</Text>
                  ) : (
                    <GalleryList galleryItems={galleryItems} onDelete={deleteGalleryItem} onEdit={editGalleryItem} />
                  )}
                </>
              )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
         <Text style={styles.addButtonText}>Upload Image</Text>
        </TouchableOpacity>

        

        <AddGalleryModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          newLink={newLink}
          setNewLink={setNewLink}
          setNewTitle={setNewTitle}
          newTitle={newTitle}
          addGallery={addGalleryItem}
        />
    </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

