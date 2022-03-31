import { atom } from "jotai";

type Location = {
  latitude: number;
  longitude: number;
};

export const locationAtom = atom<Location>({ latitude: 0, longitude: 0 });
