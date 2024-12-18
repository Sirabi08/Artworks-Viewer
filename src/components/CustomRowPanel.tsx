import React from 'react';

interface CustomRowPanelProps {
    selectedRows: any[];
}

const CustomRowPanel: React.FC<CustomRowPanelProps> = ({ selectedRows }) => (
    <div className="custom-row-panel">
        <h3>Selected Rows</h3>
        {selectedRows.length > 0 ? (
            <ul>
                {selectedRows.map((row) => (
                    <li key={row.id}>{row.title}</li>
                ))}
            </ul>
        ) : (
            <p>No rows selected.</p>
        )}
    </div>
);

export default CustomRowPanel;
