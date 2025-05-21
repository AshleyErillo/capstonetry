import { useState } from "react";
import "./TicketApproval.css";

export default function TicketApproval() {
  const [reviewModalActive, setReviewModalActive] = useState(true);
  const [rejectionModalActive, setRejectionModalActive] = useState(false);
  const [approvalModalActive, setApprovalModalActive] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [priority, setPriority] = useState("Low");
  const [department, setDepartment] = useState("IT Support");
  const [approvalNotes, setApprovalNotes] = useState("");

  const openRejectionModal = () => {
    setRejectionModalActive(true);
  };

  const closeRejectionModal = () => {
    setRejectionModalActive(false);
    setRejectionReason("");
  };

  const submitRejection = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    alert("Rejection Submitted:\n" + rejectionReason);
    closeRejectionModal();
  };

  const openApprovalModal = () => {
    setApprovalModalActive(true);
  };

  const closeApprovalModal = () => {
    setApprovalModalActive(false);
    setApprovalNotes("");
  };

  const submitApproval = () => {
    alert(`Approval Submitted:\nPriority: ${priority}\nDepartment: ${department}\nNotes: ${approvalNotes || "None"}`);
    closeApprovalModal();
  };

  return (
    <div className="ticket-approval-container">
      {/* Ticket Review Modal */}
      <div className={`modal ${reviewModalActive ? "active" : ""}`} id="reviewModal">
        <div className="modal-content">
          <div className="header">
            <button className="back-button">←</button>
            <h2>Ticket Under Review for Approval</h2>
          </div>

          <div className="user-section">
            <div className="user-avatar"></div>
            <div className="user-info">
              <p className="user-name">Bogart Batumbakal</p>
              <p className="user-details">Company ID: 1105001   Department: IT Department</p>
              <p className="creation-time">Created Time: April 05, 2025  10:15 AM</p>
            </div>
          </div>

          <div className="ticket-id">TX0405</div>

          <div className="form-group">
            <label>Subject</label>
            <input type="text" value="Request for personal app installation" disabled />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <input type="text" value="Software" disabled />
            </div>
            <div className="form-group">
              <label>Sub-Category</label>
              <input type="text" value="Unauthorized Apps" disabled />
            </div>
          </div>

          <div className="form-group description-box">
            <label>Description:</label>
            <textarea disabled>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
          </div>

          <div className="form-group">
            <label>File Upload:</label>
            <div className="file-box">
              <span className="file-icon">📎</span>
              <span>Attached File</span>
            </div>
          </div>

          <div className="button-row">
            <button className="btn reject-btn" onClick={openRejectionModal}>Reject</button>
            <button className="btn approve-btn" onClick={openApprovalModal}>Approve</button>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      <div className={`modal ${rejectionModalActive ? "active" : ""}`} id="rejectionModal">
        <div className="modal-content">
          <h3>Reject Ticket</h3>
          <div className="form-group">
            <label>Reason for Rejection</label>
            <textarea 
              id="rejectionReason" 
              placeholder="Please explain why this ticket is being rejected..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
          </div>
          <div className="button-row">
            <button className="btn secondary-btn" onClick={closeRejectionModal}>Cancel</button>
            <button className="btn reject-btn" onClick={submitRejection}>Submit Rejection</button>
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      <div className={`modal ${approvalModalActive ? "active" : ""}`} id="approvalModal">
        <div className="modal-content">
          <h3>Approve Ticket</h3>
          <p><strong>Are you sure you want to approve this ticket?</strong></p>

          <div className="form-group">
            <label>Priority Level</label>
            <select 
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label>Assign to Department</label>
            <select 
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>IT Support</option>
              <option>Network</option>
              <option>Security</option>
              <option>Development</option>
            </select>
          </div>

          <div className="form-group">
            <label>Additional Notes (Optional)</label>
            <textarea 
              id="approvalNotes" 
              placeholder="Enter any notes..."
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
            ></textarea>
          </div>

          <div className="button-row">
            <button className="btn secondary-btn" onClick={closeApprovalModal}>Cancel</button>
            <button className="btn approve-btn" onClick={submitApproval}>Submit Approval</button>
          </div>
        </div>
      </div>
    </div>
  );
}
