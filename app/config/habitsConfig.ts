export interface Habit {
  id: string;
  emoji: string;
  title: string;
  frequency: "day" | "week" | "month";
}

export const HABITS: Habit[] = [
  {
    id: "learn",
    title: "Learn",
    emoji: "📚",
    frequency: "day",
  },
  {
    id: "cook",
    title: "Cook",
    emoji: "🍳",
    frequency: "week",
  },
  {
    id: "make",
    title: "Make",
    emoji: "🔨",
    frequency: "week",
  },
  {
    id: "meet",
    title: "Meet",
    emoji: "🍻",
    frequency: "week",
  },
  {
    id: "discover",
    title: "Discover",
    emoji: "🤓",
    frequency: "month",
  },
  {
    id: "family",
    title: "Family",
    emoji: "👵",
    frequency: "month",
  },
  {
    id: "breathe",
    title: "Breathe",
    emoji: "🌲",
    frequency: "month",
  },
];
