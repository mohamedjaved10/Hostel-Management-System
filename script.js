// =====================================
// HOSTEL MANAGEMENT SYSTEM
// SCRIPT.JS
// =====================================


// =====================================
// LIVE DATE & TIME
// =====================================

function updateDateTime() {

    const dateTimeContainer =
        document.getElementById(
            "dateTimeContainer"
        );

    if (!dateTimeContainer) {
        return;
    }

    const now =
        new Date();

    dateTimeContainer.innerHTML =
        now.toLocaleDateString() +
        " | " +
        now.toLocaleTimeString();

}

setInterval(
    updateDateTime,
    1000
);

updateDateTime();


// =====================================
// LOCAL STORAGE DATA
// =====================================

let complaints =
    JSON.parse(
        localStorage.getItem(
            "complaints"
        )
    ) || [];

let permissions =
    JSON.parse(
        localStorage.getItem(
            "permissions"
        )
    ) || [];

let notices =
    JSON.parse(
        localStorage.getItem(
            "notices"
        )
    ) || [];


// =====================================
// SAVE FUNCTIONS
// =====================================

function saveComplaints() {

    localStorage.setItem(
        "complaints",
        JSON.stringify(
            complaints
        )
    );

}

function savePermissions() {

    localStorage.setItem(
        "permissions",
        JSON.stringify(
            permissions
        )
    );

}

function saveNotices() {

    localStorage.setItem(
        "notices",
        JSON.stringify(
            notices
        )
    );

}


// =====================================
// COMPLAINT ID GENERATOR
// CMP001 CMP002 CMP003...
// =====================================

function generateComplaintId() {

    let counter =
        parseInt(
            localStorage.getItem(
                "complaintCounter"
            )
        ) || 0;

    counter++;

    localStorage.setItem(
        "complaintCounter",
        counter
    );

    return (
        "CMP" +
        String(
            counter
        ).padStart(
            3,
            "0"
        )
    );

}


// =====================================
// LOAD COMPLAINT HISTORY
// =====================================

function loadComplaintHistory() {

    const historyContainer =
        document.getElementById(
            "complaintHistoryContainer"
        );

    if (!historyContainer) {
        return;
    }

    if (
        complaints.length === 0
    ) {

        historyContainer.innerHTML =
            "<p>No complaints available.</p>";

        return;
    }

    let html = "";

    complaints.forEach(
        function(complaint) {

            html += `
            <div class="complaint-history-card">

                <h3>${complaint.id}</h3>

                <p>
                    <strong>Student:</strong>
                    ${complaint.studentName}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${complaint.category}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${complaint.status}
                </p>

                <hr>

            </div>
            `;

        }
    );

    historyContainer.innerHTML =
        html;

}


// =====================================
// INITIAL LOAD
// =====================================

loadComplaintHistory();

console.log(
    "Hostel Management System Loaded Successfully"
);
// =====================================
// COMPLAINT SUBMISSION SYSTEM
// =====================================

const complaintForm =
    document.getElementById(
        "complaintForm"
    );

if (complaintForm) {

    complaintForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const complaintId =
                generateComplaintId();

            const complaint = {

                id: complaintId,

                studentName: document.getElementById(
                    "studentName"
                ).value || "",

                registerNumber: document.getElementById(
                    "registerNumber"
                ).value || "",

                roomNumber: document.getElementById(
                    "roomNumber"
                ).value || "",

                hostelBlock: document.getElementById(
                    "hostelBlock"
                ).value || "",

                phoneNumber: document.getElementById(
                    "phoneNumber"
                ).value || "",

                category: document.getElementById(
                    "complaintCategory"
                ).value || "",

                priority: document.getElementById(
                    "priorityLevel"
                ).value || "",

                complaintDate: document.getElementById(
                    "complaintDate"
                ).value || "",

                complaintTime: document.getElementById(
                    "complaintTime"
                ).value || "",

                description: document.getElementById(
                    "complaintDescription"
                ).value || "",

                status: "Submitted",

                adminRemarks: "Complaint received successfully.",

                submittedOn: new Date()
                    .toLocaleString()

            };

            complaints.push(
                complaint
            );

            saveComplaints();

            loadComplaintHistory();

            const idContainer =
                document.getElementById(
                    "generatedComplaintId"
                );

            if (idContainer) {

                idContainer.innerHTML =
                    `
                <h3>
                    ${complaintId}
                </h3>
                `;
            }

            const responseContainer =
                document.getElementById(
                    "complaintResponseContainer"
                );

            if (responseContainer) {

                responseContainer.innerHTML =
                    `
                <h3>
                    Complaint Submitted Successfully
                </h3>

                <p>
                    <strong>Complaint ID:</strong>
                    ${complaintId}
                </p>

                <p>
                    <strong>Status:</strong>
                    Submitted
                </p>
                `;
            }

            alert(
                "Complaint Submitted Successfully"
            );

            complaintForm.reset();

        }
    );

}
// =====================================
// TRACK COMPLAINT SYSTEM
// =====================================

