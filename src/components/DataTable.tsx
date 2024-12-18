// File: src/components/DataTable.tsx

import React, { useState, useEffect } from 'react';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { fetchArtworks } from '../services/apiService';
import Loader from './Loader';

const sortingOptions = [
    { label: 'Title', value: 'title' },
    { label: 'Artist', value: 'artist_display' },
    { label: 'Place of Origin', value: 'place_of_origin' },
];

interface DataTableProps {
    onRowSelectionChange: (selectedRows: any[]) => void;
}

const DataTable: React.FC<DataTableProps> = ({ onRowSelectionChange }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<Date[] | null>(null);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const response = await fetchArtworks(page);
            setData(response.data || []);
            setLoading(false);
        };
        loadData();
    }, [page]);

    const onPageChange = (e: any) => {
        setPage(e.page + 1);
    };

    const onSortChange = (e: { value: string }) => {
        setSortField(e.value);
        const sortedData = [...data].sort((a, b) =>
            a[e.value].localeCompare(b[e.value])
        );
        setData(sortedData);
    };

    const onDateFilter = () => {
        if (dateRange) {
            const filteredData = data.filter(
                (row: any) =>
                    row.date_start >= dateRange[0].getFullYear() &&
                    row.date_end <= dateRange[1].getFullYear()
            );
            setData(filteredData);
        }
    };

    const filteredData = data.filter(
        (row: any) =>
            row.title.toLowerCase().includes(search.toLowerCase()) ||
            row.artist_display?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="table-toolbar">
                <Dropdown
                    value={sortField}
                    options={sortingOptions}
                    onChange={onSortChange}
                    placeholder="Sort By"
                />
                <Calendar
                    value={dateRange}
                    onChange={(e) => setDateRange(e.value)}
                    selectionMode="range"
                    placeholder="Select Date Range"
                />
                <button onClick={onDateFilter}>Apply Filter</button>
                <InputText
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title or artist..."
                />
            </div>
            {loading ? (
                <Loader />
            ) : (
                <PrimeDataTable
                    value={filteredData}
                    paginator
                    rows={10}
                    loading={loading}
                    onPage={onPageChange}
                    selection={selectedRows}
                    onSelectionChange={(e) => {
                        setSelectedRows(e.value);
                        onRowSelectionChange(e.value);
                    }}
                    selectionMode="checkbox"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="title" header="Title" sortable />
                    <Column field="place_of_origin" header="Place of Origin" />
                    <Column field="artist_display" header="Artist" sortable />
                    <Column field="inscriptions" header="Inscriptions" />
                    <Column field="date_start" header="Start Date" />
                    <Column field="date_end" header="End Date" />
                </PrimeDataTable>
            )}
        </div>
    );
};

export default DataTable;
