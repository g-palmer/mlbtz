debug('Running');

const forEach = Array.prototype.forEach;

let updated = false;
let timer = null;

setTimeout(function() {
    if (timer) { clearTimeout(timer); }
}, 1000 * 60);

window.onload = checkAndUpdateTimes;

function checkAndUpdateTimes() {
    const timeNodes = document.querySelectorAll('.time');

    if (!timeNodes.length) {
        debug(`No times found, will try again`);
        timer = setTimeout(checkAndUpdateTimes, 10);
        return;
    }

    updated = true;
    timer = null;
    debug(`Found ${timeNodes.length} time nodes`);

    forEach.call(timeNodes, (node) => {
        if (/^\d{1,2}:\d{2} (A|P)M/.test(node.innerHTML)) {
            const setTime = node.innerHTML;
            debug(`Time node set to time: ${setTime}`);
            const times = setTime.match(/^(\d+):(\d+) ([AP]M)/);
            const hour = times[1];
            const min = times[2];
            let suffix = times[3];
            let pacificTimeHour = Number(hour) - 3;
            if (pacificTimeHour <= 0) {
                pacificTimeHour += 12;
                suffix = suffix === 'PM' ? 'AM' : 'PM';
            }
            const pacificTime = `${pacificTimeHour}:${min} ${suffix}`
            debug(`Resetting time to Pacific ${pacificTime}`);
            node.innerHTML = pacificTime;
        }
    });
}

function debug(txt) {
    console.log(`mlbtz:${txt}`);
}
