import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { saveActivePlan } from "../../storage/activePlan";

export default function Bro() {
  const router = useRouter();

  const selectPlan = async () => {
    await saveActivePlan("bro");

    // OPTIONAL:
    // navigate to first day OR home OR do workout
    // router.push("/day/chest");
    // 🔥 After selecting plan → go back to Home
    router.replace("/");

    console.log("Bro plan selected");
  };

  const days = [
    { day: "Mon", workout: "Chest" },
    { day: "Tue", workout: "Back" },
    { day: "Wed", workout: "Legs" },
    { day: "Thu", workout: "Biceps" },
    { day: "Fri", workout: "Triceps" },
    { day: "Sat", workout: "Shoulders" },
    { day: "Sun", workout: "Rest" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1220", padding: 20 }}>
      
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        Bro Split 📅
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
          Select Bro Plan
        </Text>
      </Pressable>

      {days.map((item) => (
        <Pressable
          key={item.day}
          onPress={() => {
            if (item.workout.toLowerCase() === "rest") return;

            // NAVIGATION LOGIC (KEEP FOR NOW)
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