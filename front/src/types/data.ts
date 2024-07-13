export type Data = {
  _id: string;
  name: string;
  age: string; // Date type in string format (e.g., 'YYYY-MM-DD')
  level: "easy" | "normal" | "hard";
  msg: string;
  important?: boolean;
  status?: "open" | "close";
};
