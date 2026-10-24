import type { Metadata } from 'next';
import './styles.css';
export const metadata: Metadata = {
  title: 'Philip Warkentien II · Staff UI Engineer',
  description: 'UI engineering, interaction, motion, and inclusive design.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
