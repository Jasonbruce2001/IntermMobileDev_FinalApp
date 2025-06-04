import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={
      { tabBarActiveTintColor: 'blue', tabBarStyle: {height: 60}}
      }>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="materials"
        options={{
          title: 'Materials',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="photo" color={color} />,
        }}
      />
    </Tabs>
  );
}
