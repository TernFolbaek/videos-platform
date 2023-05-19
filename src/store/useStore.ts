import {create, SetState} from 'zustand';
import jwt from 'jsonwebtoken';

type UserState = {
  user: string | null;
  userId: string | null;
  setUser: (user: string) => void;
  setUserId: (userId: string | null) => void;
  clearUser: () => void;
};

type VideoState = {
  videoId: string | number | null;
  setVideoId: (videoId: string | null) => void;
  clearVideoId: () => void;
};

export const useStore = create<UserState>((set: SetState<UserState>) => {
  const isServer = typeof window === 'undefined';
  
  //only assign token a value if we are not on the server side since it is not supported by Node
  const token = !isServer && localStorage.getItem('token');
  // make sure that the jwt token is not null
  const decodedToken = token ? jwt.decode(token) : null;

  const user = decodedToken && typeof decodedToken === 'object' ? decodedToken.username : null;
  const userId = decodedToken && typeof decodedToken === 'object' ? decodedToken.userId : null;
  return {
    user,
    userId,
    setUser: (user) => set({ user }),
    setUserId: (userId) => set({ userId }),
    clearUser: () => {
      !isServer && localStorage.removeItem('token');
      set({ user: null, userId: null });
    },
   
  };
});

export const videoStore = create<VideoState>((set: SetState<VideoState>) => {
  return {
    videoId: null,
    setVideoId: (videoId: string | number | null) => set({ videoId }),
    clearVideoId: () => set({ videoId: null })
  };
});


