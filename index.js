let currentTab = 'all';
const tabActive = ["bg-blue-700","border-navy", "text-white"];
const tabInactive = ["bg-transparent", "border-state-200", "text-black"];

const allContainer = document.getElementById('all-container');
const interviewContainer = document.getElementById('interview-container');
const rejectedContainer = document.getElementById('reject-container');


function switchTab (tab) {
   
   const tabs = ["all", "interview", "rejected"]
    currentTab = tab;
   for(const t of tabs){
    const tabName = document.getElementById("tab-" + t);
   if(t === tab){
    tabName.classList.remove(...tabInactive);
    tabName.classList.add(...tabActive); 
   }else{
    tabName.classList.remove(...tabActive)
    tabName.classList.add(...tabInactive);
   }
   }

   const pages = [allContainer, interviewContainer,rejectedContainer];
   for (const section of pages) {
    section.classList.add("hidden");
   }

   emptyStat.classList.add("hidden")

   if(tab === "all"){
    allContainer.classList.remove("hidden");
    if(allContainer.children.length < 1){
        emptyStat.classList.remove("hidden");
    }
   }else if(tab === "interview"){
    interviewContainer.classList.remove("hidden");
    if(interviewContainer.children.length <1){
        emptyStat.classList.remove("hidden")
    }
   }else{
    rejectedContainer.classList.remove("hidden");
    if(rejectedContainer.children.length < 1){
       emptyStat.classList.remove("hidden")
    }
   }
   updateStat();
}


const totalStat = document.getElementById("stat-total");
const interviewStat = document.getElementById("stat-interview");
const rejectStat = document.getElementById("stat-reject");
const emptyStat = document.getElementById("empty-stat")
const availableStat = document.getElementById("available")

switchTab(currentTab);

document.getElementById("all-cards").addEventListener("click", function(event){
    const clickedElement = event.target;
    const card = clickedElement.closest(".card");
    const parent = card.parentNode;
    const status = card.querySelector(".applied");
    
    if(clickedElement.classList.contains("interview")){
       interviewContainer.appendChild(card);
       status.innerText = "Interviewed"
    }
    if(clickedElement.classList.contains("rejected")){
        rejectedContainer.appendChild(card);
        status.innerText = "Rejected"
    }
    if(clickedElement.classList.contains("delete")){
      parent.removeChild(card);
    }
    updateStat();
});


function updateStat(){
   
    const counts = {
        all:allContainer.children.length,
        interview: interviewContainer.children.length,
        rejected:rejectedContainer.children.length,
    }
     totalStat.innerText = counts.all;
    interviewStat.innerText =counts.interview;
    rejectStat.innerText = counts.rejected;

    availableStat.innerText = counts[currentTab];
    if(counts[currentTab]<1){
          emptyStat.classList.remove("hidden");
    }else{
          emptyStat.classList.add("hidden");
    }
}

updateStat();