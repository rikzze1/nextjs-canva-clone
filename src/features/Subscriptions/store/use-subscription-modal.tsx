import { create } from 'zustand';

type SubscriptionModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSubscriptionModal = create<SubscriptionModalState>(set => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
