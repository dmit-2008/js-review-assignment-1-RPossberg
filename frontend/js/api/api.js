// src/api/api.js

export async function getJobs(search) {
  try {
    const response = await fetch(`http://localhost:3000/jobs?search=${encodeURIComponent(search)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jobs = await response.json();
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
