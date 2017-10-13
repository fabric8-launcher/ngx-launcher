import { Injectable } from '@angular/core';

@Injectable()
export class AsciidocIndex {
  private index: Map<string, string> = new Map<string, string>();

  get(key: string): string {
    return this.index.get(key);
  }

  hasKey(key: string): boolean {
    return this.index.has(key);
  }

  set(index: Map<string, string>): void {
    this.index = index;
  }
}
