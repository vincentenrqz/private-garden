import React from "react";
import { Container, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import UserIcon from "./UserIcon";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function Header() {
  const mobile = useMediaQuery("(max-width:900px)");

  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <div className="flex mx-6 justify-between py-3 max-md:flex-wrap border-b">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center cursor-pointer gap-5 justify-between text-base leading-6 text-gray-500"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e2245ffba16fb77f2a8b3241893dba35479111cf865356ba56f758912fe28a6?"
            className="shrink-0 my-auto aspect-[1.06] w-[35px]"
          />
          {/*TODO: PAGES LIST HERE. */}
        </div>
        <div className="flex items-center gap-1 pl-4 my-auto max-md:flex-wrap">
          <UserIcon />
          {mobile && <BurgerMenuDrawer />}
        </div>
      </div>
    </Container>
  );
}

const BurgerMenuList = () => {
  return (
    <>
      <MenuIcon />
    </>
  );
};

type Anchor = "top" | "left" | "bottom" | "right";

function BurgerMenuDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <MenuIcon
          onClick={toggleDrawer("right", true)}
          className="cursor-pointer"
        />

        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
