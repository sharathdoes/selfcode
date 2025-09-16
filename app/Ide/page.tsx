import Ide from './compiler'
export default function IdePage() {
  return (
    <div className=" flex ">
      <div  className="w-[50%] h-screen"> left side description</div>
      <div className="w-[50%] h-screen border-l flex flex-col">
        <div className="h-[70%]"><Ide/></div>
        <div className="h-[30%]">testcases</div>
      </div>
    </div>
  );
}
