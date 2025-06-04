import databaseService from './databaseService';
import { ID, Query } from 'react-native-appwrite';

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  // Get Notes
  async getNotes(userId) {
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
      console.log('Error fetching notes:', error.message);
      return { data: [], error: error.message };
    }
  },
  // Add New Note
  async addNote(user_id, name, quantity, units) {
    if (!name) {
      return { error: 'Note text cannot be empty' };
    }
    if (!quantity) {
      return { error: 'Quantity text cannot be empty' };
    }
    if (!units) {
      return { error: 'Units text cannot be empty' };
    }

    const data = {
      name: name,
      quantity: parseInt(quantity),
      units: units,
      createdAt: new Date().toISOString(),
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
  // Update Note
  async updateNote(id, name, quantity, units) {
    console.log(quantity);
    var quantity = parseInt(quantity);

    const response = await databaseService.updateDocument(dbId, colId, id, {
      name, quantity, units
    });

    console.log(response);

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  // Delete Note
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  },
};

export default noteService;
