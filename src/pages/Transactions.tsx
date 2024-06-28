import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableTransactions from '../components/Tables/Transactions';

const TablesTransaction = () => {
  return (
    <>
      <Breadcrumb pageName="Transactions" />

      <div className="flex flex-col gap-10">
        <TableTransactions />
      </div>
    </>
  );
};

export default TablesTransaction;
