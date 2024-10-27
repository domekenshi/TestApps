import {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';
import {MAP_TYPES} from '../common/const';

/**
 * PROVIDER取得
 *
 * PROVIDER_DEFAULT:
 * iOS: Apple Maps
 * Android: Google Maps
 *
 * PROVIDER_GOOGLE:
 * - iOS: Google Maps
 * - Android: Google Maps
 * @param type
 * @returns
 */
export const getMapProvider = (type: number) => {
  if (type === 0) {
    return PROVIDER_GOOGLE;
  } else {
    return PROVIDER_DEFAULT;
  }
};
export const getMapType = (type: string) => {
  switch (type) {
    case MAP_TYPES.STANDARD:
      return MAP_TYPES.STANDARD;
    case MAP_TYPES.NONE:
      return MAP_TYPES.NONE;
    case MAP_TYPES.SATELLITE:
      return MAP_TYPES.SATELLITE;
    case MAP_TYPES.HYBRID:
      return MAP_TYPES.HYBRID;
    case MAP_TYPES.TERRAIN:
      return MAP_TYPES.TERRAIN;
    case MAP_TYPES.MUTEDSTANDARD:
      return MAP_TYPES.MUTEDSTANDARD;
    case MAP_TYPES.SATELLITE_FLYOVER:
      return MAP_TYPES.SATELLITE_FLYOVER;
    case MAP_TYPES.HYBRID_FLYOVER:
      return MAP_TYPES.HYBRID_FLYOVER;
    default:
      return MAP_TYPES.SATELLITE;
  }
};
