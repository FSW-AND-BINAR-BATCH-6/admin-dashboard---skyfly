import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableAirports from '../components/Tables/Airports';

const tables = () => {
  return (
    <>
      <Breadcrumb pageName="Airports" />

      <div className="flex flex-col gap-10">
        <TableAirports />
      </div>
    </>
  );
};

export default tables;
