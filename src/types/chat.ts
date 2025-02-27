export type Chat = {
  id: string;
  type: 1 | -1;
  content: string;
  isLoading?: boolean;
  shouldRemove?: boolean;
};
