import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function ManualEntryCard(){

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [age,setAge] = useState("")
  const [chol,setChol] = useState("")
  const [hdl,setHdl] = useState("")
  const [ldl,setLdl] = useState("")
  const [trig,setTrig] = useState("")
  const [bp,setBp] = useState("")
  const [hr,setHr] = useState("")

  const handlePredict = async()=>{

    try{

      const formData = new FormData()

      formData.append("age",age)
      formData.append("chol",chol)
      formData.append("hdl",hdl)
      formData.append("ldl",ldl)
      formData.append("trig",trig)
      formData.append("bp",bp)
      formData.append("hr",hr)

      // ML prediction
      const res = await axios.post(
        "http://127.0.0.1:5000/predict_manual",
        formData
      )

      const result = res.data

      // save prediction in spring boot
      await axios.post(
        "http://localhost:8080/api/predictions",
        {
          userId: user.id,
          risk: result.risk,
          level: result.level,
          prediction: result.prediction,
          confidence: result.confidence,
          completeness: result.completeness
        }
      )

      // send inputs + result to report page
      navigate("/dashboard/report",{
        state:{
          result: result,
          inputs:{
            age,
            chol,
            hdl,
            ldl,
            trig,
            bp,
            hr
          }
        }
      })

    }catch(err){

      console.log(err)
      alert("Prediction failed")

    }

  }

  return(

    <div className="bg-white shadow-md rounded-xl p-6 w-[420px]">

      <h3 className="text-lg font-semibold mb-4 text-center">
        Enter Patient Data
      </h3>

      <div className="grid grid-cols-2 gap-3">

        <input
        placeholder="Age"
        className="border p-2 rounded"
        onChange={(e)=>setAge(e.target.value)}
        />

        <input
        placeholder="Cholesterol"
        className="border p-2 rounded"
        onChange={(e)=>setChol(e.target.value)}
        />

        <input
        placeholder="HDL"
        className="border p-2 rounded"
        onChange={(e)=>setHdl(e.target.value)}
        />

        <input
        placeholder="LDL"
        className="border p-2 rounded"
        onChange={(e)=>setLdl(e.target.value)}
        />

        <input
        placeholder="Triglycerides"
        className="border p-2 rounded"
        onChange={(e)=>setTrig(e.target.value)}
        />

        <input
        placeholder="Blood Pressure"
        className="border p-2 rounded"
        onChange={(e)=>setBp(e.target.value)}
        />

        <input
        placeholder="Heart Rate"
        className="border p-2 rounded col-span-2"
        onChange={(e)=>setHr(e.target.value)}
        />

      </div>

      <button
      onClick={handlePredict}
      className="bg-blue-600 text-white w-full mt-5 py-2 rounded-md"
      >
      Predict Risk
      </button>

    </div>

  )

}

export default ManualEntryCard