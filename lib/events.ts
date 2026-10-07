import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { EventItem, EventCategory } from "@/types/event";

export interface EventData {
  site: {
    name: string;
    tagline: string;
    heroTitle: string;
    heroText: string;
    heroImage: string;
  };
  stats: {
    eventsThisSemester: string;
    studentsJoined: string;
  };
  categories: EventCategory[];
  events: EventItem[];
}

const jsonPath = path.join(process.cwd(), "data", "events.json");

export async function getEventData(): Promise<EventData> {
  const file = await fs.readFile(jsonPath, "utf-8");
  return JSON.parse(file) as EventData;
}

export async function getEventById(id: string): Promise<EventItem | undefined> {
  const data = await getEventData();
  return data.events.find((event) => event.id === id);
}
