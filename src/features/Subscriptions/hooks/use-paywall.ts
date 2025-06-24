import { useSubscriptionModal } from '@/features/Subscriptions/store/use-subscription-modal';

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = true;

  return {
    isLoading: false,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
