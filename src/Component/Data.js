import React, { useEffect, useState } from 'react'


const Data = () => {
  const info={
    userId:'',
    title:'',
    body:''
  }
  //for fetching data-----get operation
    const [value,setValue]=useState([])
    //for put operation
    const [value1,setValue1]=useState(info)
    //for chaning btn from submit to update when edit btn is clicked
    const[btn,setBtn]=useState(false)
  
    const [editindex, setEditindex] = useState('');
useEffect(()=>{
      const fetchdata=async ()=>{
       
          try{
      const response=await fetch('https://jsonplaceholder.typicode.com/posts'
      )
      const data=await response.json()
     
      
      setValue(data)

      }
      catch(error){
               console.error('opps something is wrong',error)
            }}
            fetchdata()
    },[])
    const handleSubmit=async(e)=>{
    
      e.preventDefault()
   
        fetch('https://jsonplaceholder.typicode.com/posts',{
          method:'POST',
          body:JSON.stringify(
            {
              userId:value1.userId,
             
              title:value1.title,
              body:value1.body
            }
          ),
          headers:{
            'Content-type':'application/json'
          }
        }
        ).then((res)=>res.json())
        .then((result)=>{
          if (editindex !== '') {
            // Update existing entry
            setValue(value.map((ele, index) => (index === editindex ? value1 : ele)));
            setBtn(false);
            setEditindex('');
          } 
          else{
            
            setValue([...value,value1])
            console.log(...value,value1)
          }
        })

   
       
        //code in case of clicking update btn
        
        .catch((error1)=>
        console.error('opps something is wrong here',error1)
      )
    }
              

        const updatadata=(i)=>{
          const tempdata=value[i]
         
          setValue1(tempdata)
          setBtn(true)
          setEditindex(i)}

          const handledelete=(i)=>{
            const filterdata=value.filter((ele,index)=>index!==i)
        
            setValue(filterdata)
           }
               
    
   
  return (
    <div>
      <button>Add data</button>
     <form onSubmit={handleSubmit}>
      UserId:<input type='number' value={value1.userId} onChange={(e)=>{setValue1({...value1,userId:e.target.value})}}/>
      
      Title:<input type='text'value={value1.title} onChange={(e)=>{setValue1({...value1,title:e.target.value})}} />
      Body:<input type='text'value={value1.body} onChange={(e)=>{setValue1({...value1,body:e.target.value})}}/>
      <button type='submit'>{btn?'Update':'Submit'}</button>
     </form>
      <table>
        <thead>
            <tr>
                <th>UserId</th>
                
                <th>Title</th>
                <th>Body</th>
            </tr>
        </thead>
        <tbody>
                {value.map((ele,index)=>{
                  return(
                    <tr key={index}>
                    <td>{ele.userId}</td>
                   
                    <td>{ele.title}</td>
                    <td>{ele.body}</td>
                    <td><button onClick={()=>{updatadata(index)}}>Edit</button></td>
                    <td><button onClick={()=>{handledelete(index)}}>Delete</button></td>

                    </tr>)
                })}
            
        </tbody>
      </table>
    </div>
  )
}

export default Data




