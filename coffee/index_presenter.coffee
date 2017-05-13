class IndexPresenter extends Presenter
    constructor: () ->
        super

    onCreate:() ->
        @imgs = $(".js-places .js-img")
        @height = $(window).height()

        $(window).scroll () => @reveal()

        $(window).resize () =>
            @height = $(window).height()

        @reveal()

    getScroll: () -> $('body').scrollTop()

    isVisible: (e) ->
        extra = @height * .5
        0 - extra <= e.offset().top - @getScroll() <= @height + extra

    isContentSet: (e) -> e.attr('data-js-was-set') is 1

    setContent: (e) ->
        url = e.attr('data-src')
        e.css('background-image', "url(#{url})")
        e.attr('data-js-was-set', 1)

    reveal: () ->
        @imgs.each (i, e) =>
            f = $(e)
            @setContent(f) if @isVisible(f) and !@isContentSet(f)
