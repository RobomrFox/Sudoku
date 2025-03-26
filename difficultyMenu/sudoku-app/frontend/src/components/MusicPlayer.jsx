import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [songName, setSongName] = useState("Sunset Landscape");
    const [volume, setVolume] = useState(0.01); // volume state (range: 0 to 1)
    const [isHoveringVolume, setIsHoveringVolume] = useState(false); // Track if the volume slider is hovered
    const [isHoveringScrubBar, setIsHoveringScrubBar] = useState(false);
    const audioRef = useRef(new Audio('.\\music\\Sunset-Landscape(chosic.com).mp3'));
    const playerRef = useRef(null);
    const draggingRef = useRef(false);

    const songs = [
        { name: "Sunset Landscape", src: '.\\music\\Sunset-Landscape(chosic.com).mp3' },
        { name: "Ocean Breeze", src: '.\\music\\Ocean-Breeze.mp3' },
        { name: "Mountain Peaks", src: '.\\music\\Mountain-Peaks.mp3' }
    ];

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const updateProgress = () => {
        const audio = audioRef.current;
        const progress = (audio.currentTime / audio.duration) * 100;
        setProgress(progress);
    };

    const handleMouseDown = (e) => {
        if (!isHoveringVolume) { // Prevent dragging if the volume slider is hovered
            draggingRef.current = true;
        }
    };

    const handleMouseUp = () => {
        draggingRef.current = false;
    };

    const handleMouseMove = (e) => {
        if (!draggingRef.current || isHoveringVolume) return; // Prevent moving the player while hovering over volume
        setPosition((prev) => ({
            x: prev.x + e.movementX,
            y: prev.y + e.movementY
        }));
    };

    const handleScrub = (e) => {
        if (isHoveringScrubBar) {
            const player = playerRef.current;
            const width = player.offsetWidth;
            const newProgress = (e.clientX - player.offsetLeft) / width;
            audioRef.current.currentTime = newProgress * audioRef.current.duration;
            setProgress(newProgress * 100);
        }

    };

    const skipNext = () => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextIndex);
        setSongName(songs[nextIndex].name);
        const audio = audioRef.current;
        audio.src = songs[nextIndex].src;
        audio.play();
        setIsPlaying(true);
    };

    const skipPrevious = () => {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setCurrentSongIndex(prevIndex);
        setSongName(songs[prevIndex].name);
        const audio = audioRef.current;
        audio.src = songs[prevIndex].src;
        audio.play();
        setIsPlaying(true);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', updateProgress);
        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
        };
    }, []);

    return (
        <div
            ref={playerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleScrub}
            style={{
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: '100%',
                maxWidth: '400px',
                padding: '20px',
                borderRadius: '10px',
                background: 'linear-gradient(to right, #8a2be2, #4b0082)',
                color: 'white',
                textAlign: 'center',
                cursor: 'grab'
            }}
        >
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{songName}</h2>
            <div
                onMouseEnter={() => setIsHoveringScrubBar(true)}
                onMouseLeave={() => setIsHoveringScrubBar(false)}
                style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'white' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <button
                    onClick={skipPrevious}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', color: '#4b0082', fontSize: '24px', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                >
                    ⏪
                </button>
                <button
                    onClick={togglePlayPause}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'white', color: '#4b0082', fontSize: '24px', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                >
                    {isPlaying ? '❚❚' : '▶'}
                </button>
                <button
                    onClick={skipNext}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', color: '#4b0082', fontSize: '24px', border: 'none', cursor: 'pointer' }}
                >
                    ⏩
                </button>
            </div>
            <div style={{ marginTop: '10px' }}>
                <input
                    id="volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    onMouseEnter={() => setIsHoveringVolume(true)}  // Set hover state true
                    onMouseLeave={() => setIsHoveringVolume(false)} // Set hover state false
                    style={{ width: '100px', verticalAlign: 'middle' }}
                />
            </div>
        </div>
    );
};

export default MusicPlayer;
