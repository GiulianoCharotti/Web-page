
var stadistics= new Vue({
  el:'#stadistics',
  data:{
    numberOfRepublicans:[],
    numberOfDemocrats:[],
    numberOfIndependents:[],
    votesRep:[],
    votesDem:[],
    votesInd:[],
    sumaR:0,
    sumaD:0,
    sumaI:0,
    
    Listafiltrada:[],
      menosfiel:[],
      masfiel:[],
  }
});


function senateDataLoyalty(){
  fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
      method: "GET",
      headers: new Headers({
          "X-API-Key": 'a6fFoRQLsE82UaPudKYlFGnCUyiRTG2aXgR6J2df'
      })
  })
  .then(res=>res.json())
  .then(data =>{
    numberOfMemberPerParty(data.results[0].members);
      stadistics.Listafiltrada=getSortedListByPartyVotesPct(data.results[0].members);
      stadistics.menosfiel = getLoyaltyList (stadistics.Listafiltrada,'least');
      stadistics.masfiel = getLoyaltyList (stadistics.Listafiltrada,'most');
  })
}


function houseDataLoyalty(){
  fetch('https://api.propublica.org/congress/v1/116/house/members.json', {
      method: "GET",
      headers: new Headers({
          "X-API-Key": 'a6fFoRQLsE82UaPudKYlFGnCUyiRTG2aXgR6J2df'
      })
  })
  .then(res=>res.json())
  .then(data =>{
    numberOfMemberPerParty(data.results[0].members);

      stadistics.Listafiltrada=getSortedListByPartyVotesPct(data.results[0].members);
      stadistics.menosfiel = getLoyaltyList (stadistics.Listafiltrada,'least');
      stadistics.masfiel = getLoyaltyList (stadistics.Listafiltrada,'most');

  })
}

function numberOfMemberPerParty(stats){
  for (var i =0; i<stats.length;i++){
      switch (true)
      {
        case stats[i].party=="R":
          stadistics.numberOfRepublicans.push(stats);
          stadistics.votesRep.push(stats[i].votes_with_party_pct);
          stadistics.sumaR+=(stats[i].votes_with_party_pct|| 0);
          console.log(stadistics.sumaR)

          break;
        case stats[i].party=="D":
          stadistics.numberOfDemocrats.push(stats);
          stadistics.votesDem.push(stats[i].votes_with_party_pct);
          stadistics.sumaD+=(stats[i].votes_with_party_pct|| 0);
          break;
        default: 
          stadistics.numberOfIndependents.push(stats);
          stadistics.votesInd.push(stats[i].votes_with_party_pct);
          stadistics.sumaI+=(stats[i].votes_with_party_pct|| 0);
          break;
      }
  }
}



const getSortedListByPartyVotesPct = function(list) {
  list.sort((a, b) => {
      return a.votes_with_party_pct - b.votes_with_party_pct;
  });
  let listFiltered = list.filter(member => {
      // return member.total_votes != 0;
      return member.total_votes || 0;

  });
  return listFiltered;
};

const getLoyaltyList = function(sortedList, limit) {
  const lowTenPctMemberList = 10 * sortedList.length / 100;
  const highTenPctMemberList = sortedList.length - lowTenPctMemberList;
  let loyaltyList;
  switch (limit) {
      case 'least':
          loyaltyList = sortedList.filter((_member, index) => {
              return index < (lowTenPctMemberList - 1);
          });
          break;
      case 'most':
          loyaltyList = sortedList.filter((_member, index) => {
              return index > highTenPctMemberList;
          }).reverse();
          break;
  };
  return loyaltyList;
};
