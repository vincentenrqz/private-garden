import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import CreateSpecies from "./CreateSpecies";
import { speciesService } from "../../../../services/species.service";
import { SpeciesDto } from "../../../../types/species.interface";
import GenericTable from "../../components/GenericTable";
import CustomMenuList from "../../components/CustomMenuList";
import { formatDate } from "../../../../utils/utils";
import Toaster from "../../components/Toaster";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import EditSpecies from "./EditSpecies";
import Loader from "../../components/Loader";

const Species = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [species, setSpecies] = useState<SpeciesDto[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchSpecies = async () => {
    const response = await speciesService.getSpecies();
    const { data } = response;
    setSpecies(data);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchSpecies();
    } catch (error: any) {
      const { message, status } = error?.response?.data;
      setMessage({
        message,
        status,
        open: true,
      });

      console.error("Error fetching species", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  const handleDeleteSpecies = async () => {
    try {
      const response = await speciesService.deleteSpecies(selectedRow?._id);
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

  console.log("selectedRow", selectedRow);
  const renderRow = (row: any, index: number) => {
    return (
      <>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.type_id}</TableCell>
        <TableCell>
          {row?.updatedAt ? formatDate(row?.updatedAt) : ""}
        </TableCell>
        <TableCell sx={{ textAlign: "right" }}>
          <CustomMenuList
            data={row}
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

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Container maxWidth="lg" sx={{ marginTop: 10 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
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
                    {`(${species?.length})`}
                  </Typography>
                </Typography>
              </Stack>
              <Box>
                <CreateSpecies
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                  forceUpdate={fetchSpecies}
                />
              </Box>
            </Box>
            {species.length > 0 ? (
              <GenericTable
                data={species}
                headers={["ID", "Name", "Type", "Updated at", ""]}
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
