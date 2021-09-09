/////////////////////////////////////////
//         GET ELEMENTS
/////////////////////////////////////////
let main = document.getElementById("main-content");
let sections = main.getElementsByTagName("section");
// MODAL ELEMENTS
let modal = document.getElementById("modal");
let modalBtn = document.getElementById("modal-btn");
let modalDetails = document.getElementById("assignment-details");
// PREFERENCE PANEL ELEMENTS
let panel = document.getElementById("preference-panel");
let bgColorPicker = document.getElementById("background-color-picker");
let fontColorPicker = document.getElementById("font-color-picker");
let fontSizeSlider = document.getElementById("font-range-slider");
let sliderDisplay = document.getElementById("slider-displayed-font-size");
// PREFERENCE PANEL BUTTONS
let prefsResetDefaults = document.getElementById("prefs-reset-defaults-btn");
let prefsSaveButton = document.getElementById("prefs-save-btn");
let prefsCancelButton = document.getElementById("prefs-cancel-btn");
// CONTACT SECTION ELEMENTS
let checkBoxes = document.getElementsByName("interests");
// TEST BUTTON
// let testBtn = document.getElementById("test-btn");
// USERNAME SECTION ELEMENTS
let usernameDisplay = document.getElementById("username");
let resetUsernameBtn = document.getElementById("reset-username-btn");
// ANIMATION SECTION ELEMENTS
let animationStartBtn = document.getElementById("animation-start-btn");
let animationPauseBtn = document.getElementById("animation-pause-btn");
let animationTarget = document.getElementById("animation-target");
let animationSpeedSlider = document.getElementById("animation-speed-slider");
let animationDurationDisplay = document.getElementById(
  "animation-duration-display"
);

// GALLERY SLIDE SHOW ELEMENTS
let allSlides = document.getElementsByClassName("slides");
let bullets = document.getElementsByClassName("bullet");
let slideIdx = 1;

// LOCATION SECTION ELEMENTS
let getLocationBtn = document.getElementById("get-location");
let latDisplay = document.getElementById("lat-display");
let longDisplay = document.getElementById("long-display");
let bingMap = document.getElementById("bing-map");
// NAV SECTION ELEMENTS
let burger = document.getElementById("burger");
let menuLinks = document.getElementById("main-page-links-list");
console.log(menuLinks);
/////////////////////////////////////////
//         EVENT LISTENERS
/////////////////////////////////////////
//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<< CLICK >>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
// Event Listener (click) for MODAL BUTTON
modalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  localStorage.setItem("hideModal", "CLICKED");
});

// Event Listener (click) for ANIMATION START BUTTON
animationStartBtn.addEventListener("click", () => {
  animationTarget.style.animationPlayState = "running";
});
// Event Listener (click) for ANIMATION PAUSE BUTTON
animationPauseBtn.addEventListener("click", () => {
  // update the play state to paused
  animationTarget.style.animationPlayState = "paused";
  let audio = new Audio("../audio/sound-effects/Error.mp3");
  // play sound when pause it clicked.
  audio.play();
});

// Event Listener (click) for RESET USERNAME BUTTON
resetUsernameBtn.addEventListener("click", () => {
  //prompt the user
  let username = prompt("Ok, What can I call you then?");
  //save response to local storage
  saveUsernameToLocalStorage(username);
  //display value stored in local storage
  alert("The username has been changed");
  usernameDisplay.textContent = localStorage.username;
  togglePreferencePanel();
});

// Event Listener (click) for TEST BUTTON
// testBtn.addEventListener("click", () => {
//   applyPreferences(testPreferences);
//   // console.log(confirmAtLeast1InterestChecked());
// });

// Event listener (click) for RESET DEFAULTS BUTTON.
prefsResetDefaults.addEventListener("click", () => {
  if (localStorage["defaults"] != null) {
    // apply the preferences to the page
    applyPreferences(getPreferences("defaults"));
    togglePreferencePanel();
  } else {
    console.log(
      "Cannot reset defaults as no default preferences were found in local storage"
    );
  }
});
// Event listener (click) for PREFERENCES SAVE BUTTON.
prefsSaveButton.addEventListener("click", () => {
  // let userPreferences = getPreferencePanelValues();
  savePreferences(getPreferencePanelValues(), "userPreferences");
  togglePreferencePanel();
});
// Event listener (click) for PREFERENCES CANCEL BUTTON.
prefsCancelButton.addEventListener("click", () => {
  if (localStorage["userPreferences"]) {
    applyPreferences(getPreferences("userPreferences"));
    togglePreferencePanel();
  } else {
    applyPreferences(getPreferences("defaults"));
    togglePreferencePanel();
  }
});

