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
  planeId: Plane;
  departureDate: string;
  departureTime: string;
  code: string;
  departureAirport: Airport;
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
  destinationAirport: Airport;
  destinationAirportId: Airport;
  capacity: number;
  discount: null | number;
  price: number;
  facilities?: null | string;
  duration: string;
  seatClasses: string[];
  prices: { [key: string]: number | null };
};  
