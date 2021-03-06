import React, { Component } from 'react'
import { TextInput } from 'react-native'
class Input extends Component {
  validation (value) {
    const { pattern } = this.props
    if (!pattern) return true

    // string pattern, one validation rule
    if (typeof pattern === 'string') {
      const condition = new RegExp(pattern, 'g')
      return condition.test(value)
    }
    // array patterns, multiple validation rules
    if (typeof pattern === 'object') {
      const conditions = pattern.map(rule => new RegExp(rule, 'g'))
      return conditions.map(condition => condition.test(value))
    }
  }

  emailValidation (value) {
    const { pattern } = this.props
    if (!pattern) return true

    // string pattern, one validation rule
    if (typeof pattern === 'string') {
      const condition = new RegExp(pattern, 'g')
      return condition.test(value)
    }
  }

  onChange (value) {
    const { onChangeText, onValidation, emailValidation } = this.props
    const isValid = this.validation(value)
    const isValidEmail = this.emailValidation(value)

    onValidation && onValidation(isValid)
    emailValidation && emailValidation(isValidEmail)
    onChangeText && onChangeText(value)
  }

  render () {
    const {
      pattern,
      onChangeText,
      children,
      style,
      ...props
    } = this.props
    return (
      <TextInput
        style={style}
        onChangeText={value => this.onChange(value)}
        {...props}
      >
        {children}
      </TextInput>
    )
  }
}
export default Input