const trackComplaintForm =
    document.getElementById(
        "trackComplaintForm"
    );

if (trackComplaintForm) {

    trackComplaintForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const complaintId =
                document.getElementById(
                    "trackComplaintId"
                ).value.trim();

            const complaint =
                complaints.find(
                    function(item) {

                        return (
                            item.id.toUpperCase() ===
                            complaintId.toUpperCase()
                        );

                    }
                );

            const resultContainer =
                document.getElementById(
                    "trackComplaintResult"
                );

            const detailsContainer =
                document.getElementById(
                    "complaintDetailsContainer"
                );

            if (!complaint) {

                if (resultContainer) {

                    resultContainer.innerHTML =
                        `
                    <h3>
                        Complaint Not Found
                    </h3>

                    <p>
                        Please check your Complaint ID.
                    </p>
                    `;
                }

                return;
            }

            if (resultContainer) {

                resultContainer.innerHTML =
                    `
                <h3>
                    Complaint Found
                </h3>

                <p>
                    Complaint ID:
                    ${complaint.id}
                </p>

                <p>
                    Status:
                    ${complaint.status}
                </p>
                `;
            }

            if (detailsContainer) {

                detailsContainer.innerHTML =
                    `
                <h3>
                    Complaint Details
                </h3>

                <p>
                    <strong>Complaint ID:</strong>
                    ${complaint.id}
                </p>

                <p>
                    <strong>Student Name:</strong>
                    ${complaint.studentName}
                </p>

                <p>
                    <strong>Register Number:</strong>
                    ${complaint.registerNumber}
                </p>

                <p>
                    <strong>Room Number:</strong>
                    ${complaint.roomNumber}
                </p>

                <p>
                    <strong>Hostel Block:</strong>
                    ${complaint.hostelBlock}
                </p>

                <p>
                    <strong>Phone Number:</strong>
                    ${complaint.phoneNumber}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${complaint.category}
                </p>

                <p>
                    <strong>Priority:</strong>
                    ${complaint.priority}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${complaint.status}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${complaint.description}
                </p>

                <p>
                    <strong>Submitted On:</strong>
                    ${complaint.submittedOn}
                </p>
                `;
            }

        }
    );

}
// =====================================
// ADMIN LOGIN SYSTEM
// =====================================

const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const username =
                document.getElementById(
                    "adminUsername"
                ).value;

            const password =
                document.getElementById(
                    "adminPassword"
                ).value;

            const loginStatus =
                document.getElementById(
                    "loginStatusContainer"
                );

            if (
                username === "admin" &&
                password === "admin123"
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );

                if (loginStatus) {

                    loginStatus.innerHTML =
                        `
                    <h3>
                        Login Successful
                    </h3>

                    <p>
                        Redirecting to Admin Dashboard...
                    </p>
                    `;
                }

                setTimeout(
                    function() {

                        window.location.href =
                            "admin-dashboard.html";

                    },
                    1500
                );

            } else {

                if (loginStatus) {

                    loginStatus.innerHTML =
                        `
                    <h3>
                        Login Failed
                    </h3>

                    <p>
                        Invalid Username or Password
                    </p>
                    `;
                }

            }

        }
    );

}
// =====================================
// ADMIN DASHBOARD STATISTICS
// =====================================

function loadDashboardStatistics() {

    const totalComplaints =
        document.getElementById(
            "totalComplaints"
        );

    const pendingComplaints =
        document.getElementById(
            "pendingComplaints"
        );

    const resolvedComplaints =
        document.getElementById(
            "resolvedComplaints"
        );

    const emergencyComplaints =
        document.getElementById(
            "emergencyComplaints"
        );

    if (!totalComplaints ||
        !pendingComplaints ||
        !resolvedComplaints ||
        !emergencyComplaints
    ) {
        return;
    }

    let total =
        complaints.length;

    let pending =
        complaints.filter(
            function(item) {

                return (
                    item.status ===
                    "Submitted"
                );

            }
        ).length;

    let resolved =
        complaints.filter(
            function(item) {

                return (
                    item.status ===
                    "Resolved"
                );

            }
        ).length;

    let emergency =
        complaints.filter(
            function(item) {

                return (
                    item.priority ===
                    "Emergency"
                );

            }
        ).length;

    totalComplaints.innerHTML =
        total;

    pendingComplaints.innerHTML =
        pending;

    resolvedComplaints.innerHTML =
        resolved;

    emergencyComplaints.innerHTML =
        emergency;

}

