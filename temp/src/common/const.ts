import {MapTypes} from 'react-native-maps';

// 表示する地図の種類
export const MAP_TYPES: MapTypes = {
  // - standard: 標準の道路地図 (デフォルト)
  STANDARD: 'standard',
  // - none: 地図なし注: MapKit では利用できません
  NONE: 'none',
  // - satellite: 衛星ビュー
  SATELLITE: 'satellite',
  // - hybrid: 道路と興味のあるポイントが重ねて表示された衛星ビュー
  HYBRID: 'hybrid',
  // - territory: 地形ビュー
  TERRAIN: 'terrain',
  // - mutedStandard: より控えめで、マーカー/線がより目立つようになります (iOS 11.0 以降のみ)
  MUTEDSTANDARD: 'mutedStandard',
  // - satelliteFlyover: 衛星ビュー付きの 3D 地球儀 (iOS 13.0 以降の Apple マップのみ)
  SATELLITE_FLYOVER: 'satelliteFlyover',
  // - hybridFlyover: ハイブリッド ビュー付きの 3D 地球儀 (iOS 13.0 以降の Apple マップのみ)
  HYBRID_FLYOVER: 'hybridFlyover',
};

/**
 * region マップに表示される領域
 * 地図の位置を制御する静的なプロパティ
 */
export const RESION = {
  latitude: 36.6586,
  longitude: 139.7454,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

/**
 * initialRegion
 * 初期位置のみ
 */
export const INITIAL_REGION = {
  TOKYO: {
    latitude: 35.680959106959,
    longitude: 139.76730676352,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
};
