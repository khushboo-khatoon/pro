function CameraCard(){

  return(

    <div className="bg-white shadow-md rounded-xl p-5 w-[300px]">

      <h4 className="font-semibold text-center mb-3">
        Camera Capture
      </h4>

      <div className="h-[220px] bg-gray-200 rounded-md flex items-center justify-center">
        Camera Preview
      </div>

      <div className="flex justify-between mt-4">

        <button className="text-gray-500 text-sm">
          Retake
        </button>

        <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm">
          Confirm Capture
        </button>

        <button className="text-gray-500 text-sm">
          Flash
        </button>

      </div>

    </div>

  )
}

export default CameraCard