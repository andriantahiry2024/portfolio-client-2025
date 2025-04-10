import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDataTable } from '@/hooks/useDataTable';
import DataTableToolbar from './DataTableToolbar';
import DataTablePagination from './DataTablePagination';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  enableSorting?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  filters?: {
    name: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
  }[];
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  defaultSortField?: keyof T | null;
  defaultSortDirection?: 'asc' | 'desc' | null;
  onRowClick?: (item: T) => void;
  rowClassName?: (item: T) => string;
  emptyMessage?: string;
}

function DataTable<T>({
  data,
  columns,
  searchPlaceholder = "Rechercher...",
  searchFields = [],
  filters = [],
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
  defaultSortField = null,
  defaultSortDirection = null,
  onRowClick,
  rowClassName,
  emptyMessage = "Aucune donnée disponible"
}: DataTableProps<T>) {
  const {
    data: paginatedData,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    searchValue,
    sortField,
    sortDirection,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    handleSearchClear,
    handleSortChange
  } = useDataTable({
    data,
    defaultPageSize,
    defaultSearchFields: searchFields,
    defaultSortField,
    defaultSortDirection
  });

  // Fonction pour rendre l'icône de tri
  const renderSortIcon = (column: Column<T>) => {
    if (!column.enableSorting) return null;
    
    if (sortField === column.accessorKey) {
      if (sortDirection === 'asc') {
        return <ArrowUp className="ml-2 h-4 w-4" />;
      }
      if (sortDirection === 'desc') {
        return <ArrowDown className="ml-2 h-4 w-4" />;
      }
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <DataTableToolbar
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        filters={filters}
      />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.accessorKey)} className={column.className}>
                  {column.enableSorting ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSortChange(column.accessorKey)}
                      className="h-8 p-0 font-medium flex items-center hover:bg-transparent"
                    >
                      {column.header}
                      {renderSortIcon(column)}
                    </Button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => (
                <TableRow
                  key={index}
                  className={`${onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''} ${rowClassName ? rowClassName(item) : ''}`}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                >
                  {columns.map((column) => (
                    <TableCell key={`${index}-${String(column.accessorKey)}`} className={column.className}>
                      {column.cell
                        ? column.cell(item)
                        : item[column.accessorKey] as React.ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalItems > 0 && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
}

export default DataTable;
