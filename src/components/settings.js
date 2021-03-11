import React, { Component } from 'react'
import { Text } from 'react-native'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    this.props.navigation.addListener('focus', () => {
      this.setState({ isLoading: true })
    })
  }

  render () {
    return (
      <Text>This is settings screen</Text>
    )
  }
}

export default Settings