loadDashboardStatistics();


// =====================================
// REFRESH DASHBOARD BUTTON
// =====================================

const refreshDashboardButton =
    document.getElementById(
        "refreshDashboardButton"
    );

if (
    refreshDashboardButton
) {

    refreshDashboardButton
        .addEventListener(
            "click",
            function() {

                complaints =
                    JSON.parse(
                        localStorage.getItem(
                            "complaints"
                        )
                    ) || [];

                loadDashboardStatistics();

                alert(
                    "Dashboard Refreshed Successfully"
                );

            }
        );

}
// =====================================
// COMPLAINT MANAGEMENT SYSTEM
// =====================================

function loadComplaintManagement() {

    const complaintManagementContainer =
        document.getElementById(
            "complaintManagementContainer"
        );

    if (!complaintManagementContainer) {
        return;
    }

    if (
        complaints.length === 0
    ) {

        complaintManagementContainer.innerHTML =
            `
        <p>
            No Complaints Available
        </p>
        `;

        return;
    }

    let html = "";

    complaints.forEach(
        function(complaint) {

            html +=
                `
            <div class="complaint-card">

                <h3>
                    ${complaint.id}
                </h3>

                <p>
                    <strong>Student Name:</strong>
                    ${complaint.studentName}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${complaint.category}
                </p>

                <p>
                    <strong>Priority:</strong>
                    ${complaint.priority}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${complaint.status}
                </p>

                <hr>

            </div>
            `;
        }
    );

    complaintManagementContainer.innerHTML =
        html;

}

loadComplaintManagement(); // =====================================
// ADMIN STATUS UPDATE SYSTEM
// =====================================

const statusUpdateForm =
    document.getElementById(
        "statusUpdateForm"
    );

if (statusUpdateForm) {

    statusUpdateForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const complaintId =
                document.getElementById(
                    "statusComplaintId"
                ).value.trim();

            const newStatus =
                document.getElementById(
                    "statusSelection"
                ).value;

            const adminRemarks =
                document.getElementById(
                    "adminRemarks"
                ).value;

            const complaint =
                complaints.find(
                    function(item) {

                        return (
                            item.id.toUpperCase() ===
                            complaintId.toUpperCase()
                        );

                    }
                );

            if (!complaint) {

                alert(
                    "Complaint ID Not Found"
                );

                return;

            }

            complaint.status =
                newStatus;

            complaint.adminRemarks =
                adminRemarks;

            complaint.lastUpdated =
                new Date()
                .toLocaleString();

            saveComplaints();

            loadDashboardStatistics();

            loadComplaintManagement();

            alert(
                "Complaint Status Updated Successfully"
            );

            statusUpdateForm.reset();

        }
    );

} // =====================================
// DISPLAY ADMIN REMARKS
// =====================================

function displayComplaintRemarks(
    complaint
) {

    const remarksContainer =
        document.getElementById(
            "adminRemarksContainer"
        );

    if (!remarksContainer) {
        return;
    }

    remarksContainer.innerHTML =
        `
    <h3>
        Administrative Remarks
    </h3>

    <p>
        ${complaint.adminRemarks || "No Remarks Available"}
    </p>
    `;
}
// =====================================
// PERMISSION REQUEST SYSTEM
// =====================================

const permissionForm =
    document.getElementById(
        "permissionForm"
    );

if (permissionForm) {

    permissionForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const permissionId =
                "PER" +
                String(
                    permissions.length + 1
                ).padStart(
                    3,
                    "0"
                );

            const permission = {

                id: permissionId,

                studentName: document.getElementById(
                    "studentName"
                ).value,

                registerNumber: document.getElementById(
                    "registerNumber"
                ).value,

                roomNumber: document.getElementById(
                    "roomNumber"
                ).value,

                phoneNumber: document.getElementById(
                    "phoneNumber"
                ).value,

                permissionType: document.getElementById(
                    "permissionType"
                ).value,

                requestDate: document.getElementById(
                    "requestDate"
                ).value,

                departureDate: document.getElementById(
                    "departureDate"
                ).value,

                returnDate: document.getElementById(
                    "returnDate"
                ).value,

                returnTime: document.getElementById(
                    "returnTime"
                ).value,

                reason: document.getElementById(
                    "reason"
                ).value,

                status: "Pending",

                submittedOn: new Date()
                    .toLocaleString()

            };

            permissions.push(
                permission
            );

            savePermissions();
            loadPermissionHistory();

            const permissionStatusContainer =
                document.getElementById(
                    "permissionStatusContainer"
                );

            if (
                permissionStatusContainer
            ) {

                permissionStatusContainer.innerHTML =
                    `
                <h3>
                    Permission Request Submitted Successfully
                </h3>

                <p>
                    Permission ID:
                    ${permissionId}
                </p>

                <p>
                    Status:
                    Pending
                </p>
                `;
            }

            alert(
                "Permission Request Submitted Successfully"
            );

            permissionForm.reset();

        }
    );

}
// =====================================
// PERMISSION HISTORY SYSTEM
// =====================================

