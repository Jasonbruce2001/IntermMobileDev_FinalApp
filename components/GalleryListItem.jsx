import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';

const GalleryListItem = ({ item, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title); //text is name, need to refactor
  const [editedLink, setEditedLink] = useState(item.link);

  const inputRef = useRef(null);

  const handleSave = () => {
    if (editedTitle.trim() === '') return;

    console.log("handling save");

    onEdit(item.$id, editedTitle, editedLink);
    
    setIsEditing(false);
  };

  return (
    <View style={styles.GalleryListItem}>
      {isEditing ? (
        <View>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            autoFocus
            onSubmitEditing={handleSave}
            returnKeyType='done'
          />
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={editedLink}
            onChangeText={setEditedLink}
            autoFocus
            onSubmitEditing={handleSave}
            returnKeyType='done'
          />
        </View>
      ) : (
        <View style={styles.galleryItem}>
          <View style={styles.galleryText}>
            <Text>Title: {item.title}</Text>
            <Text>Date Uploaded: {item.dateAdded}</Text>
          </View>
          <Image source={{ uri: item.link }} style={styles.image} />
        </View>
      )}
      <View style={styles.actions}>
        {isEditing ? (
          <TouchableOpacity
            onPress={() => {
              handleSave();
              inputRef.current?.blur();
            }}
          >
            <Text style={styles.edit}>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.edit}>✏️</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => onDelete(item.$id)}>
          <Text style={styles.delete}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  GalleryListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  itemText: {
    fontSize: 18,
  },
  delete: {
    fontSize: 18,
    color: 'red',
  },
  actions: {
    flexDirection: 'row',
  },
  edit: {
    fontSize: 18,
    marginRight: 10,
    color: 'blue',
  },
    galleryItem: {
    flexDirection: 'row',
    height: 150,
  },
  galleryText: {
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "black",
  },
});

export default GalleryListItem;