// Event listener (click) for GET LOCATION BUTTON.
getLocationBtn.addEventListener("click", () => {
  getAndDisplayLocation();
});

burger.addEventListener("click", () => {
  toggleMenuItems();
});
//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<< CHANGE >>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
// Event listener (change) for ANIMATION SPEED SLIDER.
animationSpeedSlider.addEventListener("change", (e) => {
  // Change the animation duration/Speed.
  animationTarget.style.animationDuration = `${e.target.value}s`;
  // Display the selected value in Seconds.
  animationDurationDisplay.innerHTML = `${e.target.value}s`;
});
// Event listener (change) for FONT SIZE SLIDER.
fontSizeSlider.addEventListener("change", (e) => {
  setPreferencePanelDisplayedFontSize();
});

// Event listener (change) for ANY ELEMENT WITHIN PREFERENCES PANEL
panel.addEventListener("change", () => {
  applyPreferences(getPreferencePanelValues());
});

//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
//<<<<<< ANIMATION ITERATION >>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
// Event listener (animationiteration) for ANIMATION TARGET ELEMENT
animationTarget.addEventListener("animationiteration", () => {
  // Create new Audio object (relative path to audio file)
  let audio = new Audio("../audio/sound-effects/beep.mp3");
  // play audio
  audio.play();
});

//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<< MOUSE >>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
modalDetails.addEventListener("mouseout", () => {
  modalDetails.style.backgroundColor = "Blue";
});
modalDetails.addEventListener("mouseover", () => {
  modalDetails.style.backgroundColor = "lightblue";
});
/////////////////////////////////////////
//        WINDOW ONLOAD
/////////////////////////////////////////
/****************************************
 * Name: Anonymous
 * Purpose: Run specified code when the page is fully loaded
 * Parameters: (0)
 ****************************************/
window.onload = function () {
  if (localStorage.getItem("hideModal") == "CLICKED") {
    modal.style.visibility = "hidden";
  } else {
    modal.style.visibility = "visible";
  }
  //****** Defaults preferences object *******//
  let defaults = {
    backgroundColor: RGBToHex(getComputedStyle(sections[0]).backgroundColor),
    fontSize: parseInt(getComputedStyle(main).fontSize),
    color: RGBToHex(getComputedStyle(main).color),
  };
  //save the defaults to local storage
  savePreferences(defaults, "defaults");
  //****** APPLY PREFERENCES *******//
  // if we have user preferences in local storage apply them and set values of the inputs in the pref panel.
  if (localStorage["userPreferences"] != null) {
    applyPreferences(getPreferences("userPreferences"));
  } else {
    console.log("Window onLoad: No user preferences found in local storage");
    setPreferencePanelValues(getPreferences("defaults"));
  }

  //****** USERNAME *******//
  //Check if a username is present in local storage
  if (localStorage.username === undefined) {
    //if its not present prompt the user.
    let username = prompt("Welcome, What can I call you?");
    saveUsernameToLocalStorage(username);
  }
  // set username display to display whats in local storage
  usernameDisplay.textContent = localStorage.username;
  animationDurationDisplay.innerHTML = `${animationSpeedSlider.value}s`;

  // SHOW FIRST SLIDE
  showSlides(slideIdx);
};
/////////////////////////////////////////
// Function to save and display Username
/////////////////////////////////////////
/****************************************
 * Name: saveAndDisplayUsername()
 * Purpose: Save username to local storage and display it.
 * Parameters: (1) username(string)
 * Returns: no return value
 ****************************************/
function saveUsernameToLocalStorage(username) {
  // username is not null
  if (username) {
    localStorage.setItem("username", username);
  } else {
    localStorage.setItem("username", "None of your bees wax!!!");
  }
}
/////////////////////////////////////////
// Function to set values of the color
// Pickers and range in Prefs panel
/////////////////////////////////////////
/****************************************
 * Name: setPreferencePanelValues()
 * Purpose:
 * Parameters: (1) preferences Object
 * Returns: no return value
 ****************************************/
