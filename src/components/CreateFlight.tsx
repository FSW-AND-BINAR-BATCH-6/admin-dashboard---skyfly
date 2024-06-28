import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Airport, Flight, Plane } from '../types/flight';
import { getCookie } from 'typescript-cookie';

// https://backend-skyfly-c1.vercel.app/api/v1/users/${id}
const fetchAirports = async () => {
  let token = getCookie('_token');
  const response = await axios.get('https://backend-skyfly-c1.vercel.app/api/v1/airports', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

const fetchAirlines = async () => {
  let token = getCookie('_token');
  const response = await axios.get('https://backend-skyfly-c1.vercel.app/api/v1/airlines', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

const createFlight = async (
  e: React.ChangeEvent<any>,
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  formRef: React.RefObject<HTMLFormElement>,
) => {
  e.preventDefault();

  const combineDateTime = (date: string, time: string) => {
    return new Date(`${date}T${time}:00`).toISOString();
  };

  let data: Partial<Flight> = {
    planeId: e.target.planeId.value,
    departureDate: combineDateTime(
      e.target.departureDate.value,
      e.target.departureTime.value,
    ),
    departureAirportId: e.target.departureAirportId.value,
    arrivalDate: combineDateTime(
      e.target.arrivalDate.value,
      e.target.arrivalTime.value,
    ),
    destinationAirportId: e.target.destinationAirportId.value,
    capacity: e.target.capacity.value,
    discount: e.target.discount.value,
    price: e.target.price.value,
  };

  if (e.target.facilities && e.target.facilities.value.trim() !== '') {
    data.facilities = e.target.facilities.value;
  }

  try {
    let token = getCookie('_token');
    await axios.post('https://backend-skyfly-c1.vercel.app/api/v1/flights', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Flight created successfully');
    if (formRef.current) {
      formRef.current.reset();
    }
    setIsFormVisible(false); 
  } catch (error) {
    console.error('Error creating flight:', error);
  }
};

const FlightsForm = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [airlines, setAirlines] = useState<Plane[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchAirports().then((data) => {
      setAirports(data);
    });
    fetchAirlines().then((data) => {
      setAirlines(data);
    });
  }, []);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <div>
        <button onClick={toggleForm} className="btn btn-primary">
          Create Flight
        </button>
        {isFormVisible && (
          <form
            id="flightForm"
            ref={formRef}
            onSubmit={(e) => createFlight(e, setIsFormVisible, formRef)}
          >
            {/* Airlines */}
            <div className="my-4">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Airlines
              </label>
              <select
                className="select w-full input input-bordered"
                name="planeId"
                required
              >
                <option value="">Select Airline</option>
                {airlines.map((plane) => (
                  <option key={plane.id} value={plane.id}>
                    {plane.name}
                  </option>
                ))}
              </select>
            </div>

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
                max={72}
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

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleForm}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default FlightsForm;
