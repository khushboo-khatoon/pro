function ModeToggle({mode,setMode}) {

  return (

    <div className="flex justify-center gap-4">

      <button
        onClick={()=>setMode("manual")}
        className={`px-4 py-2 rounded-md text-sm font-medium
        ${mode==="manual"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700"}`}
      >
        Manual Entry
      </button>

      <button
        onClick={()=>setMode("upload")}
        className={`px-4 py-2 rounded-md text-sm font-medium
        ${mode==="upload"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700"}`}
      >
        Upload Report
      </button>

    </div>

  )
}

export default ModeToggle