function setPreferencePanelValues(preferences) {
  bgColorPicker.value = preferences.backgroundColor;
  fontColorPicker.value = preferences.color;
  fontSizeSlider.value = preferences.fontSize;
  setPreferencePanelDisplayedFontSize();
}

/////////////////////////////////////////
//    Preference object for testing
/////////////////////////////////////////
let testPreferences = {
  backgroundColor: "#0000FF",
  fontSize: "22",
  color: "#FF00FF",
};

//////////////////////////////////////////////////
// Function to get values of all pref panel inputs
//////////////////////////////////////////////////
/*************************************************
 * Name: getPreferencePanelValues()
 * Purpose: generate a preferences object from the preference panel values.
 * Params: (0)
 * returns: A preference object - {
 *   backgroundColor: "VALUE",
 *   fontSize: "VALUE",
 *   color: "VALUE",
 * }
 ************************************************/
function getPreferencePanelValues() {
  return {
    backgroundColor: bgColorPicker.value,
    fontSize: fontSizeSlider.value,
    color: fontColorPicker.value,
  };
}

/////////////////////////////////////////
// Function to update displayed font
// size in preference panel
/////////////////////////////////////////
/****************************************
 * Name: setPreferencePanelDisplayedFontSize()
 * purpose:
 *  - get the value of the font-range-slider
 *  - update innerText of slider-displayed-font-size element <td>
 * Parameters: (0)
 * returns: No return value.
 ****************************************/
function setPreferencePanelDisplayedFontSize() {
  sliderDisplay.innerText = `Font size ${fontSizeSlider.value}px`;
}

/////////////////////////////////////////
// FUNCTION TO TOGGLE THE DISPLAY
//   OF USER PREFERENCES PANEL
/////////////////////////////////////////
/****************************************
 * Name: togglePreferencePanel()
 * Purpose: toggle between display block and display none
 * Parameters: (0)
 * returns: No return Value.
 ****************************************/

function togglePreferencePanel() {
  //get css style declaration object of the current computed styling of the element.
  let panelStyle = getComputedStyle(panel);
  if (panelStyle.display == "none") {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }
}
/////////////////////////////////////////
// FUNCTION TO TOGGLE THE DISPLAY
//   OF USER PREFERENCES PANEL
/////////////////////////////////////////
/****************************************
 * Name: togglePreferencePanel()
 * Purpose: toggle between display block and display none
 * Parameters: (0)
 * returns: No return Value.
 ****************************************/

function toggleMenuItems() {
  //get css style declaration object of the current computed styling of the element.
  // let menuStyle = getComputedStyle(menuLinks);
  console.log("getting style");
  if (menuLinks.style.display == "block") {
    menuLinks.style.display = "none";
  } else {
    menuLinks.style.display = "block";
  }
}
/////////////////////////////////////////
//    Function to set preferences
/////////////////////////////////////////
/****************************************
 * Name: applyPreferences()
 * Purpose: Set the <main> font size and color, <section> elements inside <main> Background-color
 * Parameters: (1) name: preferences type: Object
 ****************************************/

function applyPreferences(preferences) {
  if (preferences.backgroundColor != undefined) {
    // iterate through each element in the sections collection and set its backgroundColor to the preferences object backgroundColor.
    for (const section of sections) {
      section.style.backgroundColor = preferences.backgroundColor;
    }
  } else {
    console.log("no key of backgroundColor found in preferences object");
  }

  if (preferences.color != undefined) {
    main.style.color = preferences.color;
  } else {
    console.log("no key of color found in preferences object");
  }

  if (preferences.fontSize != undefined) {
    main.style.fontSize = `${preferences.fontSize}px`;
  } else {
    console.log("no key of fontSize found in preferences object");
  }
  // set the values in the preferences panel
  setPreferencePanelValues(preferences);
}

