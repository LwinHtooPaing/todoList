import {
  addBtnHandler,
  checkBoxHandler,
  deleteAllList,
  deleteList,
  editList,
} from "./handler";
import { addBtn, deleteAllBtn, inputTask, listGroup } from "./selector";

const listener = () => {
  addBtn.addEventListener("click", addBtnHandler);
  listGroup.addEventListener("click", checkBoxHandler);
  listGroup.addEventListener("click", deleteList);
  listGroup.addEventListener("click", editList);
  deleteAllBtn.addEventListener("click", deleteAllList);
  inputTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputTask.value.trim() !== "") {
        addBtnHandler();
      } else {
        Swal.fire({
          title: "Fill input",
          icon: "warning",
          text: "Hey there, don't forget to fill the task!",
        });
        return;
      }
    }
  });
};

export default listener;
