export interface Room {
  id: number;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  amenities: string[];
  image: string;
  availability: boolean;
  rating: number;
  availableDates: string[];
  address: string;
}
