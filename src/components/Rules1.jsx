import { BsPlusLg } from "react-icons/bs"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {RiDeleteBinLine} from "react-icons/ri"
import {BiPlus,BiMinus} from "react-icons/bi"
import { useSelector } from "react-redux";
 
function Rules() {
  const [set, setRules] = useState([]);
  const [send ,sendCondition]=useState([]);
  const [state,setstate] = useState(false)
  const [count,setcount] = useState(1)
  const contractid = useSelector(state => state)
  var contractInitialState = {
    categoryid: "",
    contractid: "",
    contractdate: "",
    ruleName: "",

    priorityValue: "",
    frequencyValue: "",
    penaltyValue: "",
    condition: "",
    days: "",
    contractkpi: "",
  };
  const [input, setInput] = useState([]);
  const [ContractDemo, setContractDemo] = useState(contractInitialState);
  const [CategoryList, setcategoryList] = useState("");
  const [Contract_kpi, setContract_kpi] = useState("");
  const [Condition, setCondition] = useState("");
  const [Acceptable, setAcceptable] = useState("");
  const [Rule, setRule] = useState("");

  const [showing, setShowing] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [view, setView] = useState(false);
  const [form, setForm] = useState(new FormData());
  const add =()=>{
      // setstate(true)
      setcount(count+1)
      console.log("ok")
  }
 const dele=()=>{
   setcount(count-1)
 }
  
  useEffect(() => {
    axios
      .get(`http://demosrvr2.optipacetech.com:8000/api/v1/rule/?category_id=${contractid}`)
      .then(res => {
        console.log(res)
       
        setRules(res.data)
      })
      .catch(err1 => {
        console.log(err1)

      })
  }, [])

  const conditions = (a, e) => {
    // setruleName([ruleName]:e);
    ContractDemo.ruleName = e;
    console.log(ContractDemo, "concate");
    setContractDemo(...[ContractDemo]);
  setShow(true);
  console.log(e);
  let condition_data = "";
  let accept = [];
  let object = [];
  axios
    .get(
      `http://demosrvr2.optipacetech.com:8000/api/v1/formula1/?rule_id=${e}`
    )
    
    .then((resp) => {
      
      condition_data = resp.data;

      for (let i = 0; i < condition_data.length; i++) {
        if (condition_data[i].tag === "ACCEPT") {
          console.log(condition_data[i], "sam");
          accept.push(condition_data[i]);
          setShowing(true);
          setView(true);
           
        } else if (condition_data[i].tag === "OBJECT" || "TAT") {
          console.log(condition_data[i], "kkk");
          object.push(condition_data[i]);
          setShowing(true);
         
        }
      }
      setAcceptable(accept);
      setCondition(object);
      

      console.log(Acceptable, "condition");
    });

  axios
    .get(
      `http://demosrvr2.optipacetech.com:8000/api/v1/contractkpi/?rule_id=${e}`
    )
   
    .then((resp) => {
     
      setShowing(true);
      var datas = resp.data;
      setContract_kpi(datas);

      console.log(resp.data, "contractkpi");
    });
};

const Onchange = (val, data, id) => {
  console.log(val.name);
  switch (val.name) {
    case "contractid":
      data.contractid = val.value;
      console.log(data.contractid, "YYYYYYYYYY");
      break;
    case "contractdate":
      data.contractdate = val.value;
      break;
    case "categoryid":
      data.categoryid = val.value;
      break;
    case "ruleName":
      data.ruleName = id;
      console.log(data.ruleName, "KKKK");
      break;
    case "priorityValue":
      data.priorityValue = val.value;
      break;
    case "frequencyValue":
      data.frequencyValue = val.value;
      break;

    case "penaltyValue":
      data.penaltyValue = val.value;
      break;
  }
  setContractDemo(data);
};

const fOnChange = (e, index) => {
  const { name, value } = e;

  input[index] = {
    value1: e.name,
    value2: e.value,
  };

  setInput(...[input]);
  console.log(input, "INPUT");
};
 

 
const demoApi = async () => {
  alert("Sam");
 
  await axios
    .post(
      "http://demosrvr2.optipacetech.com:8000/api/v1/contractid_demo/",
      {
        contractid: ContractDemo.contractid,
        end_dates: ContractDemo.contractdate,
        categoryid: ContractDemo.categoryid,
        rule_id: ContractDemo.ruleName,
        priorityid: ContractDemo.penaltyValue,
        frequencyid: ContractDemo.frequencyValue,
      }

   
    )
    .then((res) => {
      console.log(res.data);
      alert("saved");
       
    })
    .catch((e) => {
      console.log(e);
      alert(e);
    });
};


  return (
<div class="container" style={{marginTop: "65px",display:"flex"}} >
  <div class="row">
    <div class="col" id="panel">
    <div class="panel panel-primary" id="result_panel">
    <div class="panel-heading"><h6 class="panel-title">Rule</h6></div>
    <div class="panel-body">
 
        <ul class="list-group">
        {set.map((set, i) => (
            <li class="list-group-item"  value={i + 1}
            onClick={(e) => {
                conditions(e.target,set.id);
              }}            > 

            {set.rule_name}
            </li>
               ))}
            </ul>
  
            </div>

    </div>

    </div>
    <div class="col-sm" id="pro">
    <div class="container">
                <table style={{marginLeft:'-47px'}}>
                  <tbody>
                    <br></br>

                    <div>
                      <div Style="display:flex; margin-left:4rem">
                        <table>
                          <th>
                            <lable>Priority   &nbsp;&nbsp;</lable>
                          </th>
                          <td>
                            <input
                              type="text"
                              class="col-md-9"
                              name="priorityValue"
                              defaultValue={ContractDemo.priorityValue}
                             
                              onChange={(e) => Onchange(e.target, ContractDemo)}
                            ></input>
                            <br></br>
                            {error && (
                              <span class="text-danger">
                                this priority was already taken
                              </span>
                            )}
                          </td>
                          <th>
                            <label>
                              frequency &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </label>
                          </th>
                          <td>
                            <div>
                              {!view && (
                                <select
                                  class="form-select"
                                  name="frequencyValue"
                                  defaultValue={ContractDemo.frequencyValue}
                                  id="inputoption"
                                  aria-label="Default select example"
                                  
                                  onChange={(e) =>
                                    Onchange(e.target, ContractDemo)
                                  }
                                >
                                  <option selected>select frequency</option>
                                  <option value="1">1 day</option>
                                  <option value="2">2 day</option>
                                  <option value="3">3 day</option>
                                </select>
                              )}
                            </div>
                          </td>
                          <td>
                            {view && (
                              <div>
                                <td>
                                  {" "}
                                  <select
                                    class="form-select col-md-6"
                                    name="frequencyValue"
                                    defaultValue={ContractDemo.frequencyValue}
                                    id="inputoption"
                                    aria-label="Default select example"
                                   
                                    onChange={(e) =>
                                      Onchange(e.target, ContractDemo)
                                    }
                                  >
                                    <option selected>select frequency</option>
                                    <option value="1">1 day</option>
                                    <option disabled>2 day</option>
                                    <option disabled>3 day</option>
                                  </select>
                                </td>
                                <td>
                                  <th>
                                    <lable>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Penalty:
                                    </lable>
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      class="col-md-9"
                                      name="penaltyValue"
                                      defaultValue={ContractDemo.penaltyValue}
                                      
                                      onChange={(e) =>
                                        Onchange(e.target, ContractDemo)
                                      }
                                    ></input>
                                  </td>
                                </td>
                              </div>
                            )}
                          </td>
                        </table>
                      </div>
                    </div>
                  </tbody>
                </table>
              </div>
              
            <div Style=" margin:0 auto;  margin-bottom:10px; margin-top:8%">
              <table
                class="table table-borderless"
                style={{marginTop :'-4%',marginLeft:"23px"}}
              
                
              >
                {show && <tr>{/* <h6>{this.state.conditions}</h6> */}</tr>}
                
                <tbody>
                  {showing && (
                    <div class="row">
                    <div class="col-sm-4" style={{marginLeft:"134px"}}> 
                    <th>
                            <lable>Condition</lable>
                          </th></div>
                    <div class="col-sm-4"> 
                    <th >
                                <label>Penalty Amount</label>
    
                              </th></div>
                    
                  
                   
                        {/* <th>
                            <lable>Condition</lable>
                          </th>
                          <th style={{marginLeft :'20px'}}>
                                <label>Penalty Amount</label>
    
                              </th> */}
                      {Condition &&
                        Condition.slice(0,count).map((item, index) => {
                          return (
                            <div key={index}>{state?null:<div Style="display:flex">
                            <table Style="width:141% ; margin-left:27px">
                          
                              <td Style="width:70%">
                                <input
                                  Style="width:145%"
                                  type="text"
                                  value={item.condition}
                                />
                              </td>
                              <th>
                              
                              </th>
                              <td  >
                                <input
                                
                                style={{marginLeft:"86px",width:"269px"}}
                                 type="text"
                                  class="col-sm-4"
                                  name={item.id}
                                  // defaultValue={input}
                                  onChange={(e) => {
                                    fOnChange(e.target, index);
                                  }}
                                />
                              </td>
                            <td> <div style={{marginLeft: "-11rem"}} onClick={add} ><BiPlus/></div>
                              <div onClick={dele} ><RiDeleteBinLine/></div></td>


                            </table>

                          </div>}
                              
                            </div>
                          );
                        })}
                      {Acceptable &&
                        Acceptable.map((item, index) => {
                          return (
                            <div key={index}>
                              <div Style="display:flex; margin-left:14rem">
                                <table Style="width:100%">
                                  <td>
                                    <input
                                      Style="width:100%"
                                      type="text"
                                      value={item.condition}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="col-sm-4"
                                      name={item.id}
                                      
                                    />
                                  </td>
                                </table>
                              </div>
                            </div>
                          );
                        })}

                    

                      <div Style="display:flex; margin-left:10rem">
                        <table>
                         
                          {Contract_kpi &&
                            Contract_kpi.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    {" "}
                                    <input
                                      class="col-sm-4"
                                      type="text"
                                      value={item.lbound}
                                    ></input>
                                  </td>

                                  <td>
                                    <input
                                      class="col-sm-4"
                                      type="text"
                                      value={item.ubound}
                                    ></input>
                                  </td>
                                  <td>
                                    <input
                                      class="col-sm-4"
                                      type="text"
                                      name={item.id}
                                      onChange={(e) => {
                                        this.lowerbound(e, index);
                                      }}
                                    ></input>
                                  </td>
                                </tr>
                              );
                            })}
                        </table>
                      </div>
                    </div>
                  )}
                  <div Style="display:flex; margin-left:10rem"></div>
                </tbody>
              </table>
            </div>
    </div>
    </div>
     
</div>







  );

}
export default Rules;
























