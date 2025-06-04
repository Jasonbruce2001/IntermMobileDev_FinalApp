import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import MaterialList from '@/components/MaterialList';
import AddMaterialModal from '@/components/AddMaterialModal';
import noteService from '@/services/noteService';

const MaterialsScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUnits, setNewUnits] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth');
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes(user.$id);

    if (response.error) {
      setError(response.error);
      Alert.alert('Error', response.error);
    } else {
      setNotes(response.data);
      setError(null);
    }

    setLoading(false);
  };

  // Add New Note
  const addNote = async () => {
    if (newName.trim() === '') return;

    const response = await noteService.addNote(user.$id, newName, newQuantity, newUnits);

    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setNotes([...notes, response.data]);
    }

    //clear inputs
    setNewName('');
    setNewUnits('');
    setNewQuantity('');
    setModalVisible(false);
  };

  // Delete Note
  const deleteNote = async (id) => {
    if (Platform.OS === 'web') {
      
    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    const response = await noteService.deleteNote(id);
    if (response.error) {
      window.alert(`Error: ${response.error}`);
    } else {
      setNotes(notes.filter((note) => note.$id !== id));
    }
    } else {
      Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const response = await noteService.deleteNote(id);
            if (response.error) {
              Alert.alert('Error', response.error);
            } else {
              setNotes(notes.filter((note) => note.$id !== id));
            }
          },
        },
      ]);
    }
  };

  // Edit Note
  const editNote = async (id, newName, newQuantity, newUnits) => {
    if (!newName.trim() || !String(newQuantity).trim() || !String(newUnits.trim())) {
      console.log("Empty Field Encountered");

      if(Platform.OS === "web"){
        Window.alert('Please fill out all fields.');
      } else {
        Alert.alert('Error', 'Please fill out all fields.');
      }
    
      return;
    }

    const response = await noteService.updateNote(id, newName, newQuantity, newUnits);
    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setNotes((prevItems) =>
        prevItems.map((item) =>
          item.$id === id ? { ...item, text: response.data.text } : item
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color='#007bff' />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}

          {notes.length === 0 ? (
            <Text style={styles.noNotesText}>You have no materials listed</Text>
          ) : (
            <MaterialList notes={notes} onDelete={deleteNote} onEdit={editNote} />
          )}
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Material</Text>
      </TouchableOpacity>

      {/* Modal */}
      <AddMaterialModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newName={newName}
        setNewName={setNewName}
        newQuantity={newQuantity}
        setNewQuantity={setNewQuantity}
        newUnits={newUnits}
        setNewUnits={setNewUnits}
        addNote={addNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15,
  },
});

export default MaterialsScreen;
