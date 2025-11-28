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
  id: string;
  problemName: string;
  topics: string[];
  difficulty: string;
  description: string;
  returnformat: string | null;
  examples: any[];
  testcases: any[];

  constraints: string[];
  comments: string[];
  solutions: any[];        
  createdBy: {
    id: string;
    name: string | null;
    email: string | null;
  };                         
  contestId?: string | null;
  createdAt: Date;
};


export type Contest = {
  title: string;
  description: string;
  topics: string[];
  difficulty: "easy" | "medium" | "hard" | "mixed";

  startTime: string; 
  endTime: string;   
  durationMinutes: number; 
  problemPrompts: { text : string}[],
  problems: ProblemDescription[]; 

  createdBy: {
    id: string;
    name: string;
    email?: string;
  };

  isPublic: string;
  emails?: string[];
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
