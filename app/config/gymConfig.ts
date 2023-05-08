export const WEIGHTS = [25, 27, 32, 36, 39, 41, 45, 50, 55, 60, 65, 68, 73, 78];

export const GAINAGE_WEIGHTS = [30, 45, 60, 90];

export const POMPES_WEIGHTS = [8, 10, 12, 15];

export const RATINGS = [
  {
    rate: 4,
    label: "😵",
  },
  {
    rate: 3,
    label: "🥵",
  },
  {
    rate: 2,
    label: "😬",
  },
  {
    rate: 1,
    label: "😎",
  },
];

export const EXERCISES = [
  {
    id: "developpe-epaules",
    name: "Développé Vertical",
    weights: WEIGHTS,
  },
  {
    id: "tire-traction",
    name: "Poulie verticale",
    weights: WEIGHTS,
  },
  {
    id: "developpe-couche",
    name: "Développé Couché",
    weights: WEIGHTS,
  },
  {
    id: "tire-assis",
    name: "Tirage Horizontal",
    weights: WEIGHTS,
  },
  {
    id: "papillon-avant",
    name: "Papillon Avant",
    weights: WEIGHTS,
  },
  {
    id: "papillon-arriere",
    name: "Papillon Arrière",
    weights: WEIGHTS,
  },
  {
    id: "poignees",
    name: "Poulie tiré corde",
    weights: WEIGHTS,
  },
  {
    id: "poulie-levee",
    name: "Poulie levée",
    weights: WEIGHTS,
  },
] as const;
