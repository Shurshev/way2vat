const columnsMap = {
  id: "expenseId",
  company: "companyName",
  reportId: "reportId",
  amount: "amount",
  img: "img"
} as const;

type ColumnMap = typeof columnsMap;
type ColumnMapValues = ColumnMap[keyof ColumnMap];

export const getColumnNames = (headers: string[]): (ColumnMapValues | string)[] =>
  headers.map(column => columnsMap[column as keyof ColumnMap] || column);

