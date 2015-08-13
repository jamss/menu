var Hammer = require('./lib/Hammer');

/********************
 *   Mobile Menu    *
 ********************/

var MobileMenu = function(settings)
{

    /* Default settings */
    this.settings = {
        menuTriggerID: 'mobile-trigger',
        menuTriggerClass: 'mobile-trigger',
        menuContainerID: 'mobile-menu',
        menuOpenClass: 'menu-open',
        closeMenuID: 'close-menu',
        closeMenuClass: 'close-menu',
        childMenuTriggerClass: 'child-menu-trigger',
        childMenuCloseClass: 'close-menu-trigger',
        subMenuClass: 'sub-menu',
        subMenuOpenClass: 'open',
        doPagePush: false,
        pageWrapperID: 'page-wrapper',
        pagePushClass: 'page-push',
        openMenuEvent: 'MobileMenuOpen',
        closeMenuEvent: 'MobileMenuClose',
        swipeHandlers: true,
        bindCustomHandlers: false,
        retainMenuState: false
    }

    /* Overwrite all settings passed into constructor */
    if(settings){
        for(var key in settings){
            this.settings[key] = settings[key];
        }
    }

    /* Elements */
    this.menuElement = document.getElementById(this.settings.menuContainerID);

    this.triggerElement = document.getElementById(this.settings.menuTriggerID);
    this.closeMenuTriggerElement = document.getElementById(this.settings.closeMenuID);

    this.triggerElements = document.getElementsByClassName(this.settings.menuTriggerClass);
    this.closeMenuTriggerElements = document.getElementsByClassName(this.settings.closeMenuClass);

    this.childMenuTriggers = document.getElementsByClassName(this.settings.childMenuTriggerClass);
    this.closeMenuTriggers = document.getElementsByClassName(this.settings.childMenuCloseClass);

    this.subMenus = document.getElementsByClassName(this.settings.subMenuClass);

    if(this.settings.doPagePush){
        this.pageWrapper = document.getElementById(this.settings.pageWrapperID);
    }

    /* Returns menu to default state on close */
    this.resetMenu = function(){

        for (var i = 0; i < this.subMenus.length; i++) {

            var menu = this.subMenus[i];

            if(menu.classList.contains(this.settings.subMenuOpenClass)){
                menu.classList.remove(this.settings.subMenuOpenClass);
            }

        }
    }
    
    this.toggleMenu = function(){
        if(this.menuElement.classList.contains(this.settings.menuOpenClass)){
            this._fireEvent(this.settings.closeMenuEvent);
        }else{
            this._fireEvent(this.settings.openMenuEvent);
        }
    }

    this.bindEvents = function(){

        if(typeof this.triggerElement === 'undefined'){
            console.log('Bad trigger element');
        }
        if(typeof this.menuElement === 'undefined'){
            console.log('Bad container element');
        }

        var _this = this;

        var toggleMenu = function(){
            _this.toggleMenu();
        };

        if(this.triggerElement){
            this.triggerElement.addEventListener('click', toggleMenu);
        }

        if(this.closeMenuTriggerElement){
            this.closeMenuTriggerElement.addEventListener('click', toggleMenu);
        }

        if(this.triggerElements.length > 0){
            for (var i = 0; i < this.triggerElements.length; i++) {
                this.triggerElements[i].addEventListener('click', toggleMenu);
            }
        }

        if(this.closeMenuTriggerElements.length > 0){
            for (var i = 0; i < this.closeMenuTriggerElements.length; i++) {
                this.closeMenuTriggerElements[i].addEventListener('click', toggleMenu);
            }
        }

        /* handle sub-menu triggers */
        for (var i = 0; i < this.childMenuTriggers.length; i++) {

            var trigger = this.childMenuTriggers[i];

            trigger.addEventListener('click', function(){

                var parent = this.parentNode;

                for (var i = 0; i < parent.childNodes.length; i++) {

                    var element = parent.childNodes[i];

                    if (element.className == _this.settings.subMenuClass) {
                        element.classList.add(_this.settings.subMenuOpenClass);
                    }
                }

            });
        }
        /* /handle sub-menu triggers */

        /* handle sub-menu triggers */
        for (var i = 0; i < this.closeMenuTriggers.length; i++) {

            var trigger = this.closeMenuTriggers[i];

            trigger.addEventListener('click', function(){

                var element = this;
                var parent = false;

                while ((element = element.parentNode) && !element.classList.contains(_this.settings.subMenuClass)){
                    parent = element;
                }

                if(parent){
                    parent.classList.remove(_this.settings.subMenuOpenClass);
                }
            });
        }
        /* /handle sub-menu triggers */


        document.addEventListener('click', function(event){

            if(event.target === _this.closeMenuTriggerElement || event.target !== _this.menuElement && event.target !== _this.triggerElement && !(_this.menuElement.contains(event.target))){
                if(_this.menuElement.classList.contains(_this.settings.menuOpenClass))
                {
                    _this._fireEvent(_this.settings.closeMenuEvent);
                    _this.menuElement.classList.remove(_this.settings.menuOpenClass);
                }
            }

        });

        if(!this.settings.bindCustomHandlers){
            this._bindListeners();
        }

        if(this.settings.swipeHandlers){
            this._bindSwipeEvents();
        }
    };

    this._fireEvent = function(eventName){

        var event;

        if(document.createEvent){
            event = document.createEvent('HTMLEvents');
            event.initEvent(eventName, true, true);
            document.dispatchEvent(event);
        }else{
            event = document.createEventObject();
            event.eventType = eventName;
            document.fireEvent('on' + event.eventType, event);
        }

    }

    this._bindListeners = function(){

        var _this = this;

        document.addEventListener(_this.settings.openMenuEvent, function(){

            _this.menuElement.classList.add(_this.settings.menuOpenClass);

            if(_this.settings.doPagePush){
                if(!_this.pageWrapper.classList.contains(_this.settings.pagePushClass)){
                    _this.pageWrapper.classList.add(_this.settings.pagePushClass);
                }
            }

        });

        document.addEventListener(_this.settings.closeMenuEvent, function(){

            _this.menuElement.classList.remove(_this.settings.menuOpenClass);

            if(!_this.settings.retainMenuState){
                _this.resetMenu();
            }

            if(_this.settings.doPagePush){
                if(_this.pageWrapper.classList.contains(_this.settings.pagePushClass)){
                    _this.pageWrapper.classList.remove(_this.settings.pagePushClass);
                }
            }

        });

    }

    this._bindSwipeEvents = function(){

        var menu = this;

        if(this.menuElement){

            var menuHammer = new Hammer(this.menuElement);

            menuHammer.get('pan').set({
                direction: Hammer.DIRECTION_HORIZONTAL,
                threshold: 80
            });

            menuHammer.on('panleft', function(ev){
                menu._fireEvent(menu.settings.closeMenuEvent);
            });

        }

        if(this.pageWrapper){

            var wrapperHammer = new Hammer(this.pageWrapper);

            wrapperHammer.get('pan').set({
                direction: Hammer.DIRECTION_HORIZONTAL,
                threshold: 80
            });


            wrapperHammer.on('panright', function(ev){
                menu._fireEvent(menu.settings.openMenuEvent);
            });

        }

    }

}

module.exports = MobileMenu;
