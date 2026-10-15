// NILSCA Member Directory Functionality

// Member Database (Shared)
const members = [
    {
        id: 1,
        name: "Maritime Excellence Ltd",
        port: "lagos",
        services: ["provisions", "spare-parts"],
        status: "verified",
        licenseNo: "NILSCA-2026-00145",
        phone: "+234-1-234-5678",
        email: "contact@maritime-excellence.ng",
        established: 2015
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
        established: 2012
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
        established: 2018
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
        established: 2014
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
        established: 2011
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
        established: 2024
    },
    {
        id: 7,
        name: "Calabar Marine Supplies",
        port: "calabar",
        services: ["lubricants", "spare-parts", "repairs"],
        status: "verified",
        licenseNo: "NILSCA-2026-00148",
        phone: "+234-87-555-9999",
        email: "supplies@calabarmarine.ng",
        established: 2013
    },
    {
        id: 8,
        name: "Lagos Ship Provisions",
        port: "lagos",
        services: ["provisions"],
        status: "verified",
        licenseNo: "NILSCA-2026-00149",
        phone: "+234-1-444-3333",
        email: "info@lagosship.ng",
        established: 2016
    }
];

// Load Members on Page Load
document.addEventListener('DOMContentLoaded', loadDirectory);

function loadDirectory() {
    displayMembers(members);
}

// Display Members
function displayMembers(filteredMembers) {
    const grid = document.getElementById('memberGrid');
    
    if (filteredMembers.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-gray-600);">No members found matching your criteria.</p>';
        return;
    }
    
    grid.innerHTML = filteredMembers.map(member => `
        <div class="member-card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-md);">
                <h3 style="color: var(--color-navy-900);">${member.name}</h3>
                ${member.status === 'verified' ? '<span class="verified-badge">✓ Verified</span>' : '<span style="background: var(--color-gold-200); color: var(--color-navy-900); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem;">Pending</span>'}
            </div>
            
            <p style="color: var(--color-gray-600); margin-bottom: var(--spacing-md);">
                <strong>Port:</strong> ${member.port.toUpperCase()} | <strong>Est.:</strong> ${member.established}
            </p>
            
            <div style="margin-bottom: var(--spacing-md);">
                <h4 style="color: var(--color-navy-900); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">Services:</h4>
                <div style="display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
                    ${member.services.map(s => `<span style="background: var(--color-gold-100); color: var(--color-navy-900); padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">${s.replace('-', ' ')}</span>`).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: var(--spacing-md);">
                <p style="font-size: 0.9rem; color: var(--color-gray-600);"><strong>License:</strong> ${member.licenseNo}</p>
                <p style="font-size: 0.9rem; color: var(--color-gray-600);"><strong>Phone:</strong> ${member.phone}</p>
                <p style="font-size: 0.9rem; color: var(--color-gray-600);"><strong>Email:</strong> ${member.email}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md);">
                <button class="btn btn-secondary btn-sm" onclick="contactMember('${member.name}')">Contact</button>
                <button class="btn btn-primary btn-sm" onclick="viewCertificate('${member.licenseNo}')">Certificate</button>
            </div>
        </div>
    `).join('');
}

// Filter Members
function filterMembers() {
    const port = document.getElementById('portFilter').value;
    const service = document.getElementById('serviceFilter').value;
    const status = document.getElementById('statusFilter').value;
    
    let filtered = members;
    
    if (port) filtered = filtered.filter(m => m.port === port);
    if (service) filtered = filtered.filter(m => m.services.includes(service));
    if (status) filtered = filtered.filter(m => m.status === status);
    
    displayMembers(filtered);
}

// Reset Filters
function resetFilters() {
    document.getElementById('portFilter').value = '';
    document.getElementById('serviceFilter').value = '';
    document.getElementById('statusFilter').value = '';
    displayMembers(members);
}

// Contact Member
function contactMember(name) {
    alert(`Contacting ${name}...`);
}

// View Certificate
function viewCertificate(licenseNo) {
    window.location.href = `certificates.html?lic=${licenseNo}`;
}
