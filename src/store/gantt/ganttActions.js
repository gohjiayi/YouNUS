import {db} from "../../firebase/firebaseConfig";

export default {
    async FETCH_GANTTS({commit}, query) {
        let data = await db.collection("taskGantts").get().then(result => {
            if (!result.empty) {
                let AllGantts = result.docs.map(doc => Object.assign({id: doc.id},doc.data()));

                let gantts = AllGantts.filter(gentt => gentt.projectId === query.projectId)

                if (gantts) { 
                    commit('SET_TASK_GANTT', gantts);
                    return gantts;
                }
            } else return []
        }).catch(err => {
            console.log("err", err)
            return [];
        })

        let links = await db.collection("taskLinks").get().then(result => {
            if (!result.empty) {
                let allLinks = result.docs.map(doc => Object.assign({id: doc.id},doc.data()));
                let gantts = allLinks.filter(link => link.projectId === query.projectId);
                
                if (gantts) { 
                    commit('SET_TASK_LINKS', gantts);
                    return gantts;
                }
            } else return []
        }).catch(err => {
            console.log("err", err)
            return [];
        })

        return {
            data: data,
            links: links
        }
    },
    // eslint-disable-next-line
    async ADD_TASK_GANTT({}, data) {
        return await db.collection('taskGantts').add(data).then(ref => {
            return ref;
        }).catch(err => {
            console.log("error", err);
            throw new Error(err);
        })
    },
    // eslint-disable-next-line
    async UPDATE_TASK_GANTT({}, data) {
        if(!data.id) return
        
        return await db.collection("taskGantts").doc(data.id).update(data).then(ref => {
            return ref;
        }).catch(err => {
            console.log("error", err);
            throw new Error(err);
        })
    }
}