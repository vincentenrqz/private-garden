import { Container, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import UserIcon from "./UserIcon";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function Header() {
  const mobile = useMediaQuery("(max-width:900px)");

  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <div className="flex mx-6 justify-between py-3 max-md:flex-wrap border-b">
        <div
          onClick={() => navigate("/admin")}
          className="flex items-center cursor-pointer gap-5 justify-between text-base leading-6 text-gray-500"
        >
          <Typography variant="h6">Anning Private Garden</Typography>
        </div>
        {/* <div className="flex items-center gap-3 pl-4 my-auto max-md:flex-wrap">
          <UserIcon />
          {mobile && <BurgerMenuList />}
        </div> */}
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
