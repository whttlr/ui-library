import * as React from 'react';
import { useState } from 'react';
import { ChevronUp, ChevronDown, Search, Filter, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Badge } from '../Badge/Badge';
import {
  getDataTableBaseStyles,
  getDataTableHeaderCellStyles,
  getDataTableCellStyles,
  getDataTableRowStyles,
  getDataTableRowHoverStyles,
  getDataTableSearchInputStyles,
  getDataTableSearchInputFocusStyles,
  getDataTableSearchIconStyles,
  getDataTableCheckboxStyles,
  getDataTableCheckboxHoverStyles,
  getSortIconStyles,
  getDataTableEmptyStateStyles,
  getDataTablePaginationInfoStyles,
  getDataTableFilterContainerStyles,
  getDataTableSearchContainerStyles,
  getDataTableSearchIconContainerStyles,
  getDataTableActionsCellStyles,
  getDataTableHeaderContainerStyles,
  getDataTableSortContainerStyles,
  getDataTablePaginationContainerStyles,
  getDataTablePaginationButtonGroupStyles,
} from '../../utils/tokens';

export interface DataTableColumn<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T = any> {
  columns: DataTableColumn<T>[];
  data: T[];
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  onRowClick?: (row: T) => void;
  className?: string;
  emptyMessage?: string;
}

export const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  searchable = true,
  filterable = false,
  sortable = true,
  pagination = true,
  pageSize = 10,
  selectable = false,
  onRowSelect,
  onRowClick,
  className,
  emptyMessage = 'No data available',
}: DataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(row =>
      columns.some(column => {
        const value = row[column.key];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;
    
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleRowSelect = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selected = Array.from(newSelectedRows).map(i => paginatedData[i]);
      onRowSelect(selected);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const allIndexes = new Set(paginatedData.map((_, index) => index));
      setSelectedRows(allIndexes);
      onRowSelect?.(paginatedData);
    }
  };

  // Use design token utilities for all table styling
  const tableStyles = getDataTableBaseStyles();
  const headerCellStyles = getDataTableHeaderCellStyles();
  const cellStyles = getDataTableCellStyles();
  const rowStyles = getDataTableRowStyles();
  const searchContainerStyles = getDataTableSearchContainerStyles();
  const searchIconContainerStyles = getDataTableSearchIconContainerStyles();
  const searchInputStyles = getDataTableSearchInputStyles();
  const searchIconStyles = getDataTableSearchIconStyles();
  const filterContainerStyles = getDataTableFilterContainerStyles();
  const headerContainerStyles = getDataTableHeaderContainerStyles();
  const sortContainerStyles = getDataTableSortContainerStyles();
  const paginationContainerStyles = getDataTablePaginationContainerStyles();
  const paginationButtonGroupStyles = getDataTablePaginationButtonGroupStyles();
  const emptyStateStyles = getDataTableEmptyStateStyles();
  const paginationInfoStyles = getDataTablePaginationInfoStyles();
  const actionsCellStyles = getDataTableActionsCellStyles();

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Search and Filters */}
      {(searchable || filterable) && (
        <div style={filterContainerStyles}>
          {searchable && (
            <div style={searchContainerStyles}>
              <div style={searchIconContainerStyles}>
                <Search size={16} style={searchIconStyles} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyles}
                onFocus={(e) => {
                  Object.assign(e.target.style, getDataTableSearchInputFocusStyles());
                }}
                onBlur={(e) => {
                  Object.assign(e.target.style, searchInputStyles);
                }}
              />
            </div>
          )}
          {filterable && (
            <Button variant="secondary" size="sm">
              <Filter size={16} />
              Filters
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyles}>
          <thead>
            <tr>
              {selectable && (
                <th style={{ ...headerCellStyles, ...actionsCellStyles }}>
                  <div
                    onClick={handleSelectAll}
                    style={getDataTableCheckboxStyles(selectedRows.size === paginatedData.length && paginatedData.length > 0)}
                  >
                    {(selectedRows.size === paginatedData.length && paginatedData.length > 0) && (
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        style={{ color: 'white' }}
                      >
                        <path
                          d="M9 1L3.5 6.5L1 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    ...getDataTableHeaderCellStyles(column.align || 'left'),
                    width: column.width,
                    cursor: sortable && column.sortable !== false ? 'pointer' : 'default',
                  }}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                >
                  <div style={headerContainerStyles}>
                    {column.header}
                    {sortable && column.sortable !== false && (
                      <div style={sortContainerStyles}>
                        <ChevronUp 
                          size={12} 
                          style={getSortIconStyles(sortColumn === column.key && sortDirection === 'asc')} 
                        />
                        <ChevronDown 
                          size={12} 
                          style={getSortIconStyles(sortColumn === column.key && sortDirection === 'desc')} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              <th style={{ ...headerCellStyles, ...actionsCellStyles }}>
                {/* Actions column */}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + 1}
                  style={{
                    ...cellStyles,
                    ...emptyStateStyles,
                  }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  style={getDataTableRowStyles(selectedRows.has(index), true)}
                  onMouseEnter={(e) => {
                    if (!selectedRows.has(index)) {
                      Object.assign(e.currentTarget.style, getDataTableRowHoverStyles(false));
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedRows.has(index)) {
                      Object.assign(e.currentTarget.style, getDataTableRowStyles(false, true));
                    }
                  }}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td style={cellStyles}>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowSelect(index);
                        }}
                        style={getDataTableCheckboxStyles(selectedRows.has(index))}
                        onMouseEnter={(e) => {
                          if (!selectedRows.has(index)) {
                            Object.assign(e.currentTarget.style, getDataTableCheckboxHoverStyles(false));
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selectedRows.has(index)) {
                            Object.assign(e.currentTarget.style, getDataTableCheckboxStyles(false));
                          }
                        }}
                      >
                        {selectedRows.has(index) && (
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            style={{ color: 'white' }}
                          >
                            <path
                              d="M9 1L3.5 6.5L1 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={getDataTableCellStyles(column.align || 'left')}
                    >
                      {column.render 
                        ? column.render(row[column.key], row)
                        : row[column.key]
                      }
                    </td>
                  ))}
                  <td style={cellStyles}>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div style={paginationContainerStyles}>
          <div style={paginationInfoStyles}>
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          
          <div style={paginationButtonGroupStyles}>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};