import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';

import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as LocationProvider} from './src/context/LocationContext';
import {Provider as TrackProvider} from './src/context/TrackContext';

import {setNavigator} from './src/navigationRef';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const loginFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const trackListFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{title: 'Tracks', headerLeft: null}}
      />
      <Stack.Screen
        name="TrackDetail"
        component={TrackDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const mainFlow = () => {
  return (
    <Tab.Navigator>
      <Stack.Screen
        name="trackListFlow"
        component={trackListFlow}
        options={{
          title: 'Tracks',
          tabBarIcon: () => <FontAwesome name="th-list" size={20} />,
        }}
      />
      <Stack.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{
          title: 'Add Track',
          tabBarIcon: () => <FontAwesome name="plus" size={20} />,
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: () => <FontAwesome name="gear" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer
      ref={(navigator) => {
        setNavigator(navigator);
      }}>
      <Stack.Navigator>
        <Stack.Screen
          name="ResolveAuth"
          component={ResolveAuthScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="loginFlow"
          component={loginFlow}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="mainFlow"
          component={mainFlow}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
