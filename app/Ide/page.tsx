import Ide from './compiler'
import Description from './description'
export default function IdePage() {
  return (
    <div >
      <div className=" flex ">
      <div  className="w-[50%] h-screen"><Description/></div>
      <div className="w-[50%] h-screen border-l">
            <Ide/>
      </div>
    </div>
    </div>
    
  );
}
