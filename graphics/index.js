'use strict';
var RecentFollower = nodecg.Replicant('RecentFollower');
var RecentFollowerPlatform = nodecg.Replicant('RecentFollowerPlatform', {defaultValue: 'beam'});

function setClassVisibility(classname, visible){
    var elements = document.getElementsByClassName(classname);

    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = visible ? 'inline' : 'none';
    }
}

nodecg.listenFor('channel-followed', 'nodecg-beam-service', function(user) {
    RecentFollower.value = user.username;
    RecentFollowerPlatform.value = 'beam';
    
});

nodecg.listenFor('channel-followed', 'nodecg-twitch-service', function(user) {
    RecentFollower.value = user.display_name;
    RecentFollowerPlatform.value = 'twitch';
});

var alertBox = document.getElementById('alert');
alertBox.addEventListener('webkitAnimationEnd', function(){
    this.style.webkitAnimationName = '';
}, false);

RecentFollower.on('change', function(newvalue, oldvalue) {
    alertBox.classList.remove('recentFollowerAnimDownClass');
    document.getElementById("RecentFollowerText").textContent = newvalue;
    setTimeout( () => { alertBox.classList.add('recentFollowerAnimDownClass') }, 50);
});

RecentFollowerPlatform.on('change', (newvalue, oldvalue) => {
    setClassVisibility('beam', newvalue == 'beam');
    setClassVisibility('twitch', newvalue == 'twitch');
});