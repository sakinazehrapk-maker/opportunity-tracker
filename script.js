const form=document.getElementById("opportunityForm");
const opportunityList=document.getElementById("opportunityList");

let opportunities=JSON.parse(localStorage.getItem("opportunities"))||[];
form.addEventListener("submit", function(e){
    e.preventDefault();
    const opportunity={
        title:document.getElementById("title").value,
        category:document.getElementById("category").value,
        organization:document.getElementById("organization").value,
        link:document.getElementById("link").value,
        notes:document.getElementById("notes").value
    };
    opportunities.push(opportunity);
    saveToLocalStorage();

    displayOpportunities();
    form.reset();
});
saveToLocalStorage();{
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
}
function displayOpportunities(){
    opportunityList.innerHTML="";
    opportunities.forEach(opportunity=> {
        const card=document.createElement("div");
        card.classList.add("card");
        card.innerHTML =`
            <h3>${opportunity.title}</h3>
            <p><strong>Category:</strong> ${opportunity.category}</p>
            <p><strong>Organization:</strong> ${opportunity.organization}</p>
            <p><strong>Deadline:</strong> ${opportunity.deadline}</p>
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