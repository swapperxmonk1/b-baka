const m=document.getElementById("modal"),
      c=document.getElementById("copy_btn"),
      u=document.getElementById("loader_url"),
      s=document.querySelectorAll(".script_item");

s.forEach(i=>{
  i.onclick=()=>{
    u.textContent="muiala.online/loader/vbl.lua";
    m.classList.add("active");
  };
  i.onkeydown=e=>{
    if(e.key==="Enter"||e.key===" ") {
      u.textContent="muiala.online/loader/vbl.lua";
      m.classList.add("active");
    }
  };
});

c.onclick=()=>{
  navigator.clipboard.writeText(u.textContent);
  c.textContent="copied";
  setTimeout(()=>c.textContent="",1000);
};

m.onclick=e=>{
  if(e.target===m) m.classList.remove("active");
};
