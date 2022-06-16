import {ref, reactive} from "vue"

const state = reactive({
    sortBy: "name",
    isSortDirectionASC: true,
});

const methods = {
     changeSort(element){
        state.sortBy = element;
    },
    changeSortDirection(sortDirection){
        state.isSortDirectionASC = sortDirection; 
    }
}

export default{
    state,
    methods
}