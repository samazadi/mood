import React from 'react';
import { 
    StyleSheet, 
    View,
    TouchableHighlight,
    Text, 
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';

export default class LoginButton extends React.Component {
    render() {
        return (
            <TouchableHighlight 
                style={styles.button}
                onPress={this.props.onPress}
                underlayColor={'#1b557a'}
            >
                <View style={styles.buttonContainer}>
                    <SimpleLineIcons name='login' size={20} color='white'/>
                    <Text style={styles.buttonText}>
                        Signup
                    </Text>
                </View>
            </TouchableHighlight>
        );
    };
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 326,
        backgroundColor: '#2980b9',
        borderRadius: 10,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        marginLeft: 15,
    },
})