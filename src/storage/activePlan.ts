import AsyncStorage from "@react-native-async-storage/async-storage";

const ACTIVE_PLAN_KEY = "ACTIVE_PLAN";

// Save selected plan (bro / ppl / custom)
export const saveActivePlan = async (plan: string) => {
  try {
    await AsyncStorage.setItem(ACTIVE_PLAN_KEY, plan);
  } catch (e) {
    console.log("SAVE ACTIVE PLAN ERROR", e);
  }
};

// Get selected plan
export const getActivePlan = async (): Promise<string | null> => {
  try {
    const plan = await AsyncStorage.getItem(ACTIVE_PLAN_KEY);
    return plan;
  } catch (e) {
    console.log("GET ACTIVE PLAN ERROR", e);
    return null;
  }
};

// Optional: clear plan
export const clearActivePlan = async () => {
  try {
    await AsyncStorage.removeItem(ACTIVE_PLAN_KEY);
  } catch (e) {
    console.log("CLEAR ACTIVE PLAN ERROR", e);
  }
};