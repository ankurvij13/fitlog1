import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { exerciseLibrary } from "../../data/exercises";

export default function DayScreen() {
  const router = useRouter();
  const { day } = useLocalSearchParams();

  const muscle = String(day);

  const exercises =
    exerciseLibrary[muscle as keyof typeof exerciseLibrary] || [];

  const [selected, setSelected] = useState<string[]>([]);

  const toggleExercise = (ex: string) => {
    setSelected((prev) =>
      prev.includes(ex)
        ? prev.filter((e) => e !== ex)
        : [...prev, ex]
    );
  };

  const canStart = selected.length >= 3;

  const startWorkout = () => {
    router.push({
      pathname: "/workout/session",
      params: {
        exercises: JSON.stringify(selected),
        day: muscle,
      },
    });
  };


  return (
    <View style={{ flex: 1, backgroundColor: "#0B1220", padding: 32 }}>

      {/* HEADER */}
      <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
        {muscle.toUpperCase()} DAY
      </Text>

      <Text style={{ color: "#94A3B8", marginTop: 5 }}>
        Select at least 3 exercises
      </Text>

      {/* COUNTER */}
      <Text style={{ color: "#10B981", marginTop: 10, fontSize: 16 }}>
        {selected.length} / 3 selected
      </Text>

      {/* GRID */}
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        {exercises.map((ex) => {
          const isSelected = selected.includes(ex);

          return (
            <Pressable
              key={ex}
              onPress={() => toggleExercise(ex)}
              style={{
                width: "47%",
                margin: "1.5%",
                padding: 14,
                borderRadius: 14,
                backgroundColor: isSelected ? "#10B981" : "#111827",
                borderWidth: 1,
                borderColor: isSelected ? "#10B981" : "#1F2937",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {ex}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* START BUTTON */}
      <Pressable
        disabled={!canStart}
        onPress={startWorkout}
        style={{
          backgroundColor: canStart ? "#4F46E5" : "#374151",
          padding: 14,
          borderRadius: 12,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Start Workout
        </Text>
      </Pressable>


    </View>
  );
}