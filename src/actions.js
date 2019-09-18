
const SET_LIST_CARDS = 'SET_LIST_CARDS'

export const SET_LIST_CARDS = cards => {
    return {
        type: ADD_NEW_PRODUCT,
        cards
    }
}

// export const allProducts = (products, count) => {
//     return {
//         type: ALL_PRODUCTS,
//         products,
//         count
//     }
// };
//
// export const singleProduct = (product) => {
//     return {
//         type: SINGLE_PRODUCT,
//         product,
//     }
// };
//
// export const userProducts = (userProducts) => {
//     return {
//         type: USER_PRODUCTS,
//         userProducts
//     }
// };
//
// export const currentUser = (currentUser) => {
//     return {
//         type: CURRENT_USER,
//         currentUser
//     }
// };
//
// export const removeUserProd = (id) => {
//     return {
//         type: REMOVE_USER_PRODUCT,
//         id
//     }
// }
//
// export const removeUser = (id) => {
//     return {
//         type: REMOVE_USER,
//         id
//     }
// }
