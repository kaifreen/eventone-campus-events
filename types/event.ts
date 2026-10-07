export type EventCategory =
  | "Technical"
  | "Workshop"
  | "Cultural"
  | "Hackathon"
  | "Sports"
  | "Others";

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  status: "Open" | "Limited" | "Full";
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  attendees: number;
  organizer: string;
  tags: string[];
  featured?: boolean;
}