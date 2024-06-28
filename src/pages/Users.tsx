import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableUsers from '../components/Tables/Users';

const TablesUser = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        <TableUsers />
      </div>
    </>
  );
};

export default TablesUser;
