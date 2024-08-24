import { Icon, IconButton } from "@mui/material";
import { BsFlower1 } from "react-icons/bs";
import { filterDataByType } from "../../../../utils";

//Call a state here
export default function ButtonFilters({
  typeData,
  speciesData,
  setButtonFilters,
}) {
  const { name } = typeData;

  const filteredData = (types) => {
    const data = filterDataByType({ items: speciesData, id: types?._id });
    setButtonFilters(data);
  };

  return (
    <div className={`text-black flex`}>
      <div className="bg-lime-600">
        <IconButton onClick={() => filteredData(typeData)}>
          <Icon>
            <BsFlower1 />
          </Icon>
        </IconButton>
      </div>
    </div>
  );
}

//TODO: MAKE A FUNCTION TO HANDLE THE ICON LOGO AND BUTTON COLOR IF SHRUBS, TREES, ETC.

function handleDataIcon(data) {
  //todo: handle the styling for the data icon here
  return (
    <Icon>
      <BsFlower1 />
    </Icon>
  );
}
