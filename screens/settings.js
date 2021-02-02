import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const Settings = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the Settings screen</Text>
   <Button title="Go back"
                onPress={() => navigation.goBack()} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Settings;