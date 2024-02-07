
window.onload = () =>{
    tableAdd();

};

let users=[];
let editId = null;
let url=`https://65ae12861dfbae409a73dcb5.mockapi.io/student`;

async function tableAdd(){
    try{
    const response = await fetch(url,{method:"GET",headers:{"Content-Type":"application/json"},});
    const data = await response.json();
    console.log(data);
    users = data;
        let tableRows="";
        users.map((res,i)=>(tableRows += `<tr>
        <td class="tableBg">${res.name}</td>
        <td class="tableBg">${res.email}</td>
        <td class="tableBg">${res.dob}</td>
        <td class="tableBg">${res.gender}</td>
        <td class="tableBg">${res.phoneNumber}</td>
        <td class="tableBg">${res.password}</td>
        <td class="tableBg">${res.confirmPass}</td>
        <td class="tableBg">${res.language}</td>
        <td class="tableBg">${res.checkbox}</td>
        <td class="tableBg"> <button class="btn btn-sm btn-warning" onclick=editForm(${users[i].id})>Edit</button> <button class="btn btn-sm btn-danger" onclick=deleteForm(${users[i].id})>Delete</button></td>
        <tr>`));
        console.log(tableRows);
        document.getElementById("tbData").innerHTML = tableRows;
        
}
    catch(errMsg)
    {
        console.log(errMsg);
    };
   
}


function button(){
    window.location.href="index.html";
}
function deleteForm(id){
    fetch(url+"/"+id,{method:"DELETE",headers:{"Content-Type":"application/json"},})
    .then(response=>response.json())
    .then((data)=>{console.log(data)
    tableAdd()}
    )
    .catch((error)=>console.log(error));
}
function editForm(id){
    editId=id;
    console.log(id);
    window.location.href="index.html?id="+id;

}



