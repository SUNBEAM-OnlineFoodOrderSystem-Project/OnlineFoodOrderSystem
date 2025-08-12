import React, { useState } from "react";
import { restaurantsMock } from "../mock/mockData";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Restaurants() {
  const [rows, setRows] = useState(restaurantsMock);

  const toggleStatus = (id) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r)));

  return (
    <div>
      <Typography variant="h5" gutterBottom>Manage Restaurants</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.city}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" onClick={() => toggleStatus(r.id)}>
                      {r.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variant="contained" color="error" size="small">Remove</Button>
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
