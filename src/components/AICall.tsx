import { useState, useEffect } from "react";
import { PhoneOff, Volume2, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import samplePortrait from "@/assets/sample-portrait.jpg";

interface AICallProps {
  onEndCall: () => void;
}

const AICall = ({ onEndCall }: AICallProps) => {
  const [callState, setCallState] = useState<"connecting" | "connected">("connecting");
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  useEffect(() => {
    // Simulate connection delay
    const connectTimer = setTimeout(() => {
      setCallState("connected");
    }, 3000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === "connected") {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onEndCall();
  };

  if (callState === "connecting") {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-memorial relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${samplePortrait})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center space-y-6">
          <Avatar className="w-32 h-32 mx-auto border-4 border-white/20">
            <AvatarImage src={samplePortrait} alt="Nguyễn Văn Minh" />
            <AvatarFallback>NVM</AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Nguyễn Văn Minh</h2>
            <p className="text-white/80 animate-pulse">Đang kết nối...</p>
          </div>
        </div>

        <div className="absolute bottom-20">
          <Button
            onClick={handleEndCall}
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-16 h-16"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-memorial">
      {/* Call Duration */}
      <div className="text-center pt-12 pb-8">
        <p className="text-white/80 text-sm">Cuộc gọi đang diễn ra</p>
        <p className="text-white text-lg font-mono">{formatDuration(callDuration)}</p>
      </div>

      {/* Avatar and Name */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <Avatar className="w-48 h-48 border-4 border-white/20">
            <AvatarImage src={samplePortrait} alt="Nguyễn Văn Minh" />
            <AvatarFallback>NVM</AvatarFallback>
          </Avatar>
          
          {/* Animated pulse ring for active call */}
          <div className="absolute inset-0 rounded-full border-4 border-memorial-primary animate-ping opacity-30" />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Nguyễn Văn Minh</h2>
          <p className="text-white/80">Đang nói chuyện với bạn...</p>
        </div>

        {/* Simulated voice message */}
        <div className="bg-black/20 rounded-lg p-4 max-w-sm mx-4">
          <p className="text-white/90 text-center italic">
            "Alo, con gọi có chuyện gì không? Bố đang nghe đây..."
          </p>
        </div>
      </div>

      {/* Call Controls */}
      <div className="pb-12 px-8">
        <div className="flex justify-center gap-8">
          <Button
            variant="outline"
            size="lg"
            className={`rounded-full w-14 h-14 border-white/30 ${
              isSpeakerOn ? 'bg-white/20 text-white' : 'bg-black/20 text-white/60'
            }`}
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
          >
            <Volume2 className="h-6 w-6" />
          </Button>

          <Button
            onClick={handleEndCall}
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-16 h-16"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className={`rounded-full w-14 h-14 border-white/30 ${
              isMuted ? 'bg-red-500/80 text-white' : 'bg-black/20 text-white/60'
            }`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>
        </div>

        <div className="text-center mt-4 space-y-1">
          <p className="text-white/60 text-xs">Loa ngoài</p>
          <div className="flex justify-center gap-8">
            <p className="text-white/60 text-xs">Kết thúc</p>
            <p className="text-white/60 text-xs">Tắt tiếng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICall;