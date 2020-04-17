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

<script>
    import { mapActions, mapGetters } from "vuex";
    import vue2Dropzone from 'vue2-dropzone';
    import 'vue2-dropzone/dist/vue2Dropzone.min.css';

  export default {
    components: {
        // Upload
        vueDropzone: vue2Dropzone
    },
    data() {
        return {
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                maxFilesize: 2,
                headers: { "My-Awesome-Header": "header value" },
                thumbnailWidth: 150, // px
                thumbnailHeight: "auto",
                addRemoveLinks: true,
                chunking: true,
            },
            getFileType(type){
                let ext = type.slice(type.lastIndexOf('/'));
                return ext.substr(1);
            },
            sizeofFile(bytes, decimals = 2) {
                if (bytes === 0) return '0 Bytes';

                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));

                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },
            selectedFileId: "",
            modalShow: false,
            projectId: ""
        };
    },
    computed: {
        ...mapGetters("stickyNotes", ["stickyNotes"]),
        stickNotes() {
            let data = this.$store.state.stickyNotes.stickyNotes;
            return data;
        }
    },
    methods: {
        ...mapActions("stickyNotes",["FETCH_STICKY_NOTES", "UPLOAD_STICKY_NOTES", "DELETE_STICKY_NOTES"]),
        afterComplete(file) {
            if (file.dataURL) {
                var date = new Date();

                let data = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    dataURL: file.dataURL,
                    uploadedAt: date.toISOString(),
                    projectId: instance.projectId
                }

                this.uploadFile(data); 
            }
        },

        vfileAdded(file) {
            console.log("file 2", file);
            const instance = this;
            let theBytes = {};

            var reader = new FileReader();
            reader.onload = processFile(file);
            reader.readAsArrayBuffer(file);

            function processFile(theFile) {
                return function (e) {
                    theBytes = e.target.result; //.split('base64,')[1]; // use with uploadFile2
                    
                    if (!file.dataURL && theBytes) {
                        var date = new Date();
                        
                        let data = {
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            theBytes: theBytes,
                            uploadedAt: date.toISOString(),
                            projectId: instance.projectId
                        }

                        instance.uploadFile(data); 
                    }
                }
            }
        },
        async uploadFile(fileData) {
            await this.UPLOAD_STICKY_NOTES(fileData).then(res => {
                console.log(res);
                this.FETCH_STICKY_NOTES({projectId: this.projectId});
            })
        },
        download(url, name) {
            var link = document.createElement("a");
                link.download = name;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                link.remove();
        },
        removeStickyFile(fileId) {
            if (fileId) {
                var isOkPress = confirm("Are you sure you want to delete this note? You will not get back");

                if (isOkPress === true) {
                this.DELETE_STICKY_NOTES({id: fileId}).then(res => {
                    console.log(res);            
                    this.FETCH_STICKY_NOTES({projectId: this.projectId});
                })
                }
            }
        },
        showModal(fileId) {
            this.selectedFileId = fileId;
        }
    },
    created() {
        let obj = JSON.parse(localStorage.getItem('vuex'));
        this.projectId = obj && obj.project && obj.project.selectedProject && obj.project.selectedProject.id ? obj.project.selectedProject.id : "";
        
        if (!this.projectId) this.$router.replace(`/home`)
        this.FETCH_STICKY_NOTES({projectId: this.projectId});
    }
  }
</script>

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