import * as React from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';

//Screen names
const homeName = "Home";
const mapName = "Map";
const scheduleName = "Schedule";
const profileName = "Profile"

const Tab = createBottomTabNavigator();

function NavContainer({ route }) {
  const email = route.params.email;
  console.log(email);
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={
            ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                    } 
                    else if (rn === mapName) {
                        iconName = focused ? 'map' : 'map-outline';
                    } 
                    else if (rn === scheduleName) {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    }
                    else if (rn === profileName) {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: {
                    paddingBottom: 0,
                    marginBottom: 30,
                    paddingTop: 0,
                    marginTop: 0,
                    fontSize: 12,
                    display: 'flex',
                },
                tabBarStyle: [
                    {
                      display: "flex",
                      height: 90,
                      paddingBottom: 0,
                      marginBottom: 0,
                      paddingTop: 10,
                      marginTop: 0,
                    },
                    null
                ],
            })
        }
      >
        <Tab.Screen name={homeName} component={HomeScreen} initialParams={{ email: email}} />
        <Tab.Screen name={mapName} component={MapScreen} />
        <Tab.Screen name={scheduleName} component={ScheduleScreen} initialParams={{ email: email}} />
        <Tab.Screen name={profileName} component={ProfileScreen} initialParams={{ email: email}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;