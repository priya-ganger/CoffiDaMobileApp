import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class LogOut extends Component{

    render(){
        
        const navigation = this.props.navigation;

        return(
            <View>
              <Text>This is the LogOut screen</Text>
                  
                  
                  {/* <Button title="About"
                onPress={() => navigation.navigate('About')} />

                <Button title="Contact"
                onPress={() => navigation.navigate('Contact')} />    */}
            </View>
        )
    }
}
export default LogOut;