import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { saveWorkoutRecord } from "../../storage/tracker";

export default function Session() {
  const router = useRouter();
  
  const { exercises, day } = useLocalSearchParams();

  const exerciseList: string[] = exercises
    ? JSON.parse(String(exercises))
    : [];

  const [done, setDone] = useState<string[]>([]);

  const toggleDone = (ex: string) => {
    setDone((prev) =>
      prev.includes(ex)
        ? prev.filter((e) => e !== ex)
        : [...prev, ex]
    );
  };
 

  const finishWorkout = async () => {
    const unfinished = exerciseList.filter(
      (ex) => !done.includes(ex)
    );

    const isComplete = unfinished.length === 0;

    const save = async (skipped: boolean) => {
      await saveWorkoutRecord({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        workout: String(day),
        completed: isComplete,
        skipped,
        completedExercises: done,
        unfinishedExercises: unfinished,
      });

      router.replace("/"); // or "/workout" or tracker
    };

    // ✅ IF COMPLETE → SAVE DIRECTLY
    if (isComplete) {
      await save(false);
      return;
    }

    // ❌ IF INCOMPLETE → SHOW ALERT
    Alert.alert(
      "Workout Not Complete ⚠",
      `You missed ${unfinished.length} exercises.`,
      [
        {
          text: "Continue",
          style: "cancel",
        },
        {
          text: "Give Up",
          style: "destructive",
          onPress: () => save(true),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1220", padding: 16 }}>

      {/* HEADER */}
      <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
        WORKOUT SESSION
      </Text>

      <Text style={{ color: "#94A3B8", marginTop: 5 }}>
        Tap exercises when completed
      </Text>

      {/* GRID */}
      <FlatList
        data={exerciseList}
        numColumns={2}
        keyExtractor={(item) => item}
        contentContainerStyle={{ marginTop: 20 }}
        renderItem={({ item }) => {
          const isDone = done.includes(item);

          return (
            <Pressable
              onPress={() => toggleDone(item)}
              style={{
                flex: 1,
                margin: 8,
                padding: 16,
                borderRadius: 14,
                backgroundColor: isDone ? "#10B981" : "#111827",
                borderWidth: 1,
                borderColor: isDone ? "#10B981" : "#1F2937",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                {item}
              </Text>

              <Text style={{ color: "#D1D5DB", marginTop: 5 }}>
                {isDone ? "Done ✔" : "Tap to complete"}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* PROGRESS */}
      <Text style={{ color: "#10B981", textAlign: "center", marginTop: 10 }}>
        {done.length} / {exerciseList.length} completed
      </Text>

      {/* FINISH BUTTON */}
      <Pressable
        onPress={finishWorkout}
        style={{
          backgroundColor: "#4F46E5",
          padding: 14,
          borderRadius: 12,
          marginTop: 15,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Done for the Day
        </Text>
      </Pressable>

    </View>
  );
}