import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import CustomRowPanel from '../components/CustomRowPanel';

const HomePage: React.FC = () => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    return (
        <div className="home-page">
            <DataTable onRowSelectionChange={setSelectedRows} />
            <CustomRowPanel selectedRows={selectedRows} />
        </div>
    );
};

export default HomePage;
