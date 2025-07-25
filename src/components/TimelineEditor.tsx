import { useState } from "react";
import { X, Calendar, Plus, ImageIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TimelineEditorProps {
  onClose: () => void;
  onSave: (milestone: any) => void;
  editingMilestone?: any;
}

const TimelineEditor = ({ onClose, onSave, editingMilestone }: TimelineEditorProps) => {
  const [title, setTitle] = useState(editingMilestone?.title || "");
  const [date, setDate] = useState(editingMilestone?.date || new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState(editingMilestone?.content || "");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleSave = () => {
    const milestone = {
      id: editingMilestone?.id || Date.now(),
      title,
      date,
      content,
      files: selectedFiles,
      type: 'milestone',
      isAchievement: title.toLowerCase().includes('giải') || 
                     title.toLowerCase().includes('thưởng') || 
                     title.toLowerCase().includes('tốt nghiệp') ||
                     title.toLowerCase().includes('thành tựu')
    };
    onSave(milestone);
    onClose();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold">
            {editingMilestone ? "Chỉnh sửa cột mốc" : "Thêm cột mốc mới"}
          </h3>
          <Button onClick={handleSave} className="bg-memorial-primary hover:bg-memorial-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Lưu
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="milestone-title">Tiêu đề cột mốc</Label>
            <Input
              id="milestone-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Tốt nghiệp Đại học, Ngày cưới, Chuyến đi Đà Lạt..."
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="milestone-date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Ngày tháng
            </Label>
            <Input
              id="milestone-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="milestone-content">Nội dung chi tiết</Label>
            <Textarea
              id="milestone-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết câu chuyện chi tiết về cột mốc này..."
              className="min-h-[150px]"
            />
            <p className="text-xs text-muted-foreground">
              Hãy chia sẻ những cảm xúc, hoàn cảnh và ý nghĩa của khoảnh khắc này
            </p>
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Thêm ảnh minh họa
            </Label>
            
            <Label htmlFor="media-input" className="cursor-pointer">
              <div className="border-2 border-dashed border-memorial-primary/30 rounded-lg p-4 text-center hover:bg-memorial-primary/5 transition-colors">
                <Plus className="h-8 w-8 mx-auto mb-2 text-memorial-primary" />
                <p className="text-sm text-foreground">Thêm ảnh để minh họa câu chuyện</p>
              </div>
            </Label>
            <input
              id="media-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Selected files preview */}
            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Achievement detection hint */}
          {(title.toLowerCase().includes('giải') || 
            title.toLowerCase().includes('thưởng') || 
            title.toLowerCase().includes('tốt nghiệp') ||
            title.toLowerCase().includes('thành tựu')) && (
            <Card className="p-3 bg-memorial-primary/5 border-memorial-primary/20">
              <p className="text-sm text-memorial-primary">
                🏆 Cột mốc này sẽ được đánh dấu là thành tựu đặc biệt
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineEditor;