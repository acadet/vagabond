class IndexPresenter extends RxPresenter
    constructor: () ->
        super

    onCreate:() ->
        super
        @imgListWidget = new ImageListWidget($(".js-places .js-img"))
        @imgListWidget.onCreate()

    onDestroy: () ->
        super
        @imgListWidget.onDestroy()
