let id = document.getElementById("id");
let submitBtn = document.getElementById("submit");
let submitAllBtn = document.getElementById("submitAll");
let formSubmit = document.getElementById("myForm");
let select = document.getElementById("select");
//A generic function that uses fetch to GET a URL and return the responses
function fetchData(url, id = "") {
  const apiUrl = id
    ? `https://rickandmortyapi.com/api/${url}/${id}`
    : `https://rickandmortyapi.com/api/${url}`;

  return fetch(apiUrl, {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network was not ok");
    }
    return response.json();
  });
}

// Function to update the DOM with data from "jsonResponse"
function updateDOM(data) {
  const outputContainer = document.getElementById("output");
  outputContainer.innerHTML = "";
  // Check if data is an array (Show All) or a single object
  if (Array.isArray(data.results)) {
    // Display all items in the array
    data.results.forEach((item) => {
      const listItem = document.createElement("li");

      // Customize the output based on the type of data
      if (item.type !== undefined) {
        // For locations
        listItem.textContent = `ID: ${item.id || "N/A"}, Name: ${
          item.name || "N/A"
        }, Type: ${item.type || "N/A"}, Dimension: ${item.dimension || "N/A"}`;
      } else if (item.status !== undefined) {
        // For characters
        listItem.textContent = `ID: ${item.id || "N/A"}, Name: ${
          item.name || "N/A"
        }, Status: ${item.status || "N/A"}, Species: ${item.species || "N/A"}`;
      } else if (item.episode !== undefined) {
        // For episodes
        listItem.textContent = `ID: ${item.id || "N/A"}, Name: ${
          item.name || "N/A"
        }, Episode: ${item.episode || "N/A"}, Air Date: ${
          item.air_date || "N/A"
        }`;
      }

      outputContainer.appendChild(listItem);
    });
  } else {
    // Display a single object
    const listItem = document.createElement("li");

    // Customize the output based on the type of data
    if (data.type !== undefined) {
      // For locations
      listItem.textContent = `ID: ${data.id || "N/A"}, Name: ${
        data.name || "N/A"
      }, Type: ${data.type || "N/A"}, Dimension: ${data.dimension || "N/A"}`;
    } else if (data.status !== undefined) {
      // For characters
      listItem.textContent = `ID: ${data.id || "N/A"}, Name: ${
        data.name || "N/A"
      }, Status: ${data.status || "N/A"}, Species: ${data.species || "N/A"}`;
    } else if (data.episode !== undefined) {
      // For episodes
      listItem.textContent = `ID: ${data.id || "N/A"}, Name: ${
        data.name || "N/A"
      }, Episode: ${data.episode || "N/A"}, Air Date: ${
        data.air_date || "N/A"
      }`;
    }

    outputContainer.appendChild(listItem);
  }
}

//ID, Name, type, dimension
//A function that can GET all locations or a single location
function getLocation(id) {
  const url = "location";
  fetchData(url, id).then((jsonResponse) => {
    updateDOM(jsonResponse);
  });
}

//ID, Name, Status, species
//A function that can GET all characters or a single character
function getCharacter(id) {
  const url = "character";
  fetchData(url, id).then((jsonResponse) => {
    updateDOM(jsonResponse);
  });
}

//id, name, episode, air_date
//A function that can GET all episodes or a single episode
function getEpisode(id) {
  const url = "episode";
  fetchData(url, id).then((jsonResponse) => {
    updateDOM(jsonResponse);
  });
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const inputId = id.value;

  // Check if the inputId is empty before making the API call
  if (inputId.trim() !== "") {
    // Determine which function to call based on the user's selection
    if (select.value === "location") {
      getLocation(inputId);
    } else if (select.value === "character") {
      getCharacter(inputId);
    } else if (select.value === "episode") {
      getEpisode(inputId);
    }
  } else {
    alert("Please enter an ID before clicking 'Show'.");
  }
});

submitAllBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Call the fetchData function without specifying an ID for all items
  if (select.value === "location") {
    fetchData("location").then((jsonResponse) => {
      updateDOM(jsonResponse);
    });
  } else if (select.value === "character") {
    fetchData("character").then((jsonResponse) => {
      updateDOM(jsonResponse);
    });
  } else if (select.value === "episode") {
    fetchData("episode").then((jsonResponse) => {
      updateDOM(jsonResponse);
    });
  }
});
