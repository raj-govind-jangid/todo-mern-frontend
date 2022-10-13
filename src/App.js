import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {

  const [questionList,setQuestionList] = useState([]);
  const [codeList,setCodeList] = useState([]);

  const [questionReqData,setQuestionReqData] = useState({title:"",description:""});
  const [codeReqData,setCodeReqData] = useState({title:"",description:"",comment:""});

  useEffect(()=>{
    if(localStorage.getItem("setData") == "asd"){
      axios.get("/getcode").then((data)=>{
        setCodeList(data.data.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    else{
      axios.get("/getquestion").then((data)=>{
        setQuestionList(data.data.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },[])

  const submitQuestion = async () => {
    let data = {"data":questionReqData};
    await axios.post("/savequestion",data).then((data)=>{
      console.log("Submit SuccessFully Question")
    }).catch((error)=>{
      console.log("Fail Question")
    })
  }

  const submitCode = async () => {
    let data = {"data":codeReqData};
    await axios.post("/savecode",data).then((data)=>{
      console.log("Submit SuccessFully Comment")
    }).catch((error)=>{
      console.log("Fail Comment")
    })
  }

  return (
    <div className='container mt-3'>

      <h1 style={{color:"white"}} className="text-center">Solve this problem and improve coding skills</h1>

      <div id="accordion" className="mt-4">

      {localStorage.getItem("setData") == "asd" && 
        <div className="card mt-4" style={{backgroundColor:"black"}}>
          <div className="card-header">
            <a className="card-link" data-toggle="collapse" href="#codeCheck" style={{color:"white"}}>
              Share your Ouestion
            </a>
          </div>
          <div id="codeCheck" className="collapse show" data-parent="#accordion" style={{color:"white"}}>
            <div className="card-body">

              <div className="form-group">
                <label for="title">Question Title:</label>
                <input type="text" className="form-control" id="title" onChange={(e)=>{setCodeReqData({...codeReqData,"title":e.target.value})}} value={codeReqData.title}/>
              </div>

              <div className="form-group">
                <label for="description">Question Description:</label>
                <input type="text" className="form-control" id="description" onChange={(e)=>{setCodeReqData({...codeReqData,"description":e.target.value})}} value={codeReqData.description}/>
              </div>

              <div className="form-group">
                <label for="comment">Comment:</label>
                <textarea className="form-control" rows="5" id="comment" onChange={(e)=>{setCodeReqData({...codeReqData,"comment":e.target.value})}}>{codeReqData.comment}</textarea>
              </div>

              <button type="button" className="btn btn-primary" onClick={()=>{submitCode()}}>Submit</button>

            </div>
          </div>
        </div>
      }

      {localStorage.getItem("setData") == "zxc" && 
        <div className="card mt-4" style={{backgroundColor:"black"}}>
          <div className="card-header">
            <a className="card-link" data-toggle="collapse" href="#codeCheck" style={{color:"white"}}>
              Share your Ouestion
            </a>
          </div>
          <div id="codeCheck" className="collapse show" data-parent="#accordion" style={{color:"white"}}>
            <div className="card-body">

              <div className="form-group">
                <label for="title">Question Title:</label>
                <input type="text" className="form-control" id="title" onChange={(e)=>{setQuestionReqData({...questionReqData,"title":e.target.value})}} value={questionReqData.title}/>
              </div>

              <div className="form-group">
                <label for="description">Question Description:</label>
                <input type="text" className="form-control" id="description" onChange={(e)=>{setQuestionReqData({...questionReqData,"description":e.target.value})}} value={questionReqData.description}/>
              </div>

              <button type="button" className="btn btn-primary" onClick={()=>{submitQuestion()}}>Submit</button>

            </div>
          </div>
        </div>
      }

      {!(localStorage.getItem("setData") == "asd") && questionList.map((x,i)=>{
        return <div className="card mt-4" style={{backgroundColor:"black"}}>
          <div className="card-header">
            <a className="card-link" data-toggle="collapse" href={`#que${i}`} style={{color:"white"}}>
              {x.title}
            </a>
          </div>
          <div id={`que${i}`} className="collapse show" data-parent="#accordion" style={{color:"white"}}>
            <div className="card-body">
            {x.description}
            </div>
          </div>
        </div>
      })}

      {(localStorage.getItem("setData") == "asd") && codeList.map((x,i)=>{
        return <div className="card mt-4" style={{backgroundColor:"black"}}>
          <div className="card-header">
            <a className="card-link" data-toggle="collapse" href={`#que${i}`} style={{color:"white"}}>
              {x.title}
            </a>
          </div>
          <div id={`que${i}`} className="collapse show" data-parent="#accordion" style={{color:"white"}}>
            <div className="card-body">
            {x.description}
            <br></br>
            <br></br>
            {x.comment}
            </div>
          </div>
        </div>
      })}

      </div>

    </div>
  );
}

export default App;
