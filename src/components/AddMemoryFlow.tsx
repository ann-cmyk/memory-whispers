import { useState } from "react";
import { X, Plus, Camera, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AddMemoryFlowProps {
  onClose: () => void;
  onSave: (memory: any) => void;
}

const AddMemoryFlow = ({ onClose, onSave }: AddMemoryFlowProps) => {
  const [step, setStep] = useState<"picker" | "editor">("picker");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    if (files.length > 0) {
      setStep("editor");
    }
  };

  const handleSave = () => {
    const memory = {
      id: Date.now(),
      files: selectedFiles,
      caption,
      date,
      location,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      type: selectedFiles[0]?.type.startsWith('video') ? 'video' : 'photo',
      isAchievement: false
    };
    onSave(memory);
    onClose();
  };

  if (step === "picker") {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Thêm Kỷ Niệm Mới</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="file-input" className="cursor-pointer">
              <div className="border-2 border-dashed border-memorial-primary/30 rounded-lg p-8 text-center hover:bg-memorial-primary/5 transition-colors">
                <Camera className="h-12 w-12 mx-auto mb-4 text-memorial-primary" />
                <p className="text-foreground font-medium">Chọn ảnh hoặc video</p>
                <p className="text-sm text-muted-foreground">Nhấn để chọn từ thư viện</p>
              </div>
            </Label>
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </Card>
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
          <h3 className="text-lg font-semibold">Thêm Kỷ Niệm</h3>
          <Button onClick={handleSave} className="bg-memorial-primary hover:bg-memorial-primary/90">
            Đăng
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Preview */}
          <div className="space-y-2">
            <Label>Xem trước</Label>
            <div className="grid grid-cols-3 gap-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  {file.type.startsWith('image') ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Chú thích</Label>
            <Textarea
              id="caption"
              placeholder="Chia sẻ một câu chuyện về khoảnh khắc này..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Ngày kỷ niệm
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Địa điểm
            </Label>
            <Input
              id="location"
              placeholder="Thêm vị trí..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Gắn thẻ người
            </Label>
            <Input
              id="tags"
              placeholder="Nhập tên, cách nhau bằng dấu phẩy..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemoryFlow;