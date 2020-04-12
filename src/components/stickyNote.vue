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