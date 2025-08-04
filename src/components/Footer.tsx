'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              FIBA Asia Cup 2025
            </h3>
            <p className="mb-4 text-gray-600">
              Follow the most exciting basketball tournament in Asia. Get live
              scores, standings, news, and streaming information all in one
              place.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-green-600"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-green-600"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-green-600"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#games"
                  className="text-gray-600 transition-colors hover:text-green-600"
                >
                  Live Games
                </a>
              </li>
              <li>
                <a
                  href="#standings"
                  className="text-gray-600 transition-colors hover:text-green-600"
                >
                  Standings
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  className="text-gray-600 transition-colors hover:text-green-600"
                >
                  Latest News
                </a>
              </li>
              <li>
                <a
                  href="#streams"
                  className="text-gray-600 transition-colors hover:text-green-600"
                >
                  Watch Live
                </a>
              </li>
            </ul>
          </div>

          {/* Tournament Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Tournament
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Dates:</span> Aug 1-31, 2025
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Host:</span> Multiple Cities
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Teams:</span> 16 Nations
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Format:</span> Group Stage +
                Knockout
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-center text-sm text-gray-500 md:text-left">
              © 2025 FIBA Asia Cup. All rights reserved. Data provided by
              API-Basketball.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-green-600"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-green-600"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-green-600"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
