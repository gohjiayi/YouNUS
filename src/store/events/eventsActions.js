import {db} from "../../firebaseConfig";

export default {
    async FETCH_EVENTS({commit}) {
        return await db.collection("events").get().then(result => {
            if (!result.empty) {
                let events = result.docs.map(doc => Object.assign({id: doc.id},doc.data()))
                if (events) {
                    commit('SET_EVENTS', events[0]);
                    return events[0];
                }

            } else return []
        }).catch(err => {
            console.log("err", err)
            return [];
        })
    },
    // eslint-disable-next-line
    async ADD_EVENTS({}, data) {
        return await db.collection('events').add(data).then(ref => {
            return ref;
        }).catch(err => {
            console.log("error", err);
            throw new Error(err);
        })
    },
    // eslint-disable-next-line
    async UPDATE_EVENTS({}, data) {
        if(!data.id) return

        return await db.collection("events").doc(data.id).update(data).then(ref => {
            return ref;
        }).catch(err => {
            console.log("error", err);
            throw new Error(err);
        })
    }
} 