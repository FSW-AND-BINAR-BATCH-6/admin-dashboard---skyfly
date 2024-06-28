import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFlights from '../components/Tables/Flights';
import CreateFlight from '../components/CreateFlight';

const Flights = () => {
  return (
    <>
      <Breadcrumb pageName="Flights" />
        <div className="flex justify-between items-center mb-4">
          <CreateFlight />
        </div>

        <TableFlights />
    </>
  );
};

export default Flights;
