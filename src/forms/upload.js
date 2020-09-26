import { teamName } from "./form.js";

const fileUploader = document.querySelector("#file-upload");
const progressBar = document.querySelector("#progress-bar");

var storageRef = firebase.storage();

export const upload = {
  uploadFile() {
    // Get The File
    var file = fileUploader.files[0];
    // Get the name of team and make it lowercase
    var nameOfTeam = teamName.value;
    nameOfTeam = nameOfTeam.toLowerCase();
    var fileName = nameOfTeam;

    // Get Storage ref and upload file
    var filePath = storageRef.ref("Images/Team Images/" + fileName);
    var uploadTask = filePath.put(file);

    // Handle progress bar updates
    uploadTask.on(
      "state_changed",
      function progress(snapshot) {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressBar.value = percentage;
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        console.log("File Upload Complete!");
      }
    );
  },
};
