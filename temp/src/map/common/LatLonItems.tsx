export type Coordinate = {
  latitude: number;
  longitude: number;
};
export type LatLonItemsProps = {
  id: number;
  coord: Coordinate;
};

export const LatLonItems = [
  {
    id: 1,
    coord: {
      latitude: 35.682599088059,
      longitude: 139.77350117154,
    },
  },
  {
    id: 2,
    coord: {latitude: 35.6831, longitude: 139.7753},
  },
  {
    id: 3,
    coord: {latitude: 35.6817, longitude: 139.7728},
  },
  {
    id: 4,
    coord: {latitude: 35.6843, longitude: 139.7741},
  },
  {
    id: 5,
    coord: {latitude: 35.682, longitude: 139.7705},
  },
  {
    id: 6,
    coord: {latitude: 35.6805, longitude: 139.7762},
  },
  {
    id: 7,
    coord: {latitude: 35.6836, longitude: 139.7719},
  },
];
