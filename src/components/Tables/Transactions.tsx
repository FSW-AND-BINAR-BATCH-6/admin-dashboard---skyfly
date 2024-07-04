import axios from 'axios';
import { BsFillPencilFill } from 'react-icons/bs';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import { BiBaguette } from 'react-icons/bi';
import { FaBitcoin } from 'react-icons/fa';
import { CiBarcode } from 'react-icons/ci';
import { MdOutlineDateRange } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';

import React, { useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';
import { Transaction } from '../../types/transaction';
import toast from 'react-hot-toast';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';
import Paginate from 'react-paginate';

const deleteTransaction = async (id: string, navigate: any) => {
  let isLogin: any = getCookie('isLogin') || false;
  let userLoggedIn = JSON.parse(isLogin);
  let token = userLoggedIn.token;
  const response = await axios.delete(
    `https://backend-skyfly-c1.vercel.app/api/v1/transactions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  toast.success('Transaction deleted successfully');
  navigate(0);
  return response.data.data;
};

const updateTransaction = async (e: React.ChangeEvent<any>, navigate: any) => {
  e.preventDefault();

  let id = e.target.id.value;

  let data: Partial<Transaction> = {
    totalPrice: Number(e.target.totalPrice.value),
    status: e.target.status.value,
    tax: Number(e.target.tax.value),
  };

  let isLogin: any = getCookie('isLogin') || false;
  let userLoggedIn = JSON.parse(isLogin);
  let token = userLoggedIn.token;
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `https://backend-skyfly-c1.vercel.app/api/v1/transactions/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      toast.success('Notification updated successfully');
      navigate(0);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
};

const TableTransactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [rows, setRows] = useState<number>(0);

  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const fetchData = async () => {
    try {
      let isLogin: any = getCookie('isLogin') || false;
      let userLoggedIn = JSON.parse(isLogin);
      let token = userLoggedIn.token;
      const response = await axios.get(
        `https://backend-skyfly-c1.vercel.app/api/v1/transactions/admin/admin/admin?limit=${limit}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTransactions(response.data.data);
      setRows(response.data.totalItems);
      setPage(response.data.pagination.currentPage);
      setPages(response.data.pagination.totalPage);
    } catch (error) {
      toast.error('Fetching Data is Failed!', {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
        iconTheme: {
          primary: 'white',
          secondary: 'red',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      const updatedTransaction = await fetchTransactions();
      setTransactions(updatedTransaction);
      navigate(0);
      const modal = document.getElementById(
        `delete_modal-${id}`,
      ) as HTMLDialogElement;
      modal.close();
    } catch (error) {
      toast.error('Deleting Data is Failed!', {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
        iconTheme: {
          primary: 'white',
          secondary: 'red',
        },
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Transaction ID
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  User ID
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
              {transactions.map((transaction, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="font-medium text-black dark:text-white">
                      {transaction?.id}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {transaction?.userId}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        transaction?.status === 'settlement' ||
                        transaction?.status === 'capture'
                          ? 'bg-success text-success'
                          : transaction?.status === 'pending'
                          ? 'bg-warning text-warning'
                          : transaction?.status === 'expire'
                          ? 'bg-danger text-danger'
                          : 'bg-sky-500 text-white'
                      }`}
                    >
                      {transaction?.status}
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
                            .getElementById(`detail_modal-${transaction?.id}`)!
                            .showModal()
                        }
                      >
                        <BsEye />
                        {/* detail modal */}
                        <dialog
                          id={`detail_modal-${transaction?.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg text-light ">
                              Detail
                            </h3>
                            <div className="chat chat-start">
                              <div className="chat-bubble">
                                Detail Transactions
                              </div>
                            </div>

                            <div className="chat chat-end">
                              <div className="chat-bubble gap-y-5 text-start">
                                Transaction ID:{' '}
                                <strong>{transaction?.id}</strong>
                                <br />
                                Order ID:{' '}
                                <strong>{transaction?.orderId}</strong> <br />
                                Total Price:{' '}
                                <strong>{transaction?.totalPrice}</strong>
                                <br /> Tax: <strong>{transaction?.tax}</strong>
                                <br /> Transaction Status:
                                <strong>{transaction?.status}</strong>
                                <br /> Booking Date:{' '}
                                <strong>{transaction?.bookingDate}</strong>
                                <br /> Booking Code:{' '}
                                <strong>{transaction?.bookingCode}</strong>
                                <br /> User ID:{' '}
                                <strong>{transaction?.userId}</strong>
                                <br /> Transaction Detail:
                                <br />
                                <div className="overflow-x-auto pt-5">
                                  <table className="min-w-full divide-y divide-x divide-white border ">
                                    <thead className="bg-gray-50 border divide-x">
                                      <tr className="divide-x divide-white">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Transaction ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Seat ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Family Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          DOB
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Citizenship
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Passport
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Issuing Country
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Validity Period
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Flight ID
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-gray-300 divide-y divide-x divide-white border">
                                      {transaction.Transaction_Detail.map(
                                        (detail, key) => (
                                          <tr
                                            key={key}
                                            className="divide-x divide-white"
                                          >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.transactionId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.seatId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.familyName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.dob}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.citizenship}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.passport}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.issuingCountry}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.validityPeriod}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {detail.flightId}
                                            </td>
                                          </tr>
                                        ),
                                      )}
                                    </tbody>
                                  </table>
                                </div>
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
                            .getElementById(`delete_modal-${transaction?.id}`)!
                            .showModal()
                        }
                      >
                        <BsFillTrash3Fill />
                        {/* Delete Modal */}
                        <dialog
                          id={`delete_modal-${transaction?.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg">Delete</h3>
                            <p className="py-4">
                              Are you sure for deleting '{transaction?.name}'
                              data?
                            </p>
                            <div className="modal-action justify-between">
                              <button
                                className="btn btn-error"
                                onClick={() => {
                                  handleDelete(transaction.id)!.close();
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
                            .getElementById(`edit_modal-${transaction.id}`)!
                            .showModal()
                        }
                      >
                        <BsFillPencilFill />
                        {/* Edit Modal */}
                        <dialog
                          id={`edit_modal-${transaction.id}`}
                          className="modal"
                        >
                          <div className="modal-box bg-white dark:bg-boxdark">
                            <h3 className="font-bold text-lg">Update</h3>
                            <div className="py-4">
                              {/* form edit */}
                              <form onSubmit={updateTransaction}>
                                <input
                                  type="hidden"
                                  name="id"
                                  value={transaction.id}
                                />
                                {/* orderId */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <FaKey /> Order ID:
                                  <input
                                    type="text"
                                    className="grow"
                                    placeholder="Order ID"
                                    name="orderId"
                                    value={transaction.orderId}
                                    readOnly
                                  />
                                </label>
                                {/* totalPrice */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <FaBitcoin /> Total Price:
                                  <input
                                    type="text"
                                    className="grow"
                                    placeholder="Total Price"
                                    name="totalPrice"
                                    value={transaction.totalPrice}
                                  />
                                </label>
                                {/* tax */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <BiBaguette /> Tax:
                                  <input
                                    type="text"
                                    className="grow"
                                    name="tax"
                                    placeholder="Tax"
                                    value={transaction.tax}
                                  />
                                </label>
                                {/* bookingDate */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <MdOutlineDateRange /> Booking Date:
                                  <input
                                    type="text"
                                    className="grow"
                                    placeholder="Booking Date"
                                    name="bookingDate"
                                    value={transaction.bookingDate}
                                    readOnly
                                  />
                                </label>
                                {/* bookingCode */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <CiBarcode /> Booking Code:
                                  <input
                                    type="text"
                                    className="grow"
                                    placeholder="Booking Code"
                                    name="bookingCode"
                                    value={transaction.bookingCode}
                                    readOnly
                                  />
                                </label>
                                {/* userId */}
                                <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
                                  <FaRegUserCircle />
                                  User ID:
                                  <input
                                    type="text"
                                    className="grow"
                                    value={transaction.userId}
                                    name="userId"
                                    placeholder="User ID"
                                    readOnly
                                  />
                                </label>
                                {/* status */}
                                <select
                                  className="select w-full input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark"
                                  name="status"
                                >
                                  <option
                                    value={transaction?.status}
                                    selected
                                    hidden
                                  >
                                    {transaction.status}
                                  </option>
                                  <option value="pending">Pending</option>
                                  <option value="cancel">Cancel</option>
                                  <option value="settlement">Settlement</option>
                                  <option value="expire">Expire</option>
                                </select>

                                <input
                                  type="submit"
                                  value="Update"
                                  className="btn bg-white dark:bg-black w-full my-3 text-orange-400"
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
    </>
  );
};

export default TableTransactions;
