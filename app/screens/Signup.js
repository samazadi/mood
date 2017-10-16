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
    console.log('pressed button')
    this.setState({
      error: '',
      showSpinner: true,
    })
  }
  
  renderFormOrSpinner() {
    if (this.state.showSpinner) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator color='red' animating={this.state.showSpinner} style={{alignItems: 'center', justifyContent: 'center'}} size='large'/>
        </View>        
      )
    } else {
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
            />
            <SignupButton onPress={this.onSignupPress}/>
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
    const { navigate } = this.props.navigation

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
})