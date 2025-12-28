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

export default function Basic() {
  const router = useRouter();

  const [posts, setPosts] = useState<Posts[] | undefined>(undefined);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showPosts, setShowPosts] = useState<Posts[] | undefined>(undefined);

  console.log(showPosts);

  console.log("rowsPerPage:", rowsPerPage);
  console.log("page:", page);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log("Hello");

    const start = newPage === 0 ? 0 : newPage * rowsPerPage;
    console.log("start:", start);

    const end = newPage === 0 ? rowsPerPage : (newPage + 1) * rowsPerPage;
    console.log("end:", end);

    const findPosts = posts?.slice(start, end);

    setShowPosts(findPosts);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("+event.target.value:", event.target.value);

    setRowsPerPage(+event.target.value);
    const findPosts = posts?.slice(0, +event.target.value);
    setShowPosts(findPosts);
    setPage(0);
  };

  console.log(posts);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      const json: Posts[] = await res.json();
      setPosts(json);
      setShowPosts(json.slice(0, 10));
    } catch (e) {
      console.log(e);
    }
  }, []);

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
            {showPosts?.map((row) => (
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
