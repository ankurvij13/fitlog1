import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "WORKOUT_HISTORY";

export type WorkoutSet = {
  reps: string;
  weight: string;
};

export type WorkoutLog = {
  id: string;
  day: string;
  exercises: {
    name: string;
    sets: WorkoutSet[];
  }[];
  date: string;
};

export const saveWorkout = async (workout: WorkoutLog) => {
  try {
    const existing = await AsyncStorage.getItem(KEY);
    const data = existing ? JSON.parse(existing) : [];

    data.push(workout);

    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.log("SAVE ERROR", e);
  }
};

export const getWorkouts = async (): Promise<WorkoutLog[]> => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("READ ERROR", e);
    return [];
  }
};