import React, { Component } from 'react'
import { Container, Content, Card, CardItem, Body, Text, H1 } from 'native-base'
import { commonStyles } from '../styles/common'
import { t, getLanguage } from '../locales'

export default class About extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userData: []
    }
  }

  componentDidMount () {
    this._unsubscribe =
    this.props.navigation.addListener('focus', () => {
      this.setState({ isLoading: true })
      getLanguage()
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

  render () {
    return (
      <Container>
        <H1 style={commonStyles.h1}>CoffiDa</H1>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  {t('about_description')}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
