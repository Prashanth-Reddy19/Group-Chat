const groupList=document.getElementById('grouplist');

const groupName=document.getElementById('groupname');

const btn=document.getElementById('btn');



btn.addEventListener('click',creategroup)

async function creategroup(e){
 try{
 e.preventDefault();
    if(groupName.value==='')
    {
        msg.innerHTML="Please Enter Group Name";
        setTimeout(()=>{
            msg.innerHTML="";
        },3000)
    }
    else{
        const groupdetails={
            groupname:groupName.value
        }
        const token=localStorage.getItem('token')
        const response= await axios.post('http://localhost:3000/group/create-group',groupdetails,{headers:{"Authorization":token}})
        showgroup(response.data.message);
        console.log(response);
        groupName.value='';

    }
}
catch(err){
    console.log(err);
    msg.innerHTML="";
    msg.innerHTML=msg.innerHTML+`<div>${err.response.data.message}</div>`;
    setTimeout(()=>{
    msg.innerHTML="";
    },3000)
}
}

async function showgroup(response){
    try{
         

            groupList.innerHTML+=`<li id='${response.id}'><button class='btn' onclick="showchat('${response.groupname}','${response.id}')">${response.groupname}</button></li>`;
    }catch(err){
        throw new Error(err);
    }
}
window.addEventListener('DOMContentLoaded',getgroups);

async function getgroups(){
    try{
             const response= await axios.get(`http://localhost:3000/group/get-allgroups`)

             for(let i=0;i<response.data.message.length;i++)
             {
                showgroup(response.data.message[i]);
             }

       }
       catch(err){
           console.log(err);
           msg.innerHTML="";
         msg.innerHTML=msg.innerHTML+`<div>${err.response.data.message}</div>`;
         setTimeout(()=>{
           msg.innerHTML="";
       },3000)
       }
    }

    async function showchat(groupname,id){
        try{
            localStorage.setItem('groupName',JSON.stringify(groupname));
            localStorage.setItem('groupId',JSON.stringify(id));
            window.location.href='../chat/chat.html';
        }catch(err){
                console.log(err)
        }
    }