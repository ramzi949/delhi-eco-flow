import type { Metadata } from 'next';
import ModelContent from '@/components/model-page/ModelContent';

export const metadata: Metadata = {
  title: 'The Model',
  description: 'An ethical waste-to-energy system for Delhi.',
};

export default function ModelPage() {
  return <ModelContent />;
}
