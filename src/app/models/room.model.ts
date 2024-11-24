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
  bookedDates: string[];
  address: string;
}

export interface UserRoom {
  id: string;
  roomId: number;
  selectedDates: string[];
  userId: string;
}
