import type { Metadata } from 'next';
import HeroCounter from '@/components/landing/HeroCounter';
import HomeContent from '@/components/home/HomeContent';

export const metadata: Metadata = {
  title: 'Delhi Eco-Flow',
  description:
    "Delhi generates 11,862 tonnes of waste every day. Delhi Eco-Flow is the student-led campaign working to change that.",
};

export default function LandingPage() {
  return (
    <>
      <HeroCounter />
      <HomeContent />
    </>
  );
}
