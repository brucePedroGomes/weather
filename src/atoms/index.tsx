import { atom } from "jotai";

type Location = {
  latitude: number;
  longitude: number;
};

export const locationAtom = atom<Location>({ latitude: 0, longitude: 0 });

export enum Units {
  celsius = "celsius",
  fahrenheit = "fahrenheit",
}

export const unitsAtom = atom<Units>(Units.fahrenheit);
