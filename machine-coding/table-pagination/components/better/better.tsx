"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  TablePagination,
} from "@mui/material";
import { useRouter } from "next/navigation";

type Posts = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

export default function Basic() {
  const router = useRouter();

  const [posts, setPosts] = useState<Posts[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = useCallback(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json: Posts[] = await res.json();
    setPosts(json);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const paginatedPosts = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return posts.slice(start, end);
  }, [posts, page, rowsPerPage]);

  return (
    <Stack sx={{ m: 10 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedPosts.map((row) => (
              <TableRow key={row.id}>
                <TableCell onClick={() => router.push(`/${row.id}`)}>
                  {row.title}
                </TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={posts.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 20, 50]}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
      />
    </Stack>
  );
}
