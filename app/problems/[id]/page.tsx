interface ProblemId {
  params: {
    id: string;
  };
}

export default async function ProblemById({ params }: ProblemId) {
  return (
    <div>
      <h1>Problem ID: {params.id}</h1>
    </div>
  );
}
