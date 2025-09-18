"use client";
import Execute from "@/app/utils/piston";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
// type FormData = {
//   code: string
// };

export default function Ide() {
  // const{register,handleSubmit}=useForm<FormData>();

  // const ExecuteCode= async (data :FormData)=>{
  //     const res=await(Execute({code:data.code, language:"cpp", version:"10.2.0"}));
  //     console.log(res);
  // }
  const [code, setCode] = useState<string>("");
  const handleRun = async () => {
    const res = await Execute({
      code: code,
      language: "cpp",
      version: "10.2.0",
    });
    console.log(res);
  };
  return (
    <div className="flex h-screen flex-col">
      <div className="h-[70%]">
        {/* <form onSubmit={handleSubmit(ExecuteCode)}> */}
        {/* <Textarea {...register('code')} placeholder="write damn code"></Textarea> */}
        <CodeMirror
          value={code}
          height="400px"
          theme={vscodeDark}
          onChange={(value) => setCode(value ?? "")}
        />
        <Button onClick={handleRun}>Run</Button>
        {/* </form> */}
      </div>
    </div>
  );
}
