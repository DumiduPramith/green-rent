export interface AdDetailsInterface {
  adId: number;
  createdAt: string;
  description: string;
  rate: number;
  rateDuration: string;
  title: string;
  userId: number;
  vehicleId: number;
  phone: number;
  district: string;
}

export interface AdImagesInterface {
  images: string[];
}

export interface AdDetailsHttpInterface
  extends AdDetailsInterface,
    AdImagesInterface {}
