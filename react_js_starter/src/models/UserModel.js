const UserModel = {

    /**
     * Parses Login Account API endpoint call response data object into a model.
     * @param {*} data - API response data object.
     * @returns User Model
     */
    parse: (data) => ({
        userName: data.userName,
        userRoles: data.userRoles
    })
}

export default UserModel;