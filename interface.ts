export interface Vue3HistoryOption {
  router: any;
  debug?: boolean;
  onRouteChange?: (v:any) => void;
  onQuit?: () => void;
}

export interface History {
  current: number;
  stack: any[]
}

 