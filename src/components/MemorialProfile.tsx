import { useState, useRef, useEffect } from "react";
import { ArrowLeft, MoreHorizontal, MessageCircle, Phone, Heart, Users, Calendar, Award, GraduationCap, Briefcase, ChevronRight, Plus, Edit2, QrCode, Share2, Music, Star, Globe, ChevronLeft } from "lucide-react";
import AddMemoryFlow from "./AddMemoryFlow";
import PersonaManager from "./PersonaManager";
import TimelineEditor from "./TimelineEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import mjPortrait from "@/assets/mj-portrait.jpg";
import mjMemory1 from "@/assets/mj-memory-1.jpg";
import mjMemory2 from "@/assets/mj-memory-2.jpg";
import mjMemory3 from "@/assets/mj-memory-3.jpg";
import mjMemory4 from "@/assets/mj-memory-4.jpg";
import mjMemory5 from "@/assets/mj-memory-5.jpg";
import mjMemory6 from "@/assets/mj-memory-6.jpg";

interface MemorialProfileProps {
  onOpenChat: () => void;
  onOpenCall: () => void;
}

const MemorialProfile = ({ onOpenChat, onOpenCall }: MemorialProfileProps) => {
  const [activeTab, setActiveTab] = useState("grid");
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [showPersonaManager, setShowPersonaManager] = useState(false);
  const [showTimelineEditor, setShowTimelineEditor] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showExpandedAchievements, setShowExpandedAchievements] = useState(false);
  const achievementsRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      id: 1,
      icon: Music,
      title: "King of Pop",
      description: "Biểu tượng âm nhạc toàn cầu, người thay đổi nền công nghiệp giải trí",
      type: "music",
      year: "1970s-2009"
    },
    {
      id: 2,
      icon: Award,
      title: "13 Grammy Awards",
      description: "Đoạt giải Grammy nhiều nhất trong sự nghiệp solo",
      type: "achievement",
      year: "1984-1996"
    },
    {
      id: 3,
      icon: Star,
      title: "Album Thriller",
      description: "Album bán chạy nhất mọi thời đại với 66 triệu bản trên toàn thế giới",
      type: "milestone",
      year: "1982"
    },
    {
      id: 4,
      icon: Globe,
      title: "Moonwalk Dance",
      description: "Tạo ra điệu nhảy iconic làm say mê hàng triệu người hâm mộ",
      type: "innovation",
      year: "1983"
    },
    {
      id: 5,
      icon: Heart,
      title: "Humanitarian Work",
      description: "Từ thiện cho 39 tổ chức, quyên góp hơn 300 triệu USD",
      type: "charity",
      year: "1980-2009"
    },
    {
      id: 6,
      icon: Star,
      title: "Rock & Roll Hall of Fame",
      description: "Được vinh danh 2 lần: cùng Jackson 5 và sự nghiệp solo",
      type: "honor",
      year: "1997, 2001"
    },
    {
      id: 7,
      icon: Music,
      title: "MTV Video Music Awards",
      description: "Nhận được Video Vanguard Award và nhiều giải thưởng khác",
      type: "recognition",
      year: "1988"
    },
    {
      id: 8,
      icon: Globe,
      title: "Global Icon",
      description: "Ảnh hưởng văn hóa vượt qua biên giới, tạo cảm hứng cho hàng triệu người",
      type: "legacy",
      year: "1958-2009"
    }
  ];

  const [memories, setMemories] = useState([
    { id: 1, image: mjMemory1, type: "photo", date: "2009-06-25", isAchievement: true, achievementTitle: "This Is It rehearsals", content: "Final rehearsals for the comeback tour that would have been legendary" },
    { id: 2, image: mjMemory2, type: "video", date: "1983-05-16", isAchievement: true, achievementTitle: "First Moonwalk on TV", content: "Motown 25th anniversary special - the moment that changed everything" },
    { id: 3, image: mjMemory3, type: "photo", date: "1982-11-30", isAchievement: true, achievementTitle: "Thriller Album Release", content: "The album that would become the best-selling album of all time" },
    { id: 4, image: mjMemory4, type: "photo", date: "1988-01-01", isAchievement: false, content: "Recording sessions during Bad era" },
    { id: 5, image: mjMemory5, type: "video", date: "1995-06-15", isAchievement: true, achievementTitle: "HIStory Album", content: "Double album featuring greatest hits and new material" },
    { id: 6, image: mjMemory6, type: "photo", date: "2001-10-30", isAchievement: false, content: "Behind the scenes during music video production" },
    { id: 7, image: mjMemory1, type: "photo", date: "1987-03-12", isAchievement: false, content: "Studio work on Bad album" },
    { id: 8, image: mjMemory2, type: "photo", date: "1984-07-05", isAchievement: true, achievementTitle: "Victory Tour", content: "Reunion tour with Jackson 5 brothers" },
    { id: 9, image: mjMemory3, type: "video", date: "1991-11-14", isAchievement: true, achievementTitle: "Black or White premiere", content: "Groundbreaking music video with morphing technology" },
    { id: 10, image: mjMemory4, type: "photo", date: "1996-05-20", isAchievement: false, content: "Charity work and humanitarian efforts" },
    { id: 11, image: mjMemory5, type: "photo", date: "1993-02-01", isAchievement: true, achievementTitle: "Super Bowl XXVII", content: "Historic halftime show performance" },
    { id: 12, image: mjMemory6, type: "video", date: "1979-12-18", isAchievement: false, content: "Early solo career moments" },
  ]);

  // Auto slideshow for timeline
  useEffect(() => {
    if (activeTab === "timeline") {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % memories.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeTab, memories.length]);

  const generateQRCode = () => {
    // In a real app, this would generate an actual QR code
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='white'/%3E%3Ctext x='50' y='50' text-anchor='middle' font-size='8'%3EMJ Profile%3C/text%3E%3C/svg%3E";
  };

  const handleAddMemory = (memory: any) => {
    const newMemory = {
      ...memory,
      image: memory.files[0] ? URL.createObjectURL(memory.files[0]) : mjMemory1
    };
    setMemories([newMemory, ...memories]);
  };

  const handleAddMilestone = (milestone: any) => {
    const newMemory = {
      id: milestone.id,
      image: milestone.files[0] ? URL.createObjectURL(milestone.files[0]) : mjMemory1,
      type: "milestone",
      date: milestone.date,
      isAchievement: milestone.isAchievement,
      achievementTitle: milestone.isAchievement ? milestone.title : undefined,
      title: milestone.title,
      content: milestone.content
    };
    setMemories([newMemory, ...memories]);
  };

  const scrollToAchievements = () => {
    achievementsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-elegant">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-foreground">Michael Jackson</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-memorial-primary hover:bg-memorial-primary/10"
            onClick={scrollToAchievements}
          >
            <Award className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowQRCode(true)}
          >
            <QrCode className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 py-8">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32 border-4 border-memorial-primary/20">
            <AvatarImage src={mjPortrait} alt="Michael Jackson" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Michael Jackson</h2>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              August 29, 1958 - June 25, 2009
            </p>
            <p className="text-center max-w-sm text-muted-foreground leading-relaxed">
              The King of Pop. A musical genius who touched millions of hearts and changed the world forever through his art, dance, and humanitarian spirit.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 text-center">
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">750M+</p>
              <p className="text-sm text-muted-foreground">Albums Sold</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">1.2B</p>
              <p className="text-sm text-muted-foreground">Fans Worldwide</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">∞</p>
              <p className="text-sm text-muted-foreground">Eternal Love</p>
            </div>
          </div>

          {/* AI Interaction Button */}
          <div className="relative">
            <Button
              onClick={() => setShowAIMenu(!showAIMenu)}
              className="bg-memorial-primary hover:bg-memorial-primary/90 text-primary-foreground px-6 py-3 rounded-full"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Talk to the King
            </Button>
            
            {showAIMenu && (
              <Card className="absolute top-14 left-1/2 transform -translate-x-1/2 p-2 space-y-2 z-10">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onOpenChat();
                    setShowAIMenu(false);
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onOpenCall();
                    setShowAIMenu(false);
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Featured Achievements - Expanded */}
      <div ref={achievementsRef} className="px-6 py-6 bg-card/30">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground text-center">Legendary Achievements</h3>
          
          {!showExpandedAchievements ? (
            // Collapsed view - show 4 in grid
            <div className="grid grid-cols-2 gap-4">
              {achievements.slice(0, 4).map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <Card key={achievement.id} className="p-4 bg-gradient-to-br from-memorial-primary/5 to-memorial-accent/5 border-memorial-primary/20">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="p-3 rounded-full bg-memorial-primary/10">
                        <IconComponent className="h-6 w-6 text-memorial-primary" />
                      </div>
                      <h4 className="font-semibold text-sm text-foreground">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
                      {achievement.year && (
                        <Badge variant="secondary" className="text-xs">{achievement.year}</Badge>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            // Expanded view - show all in grid
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <Card key={achievement.id} className="p-4 bg-gradient-to-br from-memorial-primary/5 to-memorial-accent/5 border-memorial-primary/20">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="p-3 rounded-full bg-memorial-primary/10">
                        <IconComponent className="h-6 w-6 text-memorial-primary" />
                      </div>
                      <h4 className="font-semibold text-sm text-foreground">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-3">{achievement.description}</p>
                      {achievement.year && (
                        <Badge variant="secondary" className="text-xs">{achievement.year}</Badge>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
          
          <div className="text-center">
            <Button 
              variant="ghost" 
              className="text-memorial-primary hover:bg-memorial-primary/10"
              onClick={() => setShowExpandedAchievements(!showExpandedAchievements)}
            >
              {showExpandedAchievements ? (
                <>Show Less <ChevronLeft className="h-4 w-4 ml-1" /></>
              ) : (
                <>Show All {achievements.length} <ChevronRight className="h-4 w-4 ml-1" /></>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-6">
        <div className="flex border-b border-border">
          <Button
            variant="ghost"
            className={`flex-1 pb-3 ${activeTab === "grid" ? "border-b-2 border-memorial-primary" : ""}`}
            onClick={() => setActiveTab("grid")}
          >
            Gallery
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 pb-3 ${activeTab === "timeline" ? "border-b-2 border-memorial-primary" : ""}`}
            onClick={() => setActiveTab("timeline")}
          >
            Timeline
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 pb-3 ${activeTab === "story" ? "border-b-2 border-memorial-primary" : ""}`}
            onClick={() => setActiveTab("story")}
          >
            Life Story
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 pb-3 ${activeTab === "persona" ? "border-b-2 border-memorial-primary" : ""}`}
            onClick={() => setActiveTab("persona")}
          >
            Legacy
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "grid" && (
          <div className="grid grid-cols-3 gap-2">
            {memories.map((memory) => (
              <div key={memory.id} className="relative aspect-square">
                <img
                  src={memory.image}
                  alt="Memory"
                  className="w-full h-full object-cover rounded-lg"
                />
                {memory.type === "video" && (
                  <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground">Timeline Slideshow</h3>
              <div className="flex gap-2">
                <div className="text-xs text-muted-foreground">
                  {currentSlideIndex + 1} / {memories.length}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTimelineEditor(true)}
                  className="text-memorial-primary border-memorial-primary/30"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Moment
                </Button>
              </div>
            </div>
            
            {/* Slideshow */}
            <div className="relative">
              <Card className={`p-6 space-y-4 transition-all duration-500 ${
                memories[currentSlideIndex]?.isAchievement 
                  ? 'border-memorial-primary/30 bg-gradient-to-br from-memorial-primary/5 to-memorial-accent/5' 
                  : ''
              }`}>
                {memories[currentSlideIndex]?.isAchievement && (
                  <div className="absolute top-4 right-4">
                    <div className="p-2 rounded-full bg-memorial-primary/20">
                      <Award className="h-5 w-5 text-memorial-primary" />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={mjPortrait} />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">Michael Jackson</p>
                    <p className="text-muted-foreground">{memories[currentSlideIndex]?.date}</p>
                    {memories[currentSlideIndex]?.isAchievement && memories[currentSlideIndex]?.achievementTitle && (
                      <p className="text-memorial-primary font-semibold mt-1 flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {memories[currentSlideIndex]?.achievementTitle}
                      </p>
                    )}
                  </div>
                </div>
                
                <img 
                  src={memories[currentSlideIndex]?.image} 
                  alt="Memory" 
                  className="w-full rounded-lg max-h-80 object-cover" 
                />
                
                {memories[currentSlideIndex]?.content && (
                  <p className="text-foreground leading-relaxed">
                    {memories[currentSlideIndex].content}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      <Heart className="h-4 w-4 mr-1" />
                      Love
                    </Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Manual navigation */}
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + memories.length) % memories.length)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % memories.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center gap-1 mt-3">
                {memories.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlideIndex ? 'bg-memorial-primary' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentSlideIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "story" && (
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-foreground">The King's Journey</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTimelineEditor(true)}
                className="text-memorial-primary border-memorial-primary/30"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Michael Joseph Jackson was born on August 29, 1958, in Gary, Indiana. From the tender age of five, 
                he captivated audiences as the lead singer of the Jackson 5, showing a talent that was nothing short of extraordinary.
              </p>
              <p>
                His solo career launched him into the stratosphere of global fame. The 1982 album "Thriller" became the 
                best-selling album of all time, featuring iconic tracks like "Billie Jean," "Beat It," and the title track "Thriller."
              </p>
              <p>
                Beyond his musical genius, Michael was a humanitarian who used his platform to spread messages of love, 
                unity, and healing. His contributions to music, dance, and fashion continue to influence artists worldwide.
              </p>
              <p>
                Though he left us too soon on June 25, 2009, his legacy lives on in every moonwalk, every "hee-hee," 
                and in the hearts of millions who were touched by his artistry and compassion.
              </p>
            </div>
          </Card>
        )}

        {activeTab === "persona" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground">Michael's Legacy</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPersonaManager(true)}
                className="text-memorial-primary border-memorial-primary/30"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Manage
              </Button>
            </div>
            
            <div className="grid gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-memorial-primary/10">
                    <Heart className="h-5 w-5 text-memorial-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Personality</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">• Gentle and kind-hearted soul</p>
                  <p className="text-sm text-muted-foreground">• Perfectionist in his craft</p>
                  <p className="text-sm text-muted-foreground">• Deeply empathetic and caring</p>
                  <p className="text-sm text-muted-foreground">• Child-like wonder and curiosity</p>
                  <p className="text-sm text-muted-foreground">• Dedicated to healing the world</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-memorial-primary/10">
                    <Music className="h-5 w-5 text-memorial-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Musical Genius</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">• Master of Pop, R&B, Soul, and Rock</p>
                  <p className="text-sm text-muted-foreground">• Innovative producer and songwriter</p>
                  <p className="text-sm text-muted-foreground">• Revolutionary music video creator</p>
                  <p className="text-sm text-muted-foreground">• Influenced countless artists worldwide</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-memorial-primary/10">
                    <Globe className="h-5 w-5 text-memorial-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Dance Innovation</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">• Creator of the legendary Moonwalk</p>
                  <p className="text-sm text-muted-foreground">• Anti-gravity lean technique</p>
                  <p className="text-sm text-muted-foreground">• Smooth Criminal signature moves</p>
                  <p className="text-sm text-muted-foreground">• Fusion of various dance styles</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-memorial-primary/10">
                    <Heart className="h-5 w-5 text-memorial-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Personal Interests</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">• Love for children and animals</p>
                  <p className="text-sm text-muted-foreground">• Art collecting and appreciation</p>
                  <p className="text-sm text-muted-foreground">• Studying great entertainers</p>
                  <p className="text-sm text-muted-foreground">• Theme park enthusiast</p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-memorial-primary hover:bg-memorial-primary/90 shadow-elegant z-40"
        onClick={() => setShowAddMemory(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Modals */}
      {showAddMemory && (
        <AddMemoryFlow
          onClose={() => setShowAddMemory(false)}
          onSave={handleAddMemory}
        />
      )}

      {showPersonaManager && (
        <PersonaManager
          onClose={() => setShowPersonaManager(false)}
        />
      )}

      {showTimelineEditor && (
        <TimelineEditor
          onClose={() => setShowTimelineEditor(false)}
          onSave={handleAddMilestone}
        />
      )}

      {/* QR Code Dialog */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Michael Jackson's Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 p-6">
            <div className="w-48 h-48 bg-white rounded-lg p-4 border">
              <img 
                src={generateQRCode()} 
                alt="QR Code" 
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code to visit Michael Jackson's memorial profile
            </p>
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowQRCode(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemorialProfile;