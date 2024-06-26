// src/pages/UiElements/Notifications.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableNotification from '../components/Tables/Notifications';
import CreateNotificationForm from '../components/Forms/createNotifications';

const API_BASE_URL =
  'https://backend-skyfly-c1.vercel.app/api/v1/notifications';

const TablesNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = getCookie('_token');
      const response = await axios.get(`${API_BASE_URL}?limit=20`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleCreate = async (newNotification: any) => {
    try {
      const token = getCookie('_token');
      await axios.post(`${API_BASE_URL}`, newNotification, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchNotifications(); 
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
        <TableNotification notifications={notifications} />
      </div>
    </>
  );
};

export default TablesNotifications;
