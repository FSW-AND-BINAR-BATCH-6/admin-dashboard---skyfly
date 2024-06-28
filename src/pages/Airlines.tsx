import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableAirlines from '../components/Tables/Airlines';

const tables = () => {
  return (
    <>
      <Breadcrumb pageName="Airlines" />

      <div className="flex flex-col gap-10">
        <TableAirlines />
      </div>
    </>
  );
};

export default tables;
