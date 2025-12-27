"use client";

import { useCallback, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Stack, TablePagination } from "@mui/material";
import { useRouter } from "next/navigation";

type Posts = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

export default function ServerBasic() {
  const router = useRouter();

  const [posts, setPosts] = useState<Posts[] | undefined>(undefined);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log("rowsPerPage:", rowsPerPage);
  console.log("page:", page);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(posts);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://gorest.co.in/public/v2/posts?page=${
          page + 1
        }&per_page=${rowsPerPage}`
      );
      const json: Posts[] = await res.json();
      setPosts(json);
    } catch (e) {
      console.log(e);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Stack
      flexDirection="column"
      justifyItems="center"
      justifyContent="center"
      sx={{ m: 10 }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">User ID</TableCell>
              <TableCell align="right">Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => router.push(`/${row.id}`)}
                >
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.userId}</TableCell>
                <TableCell align="right">{row.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={posts?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
}
