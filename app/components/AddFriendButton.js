import React from 'react';
import { 
    StyleSheet, 
    View,
    TouchableHighlight,
    Text, 
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default class AddFriendButton extends React.Component {
    render() {
        return (
            <TouchableHighlight 
                style={this.props.friendRequestPending ? styles.buttonDisabled : styles.button}
                onPress={this.props.onPress}
                underlayColor={'#1b557a'}
                disabled={this.props.friendRequestPending ? true : false}
            >
                <View style={styles.buttonContainer}>
                    <Ionicons name='ios-person-add' size={20} color='white'/>
                    <Text style={styles.buttonText}>
                        {this.props.friendRequestPending ? 'Request Pending' : 'Add Friend'}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    };
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 200,
        backgroundColor: '#2980b9',
        borderRadius: 10,
        marginTop: 25,
    },
    buttonDisabled : {
        height: 40,
        width: 200,
        backgroundColor: 'rgba(41, 128, 185, 0.5)',
        borderRadius: 10,
        marginTop: 25,
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