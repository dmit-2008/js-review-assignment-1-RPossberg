import { toElement } from "../utils/toElement.js";
// Function to create a job card element
function createJobCard(job) {
  const li = document.createElement("li");
  li.className = "job-card card my-1";
  li.style.width = "18rem";
  li.innerHTML = `
      <div class="card-header">${job.company}</div>
      <div class="card-body">
        <h5 class="card-title">${job.title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${new Date(
          job.date_posted
        ).toLocaleDateString()}</h6>
        <button class="btn btn-primary view-job-button" job-data-id="${
          job.id
        }">View Job</button>
      </div>
    `;
  return li;
}

export function jobCard(job) {
  const template = jobCardTemplate(job);
  return toElement(template);
}
