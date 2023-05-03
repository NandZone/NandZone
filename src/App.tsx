import type { Component } from 'solid-js';

import logo from './assets/logo.svg';

export const App: Component = () => {
  return (
    <div class="text-center">
      <header class="bg-[#282c34] text-white min-h-screen flex flex-col items-center justify-center text-[calc(10px+2vmin)]">
        <img
          src={logo}
          class="h-[40vmin] animate-bounce pointer-events-none"
          alt="logo"
          elementtiming={''}
          fetchpriority={'high'}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class="text-[#b318f0]"
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};
