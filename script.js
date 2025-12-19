// ===============================
// MOCK DATABASE (Replace with API)
// ===============================
const CERTIFICATES = [
    {
        credential_id: "GLD-INT-2025-001",
        name: "AMIT SHARMA",
        department: "Frontend Development",
        program: "Summer Internship 2025",
        issue_date: "15 August 2025",
        image: "certificates/GLD-INT-2025-001.jpg",
        pdf: "certificates/GLD-INT-2025-001.pdf"
    }
];

// ===============================
// DOM ELEMENTS
// ===============================
const form = document.getElementById("verificationForm");
const input = document.getElementById("credentialId");
const resultContainer = document.getElementById("resultContainer");
const resultCard = document.getElementById("resultCard");
const loader = document.getElementById("loader");
const verifyButton = document.getElementById("verifyButton");

// ===============================
// FORM SUBMIT
// ===============================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const credential = input.value.trim().toUpperCase();
    if (!credential) return;

    resetUI();
    showLoading(true);

    await new Promise(res => setTimeout(res, 800));

    const record = CERTIFICATES.find(c => c.credential_id === credential);

    showLoading(false);

    record ? showSuccess(record) : showFailure(credential);
});

// ===============================
// UI FUNCTIONS
// ===============================
function showLoading(state) {
    verifyButton.disabled = state;
    loader.classList.toggle("hidden", !state);
    resultContainer.classList.remove("hidden");
}

function resetUI() {
    resultCard.className = "result-card";
    document.getElementById("detailsGrid").classList.add("hidden");
    document.getElementById("certificatePreview").classList.add("hidden");
}

function showSuccess(data) {
    resultCard.classList.add("success");

    document.getElementById("statusHeader").textContent = "✅ CERTIFICATE VERIFIED";
    document.getElementById("message").textContent =
        "This certificate is valid and officially issued by Glodias.";

    document.getElementById("internName").textContent = data.name;
    document.getElementById("department").textContent = data.department;
    document.getElementById("program").textContent = data.program;
    document.getElementById("credentialOutput").textContent = data.credential_id;
    document.getElementById("issueDate").textContent = data.issue_date;

    document.getElementById("detailsGrid").classList.remove("hidden");

    document.getElementById("certificateImage").src = data.image;
    document.getElementById("certificatePreview").classList.remove("hidden");

    document.getElementById("downloadButton").onclick = () => {
        const a = document.createElement("a");
        a.href = data.pdf;
        a.download = `${data.credential_id}.pdf`;
        a.click();
    };
}

function showFailure(id) {
    resultCard.classList.add("failure");

    document.getElementById("statusHeader").textContent = "❌ VERIFICATION FAILED";
    document.getElementById("message").textContent =
        `Credential ID "${id}" was not found. Please recheck and try again.`;
}
