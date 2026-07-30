"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  function navClass(href: string) {
    const active = pathname === href || (href !== '/' && pathname.startsWith(href));
    return `px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
      active ? 'bg-ink5/50 text-ink font-semibold' : 'text-ink2 hover:bg-ink5/40'
    }`;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-ink5/60 bg-paper/80 backdrop-blur-md" aria-label="Navigation">
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 rounded-md bg-ink text-paper flex items-center justify-center text-[11px] font-extrabold tracking-tighter">F</span>
          <span className="text-[14.5px] font-extrabold tracking-tight leading-none text-ink">Fake Internship Reporter</span>
        </Link>
        <div className="flex items-center gap-1 text-[13px] font-medium">
          <Link href="/" className={navClass('/')} aria-current={pathname === '/' ? 'page' : undefined}>Search</Link>
          <Link href="/report" className={navClass('/report')} aria-current={pathname === '/report' ? 'page' : undefined}>Report</Link>
          <Link href="/about" className={navClass('/about')} aria-current={pathname === '/about' ? 'page' : undefined}>About</Link>
        </div>
      </div>
    </nav>
  );
}
