import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import axios, { Axios } from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CustomMap from "../../components/CustomMap";
import Loader from "../../components/Loader";

const Map = () => {
  const [icons, setIcons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        setIsLoading(true);
        const response: any = await axios.get("/plants/plants.json");
        setIcons(response?.data?.plants);
      } catch (error) {
        console.error("Error fetching icons");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIcons();
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container maxWidth="lg" sx={{ marginTop: 10 }}>
          <Stack direction="column" spacing={4}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <IconButton aria-label="back" onClick={() => navigate("/admin")}>
                <ArrowBackIcon />
              </IconButton>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ marginRight: 4 }}
              >
                Icons
              </Typography>
            </Stack>
            <Stack direction="row">
              <FormGroup sx={{ paddingLeft: 4 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={
                    <Typography variant="body2">
                      Enable multiple marker
                    </Typography>
                  }
                />
              </FormGroup>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                sx={{
                  "& .image-container": {
                    position: "relative",
                    display: "inline-block",
                    overflow: "hidden",
                    borderRadius: 1,
                    cursor: "pointer",
                    padding: 1,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  },
                  "& .image-container img": {
                    width: 50,
                    height: 50,
                    transition: "transform 0.3s ease",
                  },
                  "& .image-container:hover": {
                    transform: "scale(1.2)",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                  },
                  "& .image-container:hover img": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                {icons.length > 0 ? (
                  icons.map((item, index) => (
                    <Tooltip
                      key={index}
                      title={`Icon ${index + 1}`}
                      placement="top"
                      arrow
                    >
                      <Box className="image-container">
                        <Button onClick={() => setSelectedIcon(item)}>
                          <img
                            src={`/plants/${item}`}
                            alt={`Plant Icon ${index}`}
                          />
                        </Button>
                      </Box>
                    </Tooltip>
                  ))
                ) : (
                  <div>No icons available</div>
                )}
              </Box>
            </Stack>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ paddingLeft: 3 }}
            >
              Map
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="center" paddingBottom={10}>
              <CustomMap selectedIcon={selectedIcon} forAdmin={true} />
            </Box>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Map;
