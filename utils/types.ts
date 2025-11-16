export type Example = {
  input: string;
  output: string;
  explanation: string;
};

export type Solution = {
  language: string;
  code: string;
};

export type ProblemDescription = {
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

export type Contest = {
  title: string;
  description: string;
  topics: string[];
  difficulty: "easy" | "medium" | "hard" | "mixed";

  startTime: string; 
  endTime: string;   
  durationMinutes: number; 
  problemPrompts: { text: string }[];
  problems: ProblemDescription[]; 

  createdBy: {
    id: string;
    name: string;
    email?: string;
  };

  participants?: {
    userId: string;
    username: string;
    score: number;
    solvedCount: number;
    rank?: number;
    submissions?: Submission[];
  }[];


  isPublic: string;
  emails?: string[];


  status: "upcoming" | "running" | "completed";

  createdAt: string;
  updatedAt: string;
};

export type Submission = {
  problemId: string;
  userId: string;
  language: string;
  code: string;
  status: "accepted" | "wrong_answer" | "runtime_error" | "time_limit_exceeded";
  timeTakenMs?: number;
  submittedAt: string;
};
