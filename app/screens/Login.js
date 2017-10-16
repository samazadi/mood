import React from 'react'
import LoginButton from '../components/LoginButton'
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
} from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      email: '',
      password: '',
    }
  }

  onLoginPress = async () => {
    console.log('pressed button')
  } 

  render() {
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
          <LoginButton onPress={this.onLoginPress}/>
        </View>
        <View style={styles.signupContainer}>
          <Text onPress={() => navigate('Signup')}>
            <Text>Don't have an account? Sign up </Text>
            <Text style={{color: '#2980b9'}}>here</Text>
          </Text>
        </View>
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
