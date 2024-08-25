import {
  Box,
  CardMedia,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

export default function FilterSpeciesContent({
  handleFilterSpecies,
  typesData,
  filteredData,
  selectedIconMarker,
  selectedMarkerData,
}) {
  return (
    <Stack direction="column" spacing={1}>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ paddingLeft: 3 }}
      >
        {/* FILTER BY SPECIES BY TYES DATA */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Filter by</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Species"
            // value={""}
            defaultValue="None"
            onChange={handleFilterSpecies}
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            {typesData?.map((data) => (
              <MenuItem key={data?._id} value={data?.name}>
                {data?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* SPECIES LIST */}
      {filteredData?.length <= 0 ? (
        <Typography paddingLeft={3}>No data available.</Typography>
      ) : (
        filteredData?.map((data) => {
          const isSelected = data._id === selectedIconMarker?._id;
          return (
            <Stack
              key={data?._id}
              direction="column"
              sx={{ paddingLeft: 3, spacing: 2 }}
            >
              <Box
                key={data?._id}
                display="flex"
                alignItems="center"
                sx={{
                  gap: 2,
                  padding: 0.5,
                  cursor: "pointer",
                  backgroundColor: isSelected ? "#e0e0e0" : "transparent",
                  borderRadius: isSelected ? "8px" : "0",
                  boxShadow: isSelected ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
                  transform: isSelected ? "scale(1.05)" : "none",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => selectedMarkerData(data)}
              >
                <CardMedia
                  component="img"
                  alt={data?.name}
                  src={`${import.meta.env.VITE_API_URL}uploads/${
                    data?.icon?.iconUrl
                  }`}
                  sx={{ width: 50, height: 50, objectFit: "cover" }}
                />
                <Typography>{data?.name}</Typography>
              </Box>
              <Divider sx={{ mt: 2 }} />
            </Stack>
          );
        })
      )}
    </Stack>
  );
}
