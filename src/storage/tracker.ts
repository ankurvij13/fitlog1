import AsyncStorage from "@react-native-async-storage/async-storage";

const TRACKER_KEY = "WORKOUT_TRACKER";

export type WorkoutRecord = {
  dateKey: string; // e.g. "2026-W04-monday"
  workout: string;

  completed: boolean;
  skipped: boolean;

  completedExercises: string[];
  unfinishedExercises: string[];
};

// ---------------- SAVE (OVERWRITE SAME DAY) ----------------
export const saveWorkoutRecord = async (record: WorkoutRecord) => {
  try {
    const existing = await AsyncStorage.getItem(TRACKER_KEY);
    const data = existing ? JSON.parse(existing) : {};

    // overwrite same day
    data[record.dateKey] = record;

    await AsyncStorage.setItem(
      TRACKER_KEY,
      JSON.stringify(data)
    );
  } catch (e) {
    console.log("TRACKER SAVE ERROR", e);
  }
};

// ---------------- GET ALL ----------------
export const getWorkoutRecords = async (): Promise<
  Record<string, WorkoutRecord>
> => {
  try {
    const data = await AsyncStorage.getItem(TRACKER_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.log("TRACKER GET ERROR", e);
    return {};
  }
};