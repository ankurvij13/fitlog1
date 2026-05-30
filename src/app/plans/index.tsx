import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { saveActivePlan } from "../../storage/plans";

export default function Plans() {
  const router = useRouter();

  const PlanCard = ({
    emoji,
    title,
    subtitle,
    onPress,
  }: any) => (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#111827",
        padding: 20,
        borderRadius: 20,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#1F2937",
      }}
    >
      <Text
        style={{
          fontSize: 34,
          marginBottom: 10,
        }}
      >
        {emoji}
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 22,
          fontWeight: "700",
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: "#94A3B8",
          marginTop: 8,
          lineHeight: 22,
        }}
      >
        {subtitle}
      </Text>
    </Pressable>
  );

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
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        Workout Plans 🏋️
      </Text>

      <Text
        style={{
          color: "#94A3B8",
          marginTop: 8,
          marginBottom: 30,
          fontSize: 15,
        }}
      >
        Choose your preferred training style
      </Text>

      <PlanCard
        emoji="🔥"
        title="Push Pull Legs"
        subtitle="Balanced split focused on recovery and progressive overload"
        onPress={async () => {
          await saveActivePlan("ppl");
          router.push("/plan/ppl");
        }}
      />

      <PlanCard
        emoji="💪"
        title="Bro Split"
        subtitle="Classic bodybuilding split targeting one muscle group per day"
        onPress={async () => {
          await saveActivePlan("bro");
          router.push("/plan/bro");
        }}
      />

      <PlanCard
        emoji="⚡"
        title="Custom Workout"
        subtitle="Create your own training schedule and exercise combinations"
        onPress={() => router.push("/plan/custom")}
      />
    </ScrollView>
  );
}