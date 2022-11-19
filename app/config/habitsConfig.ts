export interface Habit {
  id: string;
  emoji: string;
  title: string;
  frequency: "day" | "week" | "month";
}

export const HABITS: Habit[] = [
  {
    id: "learn",
    title: "Read a book",
    emoji: "📚",
    frequency: "month",
  },
  {
    id: "cook",
    title: "Cook a meal",
    emoji: "🍳",
    frequency: "month",
  },
  {
    id: "make",
    title: "Code something",
    emoji: "⌨️",
    frequency: "month",
  },
  {
    id: "meet",
    title: "Check a new place",
    emoji: "🍸",
    frequency: "month",
  },
  {
    id: "discover",
    title: "See a museum",
    emoji: "🖼",
    frequency: "month",
  },
  {
    id: "family",
    title: "Call family",
    emoji: "👵",
    frequency: "month",
  },
  {
    id: "breathe",
    title: "Be in nature",
    emoji: "🌲",
    frequency: "month",
  },
  {
    id: "movies",
    title: "See a movie",
    emoji: "🎞",
    frequency: "month",
  },
  {
    id: "travel",
    title: "Travel the world",
    emoji: "🌍",
    frequency: "month"
  },
  {
    id: "sports",
    title: "Get sweaty",
    emoji: "🏃‍♂️",
    frequency: "month"
  },
  {
    id: "show",
    title: "See a show",
    emoji: "🎸",
    frequency: "month"
  },
  {
    id: "laugh", 
    title: "Laugh at stand-up",
    emoji: "🎭",
    frequency: "month"
  }
];
