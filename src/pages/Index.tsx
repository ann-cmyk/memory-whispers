import { useState } from "react";
import MemorialProfile from "@/components/MemorialProfile";
import AIChat from "@/components/AIChat";
import AICall from "@/components/AICall";

type AppState = "profile" | "chat" | "call";

const Index = () => {
  const [currentView, setCurrentView] = useState<AppState>("profile");

  const handleOpenChat = () => setCurrentView("chat");
  const handleOpenCall = () => setCurrentView("call");
  const handleBackToProfile = () => setCurrentView("profile");

  if (currentView === "chat") {
    return (
      <AIChat 
        onBack={handleBackToProfile}
        onOpenCall={handleOpenCall}
      />
    );
  }

  if (currentView === "call") {
    return (
      <AICall onEndCall={handleBackToProfile} />
    );
  }

  return (
    <MemorialProfile 
      onOpenChat={handleOpenChat}
      onOpenCall={handleOpenCall}
    />
  );
};

export default Index;
