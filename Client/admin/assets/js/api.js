const uri = 'https://172.16.14.139:5001/api/TodoItems';

async function lecture_api() {
  try {
    const response = await fetch(uri);
    const data = await response.json();
    ajout_tableau(data);
  } catch (error) {
    console.error('Unable to get items.', error);
  }
}

function ajout_tableau(data) {
  const events = [];

  for (let i = 0; i < data.length; i++) {
    const gameTitle = data[i].titre_jeux_plateaux;
    const gameLocation = data[i].localisation_jeux_plateaux;
    const gameStart = data[i].date_debut_jeux_plateaux;
    const gameEnd = data[i].date_fin_jeux_plateaux;

    const event = {
      title: gameTitle,
      start: gameStart,
      end: gameEnd
    };

    events.push(event);
    console.log(events[0]);
  }

  calendar.events = events;
}