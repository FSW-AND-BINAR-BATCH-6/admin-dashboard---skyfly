import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableNotification from '../components/Tables/Notifications';
import CreateNotificationForm from '../components/Forms/createNotifications';
import { getCookie } from 'typescript-cookie';

const API_BASE_URL =
  'https://backend-skyfly-c1.vercel.app/api/v1/notifications';

const TablesNotifications: React.FC = () => {
  const handleCreate = async (newNotification: any) => {
    try {
      let isLogin: any = getCookie('isLogin') || false;
      let userLoggedIn = JSON.parse(isLogin);
      let token = userLoggedIn.token;

      await axios.post(`${API_BASE_URL}`, newNotification, {
        headers: { Authorization: `Bearer ${token}` },
      });

      document.getElementById('create_modal')?.close();
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Notifications" />
      <button
        className="btn bg-primary text-white my-4"
        onClick={() => document.getElementById('create_modal')?.showModal()}
      >
        Create Notification
      </button>
      <CreateNotificationForm onCreate={handleCreate} />
      <div className="flex flex-col gap-10">
        <TableNotification />
      </div>
    </>
  );
};

export default TablesNotifications;
