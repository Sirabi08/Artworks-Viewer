import React from 'react';

const Loader: React.FC = () => (
    <div className="loader">
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
        <p>Loading...</p>
    </div>
);

export default Loader;
