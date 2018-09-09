class ImageListWidget
    constructor: (images) ->
        @imgs = images
        @binder = new Binder()

    onCreate: () ->
        @binder.bindAction(
            Rx.Observable
                .fromEvent($(window), 'resize')
                .map(() => $(window).height())
                .startWith($(window).height()),
            (h) => @height = h
        )

        @binder.bindAction(
            Rx.Observable
                .fromEvent($(window), 'scroll mousewheel')
                .map(() => Unit.create())
                .startWith(Unit.create()),
            () => @reveal()
        )

    onDestroy: () ->
        @binder.detach()

    getScroll: () -> document.documentElement.scrollTop || document.body.scrollTop

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
