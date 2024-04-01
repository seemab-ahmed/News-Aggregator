import { atom } from 'recoil';

export const searchNewsAtom = atom({
  key: 'searchNewsAtom',
  default: {
    keyword: "News",
    total: 20,
    pageNumber: 1,
    pageSize: 10,
    fromDate: new Date(new Date().setDate(new Date().getDate() - 15)),
    source: '',
    category: '',
  },
});