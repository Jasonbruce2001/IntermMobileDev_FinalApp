import { View, FlatList } from 'react-native';
import MaterialListItem from './MaterialListItem';

const MaterialList = ({ notes, onDelete, onEdit }) => {
  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <MaterialListItem note={item} onDelete={onDelete} onEdit={onEdit} />
        )}
      />
    </View>
  );
};

export default MaterialList;
