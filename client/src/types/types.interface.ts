export class IconDto {
  iconUrl: string;
  iconSize?: any;
  iconAnchor?: any;
  popupAnchor?: any;
  tooltipAnchor?: any;
  shadowUrl?: string;
  shadowSize?: any;
  _id: number;
}

export class TypesDto {
  _id?: string;
  name: string;
  icons: IconDto[];
}
