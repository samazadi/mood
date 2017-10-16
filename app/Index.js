import { StackNavigator, TabNavigator } from 'react-navigation'
import React from 'react'
import firebase from 'firebase'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Mood from './screens/Mood'
import Settings from './screens/Settings'
import { FontAwesome } from '@expo/vector-icons';

const firebaseConfig = {
  apiKey: "AIzaSyAs8kiZwakuQACvAIBRrLktGprs5pNDoQo",
  databaseURL: "https://mood-d5b8c.firebaseio.com",
}

firebase.initializeApp(firebaseConfig);

const homeTab = TabNavigator({
  Mood: {
    screen: Mood,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='users' size={20} color={tintColor} />
      ),
      title: 'Mood',
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='gear' size={20} color={tintColor} />
      ),
      title: 'Settings',
    }
  },
})

const RouteConfigs = {
  Login: { 
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  Signup: { 
    screen: Signup,
    navigationOptions: {
      header: null,
    }
  },
  Home: { 
    screen: homeTab,
  }, 
}

const StackNavigatorConfig = {
  headerMode: 'none',
}

export default StackNavigator(RouteConfigs)