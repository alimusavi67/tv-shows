import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fetchAllShows, searchInShows, fetchEpisodes, BASE_URL } from './apiService';

describe('API tests', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test('fetchShows should fetch shows data for a given page', async () => {
    const page = 1;
    const data = [{ id: 1, name: 'Show 1' }];
    mock.onGet(`${BASE_URL}/shows?page=${page}`).reply(200, data);

    const response = await fetchAllShows(page);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(data);
  });

  test('searchShows should fetch search results for a given query', async () => {
    const query = 'test';
    const data = [{ show: { id: 1, name: 'Show 1' } }];
    mock.onGet(`${BASE_URL}/search/shows?q=${query}`).reply(200, data);

    const response = await searchInShows(query);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(data);
  });

  test('fetchEpisodes should fetch episodes for a given season ID', async () => {
    const seasonId = 1;
    const data = [{ id: 1, name: 'Episode 1' }];
    mock.onGet(`${BASE_URL}/seasons/${seasonId}/episodes?embed=show`).reply(200, data);

    const response = await fetchEpisodes(seasonId);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(data);
  });
});
