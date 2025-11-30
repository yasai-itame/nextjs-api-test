"use client";
import { List } from "../hooks";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

type Props = {
  lists: List[];
  page: number;
}

export const ListTable = ({ lists, page }: Props) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    newPage += 1;
    window.location.href = `/list/${newPage}`;
  };
  const handleChangeRowsPerPage = () => { };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ minWidth: 100 }}
                >
                  Title
                </TableCell>
                <TableCell>
                  Body
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lists
                .map((list) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={list.id}>
                      <TableCell>
                        {
                          list.title
                        }
                      </TableCell>
                      <TableCell>
                        {
                          list.body
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[-1]}
          component="div"
          count={20}
          rowsPerPage={6}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={() => handleChangeRowsPerPage()}
        />
      </Paper>
    </>
  )
}

export default ListTable;