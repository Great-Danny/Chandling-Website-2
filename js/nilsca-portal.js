// NILSCA Portal Main Functionality

// Sample Member Database
const nilscaMembers = [
    {
        id: 1,
        name: "Maritime Excellence Ltd",
        port: "lagos",
        services: ["provisions", "spare-parts"],
        status: "verified",
        licenseNo: "NILSCA-2026-00145",
        phone: "+234-1-234-5678",
        email: "contact@maritime-excellence.ng",
        established: 2015,
        verificationDate: "2026-02-15"
    },
    {
        id: 2,
        name: "Ocean Supply Services",
        port: "ph",
        services: ["lubricants", "provisions"],
        status: "verified",
        licenseNo: "NILSCA-2026-00142",
        phone: "+234-84-234-5678",
        email: "info@oceansupply.ng",
        established: 2012,
        verificationDate: "2026-01-20"
    },
    {
        id: 3,
        name: "Port Harbor Chandlers",
        port: "calabar",
        services: ["spare-parts", "repairs"],
        status: "verified",
        licenseNo: "NILSCA-2026-00143",
        phone: "+234-87-234-5678",
        email: "support@portharbor.ng",
        established: 2018,
        verificationDate: "2025-12-10"
    },
    {
        id: 4,
        name: "Delta Maritime Services",
        port: "delta",
        services: ["provisions", "lubricants"],
        status: "verified",
        licenseNo: "NILSCA-2026-00144",
        phone: "+234-53-234-5678",
        email: "contact@deltamaritime.ng",
        established: 2014,
        verificationDate: "2026-02-01"
    },
    {
        id: 5,
        name: "Lagos Port Supplies",
        port: "lagos",
        services: ["repairs", "provisions"],
        status: "verified",
        licenseNo: "NILSCA-2026-00146",
        phone: "+234-1-234-9999",
        email: "supplies@lagosport.ng",
        established: 2011,
        verificationDate: "2026-02-20"
    },
    {
        id: 6,
        name: "Global Maritime Provisions",
        port: "ph",
        services: ["provisions", "spare-parts"],
        status: "pending",
        licenseNo: "NILSCA-2026-00147",
        phone: "+234-84-234-7777",
        email: "info@globalmaritime.ng",
        established: 2024,
        verificationDate: "2026-03-01"
    }
];

// Handle Chandler Search
function handleVerification(event) {
    event.preventDefault();
    const name = document.getElementById('chandlerName').value.toLowerCase();
    const member = nilscaMembers.find(m => m.name.toLowerCase().includes(name));
    
    if (member) {
        displayVerificationResult(member);
    } else {
        showNotification('Chandler not found. Please check the name and try again.', 'error');
    }
}

// Display Verification Result
function displayVerificationResult(member) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContent = document.getElementById('resultsContent');
    
    const statusBadge = member.status === 'verified' 
        ? '<span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem;">✓ Verified</span>'
        : '<span style="background: #f59e0b; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem;">⏳ Pending</span>';
    
    resultsContent.innerHTML = `
        <div style="background: white; padding: var(--spacing-xl); border-radius: 12px; border: 2px solid var(--color-gold-500);">
            <h2 style="color: var(--color-navy-900); margin-bottom: var(--spacing-lg);">${member.name}</h2>
            <div style="margin-bottom: var(--spacing-lg);">${statusBadge}</div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
                <div>
                    <p style="color: var(--color-gray-600); font-size: 0.9rem;"><strong>License #:</strong> ${member.licenseNo}</p>
                    <p style="color: var(--color-gray-600); font-size: 0.9rem;"><strong>Port:</strong> ${member.port.toUpperCase()}</p>
                    <p style="color: var(--color-gray-600); font-size: 0.9rem;"><strong>Established:</strong> ${member.established}</p>
                </div>
                <div>
                    <p style="color: var(--color-gray-600); font-size: 0.9rem;"><strong>Phone:</strong> ${member.phone}</p>
                    <p style="color: var(--color-gray-600); font-size: 0.9rem;"><strong>Email:</strong> ${member.email}</p>
                    <p style="color: var(--color-gray-600); font-size: 0.9rem;"><strong>Verified:</strong> ${member.verificationDate}</p>
                </div>
            </div>
            
            <div>
                <h4 style="color: var(--color-navy-900); margin-bottom: var(--spacing-md);">Services Offered:</h4>
                <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
                    ${member.services.map(s => `<span style="background: var(--color-gold-100); color: var(--color-navy-900); padding: var(--spacing-sm) var(--spacing-md); border-radius: 20px; font-size: 0.9rem;">${s.replace('-', ' ').toUpperCase()}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Show Notification
function showNotification(message, type = 'info') {
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
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 4000);
}

// Initialize Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});
