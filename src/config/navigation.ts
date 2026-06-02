export interface NavItem {
  label: string;
  href: string;
  match?: 'hash' | 'exact' | 'prefix';
}

export interface NavAction {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  shortLabel: string;
}

export interface FooterLinkGroup {
  title: string;
  items: NavItem[];
}

export const navItems: NavItem[] = [
  { label: 'Trang chủ', href: '/', match: 'exact' },
  { label: 'Sản phẩm', href: '/products', match: 'exact' },
  { label: 'Về chúng tôi', href: '/about', match: 'exact' },
  { label: 'Liên hệ', href: '/contact', match: 'exact' },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Liên kết nhanh',
    items: navItems,
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/tanhuongphat',
    shortLabel: 'FB',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/tanhuongphat',
    shortLabel: 'IG',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    shortLabel: 'YT',
  },
];
