import { RouteLocationNormalizedLoaded, Router } from "vue-router";

export interface Vue3HistoryOption {
  router: Router;
  debug?: boolean;
  onRouteChange?: (v:RouteLocationNormalizedLoaded) => void;
  onQuit?: () => void;
}

export interface History {
  current: number;
  stack: RouteLocationNormalizedLoaded[]
}

 