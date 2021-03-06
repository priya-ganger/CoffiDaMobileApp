import AsyncStorage from '@react-native-async-storage/async-storage'

const getUserIdAndSessionToken = async () => {
  return {
    userId: this.getUserId(),
    sessionToken: this.getSessionToken()
  }
}

const getUserId = async () => {
  return await AsyncStorage.getItem('user_id')
}

const getSessionToken = async () => {
  return await AsyncStorage.getItem('session_token')
}

module.exports = {
    getUserIdAndSessionToken: getUserIdAndSessionToken,
    getUserId: getUserId,
    getSessionToken: getSessionToken
}