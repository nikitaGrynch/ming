import { UserType } from "@customTypes/authTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  user: UserType | null;
};

type Action = {
  setUser: (user: UserType) => void;
  updateUser: (updatedInfo: Partial<UserType>) => void;
  clear: () => void;
};

const useUserStore = create<State & Action>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (updatedInfo) =>
        set((state) => ({
          user: state.user ? { ...state.user!, ...updatedInfo } : null,
        })),
      clear: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
