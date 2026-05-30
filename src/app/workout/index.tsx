import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { exerciseLibrary } from "../../data/exercises";
import { getActivePlan } from "../../storage/activePlan";

export default function Train() {
  const router = useRouter();

  const [plan, setPlan] = useState<string | null>(null);
  const [todayWorkout, setTodayWorkout] = useState<string>("");
  const [exercises, setExercises] = useState<string[]>([]);

  const getTodayWorkout = (plan: string) => {
    const day = new Date().getDay();

    if (plan === "bro") {
      const map = [
        "rest",
        "chest",
        "back",
        "legs",
        "biceps",
        "triceps",
        "shoulders",
        "rest",
      ];
      return map[day];
    }

    if (plan === "ppl") {
      const map = [
        "rest",
        "push",
        "pull",
        "legsabs",
        "push",
        "pull",
        "legsabs",
      ];
      return map[day];
    }

    return "";
  };

  const load = async () => {
    const active = await getActivePlan();

    if (!active) {
      Alert.alert("No Plan Selected", "Please create a workout plan first.");
      return;
    }

    setPlan(active);

    const today = getTodayWorkout(active);
    setTodayWorkout(today);

    const ex =
      exerciseLibrary[today as keyof typeof exerciseLibrary] || [];

    setExercises(ex);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1220" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
    >
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
        Train 💪
      </Text>

      <Text style={{ color: "#94A3B8", marginTop: 8 }}>
        Plan: {plan?.toUpperCase() || "NOT SET"}
      </Text>

      <Text style={{ color: "#10B981", marginTop: 10, fontSize: 18 }}>
        Today: {todayWorkout.toUpperCase()}
      </Text>

      {/* EXERCISES */}
      <View style={{ marginTop: 20 }}>
        {exercises.map((ex) => (
          <View
            key={ex}
            style={{
              backgroundColor: "#111827",
              padding: 14,
              marginBottom: 10,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "white" }}>{ex}</Text>
          </View>
        ))}
      </View>

      {/* START BUTTON */}
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/workout/session",
            params: {
              exercises: JSON.stringify(exercises),
              day: todayWorkout,
            },
          })
        }
        style={{
          backgroundColor: "#4F46E5",
          padding: 14,
          borderRadius: 12,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Start Training
        </Text>
      </Pressable>
    </ScrollView>
  );
}