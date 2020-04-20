import {db} from "../../firebase/firebaseConfig";

export default {
    async FETCH_COMMENT({commit}) {
        return await db.collection("comment").get().then(result => {
            if (!result.empty) {
                let comment = result.docs.map(doc => Object.assign({id: doc.id},doc.data()))
                if (comment) {
                    commit('SET_COMMENTS', comment);
                    return comment;
                }
            } else return []
        }).catch(err => {
            console.log("err", err)
            return [];
        })
    },
    // eslint-disable-next-line
    async ADD_COMMENT({}, data) {
        return await db.collection('comment').add(data).then(ref => {
            return ref;
        }).catch(err => {
            console.log("error", err);
            throw new Error(err);
        })
    },
}