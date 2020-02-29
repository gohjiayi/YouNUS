<template>
    <div>
        <div>
            <p>Choose an Image:</p>
            <input type="file" @change="previewImage" accept="image/*">
        </div>
        <div>
            <p>Progress: {{uploadValue.toFixed()+"%"}}
                <progress id="progress" :value="uploadValue" max="100"></progress>
            </p>
        </div>
        <div v-if="imageData!=null">
            <img class="preview" :src="picture">
            <br>
            <button @click="onUpload">Upload</button>
            <div class="container" style="float: left;">
                <img v-for="image in imageURLArray" v-bind:key="image" :src="image" :alt="error"/>
            </div>
        </div>

    </div>

</template>


<script>
    import firebase from 'firebase';

    export default {
        name: 'Upload',
        data() {
            return {
                imageData: null,
                picture: null,
                uploadValue: 0,
                imageURLArray: []
            }
        },
        methods: {
            previewImage(event) {
                this.uploadValue = 0;
                this.picture = null;
                this.imageData = event.target.files[0];
            },

            onUpload() {
                this.picture = null;
                const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
                storageRef.on(`state_changed`, snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    }, error => {
                        console.log(error.message)
                    },
                    () => {
                        this.uploadValue = 100;
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            this.picture = url;
                            this.imageURLArray.push(url);
                            console.log(this.picture);

                        });
                    }
                );
            }

        }
    }
</script>

<style scoped>
    .container{
        width: 300px;
        height: 200px;
        border: 5px dashed #f7a239;
    }
    img{
        width: 50%;
        height: 50%;
    }
    </style>

