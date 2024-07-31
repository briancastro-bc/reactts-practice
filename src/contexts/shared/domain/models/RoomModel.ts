export interface Room {
  id: string;
  photos: Array<string>;
  codeName: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  bedsQuantity: number;
  createdAt: number;
  updatedAt: number;
}