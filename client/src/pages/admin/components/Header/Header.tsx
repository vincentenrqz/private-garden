import { Container, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import UserIcon from "./UserIcon";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const mobile = useMediaQuery("(max-width:900px)");

  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <div className="flex mx-6 justify-between py-3 max-md:flex-wrap border-b">
        <div
          onClick={() => navigate("/admin/dashboard/")}
          className="flex items-center cursor-pointer gap-5 justify-between text-base leading-6 text-gray-500"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e2245ffba16fb77f2a8b3241893dba35479111cf865356ba56f758912fe28a6?"
            className="shrink-0 my-auto aspect-[1.06] w-[35px]"
          />
          {/*TODO: PAGES LIST HERE. */}
        </div>
        <div className="flex items-center gap-3 pl-4 my-auto max-md:flex-wrap">
          <UserIcon />
          {mobile && <BurgerMenuList />}
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
