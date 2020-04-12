export default {
    SET_PROJECTS : (state , {projects,mod}) => {
        state.projects[`module${mod}`] = projects
    },
    UPDATE_SELECTED_PROJECT: (state, val) => {
        state.selectedProject = val
    }
}