/**
 * Shared content for the EPIC Learning Center website.
 * Update classes, memberships, FAQs, hours, and contact links here.
 * Home, What We Offer, and the Monthly Calendar all read from this file.
 *
 * Photos: drop JPG files into public/images/ using the filenames below.
 * Until a file is there, the page shows a labeled photo frame.
 */

export const siteConfig = {
  name: "EPIC Learning Center",
  shortName: "EPIC",
  address: "Plot 2 Speke Road, Jinja, Uganda",
  directions:
    "Corner of Bell and Speke, surrounded by a large white wall — look for the EPIC sign!",
  phone: "0784800456",
  phoneHref: "tel:+256784800456",
  whatsapp: "0767286094",
  whatsappUrl: "https://wa.me/256767286094",
  email: "epiclearningcenterjinja@gmail.com",
  emailHref: "mailto:epiclearningcenterjinja@gmail.com",
  facebookUrl: "https://www.facebook.com/profile.php?id=61590139876638",
  registrationUrl:
    "https://docs.google.com/forms/d/1dAeexwolL1ASg8At6L0iP9BrlhKKODVGXwwhIxmq5eo/viewform",
  hours: [
    { days: "Monday – Friday", time: "9:00am – 6:00pm" },
    { days: "Saturday", time: "9:00am – 5:00pm" },
    { days: "Sunday", time: "Closed" },
  ],
  hoursSummary:
    "Mon–Fri 9:00am – 6:00pm | Sat 9:00am – 5:00pm | Closed Sundays",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Speke%20Road%20and%20Bell%20Avenue%2C%20Jinja%2C%20Uganda&hl=en&z=16&output=embed",
  /**
   * Paste a Google Calendar embed URL here to show it on the calendar page.
   * Leave it as an empty string to hide the embed.
   */
  googleCalendarEmbedUrl: "" as string,
} as const

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/who-we-are", label: "Who We Are" },
  { href: "/what-we-offer", label: "What We Offer" },
  { href: "/calendar", label: "Monthly Calendar" },
  { href: "/faq", label: "F.A.Q." },
  { href: "/join-us", label: "Join Us" },
] as const

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const

export type Weekday = (typeof weekDays)[number]

export const centerHours: Record<Weekday, string> = {
  Monday: "9:00am – 6:00pm",
  Tuesday: "9:00am – 6:00pm",
  Wednesday: "9:00am – 6:00pm",
  Thursday: "9:00am – 6:00pm",
  Friday: "9:00am – 6:00pm",
  Saturday: "9:00am – 5:00pm",
}

export const calendarMonth = {
  summary:
    "Weekly classes run all month, alongside open center hours for members and daily drop-ins.",
}

export type ClassCategory =
  | "Arts"
  | "STEM/Mechanics"
  | "History"
  | "Dance & Fitness"
  | "Culture"
  | "Sports"

export const classCategories: ClassCategory[] = [
  "Arts",
  "STEM/Mechanics",
  "History",
  "Dance & Fitness",
  "Culture",
  "Sports",
]

export type ClassOffering = {
  id: string
  title: string
  ages: string
  day: Weekday
  time: string
  schedule: string
  price: string
  description: string
  category: ClassCategory
}

export const classes: ClassOffering[] = [
  {
    id: "basic-car-mechanics",
    title: "Basic Car Mechanics",
    ages: "Ages 12+",
    day: "Wednesday",
    time: "9:30am – 11:00am",
    schedule: "Wednesdays, 9:30am – 11:00am",
    price: "90,000 UGX (12 classes)",
    description:
      "Students spend half the class learning mechanical theory and the other half right under the hood of a real car! By practicing hands-on skills every week, teens finish the course feeling capable and confident.",
    category: "STEM/Mechanics",
  },
  {
    id: "history-of-the-ancient-world",
    title: "History of the Ancient World",
    ages: "Ages 8–11",
    day: "Tuesday",
    time: "10:30am – 11:30am",
    schedule: "Tuesdays, 10:30am – 11:30am",
    price: "100,000 UGX (12 classes)",
    description:
      "History comes alive with a hands-on project every single week—from carving cuneiform writing into clay to experiencing a traditional Chinese tea ceremony.",
    category: "History",
  },
  {
    id: "zumba-dance-class",
    title: "Zumba Dance Class",
    ages: "All Ages",
    day: "Saturday",
    time: "9:00am",
    schedule: "Saturdays, 9:00am",
    price: "10,000 UGX / drop-in",
    description:
      "A high-energy, fun weekend fitness dance class for everyone to enjoy!",
    category: "Dance & Fitness",
  },
]

