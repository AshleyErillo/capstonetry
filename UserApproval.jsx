import React, { useState } from 'react';
import './UserApproval .css';

function UserApproval() {
  const [rejectReason, setRejectReason] = useState('');
  
  const openRejectModal = () => {
    document.getElementById('rejectModal').classList.remove('hidden');
  };

  const closeRejectModal = () => {
    document.getElementById('rejectModal').classList.add('hidden');
    setRejectReason('');
  };

  const submitRejection = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    closeRejectModal();
    alert("Account rejected for reason:\n" + rejectReason);
  };

  const confirmApproval = () => {
    document.getElementById('approveModal').classList.remove('hidden');
  };

  const closeApproveModal = () => {
    document.getElementById('approveModal').classList.add('hidden');
  };

  const submitApproval = () => {
    closeApproveModal();
    alert("Account has been approved.");
  };

  return (
    <>
      <div className="modal" id="approvalModal">
        <div className="modal-content">
          <div className="header-row">
            <h2>New Account Request Approval</h2>
            <span className="badge">Pending</span>
          </div>
          
          <div id="accountForm">
            <div className="form-row">
              <div className="form-group">
                <label>Last Name:</label>
                <input type="text" value="Batumbakal" readOnly />
              </div>
              <div className="form-group">
                <label>First Name:</label>
                <input type="text" value="Bogart" readOnly />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Middle Name:</label>
                <input type="text" value="Dimaguiba" readOnly />
              </div>
              <div className="form-group">
                <label>Suffix:</label>
                <input type="text" value="Jr." readOnly />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Company ID:</label>
                <input type="text" value="IT0001" readOnly />
              </div>
              <div className="form-group">
                <label>Department:</label>
                <input type="text" value="IT Department" readOnly />
              </div>
            </div>
            
            <div className="form-group full-width">
              <label>Email address:</label>
              <input type="email" value="batumbakalbogart@gmail.com" readOnly />
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn reject" onClick={openRejectModal}>Reject Account</button>
              <button type="button" className="btn approve" onClick={confirmApproval}>Approve Account</button>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Reason Modal */}
      <div className="modal hidden" id="rejectModal">
        <div className="modal-content small">
          <h3>Reason for Rejection</h3>
          <textarea 
            id="rejectReason" 
            placeholder="Enter reason..." 
            rows="4"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          ></textarea>
          <div className="form-actions">
            <button className="btn cancel" onClick={closeRejectModal}>Cancel</button>
            <button className="btn reject" onClick={submitRejection}>Submit</button>
          </div>
        </div>
      </div>

      {/* Approve Confirmation Modal */}
      <div className="modal hidden" id="approveModal">
        <div className="modal-content small">
          <h3>Confirm Approval</h3>
          <p>Are you sure you want to approve this newly created account?</p>
          <div className="form-actions">
            <button className="btn cancel" onClick={closeApproveModal}>Cancel</button>
            <button className="btn approve" onClick={submitApproval}>Yes, Approve</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserApproval;
