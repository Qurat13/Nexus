import { useState } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, 
  Monitor, MessageSquare, Settings,  
} from 'lucide-react';

export const VideoCallUI = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-[#0f172a] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 relative">
      
      {/* --- Main Video Area --- */}
      <div className="flex-1 relative flex items-center justify-center bg-radial-gradient">
        
        {/* Main Participant (e.g. Investor) */}
        {!isVideoOn ? (
          <div className="flex flex-col items-center animate-pulse">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-indigo-500/30">
              <VideoOff size={40} className="text-gray-500" />
            </div>
            <p className="text-gray-400 font-medium tracking-wider">Camera is Paused</p>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-indigo-900/40 via-black to-purple-900/20 flex items-center justify-center">
             <div className="relative">
                <div className="absolute -inset-4 bg-indigo-500/20 blur-xl rounded-full"></div>
                <p className="text-indigo-300 font-semibold text-lg relative uppercase tracking-[0.2em]">
                  Secure Connection Active
                </p>
             </div>
          </div>
        )}

        {/* --- Top Overlays --- */}
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <div className="bg-red-600 px-3 py-1 rounded-md text-[10px] font-bold text-white flex items-center gap-2 shadow-lg animate-pulse">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div> REC 00:42:15
          </div>
          <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-md text-[10px] text-white border border-white/10">
            1080p • 60fps
          </div>
        </div>

        {/* --- Small Self View (Floating Window) --- */}
        <div className="absolute bottom-6 right-6 w-56 h-36 bg-gray-900 rounded-2xl border border-white/20 overflow-hidden shadow-2xl group transition-all hover:scale-105">
           <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
             <span className="text-xs text-gray-500 font-medium">You (Startup Team)</span>
           </div>
           <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] text-white backdrop-blur-sm">
             Live
           </div>
        </div>
      </div>

      {/* --- Glassmorphic Control Bar --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]">
        
        <button 
          onClick={() => setIsMicOn(!isMicOn)}
          className={`p-4 rounded-xl transition-all duration-300 ${isMicOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}
        >
          {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
        </button>

        <button 
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`p-4 rounded-xl transition-all duration-300 ${isVideoOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}
        >
          {isVideoOn ? <Video size={22} /> : <VideoOff size={22} />}
        </button>

        <div className="w-[1px] h-8 bg-white/20 mx-2"></div>

        <button className="p-4 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all">
          <Monitor size={22} />
        </button>

        <button className="p-4 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all">
          <MessageSquare size={22} />
        </button>

        <button className="p-4 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all">
          <Settings size={22} />
        </button>

        <button 
          onClick={() => window.history.back()}
          className="p-4 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all transform hover:scale-110 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
        >
          <PhoneOff size={22} />
        </button>
      </div>
    </div>
  );
};