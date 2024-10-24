import { useState } from "react";
import Header from "../../../components/Header/Header";
import {
  Box,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import CreateSpecies from "./CreateSpecies";
import { speciesService } from "../../../../services/species.service";
import { mapService } from "../../../../services/maps.service";
import { SpeciesDto } from "../../../../types/species.interface";
import GenericTable from "../../../components/GenericTable";
import CustomMenuList from "../../../components/CustomMenuList";
import { formatReadableDate } from "../../../../utils";
import Toaster from "../../../components/Toaster";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import EditSpecies from "./EditSpecies";
import Loader from "../../../components/Loader";
import { useFetchData } from "../../../../utils/queries";

const Species = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });
  const { fetchSpecies, speciesData, mapsData, loading } = useFetchData();
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const handleClickMenu = (e: any, data: SpeciesDto) => {
    setSelectedRow(data);
    if (openMenu) {
      setAnchorEl(null);
      setOpenMenu(false);
    } else {
      setAnchorEl(e.currentTarget);
      setOpenMenu(true);
    }
  };

  const filterMapData = mapsData?.filter(
    (data) => data?.species?._id === selectedRow?._id
  );

  const handleDeleteSpecies = async () => {
    try {
      const response = await speciesService.deleteSpecies(selectedRow?._id);

      //loop deleting of map data
      for (const data of filterMapData) {
        await mapService.deleteMaps(data?._id);
      }
      const { status, message } = response.data;

      setMessage({
        message,
        status,
        open: true,
      });
      setOpenMenu(false);
      fetchSpecies();
    } catch (error) {
      console.error("Error deleting species");
    }
  };

  const handleEditMenu = async () => {
    setOpenEdit(true);
  };

  const renderRow = (row: any, index: number) => {
    return (
      <>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>
          {row?.updatedAt ? formatReadableDate(row?.updatedAt) : ""}
        </TableCell>
        <TableCell sx={{ textAlign: "right" }}>
          <CustomMenuList
            data={row}
            selectedData={selectedRow}
            openMenu={openMenu}
            anchorEl={anchorEl}
            handleClick={handleClickMenu}
            handleClose={handleClose}
            handleDelete={handleDeleteSpecies}
            handleEdit={handleEditMenu}
          />
        </TableCell>
      </>
    );
  };

  const [search, setSearch] = useState("");

  const filteredSpecies = speciesData?.filter((species) =>
    species?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container maxWidth="xl" sx={{ marginTop: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                marginBottom: 2,
                gap: 3,
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <IconButton
                  aria-label="back"
                  onClick={() => navigate("/admin")}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography gutterBottom variant="h5" component="div">
                  Species{" "}
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{ color: "gray" }}
                  >
                    {`(${speciesData?.length})`}
                  </Typography>
                </Typography>
              </Stack>

              {/* Search Input */}
              <TextField
                id="outlined-textarea"
                label="Search Species Data"
                placeholder="Search..."
                multiline
                fullWidth
                sx={{
                  width: { xs: "100%", sm: "50%" },
                  alignItems: "center",
                }}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Box>
                <CreateSpecies
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                  forceUpdate={fetchSpecies}
                />
              </Box>
            </Box>

            {filteredSpecies?.length > 0 ? (
              <GenericTable
                data={filteredSpecies}
                headers={["ID", "Name", "Updated at", ""]}
                renderRow={renderRow}
              />
            ) : (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginTop={30}
              >
                <Typography variant="h6" sx={{ color: "gray" }}>
                  No results found.
                </Typography>
              </Box>
            )}
          </Container>

          {openEdit && (
            <EditSpecies
              species={selectedRow}
              openEdit={true}
              setOpenEdit={setOpenEdit}
              forceUpdate={fetchSpecies}
            />
          )}
          {message.open && (
            <Toaster
              open={message.open}
              status={message.status}
              message={message.message}
            />
          )}
        </>
      )}
    </>
  );
};

export default Species;
