import { StyleSheet } from 'react-native'

const commonStyles = StyleSheet.create({
  // background: {
  //     backgroundColor: '#DDD8C4'
  // },

  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#DDD8C4',
    padding: 8
  },

  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#69A297',
    alignItems: 'center',
    marginLeft: 100,
    marginRight: 100,
    padding: 8,
    borderRadius: 20,
    margin: 5
  },

  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600'
  },

  title: {
    fontSize: 20,
    color: '#50808E',
    fontWeight: '500',
    textAlign: 'center'
  },

  subheadingText: {
    fontSize: 16,
    color: '#50808E',
    fontWeight: '900'
    // textAlign: 'center'
    // margin: 10,
    // height: 40,
    // padding: 5,
    // fontSize: 16,

  },

  subheadingResultText: {
    fontSize: 15,
    color: '#50808E',
    fontWeight: '400'
  },

  photo: {
    // justifyContent: 'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    height: 200,
    width: 200,
    // marginLeft: 100,
    // marginRight: 100,
    // padding: 8,
    // borderRadius: 20,
    // margin: 5
  },

  input: {
    // flex: 1,

    // margin: 5,
    // height: 40,
    // padding: 5,
    // fontSize: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#D6EADF',
    // backgroundColor: '#A3C9A8',

    // borderRadius: 25

    height: 48,
    // width: '80%',
    padding: 8,
    margin: 5,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    borderBottomColor: '#D6EADF',
    backgroundColor: '#A3C9A8'
  },

  starRating: {
    color: '#FFF933',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },

  starRatingEmpty: {
    color: 'white'
  }

})

export { commonStyles }
