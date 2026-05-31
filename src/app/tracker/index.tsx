import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import {
  buildWeekStatus,
  calculateStreak,
  getDoneCount,
  getMissedCount,
  getWeeklyWorkouts,
} from "../../lib/trackerLogic";
import { getWorkoutRecords } from "../../storage/tracker";

export default function Tracker() {
  const [done, setDone] = useState(0);
  const [missed, setMissed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [weekStatus, setWeekStatus] = useState<string[]>([]);

  const load = async () => {
    const data = await getWorkoutRecords();
    // Alert.alert("DATA", JSON.stringify(data)); // 🔥 debug
    // data = Record<string, WorkoutRecord>

    const weekly = getWeeklyWorkouts(data);

    setDone(getDoneCount(weekly));
    setMissed(getMissedCount(weekly));
    setStreak(calculateStreak(data));
    setWeekStatus(buildWeekStatus(weekly));
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const today = new Date().getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1220" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
    >
      {/* HEADER */}
      <Text style={{ color: "cornflowerblue", fontSize: 28, fontWeight: "bold" }}>
        Live Tracker
      </Text>

      <Text style={{ color: "#94A3B8", marginTop: 6 }}>
        Real workout analytics
      </Text>

      {/* TODAY */}
      <View
        style={{
          backgroundColor: "#111827",
          padding: 20,
          borderRadius: 18,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "#10B981", fontWeight: "700" }}>
          TODAY
        </Text>

        <Text
          style={{
            color: "cornflowerblue",
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 8,
          }}
        >
          {days[today]}
        </Text>
      </View>

      {/* WEEK VISUAL */}
      <Text
        style={{
          color: "cornflowerblue",
          fontSize: 20,
          fontWeight: "700",
          marginTop: 30,
          marginBottom: 15,
        }}
      >
        This Week
      </Text>

      <View
        style={{
          backgroundColor: "#111827",
          borderRadius: 18,
          padding: 16,
        }}
      >
        {/* DAYS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <Pressable
            key={day}
            onPress={() => {}}
            style={{
              width: 32,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#94A3B8",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {day}
            </Text>
          </Pressable>
          ))}
        </View>

        {/* STATUS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
        {weekStatus.map((status, index) => {
          const todayIndex =
            new Date().getDay() === 0
              ? 6
              : new Date().getDay() - 1;

          let icon = "⚪";

          if (index === todayIndex) {
            icon = "🔵";
          } else if (status === "done") {
            icon = "🟢";
          } else if (status === "missed") {
            icon = "🟠";
          }

          return (
            <Pressable
              key={index}
              onPress={() => {}}
              style={{
                width: 32,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {icon}
              </Text>
            </Pressable>
          );
        })}
        </View>
      </View>
      
      {/* STATS */}
      <Text
        style={{
          color: "cornflowerblue",
          fontSize: 20,
          fontWeight: "700",
          marginTop: 30,
          marginBottom: 15,
        }}
      >
        Weekly Stats
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* DONE */}
        <View
          style={{
            backgroundColor: "#111827",
            width: "31%",
            padding: 16,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#10B981", fontSize: 20, fontWeight: "bold" }}>
            {done}
          </Text>
          <Text style={{ color: "#94A3B8", marginTop: 5 }}>Done</Text>
        </View>

        {/* MISSED */}
        <View
          style={{
            backgroundColor: "#111827",
            width: "31%",
            padding: 16,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#EF4444", fontSize: 20, fontWeight: "bold" }}>
            {missed}
          </Text>
          <Text style={{ color: "#94A3B8", marginTop: 5 }}>Missed</Text>
        </View>

        {/* STREAK */}
        <View
          style={{
            backgroundColor: "#111827",
            width: "31%",
            padding: 16,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#F59E0B", fontSize: 20, fontWeight: "bold" }}>
            {streak}
          </Text>
          <Text style={{ color: "#94A3B8", marginTop: 5 }}>Streak</Text>
        </View>
      </View>
    </ScrollView>
  );
}