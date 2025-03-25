import videoDrone from "../assets/rocky-shore-coast.mp4";
import Header from "@/components/Header";
import drone from "../assets/Drone1.png";

const Landing: React.FC = () => {
  return (
    <>
      <Header />
      <div className="relative h-screen w-full pt-16 font-sans overflow-hidden">
        {/* Video Background with Overlay */}
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoDrone} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 video-overlay"></div>
        </div>

        {/* Drone Image - Enhanced centering */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <img
            src={drone}
            alt="Drone"
            className="relative transform md:scale-75 scale-70 animate-float drop-shadow-2xl  mb-16 
              max-w-full max-h-full object-contain"
          />
        </div>

        {/* Content Section with additional animations */}
        <div className="absolute italic bottom-0 left-0 right-0 p-8 text-center text-white content-wrapper">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 
            to-blue-500 bg-clip-text text-transparent animate-[fadeIn_1s_ease-out, textGlow_3s_infinite_ease-in-out]"
          >
            Welcome to Drone Explorer
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-[fadeIn_1.5s_ease-out]">
            Explore the world with our cutting-edge drone technology
          </p>
          {/* Subtle animated dots */}
          <div className="flex justify-center gap-3 mt-4">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-[subtlePulse_2s_infinite_ease-in-out]"></span>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-[subtlePulse_2s_infinite_ease-in-out_0.2s]"></span>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-[subtlePulse_2s_infinite_ease-in-out_0.4s]"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;