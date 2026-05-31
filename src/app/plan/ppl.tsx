import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { saveActivePlan } from "../../storage/activePlan";

export default function PPL() {
  const router = useRouter();

  const selectPlan = async () => {
    await saveActivePlan("ppl");

    // OPTIONAL NAVIGATION:
    // router.push("/day/push");
    // 🔥 After selecting plan → go back to Home
    router.replace("/");
  };

  const days = [
    { day: "Mon", workout: "Push" },
    { day: "Tue", workout: "Pull" },
    { day: "Wed", workout: "LegsAbs" },
    { day: "Thu", workout: "Push" },
    { day: "Fri", workout: "Pull" },
    { day: "Sat", workout: "LegsAbs" },
    { day: "Sun", workout: "Rest" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1220", padding: 20 }}>
      
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        Push Pull Legs
      </Text>

      {/* SELECT PLAN BUTTON */}
      <Pressable
        onPress={selectPlan}
        style={{
          backgroundColor: "#4F46E5",
          padding: 14,
          borderRadius: 12,
          marginTop: 15,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Select PPL Plan
        </Text>
      </Pressable>

      {days.map((item) => (
        <Pressable
          key={item.day}
          // onPress={() => {
          //   if (item.workout.toLowerCase() === "rest") return;

          //   // NAVIGATION LOGIC (KEEP FOR NOW)
          //   router.push(`/day/${item.workout.toLowerCase()}`);
          // }}
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
          <Text style={{ color: "#94A3B8" }}>
            {item.workout === "LegsAbs"
              ? "Legs + Abs"
              : item.workout}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}