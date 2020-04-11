import {db} from "../../firebase/firebaseConfig";

export default {
    async FETCH_TASKS({commit}, data) {
        return await db.collection("tasks").get().then(result => {
            if (!result.empty) {
                let AllTasks = result.docs.map(doc => Object.assign({id: doc.id},doc.data()));
                let tasks = AllTasks.filter(task => task.projectId === data.projectId);

                if (tasks) {
                    commit('SET_TASKS', tasks);
                    return tasks;
                }
            } else return []
        }).catch(err => {
            console.log("err", err)
            return [];
        })
    },
    // eslint-disable-next-line
    async ADD_TASKS({}, data) {
        return await db.collection('tasks').add(data).then(ref => {
            return ref;
        }).catch(err => {
            console.log("error", err);
            throw new Error(err);
        })
    },
    // eslint-disable-next-line
    async UPDATE_TASK({}, data) {
        if(!data.id) return
        let obj = Object.assign({},data)
        delete obj.id
        return await db.collection("tasks").doc(data.id).update(data).then(ref => {
            return ref
        }).catch(err => {
            console.log(`ERROR : STORE : tasks : tasksActions : UPDATE_tasks : ${err}`);
            throw new Error(err)
        })
    },
    // eslint-disable-next-line
    async DELETE_TASK({}, data) {
        if(!data.id) return
        return await db.collection("tasks").doc(data.id).delete().then(ref => {
            return ref
        }).catch(err => {
            console.log(`ERROR : STORE : NOtes : taskActions : DELETE_TASK : ${err}`);
            throw new Error(err)
        })
    },
}
