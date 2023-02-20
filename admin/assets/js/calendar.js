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
      if(title) {
        var location = prompt('Lieu de la session :');
      }
      if(title && location) {
        calendar.addEvent({
          title: title + " (A " + location + ")",
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay, 
        })
      }
      calendar.unselect()
    },
    
    eventClick: function (arg) {
      if (confirm('Souhaitez-vous supprimer cette session ?')) {
        arg.event.remove()
      }
    },
    editable: true,
    dayMaxEvents: true,

    
  });

  lecture_api();

  calendar.render();

});