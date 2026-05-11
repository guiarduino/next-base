import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Fragment } from "react/jsx-runtime";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from 'lucide-react';

type Props<T extends Record<string, unknown>> = {
  columns: { key: string; label: string }[];
  data: T[];
  actions?: { label: string; action: (item: T) => void }[];
  emptyLabel?: string;
  isLoading?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

const getPageNumbers = (currentPage: number, totalPages: number): number[] => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage === 1) return [1, 2, 3];
  if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
  return [currentPage - 1, currentPage, currentPage + 1];
};

const TableGrid = <T extends Record<string, unknown>>({
  columns,
  data,
  actions,
  emptyLabel,
  isLoading,
  pagination,
}: Props<T>) => {
  return (
    <Fragment>
      <Table className='table-grid'>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>
                {column.label}
              </TableHead>
            ))}
            {actions && actions.length > 0 && (
              <TableHead>Ações</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions?.length || 0)} className="text-center">
                Carregando...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions?.length || 0)} className="text-center">
                {emptyLabel || 'Nenhum dado encontrado'}
              </TableCell>
            </TableRow>
          ) : (
            <Fragment>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex}>
                      {row[col.key.toLowerCase() as keyof T] as string}
                    </TableCell>
                  ))}
                  {actions && actions.length > 0 && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button>
                            <span>Ações</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {actions.map((action, actionIndex) => (
                            <DropdownMenuItem
                            key={actionIndex}
                            onClick={() => action.action(row)}
                            variant={action.label === 'Deletar' ? "destructive" : "default"}
                            >
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </Fragment>
          )}
        </TableBody>
      </Table>
      {pagination && pagination.totalPages > 0 && (
        <div>
          <Pagination>
            <PaginationContent>

              <PaginationItem>
                <PaginationLink
                    isActive={1 !== pagination.currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isLoading) {
                        pagination.onPageChange(1);
                      }
                    }}
                    className={
                      isLoading || pagination.currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  >
                    <ChevronFirst />
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.currentPage > 1) {
                      pagination.onPageChange(pagination.currentPage - 1);
                    }
                  }}
                  aria-disabled={isLoading || pagination.currentPage === 1}
                  className={
                    isLoading || pagination.currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                >
                  <ChevronLeft />
                </PaginationLink>
              </PaginationItem>

              {getPageNumbers(pagination.currentPage, pagination.totalPages).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === pagination.currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isLoading && page !== pagination.currentPage) {
                        pagination.onPageChange(page);
                      }
                    }}
                    aria-disabled={isLoading || page === pagination.currentPage}
                    className={
                      isLoading || page === pagination.currentPage
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.currentPage < pagination.totalPages) {
                      pagination.onPageChange(pagination.currentPage + 1);
                    }
                  }}
                  aria-disabled={isLoading || pagination.currentPage === pagination.totalPages}
                  className={
                    isLoading || pagination.currentPage === pagination.totalPages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                >
                  <ChevronRight />
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                    isActive={pagination.totalPages !== pagination.currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isLoading) {
                        pagination.onPageChange(pagination.totalPages);
                      }
                    }}
                    className={
                      isLoading || pagination.currentPage === pagination.totalPages
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  >
                    <ChevronLast />
                </PaginationLink>
              </PaginationItem>
              
            </PaginationContent>
          </Pagination>
        </div>
      )}
        
    </Fragment>
  )
}

export default TableGrid