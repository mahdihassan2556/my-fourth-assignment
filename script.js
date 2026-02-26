let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';
let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allCardSection = document.getElementById('allCards');
const allButton = document.getElementById('all-button');
const interviewFilterButton = document.getElementById('interview-filter-button');
const rejectedFilterButton = document.getElementById('rejected-filter-button');
 const filterSection = document.getElementById('filtered-section');

function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
   
   
}




function toggleStyle(id) {
   
    const selected = document.getElementById(id)
    allButton.classList.remove('bg-blue-500')
    interviewFilterButton.classList.remove('bg-blue-500')
    rejectedFilterButton.classList.remove('bg-blue-500')
    selected.classList.add('bg-blue-500')
    currentStatus = id
    if(id == 'interview-filter-button'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
         renderInterview();
    }else if(id == 'all-button'){
        allCardSection.classList.remove('hidden')
        filterSection.classList.add('hidden')
      
    }else if(id == 'rejected-filter-button'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderRejected();
    }
}

document.addEventListener("click", function(e){
    const deleteBtn = e.target.closest(".delete-btn");
    if(deleteBtn){
        const card = deleteBtn.closest(".job-card");
        card.remove();
        calculateCount();
    }
})

const mainContainer = document.querySelector('main')


mainContainer.addEventListener('click', function (event) {
  
    if (event.target.classList.contains("interview-btn")) {
        const parentNode = event.target.parentNode;
        const jobName = parentNode.querySelector('.job').innerText;
        const passionName = parentNode.querySelector('.passion').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.statas').innerText;
        const note = parentNode.querySelector('.note').innerText;

         parentNode.querySelector('.statas').innerText = 'Interview';
        const cardInfo = {
            jobName,
            passionName,
            salary,
            status:'Interview',
            note
        }

        const jobExist = interviewList.find(item => item.jobName == cardInfo.jobName);       
        if (!jobExist) {
            interviewList.push(cardInfo)
        }
        rejectedList = rejectedList.filter(item => item.jobName !== cardInfo.jobName);            
         if(currentStatus == 'rejected-filter-button'){
            renderRejected();
           
         }
           calculateCount();
         
    
    } else if (event.target.classList.contains("rejected-btn")) {
        const parentNode = event.target.parentNode;
        const jobName = parentNode.querySelector('.job').innerText.trim();
        const passionName = parentNode.querySelector('.passion').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.statas').innerText;
        const note = parentNode.querySelector('.note').innerText;
         parentNode.querySelector('.statas').innerText = 'Rejected';
        const cardInfo = {
            jobName,
            passionName,
            salary,
            status:'Rejected',
            note
        };
      
        const jobExist = rejectedList.find(item => item.jobName == cardInfo.jobName);
       
        if (!jobExist) {
           rejectedList.push(cardInfo)
        }
       interviewList = interviewList.filter(item => item.jobName !== cardInfo.jobName);

       if(currentStatus == 'interview-filter-button'){
        renderInterview();
       
       }
        calculateCount();
    }
      
})


  


function renderInterview() {
   
    filterSection.innerText = ''
    if(interviewList.length === 0){
        filterSection.innerHTML = `
          <div class="flex flex-col text-center px-16 py-16 shadow-sm rounded-md">
            <img src="/jobs.png" alt="" class="mx-auto mb-5">
            <p class="mb-1 font-bold text-[#002C5C] text-xl">No jobs available</p>
            <p class="text-[#64748B]">Check back soon for new job opportunities</p>
        </div>
        `;
        return;
    }
    for (let interview of interviewList) {
        let div = document.createElement('div')
        div.className = 'py-6 px-6  mt-7 rounded-md shadow-sm'
        div.innerHTML = `
        
        <div>
                 <p class="job font-bold mb-3 text-[#002C5C]">${interview.jobName}</p>
                <h2 class="passion text-[#64748B] mb-4">${interview.passionName}</h2>
                <p class="salary text-[#64748B] mb-3">${interview.salary}</p>
                <p class="statas mb-3 bg-[#EEF4FF] w-[110px] px-2 py-2 rounded-md text-[#002C5C] font-semibold">${interview.status}</p>
                <p class="note mb-4">${interview.note}</p>
               
               <button class=" interview-btn btn btn-outline btn-success">Interview</button>
               <button class=" rejected-btn btn btn-outline btn-error">Rejected</button>
              
            </div>`
            filterSection.appendChild(div)
    }
}



function renderRejected() {
    filterSection.innerText = ''
     if(rejectedList.length === 0){
        filterSection.innerHTML = `
          <div class="flex flex-col text-center px-16 py-16 shadow-sm rounded-md">
            <img src="/jobs.png" alt="" class="mx-auto mb-5">
            <p class="mb-1 font-bold text-[#002C5C] text-xl">No jobs available</p>
            <p class="text-[#64748B]">Check back soon for new job opportunities</p>
        </div>
        `;
        return;
     }
    for (let rejected of rejectedList) {
        let div = document.createElement('div')
        div.className = 'py-6 px-6  mt-7 rounded-md shadow-sm'
        div.innerHTML = `
        
        <div>
                 <p class="job font-bold mb-3 text-[#002C5C]">${rejected.jobName}</p>
                <h2 class=" passion text-[#64748B] mb-4">${rejected.passionName}</h2>
                <p class=" salary text-[#64748B] mb-3">${rejected.salary}</p>
                <p class="statas mb-3 bg-[#EEF4FF] w-[110px] px-2 py-2 rounded-md text-[#002C5C] font-semibold">${rejected.status}</p>
                <p class=" note mb-4">${rejected.note}</p>
               
               <button class=" interview-btn btn btn-outline btn-success">Interview</button>
               <button class=" rejected-btn btn btn-outline btn-error">Rejected</button>
              
            </div>`
            filterSection.appendChild(div)
    }
}
