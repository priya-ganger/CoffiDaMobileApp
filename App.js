import React, { Component } from 'react';
import { View } from 'react-native';
import LocationReview from './components/locationReview'

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      locationReview: {
        "review_id": 1234,
        "overall_rating": 5,
        "price_rating": 4,
        "quality_rating": 3,
        "clenliness_rating": 5,
        "review_body": "Delicious coffee, would recommend!",
        "likes": 5000
      }
    }
  }

render(){
  return (
      <View>
        <LocationReview data={this.state.locationReview} />
      </View>
        );
    }
}

export default App;


















// class SayHello extends Component {
//   render(){
//     return (
//       <View>
//         <Text>Hello {this.props.name}!</Text>
//       </View>
//     )
//   };
// }

// class HelloWorldApp extends Component{
//  render(){
//    return(
//      <View>
//       <Text>Hello World!</Text>
//       <SayHello name ="Priya!"/>
//       </View>
//    );
//  }
// }

// export default HelloWorldApp;