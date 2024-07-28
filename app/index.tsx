import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Home() {
  const date = new Date();

  useEffect(() => {
    getData();
  }, []);

  const showMode = (currentMode?: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem("my-key-1", value);
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getAllKeys();
      if (value !== null) {
        // value previously stored
        console.log(value, "List");
      }

      value.forEach(async (x) => {
        const data = await AsyncStorage.getItem(x);
        data && console.info(JSON.parse(data).toLocaleString(), x);
      });
    } catch (e) {
      // error reading value
    }
  };

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      storeData(JSON.stringify(date));
      schedulePushNotification(date);
    }
  };

  async function schedulePushNotification(date: Date) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: date.toLocaleDateString(),
        data: { data: "goes here", test: { test1: "more data" } },
      },
      trigger: { seconds: 2 },
    });
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => BackHandler.exitApp()} />
        <Appbar.Content title="Alarm" />
      </Appbar.Header>
      <View style={styles.container}>
        <View>
          <Button onPress={showDatepicker}>Open Date Picker</Button>
          <Button onPress={showTimepicker}>Open Time Picker</Button>
          <Text>Selected: {date.toLocaleString()}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: "auto",
  },
});
