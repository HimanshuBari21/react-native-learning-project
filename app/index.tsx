import { useState } from "react";
import { View, StyleSheet, Platform, PlatformColor } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";

export default function Home() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <Button onPress={() => console.log(Platform.constants)}>
        {Platform.OS.toUpperCase() +
          " version " +
          (Platform.Version ?? " Not Avalaible")}
      </Button>
      <Text>हिमांशु</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
});
