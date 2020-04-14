<template>
    <div>
        <h2 class="text-center mt-4">Files</h2>
        <div class="file-drop">
            <div class="card bg-light mb-3 slicky-note-list" v-for="stick in stickNotes" :key="stick.id">
                <div class="card-body text-left d-flex" >
                    <div @click="download(stick.fullURL, stick.name)" style="width: 90%;">
                        <div>{{stick.name}}</div>
                        <div>{{getFileType(stick.type)}}</div>
                    </div>
                    <div class="float-right text-right">
                        <div class="remove-sticky" @click="removeStickyFile(stick.id)">
                            <span>X</span>
                        </div>
                        <div>{{sizeofFile(stick.size)}}</div>
                    </div>
                </div>
            </div>
            <vue-dropzone ref="myVueDropzone" id="dropzone" class="customdropzone" 
             @vdropzone-file-added="vfileAdded"
            @vdropzone-complete="afterComplete" :options="dropzoneOptions" :useCustomSlot=true>
                <div class="dropzone-custom-content">
                    <i class="fa fa-cloud-upload"></i>
                    <span class="dropzone-custom-title"> Choose files or drag & drop here</span>
                </div>
            </vue-dropzone>
        </div>

        <b-modal v-model="modalShow">Are you sure you want to delete this note? You will not get back</b-modal>
    </div>
</template>



<style lang="scss">
.file-drop {
    border: 1px solid #ebebeb;
    margin: 20px;
    padding-top: 1px;
}

.customdropzone {
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.2px;
  transition: background-color .2s linear;
  // height: 200px;
  padding: 0;
  .dz-message{
      margin: 5em 0 !important;
  }

  .dz-preview {
    width: 160px;
    display: inline-block;

    .dz-image {
      width: 80px;
      height: 80px;
      margin-left: 40px;
      margin-bottom: 10px;

      div {
        width: inherit;
        height: inherit;
        border-radius: 50%;
        background-size: contain;
      }

      img {
        width: 100%;
      }
    }

    .dz-details {
      color: white;
      transition: opacity .2s linear;
      text-align: center;
    }
  }

  .dz-success-mark, .dz-error-mark, .dz-remove {
    display: none;
  }
}

.slicky-note-list {
    color: #212529;
    margin: 15px;
    cursor: pointer;
}

.remove-sticky {
    margin-bottom: 10px;
    span {
        background: #ccc;
        padding: 6px 10px;
        border-radius: 50%;
    }
}
</style>