  /*var url = "https://simple-minecraft.firebaseIO.com/userStatus/";
  var myRootRef = new Firebase(url);
  myRootRef.on('value', function(snapshot) {
      data = snapshot.val()
      html = ''
      if (Object.keys(data).length == 1) {
          $('#minecraftpanel').slideUp();
      } else {
          $('#minecraftpanel').slideDown();
          for (user in Object.keys(data)) {
              if (Object.keys(data)[user] !== 'server') {
                  html += Object.keys(data)[user] + ', ';
              }
          }
          html = html.slice(0, -2);
      }
      $('.minecraft').html(html);
  });*/