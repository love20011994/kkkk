import React, { useState , useEffect,useRef} from 'react';
import axios from "axios";

// import Rules from './Rules';
import Rules from './Rules';
import { useDispatch } from 'react-redux';
 
function Contractid(props){
  const[posts,setPost] = useState([]);
  
  // const [isLoading, setIsLoading] = useState(true);
const dispatch=useDispatch()
 
  useEffect(() =>{
     axios
     .get(`http://demosrvr2.optipacetech.com:8000/api/v1/category/`)
    .then(res=>{
      console.log(res)
      setPost(res.data)
    })
   .catch(err =>{
     console.log(err)
   })
  }, [])
    return (

      <div class="container">
        <br />
        <br />
        <br /> <br /> <br />
        <div class="row">
          <div class="col-sm">
            <div class="form-group row">
              <label
                for="contractid"
                class="col-sm-3 col-form-label"
               style={{color:"black"}}
              >
                Contract Id
              </label>
              <div class="col-sm-9">
                <input
                  type="number"
                  style={{ width: "23rem",background:'white',border:"0.5px solid black"  }}
                  class="form-control shadow-none shadow-sm "
                  placeholder="Enter a value"
                  // ref={input}
                  name="contractid"
                ></input>
                 {/* <span>Enter a Contract id</span> */}
              </div>
            </div>
            <div class="form-group row">
              <label for="contractdate" class="col-sm-3 col-form-label"
               style={{color:"black"}}>
                Start Date
              </label>

              <div class="col-sm-9">
                <input
                  type="date"
                  class="form-control shadow-none shadow-sm "
                  style={{ width: "23rem",border:"0.5px solid black" }}
                  placeholder="Enter a value"
                  name="contractdate"
                  
                ></input>
              </div>
            </div>

            <div class="form-group row">
              <label for="contractdate" class="col-sm-3 col-form-label"
               style={{color:"black"}}>
                End Date
              </label>
              <div class="col-sm-9">
                <input
                  type="date"

                  class="form-control shadow-none shadow-sm "
                  style={{ width: "23rem" ,border:"0.5px solid black"}}
                  placeholder="Enter a value"
                  name="contractdate"
                ></input>
              </div>
              
            </div>

            <div class="form-group row">
              <label
                for="inputoption"
                class="col-sm-3 col-form-label"
                
              >

                Category &nbsp;&nbsp;&nbsp;
              </label>

              <div class="col-sm-9">
                <select
                type="option"
                  name="categoryid"
                  class="form-control shadow-none shadow-sm "
                  style={{ width: "23rem" ,border:"0.5px solid black"}}
                  id="inputoption"
                  aria-label="Default select example"
                  onChange={(e) =>dispatch({type:"contractid" ,payload:e.target.value})}
                >
                  <option type="option" selected style={{backgroundColor:"#13255b",color:"white", width: "160px" , fontSize: "15px"}}>Open this select categorry</option>
                 
                 {posts.map((post,i)=>(
          <option  type='option'
     style={{ width: "160px",height:'30rem', fontSize: "13px", fontWeight: 'bold' }} 
      value={i+1}>{post.category}
 

 </option>
                 )
                 
                 )}
                              

                      
                     
                </select>


              </div>

            </div></div> </div>


      </div>




    );

  
}
export default Contractid;


































 