export class SpeciesDto {
  _id?: string;
  name: string;
  sub_name?: string;
  icon?: any;
  type: any;
  scientific_name?: string;
  etymology?: string;
  cultural_maintenance?: string;
  fun_fact?: string;
  description?: string;
  attachments?: string;
  video?: string;
  info?: string;
  family_name?: string;
  eco_class?: string;
  type_of_plant_growth?: string;
  native_distribution?: string;
  native_habitat?: string;
  preferred_climate_zone?: string;
  growth_form?: string;
  trunk?: string;
  foliage?: string;
  flower?: string;
  fruit?: string;
  plant_rootzone_tolerance?: string;
  light_preference?: string;
  water_preference?: string;
  pollination?: string;
  propagation?: string;
  ethnobotanical_uses?: string;
  landscape_uses?: string;
  thematic_landscaping?: string;
  page_index?: number;
}

export class SpeciesCoordinatesDto extends SpeciesDto {
  position: L.LatLngExpression;
}
