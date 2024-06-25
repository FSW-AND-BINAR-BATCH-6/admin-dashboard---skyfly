import axios from 'axios';
import { BsFillPencilFill } from 'react-icons/bs';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { BsFillAirplaneFill } from 'react-icons/bs';
import { BsBuildingsFill } from 'react-icons/bs';

import React, { useEffect, useState } from 'react';
import { Flight, Airport } from '../../types/flight';
import { getCookie } from 'typescript-cookie';

const fetchFlights = async () => {
  let token = getCookie('_token');
  const response = await axios.get(
    // 'https://backend-skyfly-c1.vercel.app/api/v1/flights?limit=50',
    'http://localhost:2000/api/v1/flights?limit=100',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
};

const fetchAirports = async () => {
  let token = getCookie('_token');
  const response = await axios.get(
    // 'https://backend-skyfly-c1.vercel.app/api/v1/flights?limit=50',
    'http://localhost:2000/api/v1/airports',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
};

const updateFlights = async (e: React.ChangeEvent<any>) => {
  e.preventDefault();
  let id = e.target.id.value;
  let data: Partial<Flight> = {
    departureDate: e.target.departureDate.value,
    departureAirportId: e.target.departureAirportId.value,
    arrivalDate: e.target.arrivalDate.value,
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
    await axios.put(`http://localhost:2000/api/v1/flights/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Flight updated successfully');
  } catch (error) {
    console.error('Error updating flight:', error);
  }
};

const deleteFlights = async (id: string) => {
  let token = getCookie('_token');
  const response = await axios.delete(
    // 'https://backend-skyfly-c1.vercel.app/api/v1/flights?limit=50',
    `http://localhost:2000/api/v1/flights/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

const TableFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    fetchFlights().then((data) => {
      setFlights(data);
    });
    fetchAirports().then((data) => {
      setAirports(data);
    });
  }, []);

  const formatPrice = (price: number) => {
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFlights(id);
      const updatedFlights = await fetchFlights();
      setFlights(updatedFlights);
      const modal = document.getElementById(
        `delete_modal-${id}`,
      ) as HTMLDialogElement;
      modal.close();
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Flight from
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white"></th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  To
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Fee
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {flight.departureAirport.name}
                    </h5>
                    <p className="font-small text-black dark:text-white">
                      {flight.departureDate} - {flight.departureTime}
                    </p>
                    <p className="text-sm flex items-center">
                      <BsBuildingsFill className="mr-2" />
                      {flight.departureAirport.city} -{' '}
                      {flight.departureAirport.code} -{' '}
                      {flight.departureAirport.country}
                    </p>
                    <p className="text-sm flex items-center">
                      <BsFillAirplaneFill className="mr-2" />
                      {flight.plane.name} - {flight.plane.code}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      <BsFillArrowRightCircleFill />
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {flight.destinationAirport.name}
                    </h5>
                    <p className="font-small text-black dark:text-white">
                      {flight.arrivalDate} - {flight.arrivalTime}
                    </p>
                    <p className="text-sm flex items-center">
                      <BsBuildingsFill className="mr-2" />
                      {flight.destinationAirport.city} -{' '}
                      {flight.destinationAirport.code} -{' '}
                      {flight.destinationAirport.country}
                    </p>
                    <p className="text-sm flex items-center">
                      <BsFillAirplaneFill className="mr-2" />
                      {flight.plane.name} - {flight.plane.code}
                    </p>{' '}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatPrice(flight.price)}
                    </p>
                    <p
                      className={
                        flight.discount
                          ? 'text-red-500 text-xs'
                          : 'text-gray-500 text-xs'
                      }
                    >
                      {flight.discount ? `${flight.discount}%` : 'No Discount'}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {/* Detail */}
                      <button
                        className="hover:text-primary"
                        title="detail"
                        onClick={() =>
                          document
                            .getElementById(`detail_modal-${flight.id}`)!
                            .showModal()
                        }
                      >
                        <BsEye />
                      </button>
                      {/* detail modal */}
                      <dialog
                        id={`detail_modal-${flight.id}`}
                        className="modal"
                      >
                        <div className="modal-box bg-white dark:bg-boxdark">
                          <h3 className="font-bold text-lg text-light">
                            Flight Details
                          </h3>
                          <div className="text-start">
                            <p>
                              <strong>Flight ID:</strong> {flight.id}
                            </p>
                            <p>
                              <strong>Flight Code:</strong> {flight.code}
                            </p>
                            <p>
                              <strong>Terminal:</strong> {flight.plane.terminal}
                            </p>
                            <p>
                              <strong>Plane:</strong> {flight.plane.name} (
                              {flight.plane.code})
                            </p>
                            <p>
                              <strong>Price:</strong> IDR{' '}
                              {formatPrice(flight.price)}
                            </p>
                            <p>
                              <strong>Discount:</strong>{' '}
                              {flight.discount
                                ? `${flight.discount}%`
                                : 'No Discount'}
                            </p>
                            <details className="mt-2">
                              <summary className="cursor-pointer">
                                <strong>Departure Information</strong>
                              </summary>
                              <div className="ml-4 mt-2">
                                <p>
                                  <strong>Departure Airport:</strong>{' '}
                                  {flight.departureAirport.name}
                                </p>
                                <p>
                                  <strong>Departure City:</strong>{' '}
                                  {flight.departureAirport.city}
                                </p>
                                <p>
                                  <strong>Departure Country:</strong>{' '}
                                  {flight.departureAirport.country}
                                </p>
                                <p>
                                  <strong>Departure Code:</strong>{' '}
                                  {flight.departureAirport.code}
                                </p>
                                <p>
                                  <strong>Departure Date:</strong>{' '}
                                  {flight.departureDate}
                                </p>
                                <p>
                                  <strong>Departure Time:</strong>{' '}
                                  {flight.departureTime}
                                </p>
                              </div>
                            </details>
                            <details className="mt-2">
                              <summary className="cursor-pointer">
                                <strong>Transit Information</strong>
                              </summary>
                              <div className="ml-4 mt-2">
                                <p>
                                  <strong>Transit Airport:</strong>{' '}
                                  {flight.transit.transitAirport?.name || 'N/A'}
                                </p>
                                <p>
                                  <strong>Transit City:</strong>{' '}
                                  {flight.transit.transitAirport?.city || 'N/A'}
                                </p>
                                <p>
                                  <strong>Transit Country:</strong>{' '}
                                  {flight.transit.transitAirport?.country ||
                                    'N/A'}
                                </p>
                                <p>
                                  <strong>Transit Code:</strong>{' '}
                                  {flight.transit.transitAirport?.code || 'N/A'}
                                </p>
                                <p>
                                  <strong>Transit Arrival Date:</strong>{' '}
                                  {flight.transit?.arrivalDate || 'N/A'}
                                </p>
                                <p>
                                  <strong>Transit Arrival Time:</strong>{' '}
                                  {flight.transit?.arrivalTime || 'N/A'}
                                </p>
                                <p>
                                  <strong>Transit Departure Date:</strong>{' '}
                                  {flight.transit?.departureDate || 'N/A'}
                                </p>
                                <p>
                                  <strong>Transit Departure Time:</strong>{' '}
                                  {flight.transit?.departureTime || 'N/A'}
                                </p>
                              </div>
                            </details>
                            <details className="mt-2">
                              <summary className="cursor-pointer">
                                <strong>Destination Information</strong>
                              </summary>
                              <div className="ml-4 mt-2">
                                <p>
                                  <strong>Destination Airport:</strong>{' '}
                                  {flight.destinationAirport.name}
                                </p>
                                <p>
                                  <strong>Destination City:</strong>{' '}
                                  {flight.destinationAirport.city}
                                </p>
                                <p>
                                  <strong>Destination Country:</strong>{' '}
                                  {flight.destinationAirport.country}
                                </p>
                                <p>
                                  <strong>Destination Code:</strong>{' '}
                                  {flight.destinationAirport.code}
                                </p>
                                <p>
                                  <strong>Arrival Date:</strong>{' '}
                                  {flight.arrivalDate}
                                </p>
                                <p>
                                  <strong>Arrival Time:</strong>{' '}
                                  {flight.arrivalTime}
                                </p>
                              </div>
                            </details>
                          </div>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn btn-ghost dark:bg-boxdark">
                                Close
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>

                      {/* Delete */}
                      <button
                        className="hover:text-danger"
                        title="delete"
                        onClick={() =>
                          document
                            .getElementById(`delete_modal-${flight.id}`)!
                            .showModal()
                        }
                      >
                        <BsFillTrash3Fill />
                        {/* Delete Modal */}
                        <dialog
                          id={`delete_modal-${flight.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg">Delete</h3>
                            <p className="py-4">
                              Are you sure you want to delete this data?
                            </p>
                            <div className="modal-action justify-between">
                              <button
                                className="btn btn-error"
                                onClick={() => handleDelete(flight.id)!.close()}
                              >
                                Yes, Delete it
                              </button>
                              <form method="dialog">
                                <button className="btn btn-ghost">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </button>

                      {/* Edit */}
                      <button
                        className="hover:text-blue-500"
                        title="edit"
                        onClick={() =>
                          document
                            .getElementById(`edit_modal-${flight.id}`)!
                            .showModal()
                        }
                      >
                        <BsFillPencilFill />
                        {/* Edit Modal */}
                        <dialog
                          id={`edit_modal-${flight.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg">Update</h3>
                            <div className="py-4">
                              {/* form edit */}
                              <form onSubmit={updateFlights}>
                                <input
                                  type="hidden"
                                  name="id"
                                  defaultValue={flight.id}
                                />
                                {/* Departure Date */}
                                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  <svg
                                    className="flex items-center gap-2 w-full"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                                      fill="#64748B"
                                    />
                                  </svg>
                                  Departure Date
                                </span>
                                <label className="input input-bordered flex items-start gap-1 my-2 bg-white dark:bg-boxdark p-2 w-full">
                                  <div className="flex items-center gap-2 w-full">
                                    <input
                                      defaultValue={
                                        flight.departureDate.split('T')[0]
                                      }
                                      type="date"
                                      className="grow w-full"
                                      placeholder="Departure Date"
                                      name="departureDate"
                                      id="departureDate"
                                    />
                                    <input
                                      defaultValue={flight.departureTime}
                                      type="time"
                                      className="grow w-full"
                                      placeholder="Departure Time"
                                      name="departureTime"
                                      id="departureTime"
                                    />
                                  </div>
                                </label>
                                {/* Departure Airport */}
                                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  <svg
                                    className="flex items-center gap-2 w-full"
                                    width="18"
                                    height="18"
                                    fill="#64748B"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512"
                                  >
                                    <path d="M381 114.9L186.1 41.8c-16.7-6.2-35.2-5.3-51.1 2.7L89.1 67.4C78 73 77.2 88.5 87.6 95.2l146.9 94.5L136 240 77.8 214.1c-8.7-3.9-18.8-3.7-27.3 .6L18.3 230.8c-9.3 4.7-11.8 16.8-5 24.7l73.1 85.3c6.1 7.1 15 11.2 24.3 11.2H248.4c5 0 9.9-1.2 14.3-3.4L535.6 212.2c46.5-23.3 82.5-63.3 100.8-112C645.9 75 627.2 48 600.2 48H542.8c-20.2 0-40.2 4.8-58.2 14L381 114.9zM0 480c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z" />
                                  </svg>
                                  Departure Airport
                                </label>
                                <select
                                  className="select w-full input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                  name="departureAirportId"
                                >
                                  <option value={flight.departureAirport.id}>
                                    {flight.departureAirport.name}
                                  </option>
                                  {airports.map((airport) => (
                                    <option key={airport.id} value={airport.id}>
                                      {airport.name}
                                    </option>
                                  ))}
                                </select>
                                {/* Arrival Date */}
                                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  <svg
                                    className="flex items-center gap-2 w-full"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                                      fill="#64748B"
                                    />
                                  </svg>
                                  Arrival Date
                                </span>
                                <label className="input input-bordered flex items-start gap-1 my-2 bg-white dark:bg-boxdark p-2 w-full">
                                  <div className="flex items-center gap-2 w-full">
                                    <input
                                      defaultValue={
                                        flight.arrivalDate.split('T')[0]
                                      }
                                      type="date"
                                      className="grow w-full"
                                      placeholder="Arrival Date"
                                      name="arrivalDate"
                                    />
                                    <input
                                      defaultValue={flight.arrivalTime}
                                      type="time"
                                      className="grow w-full"
                                      placeholder="Departure Time"
                                      name="arrivalTime"
                                    />
                                  </div>
                                </label>
                                {/* Destination Airport */}
                                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  <svg
                                    className="flex items-center gap-2 w-full"
                                    width="18"
                                    height="18"
                                    fill="#64748B"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512"
                                  >
                                    <path d="M.3 166.9L0 68C0 57.7 9.5 50.1 19.5 52.3l35.6 7.9c10.6 2.3 19.2 9.9 23 20L96 128l127.3 37.6L181.8 20.4C178.9 10.2 186.6 0 197.2 0h40.1c11.6 0 22.2 6.2 27.9 16.3l109 193.8 107.2 31.7c15.9 4.7 30.8 12.5 43.7 22.8l34.4 27.6c24 19.2 18.1 57.3-10.7 68.2c-41.2 15.6-86.2 18.1-128.8 7L121.7 289.8c-11.1-2.9-21.2-8.7-29.3-16.9L9.5 189.4c-5.9-6-9.3-14.1-9.3-22.5zM32 448H608c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32zm96-80a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm128-16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                  </svg>
                                  Destination Airport
                                </label>
                                <select
                                  className="select w-full input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                  name="destinationAirportId"
                                >
                                  <option value={flight.destinationAirport.id}>
                                    {flight.destinationAirport.name}
                                  </option>
                                  {airports.map((airport) => (
                                    <option key={airport.id} value={airport.id}>
                                      {airport.name}
                                    </option>
                                  ))}
                                </select>
                                {/* Capacity */}
                                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  <svg
                                    className="flex items-center gap-2 w-full"
                                    width="18"
                                    height="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                    fill="#64748B"
                                  >
                                    <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z" />
                                  </svg>
                                  Capacity
                                  <input
                                    type="number"
                                    className="input w-full input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                    defaultValue={flight.capacity}
                                    name="capacity"
                                    max={72}
                                  />
                                </label>
                                {/* Price */}
                                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  <svg
                                    className="flex items-center gap-2 w-full"
                                    width="18"
                                    height="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    fill="#64748B"
                                  >
                                    <path d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z" />
                                  </svg>
                                  Price
                                  <input
                                    type="text"
                                    className="input w-full input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                    defaultValue={flight.price}
                                    name="price"
                                    placeholder="Rp 0"
                                  />
                                </label>
                                {/* Discount */}
                                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  <svg
                                    className="flex items-center gap-2 w-full"
                                    width="18"
                                    height="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                    fill="#64748B"
                                  >
                                    <path d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
                                  </svg>
                                  Discount
                                  <input
                                    type="number"
                                    className="input w-full input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                    defaultValue={
                                      flight.discount ? flight.discount : 0
                                    }
                                    name="discount"
                                    max={100.0}
                                    placeholder="0.0"
                                  />
                                </label>
                                {/* Facilities */}
                                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  <svg
                                    className="flex items-center gap-2 w-full"
                                    width="18"
                                    height="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                    fill="#64748B"
                                  >
                                    <path d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
                                  </svg>
                                  Facilities
                                  <input
                                    type="textArea"
                                    className="input w-full input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                    defaultValue={
                                      flight.facilities ? flight.facilities : ''
                                    }
                                    name="facilities"
                                  />
                                </label>
                                <input
                                  type="submit"
                                  defaultValue="Update"
                                  className="btn bg-white dark:bg-black w-full my-3"
                                />
                              </form>
                            </div>
                            <div className="modal-action">
                              <form method="dialog">
                                <button className="btn btn-ghost">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableFlights;
