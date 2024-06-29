// src/components/forms/CreateNotificationForm.tsx

import React from 'react';
import axios from 'axios';
import { getCookie } from 'typescript-cookie'; // Pastikan Anda telah mengimplementasikan TypeScript Cookie

const API_BASE_URL =
  'https://backend-skyfly-c1.vercel.app/api/v1/notifications';

interface CreateNotificationFormProps {
  onCreate: (newNotification: any) => void; // Sesuaikan dengan struktur data notifikasi yang diperlukan
}

const CreateNotificationForm: React.FC<CreateNotificationFormProps> = ({
  onCreate,
}) => {
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { type, notificationsTitle, notificationsContent } = e.currentTarget
      .elements as any;

    const newNotification = {
      type: type.value,
      title: notificationsTitle.value,
      content: notificationsContent.value,
    };

    try {
      let isLogin: any = getCookie('isLogin') || false;
      let userLoggedIn = JSON.parse(isLogin);
      let token = userLoggedIn.token;
      const response = await axios.post(`${API_BASE_URL}`, newNotification, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onCreate(response.data); // Assuming response.data contains the newly created notification
      document.getElementById('create_modal')?.close();
    } catch (error) {
      console.error('Error creating notification:', error);
      // Handle error here, e.g., show an error message to the user
    }
  };

  return (
    <dialog id="create_modal" className="modal">
      <div className="modal-box bg-white dark:bg-boxdark">
        <h3 className="font-bold text-lg">Create Notification</h3>
        <form onSubmit={handleCreate} className="py-4">
          <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
            <select
              name="type"
              className="grow bg-white dark:bg-black text-black dark:text-white"
            >
              <option value="Warning">Warning</option>
              <option value="Information">Information</option>
              <option value="Update">Update</option>
              <option value="Promotions">Promotions</option>
            </select>
          </label>
          <FormField name="notificationsTitle" />
          <FormField name="notificationsContent" />
          <input
            type="submit"
            value="Create"
            className="btn bg-white dark:bg-black w-full my-3"
          />
        </form>
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById('create_modal')?.close()}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

const FormField: React.FC<{ name: string }> = ({ name }) => (
  <label className="input input-bordered flex items-center gap-2 my-2 bg-white dark:bg-boxdark">
    <input
      type="text"
      className="grow bg-white dark:bg-black text-black dark:text-white"
      placeholder={name}
      name={name}
    />
  </label>
);

export default CreateNotificationForm;
