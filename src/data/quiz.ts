import { QuizDimension, QuizQuestion, QuizOption, CareerMatch, Career } from "@/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "When you imagine your ideal workday, what excites you most?",
    options: [
      { id: "q1a", label: "Designing something beautiful people will use", emoji: "🎨", weights: { creativity: 2, people: 1 } },
      { id: "q1b", label: "Solving a gnarly logic puzzle nobody else could crack", emoji: "🧩", weights: { problemSolving: 2, programming: 1 } },
      { id: "q1c", label: "Defending a system from a simulated attacker", emoji: "🛡️", weights: { security: 2, problemSolving: 1 } },
      { id: "q1d", label: "Digging into a big dataset to find a hidden trend", emoji: "📊", weights: { data: 2, mathematics: 1 } },
    ],
  },
  {
    id: "q2",
    question: "How do you feel about math?",
    options: [
      { id: "q2a", label: "Love it — bring on the equations", emoji: "➗", weights: { mathematics: 2 } },
      { id: "q2b", label: "I like structured logic, not heavy proofs", emoji: "🔢", weights: { mathematics: 1, programming: 1 } },
      { id: "q2c", label: "I'd rather avoid it entirely", emoji: "🙅", weights: { creativity: 1, people: 1 } },
      { id: "q2d", label: "Depends — stats over calculus, please", emoji: "📈", weights: { data: 1, mathematics: 1 } },
    ],
  },
  {
    id: "q3",
    question: "Which of these sounds most fun to build?",
    options: [
      { id: "q3a", label: "A slick, animated website or app", emoji: "💻", weights: { creativity: 2, programming: 1 } },
      { id: "q3b", label: "A game with its own physics and characters", emoji: "🎮", weights: { games: 2, creativity: 1 } },
      { id: "q3c", label: "A robot or gadget that moves in the real world", emoji: "🤖", weights: { hardware: 2, problemSolving: 1 } },
      { id: "q3d", label: "An AI that can chat or generate content", emoji: "✨", weights: { ai: 2, programming: 1 } },
    ],
  },
  {
    id: "q4",
    question: "Pick a Saturday side project:",
    options: [
      { id: "q4a", label: "Tinkering with a Raspberry Pi or Arduino", emoji: "🔌", weights: { hardware: 2 } },
      { id: "q4b", label: "Setting up a home server or network lab", emoji: "🌐", weights: { hardware: 1, security: 1 } },
      { id: "q4c", label: "Building a personal website", emoji: "🖥️", weights: { programming: 1, creativity: 1 } },
      { id: "q4d", label: "Playing with a public dataset in a notebook", emoji: "📓", weights: { data: 2 } },
    ],
  },
  {
    id: "q5",
    question: "What's your relationship with people and collaboration?",
    options: [
      { id: "q5a", label: "I love interviewing users and gathering feedback", emoji: "🗣️", weights: { people: 2, creativity: 1 } },
      { id: "q5b", label: "I prefer deep focus, heads-down work", emoji: "🎧", weights: { problemSolving: 1 } },
      { id: "q5c", label: "I like leading a team through a process", emoji: "🧑‍🤝‍🧑", weights: { people: 2 } },
      { id: "q5d", label: "I'm happiest solo, debugging for hours", emoji: "🐛", weights: { programming: 1, problemSolving: 1 } },
    ],
  },
  {
    id: "q6",
    question: "Which outcome sounds most satisfying?",
    options: [
      { id: "q6a", label: "Catching a hacker before they cause damage", emoji: "🕵️", weights: { security: 2, problemSolving: 1 } },
      { id: "q6b", label: "Making an app blazing fast and beautiful", emoji: "⚡", weights: { creativity: 2, programming: 1 } },
      { id: "q6c", label: "Predicting the future from data patterns", emoji: "🔮", weights: { data: 2, mathematics: 1 } },
      { id: "q6d", label: "Making a robot arm pick up an object precisely", emoji: "🦾", weights: { hardware: 2, mathematics: 1 } },
    ],
  },
  {
    id: "q7",
    question: "How do you feel about adversarial, security-style thinking?",
    options: [
      { id: "q7a", label: "I love thinking like an attacker", emoji: "🗡️", weights: { security: 2 } },
      { id: "q7b", label: "I'd rather build than break things", emoji: "🏗️", weights: { programming: 1, creativity: 1 } },
      { id: "q7c", label: "I like protecting systems more than breaking in", emoji: "🛡️", weights: { security: 1, people: 1 } },
      { id: "q7d", label: "Not really my thing", emoji: "🤷", weights: { creativity: 1 } },
    ],
  },
  {
    id: "q8",
    question: "Pick your favorite type of puzzle:",
    options: [
      { id: "q8a", label: "A visual design challenge", emoji: "🖼️", weights: { creativity: 2 } },
      { id: "q8b", label: "A tricky math problem", emoji: "🧮", weights: { mathematics: 2 } },
      { id: "q8c", label: "An escape-room style logic puzzle", emoji: "🔐", weights: { problemSolving: 2 } },
      { id: "q8d", label: "\"What pattern is hidden in this data?\"", emoji: "🔍", weights: { data: 2 } },
    ],
  },
  {
    id: "q9",
    question: "Which tool would you rather spend all day in?",
    options: [
      { id: "q9a", label: "A design tool like Figma", emoji: "🎨", weights: { creativity: 2, people: 1 } },
      { id: "q9b", label: "A terminal / command line", emoji: "⌨️", weights: { programming: 2, problemSolving: 1 } },
      { id: "q9c", label: "A robotics simulator or breadboard", emoji: "🔧", weights: { hardware: 2 } },
      { id: "q9d", label: "A notebook full of charts and models", emoji: "📈", weights: { data: 2, mathematics: 1 } },
    ],
  },
  {
    id: "q10",
    question: "What does \"success\" look like to you in IT?",
    options: [
      { id: "q10a", label: "Millions of people enjoying something I designed", emoji: "🌟", weights: { creativity: 2, people: 2 } },
      { id: "q10b", label: "A system that never gets breached under my watch", emoji: "🔒", weights: { security: 2 } },
      { id: "q10c", label: "A model that makes accurate predictions at scale", emoji: "🤖", weights: { ai: 2, data: 1 } },
      { id: "q10d", label: "A game people can't put down", emoji: "🎮", weights: { games: 2, creativity: 1 } },
    ],
  },
];

