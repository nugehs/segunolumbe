export type Quote = { text: string; origin: string };

export const quotes: Quote[] = [
  { text: "The best time to plant a tree was twenty years ago. The second best time is now.", origin: "Proverb" },
  { text: "Little strokes fell great oaks.", origin: "Proverb" },
  { text: "A journey of a thousand miles begins with a single step.", origin: "Chinese proverb" },
  { text: "Measure twice, cut once.", origin: "Proverb" },
  { text: "Rome was not built in a day.", origin: "Proverb" },
  { text: "Slow and steady wins the race.", origin: "Aesop" },
  { text: "Well begun is half done.", origin: "Proverb" },
  { text: "Many hands make light work.", origin: "Proverb" },
  { text: "Where there is a will, there is a way.", origin: "Proverb" },
  { text: "Fall seven times, stand up eight.", origin: "Japanese proverb" },
  { text: "A smooth sea never made a skilled sailor.", origin: "Proverb" },
  { text: "Necessity is the mother of invention.", origin: "Proverb" },
  { text: "Make hay while the sun shines.", origin: "Proverb" },
  { text: "What is well done is done soon enough.", origin: "Proverb" },
  { text: "An ounce of practice is worth more than tons of preaching.", origin: "Proverb" },
  { text: "He who would eat the kernel must crack the nut.", origin: "Proverb" },
  { text: "The early bird catches the worm.", origin: "Proverb" },
  { text: "Patience is a tree whose root is bitter, but its fruit is sweet.", origin: "Proverb" },
  { text: "A chain is no stronger than its weakest link.", origin: "Proverb" },
  { text: "Do not count your chickens before they are hatched.", origin: "Aesop" },
  { text: "Practice makes perfect.", origin: "Proverb" },
  { text: "Every oak was once an acorn.", origin: "Proverb" },
  { text: "If you want to go fast, go alone; if you want to go far, go together.", origin: "African proverb" },
  { text: "By the work one knows the workman.", origin: "Proverb" },
  { text: "Constant dropping wears away a stone.", origin: "Proverb" },
  { text: "A bad workman blames his tools.", origin: "Proverb" },
  { text: "The proof of the pudding is in the eating.", origin: "Proverb" },
  { text: "Strike while the iron is hot.", origin: "Proverb" },
  { text: "Quality is remembered long after the price is forgotten.", origin: "Proverb" },
  { text: "Look before you leap.", origin: "Proverb" },
  { text: "Great things are not done by impulse, but by a series of small things.", origin: "Proverb" },
];

export function quoteForToday(now: Date = new Date()): Quote {
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return quotes[day % quotes.length];
}
