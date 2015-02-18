import Ember from 'ember';

var WsRedis = Ember.Component.extend({
    
    opened: false,
    connected: false,
    deferred: null,
    ws: null,
    missed_heartbeats: 0,
    heartbeat_msg: "Checking Connection Status...",
    heartbeat_interval: null,
    timer_interval: 0,
    timer:null,
    uri:'/ws/foobar?subscribe-broadcast&publish-broadcast&echo',
    messages: [], 
    
    isconnected: function() {
        return (this.get('connected')) ? "Connected" : "Disconnected";
    }.property('connected'),
              
    actions: {
        toggleOpened: function() {
             if (this.get('opened'))  { this.set('opened',false); } else { this.set('opened',true); }
        },

        clearMessages: function() {
            //Ember.Logger.info("Clearing all messages");
            this.get('messages').clear();
        },
        
        removeMessage: function(message) {
            //Ember.Logger.info("Removing message");
            this.get('messages').removeObject(message);
        }

    },
    
	init: function() {
		this.connect();
	},
    
	connect: function(uri) {
		try {
			//Ember.Logger.info("Connecting to  %s...", uri);
			this.set('deferred', Ember.$.Deferred());
			
            var ws = new WebSocket('ws://' + window.location.hostname + this.get('uri'));
			ws.onopen = this.on_open;
			ws.onmessage = this.on_message;
			ws.onerror = this.on_error;
			ws.onclose = this.on_close;
            ws.parent = this;
            this.set('ws',ws);
			this.set('timer',null);
		} catch (err) {
			this.get('deferred').reject(new Error(err));
		}
	},

	send_heartbeat: function() {
		//Ember.Logger.info('Send Heartbeat!');
		try {
			this.incrementProperty('missed_heartbeats');
		    //Ember.Logger.info(this.get('missed_heartbeats'));
			if (this.get('missed_heartbeats') > 3) {
				throw new Error("Too many missed heartbeats.");
            }
			this.get('ws').send(this.get('heartbeat_msg'));
		} catch(e) {
			clearInterval();
			this.set('heartbeat_interval',null);
			//Ember.Logger.error("Closing connection. Reason: %s",e.message);
			this.get('ws').close();
		}
	},

	on_open: function() {
		//Ember.Logger.info('Connected!');
		//Ember.Logger.info(this.parent);
        var scope = this.parent;
		this.parent.set('connected',true);
        this.parent.set('timer_interval',500);
		this.parent.get('deferred').resolve();
		if (scope.get('heartbeat_msg') && scope.get('heartbeat_interval') === null) {
			scope.set('missed_heartbeats',0);
            scope.set('heartbeat_interval',setInterval(function() { scope.send_heartbeat(); }, 5000));
		}
	},

	on_close: function() {
		//Ember.Logger.info("Connection closed!");
		this.parent.set('connected',false);
        //Ember.Logger.info(this.parent);
		if (! this.parent.get('timer')) {
			var scope = this.parent;
            // try to reconnect
			this.parent.set('timer',setTimeout(function() {
				scope.connect(scope.get('url'));
			}, this.parent.get('timer_interval')));
			this.parent.set('timer_interval',Math.min(this.parent.get('timer_interval') + 500, 5000));
		}
	},

	on_error: function(evt) {
		//Ember.Logger.error("Websocket connection is broken!");
		//Ember.Logger.info(this.parent);
		this.parent.set('connected',false);
        this.parent.get('deferred').reject(new Error(evt));
	},

	on_message: function(evt) {
		//Ember.Logger.info("INBOUND MESSAGE! %s", evt.data);
		if (this.parent.get('heartbeat_msg') && evt.data === this.parent.get('heartbeat_msg')) {
			// reset the counter for missed heartbeats
			this.parent.set('missed_heartbeats',0);
		} else {
            this.parent.get('messages').addObject(JSON.parse(evt.data));
            //Ember.Logger.info(this.parent.get('messages'));
            //Ember.$("#holder").append('<li>Message from Websocket: ' + evt.data + '</li>');
		}
	},

	send_message: function(message) {
		this.parent.get('ws').send(message);
	}
    
});

export default WsRedis;
