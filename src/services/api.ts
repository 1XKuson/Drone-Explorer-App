import axios from "axios";
import { Config, Log, LogPayload, LogResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
const DRONE_ID = import.meta.env.VITE_DRONE_ID;

export const getConfig = async (): Promise<Config> => {
  const response = await axios.get<Config>(`${API_URL}/configs/${DRONE_ID}`);
  return response.data;
};

export const postLog = async (logData: LogPayload): Promise<LogResponse> => {
  const response = await axios.post(`${API_URL}/logs`, logData);
  return response.data;
};

export const getLogs = async (droneId: number): Promise<Log[]> => {
  const response = await axios.get<Log[]>(`${API_URL}/logs/${droneId}`);
  return response.data;
};