////////////////////////////////////////////////
// Function to save preferences object in local storage
////////////////////////////////////////////////
/****************************************
 * Name: savePreferences()
 * Purpose:
 * 1 - create a JSON string of the preferences object
 * 2 - Save that JSON string and keyName to Local Storage
 * Parameters: (2) preferences(object), keyName(string)
 * preferences object should have keys of:
 * backgroundColor: "VALUE",
 * fontSize: "VALUE",
 * color: "VALUE",
 * Returns: No return value.
 ****************************************/
function savePreferences(preferences, keyName) {
  let preferencesJSONstring = JSON.stringify(preferences);
  localStorage.setItem(keyName, preferencesJSONstring);
}
////////////////////////////////////////////////
// Function to retrieve preference object from
// local storage by given key name
////////////////////////////////////////////////
/****************************************
 * Name: getPreferences()
 * Purpose:
 *   - get a preferences object from local storage
 *     by a given keyName.
 *   - If it exists returns the preferences object.
 *   - Otherwise return null
 * Parameters: (1) keyName(string)
 * returns: preferences object OR null.
 ****************************************/
function getPreferences(keyName) {
  if (localStorage[keyName] != undefined) {
    console.log(`Preferences Object with keyName ${keyName}`);
    return JSON.parse(localStorage[keyName]);
  } else {
    console.error(
      `No preference Object with keyName: ${keyName} found in local storage`
    );
    return null;
  }
}

////////////////////////////////////////////////
// Test of the savePreferences Function with testPreferences
////////////////////////////////////////////////
// savePreferences(testPreferences, "testSettings");
// let fetchedSettings = getPreferences("testSettings");
// console.log(fetchedSettings);

/////////////////////////////////////////
// Function To confirm if at least 1 checkbox
// has been checked
/////////////////////////////////////////
/****************************************
 * Name: confirmAtLeast1InterestChecked()
 * Purpose: confirm if at least 1 checkbox
 *          has been checked
 * Parameters: (0)
 * Returns: BOOLEAN
 ****************************************/
function confirmAtLeast1InterestChecked() {
  for (let checkbox of checkBoxes) {
    if (checkbox.checked) {
      return true;
    }
  }
  return false;
}

/////////////////////////////////////////
// Function change slide
/////////////////////////////////////////
/****************************************
 * Name: switchSlides()
 * Purpose: (for next/prev btns)add to current slide index
 * Parameters: (1) integer: slide number
 * Returns: no return value
 ****************************************/
function switchSlides(n) {
  showSlides((slideIdx += n));
}
/////////////////////////////////////////
// Function current slide
/////////////////////////////////////////
/****************************************
 * Name: currSlide()
 * Purpose: change current slide index to selected slide
 * Parameters: (1) integer: slide number
 * Returns: no return value
 ****************************************/
// Thumbnail controls
function currSlide(n) {
  showSlides((slideIdx = n));
}
/////////////////////////////////////////
// Function show slide
/////////////////////////////////////////
/****************************************
 * Name: showSlides()
 * Purpose: show selected slide
 * Parameters: (1) integer: slide number
 * Returns: no return value
 ****************************************/
function showSlides(n) {
  let i;

  if (n > allSlides.length) {
    slideIdx = 1;
  }
  if (n < 1) {
    slideIdx = allSlides.length;
  }
  for (i = 0; i < allSlides.length; i++) {
    allSlides[i].style.display = "none";
  }
  for (i = 0; i < bullets.length; i++) {
    bullets[i].className = bullets[i].className.replace(" active", "");
  }
  allSlides[slideIdx - 1].style.display = "block";
  bullets[slideIdx - 1].className += " active";
}
/////////////////////////////////////////
// Function to display user position
/////////////////////////////////////////
/****************************************
 * Name: getAndDisplayLocation()
 * Purpose: Get the users location using the location API and display coords and position on map.
 * Parameters: (0)
 * Returns: no return value
 ****************************************/
function getAndDisplayLocation() {
  if (!navigator.geolocation) {
    latDisplay.textContent = "Geolocation is not supported by your browser";
    longDisplay.textContent = "";
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      latDisplay.textContent += `${lat}`;
      longDisplay.textContent += `${long}`;

      bingMap.src = `https://www.bing.com/maps/embed?h=500&w=500&cp=${lat}~${long}&lvl=11&typ=d&sty=r&src=SHELL&FORM=MBEDV8`;
    });
  }
}
