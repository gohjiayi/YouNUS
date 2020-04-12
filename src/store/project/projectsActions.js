import {db} from "../../firebase/firebaseConfig";

export default {
    async FETCH_PROJECTS({commit},module) {
        return await db.collection("projects").where("module","==",module).get().then(result => {
            if (!result.empty) {
                let projects = result.docs.map(doc => Object.assign({id: doc.id},doc.data()))
                if (projects) {
                    commit('SET_PROJECTS', {projects,mod:module});
                    return projects;
                }
            } else return []
        }).catch(err => {
            console.log("err", err)
            return [];
        })
    },
    // eslint-disable-next-line
    async ADD_PROJECT({}, data) {
        return await db.collection('projects').add(data).then(ref => {
            return ref;
        }).catch(err => {
            console.log("error", err);
            throw new Error(err);
        })
    },
    // eslint-disable-next-line
    async DELETE_PROJECT({}, data){
        if(!data.id) return
        return await db.collection("projects").doc(data.id).delete().then(ref => {
            return ref
        }).catch(err => {
            console.log(`ERROR : STORE : NOtes : projectsActions : DELETE_NOTES : ${err}`);
            throw new Error(err)
        })
    },
}