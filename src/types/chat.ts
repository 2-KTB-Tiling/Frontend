export type Chat = {
  type: 1 | -1;
  content: string;
  isLoading?: boolean;
  shouldRemove?: boolean;
};
