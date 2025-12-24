import * as api from "./api"

export const ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE : "UPDATE",
    DELETE : "DELETE",
    FETCH_ALL : "FETCH_ALL"
}

const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

export const fetchAll = () => dispatch => {
    console.log("fetchAll action called");
    api.fetchAll()
        .then(response => {
            console.log("API Response:", response);
            console.log("Response Data:", response.data);
            console.log("Response Status:", response.status);
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data);
    api.create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess();
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data);
    api.update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: {id, ...data}
            })
            onSuccess();
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.Delete(id)
        .then(res => {
            // Dispatch delete action with the id
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id  // Just send the id, not an object
            })
            onSuccess();
        })
        .catch(err => {
            console.log(err);
            // Even if API fails, still update UI by removing from state
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            });
            onSuccess();
        })
}