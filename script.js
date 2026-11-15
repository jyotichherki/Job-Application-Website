
const jobs = [
    {
        title: "Frontend Developer",
        company: "TechSolutions",
        location: "Indore",
        category: "Development",
        salary: "₹3-5 LPA",
        type: "Full Time",
        description: "Develop responsive websites using HTML, CSS, JavaScript and React."
    },
    {
        title: "UI/UX Designer",
        company: "Creative Studio",
        location: "Bhopal",
        category: "Design",
        salary: "₹3-4 LPA",
        type: "Full Time",
        description: "Design modern user interfaces and create user-friendly experiences."
    },
    {
        title: "Digital Marketing Executive",
        company: "GrowthHub",
        location: "Remote",
        category: "Marketing",
        salary: "₹2-4 LPA",
        type: "Remote",
        description: "Manage digital campaigns, SEO and social media marketing."
    },
    {
        title: "Data Analyst",
        company: "DataTech",
        location: "Bangalore",
        category: "Data",
        salary: "₹4-6 LPA",
        type: "Full Time",
        description: "Analyze data using Python, SQL and visualization tools."
    }
];

const jobList = document.getElementById("job-list");
const search = document.getElementById("search");
const category = document.getElementById("category");
const locationFilter = document.getElementById("location");

const modal = document.getElementById("applicationModal");
const form = document.getElementById("applicationForm");
const selectedJob = document.getElementById("selectedJob");
const statusMessage = document.getElementById("statusMessage");

function displayJobs() {
    const searchValue = search.value.toLowerCase();
    const categoryValue = category.value;
    const locationValue = locationFilter.value;

    const filteredJobs = jobs.filter(job =>
        (job.title.toLowerCase().includes(searchValue) ||
         job.company.toLowerCase().includes(searchValue)) &&
        (!categoryValue || job.category === categoryValue) &&
        (!locationValue || job.location === locationValue)
    );

    jobList.innerHTML = "";

    if (filteredJobs.length === 0) {
        jobList.innerHTML = "<p>No jobs found. Try another search.</p>";
        return;
    }

    filteredJobs.forEach((job, index) => {
        const card = document.createElement("div");
        card.className = "job-card";

        const heading = document.createElement("h3");
        heading.textContent = job.title;

        const company = document.createElement("p");
        company.textContent = "Company: " + job.company;

        const location = document.createElement("p");
        location.textContent = "Location: " + job.location;

        const salary = document.createElement("p");
        salary.textContent = "Salary: " + job.salary;

        const details = document.createElement("div");
        details.className = "job-details";
        details.textContent =
            job.description + " Category: " + job.category +
            ". Job Type: " + job.type;

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const detailButton = document.createElement("button");
        detailButton.className = "details-btn";
        detailButton.textContent = "View Details";
        detailButton.setAttribute("aria-expanded", "false");

        detailButton.addEventListener("click", () => {
            const expanded = details.classList.toggle("show");
            detailButton.setAttribute("aria-expanded", expanded);
            detailButton.textContent =
                expanded ? "Hide Details" : "View Details";
        });

        const applyButton = document.createElement("button");
        applyButton.className = "apply-btn";
        applyButton.textContent = "Apply Now";

        applyButton.addEventListener("click", () => {
            openApplication(job.title);
        });

        actions.append(detailButton, applyButton);
        card.append(heading, company, location, salary, details, actions);
        jobList.appendChild(card);
    });
}

function openApplication(title) {
    selectedJob.textContent = "Applying for: " + title;
    modal.classList.add("active");
    statusMessage.textContent = "";
    document.getElementById("name").focus();
}

function closeApplication() {
    modal.classList.remove("active");
}

document.getElementById("closeModal")
    .addEventListener("click", closeApplication);

modal.addEventListener("click", event => {
    if (event.target === modal) closeApplication();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeApplication();
});

search.addEventListener("input", displayJobs);
category.addEventListener("change", displayJobs);
locationFilter.addEventListener("change", displayJobs);

form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const resume = document.getElementById("resume").files[0];

    if (!resume) {
        statusMessage.textContent = "Please upload your resume.";
        return;
    }

    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(resume.type) ||
        resume.size > 5 * 1024 * 1024) {
        statusMessage.textContent =
            "Upload a valid PDF/DOC/DOCX file under 5 MB.";
        statusMessage.style.color = "red";
        return;
    }

    statusMessage.style.color = "green";
    statusMessage.textContent =
        "Application submitted successfully! Thank you for applying.";

    form.reset();
});

displayJobs();
