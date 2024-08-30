export class SpeciesDto {
  _id?: string;
  name: string;
  sub_name?: string;
  icon?: any;
  type?: any;
  scientific_name?: string;
  etymology?: string;
  cultural_maintenance?: string;
  fun_fact?: string;
  description?: string;
  attachments?: string;
  video?: string;
}

export class SpeciesCoordinatesDto extends SpeciesDto {
  position: L.LatLngExpression;
}
