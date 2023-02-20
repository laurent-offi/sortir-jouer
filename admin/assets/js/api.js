const uri = 'https://172.16.14.139:5001/api/TodoItems';


function lecture_api() 
{

  let a= fetch(uri)
    .then(response => response.json())
    .then(data => ajout_tableau(data))
    .catch(error => console.error('Unable to get items.', error));
}

function ajout_tableau(data) {

  calendar.events = new Array(data.length)
  
    let i=0

    for(i=0; i < data.length; i++)
    {
      let game_title = data[i].titre_jeux_plateaux;

      let game_localisation = data[i].localisation_jeux_plateaux;
      
      let game_start = data[i].date_debut_jeux_plateaux;

      let game_end = data[i].date_fin_jeux_plateaux;

      var obj = new Object();
      obj.title = game_title;
      obj.start  = game_start;
      obj.end = game_end;
      var jsonString= JSON.stringify(obj);

      calendar.events[i]=jsonString

      console.log(calendar.events[0]) 

    }
}