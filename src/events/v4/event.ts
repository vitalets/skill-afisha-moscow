import { Sphere } from './sphere';

export interface Event {
  id: number;
  title: string;
  url: string;
  free: number;
  date_from: string;
  date_to: string;
  restriction: {
    age: number;
  };
  spheres: {
    id: Sphere;
  }[];
  spots: {
    address: string;
    lon: string;
    lat: string;
  }[];
  auditories: {
    id: number;
  }[];
  districts: {
    id: number;
  }[];
  foundation: {
    phone: string;
  };
}
