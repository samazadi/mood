import { StackNavigator } from 'react-navigation'
import firebase from 'firebase'
import Login from './screens/Login'
import Signup from './screens/Signup'

const firebaseConfig = {
  apiKey: "AIzaSyAs8kiZwakuQACvAIBRrLktGprs5pNDoQo",
  databaseURL: "https://mood-d5b8c.firebaseio.com",
}

firebase.initializeApp(firebaseConfig);

const RouteConfigs = {
  Login: { screen: Login },
  Signup: { screen: Signup },
}

const StackNavigatorConfig = {
  headerMode: 'none',
}

export default StackNavigator(RouteConfigs, StackNavigatorConfig)