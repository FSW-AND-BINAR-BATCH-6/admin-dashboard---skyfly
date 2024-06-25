export type Airport = {
  id: string;
  name: string;
  code: string;
  country: string;
  city: string;
  continent: string;
  image: string;
};

export type Plane = {
  id: string;
  name: string;
  code: string;
  image: string;
  terminal: string;
};

export type Flight = {
  id: string;
  plane: Plane;
  departureDate: string;
  departureTime: string;
  code: string;
  departureAirportId: Airport;
  transit: {
    transitAirport: Airport;
    arrivalDate: string;
    arrivalTime: string;
    departureDate: string;
    departureTime: string;
  };
  arrivalDate: string;
  arrivalTime: string;
  destinationAirportId: Airport;
  capacity: number;
  discount: null | number;
  price: number;
  facilities?: null | string;
  duration: string;
  seatClasses: string[];
  prices: { [key: string]: number | null };
};  
