
import Home from "./Home";
import NotFound from "./NotFound";
import { DebugPages } from "./debug-pages";
import React from 'react';

export type DemoPageType = {
  name: string;
  path: string;
  content: React.ReactNode;
}

export const DemoPages = {
  Home,
  NotFound,
  ...DebugPages,
}