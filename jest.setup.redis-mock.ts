interface FakeRedis {
  createClient: () => FakeRedis;
  on: () => FakeRedis;
  connect: () => FakeRedis;
  lRange: (key: string, start: number, end: number) => string[];
  lLen: (key: string) => number;
  lIndex: (key: string, index: number) => string;
  w: { storage: any };
}

class Client implements FakeRedis {
  w: { storage: any };

  constructor() {
    this.w = { storage: {} };
  }

  createClient() {
    return this;
  }

  on() {
    return this;
  }

  connect() {
    return this;
  }

  lPush(key: string, value: string) {
    if (!this.w.storage[key]) {
      this.w.storage[key] = [value];
    }
    this.w.storage[key].push(value);
  }

  lRange(key: string, start: number, end: number) {
    return (this.w.storage[key] || []).slice(start, end);
  }

  lLen(key: string) {
    return this.w.storage[key]?.length || 0;
  }

  lIndex(key: string, index: number) {
    return this.w.storage[key][index];
  }

  _setStorage(newStorage: any) {
    this.w.storage = newStorage;
  }
}

jest.mock('redis', () => ({
  createClient: () => new Client(),
}));
