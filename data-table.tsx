// ============================================================================
//  DATA TABLE — Complete data table with toolbar, sorting, and pagination
//  T3 · Organism
//
//  Full-featured data table combining TableToolbar + Table + Pagination.
//  Supports search, filtering, sorting, row selection, and pagination.
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React, { useState } from "react";
import { TableToolbar } from "./table-toolbar";
import { TableColumnHeader, SortDirection } from "./table-column-header";
import { TableRowSelectCheckbox } from "./table-row-select-checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination";

export interface DataTableColumn<T = any> {
  /** Column key */
  key: string;
  /** Column header label */
  label: string;
  /** Column alignment */
  align?: "left" | "center" | "right";
  /** Enable sorting */
  sortable?: boolean;
  /** Custom render function */
  render?: (value: any, row: T) => React.ReactNode;
  /** Column width */
  width?: string;
}

export interface DataTableProps<T = any> {
  /** Table columns configuration */
  columns: DataTableColumn<T>[];
  /** Table data rows */
  data: T[];
  /** Enable row selection */
  selectable?: boolean;
  /** Selected row IDs */
  selectedRows?: Set<string | number>;
  /** Selection change handler */
  onSelectionChange?: (selectedRows: Set<string | number>) => void;
  /** Row key extractor */
  getRowKey?: (row: T) => string | number;
  /** Enable search */
  searchable?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Toolbar filters */
  filters?: React.ReactNode;
  /** Toolbar actions */
  actions?: React.ReactNode;
  /** Enable pagination */
  paginated?: boolean;
  /** Current page (1-indexed) */
  page?: number;
  /** Total pages */
  totalPages?: number;
  /** Page change handler */
  onPageChange?: (page: number) => void;
  /** Sort state */
  sortState?: { key: string; direction: SortDirection };
  /** Sort change handler */
  onSortChange?: (key: string, direction: SortDirection) => void;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function DataTable<T = any>({
  columns,
  data,
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  getRowKey = (row: any, index: number) => index,
  searchable = true,
  searchPlaceholder = "Search...",
  filters,
  actions,
  paginated = true,
  page = 1,
  totalPages = 1,
  onPageChange,
  sortState,
  onSortChange,
  className,
  style,
}: DataTableProps<T>) {
  const [searchValue, setSearchValue] = useState("");

  // Handle select all
  const allSelected = data.length > 0 && data.every((row) => selectedRows.has(getRowKey(row)));
  const someSelected = data.some((row) => selectedRows.has(getRowKey(row))) && !allSelected;

  const handleSelectAll = (checked: boolean) => {
    const newSelection = new Set(selectedRows);
    if (checked) {
      data.forEach((row) => newSelection.add(getRowKey(row)));
    } else {
      data.forEach((row) => newSelection.delete(getRowKey(row)));
    }
    onSelectionChange?.(newSelection);
  };

  const handleRowSelect = (rowKey: string | number, checked: boolean) => {
    const newSelection = new Set(selectedRows);
    if (checked) {
      newSelection.add(rowKey);
    } else {
      newSelection.delete(rowKey);
    }
    onSelectionChange?.(newSelection);
  };

  const handleSort = (columnKey: string) => {
    const currentDirection = sortState?.key === columnKey ? sortState.direction : "none";
    const nextDirection: SortDirection =
      currentDirection === "none" ? "asc" : currentDirection === "asc" ? "desc" : "none";
    onSortChange?.(columnKey, nextDirection);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "var(--border-width-thin) solid var(--border-default)",
        borderRadius: "var(--radius-lg-ds)",
        background: "var(--bg-primary)",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Toolbar */}
      {(searchable || filters || actions) && (
        <TableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder={searchPlaceholder}
          filters={filters}
          actions={actions}
        />
      )}

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-base)",
          }}
        >
          <thead>
            <tr>
              {selectable && (
                <th
                  style={{
                    width: "40px",
                    padding: "var(--space-3)",
                    background: "var(--bg-secondary)",
                    borderBottom: "var(--border-width-thin) solid var(--border-default)",
                  }}
                >
                  <TableRowSelectCheckbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <TableColumnHeader
                  key={column.key}
                  align={column.align}
                  sortable={column.sortable}
                  sortDirection={sortState?.key === column.key ? sortState.direction : "none"}
                  onSort={() => handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableColumnHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => {
              const rowKey = getRowKey(row, rowIndex);
              const isSelected = selectedRows.has(rowKey);
              return (
                <tr
                  key={rowKey}
                  style={{
                    borderBottom: "var(--border-width-thin) solid var(--border-default)",
                    background: isSelected ? "var(--bg-secondary)" : "var(--bg-primary)",
                    transition: "background-color var(--duration-fast) var(--ease-out)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "var(--bg-secondary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "var(--bg-primary)";
                    }
                  }}
                >
                  {selectable && (
                    <td style={{ padding: "var(--space-3)" }}>
                      <TableRowSelectCheckbox
                        checked={isSelected}
                        onChange={(checked) => handleRowSelect(rowKey, checked)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={{
                        padding: "var(--space-3)",
                        textAlign: column.align || "left",
                        color: "var(--fg-primary)",
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "var(--space-4)",
            borderTop: "var(--border-width-thin) solid var(--border-default)",
            background: "var(--bg-primary)",
          }}
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && onPageChange?.(page - 1)}
                  style={{
                    cursor: page > 1 ? "pointer" : "not-allowed",
                    opacity: page > 1 ? 1 : 0.5,
                  }}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNum, index) =>
                pageNum === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={pageNum === page}
                      onClick={() => onPageChange?.(pageNum)}
                      style={{ cursor: "pointer" }}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => page < totalPages && onPageChange?.(page + 1)}
                  style={{
                    cursor: page < totalPages ? "pointer" : "not-allowed",
                    opacity: page < totalPages ? 1 : 0.5,
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default DataTable;
