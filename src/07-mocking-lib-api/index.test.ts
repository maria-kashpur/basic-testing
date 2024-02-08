import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: (func: unknown) => func,
}));

const resource = '/posts';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    axios.create = jest.fn(() => axios);

    (axios.get as jest.Mock).mockImplementation((url) => {
      return Promise.resolve({
        data: [{ data: url }],
      });
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    await throttledGetDataFromApi(resource);
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(resource);
    expect(axios.get).toHaveBeenCalledWith(resource);
  });

  test('should return response data', async () => {
    const data = 'smth';
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: data });
    const result = await throttledGetDataFromApi(resource);
    expect(result).toBe(data);
  });
});
