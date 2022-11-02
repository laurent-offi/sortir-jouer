document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    
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
      var title = prompt('Nom du jeu :');
      var location = prompt('Lieu de la session :');
      calendar.addEvent({
        title: title + " (A " + location + ")",
        start: arg.start,
        end: arg.end,
        allDay: arg.allDay, 
      })
      calendar.unselect()
    },
    
    eventClick: function (arg) {
      if (confirm('Souhaitez-vous supprimer cette session ?')) {
        arg.event.remove()
      }
    },
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      {
        title: 'Long Event',
        start: '2022-11-02',
        end: '2022-11-05'
      },
      {
        title: 'Long Event',
        start: '2022-11-04',
        end: '2022-11-04'
      }
    ]
  });

  calendar.render();
});