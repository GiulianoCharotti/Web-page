var congressSenators = new Vue({  
    el: '#congressSenatorsID',  
    data: {
        members:[]
    }
  }); 
  function senateData(){
    fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
        method: "GET",
        headers: new Headers({
            "X-API-Key": 'a6fFoRQLsE82UaPudKYlFGnCUyiRTG2aXgR6J2df'
        })
    })
    .then(res=>res.json()) //trae a la "respuesta" en formato json
    .then(data =>{
        congressSenators.members = data.results[0].members;
    })
}

function houseData(){
    fetch('https://api.propublica.org/congress/v1/116/house/members.json', {
        method: "GET",
        headers: new Headers({
            "X-API-Key": 'a6fFoRQLsE82UaPudKYlFGnCUyiRTG2aXgR6J2df'
        })
    })
    .then(res=>res.json()) //trae a la "respuesta" en formato json
    .then(data =>{
        congressSenators.members = data.results[0].members;
    })
}
