import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Airport, Flight } from '../types/flight';
import { getCookie } from 'typescript-cookie';

const fetchAirports = async () => {
  let token = getCookie('_token');
  const response = await axios.get(
    'http://localhost:2000/api/v1/airports',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
};

const createFlight = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  let data: Partial<Flight> = {
    departureDate: formData.get('departureDate') as string,
    departureAirportId: formData.get('departureAirportId') as string,
    arrivalDate: formData.get('arrivalDate') as string,
    destinationAirportId: formData.get('destinationAirportId') as string,
    capacity: Number(formData.get('capacity')),
    discount: Number(formData.get('discount')),
    price: Number(formData.get('price')),
  };

  const facilities = formData.get('facilities') as string;
  if (facilities && facilities.trim() !== '') {
    data.facilities = facilities;
  }

  try {
    let token = getCookie('_token');
    await axios.post('http://localhost:2000/api/v1/flights', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Flight created successfully');
    e.currentTarget.reset();
  } catch (error) {
    console.error('Error creating flight:', error);
  }
};

const FlightsForm = () => {
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    fetchAirports().then((data) => {
      setAirports(data);
    });
  }, []);

  const toggleForm = () => {
    const form = document.getElementById('flightForm');
    if (form) {
      form.classList.toggle('hidden');
    }
  };

  return (
    <div>
      <button
        onClick={toggleForm}
        className="btn btn-primary"
      >
        Create Flight
      </button>
      <form
        id="flightForm"
        className="hidden"
        onSubmit={createFlight}
      >
        {/* Departure Date and Time */}
        <div className="my-4">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Departure Date and Time
          </label>
          <div className="flex items-center gap-2 w-full">
            <input
              type="date"
              className="input w-full input-bordered"
              name="departureDate"
              required
            />
            <input
              type="time"
              className="input w-full input-bordered"
              name="departureTime"
              required
            />
          </div>
        </div>

        {/* Departure Airport */}
        <div className="my-4">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Departure Airport
          </label>
          <select
            className="select w-full input input-bordered"
            name="departureAirportId"
            required
          >
            <option value="">Select Departure Airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name}
              </option>
            ))}
          </select>
        </div>

        {/* Arrival Date and Time */}
        <div className="my-4">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Arrival Date and Time
          </label>
          <div className="flex items-center gap-2 w-full">
            <input
              type="date"
              className="input w-full input-bordered"
              name="arrivalDate"
              required
            />
            <input
              type="time"
              className="input w-full input-bordered"
              name="arrivalTime"
              required
            />
          </div>
        </div>

        {/* Destination Airport */}
        <div className="my-4">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Destination Airport
          </label>
          <select
            className="select w-full input input-bordered"
            name="destinationAirportId"
            required
          >
            <option value="">Select Destination Airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name}
              </option>
            ))}
          </select>
        </div>

        {/* Capacity */}
        <div className="my-4">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Capacity
          </label>
          <input
            type="number"
            className="input w-full input-bordered"
            name="capacity"
            required
          />
        </div>

        {/* Price */}
        <div className="my-4">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Price
          </label>
          <input
            type="number"
            className="input w-full input-bordered"
            name="price"
            required
          />
        </div>

        {/* Discount */}
        <div className="my-4">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Discount
          </label>
          <input
            type="number"
            className="input w-full input-bordered"
            name="discount"
            max={100}
            required
          />
        </div>

        {/* Facilities */}
        <div className="my-4">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Facilities
          </label>
          <textarea
            className="input w-full input-bordered"
            name="facilities"
            placeholder="Facilities"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Create Flight
        </button>
      </form>
    </div>
  );
};

export default FlightsForm;
