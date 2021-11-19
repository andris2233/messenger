export type HeaderTabItem = {
  title: string;
  route: { name: string };
};

export type HeaderProps = {
  currentTab: HeaderTabItem,
  tabs: HeaderTabItem[],
};
