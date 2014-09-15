(function() {
  $(function() {
    var catWrap, catilineSelect, chpt, createLabeller, display, edit, editing, i, repopulate, select, textName, textarea, verWrap, vergilChange, vergilEndChapter, vergilStartChapter, wrappers, _i;
    textarea = $('#hidden_textarea');
    display = $('#display');
    select = $('#select');
    catilineSelect = $('#cat_wrap');
    vergilStartChapter = $('#vergil_start_chapter');
    vergilEndChapter = $('#vergil_end_chapter');
    catWrap = $('#cat_wrap');
    verWrap = $('#ver_wrap');
    edit = $('#edit_button');
    chpt = $('#chapter_span');
    wrappers = [catWrap, verWrap];
    for (i = _i = 1; _i <= 32; i = ++_i) {
      catWrap.append($("<option value='" + i + "'>" + i + "</option>"));
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
      _ref = textarea.val().replace(/\n/g, '\n ').split(' ');
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
    textName = null;
    select.on('change', function() {
      var wrapper, _j, _len;
      for (_j = 0, _len = wrappers.length; _j < _len; _j++) {
        wrapper = wrappers[_j];
        wrapper.hide();
      }
      switch (select.val()) {
        case 'catiline':
          return catWrap.show();
        case 'vergil':
          return verWrap.show();
      }
    });
    catilineSelect.on('change', function() {
      return $.ajax({
        url: 'text',
        data: {
          book: 'catiline',
          chapter: Number(catilineSelect.val())
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
    vergilChange = function() {
      console.log(vergilStartChapter.val(), vergilEndChapter.val());
      return $.ajax({
        url: 'text',
        data: {
          book: 'vergil',
          start: Number(vergilStartChapter.val()),
          end: Number(vergilEndChapter.val())
        },
        success: function(data) {
          $('#custom').hide();
          $('#title').show();
          chpt.text(select.val());
          textarea.val(data);
          return repopulate();
        }
      });
    };
    $('#vergil_go').on('click', vergilChange);
    return $.ajax({
      url: 'text',
      data: {
        book: 'catiline',
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
