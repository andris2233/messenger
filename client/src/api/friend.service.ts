import { ISearchQuery } from 'common/model/common';
import { request } from '@/api/http';

export const friendService = {
  getFriends: (query: ISearchQuery) => request()
    .get('/friends', { params: query })
    .then((res) => res.data),
};
