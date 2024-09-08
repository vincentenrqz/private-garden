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
    <div className="border shadow-xl rounded-xl py-10 px-5 bg-white">
      <Stack direction="column" spacing={1}>
        <Box display="flex" justifyContent="space-between">
          {/* FILTER BY SPECIES BY TYES DATA */}
          <FormControl sx={{ minWidth: 250 }} size="small">
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

        <Box
          sx={{
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            height: 500,
          }}
        >
          {/* SPECIES LIST */}
          {filteredData?.length <= 0 ? (
            <Typography paddingLeft={3}>No data available.</Typography>
          ) : (
            filteredData?.map((data) => {
              const isSelected = data._id === selectedIconMarker?._id;
              const iconData = typesData?.find(
                (type) => type?._id === data?.type
              );

              return (
                <Stack key={data?._id} direction="column" sx={{ spacing: 2 }}>
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
                      boxShadow: isSelected
                        ? "0 4px 8px rgba(0,0,0,0.2)"
                        : "none",
                      transform: isSelected ? "scale(1.05)" : "none",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                    onClick={() => selectedMarkerData(data)}
                  >
                    <CardMedia
                      component="img"
                      alt={data?.name}
                      src={iconData?.icons[0]?.iconUrl}
                      sx={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                    <Typography>{data?.name}</Typography>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                </Stack>
              );
            })
          )}
        </Box>
      </Stack>
    </div>
  );
}
