import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteConfirm = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          backgroundColor: "#F4FBF7",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: "#0F4C3A" }}>
        Confirm Delete
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ color: "#13322B" }}>
          Are you sure you want to delete this task?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            color: "#0F4C3A",
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: "#D32F2F",
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#b52a2a" },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirm;
