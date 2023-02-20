function initCalendar() {
  // Récupérer l'élément DOM pour le calendrier
  const calendarEl = document.getElementById('calendar');

  // Créer une instance du calendrier FullCalendar
  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    navLinks: true,
    selectable: true,
    selectMirror: true,
    select: function (arg) {
      // Demander à l'utilisateur le nom et le lieu du jeu pour la nouvelle session
      const title = prompt('Nom du jeu :');
      if (title) {
        const location = prompt('Lieu de la session :');
      }
      if (title && location) {
        // Ajouter la nouvelle session au calendrier
        calendar.addEvent({
          title: title + ' (A ' + location + ')',
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
        });
      }
      calendar.unselect();
    },
    eventClick: function (arg) {
      // Demander à l'utilisateur s'il souhaite supprimer la session sélectionnée
      if (confirm('Souhaitez-vous supprimer cette session ?')) {
        arg.event.remove();
      }
    },
    editable: true,
    dayMaxEvents: true,
  });

  // Appeler la fonction lecture_api pour récupérer les données de l'API et les ajouter au calendrier
  lecture_api();

  // Rendre le calendrier dans l'élément DOM correspondant
  calendar.render();
}

initCalendar();