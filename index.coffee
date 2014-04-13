$ ->
  textarea = $ '#hidden_textarea'
  display = $ '#display'
  select = $ '#select_el'
  edit = $ '#edit_button'

  select.append $ "<option value='#{i}'>#{i}</option>" for i in [1..32]

  createLabeller = (word) ->
    el = $ '<a>'
    el.addClass 'wordspan'
    el.text word

    $.ajax
      url: '/search'
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
    display.append createLabeller(word + ' ') for word in textarea.val().split ' '
    display.css 'color', '#000'
  
  editing = false
  edit.on 'click', ->
    if editing
      edit.text 'Edit'
      repopulate()
      display.css 'display', 'block'
      textarea.css 'display', 'none'
    else
      edit.text 'Done'
      display.css 'display', 'none'
      textarea.css 'display', 'block'

    editing = not editing

  select.on 'change', ->
    $.ajax
      url: '/text'
      data:
        chapter: select.val()
      success: (data) ->
        textarea.val data
        repopulate()

  # Start with In Catilinam I, chap 1
  $.ajax
    url: '/text'
    data:
      chapter: 1
    success: (data) ->
      textarea.val data
      repopulate()
