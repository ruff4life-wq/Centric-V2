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

export interface CycleContent {
  cycle: number;
  theme: string;
  description: string;
  weeks: WeekContent[];
}

export const cycles: CycleContent[] = [
  {
    cycle: 1,
    theme: 'Awareness',
    description: 'What is happening in me? Foundational exploration of each pillar through honest self-examination and grace.',
    weeks: [
      {
        id: 1,
        title: 'Physical Health',
        pillar: 'Honoring God with Our Bodies',
        overview: 'This session focuses on caring for the physical body as God\'s creation. Participants explore rest, nutrition, movement, and healthy boundaries without guilt or perfectionism.',
        scriptures: [
          '1 Corinthians 6:19–20',
          'Romans 12:1'
        ],
        learningOutcomes: [
          'Understand physical health as spiritual stewardship',
          'Identify one area of physical health to improve',
          'Release shame and embrace grace in caring for their bodies'
        ],
        keyTakeaway: 'Your body is not an afterthought — it\'s a temple.',
        reflectionQuestions: [
          'What stood out to me about caring for my body as an act of worship?',
          'Where have I been neglecting my physical health — and why?',
          'How does my physical health impact my energy, mood, and relationships?'
        ],
        homeworkOptions: [
          'Track sleep, movement, or nutrition for 3 days (no judgment — just awareness).',
          'Add one intentional act of physical care this week (walk, stretch, hydration, rest).',
          'Pray once this week, thanking God for your body instead of criticizing it.'
        ],
        prayerFocus: 'Lord, help me honor You with my body through wise and loving choices.'
      },
      {
        id: 2,
        title: 'Mental & Emotional Health',
        pillar: 'Renewing the Mind & Guarding the Heart',
        overview: 'This week addresses emotional awareness, stress, anxiety, and thought patterns, emphasizing God\'s desire for inner healing and peace.',
        scriptures: [
          'Proverbs 4:23',
          'Romans 12:2',
          'Psalm 34:18'
        ],
        learningOutcomes: [
          'Recognize unhealthy emotional and mental patterns',
          'Learn biblical tools for emotional processing',
          'Feel permission to bring emotions honestly to God'
        ],
        keyTakeaway: 'Healing begins when we stop hiding what\'s happening inside.',
        reflectionQuestions: [
          'What emotions have been most present in my life lately?',
          'What thoughts or beliefs tend to drain my peace?',
          'How do I usually respond to stress and how would I like to respond instead?'
        ],
        homeworkOptions: [
          'Write down recurring negative thoughts and replace them with scripture or truth.',
          'Practice a daily 2-minute pause: breathe, name your emotion, invite God in.',
          'Share honestly with one trusted person about how you\'re really doing.'
        ],
        prayerFocus: 'God, renew my mind and heal what\'s happening beneath the surface.'
      },
      {
        id: 3,
        title: 'Relationships & Social Life',
        pillar: 'Loving Well in Community',
        overview: 'Participants explore God\'s design for relationships, focusing on communication, boundaries, forgiveness, and authentic community.',
        scriptures: [
          'Romans 12:9–18',
          'Ecclesiastes 4:9–12',
          'John 13:34–35'
        ],
        learningOutcomes: [
          'Understand biblical principles for healthy relationships',
          'Identify one relationship that needs attention or healing',
          'Commit to showing love with truth and grace'
        ],
        keyTakeaway: 'We grow best when we don\'t grow alone.',
        reflectionQuestions: [
          'Which relationships currently give me life? Which drain me?',
          'Where do I need healthier boundaries or more honesty?',
          'Is there anyone I need to forgive or ask forgiveness from?'
        ],
        homeworkOptions: [
          'Intentionally encourage or check in with one person this week.',
          'Practice active listening in one conversation (no interrupting, no fixing).',
          'Pray for a difficult relationship and ask God for wisdom and grace.'
        ],
        prayerFocus: 'Lord, teach me to love others the way You have loved me.'
      },
      {
        id: 4,
        title: 'Career & Work',
        pillar: 'Finding Purpose in What We Do',
        overview: 'This session reframes work as worship and explores calling, excellence, burnout, and aligning career decisions with God\'s purpose.',
        scriptures: [
          'Colossians 3:23–24',
          'Proverbs 16:3',
          'Genesis 2:15'
        ],
        learningOutcomes: [
          'See work as a meaningful part of their calling',
          'Reflect on alignment between faith and daily work',
          'Identify one step toward healthier work rhythms'
        ],
        keyTakeaway: 'Your work matters to God, even the ordinary parts.',
        reflectionQuestions: [
          'How do I currently view my work — calling, burden, or both?',
          'Where do I feel misaligned or burned out?',
          'What would it look like to invite God into my workday?'
        ],
        homeworkOptions: [
          'Begin one workday with a prayer dedicating your work to God.',
          'Identify one unhealthy work habit and take a small step to adjust it.',
          'Write a short paragraph on what meaningful work looks like to you.'
        ],
        prayerFocus: 'God, help me see my work as purposeful and led by You.'
      },
      {
        id: 5,
        title: 'Finances',
        pillar: 'Stewardship, Trust & Freedom',
        overview: 'This week focuses on money as a spiritual issue — covering stewardship, generosity, contentment, and trusting God with resources.',
        scriptures: [
          'Matthew 6:21',
          'Proverbs 3:9–10',
          'Luke 16:10–11'
        ],
        learningOutcomes: [
          'Understand biblical principles of money management',
          'Reflect on their financial habits and heart posture',
          'Take one practical step toward financial wisdom'
        ],
        keyTakeaway: 'How we handle money reveals what we trust.',
        reflectionQuestions: [
          'What emotions come up for me when I think about money?',
          'Where do I see trust — or fear — showing up in my finances?',
          'How does my spending reflect my values?'
        ],
        homeworkOptions: [
          'Review your spending for the last month without shame or judgment.',
          'Practice generosity in one intentional way this week.',
          'Pray over your finances and ask God for wisdom and trust.'
        ],
        prayerFocus: 'Lord, help me trust You and steward what You\'ve given me well.'
      },
      {
        id: 6,
        title: 'Spirituality & Purpose',
        pillar: 'Living a God-Centered Life',
        overview: 'The final session ties all pillars together, focusing on identity, spiritual growth, and living with clarity and purpose beyond the group.',
        scriptures: [
          'Matthew 6:33',
          'Ephesians 2:10',
          'Philippians 1:6'
        ],
        learningOutcomes: [
          'Clarify their spiritual purpose',
          'See how all life pillars connect under God\'s direction',
          'Leave with a personal growth plan moving forward'
        ],
        keyTakeaway: 'A centered life flows from a centered faith.',
        reflectionQuestions: [
          'How has my awareness of my life pillars changed over six weeks?',
          'Where have I experienced the most growth?',
          'What is God inviting me into next?'
        ],
        homeworkOptions: [
          'Revisit your Life-Pillar Assessment and note any changes.',
          'Write a personal growth plan: one pillar to focus on, one habit to continue, one habit to begin.'
        ],
        prayerFocus: 'God, lead me forward with clarity, courage, and obedience.'
      }
    ]
  },

  // ─────────────────────────────────────────────
  // CYCLE 2 — INTEGRATION
  // "What do I do with what I know?"
  // ─────────────────────────────────────────────
  {
    cycle: 2,
    theme: 'Integration',
    description: 'What do I do with what I know? Moving from awareness into practice — learning to embody each pillar in the daily rhythms of a helping professional\'s life.',
    weeks: [
      {
        id: 1,
        title: 'Physical Health',
        pillar: 'Sustainability Over Performance',
        overview: 'Cycle 2 moves beyond awareness of the body into sustainable rhythms. Helping professionals are prone to running on empty while pouring into others. This week challenges the glorification of busyness and explores what it means to rest as an act of faith, not laziness.',
        scriptures: [
          'Isaiah 40:31',
          'Mark 6:31',
          'Exodus 20:8–10'
        ],
        learningOutcomes: [
          'Distinguish between rest and laziness through a biblical lens',
          'Identify specific physical depletion patterns unique to their role as a helper',
          'Build one sustainable physical rhythm into their weekly routine'
        ],
        keyTakeaway: 'You cannot pour from an empty vessel — and God never asked you to.',
        reflectionQuestions: [
          'When did I last feel truly physically rested — not just tired less? What made that possible?',
          'How has the pace of my work affected my body over the last six weeks?',
          'What is one physical boundary I need to protect this cycle that I ignored last time?'
        ],
        homeworkOptions: [
          'Schedule one non-negotiable rest block this week and honor it as you would a client appointment.',
          'Notice when you override physical signals (hunger, fatigue, tension) to keep working — journal what drives that.',
          'Practice the Sabbath principle in one small way: a full hour completely offline and unproductive.'
        ],
        prayerFocus: 'Lord, teach me to rest in You as deeply as I work for You.'
      },
      {
        id: 2,
        title: 'Mental & Emotional Health',
        pillar: 'From Awareness to Regulation',
        overview: 'In cycle 1 we named our emotions. In cycle 2 we learn to work with them. This week explores emotional regulation, secondary traumatic stress, and the practice of self-compassion — what it looks like to extend to yourself the same grace you give your clients.',
        scriptures: [
          'Lamentations 3:22–23',
          '2 Corinthians 1:3–4',
          'Psalm 62:8'
        ],
        learningOutcomes: [
          'Understand secondary traumatic stress and its impact on helpers',
          'Practice self-compassion as a clinical and spiritual discipline',
          'Develop one personal emotional regulation strategy grounded in faith'
        ],
        keyTakeaway: 'The compassion you give so freely to others — you are allowed to receive it too.',
        reflectionQuestions: [
          'In what ways have I absorbed the pain of those I serve without processing it?',
          'How do I talk to myself when I make a mistake — would I speak that way to a client?',
          'Where is God asking me to receive comfort rather than only give it?'
        ],
        homeworkOptions: [
          'Write yourself a letter of compassion about one area where you\'ve been your own harshest critic.',
          'After a difficult client session or interaction, build in a 5-minute decompression ritual before moving on.',
          'Identify one person in your life who can hold space for you — and let them this week.'
        ],
        prayerFocus: 'God, let the compassion You have for me become the compassion I have for myself.'
      },
      {
        id: 3,
        title: 'Relationships & Social Life',
        pillar: 'Boundaries as an Act of Love',
        overview: 'Cycle 2 goes deeper into the hardest part of relationships for helping professionals: saying no. This week reframes boundaries not as rejection but as an act of love — for others and for yourself. We explore people-pleasing, compassion fatigue in relationships, and the difference between being available and being used.',
        scriptures: [
          'Matthew 5:37',
          'Galatians 6:2–5',
          'Proverbs 25:17'
        ],
        learningOutcomes: [
          'Understand why helping professionals struggle uniquely with boundaries',
          'Distinguish between healthy availability and compulsive caretaking',
          'Establish one clear relational boundary with grace and love'
        ],
        keyTakeaway: 'A boundary is not a wall — it\'s a door you control.',
        reflectionQuestions: [
          'Where am I saying yes when I mean no — and what fear is driving that?',
          'Which relationship in my life needs a clearer, kinder boundary right now?',
          'How has the lack of boundaries in my personal life affected my professional effectiveness?'
        ],
        homeworkOptions: [
          'Practice one "no" this week — delivered with warmth, without over-explanation.',
          'Map your relational energy: who fills your cup, who drains it, and what you want to do about that.',
          'Pray for wisdom in one relationship where the boundary feels most complicated or costly.'
        ],
        prayerFocus: 'Lord, give me the courage to love people well — and the wisdom to know what that requires of me.'
      },
      {
        id: 4,
        title: 'Career & Work',
        pillar: 'Called, Not Consumed',
        overview: 'Cycle 2 explores the difference between calling and compulsion. Many helping professionals stay in burnout not because they lack faith but because they have confused suffering for sacrifice. This week examines what it means to work sustainably from a place of calling — and how to recognize when the work has become an idol.',
        scriptures: [
          'Matthew 11:28–30',
          '1 Kings 19:4–8',
          'Nehemiah 6:3'
        ],
        learningOutcomes: [
          'Distinguish between Spirit-led service and ego-driven overwork',
          'Identify whether burnout symptoms are present and what is fueling them',
          'Take one concrete step toward a more sustainable work rhythm'
        ],
        keyTakeaway: 'Even Elijah needed to eat and sleep before God could speak to him.',
        reflectionQuestions: [
          'Am I currently working from a place of calling or a place of compulsion? What\'s the difference I feel in my body?',
          'What would it cost me — emotionally, relationally, spiritually — to keep working at this pace for another year?',
          'Where have I made my work identity more central than my identity in Christ?'
        ],
        homeworkOptions: [
          'Conduct an honest audit: how many hours are you working, and how many are truly necessary vs. driven by anxiety?',
          'Identify one task you could delegate, decline, or delay — and actually do it.',
          'Revisit your original calling: write down why you entered this work. Has that clarity faded?'
        ],
        prayerFocus: 'God, restore the joy of my calling and free me from the burden of proving my worth through work.'
      },
      {
        id: 5,
        title: 'Finances',
        pillar: 'Contentment as a Spiritual Practice',
        overview: 'Cycle 2 moves from financial awareness to financial peace. This week explores the deeply countercultural practice of contentment — not as passive resignation but as an active, trained posture of trust. We examine the relationship between financial anxiety and identity, and what it means to measure wealth by more than money.',
        scriptures: [
          'Philippians 4:11–13',
          '1 Timothy 6:6–8',
          'Hebrews 13:5'
        ],
        learningOutcomes: [
          'Understand contentment as a learned discipline, not a personality trait',
          'Examine how financial insecurity intersects with professional identity for helpers',
          'Take one step toward financial margin — space to breathe, give, and trust'
        ],
        keyTakeaway: 'Contentment is not having everything you want — it\'s wanting what you already have.',
        reflectionQuestions: [
          'In what areas of my finances am I most prone to anxiety versus trust?',
          'How does financial pressure show up in my body and in my relationships?',
          'What would it mean for me to have "enough" — and am I closer to that than I think?'
        ],
        homeworkOptions: [
          'Practice a gratitude inventory of your finances: list five ways God has already provided.',
          'Identify one area of financial fear and bring it explicitly to prayer this week.',
          'Take one step toward margin — whether that\'s reducing an expense, building a small buffer, or having an honest financial conversation.'
        ],
        prayerFocus: 'Lord, train my heart to trust You with what I have and what I lack.'
      },
      {
        id: 6,
        title: 'Spirituality & Purpose',
        pillar: 'Deepening the Root System',
        overview: 'Cycle 2 culminates in a deeper examination of spiritual formation — moving beyond spiritual activity into genuine transformation. This week explores the difference between doing spiritual things and being spiritually rooted. What does it mean to be a helper who is first a disciple?',
        scriptures: [
          'Jeremiah 17:7–8',
          'John 15:4–5',
          'Colossians 2:6–7'
        ],
        learningOutcomes: [
          'Distinguish between spiritual performance and genuine spiritual rootedness',
          'Identify the spiritual practices that have produced the most growth this cycle',
          'Develop a personal rule of life — a simple rhythm of spiritual practices to sustain the next cycle'
        ],
        keyTakeaway: 'A tree weathers drought not by working harder, but by having deeper roots.',
        reflectionQuestions: [
          'What spiritual practices have genuinely nourished me this cycle — not just checked a box?',
          'Where do I perform spirituality for others rather than practice it for God?',
          'What does being rooted in Christ look like practically in the week ahead?'
        ],
        homeworkOptions: [
          'Write a simple personal rule of life: two or three spiritual practices you commit to in cycle 3.',
          'Reflect on how your understanding of all six pillars has deepened since cycle 1.',
          'Share one spiritual insight from this cycle with someone in your community.'
        ],
        prayerFocus: 'God, drive my roots deeper so that what grows above the surface can endure.'
      }
    ]
  },

  // ─────────────────────────────────────────────
  // CYCLE 3 — EMBODIMENT
  // "Who am I becoming?"
  // ─────────────────────────────────────────────
  {
    cycle: 3,
    theme: 'Embodiment',
    description: 'Who am I becoming? Moving from practice into identity — learning to live each pillar not as a discipline to maintain but as an expression of who God has made you to be.',
    weeks: [
      {
        id: 1,
        title: 'Physical Health',
        pillar: 'The Body as a Witness',
        overview: 'Cycle 3 invites a profound reframe: your physical health is not just personal stewardship — it is a testimony. How you inhabit your body communicates something to your clients, your community, and yourself about what you believe. This week explores embodied presence, physical attunement, and what it means to be fully alive in your body as a spiritual act.',
        scriptures: [
          'Romans 8:11',
          'John 1:14',
          'Psalm 139:14'
        ],
        learningOutcomes: [
          'Understand embodiment as a spiritual and clinical practice',
          'Explore how physical presence and attunement affects therapeutic connection',
          'Commit to one physical practice that reflects who they are becoming — not who they have to be'
        ],
        keyTakeaway: 'The same Spirit that raised Christ dwells in you. Your body is where God shows up in the world.',
        reflectionQuestions: [
          'Over these two cycles, how has my relationship with my body changed?',
          'How does my physical presence — energy, posture, groundedness — affect those I serve?',
          'What does it mean for me to be "fearfully and wonderfully made" in this season of my life?'
        ],
        homeworkOptions: [
          'Practice embodied presence for one week: before each client session or meeting, take three grounding breaths and arrive fully.',
          'Write a letter to your body — acknowledging what it has carried, what it has given, and what you want for it going forward.',
          'Choose one physical practice not from obligation but from delight. Do it this week.'
        ],
        prayerFocus: 'Lord, let my body be a dwelling place for Your presence and a gift to those I serve.'
      },
      {
        id: 2,
        title: 'Mental & Emotional Health',
        pillar: 'Wholeness, Not Just Wellness',
        overview: 'Cycle 3 elevates the conversation from emotional health management to shalom — the deep Hebrew concept of wholeness, completeness, nothing missing. For helping professionals, this means moving beyond coping strategies into genuine flourishing. This week explores what it means to be emotionally whole, not just emotionally stable.',
        scriptures: [
          'Isaiah 26:3',
          '3 John 1:2',
          'John 10:10'
        ],
        learningOutcomes: [
          'Understand shalom as the biblical vision for mental and emotional health',
          'Move from a deficit model (managing dysfunction) to an abundance model (cultivating flourishing)',
          'Identify one area where they want to move from stability to genuine wholeness'
        ],
        keyTakeaway: 'God\'s goal for you is not that you cope — it\'s that you flourish.',
        reflectionQuestions: [
          'What is the difference between how I felt emotionally at the start of cycle 1 and now?',
          'Where am I still just managing rather than truly healing?',
          'What would emotional flourishing — not just surviving — look like in my daily life?'
        ],
        homeworkOptions: [
          'Create a "flourishing inventory" — not a problem list, but a vision list. What does thriving look like for you in 12 months?',
          'Identify one remaining emotional wound and bring it specifically and honestly to God in prayer this week.',
          'Practice joy — one intentional act of delight this week, guilt-free.'
        ],
        prayerFocus: 'God, You came that I might have life abundantly. Lead me from surviving into thriving.'
      },
      {
        id: 3,
        title: 'Relationships & Social Life',
        pillar: 'Legacy & Covenant Love',
        overview: 'Cycle 3 asks the deepest relational question: what kind of person do I want to have been? This week moves from relational management into legacy — exploring covenant love, the relationships that will outlast your career, and what it means to be known and loved for who you are rather than what you do.',
        scriptures: [
          'Ruth 1:16–17',
          '1 Corinthians 13:4–7',
          'Proverbs 17:17'
        ],
        learningOutcomes: [
          'Reflect on the relational legacy they are currently building',
          'Explore covenant love as distinct from transactional or conditional relationships',
          'Identify the two or three relationships worth investing in most deeply'
        ],
        keyTakeaway: 'At the end of your life, you will not wish you had seen more clients. You will wish you had loved more people.',
        reflectionQuestions: [
          'Which relationships in my life have the quality of covenant — present in both abundance and difficulty?',
          'What kind of friend, partner, parent, or colleague am I becoming through this journey?',
          'What relational legacy am I building — and does it reflect what I believe?'
        ],
        homeworkOptions: [
          'Write a letter to someone who has loved you covenantally — tell them what their presence has meant.',
          'Identify your two or three most significant relationships and make one intentional investment in each this week.',
          'Reflect on where you have grown the most relationally across all three cycles.'
        ],
        prayerFocus: 'Lord, let the love You have placed in me be a lasting gift to the people in my life.'
      },
      {
        id: 4,
        title: 'Career & Work',
        pillar: 'Vocation as Identity, Not Activity',
        overview: 'Cycle 3 examines the deepest question of professional life: not what you do, but who you are. This week explores vocation as identity — the integration of calling, character, and craft into a coherent professional self that is rooted in Christ rather than in performance, approval, or outcomes.',
        scriptures: [
          'Jeremiah 1:5',
          'Ephesians 4:1',
          '2 Timothy 1:9'
        ],
        learningOutcomes: [
          'Integrate professional identity with spiritual identity',
          'Examine how their calling has been shaped, clarified, or deepened over three cycles',
          'Articulate a personal vocational statement rooted in faith and values'
        ],
        keyTakeaway: 'You were known before you were formed. Your calling is not what you do for God — it\'s who you are with God.',
        reflectionQuestions: [
          'How has my sense of professional identity shifted across three cycles?',
          'What is the throughline between my faith, my values, and my work?',
          'If I could only be remembered for one thing I contributed professionally, what would I want it to be?'
        ],
        homeworkOptions: [
          'Write a personal vocational statement — two or three sentences that capture who you are, what you do, and why it matters.',
          'Reflect on the gap between the professional you were in cycle 1 and the professional you are becoming.',
          'Share your vocational statement with one trusted person and invite their reflection.'
        ],
        prayerFocus: 'God, align who I am with who You called me to be — in the work, in the waiting, and in the becoming.'
      },
      {
        id: 5,
        title: 'Finances',
        pillar: 'Generosity as a Way of Life',
        overview: 'Cycle 3 completes the financial journey with the highest expression of stewardship: generosity. Not as an occasional act but as an orientation — a way of moving through the world that reflects the abundance of God. This week explores legacy giving, the spirituality of generosity, and what it means to hold resources with an open hand.',
        scriptures: [
          '2 Corinthians 9:6–8',
          'Luke 21:1–4',
          'Deuteronomy 15:10'
        ],
        learningOutcomes: [
          'Understand generosity as a spiritual practice that forms the soul',
          'Examine the relationship between financial security and the freedom to give',
          'Take one step toward generosity that costs something meaningful'
        ],
        keyTakeaway: 'Generosity is not about how much you have — it\'s about how tightly you hold it.',
        reflectionQuestions: [
          'How has my relationship with money and resources changed across three cycles?',
          'Where has fear kept me from being as generous as I want to be?',
          'What would it look like for generosity to become a defining characteristic of my life, not just an occasional act?'
        ],
        homeworkOptions: [
          'Make one generous act this week that requires something from you — not just convenience giving.',
          'Reflect on who has been financially generous toward you and what that meant.',
          'Write a financial legacy statement: how do you want your relationship with money to be remembered?'
        ],
        prayerFocus: 'Lord, make me a conduit, not a reservoir. Let what flows through me bless others as You have blessed me.'
      },
      {
        id: 6,
        title: 'Spirituality & Purpose',
        pillar: 'Becoming Who You Were Made to Be',
        overview: 'The culmination of the three-cycle journey. This final session is not a conclusion but a commissioning. Participants have moved from awareness through integration into embodiment. The question is no longer "what should I do?" but "who am I becoming?" — and "how does that person show up in the world?" This is the session of sending forth.',
        scriptures: [
          'Micah 6:8',
          'Romans 12:1–2',
          'Philippians 4:13'
        ],
        learningOutcomes: [
          'Integrate the full three-cycle journey into a cohesive personal narrative',
          'Articulate how all six pillars connect into a unified life vision',
          'Leave with a commitment — not a plan, but a posture — for the life ahead'
        ],
        keyTakeaway: 'You have not arrived. But you are not who you were. And the road ahead is walked by someone different.',
        reflectionQuestions: [
          'Who was I when I began cycle 1 — and who am I now?',
          'What is the single most significant transformation I have experienced across eighteen weeks?',
          'What is God\'s invitation to me as I step forward from this place?'
        ],
        homeworkOptions: [
          'Write a letter to the person who started cycle 1. Tell them what you know now that they didn\'t.',
          'Share your journey with one person who needs to hear that restoration is possible.',
          'Set one intention — not a goal, but a way of being — for the next season of your life.'
        ],
        prayerFocus: 'God, I offer You who I have become. Send me forward. I am ready.'
      }
    ]
  }
];

// Backward-compatible export — returns the weeks for the current cycle
export const getCycleWeeks = (cycleNumber: number): WeekContent[] => {
  const cycle = cycles.find(c => c.cycle === cycleNumber);
  return cycle ? cycle.weeks : cycles[0].weeks;
};

// Legacy export for components not yet updated
export const curriculum = cycles[0].weeks;
