import React, { Component } from "react";
import { TextInput } from "react-native";
class Input extends Component {
 
  validation(value) {
    const { check } = this.props;
    if (!check) return true;

    // string check, one validation rule
    if (typeof check === 'string') {
      const condition = new RegExp(check, 'g');
      return condition.test(value);
    }
    // array check, multiple validation rules
    if (typeof check === 'object') {
      const conditions = check.map(rule => new RegExp(rule, 'g'));
      return conditions.map(condition => condition.test(value));
    }
  }
onChange(value) {

    const { onChangeText, onValidation } = this.props;
    const isValid = this.validation(value);
    onValidation && onValidation(isValid);
    onChangeText && onChangeText(value);
  }
render() {
    const {
      check,
      onChangeText,
      children,
      style,
      ...props
    } = this.props;
return (
      <TextInput
        style={style}
        onChangeText={value => this.onChange(value)}
        {...props}
      >
        {children}
      </TextInput>
    );
  }
}
export default Input;