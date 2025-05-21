function openRejectionModal() {
  document.getElementById("rejectionModal").classList.add("active");
}

function closeRejectionModal() {
  document.getElementById("rejectionModal").classList.remove("active");
}

function submitRejection() {
  const reason = document.getElementById("rejectionReason").value.trim();
  if (!reason) {
    alert("Please provide a reason for rejection.");
    return;
  }
  alert("Rejection Submitted:\n" + reason);
  closeRejectionModal();
}

function openApprovalModal() {
  document.getElementById("approvalModal").classList.add("active");
}

function closeApprovalModal() {
  document.getElementById("approvalModal").classList.remove("active");
}

function submitApproval() {
  const priority = document.getElementById("priority").value;
  const department = document.getElementById("department").value;
  const notes = document.getElementById("approvalNotes").value;
  alert(`Approval Submitted:\nPriority: ${priority}\nDepartment: ${department}\nNotes: ${notes || "None"}`);
  closeApprovalModal();
}