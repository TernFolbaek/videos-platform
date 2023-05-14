import {create, SetState} from 'zustand';
import jwt from 'jsonwebtoken';

type UserState = {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
};

type VideoState = {
  videoId: string | number| null;
  setVideoId: (videoId: string | null) => void;
  clearVideoId: () => void;
};

const useStore = create<UserState>((set: SetState<UserState>) => {
  const isServer = typeof window === 'undefined';
  
  //only assign token a value if we are not on the server side since it is not supported by Node
  const token = !isServer && localStorage.getItem('token');
  // make sure that the jwt token is not null
  const decodedToken = token ? jwt.decode(token) : null;

  const user = decodedToken && typeof decodedToken === 'object' ? decodedToken.username : null;
  return {
    user,
    setUser: (user) => set({ user }),
    clearUser: () => {
      !isServer && localStorage.removeItem('token');
      set({ user: null });
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

export default useStore;

