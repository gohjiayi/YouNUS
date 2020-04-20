import {db} from "../../firebase/firebaseConfig";

export default {
    async FETCH_NOTES({commit}, data) {
        return await db.collection("notes").get().then(result => {
            if (!result.empty) {
                let allNotes = result.docs.map(doc => Object.assign({id: doc.id},doc.data()));
                let notes = allNotes.filter(note => note.projectId === data.projectId);
                if (notes) {
                    commit('SET_NOTES', notes);
                    return notes;
                }
            } else return []
        }).catch(err => {
            console.log("err", err)
            return [];
        })
    },
    // eslint-disable-next-line
    async ADD_NOTES({}, data) {
        return await db.collection('notes').add(data).then(ref => {
            return ref;
        }).catch(err => {
            console.log("error", err);
            throw new Error(err);
        })
    },
    // eslint-disable-next-line
    async DELETE_NOTES({}, data){
        if(!data.id) return
        return await db.collection("notes").doc(data.id).delete().then(ref => {
            return ref
        }).catch(err => {
            console.log(`ERROR : STORE : NOtes : notesActions : DELETE_NOTES : ${err}`);
            throw new Error(err)
        })
    },
}