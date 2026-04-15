'use client';

import StaggeredMenu from '@/components/StaggeredMenu';
import { StaggeredMenuItem, StaggeredMenuSocialItem } from '@/components/StaggeredMenu';

export default function Home() {
  const menuItems: StaggeredMenuItem[] = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Recipes', ariaLabel: 'View our recipes', link: '/recipes' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'GitHub', link: 'https://github.com' }
  ];

  return (
    <div style={{ height: '100vh', background: '#1a1a1a' }}>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        logoUrl="/next.svg"
        isFixed={true}
      />
      <main className="flex flex-1 w-full h-full flex-col items-center justify-center px-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-white">
            Kuliner
          </h1>
          <p className="max-w-md text-lg leading-8 text-gray-300">
            Discover amazing recipes and culinary experiences. Click the menu button in the top right to explore.
          </p>
        </div>
      </main>
    </div>
  );
}
