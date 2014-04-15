(function() {
  $(function() {
    var chpt, createLabeller, display, edit, editing, i, repopulate, select, textarea, _i;
    textarea = $('#hidden_textarea');
    display = $('#display');
    select = $('#select_el');
    edit = $('#edit_button');
    chpt = $('#chapter_span');
    for (i = _i = 1; _i <= 32; i = ++_i) {
      select.append($("<option value='" + i + "'>Cat I Chpt. " + i + "</option>"));
    }
    createLabeller = function(word) {
      var el;
      el = $('<a>');
      el.addClass('wordspan');
      el.text(word);
      $.ajax({
        url: 'search',
        data: {
          word: word.toLowerCase().replace(/[^\w]/g, '')
        },
        success: function(data) {
          el.attr('title', data);
          return el.tooltipster({
            trigger: 'hover',
            theme: 'tooltipster-noir',
            autoClose: true,
            delay: 0,
            speed: 0,
            animation: 'fade'
          });
        }
      });
      return el;
    };
    repopulate = function() {
      var word, _j, _len, _ref;
      display.html('');
      _ref = textarea.val().split(' ');
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        word = _ref[_j];
        display.append(createLabeller(word + ' '));
      }
      return display.css('color', '#000');
    };
    editing = false;
    edit.on('click', function() {
      $('#title').hide();
      $('#custom').show();
      if (editing) {
        edit.text('Edit');
        repopulate();
        display.css('display', 'block');
        textarea.css('display', 'none');
      } else {
        edit.text('Done');
        display.css('display', 'none');
        textarea.css('display', 'block');
        textarea.focus();
        textarea[0].setSelectionRange(0, textarea.val().length - 1);
      }
      return editing = !editing;
    });
    select.on('change', function() {
      return $.ajax({
        url: 'text',
        data: {
          chapter: select.val()
        },
        success: function(data) {
          $('#custom').hide();
          $('#title').show();
          chpt.text(select.val());
          textarea.val(data);
          return repopulate();
        }
      });
    });
    return $.ajax({
      url: 'text',
      data: {
        chapter: 1
      },
      success: function(data) {
        textarea.val(data);
        return repopulate();
      }
    });
  });

}).call(this);

//# sourceMappingURL=index.js.map
