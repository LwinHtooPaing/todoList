import {
  addBtnHandler,
  checkBoxHandler,
  deleteAllList,
  deleteList,
  editList,
} from "./handler";
import { addBtn, deleteAllBtn, listGroup } from "./selector";

const listener = () => {
  addBtn.addEventListener("click", addBtnHandler);
  listGroup.addEventListener("click", checkBoxHandler);
  listGroup.addEventListener("click", deleteList);
  listGroup.addEventListener("click", editList);
  deleteAllBtn.addEventListener("click", deleteAllList);
};

export default listener;
