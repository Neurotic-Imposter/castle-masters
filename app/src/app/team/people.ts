export interface Person {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  links: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    x?: string;
    chessCom?: string;
    lichess?: string;
    email?: string;
  };
}

export const people: Person[] = [
  {
    id: "founder-1",
    name: "Not Rahul Malhotra",
    role: "Founder",
    photoUrl: "/team/founder-1.png",
    bio: "Can't tell you the real name because of corporate laws. The legal team said we'd get fined. We don't actually have a legal team, but we're not taking chances.",
    links: {
      linkedin: "https://linkedin.com",
      x: "https://x.com",
    },
  },
  {
    id: "founder-2",
    name: "Not Rahul Gupta",
    role: "Founder",
    photoUrl: "/team/founder-2.jpg",
    bio: "Rahul Gupta has been part of this project since day one. Beyond that, mujhe meri job pyaari hai.",
    links: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "founder-3",
    name: "Tanav",
    role: "Founder",
    photoUrl: "/team/founder-3.png",
    bio: "Dukh. Dard. Peeda.",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "founder-4",
    name: "Depression",
    role: "Founder",
    photoUrl: "/team/founder-4.jpeg",
    bio: "Dukh. Dard. Peeda... but with better Wi-Fi.",
    links: {
      instagram: "https://instagram.com",
      x: "https://x.com",
    },
  },
  {
    id: "developer-1",
    name: "Luv",
    role: "Developer",
    photoUrl: "/team/developer.jpeg",
    bio: "We really miss him. (No, we really don't.) He helped build Version 1 of our website. Then we replaced him with a highly paid professional developer. Cheers.",
    links: {
      github: "https://github.com/neurotic-imposter",
      linkedin: "https://www.linkedin.com/in/luv-malhotra-352231379",
      instagram: "https://www.instagram.com/not.ishq.wala.luv",
      email: "mailto:luv.malhotra.3000@gmail.com",
    },
  },
];