export function classesOn(day: Weekday) {
  return classes.filter((item) => item.day === day)
}

export type Membership = {
  id: string
  name: string
  price: string
  period: string
  summary: string
  perks: string[]
  accent: "macaw" | "bee" | "beetle"
}

export const memberships: Membership[] = [
  {
    id: "daily-drop-in",
    name: "Daily Drop-In Pass",
    price: "15,000 UGX",
    period: "/ day",
    summary:
      "Full supervised access to our library, quiet study room, and outdoor play area (zip line, gaga ball, courts, sandpit).",
    perks: [
      "Library and quiet study room",
      "Outdoor play: zip line, gaga ball, courts, and sandpit",
      "Supervised access for the day",
    ],
    accent: "macaw",
  },
  {
    id: "family-two",
    name: "Monthly Family Membership",
    price: "200,000 UGX",
    period: "/ month · up to 2 kids",
    summary:
      "Unlimited access to the Center during supervised operational hours (library, study room, and outdoor play areas) + discounted rates on classes.",
    perks: [
      "Unlimited access during supervised hours",
      "Library, study room, and outdoor play areas",
      "Discounted rates on classes",
    ],
    accent: "bee",
  },
  {
    id: "family-three",
    name: "Monthly Family Membership",
    price: "300,000 UGX",
    period: "/ month · 3+ kids",
    summary:
      "Full monthly family access to the Center, library, study room, outdoor play areas + discounted rates on classes for larger families.",
    perks: [
      "Full monthly access for larger families",
      "Library, study room, and outdoor play areas",
      "Discounted rates on classes",
    ],
    accent: "beetle",
  },
]

export type Faq = {
  id: string
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    id: "drop-off",
    question: "Do parents stay on-site during classes, or is it drop-off?",
    answer:
      "Most classes for ages 8+ are drop-off (and traveling worldschooling parents can drop off kids 11+ for the day). Our Preschool classes require a parent to stay on-site. Because every class is different, specific drop-off guidelines depend on the age group and class offered.",
  },
  {
    id: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept MTN Mobile Money and Cash (in Ugandan Shillings – UGX).",
  },
  {
    id: "what-to-bring",
    question: "What should my child bring to class?",
    answer:
      "Children should bring a water bottle, packed lunch or snacks, sunscreen, and a hat.",
  },
  {
    id: "supplies",
    question: "Are all supplies and materials included in the class price?",
    answer:
      "Not always—occasionally we ask parents to provide simple materials for specific projects, though we intentionally choose projects that use items commonly found at home.",
  },
  {
    id: "trial",
    question:
      "Can we book a trial class or tour the Center before buying a membership?",
    answer:
      "Absolutely! We love showing families around the EPIC Learning Center. Contact us anytime to arrange a tour and learn more.",
  },
  {
    id: "refunds",
    question: "What is your cancellation or refund policy?",
    answer: "We do not provide refunds once you have registered for a class.",
  },
  {
    id: "allergies",
    question:
      "How do you handle allergies, dietary restrictions, and medical waivers?",
    answer:
      "Parents are required to inform our on-site resident teacher of any allergies or dietary restrictions, and all parents must complete our waiver form before their children participate at the Center.",
  },
]

export type SpecialEvent = {
  id: string
  title: string
  when: string
  description: string
  tag: string
}

/**
 * One-off events for the current month. Leave the list empty when there
 * are no extras — the calendar will say so, and weekly classes still show.
 *
 * Example:
 * {
 *   id: "story-hour",
 *   title: "Saturday Story Hour",
 *   when: "Saturday 25 October · 11:00am",
 *   description: "A read-aloud morning in the children's library.",
 *   tag: "Library",
 * }
 */
export const specialEvents: SpecialEvent[] = []

