export interface Room {
  id: number;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  amenities: string[];
  images: string[];
  availability: boolean;
  rating: number;
  reviews: { user: string; comment: string; rating: number }[];
  availableDates: string[];
}