import AsyncStorage from "@react-native-async-storage/async-storage";

const TRACKER_KEY = "WORKOUT_TRACKER";

export type WorkoutRecord = {
  id: string;
  date: string;
  workout: string;

  completed: boolean;
  skipped: boolean;

  completedExercises: string[];
  unfinishedExercises: string[];
};

export const saveWorkoutRecord = async (
  record: WorkoutRecord
) => {
  try {
    const existing = await AsyncStorage.getItem(
      TRACKER_KEY
    );

    const data = existing
      ? JSON.parse(existing)
      : [];

    data.push(record);

    await AsyncStorage.setItem(
      TRACKER_KEY,
      JSON.stringify(data)
    );
  } catch (e) {
    console.log("TRACKER SAVE ERROR", e);
  }
};

export const getCompletedWorkouts =
  async (): Promise<WorkoutRecord[]> => {
    try {
      const data = await AsyncStorage.getItem(
        TRACKER_KEY
      );

      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.log("TRACKER GET ERROR", e);
      return [];
    }
  };