//loader config...
window.onload = () => setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
function removeLoader() {
  document.getElementById("loader-wrapper").classList.add("loaded");
}

//extended target user info box config...
const coverer = document.getElementById("coverer");
const chatHeaderInfo = document.querySelector(".chat-info");
const chatExtendedInfoBox = document.querySelector(".extended-info-box");
if (chatExtendedInfoBox) {
  const closeBtn = chatExtendedInfoBox.querySelector(".close-btn");
  chatHeaderInfo.addEventListener("click", () => {
    coverer.classList.add("active");
    chatExtendedInfoBox.classList.add("show");
  });
  closeBtn.addEventListener("click", () => {
    coverer.classList.remove("active");
    chatExtendedInfoBox.classList.remove("show");
  });
  coverer.addEventListener("click", () => {
    closeBtn.click();
  });
}

//more menu config
const moreMenuBtns = [...document.querySelectorAll(".more-menu-btn")];
const moreMenus = [...document.querySelectorAll(".more-menu")];
const editProfileBtns = [...document.querySelectorAll(".edit-profile-btn")];
const editProfileWindow = document.getElementById("edit-profile-window");
const editProfileCloseBtn = editProfileWindow.querySelector(
  ".close-profile-window-btn"
);
const editProfileCancelBtn = document.getElementById("profile-edit-cancel-btn");
const editProfileImg = document.getElementById("edit-profile-img");
const editProfileImgBtn = document.getElementById("edit-profile-img-btn");
const editProfileImgInput = document.getElementById("edit-profile-img-input");
moreMenuBtns.forEach(
  (btn) =>
    (btn.onclick = (e) => {
      e.stopPropagation();
      moreMenus.forEach((menu) => menu.classList.add("shown"));
    })
);
moreMenus.forEach((menu) =>
  menu.addEventListener("click", (e) => e.stopPropagation())
);
editProfileWindow.addEventListener("click", (e) => e.stopPropagation());
window.addEventListener("click", () => {
  if (moreMenus[0].classList.contains("shown")) {
    moreMenus.forEach((menu) => menu.classList.remove("shown"));
  }
});
coverer.addEventListener("click", () => {
  editProfileCloseBtn.click();
});
editProfileBtns.forEach(
  (btn) =>
    (btn.onclick = () => {
      coverer.classList.add("active");
      editProfileWindow.classList.add("shown");
    })
);
editProfileCloseBtn.onclick = () => {
  coverer.classList.remove("active");
  moreMenus.forEach((menu) => menu.classList.remove("shown"));
  editProfileWindow.classList.remove("shown");
};
editProfileCancelBtn.onclick = (e) => {
  e.preventDefault();
  editProfileCloseBtn.click();
};
editProfileImgBtn.onclick = () => {
  editProfileImgInput.click();
};
editProfileImgInput.onchange = (e) => {
  const selectedImg = e.target.files[0];
  editProfileImg.src = URL.createObjectURL(selectedImg);
};

//search user config
const searchBox = document.getElementById("search-box");
const searchThumbnails = [...document.getElementsByClassName("search-bar")];
const searchInput = document.getElementById("search-input");
const closeSearchBtn = document.getElementById("search-close-btn");
const userSearchForm = document.getElementById("user-search-form");
const resultList = document.querySelector(".search-results-list");
searchThumbnails.forEach(
  (thumbnail) =>
    (thumbnail.onclick = () => {
      coverer.classList.add("active");
      searchBox.classList.add("shown");
      searchInput.focus();
    })
);
coverer.addEventListener("click", () => {
  closeSearchBtn.click();
});
closeSearchBtn.addEventListener("click", () => {
  coverer.classList.remove("active");
  searchBox.classList.remove("shown");
});
userSearchForm.onsubmit = (e) => e.preventDefault();
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
searchInput.onkeyup = async (e) => {
  await sleep(500);
  const val = e.target.value;
  if (val === "") return;
  const url = `${userSearchForm.action}?q=${val}`;
  const response = await fetch(url);
  const result = await response.json();
  const data = JSON.parse(result.data);
  resultList.innerHTML = "";
  data.forEach((user) => {
    resultList.innerHTML += `<li>
    <a href="/chat/create_room/${user.fields.username}/" class="chat-thumbnail p-2 d-flex align-items-center">
      <div class="ps-3 d-flex w-100 pe-2 flex-column overflow-hidden">
        <p class="chat-title">
          ${user.fields.username}
        </p>
      </div>
    </a>
    <hr class="hr-line mx-auto my-0" />
  </li>`;
  });
};

