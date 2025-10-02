export type Example = {
  input: string;
  output: string;
  explanation: string;
};

export type Solution = {
  language: string;
  code: string;
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
  Solutions: Solution[];
};

export type TestCase = { input: string; output: string };
