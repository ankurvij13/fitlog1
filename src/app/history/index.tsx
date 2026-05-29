import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getWorkouts, WorkoutLog } from "../../utils/workoutStorage";

export default function History() {
  const [data, setData] = useState<WorkoutLog[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await getWorkouts();
      setData(res.reverse());
    };

    load();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0B1220", padding: 20 }}>
      
      <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
        Workout History 📊
      </Text>

      {data.map((w) => (
        <View
          key={w.id}
          style={{
            backgroundColor: "#111827",
            padding: 15,
            borderRadius: 12,
            marginTop: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            {w.day}
          </Text>

          <Text style={{ color: "#94A3B8" }}>
            {new Date(w.date).toDateString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}