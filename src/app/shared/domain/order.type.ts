type LineItem = {
  id: string;
  quantity: number;
};

export type Order = {
  id: string;
  client: string;
  date: Date;
  products: LineItem[];
  transport: {
    type: string;
    cost: number;
  };
};
