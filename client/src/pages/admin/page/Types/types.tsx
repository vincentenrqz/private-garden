import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { speciesService } from "../../../../services/species.service";
import { SpeciesDto } from "../../../../types/species.interface";
import GenericTable from "../../components/GenericTable";
import CustomMenuList from "../../components/CustomMenuList";
import { formatDate } from "../../../../utils/utils";
import Toaster from "../../components/Toaster";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import CreateType from "./CreateType";
import EditType from "./EditType";
import { typesService } from "../../../../services/types.service";
import { useFetchData } from "../../utils/queries";

const Types = () => {
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
  const { fetchTypes, typesData, loading } = useFetchData();
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

  const handleDeleteType = async () => {
    try {
      const response = await typesService.deleteType(selectedRow?._id);
      const { status, message } = response.data;

      setMessage({
        message,
        status,
        open: true,
      });

      setOpenMenu(false);
      fetchTypes();
    } catch (error) {
      console.error("Error deleting type");
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
        <TableCell>{row.type_id}</TableCell>
        <TableCell>
          {row?.updatedAt ? formatDate(row?.updatedAt) : ""}
        </TableCell>
        <TableCell sx={{ textAlign: "right" }}>
          <CustomMenuList
            data={row}
            selectedData={selectedRow}
            openMenu={openMenu}
            anchorEl={anchorEl}
            handleClick={handleClickMenu}
            handleClose={handleClose}
            handleDelete={handleDeleteType}
            handleEdit={handleEditMenu}
          />
        </TableCell>
      </>
    );
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container maxWidth="xl" sx={{ marginTop: 10 }}>
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
                  Types{" "}
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{ color: "gray" }}
                  >
                    {typesData?.length}
                  </Typography>
                </Typography>
              </Stack>
              <Box>
                <CreateType
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                  forceUpdate={fetchTypes}
                />
              </Box>
            </Box>
            {typesData.length > 0 ? (
              <GenericTable
                data={typesData}
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
            <EditType
              data={selectedRow}
              openEdit={true}
              setOpenEdit={setOpenEdit}
              forceUpdate={fetchTypes}
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

export default Types;
