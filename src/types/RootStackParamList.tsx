/**
 * ルートの引数と型を定義
 */
import {SubItemType} from '../types/types';

export type RootStackParamList = {
  Home: undefined; // ホーム画面にはパラメータが不要
  Todo: {subItem: SubItemType | null}; // 詳細画面にはitemIdとotherParamが必要
  Detail: {subItem: SubItemType | null}; // 詳細画面にはitemIdとotherParamが必要
  Animation: {subItem: SubItemType | null}; // 詳細画面にはitemIdとotherParamが必要
  Scaling: {subItem: SubItemType | null}; // 詳細画面にはitemIdとotherParamが必要
  Gorhom: {subItem: SubItemType | null}; // 詳細画面にはitemIdとotherParamが必要
};
