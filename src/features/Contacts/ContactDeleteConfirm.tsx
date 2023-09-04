import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

interface IProps {
  openDelete: boolean;
  handleCloseDelete: () => void;
  handleConfirm: () => Promise<void>;
}

const ContactDeleteConfirm = ({
  openDelete,
  handleCloseDelete,
  handleConfirm,
}: IProps) => {
  return (
    <Dialog open={openDelete} onClose={handleCloseDelete}>
      <DialogContent>
        <DialogContentText>Delete contact?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelete}>Disagree</Button>
        <Button onClick={handleConfirm} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactDeleteConfirm;
