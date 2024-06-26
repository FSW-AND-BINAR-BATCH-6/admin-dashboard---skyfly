import Breadcrum from '../components/Breadcrumbs/Breadcrumb';
import TableNotification from '../components/Tables/Notifications';

const TablesNotifications = () => {
  return (
    <>
      <Breadcrum pageName="Notifications" />

      <div className="flex flex-col gap-10">
        <TableNotification />
      </div>
    </>
  );
};

export default TablesNotifications;
