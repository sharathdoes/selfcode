import Ide from './compiler'
import Description from './description'
import Header from "@/components/Header";
export default function IdePage() {
  return (
    <div >
      <Header></Header>
      <div className=" flex ">
      <div  className="w-[50%] h-screen"><Description/></div>
      <div className="w-[50%] h-screen border-l">
            <Ide/>
      </div>
    </div>
    </div>
    
  );
}
