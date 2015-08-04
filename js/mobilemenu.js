/********************
 *   Mobile Menu    *
 ********************/

var MobileMenu = function(menuTriggerID, menuContainerID, menuOpenClass)
{

    this.triggerElement = document.getElementById(menuTriggerID);
    this.menuElement = document.getElementById(menuContainerID);
    this.menuOpenClass = menuOpenClass !== null ? menuOpenClass : 'menu-open';
    this.closeTriggerElement = document.getElementById('close-menu');

    this.childMenuTriggers = document.getElementsByClassName('child-menu-trigger');
    this.closeMenuTriggers = document.getElementsByClassName('close-menu-trigger');
    this.subMenus = document.getElementsByClassName('sub-menu');

    this.resetMenu = function(){

        for (var i = 0; i < this.subMenus.length; i++) {

            var menu = this.subMenus[i];

            if(menu.classList.contains('open')){
                menu.classList.remove('open');
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

            if(_this.menuElement.classList.contains(_this.menuOpenClass))
            {
                //never executes
                _this.menuElement.classList.remove(_this.menuOpenClass);
                _this.resetMenu();
            }else{
                _this.menuElement.classList.add(_this.menuOpenClass);
            }

        });

        this.closeTriggerElement.addEventListener('click', function(){

            if(_this.menuElement.classList.contains(_this.menuOpenClass))
            {
                /* WHY DOES THIS WORK */
                _this.menuElement.classList.add(_this.menuOpenClass);
                _this.resetMenu();
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

}

module.exports = MobileMenu;