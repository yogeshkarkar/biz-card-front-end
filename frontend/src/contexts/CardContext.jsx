import React, { createContext, useContext, useState, useCallback } from "react";

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
    { id: "linkedin", label: "linkedin.com/in/yogeshkarkar", icon: "LinkedinLogo" },
    { id: "github", label: "github.com/yogesh-k", icon: "GithubLogo" },
    { id: "instagram", label: "instagram.com/yogesh.k", icon: "InstagramLogo" },
    { id: "tiktok", label: "tiktok.com/@yogeshk", icon: "TiktokLogo" },
    { id: "facebook", label: "facebook.com/yogeshkarkar", icon: "FacebookLogo" },
  ],
};

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

  return (
    <CardContext.Provider value={{ card, updateField, updateLinks, activeSection, setActiveSection }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCard must be used within CardProvider");
  return ctx;
}
