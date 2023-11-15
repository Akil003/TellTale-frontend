import React, { createContext, useContext, useRef, useState } from 'react';

// Create a MediaControlContext
const MediaControlContext = createContext();

// Create a custom hook to use the MediaControlContext
const useMediaControlContext = () => {
  const context = useContext(MediaControlContext);
  if (!context) {
    throw new Error('useMediaControlContext must be used within a MediaControlProvider');
  }
  return context;
};

// Create a MediaControlProvider component
const MediaControlProvider = ({children}) => {
  // Define the initial state
  const initialMediaControlState = {
    book: null,
    index: 0,
    isActive: false,
    isPlaying: false,
    volume: 50, // Default volume, you can set your own initial value
    audioRef: useRef(null),
  };

  // Use state to manage the media control state
  const [mediaControl, setMediaControl] = useState(initialMediaControlState);

  // Define functions to update the media control state
  const updateBook = (newBook) => setMediaControl((prev) => ({ ...prev, book: newBook }));
  const updateIndex = (newIndex) => setMediaControl((prev) => ({ ...prev, index: newIndex }));
  const updateIsActive = (newIsActive) => setMediaControl((prev) => ({ ...prev, isActive: newIsActive }));
  const updateIsPlaying = (newIsPlaying) => setMediaControl((prev) => ({ ...prev, isPlaying: newIsPlaying }));
  const updateVolume = (newVolume) => setMediaControl((prev) => ({ ...prev, volume: newVolume }));

  const contextValue = {
    mediaControl,
    updateBook,
    updateIndex,
    updateIsActive,
    updateIsPlaying,
    updateVolume,
  };

  return (
    <MediaControlContext.Provider value={contextValue}>
      {children}
    </MediaControlContext.Provider>
  );
};

export { MediaControlProvider, useMediaControlContext };
