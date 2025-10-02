export type Example = {
  input: string;
  output: string;
  explanation: string;
};

export type Description = {
  problemName: string;
  topics: string[];
  difficult: string;
  description: string;
  returnformat: string;
  examples: Example[];
  constraints: string[];
  Comments: string[];
  Solutions: string[];
};

export type TestCase = { input: string; output: string };
