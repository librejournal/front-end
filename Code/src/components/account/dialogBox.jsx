import React from "react";
import {
  Dialog,
  DialogTitle,
  List,
  Typography,
  ListItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = () => ({});

const DialogBox = ({ classes, data, open, handleClose, title }) => (
  <Dialog
    onClose={handleClose}
    aria-labelledby="simple-dialog-title"
    open={open}
  >
    <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
    <List>
      {data.map((el) => (
        <ListItem button key={el.id}>
          {el.user.username ? (
            <Link
              to={{
                pathname: `/user`,
                hash: `#${el.user.profile_id}`,
                state: { user: el.user },
              }}
              key={el.user.username.profile_id}
              style={{ textDecoration: "none", display: "flex" }}
            >
              <Typography color="primary" variant="subtitle1">
                {el.user.username}
              </Typography>
            </Link>
          ) : (
            <Typography color="primary" variant="subtitle1">
              {el.name}
            </Typography>
          )}
        </ListItem>
      ))}
    </List>
  </Dialog>
);

export default withStyles(useStyles)(DialogBox);
