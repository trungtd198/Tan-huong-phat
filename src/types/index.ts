import type { LucideIcon } from 'lucide-react';

export type IconValue = string | LucideIcon;

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image?: string;
  tags?: string[];
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  role?: string;
  location?: string;
  rating: number;
  text: string;
  product?: string;
};

export type ProcessStep = {
  number: string;
  icon: IconValue;
  title: string;
  description: string;
  duration?: string;
};

export type Feature = {
  icon: IconValue;
  title: string;
  description: string;
  stat?: { value: string; label: string };
  tags?: string[];
};

export type StatItem = {
  icon?: IconValue;
  value: string;
  label: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};
