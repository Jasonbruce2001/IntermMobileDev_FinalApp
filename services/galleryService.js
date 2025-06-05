import databaseService from './databaseService';
import { ID, Query } from 'react-native-appwrite';

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_GALLERY_ID;

const galleryService = {
  // Get Gallery Items
  async getGalleryItems(userId) {
    if (!userId) {
      console.error('Error: Missing userId in getNotes()');
      return {
        data: [],
        error: 'User ID is missing',
      };
    }

    try {
      const response = await databaseService.listDocuments(dbId, colId, [
        Query.equal('user_id', userId),
      ]);
      return response;
    } catch (error) {
      console.log('Error fetching gallery items:', error.message);
      return { data: [], error: error.message };
    }
  },
  // Add New Gallery Item
  async addGalleryItem(user_id, title, link) {
    if (!title) {
      return { error: 'Title cannot be empty' };
    }
    if (!link) {
      return { error: 'Link cannot be empty' };
    }

    const data = {
      title: title,
      link: link,
      dateAdded: new Date().toISOString(),
      user_id: user_id,
    };

    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique()
    );

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  
  // Update Gallery Item
  async updateGalleryItem(id, title, link) {
    const response = await databaseService.updateDocument(dbId, colId, id, {
      title, link
    });

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },

  // Delete Gallery Item
  async deleteGalleryItem(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  },
};

export default galleryService;
