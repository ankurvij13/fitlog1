import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { getActivePlan } from "../../storage/plans";

export default function Tracker() {
  const [activePlan, setActivePlan] =
    useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadPlan();
    }, [])
  );

  const loadPlan = async () => {
    const plan = await getActivePlan();
    setActivePlan(plan);
  };

  const broDays = [
    "Chest",
    "Back",
    "Legs",
    "Biceps",
    "Triceps",
    "Shoulders",
    "Rest",
  ];

  const pplDays = [
    "Push",
    "Pull",
    "Legs + Abs",
    "Push",
    "Pull",
    "Legs + Abs",
    "Rest",
  ];

  const todayIndex = new Date().getDay();

  const fixedIndex =
    todayIndex === 0 ? 6 : todayIndex - 1;

  const workouts =
    activePlan === "ppl"
      ? pplDays
      : broDays;

  const todayWorkout = workouts[fixedIndex];

  const nextWorkout =
    workouts[(fixedIndex + 1) % workouts.length];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0B1220",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 120,
      }}
    >
      {/* HEADER */}
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        Live Tracker 📈
      </Text>

      <Text
        style={{
          color: "#94A3B8",
          marginTop: 8,
          marginBottom: 30,
          fontSize: 15,
        }}
      >
        Your current training progress
      </Text>

      {/* ACTIVE PLAN */}
      <View
        style={{
          backgroundColor: "#111827",
          borderRadius: 22,
          padding: 22,
          borderWidth: 1,
          borderColor: "#1F2937",
        }}
      >
        <Text
          style={{
            color: "#10B981",
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          ACTIVE PLAN
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {activePlan?.toUpperCase() || "NONE"}
        </Text>

        <Text
          style={{
            color: "#94A3B8",
            marginTop: 10,
          }}
        >
          Today: {todayWorkout}
        </Text>

        <Text
          style={{
            color: "#94A3B8",
            marginTop: 6,
          }}
        >
          Next: {nextWorkout}
        </Text>
      </View>

      {/* WEEK STATUS */}
      <Text
        style={{
          color: "white",
          fontSize: 22,
          fontWeight: "700",
          marginTop: 35,
          marginBottom: 18,
        }}
      >
        Weekly Status
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {[
          { label: "Done", value: "4" },
          { label: "Missed", value: "1" },
          { label: "Streak", value: "6" },
        ].map((item) => (
          <View
            key={item.label}
            style={{
              backgroundColor: "#111827",
              width: "31%",
              padding: 18,
              borderRadius: 18,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 26,
                fontWeight: "bold",
              }}
            >
              {item.value}
            </Text>

            <Text
              style={{
                color: "#94A3B8",
                marginTop: 6,
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}