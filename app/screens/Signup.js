import React from 'react'
import firebase from 'firebase'
import SignupButton from '../components/SignupButton'
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput,
  ActivityIndicator,
} from 'react-native';

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      email: '',
      password: '',
      error: '',
      showSpinner: false,
    }
  }

  onSignupPress = async () => {
    this.setState({
      error: '',
      showSpinner: true,
    })
    const { email, password } = this.state
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          error: '',
          showSpinner: false,
        })
        const user = firebase.auth().currentUser
        firebase.database().ref('users/' + user.uid).set({
          username: email,
          mood: '',
          email: email,
          profile_picture: 'profile url goes here',
          friends: ''
        })
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        this.setState({
          error: error,
          showSpinner: false,
        })
      })
  }
  
  renderFormOrSpinner() {
    if (this.state.showSpinner) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator animating={true} size='large'/>
        </View>     
      )
    } else {
      const { navigate } = this.props.navigation

      return (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image 
              style={styles.logo}
              source={require('../images/mood_logo.png')} />
          </View>
          <View style={styles.formContainer}>
            <TextInput 
              style={styles.formInput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              placeholder={'Email'}
              keyboardType={'email-address'}
            />
            <TextInput 
              style={styles.formInput}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder={'Password'}
              secureTextEntry={true}
              autoCorrect={false}
            />
            <SignupButton onPress={this.onSignupPress}/>
            <Text style={styles.errorMessage}>{this.state.error.toString()}</Text>
          </View>
          <View style={styles.signupContainer}>
            <Text onPress={() => navigate('Login')}>
              <Text>Have an account? Log in </Text>
              <Text style={{color: '#2980b9'}}>here</Text>
            </Text>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderFormOrSpinner()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    backgroundColor: '#2980b9',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 6,
    padding: 25,
  },
  signupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 15,
    padding: 5,
  },
  spinnerContainer: {
    alignContent: 'center', 
    justifyContent: 'center', 
    flex: 1
  },
  errorMessage: {
    color: 'red',
    //textAlign: 'center',
    marginTop: 10,
  }
})