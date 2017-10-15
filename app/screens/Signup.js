import React from 'react'
import SignupButton from '../components/SignupButton'
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput,
} from 'react-native';

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
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
          />
          <SignupButton />
        </View>
        <View style={styles.signupContainer}>
          <Text onPress={() => navigate('Login')}>Have an account? Log in up here</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2980b9'
  },
  logoContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    flex: 2,
  },
  signupContainer: {
    flex: 1,
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
