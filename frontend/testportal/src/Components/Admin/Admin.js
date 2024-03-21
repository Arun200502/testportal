// import React, { useState } from "react";
// import basestyle from "../Base.module.css";
// import adminstyle from "./Admin.module.css";
// import Navbar from "./Navbar";
// import axios from "axios";

// const Admin = () => {
//   const [userDataFile, setUserDataFile] = useState(null);
//   const [questionsFile, setQuestionsFile] = useState(null);

//   const handleUserDataUpload = (e) => {
//     const file = e.target.files[0];
//     setUserDataFile(file);
//   };

//   const handleQuestionsUpload = (e) => {
//     const file = e.target.files[0];
//     setQuestionsFile(file);
//   };

//   const handleSave = async () => {
//     try {
//       // Send user data and questions files to the backend for processing
//       const formData = new FormData();
//       formData.append("email", userDataFile,"email.xlsx");
//       formData.append("question", questionsFile,"question.xlsx");
//       const response = await axios.post("http://127.0.0.1:8000/login/home/", formData);
//       alert(response.data.message);
//       // Optionally reset file states after successful upload
//     //   setUserDataFile(null);
//     //   setQuestionsFile(null);
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       alert("Failed to upload files. Please try again later.");
//     }
//   };


// return (
//   <div>
//     <Navbar /> 
//     <div className={adminstyle.container}>
//       <div className={adminstyle.admin}>
      
//         <h2>Admin Options</h2>
//         <h3>Upload User Data</h3><h5>(only Excel file with extension .xlsx,.xls)</h5>
//         <input type="file" onChange={handleUserDataUpload} accept=".xlsx, .xls" />
        
//         <h3>Upload Questions</h3><h5>(only Excel file with extension .xlsx,.xls)</h5>
//         <input type="file" onChange={handleQuestionsUpload} accept=".xlsx, .xls" />
//         <button className={basestyle.button_common} onClick={handleSave}>Save</button>
//       </div>
//     </div>
//   </div>
// );
// };
// export default Admin;


import React, { useState } from "react";
// import basestyle from "../Base.module.css";
import "./Admin.css";
import Navbar from "./Navbar";
import axios from "axios";


const Admin = () => {
  const [userDataFile, setUserDataFile] = useState(null);
  const [questionsFile, setQuestionsFile] = useState(null);

  const handleUserDataUpload = (e) => {
    const file = e.target.files[0];
    setUserDataFile(file);
  };

  const handleQuestionsUpload = (e) => {
    const file = e.target.files[0];
    setQuestionsFile(file);
  };

  const handleSave = async () => {
    if(userDataFile=== null || questionsFile === null)
    {
      alert("Both Files are Compulsory for saving!!!")
    }
    else{
    try {
      // Send user data and questions files to the backend for processing
      const formData = new FormData();
      formData.append("email", userDataFile,"email.xlsx");
      formData.append("question", questionsFile,"question.xlsx");
      const response = await axios.post("http://127.0.0.1:8000/login/home/", formData);
      alert(response.data.message);
      // Optionally reset file states after successful upload
    //   setUserDataFile(null);
    //   setQuestionsFile(null);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again later.");
    }
  }
  };
  const handleDownload=async()=>{
    axios.get('http://127.0.0.1:8000/submit/result/',{responseType:'blob'})
    .then(response=>
      {
        const url= window.URL.createObjectURL(new Blob([response.data]));
        const link=document.createElement('a');
        link.href=url;
        link.setAttribute('download',"result of student.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch(error=>{
        console.log(error);
        alert("Error in download!!!");
      })
  };



return (
  
  <div style={{width:"100%"}}>
    <Navbar /> 
    <div className={"container"}>
    <div className={"admin"}>
  <h2>Admin Options</h2>
  <div className="file-upload">
    <label><b>Upload User Data</b></label>
    <div className="file-input">
      <input type="file" onChange={handleUserDataUpload} accept=".xlsx, .xls, .csv" />
      <input type="text" disabled placeholder="Choose File" />
    </div>
  </div>
  <div className="file-upload">
    <label><b>Upload Questions</b></label>
    <div className="file-input">
      <input type="file" onChange={handleQuestionsUpload} accept=".xlsx, .xls, .csv" />
      <input type="text" disabled placeholder="Choose File" />
    </div>
  </div>

  <button className={"button_common"} onClick={handleSave}>Save</button>
  <br></br>
  <label className="labeldownload"><b>Download Test Results</b></label> 
  <button className={"button_result"} onClick={handleDownload}>Download </button> 
</div>

    </div>
  </div>
);

};
export default Admin;