window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("hide"),500));
const nav=document.getElementById("nav"),links=document.getElementById("links");
window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>35));
document.getElementById("menu").addEventListener("click",()=>links.classList.toggle("open"));
links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
document.getElementById("theme").addEventListener("click",()=>document.body.classList.toggle("light"));

const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));

const heroPhoto=document.getElementById("heroPhoto");
window.addEventListener("mousemove",e=>{
 if(innerWidth<900)return;
 const x=(e.clientX/innerWidth-.5)*7,y=(e.clientY/innerHeight-.5)*7;
 heroPhoto.style.transform=`translate(${x}px,${y}px)`;
});

document.querySelectorAll(".poster img").forEach(img=>{
 img.addEventListener("error",()=>{
   img.style.display="none";
   img.closest(".poster").classList.add("image-missing");
 });
});

const modal=document.getElementById("modal");
document.querySelectorAll(".poster").forEach(p=>p.addEventListener("click",()=>{
 document.getElementById("mYear").textContent=p.dataset.year;
 document.getElementById("mTitle").textContent=p.dataset.title;
 document.getElementById("mRole").textContent=p.dataset.role;
 document.getElementById("mGenre").textContent=p.dataset.genre;
 document.getElementById("mDesc").textContent=p.dataset.description;
 modal.classList.add("open");
}));
function closeModal(){modal.classList.remove("open")}
document.getElementById("close").onclick=closeModal;
document.querySelector(".shade").onclick=closeModal;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 const f=btn.dataset.filter;
 document.querySelectorAll(".film-card").forEach(card=>{
   const genres=card.querySelector(".film-info").textContent;
   card.classList.toggle("hidden",f!=="all"&&!genres.toLowerCase().includes(f.toLowerCase()));
 });
}));

const facts=[
"His lead-actor debut was Kaho Naa... Pyaar Hai in 2000.",
"He played both Rohit and Raj in Kaho Naa... Pyaar Hai.",
"Krrish became one of his signature characters.",
"He played Aryan in Dhoom 2.",
"He portrayed Mughal emperor Akbar in Jodhaa Akbar.",
"Super 30 saw him portray mathematician and educator Anand Kumar.",
"War paired him with Tiger Shroff in a major action spectacle.",
"Fighter cast him as fighter pilot Shamsher Pathania."
];
let last=-1;
function fact(){
 let i;do{i=Math.floor(Math.random()*facts.length)}while(i===last);last=i;
 const el=document.getElementById("fact");el.style.opacity=0;setTimeout(()=>{el.textContent=facts[i];el.style.opacity=1},150)
}
document.getElementById("factBtn").onclick=fact;
document.getElementById("factHero").onclick=()=>{document.getElementById("fan").scrollIntoView({behavior:"smooth"});setTimeout(fact,500)};

const qs=[
["Which film marked Hrithik's lead-actor debut?",["Dhoom 2","Kaho Naa... Pyaar Hai","Koi... Mil Gaya","Lakshya"],1],
["Who did he play in War?",["Vedha","Rohit","Kabir","Akbar"],2],
["Who did he portray in Super 30?",["Anand Kumar","Arjun","Shamsher","Karan"],0],
["Which character is the superhero?",["Aryan","Krrish","Vedha","Raj"],1],
["Which film features fighter pilot Shamsher Pathania?",["Fighter","Agneepath","Bang Bang!","War"],0]
];
let qi=-1,score=0,choice=null;
const q=document.getElementById("question"),ans=document.getElementById("answers"),next=document.getElementById("next"),progress=document.getElementById("progress"),result=document.getElementById("result");
function renderQ(){
 choice=null;const item=qs[qi];q.textContent=item[0];ans.innerHTML="";
 item[1].forEach((a,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=a;b.onclick=()=>{document.querySelectorAll(".answer").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");choice=i};ans.appendChild(b)});
 progress.style.width=((qi+1)/qs.length*100)+"%";next.textContent=qi===qs.length-1?"Finish quiz →":"Next →";
}
next.onclick=()=>{
 if(qi===-1){qi=0;score=0;result.textContent="";renderQ();return}
 if(choice===null){result.textContent="Choose an answer first.";return}
 if(choice===qs[qi][2])score++;
 if(qi===qs.length-1){q.textContent=`You scored ${score} / ${qs.length}`;ans.innerHTML="";result.textContent=score===5?"Perfect. Hrithik-level knowledge. ✦":score>=3?"Strong fan energy. ✦":"Time for a movie marathon. ✦";next.textContent="Play again";qi=-1;return}
 qi++;renderQ();
};
