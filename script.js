// 修改這裡即可調整新人姓名、日期及照片。日期請保留時區。
const CONFIG = {
  rsvpEndpoint: 'https://script.google.com/macros/s/AKfycbycVoREn-rE1ZPHy9FdTjRZg42ICfbmU_M0eK__3tlzrmrNf4xIfaA5k804BKV1RT0N/exec',
  groom: '李典諭', bride: '王少妤',
  date: '2026-11-21T10:00:00+08:00', dateLabel: '2026.11.21',
  music: '', // 提供音檔後填入本機相對路徑，例如 assets/music.mp3。
  photos: ['assets/photo-0.jpg','assets/photo-1.jpg','assets/photo-2.jpg','assets/photo-3.jpg','assets/photo-4.jpg','assets/photo-5.jpg']
};
document.querySelectorAll('[data-groom]').forEach(el => el.textContent = CONFIG.groom);
document.querySelectorAll('[data-bride]').forEach(el => el.textContent = CONFIG.bride);
document.querySelectorAll('[data-names]').forEach(el => el.textContent = `${CONFIG.groom} & ${CONFIG.bride}`);
document.querySelectorAll('[data-date]').forEach(el => el.textContent = CONFIG.dateLabel);
document.querySelectorAll('main img:not(.calendar-art)').forEach((el,i) => { if(CONFIG.photos[i]) el.src = CONFIG.photos[i]; });
const countdown = document.getElementById('countdown');
function updateCountdown() {
 const days = Math.ceil((new Date(CONFIG.date) - Date.now()) / 86400000);
 countdown.textContent = days > 0 ? `距離我們的大日子，還有 ${days} 天` : days === 0 ? '今天，與你分享幸福。' : '謝謝你，見證我們的幸福。';
}
updateCountdown(); setInterval(updateCountdown,60000);
if ('IntersectionObserver' in window) {
 document.documentElement.classList.add('js-motion');
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.07});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
const lightbox=document.getElementById('lightbox');
document.querySelectorAll('.photo-button').forEach(button=>button.addEventListener('click',()=>{lightbox.querySelector('img').src=button.querySelector('img').src;lightbox.showModal();}));
document.getElementById('close-lightbox').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
function downloadFile(content,type,filename){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
const EVENTS = [
 { id:'ceremony', title:'結婚典禮', start:'2026-11-21T10:00:00+08:00', admission:'09:30', venue:'中華信義神學院・稱義樓1F', address:'新竹市東區大學路51巷11號', query:'中華信義神學院 新竹市東區大學路51巷11號' },
 { id:'reception', title:'結婚午宴', start:'2026-11-21T12:30:00+08:00', admission:'12:00', venue:'煙波大飯店新竹湖濱館・麗池館B1', address:'新竹市東區明湖路773號', query:'煙波大飯店新竹湖濱館 新竹市東區明湖路773號' }
];
const mapURL = event => 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(event.query);
const utcStamp = date => new Date(date).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
const icsEscape = text => String(text).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
function foldLine(line) { let result='', current='', bytes=0; for(const char of line){const size=new TextEncoder().encode(char).length;if(bytes+size>75){result+=current+'\r\n';current=' ';bytes=1;}current+=char;bytes+=size;}return result+current; }
function buildCalendar(events) {
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding Invitation//ZH-TW','CALSCALE:GREGORIAN'];
 events.forEach(event=>lines.push('BEGIN:VEVENT',`UID:${event.id}-20261121@wedding-letter-nov21.stableloon4.chatgpt.site`,'DTSTAMP:'+utcStamp(new Date()),'DTSTART:'+utcStamp(event.start),'SUMMARY:'+icsEscape(`${CONFIG.groom}與${CONFIG.bride}｜${event.title}`),'LOCATION:'+icsEscape(`${event.venue}，${event.address}`),'DESCRIPTION:'+icsEscape(`${event.admission} 入場。${new Date(event.start).toLocaleTimeString('zh-TW',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit',hour12:false})} 開始。\n${event.venue}\n${event.address}\n地圖：${mapURL(event)}\n結束時間未定，行事曆僅設定開始時間。`),'URL:'+mapURL(event),'END:VEVENT'));
 lines.push('END:VCALENDAR'); return lines.map(foldLine).join('\r\n')+'\r\n';
}
document.querySelectorAll('.event').forEach((article,index)=>{
 const event=EVENTS[index]; if(!event)return;
 const mapLink=article.querySelector('a');mapLink.href=mapURL(event);mapLink.textContent='開啟 Google 地圖 ↗';mapLink.setAttribute('aria-label',event.title+' Google 地圖');
 const map=document.createElement('iframe');map.className='venue-map';map.title=event.venue+'地圖';map.loading='lazy';map.referrerPolicy='no-referrer-when-downgrade';map.src='https://maps.google.com/maps?q='+encodeURIComponent(event.query)+'&output=embed';article.append(map);
 const actions=document.createElement('div');actions.className='calendar-actions';
 const google=document.createElement('a');google.textContent='Google 行事曆 ＋';google.target='_blank';google.rel='noopener';google.href='https://calendar.google.com/calendar/render?'+new URLSearchParams({action:'TEMPLATE',text:`${CONFIG.groom}與${CONFIG.bride}｜${event.title}`,dates:utcStamp(event.start)+'/'+utcStamp(event.start),ctz:'Asia/Taipei',location:`${event.venue}，${event.address}`,details:`${event.admission} 入場。\n地圖：${mapURL(event)}\n結束時間未定，請依當日流程安排。`});
 const apple=document.createElement('button');apple.type='button';apple.className='text-button';apple.textContent='Apple／Outlook ＋';apple.addEventListener('click',()=>downloadFile(buildCalendar([event]),'text/calendar;charset=utf-8',event.title+'.ics'));actions.append(google,apple);article.append(actions);
});
document.getElementById('calendar').textContent='下載典禮＋午宴行事曆 ＋';
document.getElementById('calendar').addEventListener('click',()=>downloadFile(buildCalendar(EVENTS),'text/calendar;charset=utf-8','婚禮與午宴行事曆.ics'));
const calendarNote=document.createElement('p');calendarNote.className='calendar-note';calendarNote.textContent='台灣時間（UTC+8）・典禮與午宴分開加入。結束時間未定，僅設定開始時間。';document.getElementById('calendar').after(calendarNote);
const music=document.createElement('audio');music.loop=true;music.preload='metadata';music.id='background-music';document.body.append(music);
const musicButton=document.createElement('button');musicButton.type='button';musicButton.className='music-toggle';musicButton.setAttribute('aria-pressed','false');document.body.append(musicButton);
const musicStatus=document.createElement('span');musicStatus.className='music-status';musicStatus.setAttribute('role','status');document.body.append(musicStatus);
function updateMusic(){const playing=!music.paused;musicButton.textContent=playing?'♫ 暫停音樂':'♫ 播放音樂';musicButton.setAttribute('aria-pressed',String(playing));musicButton.setAttribute('aria-label',playing?'暫停背景音樂':'播放背景音樂');}
if(CONFIG.music){music.src=CONFIG.music;updateMusic();musicButton.addEventListener('click',async()=>{if(!music.paused){music.pause();return;}try{await music.play();musicStatus.textContent='';}catch{musicStatus.textContent='音樂暫時無法播放，請稍後再試。';}});music.addEventListener('play',updateMusic);music.addEventListener('pause',updateMusic);music.addEventListener('error',()=>{musicStatus.textContent='音樂檔案無法載入。';});}else{musicButton.textContent='♫ 音樂待設定';musicButton.disabled=true;musicButton.title='等待提供原請帖音檔';}
const form=document.getElementById('rsvp-form');
const conditions=[['ceremony','ceremony-count','ceremonyCount'],['reception','reception-count','guests'],['invitation','address-field','address']];
function syncFields(){conditions.forEach(([name,id,requiredName])=>{const active=form.elements[name].value==='是';document.getElementById(id).hidden=!active;document.getElementById(id).querySelectorAll('input').forEach(input=>{input.disabled=!active;input.required=active&&input.name===requiredName;});});}
form.addEventListener('change',syncFields);syncFields();

// Apps Script 使用隱藏表單接收資料，只有收到儲存確認才顯示成功。
function sendRSVP(data, timeoutMs = 45000) {
 return new Promise((resolve,reject)=>{
  const frame=document.createElement('iframe');
  frame.name='rsvp-'+data.requestToken;frame.hidden=true;frame.title='出席回覆傳送';
  const outgoing=document.createElement('form');
  outgoing.method='POST';outgoing.action=CONFIG.rsvpEndpoint;outgoing.target=frame.name;outgoing.hidden=true;
  const payload=document.createElement('input');payload.type='hidden';payload.name='payload';payload.value=JSON.stringify(data);outgoing.append(payload);
  const cleanup=()=>{clearTimeout(timer);window.removeEventListener('message',receive);outgoing.remove();frame.remove();};
  function receive(event){
   if(!/^https:\/\/(?:script\.google\.com|(?:script|[a-z0-9-]+-script)\.googleusercontent\.com)$/.test(event.origin))return;
   const result=event.data;
   if(!result||result.type!=='wedding-rsvp'||result.requestToken!==data.requestToken||typeof result.ok!=='boolean')return;
   cleanup();result.ok?resolve():reject(new Error(result.message||'回覆未儲存，請稍後再試。'));
  }
  const timer=setTimeout(()=>{cleanup();reject(new Error('尚未收到儲存確認，請稍後再按一次送出；相同回覆不會重複記錄。'));},timeoutMs);
  window.addEventListener('message',receive);document.body.append(frame,outgoing);
  try{outgoing.submit();}catch(error){cleanup();reject(error);}
 });
}
// 現有接收程式儲存 message；以固定首行攜帶關係，名單再拆成獨立欄。
function encodeRelationship(data) {
 const relationship=String(data.relationship||'').trim().replace(/[\r\n]+/g,' ');
 if(!relationship||relationship.length>60)throw new Error('請填寫與新人的關係（60 字以內）。');
 const message=String(data.message||'').trim();
 if(message.length>1900)throw new Error('祝福留言請保持在 1900 字以內。');
 return {...data,relationship,message:'【與新人關係】'+relationship+'\n'+message};
}
let pendingReply=null;
form.addEventListener('submit',async e=>{
 e.preventDefault();
 const status=document.getElementById('form-status');
 if(location.origin!=='https://wsf10755005-ux.github.io'){status.textContent='請開啟線上請帖，再送出出席回覆。';return;}
 if(form.dataset.sending)return;
 let data=Object.fromEntries(new FormData(form));
 try{data=encodeRelationship(data);}catch(error){status.textContent=error.message;return;}
 if(Number(data.vegetarian||0)>Number(data.guests||0)){form.elements.vegetarian.setCustomValidity('素食人數不可超過午宴總人數');form.elements.vegetarian.reportValidity();return;}
 // 強制以文字儲存電話，保留開頭的 0 與國碼。
 data.phone="'"+String(data.phone||'').trim();
 data.responseOrigin=location.origin;
 const signature=JSON.stringify(data);
 if(!pendingReply||pendingReply.signature!==signature)pendingReply={signature,token:crypto.randomUUID()};
 data.requestToken=pendingReply.token;
 const controls=Array.from(form.elements).map(input=>({input,disabled:input.disabled}));
 const button=form.querySelector('[type="submit"]');
 form.dataset.sending='true';controls.forEach(({input})=>input.disabled=true);button.textContent='正在送出…';status.textContent='正在儲存你的出席回覆，請稍候。';
 try{await sendRSVP(data);status.textContent='已成功送出！謝謝你的回覆，期待與你相見。';form.reset();pendingReply=null;}
 catch(error){status.textContent=error.message||'暫時無法送出，已保留填寫內容，請稍後再試。';}
 finally{controls.forEach(({input,disabled})=>input.disabled=disabled);delete form.dataset.sending;button.textContent='送出出席回覆 ↗';syncFields();}
});
form.addEventListener('input',()=>form.elements.vegetarian.setCustomValidity(''));
