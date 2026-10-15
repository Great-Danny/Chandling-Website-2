// NILSCA Verification System

// Member Database for Verification
const verificationDatabase = [
    {
        licenseNo: "NILSCA-2026-00145",
        name: "Maritime Excellence Ltd",
        port: "Lagos",
        status: "verified",
        phone: "+234-1-234-5678",
        email: "contact@maritime-excellence.ng",
        services: ["Food & Provisions", "Spare Parts"],
        validUntil: "2027-02-15"
    },
    {
        licenseNo: "NILSCA-2026-00142",
        name: "Ocean Supply Services",
        port: "Port Harcourt",
        status: "verified",
        phone: "+234-84-234-5678",
        email: "info@oceansupply.ng",
        services: ["Lubricants", "Provisions"],
        validUntil: "2027-01-20"
    },
    {
        licenseNo: "NILSCA-2026-00143",
        name: "Port Harbor Chandlers",
        port: "Calabar",
        status: "verified",
        phone: "+234-87-234-5678",
        email: "support@portharbor.ng",
        services: ["Spare Parts", "Repairs & Maintenance"],
        validUntil: "2026-12-10"
    },
    {
        licenseNo: "NILSCA-2026-00144",
        name: "Delta Maritime Services",
        port: "Delta Port",
        status: "verified",
        phone: "+234-53-234-5678",
        email: "contact@deltamaritime.ng",
        services: ["Provisions", "Lubricants"],
        validUntil: "2027-02-01"
    },
    {
        licenseNo: "NILSCA-2026-00146",
        name: "Lagos Port Supplies",
        port: "Lagos",
        status: "verified",
        phone: "+234-1-234-9999",
        email: "supplies@lagosport.ng",
        services: ["Repairs & Maintenance", "Provisions"],
        validUntil: "2027-02-20"
    }
];

// Handle Search by Name
function handleSearch(event) {
    event.preventDefault();
    const name = document.getElementById('searchName').value.toLowerCase();
    const member = verificationDatabase.find(m => m.name.toLowerCase().includes(name));
    
    if (member) {
        displayVerificationResult(member);
    } else {
        showVerificationNotification('No verified chandler found with that name.', 'error');
    }
}

// Handle License Number Search
function handleLicenseSearch(event) {
    event.preventDefault();
    const licenseNo = document.getElementById('licenseNo').value.trim().toUpperCase();
    const member = verificationDatabase.find(m => m.licenseNo === licenseNo);
    
    if (member) {
        displayVerificationResult(member);
    } else {
        showVerificationNotification('License number not found in NILSCA registry.', 'error');
    }
}

// Display Verification Result
function displayVerificationResult(member) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContent = document.getElementById('resultsContent');
    
    const isExpired = new Date(member.validUntil) < new Date();
    const statusColor = member.status === 'verified' && !isExpired ? '#10b981' : '#ef4444';
    const statusText = member.status === 'verified' && !isExpired ? 'VERIFIED ✓' : 'EXPIRED / INVALID';
    
    resultsContent.innerHTML = `
        <div style="background: linear-gradient(135deg, var(--color-navy-900), var(--color-navy-800)); color: white; padding: var(--spacing-xl); border-radius: 12px; border: 3px solid var(--color-gold-500);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
                <h2>${member.name}</h2>
                <span style="background: ${statusColor}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold;">
                    ${statusText}
                </span>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); margin-bottom: var(--spacing-lg); font-size: 0.95rem;">
                <div>
                    <p style="margin-bottom: var(--spacing-sm);">
                        <strong>License #:</strong><br>
                        <span style="color: var(--color-gold-400); font-family: 'Space Mono', monospace; font-weight: 700;">${member.licenseNo}</span>
                    </p>
                    <p style="margin-bottom: var(--spacing-sm);">
                        <strong>Port:</strong><br>
                        ${member.port}
                    </p>
                    <p>
                        <strong>Valid Until:</strong><br>
                        ${new Date(member.validUntil).toLocaleDateString()}
                    </p>
                </div>
                <div>
                    <p style="margin-bottom: var(--spacing-sm);">
                        <strong>Phone:</strong><br>
                        <a href="tel:${member.phone}" style="color: var(--color-gold-400); text-decoration: none;">${member.phone}</a>
                    </p>
                    <p style="margin-bottom: var(--spacing-sm);">
                        <strong>Email:</strong><br>
                        <a href="mailto:${member.email}" style="color: var(--color-gold-400); text-decoration: none;">${member.email}</a>
                    </p>
                </div>
            </div>
            
            <div style="margin-bottom: var(--spacing-lg);">
                <h4 style="color: var(--color-gold-500); margin-bottom: var(--spacing-md);">Services Offered:</h4>
                <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
                    ${member.services.map(s => `<span style="background: rgba(212, 175, 55, 0.2); color: var(--color-gold-400); padding: 6px 14px; border-radius: 20px; border: 1px solid var(--color-gold-400);">${s}</span>`).join('')}
                </div>
            </div>
            
            <button class="btn btn-primary btn-block" onclick="downloadCertificate('${member.licenseNo}', '${member.name}')">Download Digital Certificate</button>
        </div>
    `;
    
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Download Certificate
function downloadCertificate(licenseNo, name) {
    alert(`Downloading certificate for ${name} (${licenseNo})...`);
    // In production, this would generate a PDF with QR code
}

// Initialize QR Scanner
function initQRScanner() {
    alert('QR Scanner would open here. In production, integrate jsQR or similar library for camera access.');
    // Code to integrate QR scanning via device camera
}

// Show Notification
function showVerificationNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 4000);
}