const dimensions: QuizDimension[] = [
  "programming",
  "creativity",
  "mathematics",
  "hardware",
  "security",
  "data",
  "games",
  "ai",
  "people",
  "problemSolving",
];

type Profile = Record<QuizDimension, number>;

export const careerQuizProfiles: Record<string, Profile> = {
  "frontend-developer": { programming: 4, creativity: 5, mathematics: 1, hardware: 0, security: 1, data: 1, games: 0, ai: 0, people: 3, problemSolving: 3 },
  "backend-developer": { programming: 5, creativity: 2, mathematics: 3, hardware: 0, security: 2, data: 3, games: 0, ai: 0, people: 1, problemSolving: 4 },
  "fullstack-developer": { programming: 5, creativity: 4, mathematics: 2, hardware: 0, security: 1, data: 2, games: 0, ai: 0, people: 2, problemSolving: 3 },
  "software-engineer": { programming: 5, creativity: 2, mathematics: 4, hardware: 1, security: 1, data: 2, games: 0, ai: 1, people: 1, problemSolving: 5 },
  "mobile-developer": { programming: 4, creativity: 4, mathematics: 1, hardware: 1, security: 1, data: 1, games: 0, ai: 0, people: 2, problemSolving: 3 },
  "game-developer": { programming: 5, creativity: 5, mathematics: 4, hardware: 1, security: 0, data: 0, games: 5, ai: 1, people: 1, problemSolving: 4 },
  "ar-vr-developer": { programming: 4, creativity: 5, mathematics: 4, hardware: 2, security: 0, data: 0, games: 3, ai: 1, people: 1, problemSolving: 3 },
  "cybersecurity-analyst": { programming: 2, creativity: 1, mathematics: 2, hardware: 1, security: 5, data: 1, games: 0, ai: 0, people: 2, problemSolving: 5 },
  "network-engineer": { programming: 1, creativity: 1, mathematics: 2, hardware: 3, security: 3, data: 0, games: 0, ai: 0, people: 2, problemSolving: 3 },
  "system-administrator": { programming: 2, creativity: 1, mathematics: 1, hardware: 3, security: 3, data: 1, games: 0, ai: 0, people: 3, problemSolving: 3 },
  "cloud-engineer": { programming: 3, creativity: 1, mathematics: 2, hardware: 1, security: 2, data: 2, games: 0, ai: 0, people: 2, problemSolving: 4 },
  "devops-engineer": { programming: 4, creativity: 1, mathematics: 2, hardware: 1, security: 2, data: 1, games: 0, ai: 0, people: 2, problemSolving: 4 },
  "ai-engineer": { programming: 5, creativity: 3, mathematics: 5, hardware: 0, security: 0, data: 4, games: 0, ai: 5, people: 1, problemSolving: 5 },
  "data-scientist": { programming: 3, creativity: 2, mathematics: 5, hardware: 0, security: 0, data: 5, games: 0, ai: 3, people: 2, problemSolving: 4 },
  "data-engineer": { programming: 4, creativity: 1, mathematics: 3, hardware: 0, security: 1, data: 5, games: 0, ai: 1, people: 1, problemSolving: 4 },
  "database-engineer": { programming: 3, creativity: 1, mathematics: 3, hardware: 0, security: 1, data: 5, games: 0, ai: 0, people: 1, problemSolving: 3 },
  "robotics-engineer": { programming: 4, creativity: 3, mathematics: 5, hardware: 5, security: 0, data: 1, games: 0, ai: 2, people: 1, problemSolving: 5 },
  "embedded-developer": { programming: 4, creativity: 1, mathematics: 3, hardware: 5, security: 1, data: 0, games: 0, ai: 0, people: 1, problemSolving: 4 },
  "ui-ux-designer": { programming: 1, creativity: 5, mathematics: 1, hardware: 0, security: 0, data: 1, games: 0, ai: 0, people: 5, problemSolving: 2 },
  "qa-engineer": { programming: 2, creativity: 1, mathematics: 1, hardware: 0, security: 1, data: 1, games: 0, ai: 0, people: 3, problemSolving: 3 },
};

function cosineSimilarity(a: Profile, b: Profile): number {
  let dot = 0, normA = 0, normB = 0;
  for (const dim of dimensions) {
    dot += a[dim] * b[dim];
    normA += a[dim] * a[dim];
    normB += b[dim] * b[dim];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function scoreAnswers(selected: QuizOption[]): Profile {
  const totals: Profile = Object.fromEntries(dimensions.map((d) => [d, 0])) as Profile;
  for (const option of selected) {
    for (const [dim, weight] of Object.entries(option.weights)) {
      totals[dim as QuizDimension] += weight ?? 0;
    }
  }
  return totals;
}

export function matchCareers(selected: QuizOption[], careers: Career[]): CareerMatch[] {
  const userProfile = scoreAnswers(selected);
  const matches: CareerMatch[] = careers
    .filter((c) => careerQuizProfiles[c.id])
    .map((career) => ({
      career,
      score: Math.round(cosineSimilarity(userProfile, careerQuizProfiles[career.id]) * 100),
    }))
    .sort((a, b) => b.score - a.score);
  return matches;
}
