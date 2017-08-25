(function(){
    var EventUtil = {
        getEvent:function(event){
            return event?event:window.event;
        },
        getTarget:function(event){
            return event.target?event.target:event.srcElement;
        },
        stopPropagation:function(event){
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        },
        preventDefault:function(event){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        bind:function(element,event,handler){
            if(element.addEventListener){
                element.addEventListener(event,handler,false);
            }else if(element.attachEvent){
                element.attachEvent('on'+event,handler);
            }else{
                element['on'+event] = handler;
            }
        },
        remove:function(element,event,handler){
            if(element.removeEventListener){
                element.removeEventListener(event,handler,false);
            }else if(element.detachEvent){
                element.detachEvent('on'+event,handler);
            }else{
                element['on'+event] = null;
            }
        }
    }
    var Dialog = function(options){
        var default_options = {
            title:'dialog',
            content:'hello,world',
            footer:'OK'
        };
        var self = this;
        self.ops = extend(default_options,options);

        //初始化模态框实例
        var htmlStr = '<div class="dialog-container"><div class="dialog-header">'+self.ops.title+'</div><div class="dialog-content">'+self.ops.content+
            '</div><div class="dialog-footer"><a>'+self.ops.footer+'</a></div></div>';
        var dialog = document.createElement("div");
        dialog.setAttribute("class","dialog");
        dialog.innerHTML = htmlStr;
        self.dialog = dialog;
        var closeButton = self.dialog.getElementsByClassName("dialog-footer")[0].getElementsByTagName("a")[0];
        EventUtil.bind(closeButton,"click",function(){
            self.close();
        })
    }
    Dialog.prototype.open = function(){
        this.dialog.className += " open";
        document.body.appendChild(this.dialog);
    };

    Dialog.prototype.close = function(){
        this.dialog.className = this.dialog.className.replace(/(\s|^)open(\s|$)/,"");
    };

    EventUtil.bind(document.body,"click",function(e){
        var event = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(event);
        if(target.dataset.modal == 'modal'){
            var options = {
                title:target.dataset['modalTitle'],
                content: target.dataset['modalContent'],
                footer: target.dataset['modalFooter']
            };
            var modal =  new Dialog(options);
            modal.open();
        }

    });
    var Modal = function(options){
        return new Dialog(options);
    };


    function extend(target,src){
        var res = {};
        for(var prop in target) {
            if (target.hasOwnProperty(prop)) {
                res[prop] = target[prop];
            }
        }
        for(var prop in src) {
            if (src.hasOwnProperty(prop) && src[prop] !== undefined) {
                res[prop] = src[prop];
            }
        }
        return res;
    }
    if(typeof define == 'function'){
        define(function(){
            return Modal;
        });
    }else if(typeof exports !== "undefined"){
        module.exports = Modal;
    }else{
        this.Modal = Modal;
    }
})();