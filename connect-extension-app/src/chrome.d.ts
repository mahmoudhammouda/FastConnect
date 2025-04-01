// Type definitions for Chrome extension API
interface Chrome {
  tabs?: {
    create(options: { url: string }): void;
  };
  runtime?: {
    id?: string;
    getURL?(path: string): string;
  };
}

declare var chrome: Chrome;