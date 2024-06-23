import axios from 'axios';
import { BsFillPencilFill } from 'react-icons/bs';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { BsFillAirplaneFill } from 'react-icons/bs';
import { BsBuildingsFill } from 'react-icons/bs';

import React, { useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';

const fetchFlights = async () => {
  let token = getCookie('_token');
  const response = await axios.get(
    // 'https://backend-skyfly-c1.vercel.app/api/v1/flights?limit=100',
    'http://localhost:2000/api/v1/flights?limit=100',
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
    let data = {
      departureDate: e.target.name.value,
      departureAirportId: e.target.departureAirportId.value,
      transitArrivalDate: e.target.transitArivvalDate.value,
      transitDepartureDate: e.target.transitDepartureDate.value,
      transitAirportId: e.target.transitAirportId.value,
      arrivalDate: e.target.arrivalDate.value,
      destinationAirportId: e.target.destinationAirportId.value,
      capacity: e.target.capacity.value,
      discount: e.target.discount.value,
      price: e.target.price.value,
      facilities: e.target.facilities.value,
    };
  
    let token = getCookie('_token');
  
    const response = await axios.put(
      `https://backend-skyfly-c1.vercel.app/api/v1/users/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  
    return response.data.data;
  };

  
const deleteFlights = async (id: string) => {
  let token = getCookie('_token');
  const response = await axios.delete(
    `http://localhost:2000/api/v1/flights/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

const formatPrice = (price: number) => {
  return `${price.toLocaleString('id-ID').trim()}`;
};

const TableFlights = () => {
  const [flights, setFlights] = useState<any[]>([]);

  useEffect(() => {
    fetchFlights().then((data) => {
      setFlights(data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteFlights(id); 
      const updatedFlights = await fetchFlights(); 
      setFlights(updatedFlights); 
      const modal = document.getElementById(`delete_modal-${id}`) as HTMLDialogElement;
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
                      IDR {formatPrice(flight.price)}
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
                                {/* name */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                  >
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                  </svg>
                                  <input
                                    type="text"
                                    className="grow"
                                    placeholder="Name"
                                    name="name"
                                    defaultValue={flight.name}
                                  />
                                </label>
                                {/* phoneNumber */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                  >
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                  </svg>
                                  <input
                                    type="text"
                                    className="grow"
                                    placeholder="62xxx"
                                    name="phoneNumber"
                                    defaultValue={flight.phoneNumber}
                                  />
                                </label>
                                {/* email */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                  >
                                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                  </svg>
                                  <input
                                    type="text"
                                    className="grow"
                                    placeholder="Email"
                                    name="email"
                                    defaultValue={flight.image}
                                    readOnly
                                  />
                                </label>
                                {/* familyName */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                  >
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                  </svg>
                                  <input
                                    type="text"
                                    className="grow"
                                    placeholder="Family Name"
                                    name="familyName"
                                    defaultValue={flight.familyName}
                                  />
                                </label>
                                {/* password */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <input
                                    type="password"
                                    className="grow"
                                    defaultValue={flight.image}
                                    name="password"
                                    placeholder="**********"
                                  />
                                </label>
                                {/* isVerified */}
                                <select
                                  className="select w-full input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                  name="isVerified"
                                >
                                </select>
                                {/* role */}
                                <select
                                  className="select w-full input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                  name="role"
                                >
                                  <option
                                    defaultValue={flight.role}
                                    selected
                                    hidden
                                  >
                                    {flight.role}
                                  </option>
                                  <option value="ADMIN">ADMIN</option>
                                  <option value="BUYER">BUYER</option>
                                </select>

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
