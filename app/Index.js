import { StackNavigator, TabNavigator } from 'react-navigation'
import React from 'react'
import { Text, } from 'react-native'
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons';

import Login from './screens/Login'
import Signup from './screens/Signup'
import Mood from './screens/Mood'
import Settings from './screens/Settings'
import Search from './screens/Search'
import FriendRequests from './screens/FriendRequests'

const firebaseConfig = {
  apiKey: "AIzaSyAs8kiZwakuQACvAIBRrLktGprs5pNDoQo",
  databaseURL: "https://mood-d5b8c.firebaseio.com",
  //storageBucket: "mood-d5b8c.appspot.com",
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
  FriendRequests: {
    screen: FriendRequests,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='user-plus' size={20} color={tintColor} />
      ),
      title: 'Friend Requests',
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='search' size={20} color={tintColor} />
      ),
      title: 'Search',
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
}
  , {
    tabBarOptions: {
      style: {
        paddingBottom: 5,
        height: 55,
      }
    }
  }
)

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