import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export const USER_CONTEXT_KEY = Symbol('user_context');

@Injectable()
export class ContextService {
  constructor(private cls: AsyncLocalStorage<Map<string, any>>) {}

  set<T = any>(key: Symbol, value: T) {
    this.cls.getStore()?.set(key.toString(), value);
  }

  get<T = any>(key: Symbol): T {
    return this.cls.getStore().get(key.toString());
  }

  run(fn: () => void, initialData: Record<string, any> = {}) {
    const store = new Map(Object.entries(initialData));
    this.cls.run(store, fn);
  }
}
