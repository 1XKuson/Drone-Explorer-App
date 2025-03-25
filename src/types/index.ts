export interface Config {
  drone_id: number;
  drone_name: string;
  light: string;
  country: string;
  weight: number;
}

export interface Log {
  created: string; // ISO timestamp, e.g., "2024-09-22 07:37:32.111Z"
  drone_id: number;
  drone_name: string;
  country: string;
  celsius: number;
}

export interface LogPayload {
  drone_id: number;
  drone_name: string;
  country: string;
  celsius: number;
}

export interface LogResponse {
  celsius: number;
  collectionId: string;
  collectionName: string;
  country: string;
  created: string;
  drone_id: number;
  drone_name: string;
  id: string;
  updated: string;
}
