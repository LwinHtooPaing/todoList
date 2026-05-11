import {
  deleteAllBtn,
  doneTotalTask,
  inputTask,
  listGroup,
  noList,
  todoTemplate,
  totalTask,
} from "./selector";
import { v4 as uuidv4 } from "uuid";
export const addBtnHandler = () => {
  if (inputTask.value.trim() === "") {
    Swal.fire({
      title: "Fill input",
      icon: "warning",
      text: "Hey there, don't forget to fill the task!",
    });
    return;
  }
  listGroup.append(templateHandler(inputTask.value));
  inputTask.value = "";
  totalList();
  deleteAllBtnHandler();
};

export const templateHandler = (list) => {
  const todoTask = todoTemplate.content.cloneNode(true);
  const listText = todoTask.querySelector("#todoText");
  const listId = todoTask.querySelector(".todoListTemplateCard");
  let uniqueId = "list-" + uuidv4();
  // if (list.value.trim() === null) {
  //   alert("you need to fill the input");
  // }
  listText.innerText = list;
  listId.setAttribute("id", uniqueId);
  return todoTask;
};

export const checkBoxHandler = (event) => {
  if (event.target.classList.contains("checkBox")) {
    const templateCard = event.target.closest(".todoListTemplateCard");
    const todoText = event.target
      .closest(".todoListTemplateCard")
      .querySelector("#todoText");
    const editBtn = event.target
      .closest(".todoListTemplateCard")
      .querySelector(".editBtn");
    const delBtn = event.target
      .closest(".todoListTemplateCard")
      .querySelector(".deleteBtn");
    todoText.classList.toggle("line-through");
    templateCard.classList.toggle("scale-85");
    templateCard.classList.add("duration-200");
    if (event.target.checked) {
      editBtn.setAttribute("disabled", true);
      todoText.classList.add("opacity-50");
      editBtn.classList.add("opacity-50");
    } else {
      editBtn.removeAttribute("disabled", true);
      todoText.classList.remove("opacity-50");
      editBtn.classList.remove("opacity-50");
    }
  }
  updateDoneTask();
};

//deleting List
export const deleteBtnHandler = (id) => {
  const delId = listGroup.querySelector(`#${id}`);
  delId.remove();
};

export const deleteList = (event) => {
  if (event.target.classList.contains("deleteBtn")) {
    const delList = event.target.closest(".todoListTemplateCard");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      deleteBtnHandler(delList.id);
      totalList();
      updateDoneTask();
      deleteAllBtnHandler();
    });

    // checkScroll();
  }
};

//editing list
export const editBtnHandler = (id) => {
  const editId = listGroup.querySelector(`#${id}`);
  const textPart = editId.querySelector(".textPart");
  const delBtn = editId.querySelector(".deleteBtn");
  const newInput = document.createElement("input");
  newInput.classList.add(
    "border",
    "border-white",
    "rounded",
    "text-white",
    "font-serif",
    "tracking-wide",
  );
  const existedText = editId.querySelector("#todoText");
  existedText.classList.toggle("hidden");
  newInput.value = existedText.innerText;
  textPart.prepend(newInput);
  newInput.focus();
  delBtn.setAttribute("disabled", true);
  delBtn.classList.add("opacity-50", "size-2");

  newInput.addEventListener("blur", () => {
    newInput.remove();
    delBtn.removeAttribute("disabled", true);
    delBtn.classList.remove("opacity-50", "size-2");
    existedText.innerText = newInput.value;
    existedText.classList.remove("hidden");
  });
};

export const editList = (event) => {
  if (event.target.classList.contains("editBtn")) {
    const test = event.target.closest(".todoListTemplateCard");
    editBtnHandler(test.id);
  }
};

//totalList
export const totalList = () => {
  totalTask.innerText = listGroup.children.length;
  if (listGroup.children.length >= 1) {
    noList.classList.add("hidden");
  } else {
    noList.classList.remove("hidden");
  }
};

export const updateDoneTask = () => {
  const doneTask = listGroup.querySelectorAll(
    ".todoListTemplateCard input:checked",
  );
  doneTotalTask.innerText = doneTask.length;
};

export const checkScroll = () => {
  if (listGroup.children.length >= 7) {
    listGroup.classList.add("overflow-y-auto", "max-h-[400px]");
  } else {
    listGroup.classList.remove("overflow-y-auto", "max-h-[400px]");
  }
};

export const deleteAllBtnHandler = () => {
  if (listGroup.children.length >= 1) {
    deleteAllBtn.classList.remove("hidden");
  } else {
    deleteAllBtn.classList.add("hidden");
  }
};

export const deleteAllList = () => {
  const allList = listGroup.querySelectorAll(".todoListTemplateCard");
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed)
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    allList.forEach((list) => {
      list.remove();
      deleteAllBtnHandler();
      updateDoneTask();
      totalList();
    });
  });
};
