import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    background:{
        backgroundColor: '#DDD8C4'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        fontWeight: '700'
      },

      subheadingText: {
        fontSize: 18,
        color: '#50808E',
        fontWeight: '400',
        textAlign: 'center'
      },

    //   subheadingResultText: {
    //     fontSize: 20,
    //     color: 'white',
    //     fontWeight: '700'
    //   },

      photo: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: 200,
        width: 200,
        marginLeft: 100,
        marginRight: 100,
        padding: 8,
        borderRadius: 20,
        margin: 5
      }

})

export {commonStyles}