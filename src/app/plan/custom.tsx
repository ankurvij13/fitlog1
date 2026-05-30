import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function CustomPlan() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#0B1220', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: '700', marginBottom: 12 }}>
        Create Custom Plan
      </Text>

      <Text style={{ color: '#94A3B8', marginBottom: 20 }}>
        This is a placeholder page for creating custom workout plans.
      </Text>

      <Pressable
        onPress={() => router.back()}
        style={{ padding: 12, backgroundColor: '#111827', borderRadius: 8 }}>
        <Text style={{ color: 'white' }}>Go Back</Text>
      </Pressable>
    </View>
  );
}
