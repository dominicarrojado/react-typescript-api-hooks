import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import faker from 'faker';
import { FetchState } from '../types';
import { useGetPosts } from './api-hooks';

describe('api hooks utilities', () => {
  describe('useGetPosts()', () => {
    const renderCustomHook = () => renderHook(() => useGetPosts());

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return initial value', () => {
      const hook = renderCustomHook();
      const [posts, fetchState, getPosts] = hook.result.current;

      expect(posts).toEqual([]);
      expect(fetchState).toBe(FetchState.DEFAULT);
      expect(typeof getPosts).toBe('function');
    });

    it('should have expected endpoint on api call', async () => {
      const axiosGetSpy = jest
        .spyOn(axios, 'get')
        .mockResolvedValue({ data: [] });

      const hook = renderCustomHook();
      const getPosts = hook.result.current[2];

      await act(async () => {
        await getPosts();
      });

      expect(axiosGetSpy).toBeCalledTimes(1);
      expect(axiosGetSpy).toBeCalledWith(
        'https://jsonplaceholder.typicode.com/posts'
      );
    });

    it('should have expected states on api call', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: [] });

      const hook = renderCustomHook();
      const getPosts = hook.result.current[2];

      const promiseAct = act(async () => {
        await getPosts();
      });

      const [posts, fetchState] = hook.result.current;

      expect(posts).toEqual([]);
      expect(fetchState).toBe(FetchState.LOADING);

      await promiseAct;
    });

    it('should have expected states on api error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue({});

      const hook = renderCustomHook();
      const getPosts = hook.result.current[2];

      await act(async () => {
        await getPosts();
      });

      const [posts, fetchState] = hook.result.current;

      expect(posts).toEqual([]);
      expect(fetchState).toBe(FetchState.ERROR);
    });

    it('should have expected states on api success', async () => {
      const res = {
        data: [
          {
            userId: faker.datatype.number(),
            id: faker.datatype.number(),
            title: faker.lorem.sentence(),
            body: faker.lorem.sentences(),
          },
        ],
      };

      jest.spyOn(axios, 'get').mockResolvedValue(res);

      const hook = renderCustomHook();
      const getPosts = hook.result.current[2];

      await act(async () => {
        await getPosts();
      });

      const [posts, fetchState] = hook.result.current;

      expect(posts).toEqual(res.data);
      expect(fetchState).toBe(FetchState.SUCCESS);
    });
  });
});
