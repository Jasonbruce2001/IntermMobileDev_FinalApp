import Entypo from '@expo/vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialsScreen from '@/app/materials/index';
import GalleryScreen from '@/app/gallery/index';
import DashboardScreen from '.';

const Tab = createBottomTabNavigator();

const DashboardLayout = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{
        tabBarIcon: () => {
          <Entypo name="home" size={24} color="black" />
        },
      }}/>
      <Tab.Screen name="Materials" component={MaterialsScreen} options={{
        tabBarIcon: () => {
          <Entypo name="list" size={24} color="black" />
        },
      }}/>
      <Tab.Screen name="Gallery" component={GalleryScreen} options={{
        tabBarIcon: () => {
          <Entypo name="list" size={24} color="black" />
        },
      }}/>
    </Tab.Navigator>
  );
};

export default DashboardLayout;
