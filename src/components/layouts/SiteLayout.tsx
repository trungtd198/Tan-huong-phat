import type { ReactNode } from 'react';

import { FloatingActions } from './FloatingActions';
import { Footer } from './Footer';
import { Navbar, type NavbarProps } from './Navbar';
import { PageWrapper } from './PageWrapper';

type SiteLayoutProps = {
  title?: string;
  description?: string;
  activeHref?: string;
  navbarProps?: Omit<NavbarProps, 'activeHref'>;
  children: ReactNode;
};

const SiteLayout = ({ activeHref, navbarProps, children }: SiteLayoutProps) => (
  <PageWrapper>
    <Navbar activeHref={activeHref} {...navbarProps} />
    <main>{children}</main>
    <Footer />
    <FloatingActions />
  </PageWrapper>
);

export { SiteLayout };
export type { SiteLayoutProps };
