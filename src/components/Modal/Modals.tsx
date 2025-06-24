'use client';

import { useState, useEffect } from 'react';

import { SubscriptionModal } from '@/features/Subscriptions/components/SubscriptionModal';

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SubscriptionModal />
    </>
  );
};
