
import React, { useState, useRef, useEffect } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const storedMuteState = localStorage.getItem('audioMuted');
    return storedMuteState ? JSON.parse(storedMuteState) : true;
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      // Autoplay can be tricky due to browser policies. Often requires user interaction first.
      // We can try to play if unmuted, but it might fail silently.
      if (!isMuted) {
        audioRef.current.play().catch(error => console.warn("Audio autoplay prevented:", error));
      }
    }
    localStorage.setItem('audioMuted', JSON.stringify(isMuted));
  }, [isMuted]);
  
  // Attempt to play on mount if not muted, after a user interaction might be more reliable
  useEffect(() => {
    const playAudio = () => {
        if (audioRef.current && !isMuted) {
            audioRef.current.play().catch(error => console.warn("Audio autoplay after interaction failed:", error));
        }
        // Remove the event listener after the first interaction
        document.removeEventListener('click', playAudio);
        document.removeEventListener('keydown', playAudio);
    };

    // Add event listeners for the first user interaction
    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);

    return () => {
        document.removeEventListener('click', playAudio);
        document.removeEventListener('keydown', playAudio);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMuted]); // Re-run if isMuted changes, though the listeners are for first interaction

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      if (!audioRef.current.muted) {
        audioRef.current.play().catch(error => console.warn("Audio play on unmute failed:", error));
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
        aria-label={isMuted ? "Unmute background audio" : "Mute background audio"}
      >
        {isMuted ? <SpeakerXMarkIcon className="h-6 w-6" /> : <SpeakerWaveIcon className="h-6 w-6" />}
      </button>
    </>
  );
};

export default AudioPlayer;
