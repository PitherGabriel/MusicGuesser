import React, { useState } from 'react';
import { Music, Mic, MapPin, TrendingUp, Clock, ExternalLink } from 'lucide-react';

export default function VibeCheckApp() {
  const [isListening, setIsListening] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [recentSongs, setRecentSongs] = useState([
    { title: "Blinding Lights", artist: "The Weeknd", time: "2m ago" },
    { title: "Levitating", artist: "Dua Lipa", time: "5m ago" },
    { title: "Good 4 U", artist: "Olivia Rodrigo", time: "8m ago" }
  ]);

  const API_URL = 'http://localhost:5000/api';

  const recognizeSong = async () => {
    setIsListening(true);

    try {
      const response = await fetch(`${API_URL}/song`);
      const data = await response.json();
      console.log(data)
      if (data.success) {
        console.log(data.result)
        const formattedSong = data.result.map(item => ({
          artist: item.artist,
          title: item.title,
          album: item.album,
          label: item.label
        }));
        setCurrentSong(formattedSong);
      }
      setIsListening(false);
    } catch (error) {
      console.error('Error searching for song:', error);
      setIsListening(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Music className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Vibe Check</h1>
          </div>
          <p className="text-purple-200 text-sm">Discover the music around you</p>
        </div>

        {/* Location Banner */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-purple-300" />
            <span className="text-purple-100">Currently at: Demo Mode</span>
          </div>
        </div>

        {/* Main Recognition Button */}
        <div className="relative mb-8">
          <div className="flex justify-center mb-6">
            <button
              onClick={recognizeSong}
              disabled={isListening}
              className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 ${isListening
                ? 'bg-gradient-to-br from-pink-500 to-purple-500 animate-pulse scale-110'
                : 'bg-gradient-to-br from-purple-500 to-indigo-500 hover:scale-105 active:scale-95'
                } shadow-2xl shadow-purple-500/50`}
            >
              <Mic className={`w-16 h-16 ${isListening ? 'animate-pulse' : ''}`} />
            </button>
          </div>
          <p className="text-center text-purple-200 text-sm">
            {isListening ? 'Listening...' : 'Tap to identify music'}
          </p>
        </div>

        {/* Current Song Display */}
        {currentSong && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                {currentSong.artwork}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold truncate">{currentSong.title}</h3>
                <p className="text-purple-200 truncate">{currentSong.artist}</p>
                <p className="text-sm text-purple-300 mt-1">{currentSong.album}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-purple-500/30 px-2 py-1 rounded-full">
                    {currentSong.genre}
                  </span>
                  <span className="text-xs bg-purple-500/30 px-2 py-1 rounded-full">
                    {currentSong.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Streaming Links */}
            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-green-600 hover:bg-green-700 transition-colors rounded-lg py-2 px-4 text-sm font-medium flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Spotify
              </button>
              <button className="flex-1 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 transition-colors rounded-lg py-2 px-4 text-sm font-medium flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Apple Music
              </button>
            </div>
          </div>
        )}

        {/* Recent Songs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-300" />
            <h2 className="text-lg font-semibold">Recent Discoveries</h2>
          </div>
          <div className="space-y-3">
            {recentSongs.map((song, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{song.title}</p>
                  <p className="text-sm text-purple-300 truncate">{song.artist}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-purple-400 ml-2">
                  <Clock className="w-3 h-3" />
                  {song.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-8 text-purple-300 text-xs">
          <p>Powered by AudD Music Recognition API</p>
        </div>
      </div>
    </div>
  );
}