import * as React from "react";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const ModalWindow = ({
  content,
  showModal,
  setShowModal,
  setContacts,
}: any) => {
  const Content = content;
  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby='modal-modal-title'
    >
      <Box sx={style}>
        <Tooltip title='Close'>
          <IconButton
            color='secondary'
            onClick={() => setShowModal(false)}
            sx={{ position: "fixed", top: 0, left: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <Content setShowModal={setShowModal} setContacts={setContacts} />
      </Box>
    </Modal>
  );
};

export default ModalWindow;
