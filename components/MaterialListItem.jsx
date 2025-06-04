import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const MaterialListItem = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(note.name); //text is name, need to refactor
  const [editedQuantity, setEditedQuantity] = useState(note.quantity);
  const [editedUnits, setEditedUnits] = useState(note.units);

  const inputRef = useRef(null);

  const handleSave = () => {
    if (editedName.trim() === '') return;

    console.log("handling save");

    onEdit(note.$id, editedName, editedQuantity, editedUnits);
    
    setIsEditing(false);
  };

  return (
    <View style={styles.MaterialListItem}>
      {isEditing ? (
        <View>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            autoFocus
            onSubmitEditing={handleSave}
            returnKeyType='done'
          />
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={editedUnits}
            onChangeText={setEditedUnits}
            autoFocus
            onSubmitEditing={handleSave}
            returnKeyType='done'
          />
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={editedQuantity}
            onChangeText={setEditedQuantity}
            autoFocus
            onSubmitEditing={handleSave}
            returnKeyType='done'
          />
        </View>
      ) : (
        <View>
          <Text style={styles.noteName}>{note.name}</Text>
          <Text style={styles.noteText}>{note.units} x {note.quantity}</Text>
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

        <TouchableOpacity onPress={() => onDelete(note.$id)}>
          <Text style={styles.delete}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MaterialListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  noteText: {
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
});

export default MaterialListItem;
