/**
 * ルートの引数と型を定義
 */
import {SubItemType} from '../types/types';

export type RootStackParamList = {
  Home: undefined; // ホーム画面にはパラメータが不要
  Todo: {subItem: SubItemType | null}; // 詳細画面にはitemIdとotherParamが必要
  Detail: {subItem: SubItemType | null};
  Animation: {subItem: SubItemType | null};
  Scaling: {subItem: SubItemType | null};
  Translate: {subItem: SubItemType | null};
  AnimationTest: {AnimationTest: SubItemType | null};
  Gorhom: {subItem: SubItemType | null};
};
