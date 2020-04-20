<template>
  <!-- <Upload></Upload> -->
  <div class="pa-2">
    <div>
    <MeetingMinutes></MeetingMinutes>
    </div>

    <FileUpload></FileUpload>

    <!-- <div class="file-drop">
      <vue-dropzone ref="myVueDropzone" id="dropzone" class="customdropzone"
      @vdropzone-complete="afterComplete" :options="dropzoneOptions" :useCustomSlot=true>
        <div class="dropzone-custom-content">
          <i class="fa fa-cloud-upload"></i>
          <span class="dropzone-custom-title"> Choose files or drag & drop here</span>
        </div>
      </vue-dropzone>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import FileUpload from "./FileUpload";
import { VueEditor } from "vue2-editor";
import MeetingMinutes from "./MeetingMinutes";

export default {
  components: {
    MeetingMinutes,
    // Upload
    FileUpload,
    VueEditor
  }
};
</script>

<style lang="scss" scoped>

.note-details {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
.submit-note-details {
  width: 100%;
}

.note-list-item {
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