//emoji config
window.emojiPicker = new EmojiPicker({
  emojiable_selector: "[data-emojiable=true]",
  assetsPath: "http://onesignal.github.io/emoji-picker/lib/img/",
  popupButtonClasses: "ri-emotion-line",
});
window.emojiPicker.discover();
const emojiInput = document.querySelector('[data-type="input"]');
if (emojiInput) emojiInput.setAttribute("dir", "auto");

//mobile people list toggling
const peopleList = document.getElementById("mobile-people-list");
if (window.location.pathname.length > 1) {
  peopleList.classList.add("d-none");
}

//~~~~~~~~~~~hotbar file config~~~~~~~~~~~~~~~
const uploadStateBox = document.getElementById("upload-state");
const currentUploadState = document.getElementById("current-state");
const currentUploadPercent = document.getElementById("current-percent");
const uploadedSize = document.getElementById("uploaded-size");
const uploadedSizeUnit = document.getElementById("uploaded-size-unit");
const totalSize = document.getElementById("total-size");
const totalSizeUnit = document.getElementById("total-size-unit");
const progressbar = document.getElementById("progress-thumb");
const fileInput = document.getElementById("attachment");
const fileName = document.getElementById("attached-file-name");
const attachmentBtn = document.getElementById("attachment-btn");
const cancelAttachmentBtn = document.getElementById("cancel-attached-file-btn");
const sendBtn = document.getElementById("send-btn");
const messageForm = document.getElementById("message-send-form");
const fileForm = document.getElementById("file-upload-form");
if (uploadStateBox) {
  window.addEventListener("click", () => {
    if (uploadStateBox.classList.contains("shown")) {
      uploadStateBox.classList.remove("shown");
    }
  });
}
uploadStateBox.addEventListener("click", (e) => {
  e.stopPropagation();
});
cancelAttachmentBtn.onclick = () => {
  const isDeleteBtn =
    cancelAttachmentBtn.innerHTML === `<i class="ri-delete-bin-fill"></i>`
      ? true
      : false;
  // If it is in PENDING STATE, reset input's files
  if (fileInput.files.length && isDeleteBtn) {
    fileInput.value = "";
    uploadStateBox.classList.remove("shown");
  }
  // Else if the user wants to cancel ongoing upload
  else if (fileInput.files.length && !isDeleteBtn) {
    if (ajax) ajax.abort();
  }
};
attachmentBtn.onclick = (e) => {
  e.stopPropagation();

  if (fileInput.files.length && !uploadStateBox.classList.contains("shown")) {
    uploadStateBox.classList.add("shown");
  } else if (fileInput.files.length === 0) {
    fileInput.click();
  }
};

fileInput.onchange = () => {
  //if there are any files
  if (fileInput.files.length && !uploadStateBox.classList.contains("shown")) {
    resetUploadStateBox();
    const [name, extension] = fileInput.files[0].name.split(".");
    let shortName = name + "." + extension;
    if (name.length > 10) {
      shortName = name.slice(0, 10) + "... ." + extension;
    }
    const [selectedFileSize, selectedFileSizeUnit] = convertBytes(
      fileInput.files[0].size,
      2
    );
    totalSize.innerText = selectedFileSize;
    totalSizeUnit.innerText = selectedFileSizeUnit;
    fileName.innerHTML = shortName;
    cancelAttachmentBtn.style.display = "flex";
    cancelAttachmentBtn.innerHTML = `<i class="ri-delete-bin-fill"></i>`;
    uploadStateBox.classList.add("shown");
  }
};

const ajax = new XMLHttpRequest();
function uploadFile() {
  const file = fileInput.files[0];
  totalSizeUnit.innerText = convertBytes(file.size, 2)[1];
  const formdata = new FormData();
  formdata.append(
    "csrfmiddlewaretoken",
    document.getElementById("file-upload-form").children[0].value
  );
  formdata.append("file", file, file.name);
  ajax.upload.addEventListener("progress", fileUploadProgressHandler);
  ajax.upload.addEventListener("loadstart", fileUploadStartHandler);
  ajax.upload.addEventListener("load", fileUploadCompleteHandler);
  ajax.upload.addEventListener("error", fileUploadErrorHandler);
  ajax.upload.addEventListener("abort", fileUploadAbortHandler);
  ajax.open("POST", `${window.location.href}upload/`);
  ajax.send(formdata);
}

