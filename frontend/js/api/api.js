// export async function getJobs(search) {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/jobs?search=${encodeURIComponent(search)}`
//     );
//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.statusText}`);
//     }
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Received non-JSON response");
//     }
//     const jobs = await response.json();
//     return jobs;
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     return [];
//   }
// }