function loadPermissionHistory() {

    const permissionHistoryContainer =
        document.getElementById(
            "permissionHistoryContainer"
        );

    if (!permissionHistoryContainer) {
        return;
    }

    if (
        permissions.length === 0
    ) {

        permissionHistoryContainer.innerHTML =
            `
        <p>
            No Permission Requests Available
        </p>
        `;

        return;
    }

    let html = "";

    permissions.forEach(
        function(permission) {

            html +=
                `
            <div class="permission-card">

                <h3>
                    ${permission.id}
                </h3>

                <p>
                    <strong>Student Name:</strong>
                    ${permission.studentName}
                </p>

                <p>
                    <strong>Permission Type:</strong>
                    ${permission.permissionType}
                </p>

                <p>
                    <strong>Departure Date:</strong>
                    ${permission.departureDate}
                </p>

                <p>
                    <strong>Return Date:</strong>
                    ${permission.returnDate}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${permission.status}
                </p>

                <hr>

            </div>
            `;
        }
    );

    permissionHistoryContainer.innerHTML =
        html;

}

loadPermissionHistory();
// =====================================
// ADMIN PERMISSION APPROVAL SYSTEM
// =====================================

const permissionActionForm =
    document.getElementById(
        "permissionActionForm"
    );

if (permissionActionForm) {

    permissionActionForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const permissionId =
                document.getElementById(
                    "permissionId"
                ).value.trim();

            const decision =
                document.getElementById(
                    "permissionDecision"
                ).value;

            const remarks =
                document.getElementById(
                    "permissionRemarks"
                ).value;

            const permission =
                permissions.find(
                    function(item) {

                        return (
                            item.id.toUpperCase() ===
                            permissionId.toUpperCase()
                        );

                    }
                );

            if (!permission) {

                alert(
                    "Permission ID Not Found"
                );

                return;
            }

            permission.status =
                decision;

            permission.adminRemarks =
                remarks;

            permission.lastUpdated =
                new Date()
                .toLocaleString();

            savePermissions();

            loadPermissionHistory();

            loadPermissionRequests();

            alert(
                "Permission Updated Successfully"
            );

            permissionActionForm.reset();

        }
    );

}
// =====================================
// LOAD PERMISSION REQUESTS IN ADMIN
// =====================================

function loadPermissionRequests() {

    const container =
        document.getElementById(
            "permissionRequestContainer"
        );

    if (!container) {
        return;
    }

    if (permissions.length === 0) {

        container.innerHTML =
            `
        <p>
            No Permission Requests Available
        </p>
        `;

        return;
    }

    let html = "";

    permissions.forEach(
        function(permission) {

            html +=
                `
            <div class="permission-card">

                <h3>
                    ${permission.id}
                </h3>

                <p>
                    <strong>Student Name:</strong>
                    ${permission.studentName}
                </p>

                <p>
                    <strong>Permission Type:</strong>
                    ${permission.permissionType}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${permission.status}
                </p>

                <p>
                    <strong>Reason:</strong>
                    ${permission.reason}
                </p>

                <hr>

            </div>
            `;
        }
    );

    container.innerHTML = html;

}

loadPermissionRequests();
// =====================================
// NOTICE BOARD SYSTEM
// =====================================

const noticeForm =
    document.getElementById(
        "noticeForm"
    );

if (noticeForm) {

    noticeForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const noticeId =
                "NOT" +
                String(
                    notices.length + 1
                ).padStart(
                    3,
                    "0"
                );

            const notice = {

                id: noticeId,

                title: document.getElementById(
                    "noticeTitle"
                ).value,

                category: document.getElementById(
                    "noticeCategory"
                ).value,

                description: document.getElementById(
                    "noticeDescription"
                ).value,

                publishedDate: new Date()
                    .toLocaleString()

            };

            notices.push(
                notice
            );

            saveNotices();

            loadPublishedNotices();

            loadStudentNotices();

            alert(
                "Notice Published Successfully"
            );

            noticeForm.reset();

        }
    );

}
// =====================================
// LOAD PUBLISHED NOTICES
// =====================================

