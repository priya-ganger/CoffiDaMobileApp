import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import LocationReview from './locationReview';
import Location from './location';

class User extends Component{
    // This component returns a user.
    constructor(props)
    {
        super(props);
    }

    render(){
        const user = this.props.data;

        return(
            
            <View>
                <Text>User ID: {user.user_id}</Text>
                <Text>First Name: {user.first_name}</Text>
                <Text>Last Town: {user.last_name}</Text>
                <Text>Email: {user.email}</Text>

                 <Text>Favourite Locations: </Text>
               
                <FlatList
                    data={user.favourite_locations}
                    renderItem={({item}) => (<Location data={item} />
                        )}
                    keyExtractor={(item) => item.location_id.toString()}
                 />   

                 <Text>Reviews: </Text>
         
                {/* <FlatList
                    data={user.reviews}
                    renderItem={({item}) => (<Location data={item} />
                        )}
                    keyExtractor={(item) => item.location_id.toString()} 
                  />    */}

                <Text> </Text>

                {/* call component */}

                 {/* <Text>Liked Reviews: {user.liked_reviews}</Text> */}
                  {/* call component */}             

            </View>
               
           

        );
     }
}
export default User;