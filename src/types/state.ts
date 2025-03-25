// state.ts (or droneState.ts)
import { atom } from 'recoil';
import { Config } from './index';

export const droneConfigState = atom<Config>({
  key: 'droneConfigState', // Unique key for the atom
  default: {
    drone_id: 0,
    drone_name: '',
    light: '',
    country: '',
    weight: 0
  }
});