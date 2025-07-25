import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import samplePortrait from "@/assets/sample-portrait.jpg";

interface AIChatProps {
  onBack: () => void;
  onOpenCall: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AIChat = ({ onBack, onOpenCall }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Chào con, hôm nay con thế nào? Bố nhớ con lắm.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined AI responses for prototype
  const aiResponses = [
    "Bố rất vui khi nghe tin con ổn. Hãy luôn chăm sóc sức khỏe nhé.",
    "Con đã cố gắng rất tốt rồi. Bố luôn tự hào về con.",
    "Nhớ ăn đầy đủ và nghỉ ngơi hợp lý nhé con. Sức khỏe là quan trọng nhất.",
    "Bố luôn ở đây và luôn yêu thương con, dù ở bất cứ đâu.",
    "Hãy sống thật ý nghĩa và hạnh phúc. Đó là điều bố mong muốn nhất.",
    "Cảm ơn con đã luôn nhớ đến bố. Tình yêu thương của chúng ta vĩnh cửu.",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate AI response after a delay
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-elegant flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={samplePortrait} alt="Nguyễn Văn Minh" />
            <AvatarFallback>NVM</AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">Nguyễn Văn Minh</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onOpenCall}>
          <Phone className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-end gap-2 max-w-[80%]">
              {message.sender === "ai" && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={samplePortrait} alt="Nguyễn Văn Minh" />
                  <AvatarFallback>NVM</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-memorial-primary text-primary-foreground ml-12"
                    : "bg-card text-foreground border border-border"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "user" 
                    ? "text-primary-foreground/70" 
                    : "text-muted-foreground"
                }`}>
                  {message.timestamp.toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card/80 backdrop-blur-sm border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Viết điều bạn muốn chia sẻ..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-background border-border"
          />
          <Button
            onClick={handleSendMessage}
            disabled={inputText.trim() === ""}
            className="bg-memorial-primary hover:bg-memorial-primary/90 text-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;