export const querys = {
    getAllUsers: 'SELECT * FROM Users',
    newPublication: 'INSERT INTO Publications VALUES (@idUser,@textDescription,@imgSrc,@tags,GETDATE())',
    getLastPublication: 'SELECT top 1 * FROM Publications ORDER BY madeIN DESC',
    getAllPublications: 'SELECT * FROM Publications ORDER BY madeIn DESC',
    insertNewUser: 'INSERT INTO Users VALUES (@email,@username,@password,@completename,@age,GETDATE())',
    authenticateUser: 'SELECT * FROM Users WHERE username = @username AND password = @password',
    getUserById: 'SELECT * FROM Users WHERE id = @id'
}