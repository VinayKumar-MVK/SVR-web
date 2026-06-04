fetch('https://www.youtube.com/@svrpoultryequipments').then(r=>r.text()).then(t=>{ 
    const match = t.match(/"channelId":"(UC[^"]+)"/);
    console.log(match ? match[1] : 'not found'); 
});
