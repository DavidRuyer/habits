export interface Habit {
  id: string;
  emoji: string;
  title: string;
  obj: boolean;
}

export const HABITS: Habit[] = [
  {
    id: "meet",
    title: "Plan a meet",
    emoji: "📆",
    obj: true,
  },
  {
    id: "talk",
    title: "Talk to new people",
    emoji: "🤝",
    obj: true,
  },
  {
    id: "clean",
    title: "Clean evening",
    emoji: "🫖",
    obj: true,
  },
  {
    id: "learn",
    title: "Livre",
    emoji: "📚",
    obj: false,
  },
  {
    id: "cook",
    title: "Cuisine",
    emoji: "🍳",
    obj: false,
  },
  {
    id: "make",
    title: "Code",
    emoji: "⌨️",
    obj: false,
  },
  {
    id: "meet",
    title: "Soirée",
    emoji: "🍸",
    obj: false,
  },
  {
    id: "discover",
    title: "Expo",
    emoji: "🖼",
    obj: false,
  },
  {
    id: "family",
    title: "Famille",
    emoji: "👵",
    obj: false,
  },
  {
    id: "breathe",
    title: "Balade",
    emoji: "🌲",
    obj: false,
  },
  {
    id: "movies",
    title: "Ciné",
    emoji: "🎞",
    obj: false,
  },
  {
    id: "travel",
    title: "Ailleurs",
    emoji: "🌍",
    obj: false,
  },
  {
    id: "sports",
    title: "Escalade",
    emoji: "🏃‍♂️",
    obj: false,
  },
  {
    id: "show",
    title: "Concert",
    emoji: "🎸",
    obj: false,
  },
  {
    id: "laugh",
    title: "Stand-up",
    emoji: "🎭",
    obj: false,
  },
];
