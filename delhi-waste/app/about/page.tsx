import type { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Delhi Eco-Flow: our story, our campaign, and what you can do as a Delhi resident.',
};

export default function AboutPage() {
  return <AboutContent />;
}
