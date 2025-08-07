for(let ab=0; ab<200; ab++){
    const ac = document.createElement('div');
    ac.className = 'r';
    ac.style.width = ac.style.height = `${Math.random()*2+1}px`;
    ac.style.left = `${Math.random()*100}%`;
    ac.style.top = `${Math.random()*100}%`;
    ac.style.animationDelay = `${Math.random()*5}s`;
    document.getElementById('a').appendChild(ac);
}

const ad = "1356675152863297542";
const ae = document.getElementById('b');
const af = document.getElementById('e');
const ag = document.getElementById('k');
const ah = document.getElementById('n');
const ai = document.getElementById('i');
let aj = null;

ae.addEventListener('click', () => {
    ae.style.opacity = '0';
    setTimeout(() => {
        ae.style.display = 'none';
        af.style.display = 'flex';
        ak();
    }, 300);
});

function ak() {
    fetch(`https://api.lanyard.rest/v1/users/${ad}`)
    .then(response => response.json()) // Changed from 'al' to 'response'
    .then(am => {
        if(!am.success) return;
        const an = am.data;
        updateStatus(an.discord_status); // Changed from 'al' to 'updateStatus'
        ai.src = `https://cdn.discordapp.com/avatars/${ad}/${an.discord_user.avatar}.png?size=256`;
        
        if(an.spotify) {
            const ao = an.spotify;
            const ap = (ao.timestamps.end - ao.timestamps.start) / 1000;
            ah.innerHTML = `
                <div class="s">
                    <img src="${ao.album_art_url}" class="t">
                    <div class="y">
                        <div class="z">${ao.song}</div>
                        <div class="aa">${ao.artist}</div>
                    </div>
                </div>
                <div class="ab">
                    <div class="ac">
                        <div class="ad" id="ae"></div>
                    </div>
                    <div class="ae">
                        <span id="af">0:00</span>
                        <span id="ag">${Math.floor(ap/60)}:${Math.floor(ap%60).toString().padStart(2,'0')}</span>
                    </div>
                </div>
            `;
            ah.style.display = 'flex';
            const aq = document.getElementById('ae');
            const ar = document.getElementById('af');
            const as = ao.timestamps.start;
            const at = ao.timestamps.end;
            
            const au = () => {
                const av = (Date.now() - as) / 1000;
                const aw = Math.min(100, (av/ap) * 100);
                aq.style.width = `${aw}%`;
                ar.textContent = `${Math.floor(av/60)}:${Math.floor(av%60).toString().padStart(2,'0')}`;
            };
            
            if(aj) clearInterval(aj);
            au();
            aj = setInterval(au, 1000);
        } else {
            ah.style.display = 'none';
            if(aj) clearInterval(aj);
        }
    })
    .catch(() => {
        updateStatus('dnd');
        ah.style.display = 'none';
        if(aj) clearInterval(aj);
    });
}

function updateStatus(an) {
    ag.className = 'l';
    switch(an) {
        case 'online': ag.classList.add('u'); break;
        case 'idle': ag.classList.add('v'); break;
        case 'dnd': ag.classList.add('w'); break;
        default: ag.classList.add('x');
    }
}

setInterval(ak, 2000);
ak();
