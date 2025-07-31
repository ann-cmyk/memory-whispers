import { useState, useRef, useEffect } from "react";
import { ArrowLeft, MoreHorizontal, MessageCircle, Phone, Heart, Users, Calendar, Award, GraduationCap, Briefcase, ChevronRight, Plus, Edit2, QrCode, Share2, Star, Globe, ChevronLeft, Building2, Code2, Handshake, Send, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddMemoryFlow from "./AddMemoryFlow";
import PersonaManager from "./PersonaManager";
import TimelineEditor from "./TimelineEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import hoangPortrait from "@/assets/hoang-nam-tien-portrait.jpg";
import fptOffice1 from "@/assets/fpt-office-1.jpg";
import fptSoftware2 from "@/assets/fpt-software-2.jpg";
import graduationMemory from "@/assets/graduation-memory.jpg";
import fptTelecom3 from "@/assets/fpt-telecom-3.jpg";
import globalBusiness4 from "@/assets/global-business-4.jpg";

interface MemorialProfileProps {
  onOpenChat: () => void;
  onOpenCall: () => void;
}

const MemorialProfile = ({ onOpenChat, onOpenCall }: MemorialProfileProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("grid");
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [showPersonaManager, setShowPersonaManager] = useState(false);
  const [showTimelineEditor, setShowTimelineEditor] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showCondolenceForm, setShowCondolenceForm] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showExpandedAchievements, setShowExpandedAchievements] = useState(false);
  const [condolenceName, setCondolenceName] = useState("");
  const [condolenceMessage, setCondolenceMessage] = useState("");
  const achievementsRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      id: 1,
      icon: Building2,
      title: "Chủ tịch FPT Software",
      description: "Dẫn dắt FPT Software 'Go Global', tăng trưởng >30%/năm",
      type: "leadership",
      year: "2011-2020"
    },
    {
      id: 2,
      icon: TrendingUp,
      title: "Doanh thu 1 tỷ USD",
      description: "Đạt mốc doanh thu 1 tỷ USD tại FPT Distribution năm 2008",
      type: "achievement",
      year: "2008"
    },
    {
      id: 3,
      icon: Globe,
      title: "Fortune 500 Partners",
      description: "Hợp tác với hàng trăm tập đoàn Fortune 500 trên toàn cầu",
      type: "milestone",
      year: "2015-2020"
    },
    {
      id: 4,
      icon: Award,
      title: "Chủ tịch FPT Telecom",
      description: "Lãi kỷ lục hơn 1.900 tỷ đồng năm 2021",
      type: "innovation",
      year: "2020-2023"
    },
    {
      id: 5,
      icon: GraduationCap,
      title: "Giáo dục Đại học",
      description: "Phó Chủ tịch Hội đồng trường ĐH FPT, phụ trách sau đại học",
      type: "education",
      year: "2023-2025"
    },
    {
      id: 6,
      icon: Code2,
      title: "Kỹ sư CNTT",
      description: "Tốt nghiệp Đại học Bách khoa Hà Nội, chuyên ngành CNTT",
      type: "foundation",
      year: "1993"
    },
    {
      id: 7,
      icon: Handshake,
      title: "Tư duy đổi mới",
      description: "Triết lý 'Nghĩ khác, làm khác' - luôn tìm kiếm sự khác biệt",
      type: "philosophy",
      year: "1993-2025"
    },
    {
      id: 8,
      icon: Heart,
      title: "Lãnh đạo truyền cảm hứng",
      description: "Diễn giả được yêu thích, truyền cảm hứng cho thế hệ trẻ",
      type: "legacy",
      year: "2000-2025"
    }
  ];

  const [memories, setMemories] = useState([
    { id: 1, image: hoangPortrait, type: "photo", date: "2023-04-15", isAchievement: true, achievementTitle: "Phó Chủ tịch ĐH FPT", content: "Đảm nhiệm vị trí Phó Chủ tịch Hội đồng trường Đại học FPT" },
    { id: 2, image: fptOffice1, type: "photo", date: "2020-01-10", isAchievement: true, achievementTitle: "Chủ tịch FPT Telecom", content: "Bắt đầu hành trình dẫn dắt FPT Telecom đạt những thành tựu mới" },
    { id: 3, image: fptSoftware2, type: "photo", date: "2011-03-20", isAchievement: true, achievementTitle: "Chủ tịch FPT Software", content: "Khởi đầu chiến lược Go Global của FPT Software" },
    { id: 4, image: graduationMemory, type: "photo", date: "1993-07-15", isAchievement: true, achievementTitle: "Tốt nghiệp Bách khoa", content: "Tốt nghiệp Kỹ sư Công nghệ thông tin, ĐH Bách khoa Hà Nội" },
    { id: 5, image: fptTelecom3, type: "photo", date: "2021-12-31", isAchievement: true, achievementTitle: "Kỷ lục lợi nhuận", content: "FPT Telecom đạt lãi kỷ lục hơn 1.900 tỷ đồng" },
    { id: 6, image: globalBusiness4, type: "photo", date: "2018-06-10", isAchievement: false, content: "Hội nghị với đối tác Fortune 500" },
    { id: 7, image: fptOffice1, type: "photo", date: "2008-11-30", isAchievement: true, achievementTitle: "Mốc 1 tỷ USD", content: "FPT Distribution đạt doanh thu 1 tỷ USD" },
    { id: 8, image: fptSoftware2, type: "video", date: "2015-09-05", isAchievement: false, content: "Buổi chia sẻ với nhân viên về tầm nhìn Go Global" },
    { id: 9, image: graduationMemory, type: "photo", date: "2019-05-20", isAchievement: false, content: "Phát biểu tại lễ tốt nghiệp của sinh viên" },
    { id: 10, image: fptTelecom3, type: "photo", date: "2016-03-14", isAchievement: false, content: "Thăm và làm việc tại các chi nhánh" },
    { id: 11, image: globalBusiness4, type: "photo", date: "2017-08-22", isAchievement: false, content: "Gặp gỡ và thảo luận với khách hàng quốc tế" },
    { id: 12, image: hoangPortrait, type: "photo", date: "2025-07-30", isAchievement: false, content: "Những khoảnh khắc cuối cùng bên gia đình" },
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
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='white'/%3E%3Ctext x='50' y='50' text-anchor='middle' font-size='6'%3EHoàng Nam Tiến%3C/text%3E%3C/svg%3E";
  };

  const handleAddMemory = (memory: any) => {
    const newMemory = {
      ...memory,
      image: memory.files[0] ? URL.createObjectURL(memory.files[0]) : hoangPortrait
    };
    setMemories([newMemory, ...memories]);
  };

  const handleAddMilestone = (milestone: any) => {
    const newMemory = {
      id: milestone.id,
      image: milestone.files[0] ? URL.createObjectURL(milestone.files[0]) : hoangPortrait,
      type: "milestone",
      date: milestone.date,
      isAchievement: milestone.isAchievement,
      achievementTitle: milestone.isAchievement ? milestone.title : undefined,
      title: milestone.title,
      content: milestone.content
    };
    setMemories([newMemory, ...memories]);
  };

  const handleSendCondolence = () => {
    if (condolenceName.trim() && condolenceMessage.trim()) {
      setCondolenceName("");
      setCondolenceMessage("");
      setShowCondolenceForm(false);
      
      toast({
        title: "Lời chia buồn đã được gửi!",
        description: "Cảm ơn bạn đã chia sẻ tình cảm chân thành. Lời chia buồn của bạn đã trở thành một bong bóng kỷ niệm.",
        duration: 3000,
      });
      
      // Navigate to condolences page after sending
      setTimeout(() => {
        navigate('/condolences');
      }, 1500);
    }
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
          <h1 className="text-lg font-semibold text-foreground">Hoàng Nam Tiến</h1>
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
            onClick={() => navigate('/condolences')}
            className="text-memorial-primary hover:bg-memorial-primary/10"
          >
            <Heart className="h-5 w-5" />
          </Button>
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
            <AvatarImage src={hoangPortrait} alt="Hoàng Nam Tiến" />
            <AvatarFallback>HNT</AvatarFallback>
          </Avatar>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Hoàng Nam Tiến</h2>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              28/06/1969 - 31/07/2025
            </p>
            <p className="text-center max-w-sm text-muted-foreground leading-relaxed">
              Lãnh đạo kỳ cựu FPT, người thuyền trưởng đưa công nghệ Việt Nam vươn ra thế giới. 
              Một nhà lãnh đạo tài ba với tầm nhìn xa và trái tim nhân ái.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 text-center">
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">30+</p>
              <p className="text-sm text-muted-foreground">Năm FPT</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">500+</p>
              <p className="text-sm text-muted-foreground">Fortune 500</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">∞</p>
              <p className="text-sm text-muted-foreground">Kỷ niệm</p>
            </div>
          </div>

          {/* AI Interaction Button */}
          <div className="relative">
            <Button
              onClick={() => setShowAIMenu(!showAIMenu)}
              className="bg-memorial-primary hover:bg-memorial-primary/90 text-primary-foreground px-6 py-3 rounded-full"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Trò chuyện với ông Tiến
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
                  Nhắn tin
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

      {/* Simple Send Condolence Section */}
      <div className="px-6 py-6 bg-card/30">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground">Gửi lời chia buồn</h3>
            <p className="text-muted-foreground text-sm">
              Chia sẻ tình cảm của bạn. Lời chia buồn sẽ trở thành một bong bóng kỷ niệm.
            </p>
          </div>
          
          <Button
            onClick={() => setShowCondolenceForm(true)}
            className="bg-memorial-primary hover:bg-memorial-primary/90 text-primary-foreground px-8 py-3 rounded-full"
          >
            <Send className="h-4 w-4 mr-2" />
            Gửi lời chia buồn
          </Button>
          
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/condolences')}
              className="text-memorial-primary hover:bg-memorial-primary/10 text-sm"
            >
              <Heart className="h-4 w-4 mr-2" />
              Xem tất cả lời chia buồn
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Achievements - Expanded */}
      <div ref={achievementsRef} className="px-6 py-6 bg-card/30">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground text-center">Hành Trình Tự Hào</h3>
          
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
                <>Thu gọn <ChevronLeft className="h-4 w-4 ml-1" /></>
              ) : (
                <>Xem tất cả {achievements.length} <ChevronRight className="h-4 w-4 ml-1" /></>
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
            Thư viện
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
            Câu chuyện đời
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 pb-3 ${activeTab === "persona" ? "border-b-2 border-memorial-primary" : ""}`}
            onClick={() => setActiveTab("persona")}
          >
            Chân dung
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
              <h3 className="font-semibold text-foreground">Slideshow Dòng Thời Gian</h3>
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
                  Thêm khoảnh khắc
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
                    <AvatarImage src={hoangPortrait} />
                    <AvatarFallback>HNT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">Hoàng Nam Tiến</p>
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
                      Yêu thích
                    </Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Bình luận
                    </Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      <Share2 className="h-4 w-4 mr-1" />
                      Chia sẻ
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
              <h3 className="text-xl font-bold text-foreground">Hành Trình Cuộc Đời</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTimelineEditor(true)}
                className="text-memorial-primary border-memorial-primary/30"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Chỉnh sửa
              </Button>
            </div>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                <strong>Gia thế và tuổi thơ:</strong> Ông Hoàng Nam Tiến sinh ngày 28/06/1969 tại Nghệ An, 
                trong gia đình có truyền thống cách mạng. Cha ông là Thiếu tướng Hoàng Đan, mẹ là bà Nguyễn Thị An Vinh, 
                nguyên Phó Giám đốc Sở Ngoại thương Hà Nội.
              </p>
              <p>
                <strong>Học vấn và khởi đầu sự nghiệp:</strong> Tốt nghiệp Kỹ sư Công nghệ thông tin tại Đại học Bách khoa Hà Nội năm 1993, 
                ông gia nhập FPT ngay sau khi tốt nghiệp và bắt đầu hành trình sự nghiệp kéo dài hơn 3 thập kỷ.
              </p>
              <p>
                <strong>Thành tựu nổi bật:</strong> Từ một kỹ sư trẻ, ông đã vươn lên những vị trí lãnh đạo quan trọng nhất của FPT. 
                Đặc biệt, dưới sự lãnh đạo của ông, FPT Software đã "Go Global" và trở thành đối tác của hàng trăm tập đoàn Fortune 500.
              </p>
              <p>
                <strong>Triết lý và di sản:</strong> Với triết lý "Nghĩ khác, làm khác" và tâm niệm "làm khách hàng hạnh phúc", 
                ông đã để lại dấu ấn sâu đậm trong ngành công nghệ Việt Nam và truyền cảm hứng cho hàng nghìn nhân viên cũng như thế hệ trẻ.
              </p>
            </div>
          </Card>
        )}

        {activeTab === "persona" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground">Chân Dung Ông Tiến</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPersonaManager(true)}
                className="text-memorial-primary border-memorial-primary/30"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Quản lý
              </Button>
            </div>
            
            <div className="grid gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-memorial-primary/10">
                    <Heart className="h-5 w-5 text-memorial-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Tính cách</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">• Thẳng thắn, quyết liệt trong công việc</p>
                  <p className="text-sm text-muted-foreground">• Tư duy đổi mới, không ngại thách thức</p>
                  <p className="text-sm text-muted-foreground">• Luôn lấy khách hàng làm trung tâm</p>
                  <p className="text-sm text-muted-foreground">• Quan tâm, chăm sóc nhân viên như gia đình</p>
                  <p className="text-sm text-muted-foreground">• Có tầm nhìn xa và khả năng truyền cảm hứng</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-memorial-primary/10">
                    <Award className="h-5 w-5 text-memorial-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Thành tựu nghề nghiệp</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">• Chủ tịch FPT Software: Chiến lược Go Global thành công</p>
                  <p className="text-sm text-muted-foreground">• Chủ tịch FPT Telecom: Lãi kỷ lục 1.900 tỷ đồng</p>
                  <p className="text-sm text-muted-foreground">• Đạt doanh thu 1 tỷ USD tại FPT Distribution</p>
                  <p className="text-sm text-muted-foreground">• Hợp tác với hàng trăm tập đoàn Fortune 500</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-memorial-primary/10">
                    <GraduationCap className="h-5 w-5 text-memorial-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Đóng góp giáo dục</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">• Phó Chủ tịch Hội đồng trường ĐH FPT</p>
                  <p className="text-sm text-muted-foreground">• Phụ trách đào tạo sau đại học</p>
                  <p className="text-sm text-muted-foreground">• Nhấn mạnh tầm quan trọng của AI với thế hệ trẻ</p>
                  <p className="text-sm text-muted-foreground">• Diễn giả truyền cảm hứng được yêu thích</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-memorial-primary/10">
                    <Star className="h-5 w-5 text-memorial-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Những câu nói để đời</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">• "Nghĩ khác, làm khác"</p>
                  <p className="text-sm text-muted-foreground">• "Việc này khách hàng được lợi gì?"</p>
                  <p className="text-sm text-muted-foreground">• "Khách hàng có hài lòng không?"</p>
                  <p className="text-sm text-muted-foreground">• "Thế hệ trẻ cần làm chủ AI để dẫn dắt tương lai"</p>
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

      {/* Condolence Form Dialog */}
      <Dialog open={showCondolenceForm} onOpenChange={setShowCondolenceForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-memorial-primary" />
              Gửi lời chia buồn
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tên của bạn</label>
              <Input
                value={condolenceName}
                onChange={(e) => setCondolenceName(e.target.value)}
                placeholder="Nhập tên của bạn"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Lời chia buồn</label>
              <Textarea
                value={condolenceMessage}
                onChange={(e) => setCondolenceMessage(e.target.value)}
                placeholder="Chia sẻ những suy nghĩ của bạn về ông Tiến..."
                rows={4}
              />
            </div>
            <div className="text-xs text-muted-foreground bg-memorial-primary/5 p-3 rounded">
              💫 Lời chia buồn của bạn sẽ trở thành một bong bóng kỷ niệm đặc biệt, hòa cùng những tình cảm chân thành từ mọi người.
            </div>
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowCondolenceForm(false)}
              >
                Hủy
              </Button>
              <Button 
                onClick={handleSendCondolence}
                disabled={!condolenceName.trim() || !condolenceMessage.trim()}
                className="bg-memorial-primary hover:bg-memorial-primary/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Gửi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chia sẻ hồ sơ của ông Hoàng Nam Tiến</DialogTitle>
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
              Quét mã QR này để truy cập hồ sơ tưởng niệm của ông Hoàng Nam Tiến
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
                Sao chép link
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowQRCode(false)}
              >
                Đóng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemorialProfile;