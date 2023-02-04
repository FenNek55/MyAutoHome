export interface PMSEntry {
    id: number;
    timestamp: string;
    pm1: number;
    pm25: number;
    pm10: number;
}

export interface DHTEntry {
    id: number;
    timestamp: string;
    temperature: number;
    humidity: number;
}
