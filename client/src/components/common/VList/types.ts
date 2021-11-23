export type TListItem = Record<string, unknown> | string | number | null;

export interface IListGroup {
  key?: number | string,
  title: string,
  items: TListItem[],
}

export interface IListProps {
  current: TListItem,
  groups: IListGroup[],
}
