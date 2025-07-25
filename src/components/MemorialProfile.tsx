import { useState, useRef } from "react";
import { ArrowLeft, MoreHorizontal, MessageCircle, Phone, Heart, Users, Calendar, Award, GraduationCap, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import samplePortrait from "@/assets/sample-portrait.jpg";
import familyMemory1 from "@/assets/family-memory-1.jpg";
import familyMemory2 from "@/assets/family-memory-2.jpg";
import familyMemory3 from "@/assets/family-memory-3.jpg";

interface MemorialProfileProps {
  onOpenChat: () => void;
  onOpenCall: () => void;
}

const MemorialProfile = ({ onOpenChat, onOpenCall }: MemorialProfileProps) => {
  const [activeTab, setActiveTab] = useState("grid");
  const [showAIMenu, setShowAIMenu] = useState(false);
  const achievementsRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      id: 1,
      icon: GraduationCap,
      title: "Thạc sĩ Mỹ thuật",
      description: "Tốt nghiệp loại xuất sắc Đại học Mỹ thuật Việt Nam",
      type: "education"
    },
    {
      id: 2,
      icon: Award,
      title: "Giải thưởng Nghệ sĩ ưu tú",
      description: "Vinh danh đóng góp trong lĩnh vực giáo dục nghệ thuật",
      type: "achievement"
    },
    {
      id: 3,
      icon: Briefcase,
      title: "Hiệu trưởng trường THPT Nghệ thuật",
      description: "Lãnh đạo trường trong 15 năm, đào tạo hàng nghìn học sinh",
      type: "career"
    },
    {
      id: 4,
      icon: Heart,
      title: "Gia đình hạnh phúc",
      description: "Nuôi dạy 3 người con thành tài, có cuộc sống viên mãn",
      type: "family"
    }
  ];

  const memories = [
    { id: 1, image: familyMemory1, type: "photo", date: "2024-01-15", isAchievement: false },
    { id: 2, image: familyMemory2, type: "photo", date: "2023-12-25", isAchievement: false },
    { id: 3, image: familyMemory3, type: "video", date: "2023-11-20", isAchievement: true, achievementTitle: "Lễ trao giải Nghệ sĩ ưu tú" },
    { id: 4, image: familyMemory1, type: "photo", date: "2023-10-10", isAchievement: false },
    { id: 5, image: familyMemory2, type: "photo", date: "2023-09-05", isAchievement: true, achievementTitle: "Kỷ niệm 40 năm công tác" },
    { id: 6, image: familyMemory3, type: "photo", date: "2023-08-15", isAchievement: false },
  ];

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
          <h1 className="text-lg font-semibold text-foreground">Nguyễn Văn Minh</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-memorial-primary hover:bg-memorial-primary/10"
            onClick={scrollToAchievements}
          >
            <Award className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Profile Info */}
      <div className="px-6 py-8">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32 border-4 border-memorial-primary/20">
            <AvatarImage src={samplePortrait} alt="Nguyễn Văn Minh" />
            <AvatarFallback>NVM</AvatarFallback>
          </Avatar>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Nguyễn Văn Minh</h2>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              1960 - 2024
            </p>
            <p className="text-center max-w-sm text-muted-foreground leading-relaxed">
              Người cha, người chồng kính yêu. Một tâm hồn yêu nghệ thuật và luôn sống hết mình vì gia đình.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 text-center">
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Kỷ niệm</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground">Người tưởng nhớ</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">432</p>
              <p className="text-sm text-muted-foreground">Vòng tay yêu thương</p>
            </div>
          </div>

          {/* AI Interaction Button */}
          <div className="relative">
            <Button
              onClick={() => setShowAIMenu(!showAIMenu)}
              className="bg-memorial-primary hover:bg-memorial-primary/90 text-primary-foreground px-6 py-3 rounded-full"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Trò chuyện & Tưởng nhớ
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
                  Trò chuyện
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
                  Gọi điện
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Featured Achievements */}
      <div ref={achievementsRef} className="px-6 py-6 bg-card/30">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground text-center">Hành Trình Tự Hào</h3>
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <CarouselItem key={achievement.id}>
                    <Card className="p-4 h-32 flex flex-col justify-center space-y-2 bg-gradient-to-br from-memorial-primary/5 to-memorial-accent/5 border-memorial-primary/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-memorial-primary/10">
                          <IconComponent className="h-5 w-5 text-memorial-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-foreground truncate">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="text-center">
            <Button variant="ghost" className="text-memorial-primary hover:bg-memorial-primary/10">
              Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
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
            Lưới Kỷ niệm
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 pb-3 ${activeTab === "timeline" ? "border-b-2 border-memorial-primary" : ""}`}
            onClick={() => setActiveTab("timeline")}
          >
            Dòng thời gian
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 pb-3 ${activeTab === "story" ? "border-b-2 border-memorial-primary" : ""}`}
            onClick={() => setActiveTab("story")}
          >
            Câu chuyện cuộc đời
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
            {memories.map((memory) => (
              <Card 
                key={memory.id} 
                className={`p-4 space-y-3 relative ${
                  memory.isAchievement 
                    ? 'border-memorial-primary/30 bg-gradient-to-br from-memorial-primary/5 to-memorial-accent/5' 
                    : ''
                }`}
              >
                {memory.isAchievement && (
                  <div className="absolute top-3 right-3">
                    <div className="p-1 rounded-full bg-memorial-primary/20">
                      <Award className="h-4 w-4 text-memorial-primary" />
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={samplePortrait} />
                    <AvatarFallback>NVM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">Nguyễn Văn Minh</p>
                    <p className="text-sm text-muted-foreground">{memory.date}</p>
                    {memory.isAchievement && memory.achievementTitle && (
                      <p className="text-sm font-semibold text-memorial-primary mt-1">
                        🏆 {memory.achievementTitle}
                      </p>
                    )}
                  </div>
                </div>
                <img src={memory.image} alt="Memory" className="w-full rounded-lg" />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <Heart className="h-4 w-4 mr-1" />
                    Yêu thương
                  </Button>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Bình luận
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "story" && (
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-foreground">Câu chuyện cuộc đời</h3>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Nguyễn Văn Minh sinh năm 1960 tại một gia đình nông dân nghèo ở Hà Nội. 
                Từ nhỏ, ông đã thể hiện tài năng đặc biệt về hội họa và âm nhạc.
              </p>
              <p>
                Sau khi tốt nghiệp Đại học Mỹ thuật, ông đã dành cả cuộc đời để giảng dạy 
                và truyền đạt tình yêu nghệ thuật cho thế hệ trẻ.
              </p>
              <p>
                Là một người cha tuyệt vời, ông luôn ở bên cạnh gia đình trong mọi hoàn cảnh. 
                Tình yêu thương và sự hy sinh của ông sẽ mãi mãi được con cháu ghi nhớ.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MemorialProfile;