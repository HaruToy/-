

//스케쥴 저장소에 저장
schedule = []

// Search the bookmarks when entering the search keyword.

  
  // Traverse the bookmark tree, and print the folder and nodes.
  function AddSch(query) {
    $('#schedule').empty();
    $('#schedule').append(dumpTreeNodes());
  }
  
  function dumpTreeNodes() {
    var list = $('<ul>');
    for (var i = 0; i < schedule.length; i++) {
      list.append(dumpNode(schedule[i],i));
    }

    list.append(dumpNewNode());
    return list;
  }

  function dumpNewNode(){
    var span = $('<span>');
    var what=$('<div class = "box_02"><button class = "work_num_01">   +   </button></div>');
    span.append(what);
   
    var edit =  $('<table><tr><td>Name</td><td>' +
    '<input id="title"></td></tr><tr><td>URL</td><td><input id="url">' +
    '</td></tr></table>');
    // Show add and edit links when hover over.

                span.click(function (event) {
                  edit.show();
                  $('#adddialog').empty().append(edit).dialog({
                    autoOpen: false,
                    closeOnEscape: true,
                    title: 'Add New Schedule',
                    modal: true,
                    show: 'slide',
                    position: {
                      my: "left",
                      at: "center",
                      of: event.target.parentElement.parentElement
                    },
                    buttons: {
                      'Add': function () {
                        edit.hide();
                        var obj = new Object();
                        obj.title = $('#title').val();
                        obj.url=$('#url').val();
                        schedule.push(obj);
                        $(this).dialog('destroy');
                        window.AddSch();
                      },
                      'Cancel': function () {
                        edit.hide();
                        $(this).dialog('destroy');
                      }
                    }
                  }).dialog('open');
                });
               // options.fadeIn();

                var li = $('<ul>').append(span);
                return li;
  }


  function dumpNode(sch,idx) {
      var span = $('<span>');
      var what=$('<div class = "box_02"><button id="sch" class = "work_num_01">' +sch.title+ '</button></div>');
      span.append(what);


      var options = 
        $('<button id="editlink">Edit</button> <button id="deletelink">Delete</button>');
          var edit =  $('<table><tr><td>Name</td><td>' +
          '<input id="title1"></td></tr><tr><td>URL</td><td><input id="url1">' +
          '</td></tr></table>');
  
        // Show add and edit links when hover over.
      span.hover(function () {
       span.append(options);
        $('#deletelink').click(function (event) {
          console.log(event)
          $('#deletedialog').empty().dialog({
            autoOpen: false,
            closeOnEscape: true,
            title: 'Confirm Deletion',
            modal: true,
            show: 'slide',
            position: {
              my: "left",
              at: "center",
              of: event.target.parentElement.parentElement
            },
            buttons: {
              'Yes, Delete It!': function () {
                schedule.splice(idx,1);
                span.parent().remove();
                $(this).dialog('destroy');
              },
              Cancel: function () {
                $(this).dialog('destroy');
              }
            }
          }).dialog('open');
        });

        $('#editlink').click(function (event) {
          edit.show();
          //edit.val(anchor.text());
          $('#editdialog').empty().append(edit).dialog({
            autoOpen: false,
            closeOnEscape: true,
            title: 'Edit Title',
            modal: true,
            show: 'fade',
            position: {
              my: "left",
              at: "center",
              of: event.target.parentElement.parentElement
            },
            buttons: {
              'Save': function () {
                edit.hide();
                var obj1 = new Object();
                obj1.title = $('#title1').val();
                obj1.url=$('#url1').val();
                schedule[idx]=obj1;
                console.log(schedule);
                //anchor.text(edit.val());
                options.show();
                
                $(this).dialog('destroy');
                window.AddSch();
              },
              'Cancel': function () {
                edit.hide();
                $(this).dialog('destroy');
              }
            }
          }).dialog('open');
        });
        options.fadeIn();
      },
  
        // unhover
        function () {
          options.remove();
        }).append(span);
    
  
    var li = $( '<ul>' ).append(span);
  
    return li;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    AddSch();
  });
  