import { atom } from 'recoil';

export const searchNewsAtom = atom({
  key: 'searchNewsAtom',
  default: {
    keyword:"News",
    total: 20,
    pageNumber: 1,
    pageSize: 10,
    fromDate: "2024-03-20",
    source: '',
    category:'',
  },
});