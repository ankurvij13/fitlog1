import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import { saveWorkout } from "../../utils/workoutStorage";

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

  const canFinish = done.length >= 0; 

  const finishWorkout = async () => {
    const workoutData = {
      id: Date.now().toString(),
      day: String(day),
      date: new Date().toISOString(),
      exercises: exerciseList.map((ex) => ({
        name: ex,
        completed: done.includes(ex),
      })),
    };

    await saveWorkout(workoutData);

    router.replace("/");
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
        disabled={!canFinish}
        style={{
          backgroundColor: canFinish ? "#4F46E5" : "#374151",
          padding: 14,
          borderRadius: 12,
          marginTop: 15,
          opacity: canFinish ? 1 : 0.5,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Done for the Day
        </Text>
      </Pressable>

    </View>
  );
}