import { StyleSheet } from 'react-native'

const commonStyles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DDD8C4',
    padding: 8
  },

  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600'
  },

  photo: {
    height: 250,
    width: 200
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
  },

  headingText: {
    color: 'white',
    margin: 5,
    fontSize: 18
  },

  button: {
    backgroundColor: '#887149',
    margin: 10
  },

  grid: {
    margin: 10
  },

  h1: {
    textAlign: 'center',
    marginTop: 10
  },

  h2: {
    textAlign: 'center',
    marginTop: 5
  },

  h3: {
    textAlign: 'center',
    marginTop: 5
  },

  col: {
    backgroundColor: '#887149',
    height: 250
  },

  inputValidation: {

    marginTop: 5
  },

  headingCentreText: {
    color: 'white',
    margin: 5,
    fontSize: 18,
    textAlign: 'center',
    textDecorationLine: 'underline'

  },

  headingCentreDarkText: {
    color: '#454545',
    margin: 5,
    fontSize: 18,
    textAlign: 'center',
    textDecorationLine: 'underline'

  },

  headingDarkText: {
    color: '#454545',
    margin: 5,
    fontSize: 18
  },

  card: {
    margin: 5
  }

})

export { commonStyles }
