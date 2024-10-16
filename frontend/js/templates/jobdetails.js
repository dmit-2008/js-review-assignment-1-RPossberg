import { toElement } from "../utils/toElement.js";

// Function to create a job details template string
function jobDetailsTemplate(job) {
  return `
<div class="card" job-data-id="${job.id}">
  <div class="card-body">
    <h3 class="card-title">${job.title || "Unknown Title"}</h3>
    <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${job.company || "Unknown Company"}</h4>
    <h6 class="card-subtitle mb-2 text-body-secondary">${job.location || "Unknown Location"}</h6>
    <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${job.date_posted ? new Date(job.date_posted).toLocaleDateString() : "Unknown Date"}</h6>
    <h5 class="card-subtitle mb-2">Description</h5>
    <p class="card-text">${job.description || "No description available."}</p>
    <h5 class="card-subtitle mb-2">Qualifications</h5>
    <p class="card-text">${job.qualifications || "No qualifications specified."}</p>
    <button class="btn btn-success save-job">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
      </svg>
      Save Job
    </button>
  </div>
</div>
  `;
}

// Function to create a job details element
function createJobDetails(job) {
  const template = jobDetailsTemplate(job);
  return toElement(template);
}

// Function to display job details
export function displayJobDetails(job) {
  const jobDetailsCard = document.getElementById("job-details-card");
  jobDetailsCard.innerHTML = "";
  const jobDetailsElement = createJobDetails(job);
  jobDetailsCard.appendChild(jobDetailsElement);
}