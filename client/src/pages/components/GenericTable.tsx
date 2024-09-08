import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

type DataProps = {
  headers: string[];
  data: any;
  renderRow: (row: any, index: number) => React.ReactNode;
};

const GenericTable = ({ headers, data, renderRow }: DataProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        height: "80vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((item, index) => (
              <TableCell key={index}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: any, index: number) => (
              <TableRow key={row.id || `row-${index}`}>
                {renderRow(row, index)}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          backgroundColor: "white",
          borderTop: "1px solid #ddd",
        }}
      >
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </TableContainer>
  );
};

export default GenericTable;
