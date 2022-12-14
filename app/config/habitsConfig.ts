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
    emoji: "π",
    obj: true,
  },
  {
    id: "talk",
    title: "Talk to new people",
    emoji: "π€",
    obj: true,
  },
  {
    id: "clean",
    title: "Clean evening",
    emoji: "π«",
    obj: true,
  },
  {
    id: "learn",
    title: "Livre",
    emoji: "π",
    obj: false,
  },
  {
    id: "cook",
    title: "Cuisine",
    emoji: "π³",
    obj: false,
  },
  {
    id: "make",
    title: "Code",
    emoji: "β¨οΈ",
    obj: false,
  },
  {
    id: "meet",
    title: "SoirΓ©e",
    emoji: "πΈ",
    obj: false,
  },
  {
    id: "discover",
    title: "Expo",
    emoji: "πΌ",
    obj: false,
  },
  {
    id: "family",
    title: "Famille",
    emoji: "π΅",
    obj: false,
  },
  {
    id: "breathe",
    title: "Balade",
    emoji: "π²",
    obj: false,
  },
  {
    id: "movies",
    title: "CinΓ©",
    emoji: "π",
    obj: false,
  },
  {
    id: "travel",
    title: "Ailleurs",
    emoji: "π",
    obj: false,
  },
  {
    id: "sports",
    title: "Escalade",
    emoji: "πββοΈ",
    obj: false,
  },
  {
    id: "show",
    title: "Concert",
    emoji: "πΈ",
    obj: false,
  },
  {
    id: "laugh",
    title: "Stand-up",
    emoji: "π­",
    obj: false,
  },
];
