const form=document.getElementById("opportunityForm");
const opportunityList=document.getElementById("opportunityList");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");

let opportunities=JSON.parse(localStorage.getItem("opportunities"))||[];
form.addEventListener("submit", function(e){
    e.preventDefault();
    const opportunity={
        title:document.getElementById("title").value,
        category:document.getElementById("category").value,
        organization:document.getElementById("organization").value,
        deadline: document.getElementById("deadline").value,
        link:document.getElementById("link").value,
        notes:document.getElementById("notes").value
    };
    opportunities.push(opportunity);
    saveToLocalStorage();

    displayOpportunities();
    updateDashboard();
    form.reset();
});
function saveToLocalStorage(){
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
}
function displayOpportunities(){
    opportunityList.innerHTML = "";
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = filterCategory.value;
    opportunities.filter(opportunity => {
        const matchesSearch=
        opportunity.title.toLowerCase().includes(searchTerm)||
        opportunity.organization.toLowerCase().includes(searchTerm);
        const matchesCategory=
        selectedCategory==="all"||
        opportunity.category.toLowerCase()===selectedCategory;
        return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);

    return dateA - dateB;
    })
.forEach((opportunity, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        const today = new Date();
        const deadlineDate = new Date(opportunity.deadline);
        const diffTime = deadlineDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let statusText = "";
        let statusColor = "";
        let borderColor = "";
       if (daysLeft < 0) {
        statusText="expired";
        statusColor="red";
        borderColor="red";
       }
       else if(daysLeft <=3){
        statusText = ` ${daysLeft} days left`;
        statusColor="orange";
        borderColor="orange";
       }
       else{
        statusText = `✅ ${daysLeft} days left`;
        statusColor="green";
        borderColor="green";
       }
       card.style.borderLeft = `6px solid ${borderColor}`;
        card.innerHTML = `
            <h3>${opportunity.title}</h3>
            <p><strong>Category:</strong> ${opportunity.category}</p>
            <p><strong>Organization:</strong> ${opportunity.organization}</p>
            <p><strong>Deadline:</strong> ${opportunity.deadline}</p>
            <p style="color:${statusColor}; font-weight:bold;">
                ${statusText}
            </p>
            <p><a href="${opportunity.link}" target="_blank">Visit Link</a></p>
            <p>${opportunity.notes}</p>
            <button onclick="deleteOpportunity(${index})">delete</button>
        `;
        opportunityList.appendChild(card);
    });
}
function deleteOpportunity(index){
    opportunities.splice(index,1);
    updateDashboard();
    saveToLocalStorage();
    displayOpportunities();
}
displayOpportunities();
updateDashboard();

function updateDashboard() {
    const total = opportunities.length;
    let upcoming = 0;
    let expired = 0;
    const today = new Date();
    opportunities.forEach(opportunity => {
        const deadlineDate = new Date(opportunity.deadline);
        if (deadlineDate < today) {
            expired++;
        } else {
            upcoming++;
        }
    });
    document.getElementById("total").innerText = `Total: ${total}`;
    document.getElementById("upcoming").innerText = `Upcoming: ${upcoming}`;
    document.getElementById("expired").innerText = `Expired: ${expired}`;
}
const themeToggle=document.getElementById("themeToggle");
if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
    themeToggle.innerHTML="light Mode";
}
themeToggle.addEventListener("click", ()=> {
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        themeToggle.innerHTML="light mode";
        localStorage.setItem("theme", "dark");
    }else{
        themeToggle.innerHTML="dark mode";
        localStorage.setItem("theme", "light");
    }
});
searchInput.addEventListener("input", displayOpportunities);

filterCategory.addEventListener("change", displayOpportunities);