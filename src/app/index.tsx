import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  const Card = ({ title, onPress }: any) => (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#111827",
        padding: 18,
        borderRadius: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#1F2937",
      }}
    >
      <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1220", padding: 20 }}>
      
      <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>
        Select a Workout 💪
      </Text>

      <Text style={{ color: "#94A3B8", marginTop: 8, marginBottom: 25 }}>
        Choose your training split
      </Text>

      <Card
        title="Push Pull Legs"
        onPress={() => router.push("/plan/ppl")}
      />

      <Card
        title="Bro Split"
        onPress={() => router.push("/plan/bro")}
      />

      <Card
        title="Custom Workout"
        onPress={() => router.push("/custom")}
      />
    </View>
  );
}