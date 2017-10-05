function Events(target){
  var events = {}, empty = [];
  target = target || this
  /**
   *  Listen to events.
   * @param {string} event - The event's name to listen to.
   * @param {function} callback - The function to execute when the event is triggered.
   * @param {Object} ctx - The value of this provided for the call to the callback function.
   * @param {boolean} [once=false] - The callback will be executed at most once.
   */
  target.on = function(event, callback, ctx, once){
    once = !!once;
    (events[event] = events[event] || []).push([callback, ctx, once])
    return target
  }
  /**
   *  Listen to events once.
   * @param {string} event - The event's name to listen to.
   * @param {function} callback - The function to execute when the event is triggered.
   * @param {Object} ctx - The value of this provided for the call to the callback function.
   */
  target.one = function(event, callback, ctx){
    return target.on(event, callback, ctx, true)
  }
  /**
   *  Stop listening to event.
   * @param {string} event - The event's name to stop listen to.
   * @param {function} [callback] - If provided, stop listening only for this callback.
   */
  target.off = function(event, callback){
    event || (events = {})
    var list = events[event] || empty, i = list.length = callback ? list.length : 0;
    while(i--)
        callback == list[i][0] && list.splice(i,1)
    return target
  }
  /** 
   * Send event, callbacks will be triggered.
   * @param {string} event - The name of the event to trigger.
   */
  target.trigger = function(event){
    var e = events[event] || empty, list = e.length > 0 ? e.slice(0, e.length) : e, i=0, j;
    while(j=list[i++]){
        j[0].apply(j[1], empty.slice.call(arguments, 1));
        if(j[2]) target.off(event, j[0]);
    }
    return target
  };
}
