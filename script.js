const form=document.getElementById("opportunityForm");
const opportunityList=document.getElementById("opportunityList");

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
    form.reset();
});
function saveToLocalStorage(){
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
}
function displayOpportunities(){
    opportunityList.innerHTML = "";
    opportunities.forEach((opportunity, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        const today = new Date();
        const deadlineDate = new Date(opportunity.deadline);
        const diffTime = deadlineDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let statusText = "";
        let statusColor = "";
        if (daysLeft < 0) {
            statusText = "Expired";
            statusColor = "red";
        } else if (daysLeft === 0) {
            statusText = "Last day";
            statusColor = "orange";
        } else {
            statusText = `✅ ${daysLeft} days left`;
            statusColor = "green";
        }
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
    saveToLocalStorage();
    displayOpportunities();
}
displayOpportunities();

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