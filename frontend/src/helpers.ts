import type { DhtEntry } from './types';
interface agregatedDhtEntry {
    hour: number;
    temperature: number;
    humidity: number;
}

export const timestampToDateStr = (timestamp: string) => {
    const date = new Date(+timestamp * 1000);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export const agregateDhtEntriesByHour = (entries: DhtEntry[]) => {
    const hourLength = 3600;
    const dayLenght = 24 * hourLength;
    const timestamp24HoursAgo = Math.floor(Date.now() / 1000) - dayLenght;

    const entriesFromLast24Hours = entries.filter(entry => +entry.timestamp > timestamp24HoursAgo);

    const results: agregatedDhtEntry[] = []
    let hour = new Date(timestamp24HoursAgo * 1000).getHours();

    for(let i = 0; i < 24; i++) {
        const startingTimestamp = timestamp24HoursAgo + i * hourLength;
        const endingTimestamp = startingTimestamp + hourLength;

        const entriesInHour = entriesFromLast24Hours.filter(entry => +entry.timestamp > startingTimestamp && +entry.timestamp < endingTimestamp);

        const temperature = entriesInHour.reduce((acc, entry) => acc + entry.temperature, 0) / entriesInHour.length;
        const humidity = entriesInHour.reduce((acc, entry) => acc + entry.humidity, 0) / entriesInHour.length;

        results.push({
            hour,
            temperature: Math.round(temperature * 100) / 100,
            humidity: Math.round(humidity * 100) / 100,
        });

        hour = hour === 23 ? 0 : hour + 1;
    }

    return results;
}