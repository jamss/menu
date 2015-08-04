/********************
 *   Mobile Menu    *
 ********************/

var MobileMenu = function(menuTriggerID, menuContainerID, menuOpenClass)
{

    /* Elements: Dynamic */
    this.triggerElement = document.getElementById(menuTriggerID);
    this.menuElement = document.getElementById(menuContainerID);

    /* Elements: Static */
    this.closeTriggerElement = document.getElementById('close-menu');
    this.childMenuTriggers = document.getElementsByClassName('child-menu-trigger');
    this.closeMenuTriggers = document.getElementsByClassName('close-menu-trigger');
    this.subMenus = document.getElementsByClassName('sub-menu');

    /* Classes */
    this.menuOpenClass = menuOpenClass !== null ? menuOpenClass : 'menu-open';


    this.resetMenu = function(){

        for (var i = 0; i < this.subMenus.length; i++) {

            var menu = this.subMenus[i];

            if(menu.classList.contains('open')){
                menu.classList.remove('open');
            }

        }
    }

    /*this.createEvents = function(){

        var menuOpenEvent, menuCloseEvent;

        if(document.createEvent){

            menuOpenEvent = document.createEvent('HTMLEvents');
            menuOpenEvent.initEvent('MobileMenuOpen', true, true);

            menuCloseEvent = document.createEvent('HTMLEvents');
            menuCloseEvent.initEvent('MobileMenuClose', true, true);

        }else{

            menuOpenEvent = document.createEventObject();
            menuOpenEvent.eventType = 'MobileMenuOpen';

            menuCloseEvent = document.createEventObject();
            menuCloseEvent.eventType = 'MobileMenuClose';

        }

    }*/

    this.bindEvents = function(){

        if(typeof this.triggerElement === 'undefined'){
            console.log('Bad trigger element');
        }
        if(typeof this.menuElement === 'undefined'){
            console.log('Bad container element');
        }

        var _this = this;

        this.triggerElement.addEventListener('click', function(){

            if(_this.menuElement.classList.contains(_this.menuOpenClass))
            {
                //never executes
                _this.fireEvent('MobileMenuClose');
                _this.menuElement.classList.remove(_this.menuOpenClass);
                _this.resetMenu();
            }else{
                _this.fireEvent('MobileMenuOpen');
                _this.menuElement.classList.add(_this.menuOpenClass);
            }

        });

        this.closeTriggerElement.addEventListener('click', function(){

            _this.fireEvent('MobileMenuClose');

            if(_this.menuElement.classList.contains(_this.menuOpenClass))
            {
                /* todo: why this always executes */
                _this.fireEvent('MobileMenuOpen');
                _this.menuElement.classList.add(_this.menuOpenClass);
            }else{
                //never executes
                _this.menuElement.classList.remove(_this.menuOpenClass);
                _this.resetMenu();
            }

        });

        /* handle sub-menu triggers */
        for (var i = 0; i < this.childMenuTriggers.length; i++) {

            var trigger = this.childMenuTriggers[i];

            trigger.addEventListener('click', function(){

                var parent = this.parentNode;

                for (var i = 0; i < parent.childNodes.length; i++) {

                    var element = parent.childNodes[i];

                    if (element.className == 'sub-menu') {
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

        /*this.childMenuTriggers.forEach(function(trigger) {
         trigger.addEventListener('click', function(){
         alert('triggered');
         });
         });*/

        document.addEventListener('click', function(event){

            if(event.target === _this.closeTriggerElement || event.target !== _this.menuElement && event.target !== _this.triggerElement && !(_this.menuElement.contains(event.target))){
                if(_this.menuElement.classList.contains(_this.menuOpenClass))
                {
                    _this.menuElement.classList.remove(_this.menuOpenClass);
                }
            }

        });

    };

    this.fireEvent = function(eventName){

        console.log('dispatching: ' + 'on' + eventName);

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

}

module.exports = MobileMenu;
