import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showExercises } from "./exercises.js";

let addEditDiv = null;
let exerciseName = null;
let bodyPart = null;
let personalBestStatus = null;
let addingExercise = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-exercise");
  exerciseName = document.getElementById("exercise-name");
  bodyPart = document.getElementById("body-part");
  personalBestStatus = document.getElementById("personal-best-status");
  addingExercise = document.getElementById("adding-exercise");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingExercise) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/exercises";

        if (addingExercise.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/exercises/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              exerciseName: exerciseName.value,
              bodyPart: bodyPart.value,
              personalBestStatus: personalBestStatus.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The exercise entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The exercise entry was created.";
            }

            exerciseName.value = "";
            bodyPart.value = "";
            personalBestStatus.value = "No personal record";
            showExercises();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showExercises();
      }
    }
  });
};

export const showAddEdit = async (exerciseId) => {
  if (!exerciseId) {
    exerciseName.value = "";
    bodyPart.value = "";
    personalBestStatus.value = "No personal record";
    addingExercise.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/exercises/${exerciseId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        exerciseName.value = data.exercise.company;
        bodyPart.value = data.exercise.position;
        personalBestStatus.value = data.exercise.status;
        addingExercise.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = exerciseId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The exercises entry was not found";
        showExercises();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showExercises();
    }

    enableInput(true);
  }
};
