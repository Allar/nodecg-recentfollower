'use strict';


var RecentFollower = nodecg.Replicant('RecentFollower');

nodecg.listenFor('channel-followed', 'nodecg-beam-service', function(user) {
    RecentFollower.value = user.username;
});

var alertBox = document.getElementById('alert');
alertBox.addEventListener('webkitAnimationEnd', function(){
    this.style.webkitAnimationName = '';
}, false);

RecentFollower.on('change', function(newvalue, oldvalue) {
    alertBox.classList.remove('recentFollowerAnimDownClass');
    document.getElementById("RecentFollower").firstElementChild.textContent = newvalue;
    setTimeout( () => { alertBox.classList.add('recentFollowerAnimDownClass') }, 50);
});