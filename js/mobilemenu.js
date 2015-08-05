/********************
 *   Mobile Menu    *
 ********************/

var MobileMenu = function(settings)
{

    this.settings = {
        menuTriggerID: 'mobile-trigger',
        menuContainerID: 'mobile-menu',
        menuOpenClass: 'menu-open',
        closeMenuId: 'close-menu',
        childMenuTriggerClass: 'child-menu-trigger',
        childMenuCloseClass: 'close-menu-trigger',
        subMenuClass: 'sub-menu',
        subMenuOpenClass: 'open',
        doPagePush: false,
        pageWrapperId: 'page-wrapper',
        pagePushClass: 'page-push',
        openMenuEvent: 'MobileMenuOpen',
        closeMenuEvent: 'MobileMenuClose'
    }

    if(settings){
        for(var key in settings){
            this.settings[key] = settings[key];
        }
    }

    this.triggerElement = document.getElementById(this.settings.menuTriggerID);
    this.menuElement = document.getElementById(this.settings.menuContainerID);
    this.closeMenuTriggerElement = document.getElementById(this.settings.closeMenuId);
    this.childMenuTriggers = document.getElementsByClassName(this.settings.childMenuTriggerClass);
    this.closeMenuTriggers = document.getElementsByClassName(this.settings.childMenuCloseClass);
    this.subMenus = document.getElementsByClassName(this.settings.subMenuClass);

    this.resetMenu = function(){

        for (var i = 0; i < this.subMenus.length; i++) {

            var menu = this.subMenus[i];

            if(menu.classList.contains(this.settings.subMenuOpenClass)){
                menu.classList.remove(this.settings.subMenuOpenClass);
            }

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

        this.triggerElement.addEventListener('click', function(){

            if(_this.menuElement.classList.contains(_this.settings.menuOpenClass)){
                //never executes
                _this._fireEvent(_this.settings.closeMenuEvent);
                _this.menuElement.classList.remove(_this.settings.menuOpenClass);
                _this.resetMenu();
            }else{
                _this._fireEvent(_this.settings.openMenuEvent);
                _this.menuElement.classList.add(_this.settings.menuOpenClass);
            }

        });

        this.closeMenuTriggerElement.addEventListener('click', function(){

            if(_this.menuElement.classList.contains(_this.settings.menuOpenClass)) {
                _this._fireEvent(_this.settings.closeMenuEvent);
                _this.menuElement.classList.remove(_this.settings.menuOpenClass);
                _this.resetMenu();
            }else{
                _this._fireEvent(_this.settings.openMenuEvent);
                _this.menuElement.classList.add(_this.settings.menuOpenClass);
            }

        });

        /* handle sub-menu triggers */
        for (var i = 0; i < this.childMenuTriggers.length; i++) {

            var trigger = this.childMenuTriggers[i];

            trigger.addEventListener('click', function(){

                var parent = this.parentNode;

                for (var i = 0; i < parent.childNodes.length; i++) {

                    var element = parent.childNodes[i];

                    if (element.className == _this.settings.subMenuClass) {
                        element.classList.add('open');
                    }
                }

            });
        }
        /* /handle sub-menu triggers */

        /* handle sub-menu triggers */
        for (var i = 0; i < this.closeMenuTriggers.length; i++) {

            var trigger = this.closeMenuTriggers[i];

            trigger.addEventListener('click', function(){
                var parent = this.parentNode.parentNode;
                parent.classList.remove('open');
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

       if(this.settings.doPagePush){
           this._bindPagePushEvents();
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

    this._bindPagePushEvents = function(){

        var pageWrapper = document.getElementById(this.settings.pageWrapperId);
        var _this = this;

        document.addEventListener('MobileMenuOpen', function(){
            if(!pageWrapper.classList.contains(_this.settings.pagePushClass)){
                pageWrapper.classList.add(_this.settings.pagePushClass);
            }
        });

        document.addEventListener('MobileMenuClose', function(){
            if(pageWrapper.classList.contains(_this.settings.pagePushClass)){
                pageWrapper.classList.remove(_this.settings.pagePushClass);
            }
        });

    }

}

module.exports = MobileMenu;
