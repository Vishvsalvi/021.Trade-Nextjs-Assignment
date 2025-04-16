import { useState, useEffect } from "react";
import  { ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    Row
  } from "@tanstack/react-table"
  
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
import { X, Search, Ban } from "lucide-react";
import { Data } from "@/app/Dummydata";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }


export function DataTable<TData, TValue>({
    data,
    columns
  }: DataTableProps<TData, TValue>) {
  
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
    const [clientSearchTerm, setClientSearchTerm] = useState("")
    const [tickerSearchTerm, setTickerSearchTerm] = useState("")
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
        columnFilters,
        rowSelection
      }
    })
  
    // Apply client filter when clientSearchTerm changes
    useEffect(() => {
      if (clientSearchTerm) {
        table.getColumn("client")?.setFilterValue(clientSearchTerm)
      } else {
        table.getColumn("client")?.setFilterValue("")
      }
    }, [clientSearchTerm, table])
  
    // Apply ticker filter when tickerSearchTerm changes
    useEffect(() => {
      if (tickerSearchTerm) {
        table.getColumn("ticker")?.setFilterValue(tickerSearchTerm)
      } else {
        table.getColumn("ticker")?.setFilterValue("")
      }
    }, [tickerSearchTerm, table])
  
    // Get selected tickers
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedTickers = selectedRows.map(row => {
      const data = row.original as Data
      return data.ticker
    })
  
    // Remove ticker from selection
    const removeTicker = (ticker: string) => {
      const newSelection = { ...rowSelection }
      const rowToDeselect = table.getFilteredRowModel().rows.findIndex((row: Row<TData>) => {
        const data = row.original as Data
        return data.ticker === ticker
      })
      
      if (rowToDeselect !== -1) {
        const rowId = table.getFilteredRowModel().rows[rowToDeselect].id
        delete newSelection[rowId]
        setRowSelection(newSelection)
      }
    }
  
    // Clear all selections
    const clearAllSelections = () => {
      setRowSelection({})
    }
  
    return (
      <div className="border rounded-md p-4 bg-gray-50">
        <div className="flex items-center py-4 gap-4 border-b pb-4">
          <div className="flex items-center gap-3 w-full">
            <div className="relative">
              <Input
                placeholder="Search clients"
                value={clientSearchTerm}
                onChange={e => setClientSearchTerm(e.target.value)}
                className="w-[200px] pl-8 bg-white"
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search for a stock, future, option or index"
                    className="w-full bg-white pl-10"
                    value={tickerSearchTerm}
                    onChange={e => setTickerSearchTerm(e.target.value)}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Search size={16} />
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedTickers.map((ticker) => (
                    <div key={ticker} className="flex items-center gap-1 bg-gray-200 rounded-full px-3 py-1 text-sm">
                      {ticker}
                      <button 
                        onClick={() => removeTicker(ticker)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                
                {selectedTickers.length > 0 && (
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="hover:cursor-pointer shrink-0"
                    onClick={clearAllSelections}
                  >
                    <Ban size={14} className="mr-1" /> Cancel all
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-md border w-full mt-4" style={{ overflowX: 'visible' }}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="px-4 py-2 font-bold text-left bg-gray-200">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => row.toggleSelected(!row.getIsSelected())}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-2 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }