import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useArray from "@/hooks/useArray";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Switch,
  SwitchComponent,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { RawButton } from "react-native-gesture-handler";

export type Todo = {
  taskName: string;
  done?: boolean;
};

const TodoScreen = () => {
  const { state: todos, addElement } = useArray<Todo>([
    { taskName: "Hello", done: false },
    { taskName: "Dis", done: true },
  ]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "dodgerblue", dark: "#00FF00" }}
      headerImage={
        <Image
          source={require("@/assets/images/check.png")}
          style={styles.checkLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Todo List ✅</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Task Name</ThemedText>
        <ThemedView style={styles.actionContainer}>
          <ThemedText>Status</ThemedText>
          <ThemedText>Delete</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView>
        {todos.map((todo, index) => (
          <ThemedView style={styles.titleContainer} key={index}>
            <ThemedText type="default">{todo.taskName}</ThemedText>
            <ThemedView style={styles.actionContainer}>
              <Switch value={todo.done} onChange={console.log} />
              <Ionicons
                style={styles.icon}
                name={"trash"}
                size={24}
                color={"red"}
              />
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>
      <ThemedView style={{ width: 200, marginLeft: "auto" }}>
        <Button
          title="Add"
          onPress={() => {
            addElement({ taskName: "Red", done: false });
          }}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 780,
    minWidth: 280,
    width: "100%",
    margin: "auto",
  },
  checkLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    verticalAlign: "middle",
    gap: 8,
  },
  icon: {
    marginLeft: 22,
  },
});

export default TodoScreen;
