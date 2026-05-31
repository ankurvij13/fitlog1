import { WorkoutRecord } from "../storage/tracker";

/**
 * Get all records from current week only
 */
export const getWeeklyWorkouts = (
  data: Record<string, WorkoutRecord>
) => {
  return Object.entries(data).filter(
    ([key]) => key.includes(getCurrentWeek())
  );
};

/**
 * Get DONE count (completed = true)
 */
export const getDoneCount = (
  weekly: [string, WorkoutRecord][]
) => {
  return weekly.filter(([, r]) => r.completed).length;
};

/**
 * Get MISSED count (skipped = true)
 */
export const getMissedCount = (
  weekly: [string, WorkoutRecord][]
) => {
  const today = new Date().getDay();

  // Monday=0 ... Sunday=6
  const currentDayIndex = today === 0 ? 6 : today - 1;

  const dayNames = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  let missed = 0;

  for (let i = 0; i < currentDayIndex; i++) {
    const day = dayNames[i];

    const record = weekly.find(([key]) =>
      key.toLowerCase().includes(day)
    );

    if (!record) {
      missed++;
      continue;
    }

    if (record[1].skipped) {
      missed++;
    }
  }

  return missed;
};

/**
 * Simple streak logic:
 * consecutive completed days from latest backwards
 */
export const calculateStreak = (
  data: Record<string, WorkoutRecord>
) => {
  const entries = Object.entries(data)
    .sort(([a], [b]) => a.localeCompare(b));

  let streak = 0;

  for (let i = entries.length - 1; i >= 0; i--) {
    const record = entries[i][1];

    if (record.completed) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

/**
 * WEEK KEY helper (simple version)
 */
export const getCurrentWeek = () => {
  const now = new Date();

  const firstJan = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor(
    (now.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000)
  );

  const week = Math.ceil((days + firstJan.getDay() + 1) / 7);

  return `${now.getFullYear()}-W${week}`;
};

export const buildWeekStatus = (
  weekly: [string, WorkoutRecord][]
) => {
  const dayNames = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return dayNames.map((day) => {
    const record = weekly.find(([key]) =>
      key.toLowerCase().includes(day)
    );

    if (!record) {
      return "empty";
    }

    if (record[1].completed) {
      return "done";
    }

    if (record[1].skipped) {
      return "missed";
    }

    return "empty";
  });
};