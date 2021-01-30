import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';


class About extends Component{

    render(){
        const navigation = this.props.navigation;
        return(
            
            <View>
                <Text>This is the About screen </Text>

                
                {/* <Button title="Go back"
                onPress={() => navigation.goBack()} />  */}
            </View>
        )
    }
}
export default About;