export type TabsItem = Record<string, unknown> | string | number | null;

export type TabsProps = {
  current: TabsItem,
  items: TabsItem[],

  disableUnderline: boolean,

  matchingFunction: (current: TabsItem, items: TabsItem) => boolean,
};
