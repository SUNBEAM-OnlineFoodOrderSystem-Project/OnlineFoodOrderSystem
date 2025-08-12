import React, { useState } from "react";
import { menusMock } from "../mock/mockData";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Menus() {
  const [rows, setRows] = useState(menusMock);
  const toggleStatus = (id) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r)));

  return (
    <div>
      <Typography variant="h5" gutterBottom>Manage Menus</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Restaurant</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.restaurant}</TableCell>
                <TableCell>{r.item}</TableCell>
                <TableCell>${r.price.toFixed(2)}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" onClick={() => toggleStatus(r.id)}>
                      {r.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variant="contained" color="error" size="small">Delete</Button>
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