function loadPublishedNotices() {

    const container =
        document.getElementById(
            "publishedNoticeContainer"
        );

    if (!container) {
        return;
    }

    if (notices.length === 0) {

        container.innerHTML =
            `
        <p>
            No Notices Published
        </p>
        `;

        return;
    }

    let html = "";

    notices.forEach(
        function(notice) {

            html +=
                `
            <div class="notice-card">

                <h3>
                    ${notice.title}
                </h3>

                <p>
                    <strong>Notice ID:</strong>
                    ${notice.id}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${notice.category}
                </p>

                <p>
                    ${notice.description}
                </p>

                <p>
                    <strong>Published:</strong>
                    ${notice.publishedDate}
                </p>

                <hr>

            </div>
            `;
        }
    );

    container.innerHTML =
        html;

}

loadPublishedNotices();
// =====================================
// STUDENT NOTICE BOARD DISPLAY
// =====================================

function loadStudentNotices() {

    const emergencyContainer =
        document.getElementById(
            "emergencyNoticeContainer"
        );

    const recentContainer =
        document.getElementById(
            "recentNoticeContainer"
        );

    const maintenanceContainer =
        document.getElementById(
            "maintenanceNoticeContainer"
        );

    const messContainer =
        document.getElementById(
            "messNoticeContainer"
        );

    const sportsContainer =
        document.getElementById(
            "sportsEventContainer"
        );

    const allContainer =
        document.getElementById(
            "allNoticesContainer"
        );

    if (!allContainer) {
        return;
    }

    allContainer.innerHTML = "";

    if (emergencyContainer)
        emergencyContainer.innerHTML = "";

    if (recentContainer)
        recentContainer.innerHTML = "";

    if (maintenanceContainer)
        maintenanceContainer.innerHTML = "";

    if (messContainer)
        messContainer.innerHTML = "";

    if (sportsContainer)
        sportsContainer.innerHTML = "";

    if (notices.length === 0) {

        allContainer.innerHTML =
            "<p>No Notices Available</p>";

        return;
    }

    notices.forEach(function(notice) {

        const card =
            `
        <div class="notice-card">

            <h3>${notice.title}</h3>

            <p>
                <strong>Category:</strong>
                ${notice.category}
            </p>

            <p>
                ${notice.description}
            </p>

            <p>
                <strong>Date:</strong>
                ${notice.publishedDate}
            </p>

            <hr>

        </div>
        `;

        allContainer.innerHTML += card;

        if (recentContainer)
            recentContainer.innerHTML += card;

        if (
            notice.category ===
            "Emergency" &&
            emergencyContainer
        ) {
            emergencyContainer.innerHTML += card;
        }

        if (
            notice.category ===
            "Maintenance" &&
            maintenanceContainer
        ) {
            maintenanceContainer.innerHTML += card;
        }

        if (
            notice.category ===
            "Mess" &&
            messContainer
        ) {
            messContainer.innerHTML += card;
        }

        if (
            (
                notice.category ===
                "Sports" ||
                notice.category ===
                "Event"
            ) &&
            sportsContainer
        ) {
            sportsContainer.innerHTML += card;
        }

    });

}

loadStudentNotices(); // =====================================
// NOTICE SEARCH SYSTEM
// =====================================

const noticeSearchForm =
    document.getElementById(
        "noticeSearchForm"
    );

if (noticeSearchForm) {

    noticeSearchForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const searchText =
                document.getElementById(
                    "noticeSearch"
                )
                .value
                .toLowerCase();

            const allContainer =
                document.getElementById(
                    "allNoticesContainer"
                );

            if (!allContainer) {
                return;
            }

            let html = "";

            notices.forEach(
                function(notice) {

                    if (
                        notice.title
                        .toLowerCase()
                        .includes(
                            searchText
                        )
                    ) {

                        html +=
                            `
                        <div class="notice-card">

                            <h3>
                                ${notice.title}
                            </h3>

                            <p>
                                <strong>Category:</strong>
                                ${notice.category}
                            </p>

                            <p>
                                ${notice.description}
                            </p>

                        </div>
                        `;
                    }

                }
            );

            if (html === "") {

                html =
                    `
                <p>
                    No Notices Found
                </p>
                `;
            }

            allContainer.innerHTML =
                html;

        }
    );

}