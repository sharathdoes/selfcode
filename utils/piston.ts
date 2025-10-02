// curl -X POST https://emkc.org/api/v2/piston/execute \
// -H "Content-Type: application/json" \
// -d '{
//   "language": "cpp",
//   "version": "10.2.0",
//   "files": [
//     { "name": "main.cpp", "content": "#include <bits/stdc++.h>\nusing namespace std;\nint main(){ cout << \"Hello from C++ via Piston!\" << endl; return 0; }" }
//   ]
// }'

function filenameFor(language: string): string {
  switch (language) {
    case "cpp":
      return "main.cpp";
    case "python":
      return "main.py";
    case "javascript":
      return "main.js";
    case "java":
      return "Main.java";
    default:
      return "main.txt"; 
  }
}

type PisonReq={
  code : string,
  language:string, 
  version:string
}

export default async function Execute({code, language, version}:PisonReq) {
  if(!language || !version || !code) throw new Error("Missing fields");
  const payload={
    language:language,
    version:version,
    files:[{name:filenameFor(language), content:code}]
  }
  const body=JSON.stringify(payload);
  try{
    const res=await fetch("https://emkc.org/api/v2/piston/execute", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:body
    });
    if (!res.ok) {
  throw new Error(`Piston API failed: ${res.statusText}`);
}

    return res.json();
  }catch(err){
    console.log(err);
    throw new Error("Failed to execute code", {cause:err});
  }
  
} 