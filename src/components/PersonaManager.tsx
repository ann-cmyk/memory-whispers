import { useState } from "react";
import { Plus, Edit2, X, Heart, Trophy, Music, BookOpen, Coffee, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PersonaCard {
  id: number;
  title: string;
  content: string;
  icon: string;
}

interface PersonaManagerProps {
  onClose: () => void;
}

const PersonaManager = ({ onClose }: PersonaManagerProps) => {
  const [showEditor, setShowEditor] = useState(false);
  const [editingCard, setEditingCard] = useState<PersonaCard | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Heart");

  const [personas, setPersonas] = useState<PersonaCard[]>([
    {
      id: 1,
      title: "Tính cách",
      content: "Hài hước, dí dỏm\nLuôn quan tâm đến mọi người\nNóng tính nhưng rất mau quên\nTrách nhiệm và đáng tin cậy",
      icon: "Heart"
    },
    {
      id: 2,
      title: "Thành tựu",
      content: "Giải nhất học sinh giỏi Văn cấp thành phố 1980\nXây dựng thành công trường THPT Nghệ thuật\nNuôi dạy 3 người con thành tài\nĐào tạo hàng nghìn học sinh",
      icon: "Trophy"
    },
    {
      id: 3,
      title: "Sở thích",
      content: "Hội họa và vẽ tranh phong cảnh\nNghe nhạc cổ điển\nĐọc sách văn học\nLàm vườn vào cuối tuần",
      icon: "Star"
    }
  ]);

  const iconOptions = [
    { name: "Heart", component: Heart, label: "Tính cách" },
    { name: "Trophy", component: Trophy, label: "Thành tựu" },
    { name: "Music", component: Music, label: "Âm nhạc" },
    { name: "BookOpen", component: BookOpen, label: "Sách" },
    { name: "Coffee", component: Coffee, label: "Sở thích" },
    { name: "Star", component: Star, label: "Đặc biệt" }
  ];

  const predefinedTitles = [
    "Tính cách", "Thành tựu", "Sở thích", "Âm nhạc yêu thích", 
    "Phim ảnh yêu thích", "Những câu nói để đời", "Món ăn yêu thích",
    "Ký ức đẹp", "Giá trị sống"
  ];

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find(i => i.name === iconName);
    return icon ? icon.component : Heart;
  };

  const handleAddNew = () => {
    setEditingCard(null);
    setTitle("");
    setContent("");
    setSelectedIcon("Heart");
    setShowEditor(true);
  };

  const handleEdit = (card: PersonaCard) => {
    setEditingCard(card);
    setTitle(card.title);
    setContent(card.content);
    setSelectedIcon(card.icon);
    setShowEditor(true);
  };

  const handleSave = () => {
    if (editingCard) {
      setPersonas(personas.map(p => 
        p.id === editingCard.id 
          ? { ...p, title, content, icon: selectedIcon }
          : p
      ));
    } else {
      const newCard: PersonaCard = {
        id: Date.now(),
        title,
        content,
        icon: selectedIcon
      };
      setPersonas([...personas, newCard]);
    }
    setShowEditor(false);
  };

  const handleDelete = (id: number) => {
    setPersonas(personas.filter(p => p.id !== id));
  };

  if (showEditor) {
    return (
      <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
        <div className="min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Button variant="ghost" size="icon" onClick={() => setShowEditor(false)}>
              <X className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">
              {editingCard ? "Chỉnh sửa" : "Thêm hạng mục mới"}
            </h3>
            <Button onClick={handleSave} className="bg-memorial-primary hover:bg-memorial-primary/90">
              Lưu
            </Button>
          </div>

          <div className="p-4 space-y-6">
            {/* Predefined titles */}
            <div className="space-y-2">
              <Label>Tiêu đề gợi ý</Label>
              <div className="flex flex-wrap gap-2">
                {predefinedTitles.map((predefinedTitle) => (
                  <Button
                    key={predefinedTitle}
                    variant="outline"
                    size="sm"
                    onClick={() => setTitle(predefinedTitle)}
                    className="text-xs"
                  >
                    {predefinedTitle}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom title */}
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề thẻ</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề tùy chỉnh..."
              />
            </div>

            {/* Icon selection */}
            <div className="space-y-2">
              <Label>Chọn biểu tượng</Label>
              <div className="grid grid-cols-3 gap-2">
                {iconOptions.map((option) => {
                  const IconComponent = option.component;
                  return (
                    <Button
                      key={option.name}
                      variant={selectedIcon === option.name ? "default" : "outline"}
                      className="h-16 flex-col gap-1"
                      onClick={() => setSelectedIcon(option.name)}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="text-xs">{option.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập nội dung, mỗi dòng một ý..."
                className="min-h-[200px]"
              />
              <p className="text-xs text-muted-foreground">
                Mẹo: Mỗi dòng sẽ hiển thị như một mục riêng biệt
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold">Quản lý Chân dung</h3>
          <Button onClick={handleAddNew} size="icon" className="bg-memorial-primary hover:bg-memorial-primary/90">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {personas.map((persona) => {
            const IconComponent = getIconComponent(persona.icon);
            return (
              <Card key={persona.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-memorial-primary/10">
                      <IconComponent className="h-5 w-5 text-memorial-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">{persona.title}</h4>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(persona)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(persona.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  {persona.content.split('\n').filter(Boolean).map((line, index) => (
                    <p key={index} className="text-sm text-muted-foreground">• {line}</p>
                  ))}
                </div>
              </Card>
            );
          })}

          {personas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Chưa có hạng mục nào</p>
              <Button onClick={handleAddNew} className="bg-memorial-primary hover:bg-memorial-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Thêm hạng mục đầu tiên
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonaManager;