import AsyncStorage from "@react-native-async-storage/async-storage";

const ACTIVE_PLAN_KEY = "ACTIVE_PLAN";

export const saveActivePlan = async (
  plan: string
) => {
  try {
    await AsyncStorage.setItem(
      ACTIVE_PLAN_KEY,
      plan
    );
  } catch (e) {
    console.log("SAVE PLAN ERROR", e);
  }
};

export const getActivePlan = async () => {
  try {
    const plan = await AsyncStorage.getItem(
      ACTIVE_PLAN_KEY
    );

    return plan;
  } catch (e) {
    console.log("GET PLAN ERROR", e);
    return null;
  }
};

export const clearActivePlan = async () => {
  try {
    await AsyncStorage.removeItem(
      ACTIVE_PLAN_KEY
    );
  } catch (e) {
    console.log("CLEAR PLAN ERROR", e);
  }
};