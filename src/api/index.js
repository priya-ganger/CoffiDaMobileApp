import { getSessionToken } from '../utils/asyncStorage'

const SERVER_URL = 'http://10.0.2.2:3333/api/1.0.0/'

const getEndpoint = async (route, contentType = 'application/json') => {
  console.log('Trying to GET data')
  return await fetch(SERVER_URL + route, {
    method: 'get',
    headers: {
      'Content-Type': contentType,
      'X-Authorization': await getSessionToken()
    }
  }).catch(err => console.log('GET endpoint failed: ' + err))
}

module.exports = {
  getEndpoint: getEndpoint
}
