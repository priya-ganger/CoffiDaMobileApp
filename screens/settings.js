import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class Settings extends Component{

    render(){
        
        const navigation = this.props.navigation;

        return(

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>This is the Settings Screen</Text>

            <Button title="Go back"
                onPress={() => navigation.goBack()} />  
            </View>
            
                  
            //       {/* <Button title="About"
            //     onPress={() => navigation.navigate('About')} />

            
        )
    }
}
export default Settings;