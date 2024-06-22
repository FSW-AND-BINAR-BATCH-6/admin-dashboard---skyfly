import axios from 'axios';
import { BsFillPencilFill } from 'react-icons/bs';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';

import React, { useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';

const fetchUsers = async () => {
  let token = getCookie('_token');
  const response = await axios.get(
    'https://backend-skyfly-c1.vercel.app/api/v1/users?limit=5000',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

const deleteUser = async (id: string) => {
  let token = getCookie('_token');
  const response = await axios.delete(
    `https://backend-skyfly-c1.vercel.app/api/v1/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};

const updateUser = async (e: React.ChangeEvent<any>) => {
  e.preventDefault();
  let id = e.target.id.value;
  let data = {
    name: e.target.name.value,
    // password: e.target.password.value,
    familyName: e.target.familyName.value,
    phoneNumber: e.target.phoneNumber.value,
    // isVerified: e.target.isVerified.value,
    // role: e.target.role.value,
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

const TableUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {user.name}
                    </h5>
                    <p className="text-sm">{user.familyName}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {user.auth.email}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        user.auth.isVerified === true
                          ? 'bg-success text-success'
                          : user.auth.isVerified === false
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                    >
                      {user.auth.isVerified ? 'verified' : 'un-verified'}
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
                            .getElementById(`detail_modal-${user.id}`)!
                            .showModal()
                        }
                      >
                        <BsEye />
                        {/* detail modal */}
                        <dialog
                          id={`detail_modal-${user.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg text-light ">
                              Detail
                            </h3>
                            <div className="chat chat-start">
                              <div className="chat-bubble">
                                please introduce your self
                              </div>
                            </div>

                            <div className="chat chat-end">
                              <div className="chat-bubble text-start">
                                Hello, my name is <strong>{user.name}</strong>
                                <br />
                                My cellphone number is{' '}
                                <strong>{user.phoneNumber}</strong> <br />
                                My email address is{' '}
                                <strong>{user.auth.email}</strong> <br />
                                My surname{' '}
                                <strong>
                                  {user.familyName || 'Family'}
                                </strong>{' '}
                                <br /> here I am as <strong>{user.role}</strong>{' '}
                                <br />
                                And I have{' '}
                                <strong>
                                  {user.auth.isVerified
                                    ? 'verified'
                                    : 'unverified'}
                                </strong>
                                <br />
                                <br />
                                Nice to meet you ❤
                              </div>
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
                            .getElementById(`delete_modal-${user.id}`)!
                            .showModal()
                        }
                      >
                        <BsFillTrash3Fill />
                        {/* Delete Modal */}
                        <dialog
                          id={`delete_modal-${user.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg">Delete</h3>
                            <p className="py-4">
                              Are you sure for deleting '{user.name}' data?
                            </p>
                            <div className="modal-action justify-between">
                              <button
                                className="btn btn-error"
                                onClick={() => {
                                  deleteUser(user.id);
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
                            .getElementById(`edit_modal-${user.id}`)!
                            .showModal()
                        }
                      >
                        <BsFillPencilFill />
                        {/* Edit Modal */}
                        <dialog id={`edit_modal-${user.id}`} className="modal">
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg">Update</h3>
                            <div className="py-4">
                              {/* form edit */}
                              <form onSubmit={updateUser}>
                                <input
                                  type="hidden"
                                  name="id"
                                  defaultValue={user.id}
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
                                    defaultValue={user.name}
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
                                    defaultValue={user.phoneNumber}
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
                                    defaultValue={user.auth.email}
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
                                    defaultValue={user.familyName}
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
                                    defaultValue={user.auth.password}
                                    name="password"
                                    placeholder="**********"
                                  />
                                </label>
                                {/* isVerified */}
                                <select
                                  className="select w-full input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                  name="isVerified"
                                >
                                  <option
                                    defaultValue={
                                      user.auth.isVerified ? '1' : '0'
                                    }
                                    selected
                                    hidden
                                  >
                                    {user.auth.isVerified
                                      ? 'verified'
                                      : 'un-verified'}
                                  </option>
                                  <option value="1">Verified</option>
                                  <option value="0">Unverified</option>
                                </select>
                                {/* role */}
                                <select
                                  className="select w-full input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                  name="role"
                                >
                                  <option
                                    defaultValue={user.role}
                                    selected
                                    hidden
                                  >
                                    {user.role}
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

export default TableUsers;
