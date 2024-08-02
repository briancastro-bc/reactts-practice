import { Room, } from './RoomModel';

export interface Hotel {
  id: string;
  name: string;
  description: string;
  photo: string;
  country: string;
  city: string;
  address: string;
  raking: number;
  Rooms?: Array<Room>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}