import { enableInput, inputEnabled, message, token } from "./index.js";
import { showExercises } from "./exercises.js";

let exercisesTable = null;

export const handleDelete = () => {
  exercisesTable = document.getElementById("exercises-table");

  exercisesTable.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target.classList.contains("deleteButton")) {
        enableInput(false);

        let method = "DELETE";
        const exerciseId = e.target.dataset.id;
        const url = `/api/v1/exercises/${exerciseId}`;

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (response.status === 200) {
            // a 200 is expected for a successful delete
            message.textContent = "The exercise entry was deleted.";
            showExercises();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      }
    }
  });
};
