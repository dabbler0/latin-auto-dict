# Copyright (c) 2014 Anthony Bau
# MIT License

$ ->
  textarea = $ '#hidden_textarea'
  display = $ '#display'
  select = $ '#select'
  catilineSelect = $ '#cat_wrap'
  vergilStartChapter = $ '#vergil_start_chapter'
  vergilEndChapter = $ '#vergil_end_chapter'
  catWrap = $ '#cat_wrap'
  verWrap = $ '#ver_wrap'
  edit = $ '#edit_button'
  chpt = $ '#chapter_span'

  wrappers = [catWrap, verWrap]

  catWrap.append $ "<option value='#{i}'>#{i}</option>" for i in [1..32]

  createSpan = (word) ->
    el = $ '<span>'
    el.text word
    return el

  createLabeller = (word) ->
    el = $ '<a>'
    el.addClass 'wordspan'
    el.text word

    $.ajax
      url: 'search'
      data:
        word: word.toLowerCase().replace /[^\w]/g, ''
      success: (data) ->

        el.attr 'title', data

        el.tooltipster {
          trigger: 'hover'
          theme: 'tooltipster-noir'
          autoClose: true
          delay: 0
          speed: 0
          animation: 'fade'
        }

    return el

  repopulate = ->
    display.html ''
    for word in textarea.val().split /\b/
      if word.match(/^\w*$/)?
        display.append createLabeller(word)
      else
        display.append createSpan(word)
    display.css 'color', '#000'

  editing = false
  edit.on 'click', ->
    $('#title').hide()
    $('#custom').show()

    if editing
      edit.text 'Edit'
      repopulate()
      display.css 'display', 'block'
      textarea.css 'display', 'none'

    else
      edit.text 'Done'
      display.css 'display', 'none'
      textarea.css 'display', 'block'
      textarea.focus()

      textarea[0].setSelectionRange 0, textarea.val().length - 1

    editing = not editing

  textName = null

  select.on 'change', ->
    for wrapper in wrappers
      wrapper.hide()
    switch select.val()
      when 'catiline'
        catWrap.show()
      when 'vergil'
        verWrap.show()

  catilineSelect.on 'change', ->
    $.ajax
      url: 'text'
      data:
        book: 'catiline'
        chapter: Number catilineSelect.val()
      success: (data) ->
        $('#custom').hide()
        $('#title').show()
        chpt.text select.val()
        textarea.val data
        repopulate()

  vergilChange = ->
    console.log vergilStartChapter.val(), vergilEndChapter.val()
    $.ajax
      url: 'text'
      data:
        book: 'vergil'
        start: Number vergilStartChapter.val()
        end: Number vergilEndChapter.val()
      success: (data) ->
        $('#custom').hide()
        $('#title').show()
        chpt.text select.val()
        textarea.val data
        repopulate()

  #vergilStartChapter.on 'change', vergilChange
  #vergilEndChapter.on 'change', vergilChange
  $('#vergil_go').on 'click', vergilChange

  # Start with In Catilinam I, chap 1
  $.ajax
    url: 'text'
    data:
      book: 'catiline'
      chapter: 1
    success: (data) ->
      textarea.val data
      repopulate()
