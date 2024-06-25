import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFlights from '../components/Tables/Flights';

const Flights = () => {
  return (
    <>
      <Breadcrumb pageName="Flights" />

      <div className="flex flex-col gap-10">
        <TableFlights />
      </div>
    </>
  );
};

export default Flights;
