import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { saveActivePlan } from "../../storage/plans";

export default function Plans() {
  const router = useRouter();

  const PlanRow = ({
    title,
    subtitle,
    buttonText,
    onPress,
  }: {
    title: string;
    subtitle: string;
    buttonText: string;
    onPress: () => void;
  }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#1F2937",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "cornflowerblue",
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: "#94A3B8",
            fontSize: 14,
            marginTop: 4,
          }}
        >
          {subtitle}
        </Text>
      </View>

      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: "dodgerblue",
          paddingHorizontal: 18,
          paddingVertical: 10,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
          {buttonText}
        </Text>
      </Pressable>
    </View>
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
          color: "cornflowerblue",
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Fitness Blueprints
      </Text>

      <Text
        style={{
          color: "#94A3B8",
          marginTop: 8,
          marginBottom: 10,
          fontSize: 15,
        }}
      >
        {/* Choose your preferred training style */}
      </Text>

      <PlanRow
        title="Push Pull Legs"
        subtitle="Strength + Hypertrophy"
        buttonText="Start"
        onPress={async () => {
          await saveActivePlan("ppl");
          router.push("/plan/ppl");
        }}
      />

      <PlanRow
        title="Bro Split"
        subtitle="Classic Bodybuilding"
        buttonText="Start"
        onPress={async () => {
          await saveActivePlan("bro");
          router.push("/plan/bro");
        }}
      />

      <PlanRow
        title="Custom Workout"
        subtitle="Build your own routine"
        buttonText="Create"
        onPress={() => router.push("/plan/custom")}
      />
    </ScrollView>
  );
}