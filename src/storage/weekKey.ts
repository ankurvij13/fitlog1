export const getWeekKey = () => {
  const now = new Date();

  const firstJan = new Date(now.getFullYear(), 0, 1);

  const days =
    Math.floor(
      (now.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000)
    );

  const week = Math.ceil((days + firstJan.getDay() + 1) / 7);

  return `${now.getFullYear()}-W${week}`;
};

export const getDayName = () => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return days[new Date().getDay()];
};

/**
 * FINAL KEY USED IN STORAGE
 * Example: 2026-W4-monday
 */
export const getDateKey = () => {
  return `${getWeekKey()}-${getDayName()}`;
};