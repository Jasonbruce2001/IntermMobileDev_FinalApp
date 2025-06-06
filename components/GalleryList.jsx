import { View, FlatList } from 'react-native';
import GalleryListItem from './GalleryListItem';

const GalleryList = ({ galleryItems, onDelete, onEdit }) => {
  return (
      <FlatList
        data={galleryItems}
        style={{marginBottom: 70}}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <GalleryListItem item={item} onDelete={onDelete} onEdit={onEdit} />
        )}
      />
  );
};

export default GalleryList;
