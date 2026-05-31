import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  const MainCard = ({
    title,
    subtitle,
    onPress,
  }: {
    title: string;
    subtitle: string;
    onPress: () => void;
  }) => (
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
          color: "cornflowerblue",
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
          fontSize: 15,
          lineHeight: 22,
        }}
      >
        {subtitle}
      </Text>
    </Pressable>
  );

  const MiniCard = ({
    day,
    workout,
    completed,
  }: {
    day: string;
    workout: string;
    completed?: boolean;
  }) => (
    <View
      style={{
        backgroundColor: completed ? "#10B981" : "#111827",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: completed ? "#10B981" : "#1F2937",
      }}
    >
      <Text
        style={{
          color: "cornflowerblue",
          fontWeight: "700",
          fontSize: 15,
        }}
      >
        {day}
      </Text>

      <Text
        style={{
          color: "#D1D5DB",
          marginTop: 5,
        }}
      >
        {workout}
      </Text>
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
      {/* HEADER */}
      <Text
        style={{
          color: "cornflowerblue",
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        JussaFit..
      </Text>

      <Text
        style={{
          color: "#94A3B8",
          marginTop: 8,
          fontSize: 16,
          marginBottom: 30,
        }}
      >
        {/* Track workouts and stay consistent */}
      </Text>

      {/* CREATE WORKOUT */}
      <MainCard
        title="Create"
        subtitle="Create your workout plans"
        onPress={() => router.push("/plans")}
      />

      <MainCard
        title="Train"
        subtitle="Start current workout"
        onPress={() => router.push("/workout")}
      />

      {/* LIVE TRACKER */}
      <MainCard
        title="Tracker"
        subtitle="Track your training"
        onPress={() => router.push("/tracker")}
      />

      {/* QUICK OVERVIEW */}
      {/* <Text
        style={{
          color: "cornflowerblue",
          fontSize: 22,
          fontWeight: "700",
          marginTop: 10,
          marginBottom: 18,
        }}
      >
        Weekly Progress
      </Text> */}

      <View
        style={{
          marginTop: 40,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#64748B",
            fontSize: 12,
          }}
        >
          JussaFit™
        </Text>

        <Text
          style={{
            color: "#475569",
            fontSize: 11,
            marginTop: 4,
          }}
        >
          Built by Ankuro
        </Text>
      </View>

    </ScrollView>
  );
}