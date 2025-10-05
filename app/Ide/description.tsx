import React, {useEffect} from 'react'
import {Description} from  "@/utils/types"

export default function Ide({ problem }: { problem:Description }) {
  const [activeTab, setActiveTab] = React.useState<string>("Description");
   
    function ActualDescription(){
      return (
        <div className="flex flex-col min-h-screen">
          <h1>{problem.problemName}</h1>

        </div>
      )
    }

    function Submissions(){
       return (
        <div>
          Submissions
        </div>
      )
    }
    
    function Editorial(){
       return (
        <div>
          Editorial
        </div>
      )
    }
   
    function Notes(){
       return (
        <div>
          Notes
        </div>
      )
    }

    const tabs = {
      Description: <ActualDescription />,
      Submissions: <Submissions />,
      Editorial: <Editorial />,
      Notes: <Notes />,
    };

      function Header(){
       return (
       <div className="w-full flex justify-around border-b mb-4">
        {Object.keys(tabs).map((tab) => {         
          return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200
              ${
                activeTab === tab
                  ? "border-b-2   font-semibold"
                  : "text-gray-600 "
              }`}
          >
            {tab}
          </button>
        )})}
      </div>
      )
    }

    return (
        <div className="w-full h-full flex flex-col overflow-y-scroll p-4">
          <Header/>
          <div className="mt-4">{tabs[activeTab as keyof typeof tabs]}</div>
        </div>
    )
}