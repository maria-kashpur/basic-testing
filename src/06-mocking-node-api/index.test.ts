import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callbackMock = jest.fn();
    const timeoutValue = 100000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callbackMock, timeoutValue);

    expect(setTimeout).toHaveBeenCalledWith(callbackMock, timeoutValue);

    jest.advanceTimersByTime(timeoutValue);

    expect(callbackMock).toHaveBeenCalled();
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callbackMock = jest.fn();
    const timeoutValue = 2000;

    doStuffByTimeout(callbackMock, timeoutValue);
    expect(callbackMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeoutValue);
    expect(callbackMock).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const callbackMock = jest.fn();
    const intervalValue = 1000;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callbackMock, intervalValue);

    expect(setInterval).toHaveBeenCalledWith(callbackMock, intervalValue);
    jest.restoreAllMocks();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callbackMock = jest.fn();
    const intervalValue = 1000;
    const intervalsCount = 3;

    doStuffByInterval(callbackMock, intervalValue);

    jest.advanceTimersByTime(intervalValue * intervalsCount);

    expect(callbackMock).toHaveBeenCalledTimes(intervalsCount);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'example.txt';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockImplementation(async () => Buffer.from('Hello', 'utf-8'));
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockImplementation(async () => Buffer.from('Hello', 'utf-8'));
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe('Hello');
  });
});
