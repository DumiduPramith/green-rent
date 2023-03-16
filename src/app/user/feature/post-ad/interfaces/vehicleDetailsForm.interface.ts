export interface VehicleFormInterface {
  title: string;
  description: string;
  phone: number;
  rate: number;
  duration: string;
  district: number;
  passengers?: number;
  seats?: number;
  weight?: number;
  driver?: boolean;
  ac?: boolean;
  enginecapacity?: number;
}
