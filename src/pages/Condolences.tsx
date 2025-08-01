import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Heart, Send, MessageCircle, Upload, Share2, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import hoangPortrait from "@/assets/hoang-nam-tien-portrait.jpg";

interface Condolence {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
  x: number;
  y: number;
  size: number;
  opacity: number;
  image?: string;
}

const Condolences = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCondolenceForm, setShowCondolenceForm] = useState(false);
  const [condolenceName, setCondolenceName] = useState("");
  const [condolenceMessage, setCondolenceMessage] = useState("");
  const [condolenceImage, setCondolenceImage] = useState<File | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [lastCondolence, setLastCondolence] = useState<Condolence | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [condolences, setCondolences] = useState<Condolence[]>([
    { 
      id: 1, 
      name: "Nguyễn Văn An", 
      message: "Một lãnh đạo tài ba, người thầy đã truyền cảm hứng cho nhiều thế hệ.", 
      timestamp: new Date('2025-08-01'),
      x: 20, y: 15, size: 0.8, opacity: 0.9
    },
    { 
      id: 2, 
      name: "Trần Thị Hoa", 
      message: "Ông là biểu tượng của sự đổi mới và tầm nhìn xa trong ngành công nghệ.", 
      timestamp: new Date('2025-08-01'),
      x: 70, y: 25, size: 1.0, opacity: 0.8
    },
    { 
      id: 3, 
      name: "Lê Minh Tuấn", 
      message: "Những đóng góp của ông cho FPT và ngành IT Việt Nam sẽ mãi được ghi nhớ.", 
      timestamp: new Date('2025-08-02'),
      x: 15, y: 60, size: 0.9, opacity: 0.7
    },
    { 
      id: 4, 
      name: "Phạm Thu Trang", 
      message: "Người lãnh đạo tài ba với tâm hồn nhân ái, luôn quan tâm đến nhân viên.", 
      timestamp: new Date('2025-08-02'),
      x: 85, y: 70, size: 0.85, opacity: 0.85
    },
    { 
      id: 5, 
      name: "Hoàng Minh Đức", 
      message: "Ông đã để lại dấu ấn sâu đậm trong lòng mỗi người làm công nghệ Việt Nam.", 
      timestamp: new Date('2025-08-02'),
      x: 50, y: 40, size: 1.1, opacity: 0.9
    },
    { 
      id: 6, 
      name: "Phan Thị Lan", 
      message: "Triết lý 'Nghĩ khác, làm khác' của ông sẽ mãi là nguồn cảm hứng cho chúng tôi.", 
      timestamp: new Date('2025-08-03'),
      x: 30, y: 85, size: 0.7, opacity: 0.6
    },
    { 
      id: 7, 
      name: "Đặng Văn Hùng", 
      message: "Cảm ơn ông đã dành tất cả tâm huyết cho sự phát triển của FPT và đất nước.", 
      timestamp: new Date('2025-08-03'),
      x: 75, y: 50, size: 0.95, opacity: 0.75
    },
    { 
      id: 8, 
      name: "Vũ Thị Mai", 
      message: "Ông không chỉ là một nhà lãnh đạo xuất sắc mà còn là một con người tốt bụng.", 
      timestamp: new Date('2025-08-03'),
      x: 10, y: 35, size: 0.8, opacity: 0.8
    }
  ]);

  // Generate random position for new condolence bubble
  const generateRandomPosition = () => ({
    x: Math.random() * 80 + 10, // 10-90% to avoid edges
    y: Math.random() * 70 + 15, // 15-85% to avoid edges
    size: 0.7 + Math.random() * 0.6, // 0.7-1.3
    opacity: 0.6 + Math.random() * 0.4 // 0.6-1.0
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCondolenceImage(file);
    }
  };

  const handleSendCondolence = () => {
    if (condolenceName.trim() && condolenceMessage.trim()) {
      const position = generateRandomPosition();
      const newCondolence: Condolence = {
        id: condolences.length + 1,
        name: condolenceName.trim(),
        message: condolenceMessage.trim(),
        timestamp: new Date(),
        image: condolenceImage ? URL.createObjectURL(condolenceImage) : undefined,
        ...position
      };
      setCondolences([...condolences, newCondolence]);
      setLastCondolence(newCondolence);
      setCondolenceName("");
      setCondolenceMessage("");
      setCondolenceImage(null);
      setShowCondolenceForm(false);
      
      toast({
        title: "Lời chia buồn đã được gửi!",
        description: "Cảm ơn bạn đã chia sẻ tình cảm chân thành.",
        duration: 3000,
      });
      
      // Show share dialog after sending
      setTimeout(() => setShowShareDialog(true), 1000);
    }
  };

  const shareToFacebook = () => {
    const text = encodeURIComponent(`Tôi vừa gửi lời chia buồn cho ông Hoàng Nam Tiến. "${lastCondolence?.message}"`);
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`Tôi vừa gửi lời chia buồn cho ông Hoàng Nam Tiến. "${lastCondolence?.message}" ${window.location.origin}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    toast({
      title: "Đã sao chép liên kết!",
      description: "Bạn có thể chia sẻ liên kết này với bạn bè.",
      duration: 2000,
    });
  };

  // Animate bubbles floating
  useEffect(() => {
    const interval = setInterval(() => {
      setCondolences(prev => prev.map(condolence => ({
        ...condolence,
        y: condolence.y + (Math.random() - 0.5) * 0.5,
        x: condolence.x + (Math.random() - 0.5) * 0.3,
        opacity: 0.6 + Math.sin(Date.now() * 0.001 + condolence.id) * 0.2
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-elegant relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm relative z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-foreground">Lời Chia Buồn</h1>
          <p className="text-sm text-muted-foreground">{condolences.length} lời chia buồn</p>
        </div>
        <Button 
          onClick={() => setShowCondolenceForm(true)}
          className="bg-memorial-primary hover:bg-memorial-primary/90 text-primary-foreground"
        >
          <Send className="h-4 w-4 mr-2" />
          Gửi
        </Button>
      </div>

      {/* Memorial Info */}
      <div className="text-center p-6 relative z-10">
        <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-memorial-primary/20">
          <AvatarImage src={hoangPortrait} alt="Hoàng Nam Tiến" />
          <AvatarFallback>HNT</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold text-foreground">Hoàng Nam Tiến</h2>
        <p className="text-muted-foreground">28/06/1969 - 31/07/2025</p>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          Những lời chia buồn chân thành từ gia đình, bạn bè và đồng nghiệp
        </p>
      </div>

      {/* Floating Condolence Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {condolences.map((condolence) => (
          <div
            key={condolence.id}
            className="absolute transition-all duration-3000 ease-in-out"
            style={{
              left: `${condolence.x}%`,
              top: `${condolence.y}%`,
              transform: `scale(${condolence.size})`,
              opacity: condolence.opacity,
            }}
          >
            <Card className="p-4 max-w-xs bg-memorial-primary/10 border-memorial-primary/20 backdrop-blur-sm hover:bg-memorial-primary/15 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-memorial-primary/20 flex items-center justify-center">
                    <Heart className="h-4 w-4 text-memorial-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{condolence.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {condolence.timestamp.toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {condolence.message.length > 100 
                    ? `${condolence.message.substring(0, 100)}...` 
                    : condolence.message
                  }
                </p>
                {condolence.image && (
                  <img 
                    src={condolence.image} 
                    alt="Hình ảnh chia buồn" 
                    className="w-full h-20 object-cover rounded-md mt-2"
                  />
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-memorial-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-memorial-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-memorial-primary/3 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Send Condolence Dialog */}
      <Dialog open={showCondolenceForm} onOpenChange={setShowCondolenceForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-memorial-primary" />
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Hình ảnh (tùy chọn)</label>
              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {condolenceImage ? condolenceImage.name : "Chọn hình ảnh"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              {condolenceImage && (
                <img 
                  src={URL.createObjectURL(condolenceImage)} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-md"
                />
              )}
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

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-memorial-primary" />
              Chia sẻ lời chia buồn
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <p className="text-sm text-muted-foreground text-center">
              Cảm ơn bạn đã gửi lời chia buồn chân thành. Hãy chia sẻ để lan tỏa tình cảm đến nhiều người hơn.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={shareToFacebook}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button 
                onClick={shareToTwitter}
                className="bg-black hover:bg-gray-800 text-white"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
            <Button 
              onClick={copyLink}
              variant="outline"
              className="w-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Sao chép liên kết
            </Button>
            <Button 
              onClick={() => setShowShareDialog(false)}
              variant="ghost"
              className="w-full"
            >
              Bỏ qua
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Condolences;