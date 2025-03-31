// Type definitions for Chrome extension API
interface Chrome {
  tabs?: {
    create(options: { url: string }): void;
  };
}

declare var chrome: Chrome;