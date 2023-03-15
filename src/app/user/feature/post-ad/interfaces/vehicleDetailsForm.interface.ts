export interface VehicleFormInterface {
  title: string;
  description: string;
  phone: number;
  rate: number;
  duration: string;
  passengers?: number;
  seats?: number;
  weight?: number;
  driver?: boolean;
  ac?: boolean;
  capacity?: number;
}
