// This declares the global Jasmine namespace to avoid TypeScript errors
// The file is intentionally simple to support the minimal testing needs
declare namespace jasmine {
  // Basic matchers interface
  interface Matchers<T> {
    toBeTruthy(): boolean;
    toBeFalsy(): boolean;
    toBe(expected: any): boolean;
    toEqual(expected: any): boolean;
    toContain(expected: any): boolean;
    toBeNull(): boolean;
    toBeDefined(): boolean;
    toBeUndefined(): boolean;
    toMatch(expected: string | RegExp): boolean;
  }
  
  // Spy functionality
  interface Spy {
    and: SpyAnd;
    calls: any;
    returnValue: any;
  }
  
  interface SpyAnd {
    returnValue(value: any): void;
    callFake(fn: Function): void;
    callThrough(): void;
  }
}

// Global Jasmine functions
declare function describe(description: string, specDefinitions: () => void): void;
declare function fdescribe(description: string, specDefinitions: () => void): void;
declare function xdescribe(description: string, specDefinitions: () => void): void;

declare function it(expectation: string, assertion: () => void, timeout?: number): void;
declare function fit(expectation: string, assertion: () => void, timeout?: number): void;
declare function xit(expectation: string, assertion: () => void, timeout?: number): void;

declare function beforeEach(action: () => void, timeout?: number): void;
declare function afterEach(action: () => void, timeout?: number): void;
declare function beforeAll(action: () => void, timeout?: number): void;
declare function afterAll(action: () => void, timeout?: number): void;

declare function expect<T>(actual: T): jasmine.Matchers<T>;
declare function spyOn<T>(object: T, method: keyof T): jasmine.Spy;