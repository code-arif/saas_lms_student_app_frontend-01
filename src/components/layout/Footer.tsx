import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} SaaS LMS Student Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
