import React from "react";
import { TypesDto } from "../../../../types/types.interface";

type Props = {
  species: TypesDto;
  openEdit: boolean;
  setOpenEdit: any;
  forceUpdate: any;
};

//TODO: Create a edit modal for reference: Species.tsx
const EditType = ({ species, openEdit, setOpenEdit, forceUpdate }: Props) => {
  return <div>EditType</div>;
};

export default EditType;
