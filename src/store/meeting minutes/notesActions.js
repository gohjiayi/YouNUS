import {db} from "../../firebase/firebaseConfig";
import * as firebase from 'firebase';

export default {
    async FETCH_STICKY_NOTES({commit}, data) {
        return await db.collection("stickyNotes").get().then(result => {
            if (!result.empty) {
                let allNotes = result.docs.map(doc => Object.assign({id: doc.id},doc.data()));
                
                console.log("allNotes",allNotes);
                
                let notes = allNotes.filter(note => note.projectId === data.projectId);
                if (notes) {
                    commit('SET_STICKY_NOTES', notes);
                    return notes;
                }
            } else return []
        }).catch(err => {
            console.log("err", err)
            return [];
        })
    },
    // eslint-disable-next-line
    async UPLOAD_STICKY_NOTES({}, data) {
        console.log("data", data);
        
        let stickData = {
            name: data.name,
            type: data.type,
            size: data.size,
            uploadedAt: data.uploadedAt,
            projectId: data.projectId
        };

        return await db.collection('stickyNotes').add(stickData).then(res => {
            let fileName = stickData.name,
                ext = fileName.slice(fileName.lastIndexOf('.'));

            let ref = firebase.storage().ref(`stickyFiles/${res.id}${ext}`);
            if (data.dataURL) {
                ref.putString(data.dataURL, 'data_url').then(function(snapshot) {
                    if (snapshot.metadata.fullPath) {
                        var storage = firebase.storage();
                        storage.ref(snapshot.metadata.fullPath).getDownloadURL().then(function (url) {
                            // Execute (unknown)
                            if (url) {
                                let updateData = stickData;
                                    updateData.id = res.id;
                                    updateData.fullURL = url;
    
                                return db.collection("stickyNotes").doc(updateData.id).update(updateData).then(ref => {
                                    console.log("success");
                                    return ref
                                }).catch(err => {
                                console.log(`ERROR : STORE : stickyNotes : stickyNotesActions : UPDATE_stickyNotes : ${err}`);
                                throw new Error(err)
                                })
                            }
                        });
                    }
                });
            } else if (data.theBytes) {
                ref.put(data.theBytes).then(function(snapshot) {
                    if (snapshot.metadata.fullPath) {
                        var storage = firebase.storage();
                        storage.ref(snapshot.metadata.fullPath).getDownloadURL().then(function (url) {
                            // Execute (unknown)
                            if (url) {
                                let updateData = stickData;
                                    updateData.id = res.id;
                                    updateData.fullURL = url;

                                return db.collection("stickyNotes").doc(updateData.id).update(updateData).then(ref => {
                                    console.log("success");
                                    return ref
                                }).catch(err => {
                                console.log(`ERROR : STORE : stickyNotes : stickyNotesActions : UPDATE_stickyNotes : ${err}`);
                                throw new Error(err)
                                })
                            }
                        });
                    }
                });
            }
        }).catch(err => {
            console.log("error", err);
            throw new Error(err);
        })

        // let ref = firebase.storage().ref(`file/${data.name}`);
        // ref.putString(data.dataURL, 'data_url').then(function(snapshot) {
        //     console.log('Uploaded a data_url string!', snapshot);
        // });
    },
    // eslint-disable-next-line
    async DELETE_STICKY_NOTES({}, data) {
        if(!data.id) return
        return await db.collection("stickyNotes").doc(data.id).delete().then(ref => {
            return ref
        }).catch(err => {
            console.log(`ERROR : STORE : NOtes : notesActions : DELETE_NOTES : ${err}`);
            throw new Error(err)
        })
    },
}