export const heroPhotos = [
  {
    src: "/images/hero-project.jpg",
    alt: "Children doing a hands-on project at EPIC Learning Center",
    caption: "[Photo: Kids doing hands-on project learning]",
    tone: "feather",
    icon: "project",
  },
  {
    src: "/images/hero-outdoor.jpg",
    alt: "Outdoor play area with a zip line, gaga ball pit, and sandpit",
    caption: "[Photo: Outdoor zip line, gaga ball & huge sandpit]",
    tone: "bee",
    icon: "outdoor",
  },
  {
    src: "/images/hero-library.jpg",
    alt: "Inside Jinja's only children's library at EPIC Learning Center",
    caption: "[Photo: Inside Jinja's only children's library]",
    tone: "macaw",
    icon: "library",
  },
] as const

export const audiences = [
  {
    title: "Homeschooling Families",
    body: "Daytime project-based classes, study rooms, and a vibrant social hub where kids make fast friends.",
    tone: "feather",
    icon: "home",
  },
  {
    title: "After-School & Weekend Learners",
    body: "Fun afternoon and Saturday classes for children in traditional schools looking to explore new passions and skills.",
    tone: "macaw",
    icon: "sun",
  },
  {
    title: "Worldschooling Families",
    body: "Cultural immersion, local friendships, and engaging daytime programs in the Adventure Capital of East Africa—giving traveling parents free time to work.",
    tone: "bee",
    icon: "globe",
  },
] as const

export const highlights = [
  {
    title: "Hands-On Project Learning",
    body: "Small group classes where kids actively build, experiment, and participate alongside passionate mentors.",
    icon: "hammer",
  },
  {
    title: "One-of-a-Kind Outdoor Play Area",
    body: "Featuring a massive sandpit, gaga ball pit, volleyball/badminton court, and our backyard zip line! There is nothing else like it in Jinja.",
    icon: "trees",
  },
  {
    title: "Jinja's Only Children's Library",
    body: "Plus a quiet indoor study room, indoor classroom, and large open-air outdoor classroom.",
    icon: "library",
  },
  {
    title: "Diverse, Real-World Subjects",
    body: "From working under the hood of a car to carving ancient cuneiform in clay or learning Afro-dance, we encourage kids to step outside their comfort zones.",
    icon: "compass",
  },
  {
    title: "A Global Landing Pad",
    body: "Connecting Ugandan families, expats, non-profit workers, and travelers from around the world in a warm, supportive network.",
    icon: "users",
  },
] as const

export const safetyPoints = [
  {
    title: "Fully Enclosed & Gated Compound",
    body: "Surrounded by a high perimeter wall with security wiring.",
  },
  {
    title: "Full-Time Security Guard",
    body: "Dedicated security personnel on-site at all times.",
  },
  {
    title: "Strict Sign-In / Sign-Out Policy",
    body: "Every person entering or leaving the compound is logged.",
  },
  {
    title: "On-Site Resident Teacher",
    body: "A full-time teacher lives on-site and is always available to assist children.",
  },
  {
    title: "Vetted Mentors",
    body: "All classes are taught by parent and community mentors with background checks.",
  },
] as const

export const founders = [
  {
    name: "Danyne Bharj",
    role: "Co-Founder",
    image: "/images/founder-danyne.jpg",
    caption: "",
    bio: "Veteran homeschooling mom of five who has lived in Uganda with her family for many years. Danyne founded the Amani Baby Cottage in Jinja, and her family are entrepreneurs running several local businesses. She loves bringing people together and has a gift for making everyone feel “most welcome.”",
  },
  {
    name: "Tanya Holmes",
    role: "Co-Founder",
    image: "/images/founder-tanya.jpg",
    caption: "",
    bio: "Canadian homeschooling mom of ten (five grown children and five adopted Ugandan children) who came to Uganda with her family to manufacture and distribute nutritional supplements. Tanya has a gift for bringing education alive through hands-on learning experiences and loves seeing kids captivated by what they discover.",
  },
] as const

export const signupSteps = [
  {
    title: "Fill out the form",
    body: "Fill out our online Google Registration Form.",
  },
  {
    title: "We confirm your spot",
    body: "We'll send your confirmation along with MTN Mobile Money or cash payment details.",
  },
  {
    title: "Arrive ready to learn",
    body: "Pack a water bottle and sun hat, and arrive for class!",
  },
] as const

export const rentalIncludes = [
  "Choice of indoor or outdoor classroom space",
  "Tables and chairs",
  "On-site staff assistance",
  "Full cleanup afterward",
] as const

export const mentorSubjects = [
  "Car mechanics",
  "Literacy",
  "Afro-dance",
  "Breakdancing",
] as const
