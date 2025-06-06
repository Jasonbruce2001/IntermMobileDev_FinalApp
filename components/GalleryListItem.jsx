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
  const date = item.dateAdded;

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
          <Image source={{ uri: item.link }} style={styles.image} />
          <View style={styles.galleryText}>
            <Text>Title: {item.title}</Text>
            <Text>Date Uploaded: {date.substring(0,10)}</Text>
          </View>
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
    height: 200,
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
    height: 10,

  },
  actions: {
    flexDirection: 'row',
  },
  edit: {
    fontSize: 18,
    marginRight: 10,
    height: 10,
    color: 'blue',
  },
    galleryItem: {
    flexDirection: 'column',
    height: 150,
  },
  galleryText: {
    padding: 10,
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "black",
    flex: 1,
  },
});

export default GalleryListItem;
