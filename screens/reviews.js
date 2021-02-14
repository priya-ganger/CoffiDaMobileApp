import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Alert, Text, View, Button, ToastAndroid, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

class Reviews extends Component{

  constructor(props){
    super(props);

    this.state = {
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: "",
      location_id: '5'
    }
}

addReview = async () => {

  let to_add_review = {
    overall_rating: parseInt(this.state.overall_rating),
    price_rating: parseInt(this.state.price_rating),
    quality_rating: parseInt(this.state.quality_rating),
    clenliness_rating: parseInt(this.state.clenliness_rating),
    review_body: this.state.review_body,
  };

  const token = await AsyncStorage.getItem('session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.location_id+"/review", {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token
      },
      body: JSON.stringify(to_add_review)

  })
  .then((response) => {
      if(response.status === 201){
       Alert.alert("Review Added! Id: " + this.state.location_id + " Token: " + token);
       // need to refresh data
      }
      else if(response.status === 400){
        Alert.alert("Id: " + this.state.location_id + " Token: " + token);
          throw 'Bad Request';
      }
      else if(response.status === 401){
        throw 'Unauthorised';
      }
      else if(response.status === 404){
        throw 'Not Found';
      }
      else if(response.status === 500){
      throw 'Server Error';
      }
      else{
          throw 'Something went wrong';
      }
  })
  .then((responseJson) => {
      console.log("Review created", responseJson);
      ToastAndroid.show("Review created", ToastAndroid.SHORT);

  })
  .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
  })
}

// deleteReview = async (location_id, review_id) => {
//   const value = await AsyncStorage.getItem('session_token');
//   return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+location_id+"/review/"+review_id, {
//     method: 'delete',
//     headers: {
//         'Content-Type': 'application/json',
//         'X-Authorization': value
//     },
//     body: JSON.stringify(this.state)
    
// })

// .then((response) => {
//     if(response.status === 200){
      
//         return response.json();
//     }
//     else if(response.status === 400){
//         throw 'Bad Request';
//     }
//     else if(response.status === 401){
//       throw 'Unauthorised';
//     }
//     else if(response.status === 403){
//       throw 'Forbidden';
//     }
//     else if(response.status === 404){
//       throw 'Not Found';
//     }
//     else if(response.status === 500){
//       throw 'Server Error';
//     }
//     else{
//         throw 'Something went wrong';
//     }
// })
// .then(async (responseJson) => {
//     console.log(responseJson);

// })
// .catch((error) => {
//     console.log(error);
//     ToastAndroid.show(error, ToastAndroid.SHORT);
// })
// }

    render(){
        
        const navigation = this.props.navigation;

        return(
            <View>
              <Text>This is the Reviews screen</Text>
              <Button title="Go back"
                onPress={() => navigation.goBack()} />  
                  
                  <TextInput
                placeholder="Enter your overall_rating"
                onChangeText={(overall_rating)=>this.setState({overall_rating})}
                value={this.state.overall_rating}
             />

             <TextInput
                placeholder="Enter your price_rating"
                onChangeText={(price_rating)=>this.setState({price_rating})}
                value={this.state.price_rating}
               
              />
            
            <TextInput 
                placeholder="Enter your quality_rating"
                onChangeText={(quality_rating)=>this.setState({quality_rating})}
                value={this.state.quality_rating}
             />

             <TextInput 
                placeholder="Enter your clenliness_rating"
                onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
                value={this.state.clenliness_rating}
             />

              <TextInput 
                placeholder="Enter your review_body"
                onChangeText={(review_body) => this.setState({review_body})}
                value={this.state.review_body}
             />

                <Button 
                title="Add a review"
                onPress={() => this.addReview()}
                ></Button>

              {/* <Button 
                title="Delete Review"
                onPress={() => this.deleteReview(location_id, userId)}
                ></Button> */}


            </View>
        )
    }
}
export default Reviews;