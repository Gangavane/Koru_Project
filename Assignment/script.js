function submitForm(){
// Retrieve the data from the data.json file
fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(data => {
    // Sort the data by ID initially
    data.sort((a, b) => a.id - b.id);
    
    // Display the data in the table
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    
    data.forEach(item => {
      const row = document.createElement('tr');
     // row.draggable = true;
     row.setAttribute('draggable', true);
      row.innerHTML = `
      <td>${item.id}</td>
              <td>${item.name}</td>
               <td>${item.email}</td>
               <td>${item.password}</td>
               <button data-id="${item.id}">Delete</button>
      `;
      
      tableBody.appendChild(row);
      
    });
  })
  .catch(error => console.error(error));
}
  // Handle the delete action
document.addEventListener("click", event => {
  if (event.target.matches("button[data-id]")) {
    const userId = event.target.getAttribute("data-id");
    fetch(`http://localhost:3000/users/${userId}`, { method: "DELETE" })
      .then(() => {
        event.target.closest("tr").remove();
      })
      .catch(error => console.error(error));
  }
});
const table = document.querySelector('#userTable tbody')
let draggingRow;

table.addEventListener('dragstart', event => {
  draggingRow = event.target;
  event.dataTransfer.setData('text/plain', draggingRow.id);
});

table.addEventListener('dragover', event => {
  event.preventDefault();
  const targetRow = event.target.closest('tr');
  if (targetRow && targetRow !== draggingRow) {
    table.insertBefore(draggingRow, targetRow);
  }
});

table.addEventListener('dragend', event => {
  draggingRow = null;
});

function swapRows(fromIndex, toIndex) {
  console.log("rows--->swapRows",  );
  const tableBody = document.getElementById('userTableBody');
  const rows = Array.from(tableBody.querySelectorAll('tr'));
  const [row] = rows.splice(fromIndex, 1);
  rows.splice(toIndex, 0, row);
  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}

  // Sort the table when a column header is clicked
function sortTable(column) {
  const table = document.querySelector('userTable');
  const rows = Array.from(table.querySelectorAll('tr'));
  
  const sortedRows = rows.slice(1).sort((a, b) => {
    const aCol = a.querySelectorAll('td')[column].textContent.trim();
    const bCol = b.querySelectorAll('td')[column].textContent.trim();
    
    return isNaN(aCol) || isNaN(bCol) ?
      aCol.localeCompare(bCol) :
      parseFloat(aCol) - parseFloat(bCol);
  });
  
  table.tBodies[0].append(...sortedRows);
}



function validateForm() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
 
	if (username === '' || password === '') {
		alert("Please fill in all fields.");   
		return false;   
	} 
  else{   
    return true;
  }
}
