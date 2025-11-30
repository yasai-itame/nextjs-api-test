export type GetCategory = {
  [key: string]: {
    name: string;
    data: {
      category: string;
      name: string;
      value: string;
    }[]
  };
};