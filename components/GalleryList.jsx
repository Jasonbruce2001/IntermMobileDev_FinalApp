import { View, FlatList } from 'react-native';
import GalleryListItem from './GalleryListItem';

const GalleryList = ({ galleryItems, onDelete, onEdit }) => {
  return (
    <View>
      <FlatList
        data={galleryItems}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <GalleryListItem item={item} onDelete={onDelete} onEdit={onEdit} />
        )}
      />
    </View>
  );
};

export default GalleryList;
