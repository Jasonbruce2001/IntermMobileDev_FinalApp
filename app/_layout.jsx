import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const HeaderLogout = () => {
  const { user, logout } = useAuth();

  return user ? (
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null;
};

const RootLayout = () => {
  return (
    <AuthProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2d70ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            header: () => (
              <View style={styles.customHeader}>
                <Text style={styles.headerTitle}>Artist Central</Text>
                <HeaderLogout />
              </View>
            ),
            contentStyle: {
              paddingHorizontal: 10,
              paddingTop: 10,
              backgroundColor: '#fff',
            },
          }}
        >
          <Stack.Screen name='index' options={{ title: 'Home' }} />
          <Stack.Screen name='materials' options={{ headerTitle: 'Materials' }} />
          <Stack.Screen name='auth' options={{ headerTitle: 'Login' }} />
          <Stack.Screen name='dashboard' options={{ headerTitle: 'Dashboard' }} />
          <Stack.Screen name='gallery' options={{ headerTitle: 'gallery' }} />
        </Stack>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2d70ff',
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ff532d',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RootLayout;