function fileUploadProgressHandler(e) {
  const [formattedUploadedSize, formattedUploadedSizeUnit] = convertBytes(
    e.loaded,
    2
  );
  uploadedSize.innerText = formattedUploadedSize;
  uploadedSizeUnit.innerText = formattedUploadedSizeUnit;
  totalSize.innerText = convertBytes(e.total, 2)[0];
  const percent = Math.round((e.loaded / e.total) * 100);
  currentUploadPercent.innerText = percent + "%";
  progressbar.style.width = percent + "%";
}
function fileUploadStartHandler() {
  currentUploadState.innerText = "Uploading...";
  cancelAttachmentBtn.innerHTML = `<i class="ri-close-circle-fill"></i>`;
}
function fileUploadCompleteHandler() {
  currentUploadState.innerText = "Uploaded!";
  uploadStateBox.classList.remove("shown");
  fileInput.value = "";
}
function fileUploadErrorHandler() {
  currentUploadPercent.innerText = "Upload Failed!";
}
function fileUploadAbortHandler() {
  currentUploadState.innerText = "Upload Aborted!";
  cancelAttachmentBtn.style.display = "none";
  fileInput.value = "";
  uploadStateBox.classList.remove("shown");
}

function resetUploadStateBox() {
  currentUploadState.innerText = "Pending to Send!";
  uploadedSize.innerText = 0;
  uploadedSizeUnit.innerText = "B";
  totalSize.innerText = 0;
  totalSizeUnit.innerText = "B";
  currentUploadPercent.innerText = 0 + "%";
  progressbar.style.width = 0 + "%";
}

function convertBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]];
}

// ~~~~~~~~~~hotbar message config~~~~~~~~~~
const messageInput = document.getElementById("message-input");

function sendMessage(str) {
  chatSocket.send(
    JSON.stringify({
      message: str,
    })
  );
  messageInput.value = "";
}

sendBtn.onclick = (e) => {
  e.stopPropagation();
  if (fileInput.files.length) {
    uploadFile();
  }
  if (messageInput.value.trim().length) {
    sendMessage(messageInput.value);
    messageInput.value = "";
    document.querySelector('[data-type="input"]').innerText = "";
  }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Messages Socket~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function scrollToBottom() {
  const scrollableContainer = document.querySelector(".imessage");
  scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
}
scrollToBottom();
const roomID = JSON.parse(document.getElementById("room-id").textContent);
const currentUser = JSON.parse(
  document.getElementById("current-user").textContent
);
const chatSocket = new WebSocket(
  "ws://" + window.location.host + `/ws/chat/${roomID}/`
);
chatSocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  let tagToAdd = "";
  if (data.hasOwnProperty("message")) {
    tagToAdd = `<p class="${
      currentUser === data.user ? "from-me" : "from-them"
    }">${data.message}</p>`;
    document.querySelector(".imessage").innerHTML += tagToAdd;
  }
  //Else If a File has been received...
  else if (data.hasOwnProperty("file_type")) {
    if (data.file_type === "image")
      tagToAdd = `<div ${
        currentUser === data.user
          ? 'class="from-me img-container"'
          : 'class="from-them img-container"'
      }>
      <a
        href="${data.file_url}"
        target="_blank"
      >
        <img
          src="${data.file_url}"
        />
      </a>
    </div>`;
    else if (data.file_type === "video")
      tagToAdd = `<div ${
        currentUser === data.user
          ? 'class="from-me video-container"'
          : 'class="from-them video-container"'
      }>
      <video
        class="video-js vjs-theme-fantasy"
        controls
        data-setup="{}"
      >
        <source src="${data.file_url}" />
      </video>
    </div>`;
    else
      tagToAdd = `<a ${
        currentUser === data.user
          ? 'class="from-me file px-3 py-4 gap-3"'
          : 'class="from-them file px-3 py-4 gap-3"'
      }
      href="${data.file_url}"
      download>
      <div class="file-icon">
        <i class="ri-file-fill"></i>
      </div>
      <span>${data.file_name}</span>
      </a>`;
    document.querySelector(".imessage").innerHTML += tagToAdd;
  }
  scrollToBottom();
};
chatSocket.onclose = function (e) {
  console.error("Chat socket closed unexpectedly");
};
