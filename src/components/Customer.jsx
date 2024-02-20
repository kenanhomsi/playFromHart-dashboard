import { useEffect,useState } from "react";
import axios from 'axios'
const Customer = () => {
    const [allRequests,setallRequests]=useState();
    const [selectedReqForupdata,setselectedReqForupdata]=useState();
    const [selectedDate,setselectedDate]=useState();

    // const [selectedDateDelete,setselectedDateDelete]=useState();
    const [selectedReqForDel,setselectedReqForDel]=useState();
    const [finalUpdateState,setfinalUpdateState]=useState('off');

    if(selectedReqForupdata){
        allRequests.map((ele)=>{
            if(ele._id ==selectedReqForupdata){
                setselectedDate(ele);
            }
        })
        console.log(selectedDate);
        setselectedReqForupdata('');
    }
    // if(selectedReqForDel){
    //     allRequests.map((ele)=>{
    //         if(ele._id ==selectedReqForDel){
    //             setselectedDateDelete(ele);
    //         }
    //     })
    //     console.log(selectedDateDelete);
    //     setselectedDateDelete('');
    // }

    if(finalUpdateState==='on'){
        let selectedValue=document.querySelector('#upDateSelect').value;

        console.log(selectedValue);
        console.log(selectedDate._id);

        try{
          const response=  axios.patch(`https://www.playwith5.com/el3b-server/api/v1/Customer/?name="${selectedDate._id}"`, {
            OrderStatus:selectedValue
          } ).then((res)=>{
            window.alert('done');
          })
        }
        catch(err){
          console.log(err)
    
        }
        setfinalUpdateState('off');
      }
    
      if(selectedReqForDel){

        console.log(selectedReqForDel);
        try{
          const response=  axios.delete(`https://www.playwith5.com/el3b-server/api/v1/Customer/?name="${selectedReqForDel}"`).then((res)=>{
            window.alert('done');
          })
        }
        catch(err){
          console.log(err)
    
        }
        setselectedReqForDel('');
      }


    useEffect(()=>{
        axios.get(`https://www.playwith5.com/el3b-server/api/v1/Customer/`).then((res)=>{
            setallRequests(res.data);
            console.log(res.data)
            return res
        }).catch(err=>console.log(err));
    
  },[])
  return (
    <div className="Customer_container">
        <div className="showAllRequests">
            <h2>all requests :</h2>
          
            <div className="request-list">
                    {
                        allRequests &&
                        allRequests.map((ele,index)=>{
                           return( 
                            <div key={ele._id}>
                            <h3>order number {index +1}</h3>
                            <h2 >name: {ele.FullName}</h2>
                            <p>phoneNumebr : {ele.phoneNumebr}</p>
                            <p>zipCode : {ele.zipCode}</p>
                            <p>OrderStatus : {ele.OrderStatus}</p>
                            <div><button value={ele._id} onClick={(event)=>setselectedReqForupdata(event.target.value)} >edit</button><button value={ele._id} onClick={(event)=>setselectedReqForDel(event.target.value)}>delete</button></div>

                            </div>
                           )
                        })
                    }
            </div>
        </div>
        <div>
            { selectedDate && 
            <div className="reqUpdate">
                <h2>for update :</h2>
                <div><span>Full name :</span> {selectedDate.FullName}</div>
                <div><span>phoneNumebr :</span> {selectedDate.phoneNumebr}</div>
                <div><span>zipCode :</span> {selectedDate.zipCode}</div>
                <div><span>OrderStatus :</span> {selectedDate.OrderStatus}</div>
                <select name="" id="upDateSelect">
                    <option value="قيد الانتظار" selected>قيد الانتظار</option>
                    <option value="تم بنجاح">تم بنجاح</option>
                </select>
                <button onClick={()=>setfinalUpdateState('on')}>done</button>
            </div>
            }
        </div>
    </div>
  )
}

export default Customer