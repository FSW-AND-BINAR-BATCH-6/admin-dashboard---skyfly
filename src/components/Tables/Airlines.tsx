import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  BsFillPencilFill,
  BsFillTrash3Fill,
  BsEye,
  BsPlus,
} from 'react-icons/bs';
import Paginate from 'react-paginate';

const deleteAirline = async (id: string, navigate: any) => {
  try {
    let isLogin: any = getCookie('isLogin') || false;
    let userLoggedIn = JSON.parse(isLogin);
    let token = userLoggedIn.token;
    await axios.delete(
      `https://backend-skyfly-c1.vercel.app/api/v1/airlines/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    toast.success('Airline deleted successfully');
    navigate(0);
  } catch (error) {
    console.error('Delete Airline Error:', error);
    toast.error('Failed to delete airline');
  }
};

const createAirline = async (e: React.ChangeEvent<any>, navigate: any) => {
  e.preventDefault();

  try {
    let formData = new FormData();
    formData.append('code', e.target.code.value);
    formData.append('name', e.target.name.value);
    formData.append('terminal', e.target.terminal.value);

    if (e.target.image.files[0]) {
      formData.append('image', e.target.image.files[0]);
    }

    let isLogin: any = getCookie('isLogin') || false;
    let userLoggedIn = JSON.parse(isLogin);
    let token = userLoggedIn.token;

    const response = await axios.post(
      'https://backend-skyfly-c1.vercel.app/api/v1/airlines',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    toast.success('Airline created successfully');
    navigate(0); // Reload the page to reflect the changes

    return response.data.data;
  } catch (error) {
    console.error('Create Airline Error:', error);
    toast.error('Failed to create airline');
    return null;
  }
};

const updateAirline = async (e: React.ChangeEvent<any>, navigate: any) => {
  e.preventDefault();
  let id = e.target.id.value;

  try {
    let formData = new FormData();
    formData.append('code', e.target.code.value);
    formData.append('name', e.target.name.value);
    formData.append('terminal', e.target.terminal.value);

    if (e.target.image.files[0]) {
      formData.append('image', e.target.image.files[0]);
    }

    let isLogin: any = getCookie('isLogin') || false;
    let userLoggedIn = JSON.parse(isLogin);
    let token = userLoggedIn.token;

    const response = await axios.put(
      `https://backend-skyfly-c1.vercel.app/api/v1/airlines/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    toast.success('Airline updated successfully');
    navigate(0);

    return response.data.data;
  } catch (error) {
    console.error('Update Airline Error:', error);
    toast.error('Failed to update airline');
    return null;
  }
};

const TableAirlines = () => {
  const [airlines, setAirlines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [rows, setRows] = useState<number>(0);

  const navigate = useNavigate();
  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const fetchData = async () => {
    try {
      let isLogin: any = getCookie('isLogin') || false;
      let userLoggedIn = JSON.parse(isLogin);
      let token = userLoggedIn.token;
      const response = await axios.get(
        `https://backend-skyfly-c1.vercel.app/api/v1/airlines?limit=${limit}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      setAirlines(response.data.data);
      setRows(response.data.totalItems);
      setPage(response.data.pagination.currentPage);
      setPages(response.data.pagination.totalPage);
    } catch (error) {
      console.error('Fetch Data Error:', error);
      toast.error('Failed to fetch airlines data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

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
            <BsPlus /> Add Airline
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
                  Terminal
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
              {airlines.map((airline, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {airline.code}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{airline.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {airline.terminal}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <img
                      src={airline.image}
                      alt={airline.name}
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
                            .getElementById(`detail_modal-${airline.id}`)!
                            .showModal()
                        }
                      >
                        <BsEye />
                        {/* detail modal */}
                        <dialog
                          id={`detail_modal-${airline.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg text-light ">
                              Detail
                            </h3>
                            <div className="py-4">
                              <p>
                                <strong>Code:</strong> {airline.code}
                              </p>
                              <p>
                                <strong>Name:</strong> {airline.name}
                              </p>
                              <p>
                                <strong>Terminal:</strong> {airline.terminal}
                              </p>
                              <p>
                                <strong>Image:</strong> {airline.image}
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
                            .getElementById(`delete_modal-${airline.id}`)!
                            .showModal()
                        }
                      >
                        <BsFillTrash3Fill />
                        {/* Delete Modal */}
                        <dialog
                          id={`delete_modal-${airline.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg">Delete</h3>
                            <p className="py-4">
                              Are you sure for deleting '{airline.name}' data?
                            </p>
                            <div className="modal-action justify-between">
                              <button
                                className="btn btn-error"
                                onClick={() => {
                                  deleteAirline(airline.id, navigate);
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
                            .getElementById(`edit_modal-${airline.id}`)!
                            .showModal()
                        }
                      >
                        <BsFillPencilFill />
                        {/* Edit Modal */}
                        <dialog
                          id={`edit_modal-${airline.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg">Edit</h3>
                            <div className="py-4">
                              <form
                                onSubmit={(
                                  e: React.ChangeEvent<HTMLFormElement>,
                                ) => {
                                  updateAirline(e, navigate);
                                }}
                              >
                                <input
                                  type="hidden"
                                  name="id"
                                  defaultValue={airline.id}
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
                                    defaultValue={airline.code}
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
                                    defaultValue={airline.name}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    htmlFor="terminal"
                                    className="block text-gray-700 dark:text-white font-bold mb-2"
                                  >
                                    Terminal
                                  </label>
                                  <input
                                    type="text"
                                    name="terminal"
                                    defaultValue={airline.terminal}
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
                                  <div className="modal-action">
                                    <form method="dialog">
                                      <button className="btn btn-ghost">
                                        Close
                                      </button>
                                    </form>
                                  </div>
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
          <p className="mt-3">
            Total Data: {rows} Page: {rows ? page : 0} of {pages}
          </p>
          <nav
            className="pagination is-centered"
            role="navigation"
            key={rows}
            aria-label="pagination"
          >
            <Paginate
              previousLabel={'< Prev'}
              nextLabel={'Next >'}
              pageCount={pages}
              onPageChange={changePage}
              containerClassName="join"
              pageLinkClassName="join-item btn mx-1"
              activeClassName="btn btn-active"
              previousLinkClassName="btn"
              nextLinkClassName="btn"
              disabledLinkClassName="btn btn-disabled"
            />
          </nav>
        </div>
      </div>

      {/* Create Modal */}
      <dialog id="create_modal" className="modal">
        <div className="modal-box bg-white dark:bg-boxdark">
          <h3 className="font-bold text-lg">Add Airline</h3>
          <div className="py-4">
            <form
              onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                createAirline(e, navigate);
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
                  htmlFor="terminal"
                  className="block text-gray-700 dark:text-white font-bold mb-2"
                >
                  Terminal
                </label>
                <input
                  type="text"
                  name="terminal"
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
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-ghost">Close</button>
                  </form>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TableAirlines;
