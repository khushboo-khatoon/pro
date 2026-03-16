import { useState, useRef } from "react"
import axios from "axios"
import Webcam from "react-webcam"
import { useNavigate } from "react-router-dom"

function UploadReportCard(){

  const navigate = useNavigate()

  const [file,setFile] = useState(null)
  const [cameraOpen,setCameraOpen] = useState(false)
  const [photo,setPhoto] = useState(null)
  const [loading,setLoading] = useState(false)

  const webcamRef = useRef(null)

  const handleFileChange = (e)=>{
    setFile(e.target.files[0])
    setPhoto(null)
  }

  const openCamera = ()=>{
    setCameraOpen(true)
    setFile(null)
  }

  const capturePhoto = ()=>{
    const imageSrc = webcamRef.current.getScreenshot()
    setPhoto(imageSrc)
    setCameraOpen(false)
  }

  const cancelCamera = ()=>{
    setCameraOpen(false)
  }

  const handleAnalyze = async ()=>{

    if(!file && !photo){
      alert("Upload report or capture photo")
      return
    }

    const formData = new FormData()

    if(file){
      formData.append("image",file)
    }

    if(photo){
      const blob = await fetch(photo).then(r=>r.blob())
      formData.append("image",blob,"capture.jpg")
    }

    try{

      setLoading(true)

      // ML prediction API
      const res = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
      )

      console.log("ML Result:",res.data)

      // Save prediction to Spring Boot
      await axios.post(
        "http://localhost:8080/api/predictions",
        {
          userId:1,
          risk: res.data.risk,
          level: res.data.level,
          prediction: res.data.prediction,
          confidence: res.data.confidence,
          completeness: res.data.completeness
        }
      )

      navigate("/dashboard/report",{
        state:{
           result: res.data,
          inputs: res.data.parameters
       }
      })

    }catch(err){

      console.error("Prediction error:",err)

      if(err.response){
        console.error("Server error:",err.response.data)
      }

      alert("Prediction failed. Check console.")

    }finally{

      setLoading(false)

    }

  }

  return(

    <div className="bg-white shadow-md rounded-xl p-6 w-[420px]">

      <h3 className="text-lg font-semibold text-center mb-4">
        Upload Medical Report
      </h3>

      {cameraOpen && (

        <div className="flex flex-col items-center">

          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-md"
          />

          <div className="flex gap-3 mt-3">

            <button
              onClick={capturePhoto}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Capture
            </button>

            <button
              onClick={cancelCamera}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </button>

          </div>

        </div>

      )}

      {!cameraOpen && !photo && (

        <input
          type="file"
          accept=".jpg,.png"
          onChange={handleFileChange}
        />

      )}

      {photo && (
        <img src={photo} alt="capture" className="rounded-md mb-4"/>
      )}

      <div className="flex justify-center gap-3 mt-5">

        {!cameraOpen && (

          <button
            onClick={openCamera}
            className="bg-gray-200 px-4 py-2 rounded-md"
          >
            Camera Capture
          </button>

        )}

        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Risk"}
        </button>

      </div>

    </div>

  )

}

export default UploadReportCard