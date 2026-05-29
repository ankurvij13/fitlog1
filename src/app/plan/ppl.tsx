import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function PPL() {
  const router = useRouter();

  const days = [
    { day: "Mon", workout: "Push" },
    { day: "Tue", workout: "Pull" },
    { day: "Wed", workout: "Legs" },
    { day: "Thu", workout: "Push" },
    { day: "Fri", workout: "Pull" },
    { day: "Sat", workout: "Legs" },
    { day: "Sun", workout: "Rest" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1220", padding: 20 }}>
      
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        Push Pull Legs 📅
      </Text>

      {days.map((item) => (
        <Pressable
          key={item.day}
          onPress={() => {
            if (item.workout.toLowerCase() === "rest") return;
            router.push(`/day/${item.workout.toLowerCase()}`);
          }}
          style={{
            backgroundColor: "#111827",
            padding: 15,
            marginTop: 12,
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white" }}>{item.day}</Text>
          <Text style={{ color: "#94A3B8" }}>{item.workout}</Text>
        </Pressable>
      ))}
    </View>
  );
}