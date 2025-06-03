import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
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
  const [newNote, setNewNote] = useState('');
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
    if (newNote.trim() === '') return;

    const response = await noteService.addNote(user.$id, newNote);

    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setNotes([...notes, response.data]);
    }

    setNewNote('');
    setModalVisible(false);
  };

  // Delete Note
  const deleteNote = async (id) => {
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
  };

  // Edit Note
  const editNote = async (id, newText) => {
    if (!newText.trim()) {
      Alert.alert('Error', 'Note text cannot be empty');
      return;
    }

    const response = await noteService.updateNote(id, newText);
    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === id ? { ...note, text: response.data.text } : note
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
        newNote={newNote}
        setNewNote={setNewNote}
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
