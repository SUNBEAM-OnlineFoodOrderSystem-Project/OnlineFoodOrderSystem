import React, { useState } from "react";
import { ordersMock } from "../mock/mockData";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Orders() {
  const [rows, setRows] = useState(ordersMock);

  const updateStatus = (id) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "delivered" } : r)));

  return (
    <div>
      <Typography variant="h5" gutterBottom>Orders</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.user}</TableCell>
                <TableCell>{r.restaurant}</TableCell>
                <TableCell>${r.amount.toFixed(2)}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" onClick={() => updateStatus(r.id)}>Mark Delivered</Button>
                    <Button variant="contained" color="error" size="small">Cancel</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
