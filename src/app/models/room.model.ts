export interface Room {
  id: string;
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
  rooms: BookedRoom[];
}

interface BookedRoom extends Room {
  roomData: Room;
  roomId: string;
}
