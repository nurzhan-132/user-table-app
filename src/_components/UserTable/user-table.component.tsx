import React, { useState } from "react";
import { useGetUsersQuery } from "../../_store/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Pagination,
} from "@mui/material";
import "./user-table.css";

const UserTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const { data, error, isLoading } = useGetUsersQuery({ limit, skip });

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Ошибка загрузки данных</Typography>;

  return (
    <TableContainer component={Paper} sx={{ width: "90%", margin: "16px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Имя</TableCell>
            <TableCell align="center">Телефон</TableCell>
            <TableCell align="center">Дата рождения</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell align="center">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell align="center">{user.phone}</TableCell>
              <TableCell align="center">
                {new Date(user.birthDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(data.total / limit)}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ display: "flex", justifyContent: "center", margin: 2 }}
      />
    </TableContainer>
  );
};

export default UserTable;
