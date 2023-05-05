const tableBody = document.querySelector(".table tbody");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const sortButtons = document.querySelectorAll(".sort-button");

let studentsData = [];

// Function to fetch JSON data and populate the table
async function fetchStudentsData() {
  const response = await fetch("MOCK_DATA.json");
  const data = await response.json();
  studentsData = data.students;
  populateTable(studentsData);
}

// Function to populate the table with data
function populateTable(data) {
  tableBody.innerHTML = "";
  data.forEach((student) => {
    const { id, first_name, last_name, email, marks, passing, class: studentClass, gender } = student;
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td><img src="${student.pic}" alt="${first_name}" class="student-image">${first_name} ${last_name}</td>
      <td>${email}</td>
      <td>${marks}</td>
      <td>${passing ? "Passing" : "Failed"}</td>
      <td>${studentClass}</td>
      <td>${gender}</td>
    `;
    row.setAttribute("data-id", id);
  });
}

// Event listener to filter table data on search
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filteredData = studentsData.filter((student) => {
    return (
      student.first_name.toLowerCase().includes(searchTerm) ||
      student.last_name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
    );
  });
  populateTable(filteredData);
});

// Event listener to sort table data on button click
sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sortBy = button.getAttribute("data-sort");
    switch (sortBy) {
      case "name-asc":
        studentsData.sort((a, b) => a.first_name.localeCompare(b.first_name));
        break;
      case "name-desc":
        studentsData.sort((a, b) => b.first_name.localeCompare(a.first_name));
        break;
      case "marks":
        studentsData.sort((a, b) => a.marks - b.marks);
        break;
      case "passing":
        const passingData = studentsData.filter((student) => student.passing);
        populateTable(passingData);
        return;
      case "class":
        studentsData.sort((a, b) => a.class.localeCompare(b.class));
        break;
      case "gender":
        const femaleData = studentsData.filter((student) => student.gender === "female");
        const maleData = studentsData.filter((student) => student.gender === "male");
        tableBody.innerHTML = "";
        populateTable(femaleData);
        populateTable(maleData);
        return;
    }
    populateTable(studentsData);
  });
});

// Call the function to fetch JSON data and populate the table
fetchStudentsData();
