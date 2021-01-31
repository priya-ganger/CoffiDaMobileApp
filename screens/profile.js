import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class Profile extends Component{

    render(){
        
        const navigation = this.props.navigation;
        // const route = this.props.route;
        // const { userId } = route.params;
        // const { userName } = route.params;

        return(

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>This is the Profile screen</Text>
            {/* <Text style={{ color: '#1ACB97' }}>ID: {userId}</Text>
            <Text style={{ color: '#1ACB97' }}>Name: {userName}</Text> */}

            <Button title="Go back"
                onPress={() => navigation.goBack()} />  
        </View>


            // <View>
            //   <Text>This is the Profile screen</Text>
                  
                  
            //       {/* <Button title="About"
            //     onPress={() => navigation.navigate('About')} />

            //     <Button title="Contact"
            //     onPress={() => navigation.navigate('Contact')} />    */}
            // </View>
        )
    }
}
export default Profile;