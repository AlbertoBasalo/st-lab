type LineItem = {
  id: string;
  quantity: number;
};

export type Order = Readonly<{
  id: string;
  client: string;
  date: Date;
  products: ReadonlyArray<LineItem>;
  transport: Readonly<{
    type: string;
    cost: number;
  }>;
}>;
