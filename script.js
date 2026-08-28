const STORAGE_KEY = "students";

function getStudents() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveStudents(students) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function calculateGrade(marks) {
    marks = Number(marks);

    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}

/* Add Student */

const studentForm = document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const rollNumber = document.getElementById("rollNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const dob = document.getElementById("dob").value;
        const gender = document.getElementById("gender").value;
        const department = document.getElementById("department").value;
        const year = document.getElementById("year").value;
        const section = document.getElementById("section").value.trim();
        const marks = Number(document.getElementById("marks").value);
        const address = document.getElementById("address").value.trim();

        const message = document.getElementById("message");

        if (!name || !rollNumber || !email || !phone) {
            showMessage(
                "Please fill in all required fields.",
                "error"
            );
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage(
                "Please enter a valid email address.",
                "error"
            );
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            showMessage(
                "Phone number must contain exactly 10 digits.",
                "error"
            );
            return;
        }

        if (!department || !year || !gender) {
            showMessage(
                "Please select gender, department and year.",
                "error"
            );
            return;
        }

        if (marks < 0 || marks > 100 || isNaN(marks)) {
            showMessage(
                "Marks must be between 0 and 100.",
                "error"
            );
            return;
        }

        const students = getStudents();

        const rollExists = students.some(
            student => student.rollNumber.toLowerCase() === rollNumber.toLowerCase()
        );

        if (rollExists) {
            showMessage(
                "This roll number already exists.",
                "error"
            );
            return;
        }

        const student = {
            id: Date.now(),
            name,
            rollNumber,
            email,
            phone,
            dob,
            gender,
            department,
            year,
            section,
            marks,
            address,
            grade: calculateGrade(marks)
        };

        students.push(student);
        saveStudents(students);

        showMessage(
            "Student added successfully!",
            "success"
        );

        studentForm.reset();
    });
}

function showMessage(text, type) {
    const message = document.getElementById("message");

    if (!message) return;

    message.innerHTML = `
        <div class="${type}-message">
            ${text}
        </div>
    `;

    setTimeout(() => {
        message.innerHTML = "";
    }, 3000);
}

/* Student List */

const studentTableContainer =
    document.getElementById("studentTableContainer");

if (studentTableContainer) {
    displayStudents();

    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", function () {
        displayStudents(this.value);
    });
}

function displayStudents(searchText = "") {

    const container =
        document.getElementById("studentTableContainer");

    if (!container) return;

    const students = getStudents();

    const search = searchText.toLowerCase().trim();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(search) ||
        student.rollNumber.toLowerCase().includes(search)
    );

    if (filteredStudents.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h2>No Students Found</h2>
                <p>Please add a student first.</p>
                <br>
                <a href="add-student.html" class="btn primary-btn">
                    Add New Student
                </a>
            </div>
        `;

        return;
    }

    let tableHTML = `
        <div class="table-container">
            <table class="student-table">

                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Roll Number</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Marks</th>
                        <th>Grade</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
    `;

    filteredStudents.forEach((student, index) => {

        tableHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${escapeHTML(student.name)}</td>
                <td>${escapeHTML(student.rollNumber)}</td>
                <td>${escapeHTML(student.email)}</td>
                <td>${escapeHTML(student.phone)}</td>
                <td>${escapeHTML(student.department)}</td>
                <td>${escapeHTML(student.year)}</td>
                <td>${student.marks}</td>
                <td class="grade">${student.grade}</td>
                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${student.id})"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    tableHTML += `
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = tableHTML;
}

/* Delete Student */

function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    let students = getStudents();

    students = students.filter(student => student.id !== id);

    saveStudents(students);

    const searchInput = document.getElementById("searchInput");

    displayStudents(
        searchInput ? searchInput.value : ""
    );
}

/* Security Helper */

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}
