import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';
import Loader1 from '../Loader';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  BsFillPencilFill,
  BsFillTrash3Fill,
  BsEye,
  BsPlus,
} from 'react-icons/bs';

const fetchAirports = async () => {
  try {
    let token = getCookie('_token');
    const response = await axios.get(
      'https://backend-skyfly-c1.vercel.app/api/v1/airports?limit=5000',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error('Fetch Airports Error:', error);
    throw new Error('Failed to fetch airports');
  }
};

const deleteAirport = async (id: string, navigate: any) => {
  try {
    let token = getCookie('_token');
    await axios.delete(
      `https://backend-skyfly-c1.vercel.app/api/v1/airports/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    toast.success('Airport deleted successfully');
    navigate(0);
  } catch (error) {
    console.error('Delete Airport Error:', error);
    toast.error('Failed to delete airport');
  }
};

const createAirport = async (e: React.ChangeEvent<any>, navigate: any) => {
  e.preventDefault();

  try {
    let formData = new FormData();
    formData.append('code', e.target.code.value);
    formData.append('name', e.target.name.value);
    formData.append('country', e.target.country.value);
    formData.append('city', e.target.city.value);
    formData.append('continent', e.target.continent.value);
    if (e.target.image.files[0]) {
      formData.append('image', e.target.image.files[0]);
    }

    let token = getCookie('_token');

    const response = await axios.post(
      'https://backend-skyfly-c1.vercel.app/api/v1/airports',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    toast.success('Airport created successfully');
    navigate(0); // Reload the page to reflect the changes

    return response.data.data;
  } catch (error) {
    console.error('Create Airport Error:', error);
    toast.error('Failed to create airport');
    return null;
  }
};

const updateAirport = async (e: React.ChangeEvent<any>, navigate: any) => {
  e.preventDefault();
  let id = e.target.id.value;

  try {
    let formData = new FormData();
    formData.append('code', e.target.code.value);
    formData.append('name', e.target.name.value);
    formData.append('country', e.target.country.value);
    formData.append('city', e.target.city.value);
    formData.append('continent', e.target.continent.value);
    if (e.target.image.files[0]) {
      formData.append('image', e.target.image.files[0]);
    }

    let token = getCookie('_token');

    const response = await axios.put(
      `https://backend-skyfly-c1.vercel.app/api/v1/airports/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    toast.success('Airport updated successfully');
    navigate(0); // Reload the page to reflect the changes

    return response.data.data;
  } catch (error) {
    console.error('Update Airport Error:', error);
    toast.error('Failed to update airport');
    return null;
  }
};

const TableAirports = () => {
  const [airports, setAirports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const airportsData = await fetchAirports();
        setAirports(airportsData);
      } catch (error) {
        console.error('Fetch Data Error:', error);
        toast.error('Failed to fetch airports data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end mb-4">
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('create_modal')!.showModal()}
          >
            <BsPlus /> Add Airport
          </button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Code
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Country
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  City
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Continent
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Image
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {airports.map((airport, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {airport.code}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{airport.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {airport.country}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{airport.city}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {airport.continent}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <img
                      src={airport.image}
                      alt={airport.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {/* Detail */}
                      <button
                        className="hover:text-primary"
                        title="detail"
                        onClick={() =>
                          document
                            .getElementById(`detail_modal-${airport.id}`)!
                            .showModal()
                        }
                      >
                        <BsEye />
                        {/* detail modal */}
                        <dialog
                          id={`detail_modal-${airport.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg text-light ">
                              Detail
                            </h3>
                            <div className="py-4">
                              <p>
                                <strong>Code:</strong> {airport.code}
                              </p>
                              <p>
                                <strong>Name:</strong> {airport.name}
                              </p>
                              <p>
                                <strong>Country:</strong> {airport.country}
                              </p>
                              <p>
                                <strong>City:</strong> {airport.city}
                              </p>
                              <p>
                                <strong>Continent:</strong> {airport.continent}
                              </p>
                              <p>
                                <strong>Image:</strong> {airport.image}
                              </p>
                              <br />
                            </div>
                            <div className="modal-action">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-ghost dark:bg-boxdark">
                                  Close
                                </button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </button>

                      {/* Delete */}
                      <button
                        className="hover:text-danger"
                        title="delete"
                        onClick={() =>
                          document
                            .getElementById(`delete_modal-${airport.id}`)!
                            .showModal()
                        }
                      >
                        <BsFillTrash3Fill />
                        {/* Delete Modal */}
                        <dialog
                          id={`delete_modal-${airport.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg">Delete</h3>
                            <p className="py-4">
                              Are you sure for deleting '{airport.name}' data?
                            </p>
                            <div className="modal-action justify-between">
                              <button
                                className="btn btn-error"
                                onClick={() => {
                                  deleteAirport(airport.id, navigate);
                                }}
                              >
                                Yes, Delete it
                              </button>
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-ghost">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </button>

                      {/* Edit */}
                      <button
                        className="hover:text-warning"
                        title="edit"
                        onClick={() =>
                          document
                            .getElementById(`edit_modal-${airport.id}`)!
                            .showModal()
                        }
                      >
                        <BsFillPencilFill />
                        {/* Edit Modal */}
                        <dialog
                          id={`edit_modal-${airport.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg">Edit</h3>
                            <div className="py-4">
                              <form
                                onSubmit={(
                                  e: React.ChangeEvent<HTMLFormElement>,
                                ) => {
                                  updateAirport(e, navigate);
                                }}
                              >
                                <input
                                  type="hidden"
                                  name="id"
                                  defaultValue={airport.id}
                                />
                                <div className="mb-4">
                                  <label
                                    htmlFor="code"
                                    className="block text-gray-700 dark:text-white font-bold mb-2"
                                  >
                                    Code
                                  </label>
                                  <input
                                    type="text"
                                    name="code"
                                    defaultValue={airport.code}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    htmlFor="name"
                                    className="block text-gray-700 dark:text-white font-bold mb-2"
                                  >
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    defaultValue={airport.name}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    htmlFor="country"
                                    className="block text-gray-700 dark:text-white font-bold mb-2"
                                  >
                                    Country
                                  </label>
                                  <input
                                    type="text"
                                    name="country"
                                    defaultValue={airport.country}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    htmlFor="city"
                                    className="block text-gray-700 dark:text-white font-bold mb-2"
                                  >
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    name="city"
                                    defaultValue={airport.city}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    htmlFor="continent"
                                    className="block text-gray-700 dark:text-white font-bold mb-2"
                                  >
                                    Continent
                                  </label>
                                  <input
                                    type="text"
                                    name="continent"
                                    defaultValue={airport.continent}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    htmlFor="image"
                                    className="block text-gray-700 dark:text-white font-bold mb-2"
                                  >
                                    Image
                                  </label>
                                  <input
                                    type="file"
                                    name="image"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <button
                                    className="btn btn-primary"
                                    type="submit"
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="btn btn-ghost"
                                    type="button"
                                    onClick={() =>
                                      document
                                        .getElementById(
                                          `edit_modal-${airport.id}`,
                                        )!
                                        .close()
                                    }
                                  >
                                    Cancel
                                  </button>
                                </div>
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

      {/* Create Modal */}
      <dialog id="create_modal" className="modal">
        <div className="modal-box bg-white dark:bg-boxdark">
          <h3 className="font-bold text-lg">Add Airline</h3>
          <div className="py-4">
            <form
              onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                createAirport(e, navigate);
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="code"
                  className="block text-gray-700 dark:text-white font-bold mb-2"
                >
                  Code
                </label>
                <input
                  type="text"
                  name="code"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-white font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-gray-700 dark:text-white font-bold mb-2"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-gray-700 dark:text-white font-bold mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="continent"
                  className="block text-gray-700 dark:text-white font-bold mb-2"
                >
                  Continent
                </label>
                <input
                  type="text"
                  name="continent"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 dark:text-white font-bold mb-2"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="btn btn-primary" type="submit">
                  Create
                </button>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() =>
                    document.getElementById('create_modal')!.close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TableAirports;
