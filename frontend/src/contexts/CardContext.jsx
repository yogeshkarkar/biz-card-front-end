import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export const PLATFORMS = {
  linkedin: { label: "LinkedIn", icon: "LinkedinLogo", urlPrefix: "linkedin.com/in/", gradient: "from-[#0a66c2] to-[#0a66c2]" },
  github: { label: "GitHub", icon: "GithubLogo", urlPrefix: "github.com/", gradient: "from-foreground to-foreground" },
  instagram: { label: "Instagram", icon: "InstagramLogo", urlPrefix: "instagram.com/", gradient: "from-[#f58529] via-[#dd2a7b] to-[#8134af]" },
  tiktok: { label: "TikTok", icon: "TiktokLogo", urlPrefix: "tiktok.com/@", gradient: "from-foreground to-foreground" },
  facebook: { label: "Facebook", icon: "FacebookLogo", urlPrefix: "facebook.com/", gradient: "from-[#1877f2] to-[#1877f2]" },
  twitter: { label: "X / Twitter", icon: "XLogo", urlPrefix: "x.com/", gradient: "from-foreground to-foreground" },
  youtube: { label: "YouTube", icon: "YoutubeLogo", urlPrefix: "youtube.com/@", gradient: "from-[#ff0000] to-[#cc0000]" },
  dribbble: { label: "Dribbble", icon: "DribbbleLogo", urlPrefix: "dribbble.com/", gradient: "from-[#ea4c89] to-[#ea4c89]" },
  website: { label: "Website", icon: "Globe", urlPrefix: "https://", gradient: "from-primary to-primary-glow" },
};

const defaultCard = {
  handle: "yogeshk",
  name: "Yogesh Karkar",
  jobTitle: "Owner",
  company: "Bitcode Infotech",
  location: "Navsari, Gujarat",
  email: "info@bitcodeinfotech.com",
  phone: "+91 90999 99775",
  bio: "I am a full time website developer with more than 10 years of experience",
  profilePicture: "https://images.unsplash.com/photo-1752738372136-2602aaafdcb7?w=400&h=400&fit=crop&crop=faces",
  coverPhoto: "https://images.unsplash.com/photo-1456300633423-f52385ce7bfd?w=800&h=400&fit=crop",
  logoColor: "243 75% 60%",
  links: [
    { id: "l1", platform: "linkedin", handle: "yogeshkarkar" },
    { id: "l2", platform: "github", handle: "yogesh-k" },
    { id: "l3", platform: "instagram", handle: "yogesh.k" },
    { id: "l4", platform: "tiktok", handle: "yogeshk" },
    { id: "l5", platform: "facebook", handle: "yogeshkarkar" },
  ],
};

export function getLinkLabel(platform, handle) {
  const p = PLATFORMS[platform];
  if (!p) return handle;
  return `${p.urlPrefix}${handle}`;
}

const CardContext = createContext(null);

export function CardProvider({ children }) {
  const [card, setCard] = useState(defaultCard);
  const [activeSection, setActiveSection] = useState("about");

  const updateField = useCallback((key, value) => {
    setCard((c) => ({ ...c, [key]: value }));
  }, []);

  const updateLinks = useCallback((links) => {
    setCard((c) => ({ ...c, links }));
  }, []);

  const addLink = useCallback((platform = "website") => {
    setCard((c) => ({
      ...c,
      links: [...c.links, { id: `l${Date.now()}`, platform, handle: "" }],
    }));
  }, []);

  const updateLink = useCallback((id, patch) => {
    setCard((c) => ({
      ...c,
      links: c.links.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    }));
  }, []);

  const removeLink = useCallback((id) => {
    setCard((c) => ({ ...c, links: c.links.filter((l) => l.id !== id) }));
  }, []);

  const value = useMemo(
    () => ({ card, updateField, updateLinks, addLink, updateLink, removeLink, activeSection, setActiveSection }),
    [card, updateField, updateLinks, addLink, updateLink, removeLink, activeSection]
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

export function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCard must be used within CardProvider");
  return ctx;
}
