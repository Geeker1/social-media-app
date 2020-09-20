import axios from 'axios'

export const FETCH_POSTS = 'fetch_posts'
export const CREATE_POST = 'create_posts'
export const FETCH_POST = 'fetchpost'
export const DELETE_POST = 'deletePost'
export const FETCH_POST_UPDATE = 'fetchpostupdate'
export const UPDATE = 'update'
export const LIKE_POST = 'likepost'

const API_URL = 'http://localhost:8000'

// export function fetchposts (link) {
//   let request = axios.get(`${API_URL}/api/posts`)
//   if (link) {
//     request = axios.get(`${link}`)
//   } else {
//     request = axios.get(`${API_URL}/api/posts`)
//   }
//   return {
//     type: FETCH_POSTS,
//     payload: request
//   }
// }

export function togg (pk, values, callback) {
  return (dispatch, getState) => {
    console.log(values)
    const tokenize = getState().auth.token
    const request = axios.put(`${API_URL}/router/posts/${pk}/like/`, values,
      { headers: {
        Authorization: `JWT ${tokenize}`
      } })
    request.then((response) => {
      console.log(response)
      dispatch({ type: UPDATE, payload: response })
        .then(dispatch(likepost(pk)))
    }).then(() => callback())
      .catch(({ response }) => {
        console.log(response.data)
      })
  }
}

export function fetchposts (link) {
  let request = axios.get(`${API_URL}/api/posts`)
  if (link) {
    request = axios.get(`${link}`)
  } else {
    request = axios.get(`${API_URL}/api/posts`)
  }
  return (dispatch, getState) => {
    request.then((response) => {
      dispatch({ type: FETCH_POSTS, payload: response.data })
    })
  }
}

export function createpost (values, callback) {
  console.log(values)
  const request = axios.post(`${API_URL}/api/posts`, values, {
    headers: { 'content-type': 'multipart/form-data' }
  })
  return (dispatch, getState) => {
    request.then((response) => {
      console.log(values)
      dispatch({ type: CREATE_POST, payload: response })
      callback()
    }).catch(({ response }) => {
      console.log(response.data)
    })
  }
}

export function likepost (pk) {
  const request = axios.get(`${API_URL}/api/posts/${pk}`)
  return (dispatch, getState) => {
    request.then((response) => {
      dispatch({ type: LIKE_POST, payload: response })
    })
  }
}

export function fetchpost (pk) {
  const request = axios.get(`${API_URL}/api/posts/${pk}`)
  return (dispatch, getState) => {
    request.then((response) => {
      dispatch({ type: FETCH_POST, payload: response })
    })
  }
}

export function deletePost (pk, callback) {
  const request = axios.delete(`${API_URL}/api/posts/${pk}`)
  return (dispatch, getState) => {
    request.then((response) => {
      dispatch({ type: DELETE_POST, payload: pk })
    }).then(() => callback())
  }
}

export function fetchupdate (pk, callback) {
  const request = axios.get(`${API_URL}/api/posts/${pk}`)
  return (dispatch, getState) => {
    request.then((response) => {
      dispatch({ type: FETCH_POST_UPDATE, payload: response })
    }).then(() => callback())
  }
}

let cv

export function update (pk, values, callback) {
  console.log(values)
  const request = axios.put(`${API_URL}/api/posts/${pk}`, values)
  return (dispatch, getState) => {
    request.then((response) => {
      console.log(response)
      dispatch({ type: UPDATE, payload: response })
    }).then(() => callback())
      .catch(({ response }) => {
        cv = response.data
        console.log(response.data)
        dispatch({ type: UPDATE, payload: response })
      }).then(()=>callback(cv))
  }
}

// pass a reducer case to actually remove the actual
// post from the application state cause the fetch posts removes it
// but it is good to update the local state as well
