export interface WeekContent {
  id: number;
  title: string;
  pillar: string;
  overview: string;
  scriptures: string[];
  learningOutcomes: string[];
  keyTakeaway: string;
  reflectionQuestions: string[];
  homeworkOptions: string[];
  prayerFocus: string;
}

export const curriculum: WeekContent[] = [
  {
    id: 1,
    title: "Physical Health",
    pillar: "Honoring God with Our Bodies",
    overview: "This session focuses on caring for the physical body as God's creation. Participants explore rest, nutrition, movement, and healthy boundaries without guilt or perfectionism.",
    scriptures: [
      "1 Corinthians 6:19–20",
      "Romans 12:1"
    ],
    learningOutcomes: [
      "Understand physical health as spiritual stewardship",
      "Identify one area of physical health to improve",
      "Release shame and embrace grace in caring for their bodies"
    ],
    keyTakeaway: "Your body is not an afterthought—it's a temple.",
    reflectionQuestions: [
      "What stood out to me about caring for my body as an act of worship?",
      "Where have I been neglecting my physical health—and why?",
      "How does my physical health impact my energy, mood, and relationships?"
    ],
    homeworkOptions: [
      "Track sleep, movement, or nutrition for 3 days (no judgment—just awareness).",
      "Add one intentional act of physical care this week (walk, stretch, hydration, rest).",
      "Pray once this week, thanking God for your body instead of criticizing it."
    ],
    prayerFocus: "Lord, help me honor You with my body through wise and loving choices."
  },
  {
    id: 2,
    title: "Mental & Emotional Health",
    pillar: "Renewing the Mind & Guarding the Heart",
    overview: "This week addresses emotional awareness, stress, anxiety, and thought patterns, emphasizing God's desire for inner healing and peace.",
    scriptures: [
      "Proverbs 4:23",
      "Romans 12:2",
      "Psalm 34:18"
    ],
    learningOutcomes: [
      "Recognize unhealthy emotional and mental patterns",
      "Learn biblical tools for emotional processing",
      "Feel permission to bring emotions honestly to God"
    ],
    keyTakeaway: "Healing begins when we stop hiding what's happening inside.",
    reflectionQuestions: [
      "What emotions have been most present in my life lately?",
      "What thoughts or beliefs tend to drain my peace?",
      "How do I usually respond to stress and how would I like to respond instead?"
    ],
    homeworkOptions: [
      "Write down recurring negative thoughts and replace them with scripture or truth.",
      "Practice a daily 2-minute pause: breathe, name your emotion, invite God in.",
      "Share honestly with one trusted person about how you're really doing."
    ],
    prayerFocus: "God, renew my mind and heal what's happening beneath the surface."
  },
  {
    id: 3,
    title: "Relationships & Social Life",
    pillar: "Loving Well in Community",
    overview: "Participants explore God's design for relationships, focusing on communication, boundaries, forgiveness, and authentic community.",
    scriptures: [
      "Romans 12:9–18",
      "Ecclesiastes 4:9–12",
      "John 13:34–35"
    ],
    learningOutcomes: [
      "Understand biblical principles for healthy relationships",
      "Identify one relationship that needs attention or healing",
      "Commit to showing love with truth and grace"
    ],
    keyTakeaway: "We grow best when we don't grow alone.",
    reflectionQuestions: [
      "Which relationships currently give me life? Which drain me?",
      "Where do I need healthier boundaries or more honesty?",
      "Is there anyone I need to forgive or ask forgiveness from?"
    ],
    homeworkOptions: [
      "Intentionally encourage or check in with one person this week.",
      "Practice active listening in one conversation (no interrupting, no fixing).",
      "Pray for a difficult relationship and ask God for wisdom and grace."
    ],
    prayerFocus: "Lord, teach me to love others the way You have loved me."
  },
  {
    id: 4,
    title: "Career & Work",
    pillar: "Finding Purpose in What We Do",
    overview: "This session reframes work as worship and explores calling, excellence, burnout, and aligning career decisions with God's purpose.",
    scriptures: [
      "Colossians 3:23–24",
      "Proverbs 16:3",
      "Genesis 2:15"
    ],
    learningOutcomes: [
      "See work as a meaningful part of their calling",
      "Reflect on alignment between faith and daily work",
      "Identify one step toward healthier work rhythms"
    ],
    keyTakeaway: "Your work matters to God, even the ordinary parts.",
    reflectionQuestions: [
      "How do I currently view my work, calling, burden, or both?",
      "Where do I feel misaligned or burned out?",
      "What would it look like to invite God into my workday?"
    ],
    homeworkOptions: [
      "Begin one workday with a prayer dedicating your work to God.",
      "Identify one unhealthy work habit and take a small step to adjust it.",
      "Write a short paragraph on what meaningful work looks like to you."
    ],
    prayerFocus: "God, help me see my work as purposeful and led by You."
  },
  {
    id: 5,
    title: "Finances",
    pillar: "Stewardship, Trust & Freedom",
    overview: "This week focuses on money as a spiritual issue—covering stewardship, generosity, contentment, and trusting God with resources.",
    scriptures: [
      "Matthew 6:21",
      "Proverbs 3:9–10",
      "Luke 16:10–11"
    ],
    learningOutcomes: [
      "Understand biblical principles of money management",
      "Reflect on their financial habits and heart posture",
      "Take one practical step toward financial wisdom"
    ],
    keyTakeaway: "How we handle money reveals what we trust.",
    reflectionQuestions: [
      "What emotions come up for me when I think about money?",
      "Where do I see trust, or fear, showing up in my finances?",
      "How does my spending reflect my values?"
    ],
    homeworkOptions: [
      "Review your spending for the last month without shame or judgment.",
      "Practice generosity in one intentional way this week.",
      "Pray over your finances and ask God for wisdom and trust."
    ],
    prayerFocus: "Lord, help me trust You and steward what You've given me well."
  },
  {
    id: 6,
    title: "Spirituality & Purpose",
    pillar: "Living a God-Centered Life",
    overview: "The final session ties all pillars together, focusing on identity, spiritual growth, and living with clarity and purpose beyond the group.",
    scriptures: [
      "Matthew 6:33",
      "Ephesians 2:10",
      "Philippians 1:6"
    ],
    learningOutcomes: [
      "Clarify their spiritual purpose",
      "See how all life pillars connect under God's direction",
      "Leave with a personal growth plan moving forward"
    ],
    keyTakeaway: "A centered life flows from a centered faith.",
    reflectionQuestions: [
      "How has my awareness of my life pillars changed over six weeks?",
      "Where have I experienced the most growth?",
      "What is God inviting me into next?"
    ],
    homeworkOptions: [
      "Revisit your Life-Pillar Assessment and note any changes.",
      "Write a personal growth plan with: One pillar to focus on next, One habit to continue, One habit to begin"
    ],
    prayerFocus: "God, lead me forward with clarity, courage, and obedience."
  }
];
